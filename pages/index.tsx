import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

import { Tab } from '@headlessui/react'
import { groq } from 'next-sanity'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'

import { Basket, Header, Landing, Product } from '@components'
import { sanityClient } from '@lib'

const categoriesQuery = groq`
  *[_type == "category"]{
    _id,
    title,
    slug
  }
`

const productsQuery = groq`
  *[_type == "product"]{
    _id,
    ...
  } | order(_createdAt asc)
`

type Props = {
  categories: CategoryType[]
  products: ProductType[]
  session: Session | null
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const categories = await sanityClient
    .fetch(categoriesQuery)
    .catch((error) => console.log(error))

  const products = await sanityClient
    .fetch(productsQuery)
    .catch((error) => console.log(error))

  const session = await getSession(context)

  return {
    props: {
      categories,
      products,
      session
    },
  }
}

const Home = ({
  categories,
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(() => products.filter((product) => product.category._ref === tabsValue[0]))
  // console.log({ filteredProducts })
  // const handleFilterProducts = (index: number) => {
  //   setFilteredProducts(
  //     products.filter((product) => product.category._ref === tabsValue[index])
  //   )
  // }

  const showProducts = (tabIndex: number) => {
    return products
      .filter((product) => product.category._ref === categories[tabIndex]._id)
      .map((product) => <Product key={product._id} product={product} />)
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Basket />

      <main className="relative h-[200vh] bg-[#e7ecee]">
        <Landing />
      </main>

      <section className="relative z-40 -mt-[100vh] min-h-screen bg-[#1b1b1b]">
        <div className="space-y-10 py-16">
          <h1 className="text-center text-4xl font-medium tracking-wide text-white lg:text-5xl">
            New Proms
          </h1>

          <Tab.Group>
            <Tab.List className="flex justify-center text-white">
              {categories.map((category) => (
                <Tab
                  key={category._id}
                  id={category._id}
                  className={({ selected }) =>
                    `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-5 md:text-base 
                     ${
                       selected
                         ? 'borerGradient bg-[#35383c] text-white'
                         : 'border-b-2 border-[#35383c] text-[#747474]'
                     }  
                    `
                  }
                >
                  {category.title}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mx-auto max-w-5xl place-items-center px-1 pt-10 pb-24 sm:px-4">
              <Tab.Panel className="tabPanel">{showProducts(0)}</Tab.Panel>

              <Tab.Panel className="tabPanel">{showProducts(1)}</Tab.Panel>

              <Tab.Panel className="tabPanel">{showProducts(2)}</Tab.Panel>

              <Tab.Panel className="tabPanel">{showProducts(3)}</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  )
}

export default Home
