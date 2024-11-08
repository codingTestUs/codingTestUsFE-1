import { Button } from "@/components/ui/button";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./mode-toggle";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Github } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // 로그인 상태 관리

  React.useEffect(() => {
    // 로그인 상태를 sessionStorage에서 확인
    const storedLoginStatus = sessionStorage.getItem("isLoggedIn");
    if (storedLoginStatus) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // 로그인 로직 추가 (API 호출 등)
    setIsLoggedIn(true); // 로그인 성공 시 상태 업데이트
    sessionStorage.setItem("isLoggedIn", true); // 세션에 로그인 상태 저장
  };

  const handleSignIn = async () => {
    // GitHub 인증 페이지로 이동
    window.location.href = "http://150.230.251.225/oauth2/authorization/github";
    console.log("Attempting to log in...");
  };

  const handleLogout = () => {
    // 로그아웃 처리: 세션 스토리지에서 로그인 상태 제거
    sessionStorage.removeItem("isLoggedIn");
    console.log("Logged out successfully, session data removed");
    setIsLoggedIn(false); // 상태 업데이트
    window.location.href = "/"; // 홈으로 리다이렉션
  };

  return (
      <nav className="border-b">
        <div className="flex items-center p-4 mx-auto" style={{ maxWidth: "85rem" }}>
          <div className="flex-1">
            <Link to="/" className="text-3xl tracking-tighter">
              codingTestUs 🧑‍💻
            </Link>
          </div>
          <div className="justify-center flex-1 hidden space-x-8 md:flex">
            <Link to="/" className="font-medium text-md hover:underline">
              Features
            </Link>
            <Link to="/challenges" className="font-medium text-md hover:underline">
              Problems
            </Link>
            <Link to="/" className="font-medium text-md hover:underline">
              Rank
            </Link>
            <Link to="/blogs" className="font-medium text-md hover:underline">
              About Us
            </Link>
          </div>
          <div className="flex items-center justify-end flex-1 space-x-4">
            <div className="hidden md:block">
              <Input type="search" placeholder="Search..." className="w-[150px]" />
            </div>

            {isLoggedIn ? (
                <>
                  <Link to="/mypage">
                    <Button variant="outline">My Page</Button>
                  </Link>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
            ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Sign In <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <div className="flex justify-between p-2">
                      <DropdownMenuItem className="flex-1 justify-center" onClick={handleSignIn}>
                        <Github className="mr-2 h-4 w-4" />
                        Github
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex-1 justify-center" onClick={handleLogin}>
                        <span className="text-lg">G</span> &nbsp; Google
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
            )}
            <ModeToggle />
          </div>
        </div>
      </nav>
  );
}
