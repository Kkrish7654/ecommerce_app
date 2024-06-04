"use client";

import * as React from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "@/lib/axiosConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/redux/reducers/auth.reducer";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleLogin(e: React.BaseSyntheticEvent) {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const credentials = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
      const res = await axios({
        url: "users/login",
        method: "POST",
        data: credentials,
      });
      if (res) {
        const loginData = res?.data?.data;
        Cookies.set("accesstoken", loginData?.token);
        dispatch(login(loginData));
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main className="h-screen w-full flex items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <div className="flex gap-2">
                    <Link href="/">
                      <Button variant="destructive">Cancel</Button>
                    </Link>
                    <Button variant="outline">Register</Button>
                  </div>
                  <Button type="submit">Login</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default Login;
