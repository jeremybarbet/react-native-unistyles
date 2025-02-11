import type { UnistylesPluginPass } from './types'
import type { NodePath } from '@babel/core'
import { arrayExpression, identifier, isArrowFunctionExpression, isBlockStatement, isFunctionExpression, isIdentifier, isIfStatement, isMemberExpression, isObjectExpression, isObjectPattern, isObjectProperty, isReturnStatement, numericLiteral, objectExpression, type ObjectProperty, objectProperty, spreadElement, type CallExpression, type ArrowFunctionExpression, type FunctionExpression, type RestElement, MemberExpression, type Identifier, type ObjectPattern } from '@babel/types'

const UnistyleDependency = {
    Theme: 0,
    ThemeName: 1,
    AdaptiveThemes: 2,
    Breakpoints: 3,
    Variants: 4,
    ColorScheme: 5,
    Dimensions: 6,
    Orientation: 7,
    ContentSizeCategory: 8,
    Insets: 9,
    PixelRatio: 10,
    FontScale: 11,
    StatusBar: 12,
    NavigationBar: 13,
    Ime: 14
}

export function stringToUniqueId(str: string) {
    let hash = 0

    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i)
        hash |= 0
    }

    const absHash = Math.abs(hash)

    return absHash % 1000000000
}

export function isUnistylesStyleSheet(path: NodePath<CallExpression>, state: UnistylesPluginPass) {
    const { callee } = path.node

    if (isMemberExpression(callee) && isIdentifier(callee.property)) {
        return (
            callee.property.name === 'create' &&
            isIdentifier(callee.object) &&
            callee.object.name === state.file.styleSheetLocalName
        )
    }

    return false
}

export function isKindOfStyleSheet(path: NodePath<CallExpression>, state: UnistylesPluginPass) {
    if (!state.file.forceProcessing && !state.file.hasUnistylesImport) {
        return false
    }

    const { callee } = path.node // Directly access callee

    return (
        isMemberExpression(callee) &&
        isIdentifier(callee.property) &&
        callee.property.name === 'create' &&
        isIdentifier(callee.object)
    )
}

export function addStyleSheetTag(path: NodePath<CallExpression>, state: UnistylesPluginPass) {
    const str = state.filename?.replace(state.cwd, '') ?? ''
    const uniqueId = stringToUniqueId(str) + ++state.file.tagNumber

    path.node.arguments.push(numericLiteral(uniqueId))
}

// function getProperty(property: RestElement | ObjectProperty) {
function getProperty(property: RestElement | ObjectProperty): { properties: string[]; parent?: string } | undefined {
    if (!property) {
        return undefined
    }

    if (isIdentifier(property)) {
        const p = property as Identifier

        return {
            properties: [p.name]
        }
    }

    if (isObjectPattern(property)) {
        const p = property as ObjectPattern
        const matchingProperties = p.properties.flatMap(p => getProperty(p))

        return {
            properties: matchingProperties.flatMap(properties => properties.properties)
        }
    }

    if (isObjectProperty(property) && isIdentifier(property.value)) {
        return {
            properties: [property.key.name]
        }
    }

    if (isObjectProperty(property) && isObjectPattern(property.value)) {
        const matchingProperties = property.value.properties.flatMap(p => getProperty(p))

        return {
            parent: property.key.name,
            properties: matchingProperties.flatMap(properties => properties.properties)
        }
    }

    return undefined
}

export function getStylesDependenciesFromObject(path: NodePath<CallExpression>) {
    const detectedStylesWithVariants = new Set<{ label: string; key: string }>()
    const stylesheet = path.node.arguments[0]

    if (isObjectExpression(stylesheet)) {
        stylesheet.properties.forEach(property => {
            if (!isObjectProperty(property) || !isIdentifier(property.key)) {
                return
            }

            if (isObjectProperty(property)) {
                if (isObjectExpression(property.value)) {
                    property.value.properties.forEach(innerProp => {
                        if (isObjectProperty(innerProp) && isIdentifier(innerProp.key) && isIdentifier(property.key) && innerProp.key.name === 'variants') {
                            detectedStylesWithVariants.add({
                                label: 'variants',
                                key: property.key.name
                            })
                        }
                    })
                }
            }

            if (isArrowFunctionExpression(property.value)) {
                if (isObjectExpression(property.value.body)) {
                    property.value.body.properties.forEach(innerProp => {
                        if (isObjectProperty(innerProp) && isIdentifier(innerProp.key) && isIdentifier(property.key) && innerProp.key.name === 'variants') {
                            detectedStylesWithVariants.add({
                                label: 'variants',
                                key: property.key.name
                            })
                        }
                    })

                }
            }
        })
    }

    const variants = Array.from(detectedStylesWithVariants)

    return variants.reduce<Record<string, string[]>>((acc, { key, label }) => {
        if (acc[key]) {
            acc[key] = [
                ...acc[key],
                label
            ]

            return acc;
        }

        acc[key] = [label]

        return acc;
    }, {})
}

export function getStylesDependenciesFromFunction(path: NodePath<CallExpression>) {
    const funcPath = path.get('arguments.0') as unknown as NodePath<ArrowFunctionExpression | FunctionExpression>

    if (!funcPath) {
        return
    }

    const params = funcPath.node.params
    const [themeParam, rtParam] = params

    // TODO: share type
    const themeNames: {
        properties: string[];
        parent?: string;
    }[] = []

    // destructured theme object
    if (isObjectPattern(themeParam)) {
        // If destructured, collect all property names
        for (const prop of themeParam.properties) {
            const property = getProperty(prop)

            if (property) {
                themeNames.push(property)
            }
        }
    }

    // user used 'theme' without destructuring
    if (isIdentifier(themeParam)) {
        themeNames.push({
            properties: [themeParam.name]
        })
    }

    const rtNames: {
        properties: string[];
        parent?: string;
    }[] = []

    // destructured rt object
    if (isObjectPattern(rtParam)) {
        // If destructured, collect all property names
        for (const prop of rtParam.properties) {
            const property = getProperty(prop)

            if (property) {
                rtNames.push(property)
            }
        }
    }

    // user used 'rt' without destructuring
    if (rtParam && rtParam.type === 'Identifier') {
        rtNames.push({
            properties: [rtParam.name]
        })
    }

    // get returned object or return statement from StyleSheet.create function
    let returnedObjectPath: NodePath | NodePath[] | null = null
    const body = funcPath.get('body')

    // if (funcPath.get('body').isObjectExpression()) {
    if (body.isObjectExpression()) {
        returnedObjectPath = body
    } else {
        funcPath.traverse({
            ReturnStatement(retPath) {
                if (!returnedObjectPath && retPath.get('argument').isObjectExpression()) {
                    returnedObjectPath = retPath.get('argument') as any // TODO
                }
            }
        })
    }

    if (!returnedObjectPath) {
        // there is no returned object
        // abort

        return
    }

    const detectedStylesWithVariants = new Set<{ label: 'variants'; key: string }>()

    // detect variants via Scope
    returnedObjectPath.get('properties').forEach(propPath => {
        // get style name
        const stylePath = propPath.get('key')

        if (!stylePath.isIdentifier()) {
            return
        }

        const styleKey = stylePath.node.name

        const valuePath = propPath.get('value')

        if (valuePath.isObjectExpression()) {
            const hasVariants = valuePath.get('properties').some(innerProp => {
                const innerKey = innerProp.get('key')

                return innerKey.isIdentifier() && innerKey.node.name === 'variants'
            })

            if (hasVariants) {
                detectedStylesWithVariants.add({
                    label: 'variants',
                    key: styleKey
                })
            }
        }

        if (valuePath.isArrowFunctionExpression()) {
            if (isObjectExpression(valuePath.node.body)) {
                const hasVariants = valuePath.node.body.properties.some(innerProp => {
                    return isIdentifier(innerProp.key) && innerProp.key.name === 'variants'
                })

                if (hasVariants) {
                    detectedStylesWithVariants.add({
                        label: 'variants',
                        key: styleKey
                    })
                }
            }
        }
    })

    const detectedStylesWithTheme = new Set<{ label: 'theme'; key: string }>()

    // detect theme dependencies via Scope
    themeNames.forEach(({ properties }) => {
        properties.forEach(property => {
            const binding = funcPath.scope.getBinding(property)

            if (!binding) {
                return
            }

            binding.referencePaths.forEach(refPath => {
                // find key of the style that we are referring to
                const containerProp = refPath
                    .findParent(parent => parent.isObjectProperty() && parent.parentPath === returnedObjectPath)

                if (!containerProp) {
                    return
                }

                const keyNode = containerProp.get('key')
                const styleKey = keyNode.isIdentifier()
                    ? keyNode.node.name
                    : keyNode.isLiteral()
                        ? keyNode.node.value
                        : null

                if (styleKey) {
                    detectedStylesWithTheme.add({
                        label: 'theme',
                        key: styleKey
                    })
                }
            })
        })
    })

    const detectedStylesWithRt = new Set<{ label: 'rt'; key: string }>()
    const localRtName = isIdentifier(rtParam)
        ? rtParam.name
        : undefined

    // detect rt dependencies via Scope
    rtNames.forEach(({ properties, parent }) => {
        properties.forEach(property => {
            const rtBinding = funcPath.scope.getBinding(property)

            if (!rtBinding) {
                return
            }

            const isValidDependency = Boolean(toUnistylesDependency(property))

            let validRtName = property

            // user used nested destructing, find out parent key
            if (!isValidDependency && (!localRtName || (localRtName && localRtName !== property))) {
                if (!parent) {
                    return
                }

                if (!toUnistylesDependency(parent)) {
                    return
                }

                validRtName = parent
            }

            rtBinding.referencePaths.forEach(refPath => {
                // to detect rt dependencies we need to get parameter not rt itself
                // eg. rt.screen.width -> screen
                // rt.insets.top -> insets
                // special case: rt.insets.ime -> ime

                let usedLabel = validRtName

                if (refPath.parentPath?.isMemberExpression() && refPath.parentPath.get('object') === refPath) {
                    const memberExpr = refPath.parentPath
                    const propPath = memberExpr.get('property')

                    if (propPath.isIdentifier()) {
                        if (localRtName) {
                            usedLabel = propPath.node.name
                        }

                        if (
                            usedLabel === 'insets' &&
                            memberExpr.parentPath.isMemberExpression() &&
                            memberExpr.parentPath.get('object') === memberExpr
                        ) {
                            const secondPropPath = memberExpr.parentPath.get('property')

                            if (secondPropPath.isIdentifier() && secondPropPath.node.name === 'ime') {
                                usedLabel = 'ime'
                            }
                        }
                    }
                }

                // find key of the style that we are referring to
                const containerProp = refPath
                    .findParent(parent => parent.isObjectProperty() && parent.parentPath === returnedObjectPath)

                if (!containerProp) {
                    return
                }

                const keyNode = containerProp.get('key')
                const styleKey = keyNode.isIdentifier()
                    ? keyNode.node.name
                    : keyNode.isLiteral()
                        ? keyNode.node.value
                        : null

                if (styleKey) {
                    detectedStylesWithRt.add({
                        label: usedLabel,
                        key: styleKey
                    })
                }
            })
        })
    })

    const variants = Array.from(detectedStylesWithVariants)
    const theme = Array.from(detectedStylesWithTheme)
    const rt = Array.from(detectedStylesWithRt)

    return theme
        .concat(rt)
        .concat(variants)
        .reduce((acc, { key, label }) => {
            if (acc[key]) {

                acc[key] = [
                    ...acc[key],
                    label
                ]

                return acc
            }

            acc[key] = [label]

            return acc
        }, [])
}

export function toUnistylesDependency(dependency: string) {
    switch (dependency) {
        case 'theme': {
            return UnistyleDependency.Theme
        }
        case 'themeName': {
            return UnistyleDependency.ThemeName
        }
        case 'adaptiveThemes': {
            return UnistyleDependency.AdaptiveThemes
        }
        case 'breakpoint': {
            return UnistyleDependency.Breakpoints
        }
        case 'colorScheme': {
            return UnistyleDependency.ColorScheme
        }
        case 'screen': {
            return UnistyleDependency.Dimensions
        }
        case 'isPortrait':
        case 'isLandscape': {
            return UnistyleDependency.Orientation
        }
        case 'contentSizeCategory': {
            return UnistyleDependency.ContentSizeCategory
        }
        case 'ime': {
            return UnistyleDependency.Ime
        }
        case 'insets': {
            return UnistyleDependency.Insets
        }
        case 'pixelRatio': {
            return UnistyleDependency.PixelRatio
        }
        case 'fontScale': {
            return UnistyleDependency.FontScale
        }
        case 'statusBar': {
            return UnistyleDependency.StatusBar
        }
        case 'navigationBar': {
            return UnistyleDependency.NavigationBar
        }
        case 'variants': {
            return UnistyleDependency.Variants
        }

        // breakpoints are too complex and are handled by C++
    }
}

// TODO BlockStatement
export function getReturnStatementsFromBody(node: any, results: any = []) {
    if (isReturnStatement(node)) {
        results.push(node)
    }

    if (isBlockStatement(node)) {
        node.body.forEach(child => {
            if (isBlockStatement(child)) {
                getReturnStatementsFromBody(child, results)
            }
        })
    }

    if (isIfStatement(node)) {
        getReturnStatementsFromBody(node.consequent, results)

        if (node.alternate) {
            getReturnStatementsFromBody(node.alternate, results)
        }
    }

    return results
}

export function addDependencies(state: UnistylesPluginPass, styleName: string, unistyle: ObjectProperty, detectedDependencies: string[]) {
    const debugMessage = (deps: (number | undefined)[]) => {
        if (state.opts.debug) {
            const mappedDeps = deps
                .map(dep => Object.keys(UnistyleDependency).find(key => UnistyleDependency[key] === dep))
                .join(', ')

            console.log(`${state.filename?.replace(`${state.file.opts.root}/`, '')}: styles.${styleName}: [${mappedDeps}]`)
        }
    }

    const styleDependencies = detectedDependencies.map(toUnistylesDependency)

    // add metadata about dependencies
    if (styleDependencies.length > 0) {
        const uniqueDependencies = Array.from(new Set(styleDependencies))

        debugMessage(uniqueDependencies)

        let targets = []

        if (isArrowFunctionExpression(unistyle.value) || isFunctionExpression(unistyle.value)) {
            if (isObjectExpression(unistyle.value.body)) {
                targets.push(unistyle.value.body)
            }

            if (isBlockStatement(unistyle.value.body)) {
                targets = getReturnStatementsFromBody(unistyle.value.body)
                    .map(node => {
                        if (isIdentifier(node.argument)) {
                            node.argument = objectExpression([
                                spreadElement(node.argument)
                            ])
                        }

                        return node.argument
                    })
            }
        }

        if (isObjectExpression(unistyle.value)) {
            targets.push(unistyle.value)
        }

        if (isMemberExpression(unistyle.value)) {
            // convert to object
            unistyle.value = objectExpression([spreadElement(unistyle.value)])

            targets.push(unistyle.value)
        }

        if (targets.length > 0) {
            targets.forEach(target => {
                target.properties.push(
                    objectProperty(
                        identifier('uni__dependencies'),
                        arrayExpression(uniqueDependencies.map(dep => numericLiteral(dep)))
                    )
                )
            })
        }
    }
}
