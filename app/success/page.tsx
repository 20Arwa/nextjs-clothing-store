"use client"

import { useCartStore } from "@/store/cartStore"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

const Success = () => {
    // Empty cart
    const {clearCart} = useCartStore()
    useEffect(() => {
        clearCart()
    },[])

    return (
        <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Payment successful!</h1>
            <p className="mb-4">Thank you for your purchase. Your order is being procesed</p>
            <Button>
                <Link href={"/products"}>Continue Shopping</Link>
            </Button>
        </div>
    )
}
export default Success