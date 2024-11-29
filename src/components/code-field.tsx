import { CircleAlert, ArrowLeft, Bot, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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

export default function CodeField() {

    interface Problem {
        title: string; // 문제 제목
        level: string; // 문제 난이도
        score: number; // 점수
        description: string; // 문제 설명
        limitation: string; // 제한 조건
        inputOutput: string; // 입출력 예시
        returnType: string; // 리턴 타입
        params: { type: string, name: string }[]; // 파라미터 목록
    }

    const { id } = useParams(); // URL에서 문제 ID 가져오기
    const navigate = useNavigate();

    const [problem, setProblem] = useState<Problem | null>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<any>(null);

    // 초기 코드 생성 함수
    const generateInitialCode = (problem) => {
        if (!problem) return '';

        const returnType = problem.returnType || 'void'; // 기본값 'void'
        const params = problem.params || '';  // params가 배열인지 확인

        return `public class Solution {
    public static ${returnType} main(${params}) {
        System.out.println("Java 실행 Hello!!!");
        return ;
    }
 }`;
    };

    // 초기화 코드 설정
    const initialCode = problem ? generateInitialCode(problem) : ``;

    const [code, setCode] = useState<string>('');
    useEffect(() => {
        if (problem) {
            setCode(generateInitialCode(problem));  // 문제 데이터를 받아온 후 코드 설정
        }
    }, [problem]);

    // API로 문제 데이터 가져오기
    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const jwt = localStorage.getItem("jwt");
                if (!jwt) {
                    setError("로그인 정보가 없습니다. 다시 로그인해주세요.");
                    return;
                }

                const response = await fetch(`https://api.craftlogic.site/problem/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                if (response.ok) {
                    const data: Problem = await response.json(); // Problem 타입 사용
                    setProblem(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || "문제를 가져오는 데 실패했습니다.");
                }
            } catch (err) {
                console.error("API 요청 오류:", err);
                setError("문제를 가져오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchProblem();
    }, [id]);

    // 로딩 상태 처리
    if (loading) {
        return <div className="loading-spinner">데이터를 불러오는 중...</div>;
    }

    if (error) {
        return <div className="error-box">{error}</div>;
    }

    // 코드 편집기 에서의 변경 핸들러
    const handleEditorChange = (value: string | undefined) => {
        if (value) setCode(value);
    };

    // 초기화 버튼 핸들러
    const resetAnswer = () => {
        setCode(initialCode);
    };

    // 코드 제출 함수
    const submitCode = async () => {
        try {
            const jwt = localStorage.getItem("jwt");

            if (!jwt) {
                alert("로그인이 필요합니다.");
                return;
            }

            const requestBody = {
                problemId: id,
                lang: "java",
                sourceCode: code,
            };

            const response = await fetch(`https://api.craftlogic.site/code/answer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const responseData = await response.json();

                const allCorrect = responseData.every((result) => result.isCorrect);
                const totalRuntime = responseData.reduce((acc, result) => {
                    const runtime = parseFloat(result.runtime.replace("ms", ""));
                    return acc + runtime;
                }, 0);

                const message = allCorrect ? "정답입니다! 축하합니다!" : "오답입니다. 일부 테스트 케이스가 실패했습니다.";

                // setResult 호출하여 상태 업데이트
                setResult({
                    message,
                    totalTime: totalRuntime,
                    testCases: responseData.map((result, index) => ({
                        testcaseAnswer: result.testcaseAnswer,
                        userAnswer: Array.isArray(result.userAnswer)
                            ? result.userAnswer.join(", ")
                            : result.userAnswer,
                        runtime: result.runtime,
                        pramData: result.pramData,
                        isCorrect: result.isCorrect,
                    })),
                });

                console.log(message);
            } else {
                const errorData = await response.json();
                alert(`코드 제출에 실패했습니다: ${errorData.message || "알 수 없는 오류"}`);
            }
        } catch (err) {
            console.error("코드 제출 중 오류:", err);
            alert("코드 제출 중 오류가 발생했습니다.");
        }
    };

    // 로딩 중이거나 에러가 있을 때 코드 편집기 비활성화
    if (loading) return <div>데이터를 불러오는 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="grid h-screen w-full pl-[53px]">
            {/* 사이드바 */}
            <aside className="fixed left-0 z-20 flex flex-col h-full border-r inset-y">
                <div className="p-2 border-b">
                    <Button
                        variant="outline"
                        size="icon"
                        aria-label="Home"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="size-6 " />
                    </Button>
                </div>
            </aside>

            {/* 메인 화면 */}
            <div className="flex flex-col">
                {/* 헤더 */}
                <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
                    <h1 className="text-xl font-semibold">{problem?.title}</h1>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
                                <CircleAlert size={20} style={{ color: "red" }} />
                                문제 신고하기
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>문제 신고하기</AlertDialogTitle>
                                <AlertDialogDescription>
                                    아직 신고 기능은 준비 중이에요. <br />
                                    더 나은 서비스를 위해 노력 중이니 조금만 기다려주세요! 😊
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="text-bold">확인</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </header>

                {/* 문제 정보 및 에디터 */}
                <main className="grid flex-1 gap-4 p-4 overflow-auto md:grid-cols-2 lg:grid-cols-3">
                    <div className="relative flex-col items-start hidden gap-8 md:flex">
                        <div className="grid items-start w-full gap-6">
                            {/* 문제 설명 */}
                            <fieldset className="grid gap-6 p-4 border rounded-lg">
                                <legend className="inline-block px-1 -ml-1 text-sm font-medium">문제 설명</legend>
                                <p>{problem?.description}</p>
                            </fieldset>

                            {/* 제한 */}
                            <fieldset className="grid gap-6 p-4 border rounded-lg">
                                <legend className="inline-block px-1 -ml-1 text-sm font-medium">제한</legend>
                                <p>{problem?.limitation || "제한 사항 없음"}</p>
                            </fieldset>

                            {/* 입출력 예시 */}
                            <fieldset className="grid gap-6 p-4 border rounded-lg">
                                <legend className="inline-block px-1 -ml-1 text-sm font-medium">입출력 예시</legend>
                                <p>{problem?.inputOutput}</p>
                            </fieldset>

                            {/* 코드 실행 결과 */}
                            {result && (
                                <fieldset className="grid gap-6 p-4 border rounded-lg">
                                    <legend className="inline-block px-1 -ml-1 text-sm font-medium">코드 실행 결과</legend>
                                    <p>{result.message}</p>
                                    <p>총 걸린 시간: {result.totalTime}ms</p>
                                    <table className="w-full border-collapse">
                                        <thead>
                                        <tr>
                                                <th className="px-4 py-2 border">테스트 케이스</th>
                                                <th className="px-4 py-2 border">파라미터</th>
                                            <th className="px-4 py-2 border">정답</th>
                                            <th className="px-4 py-2 border">제출한 답</th>
                                            <th className="px-4 py-2 border">걸린 시간</th>
                                            <th className="px-4 py-2 border">결과</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {result.testCases.map((testCase, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 border">{index + 1}</td>
                                                <td className="px-4 py-2 border">{testCase.pramData}</td>
                                                <td className="px-4 py-2 border">{testCase.testcaseAnswer}</td>
                                                <td className="px-4 py-2 border">{testCase.userAnswer}</td>
                                                <td className="px-4 py-2 border">{testCase.runtime}</td>
                                                <td className="px-4 py-2 border">
                                                    {testCase.isCorrect ? (
                                                        <Check size={18} className="text-green-500" />
                                                    ) : (
                                                        <CircleAlert size={18} className="text-red-500" />
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </fieldset>
                            )}
                        </div>
                    </div>

                    {/* 코드 편집기 */}
                    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                        <div className="p-2">
                            <Editor
                                height="80vh"
                                language="java"
                                value={code}
                                onChange={handleEditorChange}
                                options={{
                                    readOnly: loading || error ? true : false,
                                    fontSize: 18, // 글자 크기 설정
                                }}
                                theme="vs-dark" // 다크 모드 테마 설정
                            />
                        </div>

                        {/* 버튼 */}
                        <div className="flex mt-5">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="ml-auto mr-3 dark:text-white">
                                        <RotateCcw className="text-rose-500" /> Reset
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Reset Answer</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            문제가 초기화됩니다. 주의해 주세요.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogAction className="text-bold" onClick={resetAnswer}>
                                            초기화하기
                                        </AlertDialogAction>
                                        <AlertDialogCancel className="text-bold">취소</AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="gap-1.5 dark:text-white">
                                        <Bot className="text-amber-400" /> Hint
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>힌트</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            아직 힌트 기능은 준비 중이에요. <br />
                                            더 나은 서비스를 위해 노력 중이니 조금만 기다려주세요! 😊
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="text-bold">확인</AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="gap-1.5 ml-3 dark:text-white">
                                        <Check className="text-green-500" /> Submit
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>제출</AlertDialogTitle>
                                        <AlertDialogDescription>정말로 제출 하시겠습니까??</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogAction
                                            className="text-bold"
                                            onClick={async () => {
                                                await submitCode(); // 코드 제출 함수 호출
                                            }}
                                        >
                                            제출하기
                                        </AlertDialogAction>
                                        <AlertDialogCancel className="text-bold">취소</AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
