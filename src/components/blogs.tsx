"use client";

import { useState } from "react";
import Navbar from "./nav-bar"; // 네비게이션 바 컴포넌트
import Footer from "./footer"; // 푸터 컴포넌트
import { MoveRight } from "lucide-react"; // 아이콘 컴포넌트
import { Button } from "@/components/ui/button"; // 버튼 컴포넌트

export default function Blogs() {
  return (
    <>
      <Navbar />

      <div className="w-full py-20 lg:py-40">
        <div className="container flex flex-col mx-auto gap-14">
          <div className="flex flex-col w-full gap-8 sm:flex-row sm:justify-between sm:items-center">
            <h4 className="max-w-xl text-3xl tracking-tighter md:text-5xl font-regular">
              Latest articles
            </h4>
            <Button className="gap-4">
              View all articles <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2 cursor-pointer hover:opacity-75">
                <div className="mb-4 rounded-md bg-muted aspect-video"></div>
                <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>
                <p className="text-base text-muted-foreground">
                  Our goal is to streamline SMB trade, making it easier and faster than ever.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
