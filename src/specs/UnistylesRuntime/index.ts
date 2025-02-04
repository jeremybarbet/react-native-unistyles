import { processColor } from 'react-native'
import { NitroModules } from 'react-native-nitro-modules'
import { isIOS } from '../../common'
import type { UnistylesThemes } from '../../global'
import type { AndroidContentSizeCategory, IOSContentSizeCategory, UnistylesTheme } from '../../types'
import type { UnistylesNavigationBar } from '../NavigtionBar'
import { type UnistylesStatusBar, attachStatusBarJSMethods } from '../StatusBar'
import type { AppBreakpoint, AppTheme, AppThemeName, Color, ColorScheme, Orientation } from '../types'
import type { UnistylesMiniRuntime, UnistylesRuntime as UnistylesRuntimeSpec } from './UnistylesRuntime.nitro'

export interface UnistylesRuntimePrivate extends Omit<UnistylesRuntimeSpec, 'setRootViewBackgroundColor'> {
    readonly colorScheme: ColorScheme
    readonly themeName?: AppThemeName
    readonly contentSizeCategory: IOSContentSizeCategory | AndroidContentSizeCategory
    readonly breakpoint?: AppBreakpoint
    readonly orientation: Orientation

    // other HybridObjects
    statusBar: UnistylesStatusBar
    navigationBar: UnistylesNavigationBar

    getTheme(themeName?: keyof UnistylesThemes): UnistylesTheme
    setTheme(themeName: AppThemeName): void
    updateTheme(themeName: AppThemeName, updater: (currentTheme: AppTheme) => AppTheme): void
    setRootViewBackgroundColor(color?: string): void
    _setRootViewBackgroundColor(color?: Color): void

    // constructors
    createHybridStatusBar(): UnistylesStatusBar
    createHybridNavigationBar(): UnistylesNavigationBar
}

type PrivateMethods =
    | 'createHybridStatusBar'
    | 'createHybridNavigationBar'
    | 'dispose'
    | 'miniRuntime'
    | '_setRootViewBackgroundColor'

type UnistylesRuntime = Omit<UnistylesRuntimePrivate, PrivateMethods>

const HybridUnistylesRuntime = NitroModules.createHybridObject<UnistylesRuntimePrivate>('UnistylesRuntime')

HybridUnistylesRuntime.statusBar = HybridUnistylesRuntime.createHybridStatusBar()
HybridUnistylesRuntime.navigationBar = HybridUnistylesRuntime.createHybridNavigationBar()
HybridUnistylesRuntime._setRootViewBackgroundColor = HybridUnistylesRuntime.setRootViewBackgroundColor

HybridUnistylesRuntime.setRootViewBackgroundColor = (color?: string) => {
    const parsedColor = processColor(color) ?? 0

    HybridUnistylesRuntime._setRootViewBackgroundColor(parsedColor as number)
}

if (isIOS) {
    HybridUnistylesRuntime.setImmersiveMode = (isEnabled: boolean) =>
        HybridUnistylesRuntime.statusBar.setHidden(isEnabled, 'fade')
}

attachStatusBarJSMethods(HybridUnistylesRuntime.statusBar)

export const Runtime = HybridUnistylesRuntime as UnistylesRuntime

export type { UnistylesMiniRuntime }
