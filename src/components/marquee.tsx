import { useEffect, useState } from "react";
import {
Carousel,
CarouselApi,
CarouselContent,
CarouselItem,
} from "@/components/ui/carousel";

export default function Marquee(){
    const [api, setApi] = useState<CarouselApi>();
const [current, setCurrent] = useState(0);

useEffect(() => {
    if (!api) {
    return;
    }

    setTimeout(() => {
    if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
    } else {
        api.scrollNext();
        setCurrent(current + 1);
    }
    }, 1000);
}, [api, current]);

return (
    <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
        <div className="grid items-center grid-cols-5 gap-10">
        <h3 className="text-xl tracking-tighter text-left lg:max-w-xl font-regular">
            멋져보여서 갖다 놨는데 쓸데가 없음 ㅋ
        </h3>
        <div className="relative w-full col-span-4">
            <div className="absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full bg-gradient-to-r from-background via-white/0 to-background"></div>
            <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
                {Array.from({ length: 25 }).map((_, index) => (
                <CarouselItem
                    className="basis-1/4 lg:basis-1/6"
                    key={index}
                >
                    <div className="flex items-center justify-center p-2 rounded-md aspect-square bg-muted">
                    <span className="text-sm">Logo {index + 1}</span>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            </Carousel>
        </div>
        </div>
    </div>
    </div>
);
}