import type { UnistylesValues } from '../types'
import * as unistyles from '../web/services'
import { checkForAnimated } from '../web/utils'

export const getClassName = (unistyle: UnistylesValues | undefined | Array<UnistylesValues>, forChild?: boolean) => {
    if (!unistyle) {
        return undefined
    }

    const flattenedStyles = Array.isArray(unistyle) ? unistyle.flat(Number.POSITIVE_INFINITY) : [unistyle]
    const animatedStyles = flattenedStyles.filter(checkForAnimated)
    const regularStyles = flattenedStyles.filter(style => !checkForAnimated(style))

    const { hash, injectedClassName } = unistyles.services.shadowRegistry.addStyles(
        regularStyles,
        forChild
    )

    return hash
        ? [
            { $$css: true, hash, injectedClassName },
            animatedStyles,
        ] as const
        : undefined
}
