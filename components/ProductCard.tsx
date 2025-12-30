import Stripe from "stripe";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link";

type ProductCardTypes = {
    product: (Stripe.Product & { default_price: Stripe.Price });
};

const ProductCard = ({product}: ProductCardTypes) => {
    return (
        <Link href={`/products/${product.id}`}>
            <Card className="w-full h-full pt-0 text-start justify-between">
                <CardHeader className="aspect-3/4 rounded-t-xl p-0 relative">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover object-center rounded-t-xl"/>
                </CardHeader>
                <CardContent>
                    <h2 className="text-lg font-bold">{product.name}</h2>
                    <p className="my-1.5 min-h-12">{product.description}</p>
                    {/* Price */}
                    <p className="font-bold text-xl">
                        {product.default_price.unit_amount
                            ? product.default_price.unit_amount / 100
                            : "Price Not Found"}
                        <span className="ms-0.5 text-xs"> {product.default_price.currency.toUpperCase()}</span>
                    </p>
                </CardContent>
                <CardFooter className="flex-col gap-2 w-full">
                    <Button className="w-full text-base rounded-3xl py-5 px-6">View Details</Button>
                </CardFooter>
            </Card>
        </Link>
    )
}
export default ProductCard



