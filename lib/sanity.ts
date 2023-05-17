import { createClient, SanityClient } from 'next-sanity'
import createImgUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import * as process from "process";

export const config = {
  apiVersion: '2021-10-21',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN!,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  useCdn: process.env.NODE_ENV === 'production',
}

console.log(process.env.SANITY_TOKEN, process.env.PROJECT_ID)

export const sanityClient = createClient(config)

const imgUrlBuilder = createImgUrlBuilder(config)

export const urlFor = (source: SanityImageSource) => imgUrlBuilder.image(source)
