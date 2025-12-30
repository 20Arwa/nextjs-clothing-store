"use client"

import Stripe from "stripe"
import Image from "next/image"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore"

type productType = {
    product: Stripe.Product & { default_price: Stripe.Price }
}

const ProductDetails = ({product} : productType) => {
    // Get Product Details
    const {items, addItem, removeItem} = useCartStore()
    const existItem = items.find((i) => i.id == product.id)
    const quantity = existItem ? existItem.quantity : 0
    // Add New Item
    const handleAddItem = () => {
        addItem({
            id: product.id,
            name: product.name,
            image: product.images[0],
            price: product.default_price.unit_amount as number,
            quantity: 1
        }) 
    }

    return (
        <section className="container mx-auto min-h-[calc(100vh-8rem)] py-10">
            <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-6">
                <Image src={product.images[0]} alt={product.name} width={300} height={300} className="rounded-md"></Image>
                <div className="flex flex-col justify-between">
                    {/* Product Info */}
                    <div>
                        <div>
                            <h1 className="text-2xl font-bold">{product.name}</h1>
                            <p className="my-1">{product.description}</p>
                            <p className="font-bold mt-4 text-2xl">
                                {product.default_price.unit_amount ?
                                    product.default_price.unit_amount / 100
                                    : "Price Not Found"}
                                <span className="ms-0.5 text-xs"> {product.default_price.currency.toUpperCase()}</span>
                            </p>
                        </div>
                        {/* Meta Data */}
                        <div className="my-8">
                            <h2 className="text-xl font-bold mb-1">Details</h2>
                            <table className="table-auto w-full bg-gray-100 rounded-t-xs">
                                <tbody>
                                    {Object.entries(product.metadata).map(([key,value]) => {
                                        return (
                                            <tr key={key}>
                                                <th className="w-1/2 border-b border-gray-300 ps-2.5 py-1 text-start">{key}</th>
                                                <td className="w-1/2 border-b border-gray-300 py-1">{value}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Add Or Remove Item */}
                    <div className="self-center mt-10 md:mt-0">
                        <Button 
                            className={"w-12 h-12 rounded-xl border-2 bg-white text-black hover:bg-gray-50"} 
                            onClick={() => removeItem(product.id)}
                            aria-label={`Remove ${product.name} from cart`}
                            >-</Button>
                        <span className="mx-4 text-2xl" aria-live="polite">{quantity}</span>
                        <Button 
                            className={"w-12 h-12 rounded-xl border"} 
                            onClick={handleAddItem}
                            aria-label={`Add ${product.name} to cart`}
                        >+</Button>
                    </div>
                </div>
            </div>
            {/* Checkout Button */}
            <div className="mt-15 text-center">
                <Button className="text-base rounded-3xl py-5 px-6"><Link href="/checkout">Checkout</Link></Button>
            </div>
        </section>
    )
}
export default ProductDetails