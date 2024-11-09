import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "@/state";  // Recoil 상태 가져오기

export default function LoginCheck() {
    const navigate = useNavigate();
    const [, setIsLoggedIn] = useRecoilState(isLoggedInState);  // Recoil 상태를 업데이트할 수 있는 setter 함수 사용

    useEffect(() => {
        const saveLoginStatus = () => {
            setIsLoggedIn(true);  // 전역 로그인 상태 업데이트
            console.log("로그인 상태가 저장되었습니다.");

            // 홈 페이지로 리디렉션
            navigate("/");
        };

        saveLoginStatus();
    }, [navigate, setIsLoggedIn]);

    return <div>로그인 상태가 저장되었습니다.</div>;
}
