import React, { useEffect } from "react";

export default function LoginCheck() {
    useEffect(() => {
        const saveLoginStatus = () => {
            const isLoggedIn = true; // 로그인 상태를 정의
            sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
            localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
            console.log("로그인 상태가 저장되었습니다.");

            // 홈 페이지로 리디렉션
            window.location.href = "/";
        };

        saveLoginStatus();
    }, []);

    return <div>로그인 상태가 저장되었습니다.</div>;
}
