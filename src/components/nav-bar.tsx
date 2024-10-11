import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "./mode-toggle"
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate()
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
          <Link to="/blogs" className="font-medium text-md hover:underline">Blogs</Link>
          <Link to="/repo" className="font-medium text-md hover:underline">Repository</Link>
        </div>
        <div className="flex items-center justify-end flex-1 space-x-4">
          <div className="hidden md:block">
            <Input type="search" placeholder="Search..." className="w-[150px]" />
          </div>
          <Button variant="outline" onClick={() => navigate('/login')}>Sign In</Button>
          <Button>Sign Up</Button>
          <ModeToggle/>
            
        </div>
      </div>
    </nav>
  )
}