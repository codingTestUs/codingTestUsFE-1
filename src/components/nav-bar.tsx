import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Menu } from 'lucide-react'
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex items-center p-4 mx-auto" style={{ maxWidth: '85rem' }}>
        <div className="flex-1">
          <a href="/" className="text-3xl tracking-tighter">codingTestUs 🧑‍💻</a>
        </div>
        <div className="justify-center flex-1 hidden space-x-8 md:flex">
          <a href="#" className="font-medium text-md hover:underline">Features</a>
          <a href="#" className="font-medium text-md hover:underline">Problems</a>
          <a href="#" className="font-medium text-md hover:underline">Rank</a>
          <a href="#" className="font-medium text-md hover:underline">Blogs</a>
          <a href="#" className="font-medium text-md hover:underline">Repository</a>
        </div>
        <div className="flex items-center justify-end flex-1 space-x-4">
          <div className="hidden md:block">
            <Input type="search" placeholder="Search..." className="w-[150px]" />
          </div>
          <Button variant="outline">Sign In</Button>
          <Button>Sign Up</Button>
          <ModeToggle/>
            
        </div>
      </div>
    </nav>
  )
}