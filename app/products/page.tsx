import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import ProductsList from "@/components/ProductsList";

const Products = async () => {
  // Get Products
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 15
  })

  const cleanProducts = products.data.map((p) => ({
    ...p,
    default_price: p.default_price as Stripe.Price,
  }));

  return (
    <section className="container text-center py-10 min-h-[calc(100vh-8rem)]">
      <h1 className="text-2xl font-bold">All Products</h1>
      <ProductsList products={cleanProducts}/>
    </section>
  )
}
export default Products