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
      description: "코딩 테스트 솔루션의 기술 혁신과 성장을 이끌어가는 비전을 가진 팀 리더.",
      image: "https://avatars.githubusercontent.com/u/154569448?v=4",
    },
    {
      name: "남기훈",
      role: "CTO",
      description: "백엔드 개발과 API 디자인을 관리하며, 강력하고 확장 가능한 아키텍처를 보장.",
      image: "https://pbs.twimg.com/media/FNucpHEaAAMnAei?format=jpg&name=small",
    },
    {
      name: "윤준상",
      role: "디자인 책임자",
      description: "직관적이고 사용자 친화적인 인터페이스를 제작하며, 프론트엔드와 백엔드 간의 원활한 소통을 담당.",
      image: "https://item.kakaocdn.net/do/151c759dab8d916fd5097927c0d146fa9f17e489affba0627eb1eb39695f93dd",
    },
    {
      name: "김수연",
      role: "프론트엔드 디자이너",
      description: "프론트엔드 인터페이스를 디자인하고 구현하여 원활한 사용자 경험을 제공하며, UI 문제를 해결.",
      image: "https://avatars.githubusercontent.com/u/125543409?v=4",
    },
    {
      name: "황수현",
      role: "관리자 백엔드 개발자",
      description: "관리자 시스템의 백엔드 개발을 지원하며, 플랫폼 관리의 원활한 운영을 보장.",
      image: "https://img2.quasarzone.com/editor/2021/01/08/10d979ec0b1a9dc896db0b36d9697cf1.jpeg",
    },
    {
      name: "서연은",
      role: "연구원",
      description: "프로젝트 개발을 지원하기 위해 필요한 정보와 자료를 심층적으로 조사하고 수집.",
      image: "https://lh3.googleusercontent.com/proxy/XJ8NuLSdNBYXePM_v6m1GXy9s6Asaw50TVvfuwksEOetg-GCo2CZ5RHyHmKxAUFwUDU0WFmnTDX3t47yGkE7pR5fPcsvOJUzIHBjwfahirrbRIxQEeBfAm-fjwU1",
    },
    {
      name: "김민석",
      role: "연구원",
      description: "시장 동향을 분석하고 프로젝트 결정을 이끌어내기 위한 관련 정보를 수집하여 연구 단계에서 지원.",
      image: "https://img.danawa.com/prod_img/500000/359/124/img/4124359_1.jpg?_v=20230801144124",
    }

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
                    아래에서 프로젝트의 코드, 백엔드 개발, API 관리를 확인해보세요.
                  </p>
                </div>
                <div className="flex gap-10 pt-12 flex-col w-full">
                  <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
                    {/* 프론트엔드 리포지토리 */}
                    <div className="flex flex-row gap-6 items-start">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col gap-1">
                        <p>프론트엔드 리포지토리</p>
                        <p className="text-muted-foreground text-sm">
                          클라이언트 사이드 코드가 개발된 프론트엔드 리포지토리를 확인하세요.
                        </p>
                        <a
                            href="https://github.com/codingTestUs/codingTestUsFE-1"
                            target="_blank"
                            className="text-primary"
                        >
                          GitHub 링크
                        </a>
                      </div>
                    </div>
                    {/* 백엔드 리포지토리 */}
                    <div className="flex flex-row gap-6 items-start">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col gap-1">
                        <p>백엔드 리포지토리</p>
                        <p className="text-muted-foreground text-sm">
                          서버 사이드 코드가 개발된 백엔드 리포지토리를 확인하세요.
                        </p>
                        <a
                            href="https://github.com/ness727/code-challenge"
                            target="_blank"
                            className="text-primary"
                        >
                          GitHub 링크
                        </a>
                      </div>
                    </div>
                    {/* API 문서 */}
                    <div className="flex flex-row gap-6 items-start">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col gap-1">
                        <p>API 문서</p>
                        <p className="text-muted-foreground text-sm">
                          API 엔드포인트와 데이터 구조를 이해할 수 있는 API 문서를 확인하세요.
                        </p>
                        <a
                            href="https://documenter.getpostman.com/view/37125287/2sAXxMfYZ9"
                            target="_blank"
                            className="text-primary"
                        >
                          API 문서 링크
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
