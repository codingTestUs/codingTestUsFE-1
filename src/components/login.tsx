import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "./nav-bar";
import Footer from "./footer";

export default function Login() {
  // 링크 부분 나중에 작동하도록 수정해야됨

  return (
    <>
      <Navbar />
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            {/* <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div> */}
            <div className="mt-4 text-sm text-center">
              Don&apos;t have an account? Sign up
            </div>
            <div className="text-sm text-center "> Forgot your password? </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="https://cdn.pixabay.com/photo/2023/03/04/20/07/coffee-7830087_960_720.jpg"
            alt="Image"
            className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
