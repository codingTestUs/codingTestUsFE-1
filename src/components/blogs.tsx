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
      name: "김승혁",
      role: "CEO",
      description: "Leads the team with a vision for technical innovation and growth in coding test solutions.",
      image: "https://avatars.githubusercontent.com/u/154569448?v=4",
    },
    {
      name: "남기훈",
      role: "CTO",
      description: "Oversees the backend development and API design, ensuring robust and scalable architecture.",
      image: "https://pbs.twimg.com/media/FNucpHEaAAMnAei?format=jpg&name=small",
    },
    {
      name: "윤준상",
      role: "Head of Design",
      description: "Responsible for creating intuitive and user-friendly interfaces, bridging front-end and back-end communication.",
      image: "https://item.kakaocdn.net/do/151c759dab8d916fd5097927c0d146fa9f17e489affba0627eb1eb39695f93dd",
    },
    {
      name: "김수연",
      role: "Frontend Designer",
      description: "Designs and implements the frontend interface, ensuring a seamless user experience and fixing any UI issues.",
      image: "https://avatars.githubusercontent.com/u/125543409?v=4",
    },
    {
      name: "황수현",
      role: "Admin Backend Developer",
      description: "Assists in the backend development of the admin system, ensuring smooth operations for managing the platform.",
      image: "https://img2.quasarzone.com/editor/2021/01/08/10d979ec0b1a9dc896db0b36d9697cf1.jpeg",
    },
    {
      name: "서연은",
      role: "Researcher",
      description: "Conducts in-depth research, gathering necessary information and resources to support the project development.",
      image: "https://lh3.googleusercontent.com/proxy/XJ8NuLSdNBYXePM_v6m1GXy9s6Asaw50TVvfuwksEOetg-GCo2CZ5RHyHmKxAUFwUDU0WFmnTDX3t47yGkE7pR5fPcsvOJUzIHBjwfahirrbRIxQEeBfAm-fjwU1",
    },
    {
      name: "김민석",
      role: "Researcher",
      description: "Supports the research phase by analyzing market trends and gathering relevant information to guide project decisions.",
      image: "https://img.danawa.com/prod_img/500000/359/124/img/4124359_1.jpg?_v=20230801144124",
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

  const blogs = [
    {
      title: "Aidevksh.log",
      image: "https://velog.velcdn.com/images/aidevksh/profile/880e8637-ee33-41d1-bbef-de43cea23e1a/image.png",
      description: "김승혁의 블로그",
      url: "https://velog.io/@aidevksh",
    },
    {
      title: "MegaMaker Studio",
      image: "https://tistory1.daumcdn.net/tistory/6334968/attach/a113df8c702944df930824b345ff1a34",
      description: "남기훈의 블로그",
      url: "https://megamaker.tistory.com/",
    },
    {
      title: "Iceamericanoinduk",
      image: "https://www.notion.so/images/page-cover/met_william_morris_1877_willow.jpg",
      description: "윤준상의 블로그",
      url: "https://iceamericanoinduk.notion.site/11ccbe3bce3980889a0adbcdab251d52",
    },
    {
      title: "Expanding Market Reach",
      image: "https://avatars.githubusercontent.com/u/125543409?v=4",
      description: "김수연의 깃허브",
      url: "https://github.com/yeonXP",
    },
    {
      title: "Expanding Market Reach",
      image: "https://img2.quasarzone.com/editor/2021/01/08/10d979ec0b1a9dc896db0b36d9697cf1.jpeg",
      description: "황수현의 깃허브",
      url: "https://github.com/ppangddu",
    }
  ];


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
              {/* Header */}
              <div className="flex flex-col w-full gap-8 sm:flex-row sm:justify-between sm:items-center">
                <h4 className="max-w-xl text-3xl tracking-tighter md:text-5xl font-regular">
                  Blogs
                </h4>
                <Button className="gap-4">
                  View all articles <MoveRight className="w-4 h-4" />
                </Button>
              </div>
              {/* Blog Items */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {blogs.map((blog, index) => (
                    <a
                        key={index}
                        href={blog.url}
                        target="_blank" // 새 탭에서 열기
                        rel="noopener noreferrer" // 보안 강화
                        className="flex flex-col gap-2 cursor-pointer hover:opacity-75"
                    >
                      {/* Image */}
                      <div
                          className="mb-4 rounded-md bg-muted aspect-video shadow-md"
                          style={{
                            backgroundImage: `url(${blog.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                      ></div>
                      {/* Title */}
                      <h3 className="text-xl tracking-tight">{blog.title}</h3>
                      {/* Description */}
                      <p className="text-base text-muted-foreground">{blog.description}</p>
                    </a>
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
                    Check out the code, backend development, and API management of our project below.
                  </p>
                </div>
                <div className="flex gap-10 pt-12 flex-col w-full">
                  <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
                    {/* Frontend Repository */}
                    <div className="flex flex-row gap-6 items-start">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col gap-1">
                        <p>Frontend Repository</p>
                        <p className="text-muted-foreground text-sm">
                          View the frontend repository where the client-side code is developed.
                        </p>
                        <a
                            href="https://github.com/codingTestUs/codingTestUsFE-1"
                            target="_blank"
                            className="text-primary"
                        >
                          GitHub Link
                        </a>
                      </div>
                    </div>
                    {/* Backend Repository */}
                    <div className="flex flex-row gap-6 items-start">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col gap-1">
                        <p>Backend Repository</p>
                        <p className="text-muted-foreground text-sm">
                          View the backend repository where the server-side code is developed.
                        </p>
                        <a
                            href="https://github.com/ness727/code-challenge"
                            target="_blank"
                            className="text-primary"
                        >
                          GitHub Link
                        </a>
                      </div>
                    </div>
                    {/* API Documentation */}
                    <div className="flex flex-row gap-6 items-start">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col gap-1">
                        <p>API Documentation</p>
                        <p className="text-muted-foreground text-sm">
                          View the API documentation to understand the endpoints and data structure.
                        </p>
                        <a
                            href="https://documenter.getpostman.com/view/37125287/2sAXxMfYZ9"
                            target="_blank"
                            className="text-primary"
                        >
                          API Docs Link
                        </a>
                      </div>
                    </div>
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
