"use client"

import { useState } from "react";
import Stripe from "stripe";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import SelectComp from "@/components/SelectComp";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type ProductsListTypes = {
  products: (Stripe.Product & { default_price: Stripe.Price })[];
};

const ProductsList = ({products}: ProductsListTypes) => {
  // Search Input
  const [searchText, setSearchText] = useState<string>("")

  // Categories
  const setCategories = new Set<string>()
  products.forEach((p) => {setCategories.add(p.metadata.category)})
  const arrayCategories: string[] = Array.from(setCategories).map((c) => {return c[0].toUpperCase() + c.slice(1)})

  // Get Search Params Values
  const searchParams = useSearchParams()
  const gender = searchParams.get("Gender")
  const category = searchParams.get("Category")

  // Filtered Products
  const FilteredProducts = products.filter((p) => {
      const matchText = !searchText || p.name.toLowerCase().includes(searchText.toLowerCase()) || p.description?.toLowerCase().includes(searchText.toLowerCase())
      const matchGender = !gender || p.metadata.gender.toLowerCase() === gender.toLowerCase()
      const matchCategory = !category || p.metadata.category.toLowerCase() == category.toLowerCase()
      
      return matchText && matchGender && matchCategory
  })

  // Router 
  const router = useRouter()
  // Clear Search Params
  function clearSearchParams() {
    router.push(`${window.location.pathname}`)
    setSearchText("")
  }

  return (
    <div>
      <div className="search-select my-6 flex flex-col md:flex-row gap-3 justify-between items-center">
        <div className="flex flex-col md:flex-row  gap-3">
          <div className="w-xs flex items-center justify-start border-2 border-black rounded-md p-1 px-1.5">
            <Search size={22}></Search>
            <label htmlFor="search" className="sr-only">Searh Product</label>
            <input type="text" name="search" id="search" placeholder="Search Product..." 
            className="ms-1 focus-visible:outline-0"
            value={searchText || ""}
            onChange={((e) => setSearchText(e.target.value))}
            />
          </div>
          <div className="flex gap-3">
            <SelectComp label="Gender" items={["Male", "Female"]}></SelectComp>
            <SelectComp label="Category" items={arrayCategories}></SelectComp>
          </div>
        </div>
        <Button onClick={clearSearchParams} aria-label="Clear all filters and search">Clear ALl</Button>
      </div>

      {/* Screen Only */}
      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {FilteredProducts.length == 0 ? "No Results Found" : `${FilteredProducts.length} products found`}
      </p>

      {FilteredProducts.length == 0 ? <p className="text-lg mt-10">No Results Found</p> 
        :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          { FilteredProducts.map((prod, index) =>  {
            return <ProductCard key={index} product={prod}/>
          })}
        </div>
      }
    </div>
  )
}
export default ProductsList