"use client"

import Image from "next/image"
import Link from "next/link";
import { useCartStore } from "@/store/cartStore"
import { Button } from "@/components/ui/button";
import { checkoutAction } from "@/app/checkout/checkoutAction";

const Checkout = () => {
    const {items, addItem, removeItem, clearCart} = useCartStore()
    const totalPrice = items.reduce((total,item) => total + (item.quantity * item.price), 0)

    return (
        <section className="container flex flex-col items-center justify-center text-center min-h-[calc(100vh-8rem)] py-10">

            {/* If Cart Is Empty */}
            {items.length == 0 &&
                <div>
                    <p className="text-2xl font-bold mb-2">Cart Is Empty</p>
                    <Button>
                        <Link href={"/products"}>
                            Go Shooping                   
                        </Link>
                    </Button> 
                </div>
            }

            {/* If Cart Not Empty */}
            {items.length > 0 &&
                <>
                <h1 className="text-2xl font-bold mb-5">Checkout</h1>
                {/* Order Summary */}
                <div className="w-fit py-3 px-5 mx-auto text-start font-bold rounded-md border-2 border-gray-200 shadow-md">
                    <h2 className="text-2xl mb-3">Order summary</h2>
                    {items.map((p) => {
                        return (
                            <div key={p.id} className="flex items-stretch gap-3 py-3 border-b-2">
                                <div className="relative w-25 h-25">
                                <Link href={`/products/${p.id}`}>
                                    <Image src={p.image} alt={p.name} fill className="object-cover object-center rounded-md" ></Image>
                                </Link>
                                </div>
                                <div className="pe-20">
                                    <h3 className="text-lg">{p.name}</h3>
                                    {/* Add Or Remove Item */}
                                    <p className="my-1.5 text-md ">{(p.price * p.quantity) /100}<span className="ms-0.5 text-xs">SAR</span></p>
                                    <div>
                                        <Button 
                                            className={"w-8 h-8 rounded-lg border-2 bg-white text-black hover:bg-gray-50"} 
                                            onClick={() => removeItem(p.id)}
                                            aria-label={`Remove ${p.name} from cart`}
                                        >-</Button>
                                        <span className="mx-2 text-lg" aria-live="polite">{p.quantity}</span>
                                        <Button 
                                            className={"w-8 h-8 rounded-lg border-2"} 
                                            onClick={() => addItem(p)}
                                            aria-label={`Remove ${p.name} from cart`}
                                        >+</Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <p className="mt-3 text-lg">Total: {totalPrice /100} <span className="text-xs">SAR</span></p>
                </div>
                <form action={checkoutAction}>
                    <input type="hidden" name="items" value={JSON.stringify(items)}/>
                    <Button type="submit" className="w-50 mt-5 rounded-3xl py-5 px-6">Proceed to Payment</Button>
                </form>
                <Button className="w-50 mt-1.5 rounded-3xl py-5 px-6" onClick={() => {clearCart()}}>Clear Cart</Button>
                </>
            }
    </section>
    )
}
export default Checkout