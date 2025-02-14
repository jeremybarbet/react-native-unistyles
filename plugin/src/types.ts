import type { BabelFile } from '@babel/core'
import type { UnistylesPluginOptions } from '../index'

interface UnistylesState {
    hasAnyUnistyle: boolean,
    hasVariants: boolean,
    hasUnistylesImport: boolean,
    forceProcessing: boolean,
    styleSheetLocalName: string,
    tagNumber: number,
    replaceWithUnistyles: boolean
}

export interface UnistylesPluginPass {
    file: BabelFile & UnistylesState,
    opts: UnistylesPluginOptions,
    cwd: string,
    filename: string | undefined,
    reactNativeImports: Record<string, string>
}
