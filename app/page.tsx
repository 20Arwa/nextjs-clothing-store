import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import Hero from "@/components/Hero";
import ProductsCarousel from "@/components/ProductsCarousel";

export default async function Home() {
  // Get Products
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5
  })

  const cleanProducts = products.data.map((p) => ({
    ...p,
    default_price: p.default_price as Stripe.Price,
  }));

  return (
    <>
    <Hero></Hero>
    <ProductsCarousel products={cleanProducts}></ProductsCarousel>
    </>
  );
}
