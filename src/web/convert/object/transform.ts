import { getObjectStyle } from './objectStyle'
import { normalizeNumericValue } from '../utils'
import type { TransformStyles } from '../../../types/core'

const normalizeTransform = (key: string, value: any) => {
    if (key.includes('scale')) {
        return value
    }

    if (typeof value === 'number') {
        return normalizeNumericValue(value)
    }

    return value
}

export const getTransformStyle = (transforms: Array<TransformStyles>) => getObjectStyle(transforms, 'transform', (key, value) => {
    switch(key) {
        case 'matrix':
            return `${key}(${(value as Array<number>).join(',')})`
        default:
            return `${key}(${normalizeTransform(key, value)})`
    }
})
