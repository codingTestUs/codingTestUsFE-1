import { atom, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import axios from 'axios';

// 로그인 상태 Atom
export const isLoggedInState = atom<boolean>({
  key: 'isLoggedInState',
  default: JSON.parse(sessionStorage.getItem('isLoggedIn') || 'false'),
});

// 세션 만료 시간 (30분: 1800000ms)
const SESSION_TIMEOUT = 1800000;

export const useLoginStateSync = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  useEffect(() => {
    if (isLoggedIn) {
      const expireTime = Date.now() + SESSION_TIMEOUT;
      sessionStorage.setItem('isLoggedIn', JSON.stringify(true));
      sessionStorage.setItem('expireTime', expireTime.toString());
    } else {
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('expireTime');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkSessionExpiration = async () => {
      const expireTime = parseInt(sessionStorage.getItem('expireTime') || '0', 10);

      if (Date.now() > expireTime) {
        // 세션 만료 시 로그아웃 처리
        setIsLoggedIn(false);

        // 로그아웃 요청 보내기
        try {
          await axios.get("/logout");  // 로그아웃 API 호출
          alert("세션이 만료되어 자동으로 로그아웃되었습니다.");
        } catch (error) {
          console.error("로그아웃 요청 중 오류가 발생했습니다.", error);
        }

        // 타이머 제거
        clearTimeout(timeoutId);  // 타이머 제거
      }
    };

    timeoutId = setTimeout(checkSessionExpiration, SESSION_TIMEOUT);  // 일정 시간 후에 체크
    return () => clearTimeout(timeoutId);  // 컴포넌트 언마운트 시 타이머 제거
  }, [setIsLoggedIn]);

  return [isLoggedIn, setIsLoggedIn] as const;
};
