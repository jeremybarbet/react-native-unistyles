import React from 'react'
import { StyleSheet } from 'react-native'
import { error, isServer } from '../web/utils'
import { UnistylesWeb } from '../web'
import { DefaultServerUnistylesSettings, type ServerUnistylesSettings } from './types'

export const getServerUnistyles = ({ includeRNWStyles = true }: ServerUnistylesSettings = DefaultServerUnistylesSettings) => {
    if (!isServer()) {
        throw error('Server styles should only be read on the server')
    }
    // @ts-ignore
    const rnwStyle: string | null = includeRNWStyles ? (StyleSheet?.getSheet().textContent ?? '') : null
    const css = UnistylesWeb.registry.css.getStyles()
    const state = UnistylesWeb.registry.css.getState()
    return <>
        {rnwStyle && <style id='rnw-style'>{rnwStyle}</style>}
        <style id='unistyles-web'>{css}</style>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Needs the json quotes to be unescaped */}
        <script id='unistyles-script' dangerouslySetInnerHTML={{ __html: `window.__UNISTYLES_STATE__ = ${JSON.stringify(state)}`}} />
    </>
}