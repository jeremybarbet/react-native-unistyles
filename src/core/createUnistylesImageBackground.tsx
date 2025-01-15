import React, { useEffect, useRef } from 'react'
import type { Image, ImageBackground, ImageBackgroundProps } from 'react-native'
import { UnistylesShadowRegistry } from '../specs'
import { passForwardedRef } from './passForwardRef'
import { maybeWarnAboutMultipleUnistyles } from './warn'

export const createUnistylesImageBackground = (Component: typeof ImageBackground) => React.forwardRef<ImageBackground, ImageBackgroundProps>((props, forwardedRef) => {
    const storedRef = useRef<ImageBackground | null>(null)
    const storedImageRef = useRef<Image | null>(null)

    useEffect(() => {
        return () => {
            // @ts-ignore
            UnistylesShadowRegistry.remove(storedRef.current)
            // @ts-ignore
            UnistylesShadowRegistry.remove(storedImageRef.current)
        }
    }, [])

    // @ts-expect-error we don't know the type of the component
    maybeWarnAboutMultipleUnistyles(props.style, 'ImageBackground')

    return (
        <Component
            {...props}
            ref={ref => {
                storedRef.current = ref
                passForwardedRef(props, ref, forwardedRef)
            }}
            imageRef={ref => {
                const style = Array.isArray(props.imageStyle)
                    ? props.imageStyle
                    : [props.imageStyle]

                // @ts-expect-error web types are not compatible with RN styles
                UnistylesShadowRegistry.add(ref, style)
                storedImageRef.current = ref
            }}
        />
    )
})
