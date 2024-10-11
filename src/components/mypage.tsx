import Navbar from "./nav-bar";
import Footer from "./footer";

"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CalendarIcon, CodeIcon, MailIcon, PencilIcon, TrashIcon, Check } from "lucide-react"

// Mock user data
const user = {
  nickname: "CodeMaster",
  email: "codemaster@example.com",
  creationDate: "2022-01-01",
  solvedProblems: 150,
  preferredLanguage: "JavaScript",
  avatarUrl: "/placeholder.svg?height=100&width=100",
}

// Mock badge data
const badges = [
  { name: "Problem Solver", level: "Gold", description: "Solved 100+ problems" },
  { name: "Streak Master", level: "Silver", description: "30-day solving streak" },
  { name: "Language Expert", level: "Bronze", description: "Mastered 3 languages" },
]

// Mock activity data
const activityData = [
  { date: "2023-05-01", problems: 5 },
  { date: "2023-05-02", problems: 3 },
  { date: "2023-05-03", problems: 7 },
  { date: "2023-05-04", problems: 2 },
  { date: "2023-05-05", problems: 6 },
  { date: "2023-05-06", problems: 4 },
  { date: "2023-05-07", problems: 8 },
]

// Mock language usage data
const languageData = [
  { language: "JavaScript", usage: 60 },
  { language: "Python", usage: 25 },
  { language: "Java", usage: 10 },
  { language: "C++", usage: 5 },
]

export default function MyPage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
    <Navbar/>
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
                <AvatarImage src={user.avatarUrl} alt={user.nickname} />
                <AvatarFallback>{user.nickname.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{user.nickname}</h2>
                <p className="flex items-center text-muted-foreground">
                  <MailIcon className="w-4 h-4 mr-2" />
                  {user.email}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Joined: {new Date(user.creationDate).toLocaleDateString()}
              </p>
              <p className="flex items-center">
                <Check className="w-4 h-4 mr-2"/>
                Solved Problems: {user.solvedProblems}
              </p>
              <p className="flex items-center">
                <CodeIcon className="w-4 h-4 mr-2" />
                Preferred Language: {user.preferredLanguage}
              </p>
            </div>
            <div className="flex justify-between pt-5">
              <Button>
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="destructive">
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
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
              {badges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Badge variant="outline" className={`text-${badge.level.toLowerCase()}`}>
                    {badge.level}
                  </Badge>
                  <div>
                    <h3 className="font-semibold">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Statistics */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl text-bold">User Statistics</CardTitle>
          <CardDescription>Your coding activity and progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Activity Chart */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">Daily Activity</h3>
            <ChartContainer
              config={{
                problems: {
                  label: "Problems Solved",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="problems" stroke="var(--color-problems)" name="Problems Solved" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Language Usage Chart */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">Language Usage</h3>
            <ChartContainer
              config={{
                usage: {
                  label: "Usage (%)",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={languageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="language" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="usage" fill="var(--color-usage)" name="Usage (%)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
    <Footer/>
    </>
  )
}
