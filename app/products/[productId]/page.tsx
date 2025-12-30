import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import ProductDetails from "@/components/ProductDetails"

const ProductPage = async ({params,} : {params: Promise<{productId: string}> }) => {
    const {productId} = await params
    const product = await stripe.products.retrieve(productId, {
        expand: ["default_price"],
    })

    return (
        <ProductDetails product={JSON.parse(JSON.stringify(product)) as Stripe.Product & { default_price: Stripe.Price }} />
    )
}
export default ProductPage
