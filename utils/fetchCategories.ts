export const fetchCategories = async () => {

  const response = await fetch(
    `http://localhost:3000/api/getCategories`
  )
  return await response.json()

}

// ${process.env.NEXT_PUBLIC_BASE_URL}