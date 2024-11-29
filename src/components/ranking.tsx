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
    const navigate = useNavigate(); // useNavigate ���� ����Ͽ� navigate �Լ� ȣ��
    const [items, setItems] = useState<RankedItem[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // �ε� ���� �߰�
    const [retry, setRetry] = useState<number>(0); // ��õ��� ���� ���� �߰�

    // API ������ ��������
    useEffect(() => {
        const fetchUserInfo = async () => {
            setLoading(true); // �ε� ����
            setError(null); // ���� ���� ���� �ʱ�ȭ

            try {
                const jwt = localStorage.getItem('jwt');
                if (!jwt) {
                    setError('로그인하지 않으면 열람하실 수 없습니다.');
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
                    setItems(data);
                } else {
                    setError('사용자 순위 데이터를 검색하지 못했습니다.');
                }
            } catch (err) {
                console.error('API ��û ����:', err);
                setError('���� �����͸� �ҷ����� �� ������ �߻��߽��ϴ�.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [retry]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-lg text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">죄송합니다. </h1>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                    >
                        메인화면으로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    // �ε� UI ó��
    if (loading) {
        return (
            <div>
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

    // ���� ���� UI
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-gray-300 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 w-full max-w-2xl">
                    <h1 className="text-5xl font-bold text-center mb-8">사용자 랭킹</h1>
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