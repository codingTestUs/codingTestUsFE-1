import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "@/state";  // Recoil 상태 가져오기

export default function LoginSuccess() {
    const navigate = useNavigate();
    const [, setIsLoggedIn] = useRecoilState(isLoggedInState);  // Recoil 상태를 업데이트할 수 있는 setter 함수 사용

    useEffect(() => {
        // URL에서 'key' 값 추출
        const urlParams = new URLSearchParams(window.location.search);
        const key = urlParams.get("key");

        if (key) {
            // 'key' 값을 로컬 스토리지에 저장
            localStorage.setItem("key", key);
            console.log("key가 저장되었습니다:");

            // key 값을 이용하여 JWT 요청
            getJWT(key);
        } else {
            console.log("key 값이 없습니다.");
        }
    }, [navigate]);

    // key 값을 이용하여 /user/token 요청 후 JWT 발급
     const getJWT = async (key: string) => {
        try {
            const response = await fetch("https://api.craftlogic.site/user/token", {
                method: "GET",
                headers: {
                    "Key": key,  // 'Key' 헤더에 key 값 포함
                },
            });

            if (response.ok) {
                const jwt = await response.text();  // 응답을 JSON이 아닌 텍스트로 받음

                if (jwt) {
                    // JWT를 로컬 스토리지에 저장
                    localStorage.setItem("jwt", jwt);
                    console.log("JWT가 저장되었습니다");  // JWT 값을 콘솔에 출력

                    // 로그인 상태를 Recoil 상태로 업데이트
                    setIsLoggedIn(true);  // 로그인 상태를 true로 업데이트

                    // 로그인 성공 후 홈 페이지로 리디렉션
                    navigate("/");
                } else {
                    console.log("JWT를 받는 데 실패했습니다.");
                }
            } else {
                console.log("서버 요청 실패");
            }
        } catch (error) {
            console.error("JWT 요청 중 오류 발생:", error);
        }
    };



    return <div>로그인 화면 인증 페이지</div>;
}