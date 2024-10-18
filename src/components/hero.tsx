import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero(){
    return(
        <div className="w-full py-20 lg:py-20">
    <div className="container mx-auto">
      <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div>
            <Badge variant="outline">Capstone Design 2024</Badge>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="max-w-lg text-5xl tracking-tighter text-left md:text-6xl">
              codingTestUs <br/>
              <span className="text-4xl tracking-normal">Problems AI Generated </span>
            </h1>
            <p className="max-w-md text-xl leading-relaxed tracking-tight text-left text-muted-foreground">
              API로 코테 데이터 모아서 학습시키고 클릭 딸깍 하면 코테 문제 생성 캬 ㅋㅋㅋAPI로 코테 데이터 모아서 학습시키고 클릭 딸깍 하면 코테 문제 생성 캬 ㅋㅋㅋ
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button size="lg" className="gap-4" variant="outline">
                Explore Features
            </Button>
            <Button size="lg" className="gap-4">
              Get Started <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <img className="rounded-md " src="https://cdn.pixabay.com/photo/2024/03/08/10/43/ai-generated-8620473_960_720.png"/>
      </div>
    </div>
  </div>
    )
}