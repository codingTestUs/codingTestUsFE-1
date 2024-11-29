"use client";

import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
} from "recharts";

export const description = "A donut chart with text";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const lineChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const lineChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Hero() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/challenges");
  };

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <div className="w-full py-20 lg:py-20">
      <div className="container mx-auto">
        <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div>
              <Badge variant="outline">Capstone Design 2024</Badge>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="max-w-lg text-5xl tracking-tighter text-left md:text-6xl">
                codingTestUs <br />
                <span className="text-4xl tracking-normal">AI가 생성하는 문제들</span>
              </h1>
              <p className="max-w-md text-xl leading-relaxed tracking-tight text-left text-muted-foreground">
                저희는 API를 통해 코딩 테스트 데이터를 수집하고, 이를 기반으로 모델을 학습시켜 문제를 생성 및 제공합니다.
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button size="lg" className="gap-4" variant="outline">
                기능 살펴보기
              </Button>
              <Button size="lg" className="gap-4" onClick={handleGetStartedClick}>
                시작하기 <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {/* 이미지 추가: 텍스트 오른쪽에 위치 */}
          <img
            className="rounded-md"
            src="https://cdn.pixabay.com/photo/2024/03/08/10/43/ai-generated-8620473_960_720.png"
            alt="AI Generated Image"
          />
        </div>
        {/* 차트 추가: 이미지 아래에 위치 */}
        <div className="mt-20 flex gap-10"> {/* 여백을 위해 mt-8 추가, flex를 사용하여 차트 나란히 배치 */}
          {/* 도넛 차트 */}
          <Card className="flex-1 ">
            <CardHeader className="items-center pb-0">
              <CardTitle>현재 제공 가능한 문제의 상태</CardTitle>
              <CardDescription>2024년 1월 - 10월</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                      data={chartData}
                      dataKey="visitors"
                      nameKey="browser"
                      innerRadius={60}
                      strokeWidth={5}
                  >
                    <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                                <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                >
                                  <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-3xl font-bold"
                                  >
                                    {totalVisitors.toLocaleString()}
                                  </tspan>
                                  <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 24}
                                      className="fill-muted-foreground"
                                  >
                                    방문자
                                  </tspan>
                                </text>
                            );
                          }
                        }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                이번 달 5.2% 증가 <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                최근 6개월 동안의 총 방문자 수
              </div>
            </CardFooter>
          </Card>

          {/* 라인 차트 추가 */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>현재 사용자 수 상태</CardTitle>
              <CardDescription>2024년 1월 - 10월</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={lineChartConfig}>
                <LineChart
                    data={lineChartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                      dataKey="desktop"
                      type="natural"
                      stroke="var(--color-desktop)"
                      strokeWidth={2}
                      dot={{
                        fill: "var(--color-desktop)",
                      }}
                      activeDot={{
                        r: 6,
                      }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                이번 달 5.2% 증가 <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                월별 방문자 수 데이터
              </div>
            </CardFooter>
          </Card>

        </div>
      </div>
    </div>
  );
}
