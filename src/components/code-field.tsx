import { CircleAlert, ArrowLeft, Bot, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import { useNavigate } from 'react-router-dom';

export default function CodeField() {
  const navigate = useNavigate();

  return (
    <div className="grid h-screen w-full pl-[53px]">
      <aside className="fixed left-0 z-20 flex flex-col h-full border-r inset-y">
        <div className="p-2 border-b">
          <Button variant="outline" size="icon" aria-label="Home" onClick={() => navigate(-1)}>
            <ArrowLeft className="size-6 " />
          </Button>
        </div>
        <nav className="grid gap-1 p-2"></nav>
        <nav className="grid gap-1 p-2 mt-auto"></nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">행운의 문자열</h1>

          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <CircleAlert size={20} style={{ color: "red" }} />
            문제 신고하기
          </Button>
        </header>
        <main className="grid flex-1 gap-4 p-4 overflow-auto md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative flex-col items-start hidden gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            <div className="grid items-start w-full gap-6">
              <fieldset className="grid gap-6 p-4 border rounded-lg">
                <legend className="inline-block px-1 -ml-1 text-sm font-medium">문제</legend>
                어쩌고 저쩌고 abababab 이런식으로 정렬되면 행운의 숫자열임
              </fieldset>

              <fieldset className="grid gap-6 p-4 border rounded-lg">
                <legend className="inline-block px-1 -ml-1 text-sm font-medium">
                  범위
                </legend>
                {"N <= 20"}
              </fieldset>
              
              <fieldset className="grid gap-6 p-4 border rounded-lg">
                <legend className="inline-block px-1 -ml-1 text-sm font-medium">
                  제한
                </legend>
                풀이 시간 : 1초 <br/>
                메모리 : 1 GB
              </fieldset>
              
            </div>
          </div>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Editor
              theme="vs-dark"
              defaultLanguage="python"
              defaultValue="def solution(n):"
              options={{
                fontSize: 16,
                readOnly: false,
                minimap: { enabled: false },
            }}
              height={"80%"}
            />
            <div className="flex mt-5">
            <Button type="submit" className="ml-auto">
              <Bot className="text-amber-300"/> &nbsp; Hint
            </Button>

            <Button type="submit" className="gap-1.5 ml-3">
              <Check className="text-green-500"/>Submit
            </Button>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}
