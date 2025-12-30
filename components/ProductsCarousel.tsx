"use client";

import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

type ProductsCarouselProps = {
  products: (Stripe.Product & { default_price: Stripe.Price })[];
};

export default function ProductsCarousel({ products }: ProductsCarouselProps) {
  const autoplay = useRef(
    Autoplay({
      delay: 5000, 
      stopOnInteraction: false,
    })
  );

  return (
    <section className="container w-2/3! md:w-5/6! py-20">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplay.current]}
        className="w-full max-w-full"
        >
        <CarouselContent>
          {products.map((prod,index) => (
            <CarouselItem
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${products.length}`}
            key={prod.id}
            className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
              <Link href={`products/${prod.id}`}>
                <Card className="py-0">
                  <CardContent className="flex flex-col aspect-square items-center justify-end p-6 relative">
                  <Image src={prod.images[0]} alt={prod.name} fill className="object-cover object-center rounded-lg"></Image>
                  <div className="details absolute bottom-10 left-1/2 -translate-x-1/2 w-[75%] p-1 text-base font-medium text-center text-gray-900 bg-white/70 rounded-lg">
                    <p>{prod.name}</p>
                    <p>
                    {prod.default_price.unit_amount
                      ? prod.default_price.unit_amount / 100
                      : "Price Not Found"}
                    <span className="ms-0.5 text-xs">
                      {prod.default_price.currency.toUpperCase()}
                    </span>
                    </p>
                  </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious aria-label="Previous products"/>
        <CarouselNext aria-label="Next products"/>
      </Carousel>
    </section>
  );
}
