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
                        우리가 사용한 언어와 도구들
                    </h3>
                    <div className="relative w-full col-span-4">
                        <div className="absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full bg-gradient-to-r from-background via-white/0 to-background"></div>
                        <Carousel setApi={setApi} className="w-full">
                            <CarouselContent>
                                {Array.from({ length: 9 }).map((_, index) => (
                                    <CarouselItem
                                        className="basis-1/4 lg:basis-1/6"
                                        key={index}
                                    >
                                        <div className="flex items-center justify-center p-2 rounded-md aspect-square bg-muted">
                                            <img
                                                src={
                                                    index === 0
                                                        ? 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' // JavaScript
                                                        : index === 1
                                                            ? 'https://i0.wp.com/chelseatroy.com/wp-content/uploads/2015/09/spring.png?fit=340%2C340&ssl=1' // Java Spring
                                                            : index === 2
                                                                ? 'https://i.namu.wiki/i/EY559r31H-um8uTtptPIbCZoBGxsumSlwEH0T_rA6WmxQq1UwqyAf3cJQJXN7Fv5CoEz0kv5CBXzjkkPU_XWig.svg' // TypeScript
                                                                : index === 3
                                                                    ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' // React
                                                                    : index === 4
                                                                        ? 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' // Tailwind CSS
                                                                        : index === 5
                                                                            ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/IntelliJ_IDEA_Icon.svg/1200px-IntelliJ_IDEA_Icon.svg.png' // IntelliJ IDEA
                                                                            : index === 6
                                                                                ? 'https://cdn-icons-png.flaticon.com/256/25/25231.png' // GitHub
                                                                                : index === 7
                                                                                    ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/R_logo.svg/1200px-R_logo.svg.png' // R 언어
                                                                                    : index === 8
                                                                                        ? 'https://blog.kakaocdn.net/dn/cn9zq6/btsaUkhGHdY/mIk7jxWPNmOrVftZkBbkTK/img.png' // Python
                                                                                        : 'https://blog.kakaocdn.net/dn/cMchHi/btqBD1oJkW6/A1zqWjJ8GvVSUstHCqWku1/img.png'
                                                }
                                                alt={`Logo ${index + 1}`}
                                                className="w-12 h-12 object-contain"
                                            />
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