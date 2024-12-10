import {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Code, GraduationCap, Github} from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
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
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import Navbar from "./nav-bar";
import Footer from "./footer";
import {useLoginStateSync} from "@/state";
import "@/components/css/Challenges.css";

export default function ChallengesPage() {

    const [isLoggedIn, setIsLoggedIn] = useLoginStateSync();
    const [apiResponse, setApiResponse] = useState<ApiResponse>({
        content: [],
        page: {
            size: 0,
            number: 0,
            totalElements: 0,
            totalPages: 0,
        },
    });

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [pageSize, setPageSize] = useState(9); // 페이지 크기
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

    const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 추가
    const [levelFilter, setLevelFilter] = useState('all'); // 선택된 레벨 상태

    const [sort, setSort] = useState<string>('title,asc'); // 기본 정렬: 제목 오름차순

    const navigate = useNavigate();

    const handleSignIn = () => {
        window.location.href = "https://api.craftlogic.site/oauth2/authorization/github";
    };

    // 페이지 이동 시 상태를 업데이트
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // 정렬 기준
    const handleSortChange = (value: string) => {
        let sortValue = '';
        if (value === 'newest') {
            sortValue = 'title,desc';
        } else if (value === 'oldest') {
            sortValue = 'title,asc';
        } else if (value === 'mostSolved') {
            sortValue = 'correctRate,desc';
        }
        setSort(sortValue);
    };

    // 문제의 타입 정의
    interface Problem {
        id: number;
        title: string;
        level: string;
        correctRate: number;
    }

    // JSON 응답 타입 정의
    interface ApiResponse {
        content: Problem[];
        page: {
            size: number;
            number: number;
            totalElements: number;
            totalPages: number;
        };
    }

    // 전체 리스트 출력
    // https://api.craftlogic.site/problem/list?page=&size=&sort=&title=&level=
    // 코트 필드로 넘어가려면 문제 id 필요
    // 조건 검색 구현 해야됨 (Search 구현, level select 구현, sort는 값이 없어서 현재 안됨)
    useEffect(() => {

        // 선택된 필터 값에 따라 level을 설정
        let level = '';
        if (levelFilter === '0') {
            level = '0'; // 레벨 0
        } else if (levelFilter === '1') {
            level = '1'; // 레벨 1 
        } else if (levelFilter === '2') {
            level = '2'; // 레벨 2
        } else if (levelFilter === '3') {
            level = '3'; // 레벨 3
        } else if (levelFilter === '4') {
            level = '4'; // 레벨 4
        } else if (levelFilter === '5') {
            level = '5'; // 레벨 5
        } else if (levelFilter === 'all') {
            level = ''; // 모든 레벨
        }

        const fetchData = async () => {
            try {
                const response = await axios.get<ApiResponse>(
                    `https://api.craftlogic.site/problem/list?page=${currentPage - 1}&size=${pageSize}&sort=${sort}&title=${searchQuery}&level=${level}`
                );
                setApiResponse(response.data);
                setTotalPages(response.data.page.totalPages); // 총 페이지 수 업데이트
            } catch (error) {
                console.error('Error fetching data:', error);
                setApiResponse({
                    content: [],
                    page: {
                        size: 0,
                        number: 0,
                        totalElements: 0,
                        totalPages: 0,
                    },
                });
            }
        };

        fetchData();
    }, [searchQuery, levelFilter, currentPage, pageSize, sort]); // searchQuery가 변경될 때마다 API 요청

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>

            <main className="container flex-grow px-4 py-8 mx-auto">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold">Coding Challenges</h1>
                    <p className="text-gray-600 dark:text-white">
                        만일 여러분이 코딩을 할 수 있게 된다면, 앉은 자리에서 무엇인가를 만들어낼 수 있고. 아무도 당신을 막을 수 없을 것이다. - 마크 주커버그
                    </p>
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
                            <SelectValue placeholder="Difficulty"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            <SelectItem value="0">Level 0</SelectItem>
                            <SelectItem value="1">Level 1</SelectItem>
                            <SelectItem value="2">Level 2</SelectItem>
                            <SelectItem value="3">Level 3</SelectItem>
                            <SelectItem value="4">Level 4</SelectItem>
                            <SelectItem value="5">Level 5</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select onValueChange={(value) => handleSortChange(value)}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Sort by"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest Solved</SelectItem>
                            <SelectItem value="oldest">Oldest Solved</SelectItem>
                            <SelectItem value="mostSolved">Most Solved</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                    {apiResponse?.content?.length > 0 ? (
                        apiResponse.content.map((problem, index) => (
                            <Card
                                key={index}
                                className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
            <span className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {problem.title}
            </span>
                                        <span className="text-sm font-normal text-gray-600 dark:text-gray-300">
              {problem.level}
            </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <span className="flex items-center">
              <Code className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
              Java
            </span>
                                        <span className="flex items-center">
              <GraduationCap className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                                            {problem.correctRate}%
            </span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    {isLoggedIn ? (
                                        <Button
                                            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                                            onClick={() => navigate(`/codefield/${problem.id}`)}
                                        >
                                            Start Challenge
                                        </Button>
                                    ) : (
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="outline" className="w-full">
                                                    로그인이 필요합니다.
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Sign up / Sign in</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        문제를 풀려면 로그인해야 합니다. 계정을 연결해주세요.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogAction className="text-bold" onClick={handleSignIn}>
                                                        <Github className="h-6 w-6 mr-2" />
                                                        GitHub 로그인
                                                    </AlertDialogAction>
                                                    <AlertDialogCancel className="text-bold">취소</AlertDialogCancel>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    )}
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <p>No challenges found.</p>
                    )}
                </div>

                <div className="py-5">
                    <ul className="pagination">
                        <li>
                            <a
                                href="#"
                                className={`previous ${currentPage === 1 ? 'disabled' : ''}`}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Previous
                            </a>
                        </li>
                        {Array.from({length: totalPages}, (_, index) => (
                            <li key={index}>
                                <a
                                    href="#"
                                    className={currentPage === index + 1 ? 'active' : ''}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a
                                href="#"
                                className={`next ${currentPage === totalPages ? 'disabled' : ''}`}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next
                            </a>
                        </li>
                    </ul>
                </div>

            </main>
            <Footer/>
        </div>
    );
}
