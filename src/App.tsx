import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useLoginStateSync } from './state';
import Landing from './components/landing';
import CodeField from './components/code-field';
import ChallengesPage from './components/challenges';
import MyPage from './components/mypage';
import Blogs from './components/blogs';
import Login from './components/login';
import LoginCheck from '@/controllers/login-success';
import PrivateRoute from '@/components/private-route';

function App() {
    // 로그인 상태 및 세션 만료 관리 훅 호출
    useLoginStateSync();

    return (
        <RecoilRoot>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/codefield" element={<CodeField />} />
                    <Route path="/challenges" element={<ChallengesPage />} />
                    <Route path="/mypage" element={<PrivateRoute><MyPage /></PrivateRoute>} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/login-success" element={<LoginCheck />} />
                </Routes>
            </Router>
        </RecoilRoot>
    );
}

export default App;
