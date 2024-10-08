// Call To Action : 고객에게 행동을 유도하는 페이지
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CTA(){
    return(
        <div className="w-full py-20 lg:py-40">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-8 p-4 text-center rounded-md bg-muted lg:p-14">
              <div>
                <Badge>Let's solve</Badge>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="max-w-xl text-3xl tracking-tighter md:text-5xl font-regular">
                  추라이 추라이
                </h3>
                <p className="max-w-xl text-lg leading-relaxed tracking-tight text-muted-foreground">
                  Managing a small business today is already tough. Avoid further
                  complications by ditching outdated, tedious trade methods. Our goal
                  is to streamline SMB trade, making it easier and faster than ever.
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <Button className="gap-4" variant="outline">
                  버튼1
                </Button>
                <Button className="gap-4">
                  버튼2
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
}