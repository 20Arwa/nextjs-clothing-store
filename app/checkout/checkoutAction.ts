"use server"

import {cartItem} from "@/store/cartStore"
import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"

export const checkoutAction = async (formData: FormData): Promise<void> => {
    const items = JSON.parse(formData.get("items") as string)

    const line_items = items.map( (item:cartItem) => ({
        price_data : {
            currency: "sar",
            product_data: { name: item.name },
            unit_amount: item.price,
        },
        quantity: item.quantity
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        locale: "en", 
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
        
    })

    redirect(session.url!)
}