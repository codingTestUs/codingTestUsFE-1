import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactNode; // 자식 컴포넌트의 타입 정의
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    // sessionStorage에서 로그인 상태를 가져옴
    const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn") || "false");

    // 로그인 상태가 아니면 홈으로 리다이렉션
    return isLoggedIn ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
