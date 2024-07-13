import React, { useEffect, useState } from 'react'
import './ProductsList.css'
import ProductCard from './ProductCard'
import useData from '../../../hooks/useData'
import ProductCardSkeleton from './ProductCardSkeleton'
import { useSearchParams } from "react-router-dom"
import Pagination from '../../Common/Pagination'
// import useProductList from '../../../hooks/useProductList'

const ProductsList = () => {
  const [search, setSearch]=useSearchParams()
  const category = search.get("category")
  const searchQuery = search.get("search")
  const page = search.get("page")
  const [sortBy, setSortBy]= useState("")
  const [sortedProducts, setSortedProducts]= useState([])
  const {data , error, isLoading} = useData("/products", {
    params: {
      search : searchQuery,
      category,
      page,
    },
  }, [searchQuery,category, page])
  const skeletons =[1,2,3,4,5,6,7,8]
  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search])
    setSearch({ ...currentParams, page: page })
  };

  useEffect(() => {
    if(data && data.products){
      const products = [...data.products]
      if(sortBy === "price desc"){
        setSortedProducts(products.sort((a,b) => b.price - a.price))}
        else if (sortBy === "price asc"){
          setSortedProducts(products.sort((a,b) => a.price - b.price))
        }
       else if(sortBy === "rate desc"){
        setSortedProducts(products.sort((a,b) => b.reviews.rate - a.reviews.rate))}
        else if (sortBy === "rate asc"){
          setSortedProducts(products.sort((a,b) => a.reviews.rate - b.reviews.rate))
        } else{
          setSortedProducts(products)
        }
    } 
  },[sortBy, data])
  return (
    <section className='products_list_section'>
        <header className="align_center products_list_header">
            <h2>Products</h2>
            <select name="sort" id="" className='products_sorting' onChange={e=> setSortBy(e.target.value)}>
                <option value="">Relevance</option>
                <option value="price desc">Price HIGH to LOW</option>
                <option value="price asc">Price LOW to HIGH </option>
                <option value="rate desc">Rate HIGH to LOW</option>
                <option value="rate asc">Rate LOW to HIGH </option>
            </select>
        </header>
        <div className='products_list'>
          {error && <em className="form_error">{error}</em>}
          {isLoading ? 
          skeletons.map((n) => <ProductCardSkeleton key={n} />)
          : data?.products && 
            sortedProducts.map((product) => (
            <ProductCard 
           key={product._id} 
           product={product} />))}
        </div>
        {data && (<Pagination 
        totalPosts={data.totalProducts} 
        postsPerPage={8} 
        onClick={handlePageChange} 
        currentPage={page}
        />
        )}
    </section>
  )
}

export default ProductsList
