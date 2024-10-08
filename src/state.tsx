import { atom } from 'recoil';

// 예제
export const countState = atom<number>({
  key: 'countState', // 고유한 키
  default: 0,        // 기본 값
});