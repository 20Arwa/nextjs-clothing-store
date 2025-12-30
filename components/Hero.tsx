import { stripe } from "@/lib/stripe";
import Image from "next/image"
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero = async () => {
  const heroImage = (await stripe.products.retrieve("prod_TP1u7X9EwU52X3")).images[0]

  return (
    <section className="bg-gray-100">
      <div className="container h-[calc(100vh-4rem)] py-10 lg:px-20! flex flex-col md:flex-row justify-evenly md:justify-between items-center gap-10">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold">Welcome To My Store</h1>
          <p className="my-3 font-medium">Discover the latest products at the best price</p>
          <Button className="rounded-3xl py-5 px-6">
            <Link href={"/products"}> Browse All Products </Link>
          </Button>
        </div>
        <div>
          {heroImage ?           
          <Image src={heroImage} alt="Floral midi skirt blouse with bag" width={300} height={300} className="rounded-xl md:w-[350px] lg:w-[400px]"></Image>
          : <p>Image Not Found</p>
          }
        </div>
      </div>
    </section>
  )
}
export default Hero