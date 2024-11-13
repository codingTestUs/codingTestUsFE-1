import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./mode-toggle";
import { Link, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Github } from "lucide-react";
import { useLoginStateSync } from "@/state"; // 커스텀 훅 불러오기
import axios from 'axios';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useLoginStateSync();

  const handleSignIn = () => {
    window.location.href = "http://150.230.251.225/oauth2/authorization/github";
  };

  const handleLogout = async () => {
    try {
      await axios.get("/logout");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Error during logout request:", error);
    }
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
            <Link to="/challenges" className="font-medium text-md hover:underline">
              Problems
            </Link>
            <Link to="/ranking" className="font-medium text-md hover:underline">
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
                      <DropdownMenuItem className="flex-1 justify-center">
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
