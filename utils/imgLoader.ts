import {ImageLoaderProps} from 'next/image'

export const imgLoader = ({src, width, quality}: ImageLoaderProps) => src + `?w=${width}&q=${quality || '75'}`