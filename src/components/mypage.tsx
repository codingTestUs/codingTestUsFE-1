import Navbar from "./nav-bar";
import Footer from "./footer";

"use client"

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Bar, BarChart, CartesianGrid, XAxis, Line, LineChart, Label, Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CalendarIcon, CodeIcon, MailIcon, PencilIcon, TrashIcon, Check, BookOpenCheck, Smile } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input"; // Import Input component
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

// 유형별 차트
const categoryChartData = [
  { category: "StackQueue", me: 186, average: 160 },
  { category: "BruteForce", me: 185, average: 170 },
  { category: "Sort", me: 207, average: 180 },
  { category: "Greedy", me: 173, average: 160 },
  { category: "DFSBFS", me: 160, average: 190 },
  { category: "Hash", me: 174, average: 204 },
];
const categoryChartConfig = {
  me: {
    label: "me",
    color: "hsl(var(--chart-1))",
  },
  average: {
    label: "average",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

// 난이도 차트
const difficultyChartData = [
  { difficulty: "하", me: 90, average: 80 },
  { difficulty: "중", me: 75, average: 60 },
  { difficulty: "상", me: 30, average: 50 },
];
const difficultyChartConfig = {
  desktop: {
    label: "me",
    color: "hsl(var(--chart-1))",
  },
  average: {
    label: "average",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

// 언어별 성공 횟수
const langChartData = [
  { lang: "Java", solved: 275, fill: "var(--color-java)" },
  { lang: "Python", solved: 200, fill: "var(--color-python)" },
];
const langChartConfig = {
  solved: {
    label: "Solved",
  },
  java: {
    label: "Java",
    color: "hsl(var(--chart-1))",
  },
  python: {
    label: "Python",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

// 요일별 성공 횟수
const dailyChartData = [
  { date: "2024-10-17", me: 183, average: 80 },
  { date: "2024-10-18", me: 186, average: 80 },
  { date: "2024-10-19", me: 305, average: 200 },
  { date: "2024-10-20", me: 237, average: 120 },
  { date: "2024-10-21", me: 73, average: 190 },
  { date: "2024-10-22", me: 209, average: 130 },
  { date: "2024-10-23", me: 214, average: 140 },
];
const dailyChartConfig = {
  me: {
    label: "me",
    color: "hsl(var(--chart-1))",
  },
  average: {
    label: "average",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function MyPage() {

  // jwt https://api.craftlogic.site/user로 요청하기
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 로컬 스토리지에서 JWT 가져오기
        const jwt = localStorage.getItem("jwt");

        if (!jwt) {
          setError("JWT가 존재하지 않습니다.");
          return;
        }

          const response = await fetch("https://api.craftlogic.site/user", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${jwt}`, // Bearer 토큰으로 JWT 포함
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data); // 유저 정보 저장
          console.log(data)
        } else {
          setError("유저 정보를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("유저 정보 요청 중 오류 발생:", error);
        setError("유저 정보를 요청하는 중 오류가 발생했습니다.");
      }
    };

    fetchUserInfo();
  }, []);

  if (error) {
    return <div>{error}</div>;  // 오류 메시지 표시
  }

  // userData가 없을 경우 로딩 상태나 기본 메시지 표시
  if (!userData) {
    return <div>유저 정보를 불러오는 중...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container p-6 mx-auto my-5 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* User Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-bold">Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={userData.avatar} alt={userData.provider.providerNickname} />
                  <AvatarFallback>
                    {(userData.provider?.providerNickname?.slice(0, 2) || "NN")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">
                    {userData.nickname || userData.provider.providerNickname}
                  </h2>
                </div>
              </div>
              <div className="space-y-2">
                <p className="flex items-center">
                  <Smile className="w-4 h-4 mr-2" />
                  권한: {userData.role}
                </p>
                <p className="flex items-center">
                  <BookOpenCheck className="w-4 h-4 mr-2" />
                  로그인 방식: {userData.provider.providerEnum}
                </p>
                <p className="flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  해결한 문제: {userData.solveCount}
                </p>
                <p className="flex items-center">
                  <CodeIcon className="w-4 h-4 mr-2" />
                  점수: {userData.score}
                </p>
              </div>
            </CardContent>
          </Card>


          {/* User Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-bold">Badges</CardTitle>
              <CardDescription>Achievements based on your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.userBadgeList.map((badge, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <img src={badge.imageUrl} alt={badge.name} className="w-12 h-12 rounded-full" />
                      <div>
                        <h3 className="font-semibold">{badge.name}</h3>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                        <p className="text-xs text-gray-500">
                          Achieved on: {new Date(badge.achievedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Statistics */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl text-bold">My Statistics</CardTitle>
            <CardDescription>Your coding activity and progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* 차트보여줄부분 */}
            <div className="grid grid-cols-4 gap-2 ">
              {/* 유형별 차트 */}
              <Card>
                <CardHeader className="items-center pb-4">
                  <CardTitle>Category</CardTitle>
                  <CardDescription>
                    유형별 실력 비교
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-0">
                  <ChartContainer
                    config={categoryChartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                  >
                    <RadarChart data={categoryChartData}>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                      />
                      <PolarAngleAxis dataKey="category" className="w-1/4" />
                      <PolarGrid radialLines={false} />
                      <Radar
                        dataKey="me"
                        fill="var(--color-me)"
                        fillOpacity={0}
                        stroke="var(--color-me)"
                        strokeWidth={2}
                      />
                      <Radar
                        dataKey="average"
                        fill="var(--color-average)"
                        fillOpacity={0}
                        stroke="var(--color-average)"
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              {/* 유형별 차트 */}

              {/* 난이도 차트 */}
              <Card>
                <CardHeader className="items-center pb-4">
                  <CardTitle>Difficulty</CardTitle>
                  <CardDescription>난이도별 정답율 비교</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={difficultyChartConfig} className="mx-auto aspect-square max-h-[300px]">
                    <BarChart accessibilityLayer data={difficultyChartData}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="difficulty"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dashed" />}
                      />
                      <Bar dataKey="me" fill="var(--color-desktop)" radius={4} />
                      <Bar dataKey="average" fill="var(--color-average)" radius={4} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              {/* 난이도 차트 */}

              {/* 언어별 차트 */}
              <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                  <CardTitle>Language</CardTitle>
                  <CardDescription>자바 vs 파이썬</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                  <ChartContainer
                    config={langChartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                  >
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie
                        data={langChartData}
                        dataKey="solved"
                        nameKey="lang"
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
                                    {langChartData[0].solved + langChartData[1].solved}
                                  </tspan>
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground"
                                  >
                                    Solved
                                  </tspan>
                                </text>
                              )
                            }
                          }}
                        />
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month
                  </div>
                  <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                  </div>
                </CardFooter>
              </Card>
              {/* 언어별 차트 */}

              {/* 요일별 차트 */}
              <Card>
                <CardHeader className="items-center pb-4">
                  <CardTitle>Daily Solved</CardTitle>
                  <CardDescription>맞춘 횟수 비교</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={dailyChartConfig} className="mx-auto aspect-square w-full max-w-[300px]">
                    <LineChart
                      accessibilityLayer
                      data={dailyChartData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(5, 10)}
                      />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                      <Line
                        dataKey="me"
                        type="monotone"
                        stroke="var(--color-me)"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        dataKey="average"
                        type="monotone"
                        stroke="var(--color-average)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>

              </Card>
              {/* 요일별 차트 */}
            </div>


          </CardContent>
        </Card>
      </div>
      <Footer />

    </>
  )
}