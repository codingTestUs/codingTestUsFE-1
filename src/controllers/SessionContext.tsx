// 세션 시간 로직 부분
// 설정한 시간이후 세션이 초기화 되나 재로그인 안되는 문제 발생

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// Context의 타입 정의
interface SessionContextType {
    isLoggedIn: boolean;
    remainingTime: number | null;
    saveLoginStatus: () => void;
}

export const SessionContext = createContext<SessionContextType>({
    isLoggedIn: false,
    remainingTime: null,
    saveLoginStatus: () => {},
});

interface SessionProviderProps {
    children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [remainingTime, setRemainingTime] = useState<number | null>(null);
    const [hasShownAlert, setHasShownAlert] = useState<boolean>(false); // 알림이 한번만 뜨도록 관리

    useEffect(() => {
        const expireTime = JSON.parse(sessionStorage.getItem("expireTime") || "0");

        // 세션이 만료되지 않았으면 로그인 상태 유지
        if (expireTime > Date.now()) {
            setIsLoggedIn(true);
            setRemainingTime(Math.max(0, expireTime - Date.now())); // 남은 시간이 0 미만으로 가지 않게
        } else {
            // 세션 만료 시 처리
            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("expireTime");
            setIsLoggedIn(false);
            setRemainingTime(null); // 남은 시간 초기화
        }

        // 1초마다 세션 만료 체크
        const intervalId = setInterval(() => {
            const expireTime = JSON.parse(sessionStorage.getItem("expireTime") || "0");
            const timeLeft = expireTime - Date.now();

            if (timeLeft <= 0) {
                // 세션 만료 시 처리
                sessionStorage.removeItem("isLoggedIn");
                sessionStorage.removeItem("expireTime");
                setIsLoggedIn(false);
                setRemainingTime(null); // 남은 시간 초기화
                clearInterval(intervalId); // 타이머 종료

                // 알림을 한 번만 표시하고 로그인 페이지로 리다이렉트
                if (!hasShownAlert) {
                    setHasShownAlert(true); // 알림이 이미 표시되었음을 기록
                    alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
                    navigate("/login-success"); // 로그인 페이지로 리다이렉트
                }
            } else {
                setRemainingTime(timeLeft);
            }
        }, 1000);

        // 컴포넌트 언마운트 시 interval 클리어
        return () => {
            clearInterval(intervalId);
        };
    }, [navigate, hasShownAlert]);

    const saveLoginStatus = () => {
        const expireTime = Date.now() + 3600000; // 1시간 만료 시간 설정 (3600000ms = 1시간)
        sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
        sessionStorage.setItem("expireTime", JSON.stringify(expireTime));
        setIsLoggedIn(true);
        setRemainingTime(3600); // 1시간을 초 단위로 설정 (3600초)
    };

    return (
        <SessionContext.Provider value={{ isLoggedIn, remainingTime, saveLoginStatus }}>
            {children}
        </SessionContext.Provider>
    );
}
