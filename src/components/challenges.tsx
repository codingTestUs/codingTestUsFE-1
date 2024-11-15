import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, GraduationCap, Github } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Navbar from "./nav-bar";
import Footer from "./footer";
import { useLoginStateSync } from "@/state";

export default function ChallengesPage() {
  const [isLoggedIn, setIsLoggedIn] = useLoginStateSync();
  const [problemList, setProblemList] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 추가
  const [levelFilter, setLevelFilter] = useState('all'); // 선택된 레벨 상태
  const navigate = useNavigate();

  const handleSignIn = () => {
    window.location.href = "http://150.230.251.225/oauth2/authorization/github";
  };

  // 문제 item의 타입 정의
  interface Item {
    title: string;
    level: string;
    correctRate: number;
  }

  // 전체 리스트 출력
  // http://150.230.251.225/problem/list?page=&size=&sort=&title=&level=

  // 코트 필드로 넘어가려면 문제 id 필요
  // 조건 검색 구현 해야됨 (Search 구현, level select 구현, sort는 값이 없어서 현재 안됨)

  useEffect(() => {

    // 선택된 필터 값에 따라 level을 설정
    let level = '';
    if (levelFilter === '1') {
      level = '1';  // 레벨 1
    } else if (levelFilter === '2') {
      level = '2';  // 레벨 2
    } else if (levelFilter === '3') {
      level = '3';  // 레벨 3
    } else if (levelFilter === '4') {
      level = '4';  // 레벨 4
    } else if (levelFilter === 'all') {
      level = '';  // 모든 레벨
    }

    axios
        .get<Item[]>(`http://150.230.251.225/problem/list?page=&size=&sort=&title=${searchQuery}&level=${level}`)
        .then((response) => {
          setProblemList(response.data);
        })
        .catch((error) => console.error('Error fetching data:', error));

  }, [searchQuery, levelFilter]); // searchQuery가 변경될 때마다 API 요청

  return (
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="container flex-grow px-4 py-8 mx-auto">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Coding Challenges</h1>
            <p className="text-gray-600 dark:text-white">
              열심히 풀어서 취업 하셔야지. 열심히 풀어서 취업 하셔야지. 열심히 풀어서 취업 하셔야지.
            </p>
          </div>

          <div className="mb-8">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Challenges</TabsTrigger>
                <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
                <TabsTrigger value="database">Database</TabsTrigger>
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-col gap-4 mb-8 md:flex-row">
            <div className="flex-grow">
              <Input
                  placeholder="Search challenges"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // 검색어 상태 업데이트
              />
            </div>
            {/* Level filter */}
            <Select onValueChange={(value) => setLevelFilter(value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="1">Level 1</SelectItem>
                <SelectItem value="2">Level 2</SelectItem>
                <SelectItem value="3">Level 3</SelectItem>
                <SelectItem value="4">Level 4</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="mostSolved">Most Solved</SelectItem>
              </SelectContent>
            </Select>

          </div>

          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
            {problemList.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-xl">{item.title}</span>
                      <span className="text-sm font-normal text-gray-500 dark:text-white">
                    {item.level}
                  </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-gray-600 dark:text-white">
                      문제 설명 어쩌고 저쩌고...
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-white">
                  <span className="flex items-center">
                    <Code className="w-4 h-4 mr-1" />
                    Java
                  </span>
                      <span className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-1" />
                        {item.correctRate}%
                  </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isLoggedIn ? (
                        <Button className="w-full" onClick={() => navigate('/codefield')}>Start Challenge</Button>
                    ) : (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" className="w-full">로그인하셈용</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Sign up / Sign in</AlertDialogTitle>
                              <AlertDialogDescription>
                                문제 풀려면 로그인해야돼용
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogAction className="text-bold" onClick={handleSignIn}>
                                <Github className="h-12 w-12" />Github
                              </AlertDialogAction>
                              <AlertDialogCancel className="text-bold">Cancel</AlertDialogCancel>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    )}
                  </CardFooter>
                </Card>
            ))}
          </div>

          <div className="py-5">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </main>

        <Footer />
      </div>
  );
}
