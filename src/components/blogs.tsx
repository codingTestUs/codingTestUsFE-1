"use client";

import { useState } from "react";
import Navbar from "./nav-bar";
import Footer from "./footer";
import { MoveRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TeamMembers = () => {
  const teamMembers = [
    {
      name: "1212",
      role: "CEO",
      description: "Visionary leader with 10+ years of experience in tech.",
      image: "/",
    },
    {
      name: "Jane Smith",
      role: "CTO",
      description: "Innovative technologist driving our product development.",
      image: "/",
    },
    {
      name: "Mike Johnson",
      role: "Head of Design",
      description: "Creative mind behind our user-centric designs.",
      image: "/",
    },
    {
      name: "Sarah Lee",
      role: "Marketing Director",
      description: "Strategic thinker expanding our market presence.",
      image: "/",
    },
  ];

  return (
    <div className="w-full py-20 lg:py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl tracking-tighter font-regular mb-12 text-center mt-20">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-18">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Avatar className="w-32 h-32 mb-3 shadow-md">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Blogs() {
  return (
    <>
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        
        {/* First Section: Navbar + Team Members */}
        <div className="snap-start h-screen flex flex-col">
          <Navbar />
          <TeamMembers />
        </div>

        {/* Blog Section */}
        <div className="snap-start h-screen">
          <div className="w-full py-20 lg:py-20">
            <div className="container flex flex-col mx-auto gap-14">
              <div className="flex flex-col w-full gap-8 sm:flex-row sm:justify-between sm:items-center">
                <h4 className="max-w-xl text-3xl tracking-tighter md:text-5xl font-regular">
                  Blogs
                </h4>
                <Button className="gap-4">
                  View all articles <MoveRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex flex-col gap-2 cursor-pointer hover:opacity-75">
                    <div className="mb-4 rounded-md bg-muted aspect-video shadow-md"></div>
                    <h3 className="text-xl tracking-tight">Name</h3>
                    <p className="text-base text-muted-foreground">
                      Our goal is to streamline SMB trade, making it easier and faster than ever.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Repository Section */}
        <div className="snap-start h-screen">
          <div className="w-full py-20 lg:py-5">
            <div className="container mx-auto">
              <div className="flex gap-4 py-20 lg:py-40 flex-col items-start">
                <div>
                  <Badge>Github</Badge>
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
                    Repository
                  </h2>
                  <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
                    Managing a small business today is already tough.
                  </p>
                </div>
                <div className="flex gap-10 pt-12 flex-col w-full">
                  <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="flex flex-row gap-6 items-start">
                        <Check className="w-4 h-4 mt-2 text-primary" />
                        <div className="flex flex-col gap-1">
                          <p>Name</p>
                          <p className="text-muted-foreground text-sm">
                            We've made it easy to use and understand.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Last Section: Footer */}
        <div className="snap-start flex flex-col">
          <Footer />
        </div>
      </div>
    </>
  );
}
