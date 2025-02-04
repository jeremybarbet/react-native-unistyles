import React, { forwardRef, useEffect, type ComponentType } from 'react'
import type { UnistyleDependency } from '../../specs'
import type { PartialBy } from '../../types/common'
import { deepMergeObjects } from '../../utils'
import { useProxifiedUnistyles } from '../useProxifiedUnistyles'
import { maybeWarnAboutMultipleUnistyles } from '../warn'
import type { Mappings, SupportedStyleProps } from './types'

// @ts-expect-error
type GenericComponentProps<P> = ComponentProps<P>
// @ts-expect-error
type GenericComponentRef<T> = ComponentRef<T>

export const withUnistyles = <TComponent, TMappings extends GenericComponentProps<TComponent>>(
    Component: TComponent,
    mappings?: Mappings<TMappings>,
) => {
    type TProps = GenericComponentProps<TComponent>
    type PropsWithUnistyles = PartialBy<TProps, keyof TMappings | SupportedStyleProps> & {
        uniProps?: Mappings<TProps>
    }
    const getSecrets = (
        styleProps: Record<string, any> = {},
    ): { uni__getStyles(): any; uni__dependencies: Array<UnistyleDependency> } => {
        const unistyleKey = Object.keys(styleProps).find(key => key.startsWith('unistyles-'))

        return unistyleKey
            ? styleProps[unistyleKey]
            : {
                  uni__getStyles: () => styleProps,
                  uni__dependencies: [],
              }
    }

    return forwardRef<GenericComponentRef<TComponent>, PropsWithUnistyles>((props, ref) => {
        const narrowedProps = props as PropsWithUnistyles
        const NativeComponent = Component as ComponentType

        maybeWarnAboutMultipleUnistyles(
            // @ts-ignore we don't know the type of the component
            narrowedProps.style,
            // @ts-ignore we don't know the type of the component
            `withUnistyles(${Component.displayName ?? Component.name ?? 'Unknown'})`,
        )
        maybeWarnAboutMultipleUnistyles(
            // @ts-ignore we don't know the type of the component
            narrowedProps.contentContainerStyle,
            // @ts-ignore we don't know the type of the component
            `withUnistyles(${Component.displayName ?? Component.name ?? 'Unknown'})`,
        )

        const { proxifiedRuntime, proxifiedTheme, addDependencies } = useProxifiedUnistyles()

        useEffect(() => {
            const styleSecrets = getSecrets(narrowedProps.style)
            const contentContainerStyleSecrets = getSecrets(narrowedProps.contentContainerStyle)

            addDependencies(
                Array.from(
                    new Set([...styleSecrets.uni__dependencies, ...contentContainerStyleSecrets.uni__dependencies]),
                ),
            )
        }, [narrowedProps.style, narrowedProps.contentContainerStyle])

        const mappingsProps = mappings ? mappings(proxifiedTheme, proxifiedRuntime) : {}
        const unistyleProps = narrowedProps.uniProps ? narrowedProps.uniProps(proxifiedTheme, proxifiedRuntime) : {}

        const styleSecrets = getSecrets(narrowedProps.style)
        const contentContainerStyleSecrets = getSecrets(narrowedProps.contentContainerStyle)

        const finalProps = {
            ...deepMergeObjects(mappingsProps, unistyleProps, props),
            ...(narrowedProps.style
                ? {
                      style: styleSecrets.uni__getStyles(),
                  }
                : {}),
            ...(narrowedProps.contentContainerStyle
                ? {
                      contentContainerStyle: contentContainerStyleSecrets.uni__getStyles(),
                  }
                : {}),
        } as any

        return <NativeComponent {...(finalProps as TProps)} ref={ref} />
    })
}
