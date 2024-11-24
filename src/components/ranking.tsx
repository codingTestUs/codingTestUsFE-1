import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './nav-bar';
import Footer from './footer';

type RankedItem = {
    id: number;
    nickname: string;
    score: number;
};

export default function RankingPage() {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 호출
    const [items, setItems] = useState<RankedItem[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가
    const [retry, setRetry] = useState<number>(0); // 재시도를 위한 상태 추가

    // API 데이터 가져오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            setLoading(true); // 로딩 시작
            setError(null); // 이전 오류 상태 초기화

            try {
                const jwt = localStorage.getItem('jwt');
                if (!jwt) {
                    setError('There is no login information. Please log in again.');
                    setLoading(false);
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
                    setError('Failed to retrieve user ranking data.');
                }
            } catch (err) {
                console.error('API 요청 오류:', err);
                setError('유저 데이터를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        fetchUserInfo();
    }, [retry]); // retry 상태가 변경될 때마다 fetchUserInfo 호출

    // 오류 UI 처리
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-lg text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">NONO ! </h1>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/')} // 버튼 클릭 시 '/'로 리다이렉션
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                    >
                        You Go Home
                    </button>
                </div>
            </div>
        );
    }

    // 로딩 UI 처리
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-700 dark:text-gray-300">데이터를 불러오는 중...</p>
                </div>
            </div>
        );
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

    // 정상 상태 UI
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