type CategoryType = {
  _id: string
  _createdAt: string
  _updatedAt: string
  _rev: string
  _type: string
  slug: {
    _type: 'slug'
    current: string
  }
  title: string
}

type ImageType = {
  _key: string
  _type: 'image'
  asset: {
    url: string
  }
}

type ProductType = {
  _id: string
  _createdAt: string
  _updatedAt: string
  _rev: string
  _type: string
  title: string
  price: number
  slug: {
    _type: 'slug'
    current: string
  }
  description: string
  category: {
    _type: 'reference'
    _ref: string
  }
  image: ImageType[]
}

type StripeProduct = {
  id: string
  amount_discount: number
  amount_subtotal: number
  amount_tax: number
  amount_total: number
  currency: string
  description: string
  object: string
  quantity: number
  price: {
    unit_amount: number
  }
}