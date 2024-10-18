import { Button } from "@/components/ui/button"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "./mode-toggle"
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Home, Settings, User, Mail, Bell, Bookmark, Star, Github } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function Navbar() {
  const navigate = useNavigate()
  const [position, setPosition] = React.useState("bottom")
  return (
    <nav className="border-b">
      <div className="flex items-center p-4 mx-auto" style={{ maxWidth: '85rem' }}>
        <div className="flex-1">
          <Link to="/" className="text-3xl tracking-tighter">codingTestUs 🧑‍💻</Link>
        </div>
        <div className="justify-center flex-1 hidden space-x-8 md:flex">
          <Link to="/" className="font-medium text-md hover:underline">Features</Link>
          <Link to="/challenges" className="font-medium text-md hover:underline">Problems</Link>
          <Link to="/" className="font-medium text-md hover:underline">Rank</Link>
          <Link to="/blogs" className="font-medium text-md hover:underline">About Us</Link>
          
        </div>
        <div className="flex items-center justify-end flex-1 space-x-4">
          <div className="hidden md:block">
            <Input type="search" placeholder="Search..." className="w-[150px]" />
          </div>

          <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Sign In <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="flex justify-between p-2">
          <DropdownMenuItem className="flex-1 justify-center">
            <Github className="mr-2 h-4 w-4" />
            Github
          </DropdownMenuItem>
          <DropdownMenuItem className="flex-1 justify-center">
            <span className="text-lg">G</span> &nbsp;
            Google
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>

          {/* <Button variant="outline" onClick={() => navigate('/login')}>Sign In</Button>
          <Button>Sign Up</Button> */}
          <ModeToggle/>
            
        </div>
      </div>
    </nav>
  )
}