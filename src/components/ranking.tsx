import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import Navbar from './nav-bar';
import Footer from './footer';

type RankedItem = {
    id: number;
    nickname: string;
      score: number;
};
export default function RankingPage() {
    const [items, setItems] = useState<RankedItem[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    // API 데이터 가져오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const jwt = localStorage.getItem('jwt');
                if (!jwt) {
                    setError('로그인 정보가 없습니다. 다시 로그인해주세요.');
                    return;
                }

                const response = await fetch('https://api.craftlogic.site/user/rank', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setItems(data); // 성공적으로 데이터를 불러오면 items 상태를 업데이트
                } else {
                    setError('유저 랭킹 데이터를 가져오는 데 실패했습니다.');
                }
            } catch (err) {
                console.error('API 요청 오류:', err);
                setError('유저 데이터를 불러오는 중 오류가 발생했습니다.');
            }
        };

        fetchUserInfo();
    }, []);

    // 로딩 상태 처리
    if (error) {
        return <div className="error-box">{error}</div>; // 오류 박스 스타일 추가 가능
    }

    if (!items) {
        return <div className="loading-spinner">데이터를 불러오는 중...</div>; // 스피너 애니메이션 추가 가능
    }

    const getIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Trophy className="text-yellow-400" size={33} />;
            case 2:
                return <Medal className="text-gray-400" size={30} />;
            case 3:
                return <Award className="text-amber-600" size={30} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-gray-300 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 w-full max-w-2xl">
                    <h1 className="text-5xl font-bold text-center mb-8">Solved Rankings</h1>
                    <div className="flex justify-center space-x-6 mb-6">
                        <div className="flex items-center space-x-2">
                            <Trophy className="text-yellow-400" />
                            1st Place
                        </div>
                        <div className="flex items-center space-x-2">
                            <Medal className="text-gray-300" />
                            2nd Place
                        </div>
                        <div className="flex items-center space-x-2">
                            <Award className="text-amber-600" />
                            3rd Place
                        </div>
                    </div>
                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-amber-200 dark:bg-slate-500 bg-opacity-20 rounded-lg p-4 flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-4 px-2">
                                    {index > 2 && <span className="text-2xl font-bold w-8">{index + 1}</span>}
                                    {getIcon(index + 1)}
                                    <span className="text-xl font-bold">{item.nickname}</span>
                                </div>
                                <span className="text-2xl font-bold">{item.score}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
