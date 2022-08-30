import { createClient, SanityClient } from 'next-sanity'
import createImgUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const config = {
  apiVersion: '2021-10-21',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN!,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  useCdn: process.env.NODE_ENV === 'production',
}

export const sanityClient = createClient(config)

const imgUrlBuilder = createImgUrlBuilder(config)

export const urlFor = (source: SanityImageSource) => imgUrlBuilder.image(source)
