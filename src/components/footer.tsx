import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

export default function Footer() {
  const navigationItems = [
    {
      title: "Home",
      href: "/",
      description: "",
    },
    {
      title: "Blogs",
      description: "",
      items: [
        {
          title: "김승혁 블로그",
          href: "https://velog.io/@aidevksh",
        },
        {
            title: "남기훈의 블로그",
            href: "https://megamaker.tistory.com/",
          },
          {
            title: "윤준상의 블로그",
            href: "https://iceamericanoinduk.notion.site/11ccbe3bce3980889a0adbcdab251d52",
          },
        {
          title: "김수연의 깃허브",
          href: "https://github.com/yeonXP",
        },
        {
          title: "황수현의 깃허브",
          href: "https://github.com/ppangddu",
        },
      ],
    },
    {
      title: "Repository",
      description: "",
      items: [
        {
          title: "Frontend Repository",
          href: "https://github.com/codingTestUs/codingTestUsFE-1",
        },
        {
            title: "Backend Repository",
            href: "https://github.com/ness727/code-challenge",
        },
        {
            title: "API Documentation",
            href: "https://documenter.getpostman.com/view/37125287/2sAXxMfYZ9",
        },
      ],
    },
  ];

  return (
    <div className="w-full py-20 lg:py-40 bg-foreground text-background dark:bg-black dark:text-white">
      <div className="container mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-8">
            <div className="flex flex-col gap-2">
              <h2 className="max-w-xl text-3xl tracking-tighter text-left md:text-5xl font-regular">
                codingTestUs
              </h2>
              <p className="max-w-lg text-lg leading-relaxed tracking-tight text-left text-background/75 dark:text-white">
              Problems AI Generated
              </p>
            </div>
            <div className="flex flex-row gap-20">
              <div className="flex flex-col max-w-lg text-sm leading-relaxed tracking-tight text-left text-background/75 dark:text-white">
                <p>React</p>
                <p>Spring Boot</p>
                <p>Hugging Face</p>
              </div>
              <div className="flex flex-col max-w-lg text-sm leading-relaxed tracking-tight text-left text-background/75 dark:text-white">
                <p>Docker</p>
                <p>Google Colab</p>
              </div>
            </div>
          </div>
          <div className="grid items-start gap-10 lg:grid-cols-3">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-start gap-1 text-base"
              >
                <div className="flex flex-col gap-2">
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xl">{item.title}</span>
                    </Link>
                  ) : (
                    <p className="text-xl">{item.title}</p>
                  )}
                  {item.items &&
                    item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        to={subItem.href}
                        className="flex items-center justify-between"
                      >
                        <span className="text-background/75 dark:text-white">
                          {subItem.title}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};