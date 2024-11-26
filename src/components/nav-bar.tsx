import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Github } from "lucide-react";
import { useLoginStateSync } from "@/state"; // 커스텀 훅 불러오기
import { useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useLoginStateSync();

  const handleSignIn = () => {
    window.location.href = "https://api.craftlogic.site/oauth2/authorization/github";
  };

  // 로그아웃 처리 함수
  const logout = () => {
    try {
      // 로그아웃 URL로 이동
      window.location.href = "https://api.craftlogic.site/logout";

      // 로컬 스토리지에서 JWT 삭제
      localStorage.removeItem("jwt");
      setIsLoggedIn(false); // 로그인 상태 초기화

    } catch (error) {
      console.error("로그아웃 요청 중 오류 발생:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
      <nav className="border-b">
        <div className="flex items-center p-4 mx-auto" style={{maxWidth: "85rem"}}>
          <div className="flex-1">
            <Link to="/" className="text-3xl tracking-tighter">
              codingTestUs 🧑‍💻
            </Link>
          </div>
          {/* 중앙 메뉴 */}
          <div className="justify-center flex-1 hidden space-x-8 md:flex">
            <Link to="/challenges" className="font-sans text-md font-semibold hover:underline">
              문제 리스트
            </Link>
            <Link to="/ranking" className="font-sans text-md font-semibold hover:underline">
              랭킹
            </Link>
            <Link to="/blogs" className="font-sans text-md font-semibold hover:underline">
              팀원 소개
            </Link>
          </div>

          {/* 우측 메뉴 */}
          <div className="flex items-center justify-end flex-1 space-x-4">
            {isLoggedIn ? (
                <>
                  <Link to="/mypage">
                    <Button variant="outline" className="font-sans font-bold">
                      내 정보
                    </Button>
                  </Link>
                  <Button
                      variant="outline"
                      className="font-sans font-bold"
                      onClick={logout}
                  >
                    로그아웃
                  </Button>
                </>
            ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="font-sans font-bold">
                      로그인 <ChevronDown className="font-bold ml-2 h-4 w-4"/>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <div className="flex justify-between p-2">
                      <DropdownMenuItem
                          className="flex-1 justify-center font-sans"
                          onClick={handleSignIn}
                      >
                        <Github className="mr-2 h-4 w-4"/>
                        Github
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
            )}
            <ModeToggle/>
          </div>
        </div>
      </nav>
  );
}