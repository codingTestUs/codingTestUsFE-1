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
    const { id } = useParams(); // URL에서 문제 ID 가져오기
    const navigate = useNavigate();

    const [problem, setProblem] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // 초기 코드 설정
    const initialCode = `public class Solution { 
    public static void main(String[] args) { 
        System.out.println("Hello World!"); 
    } 
  }`;

    const [code, setCode] = useState(initialCode);

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
                    const data = await response.json();
                    setProblem(data);
                } else {
                    setError("문제를 가져오는 데 실패했습니다.");
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

    // 코드 편집기 변경 핸들러
    const handleEditorChange = (value: string | undefined) => {
        if (value) setCode(value);
    };

    // 초기화 버튼 핸들러
    const resetAnswer = () => {
        setCode(initialCode);
    };

    // 코드 제출 핸들러
    const submitCode = async () => {
        try {
            const jwt = localStorage.getItem("jwt");

            // 요청 본문 데이터
            const requestBody = {
                problemId: id, // 문제 ID (적절히 동적으로 변경 가능)
                lang: "java",   // 언어 설정
                sourceCode: code, // 현재 코드 편집기에서 작성한 코드
            };

            // API 요청
            const response = await fetch(`https://api.craftlogic.site/code/answer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(requestBody),
            });

            // 응답 처리
            if (response.ok) {
                console.log(response)
                alert("코드가 성공적으로 제출되었습니다!");
            } else {
                const errorData = await response.json();
                alert(`코드 제출에 실패했습니다: ${errorData.message || "알 수 없는 오류"}`);
            }
        } catch (err) {
            console.error("코드 제출 중 오류:", err);
            alert("코드 제출 중 오류가 발생했습니다.");
        }
    };


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
                                    사실 구라임 그런 기능은 <br />
                                    구현하지 않았음.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="text-bold">Cancel</AlertDialogCancel>
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
                        </div>
                    </div>

                    {/* 코드 편집기 */}
                    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                        <Editor
                            theme="vs-dark"
                            defaultLanguage="java"
                            value={code}
                            options={{
                                fontSize: 16,
                                readOnly: false,
                                minimap: { enabled: false },
                            }}
                            height={"70%"}
                            onChange={handleEditorChange}
                        />

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
                                            답이 초기화 돼용
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogAction className="text-bold" onClick={resetAnswer}>
                                            Reset
                                        </AlertDialogAction>
                                        <AlertDialogCancel className="text-bold">Cancel</AlertDialogCancel>
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
                                        <AlertDialogTitle>Hint</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            사실 구라임 그런 기능은 <br />
                                            구현하지 않았음.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="text-bold">Cancel</AlertDialogCancel>
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
                                        <AlertDialogDescription>ㄱㄱ</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogAction className="text-bold" onClick={submitCode}>ㄱㄱ</AlertDialogAction>
                                        <AlertDialogCancel className="text-bold">Cancel</AlertDialogCancel>
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
