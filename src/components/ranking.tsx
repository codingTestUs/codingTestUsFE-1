import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Award } from 'lucide-react'
import Navbar from "./nav-bar";
import Footer from "./footer";

type RankedItem = {
    id: number
    name: string
    score: number
}

const initialItems: RankedItem[] = [
    { id: 1, name: "John Doe", score: 98 },
    { id: 2, name: "Jane Smith", score: 95 },
    { id: 3, name: "Bob Johnson", score: 92 },
    { id: 4, name: "Alice Williams", score: 88 },
    { id: 5, name: "Charlie Brown", score: 85 },
    { id: 6, name: "Eva Davis", score: 82 },
    { id: 7, name: "Frank Miller", score: 79 },
    { id: 8, name: "Grace Taylor", score: 76 },
    { id: 9, name: "Henry Wilson", score: 73 },
    { id: 10, name: "Ivy Anderson", score: 70 },
]

export default function RankingPage() {
    const [items, setItems] = useState<RankedItem[]>([])

    useEffect(() => {
        const timer = setTimeout(() => {
            setItems(initialItems)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    const getIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Trophy className="text-yellow-400" size={33} />
            case 2:
                return <Medal className="text-gray-400" size={30} />
            case 3:
                return <Award className="text-amber-600" size={30} />
            default:
                return null
        }
    }

    return (
        <>
            <Navbar />
            <div className='bg-gradient-to-br from-white to-yellow-400 dark:bg-gradient-to-br dark:from-blue-900 dark:to-slate-900'>
                <div className="min-h-screen flex items-center justify-center p-4 ">
                    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 w-full max-w-2xl">
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
                                    className="bg-white bg-opacity-20 rounded-lg p-4 flex items-center justify-between"
                                >
                                    <div className="flex items-center space-x-4 px-2">
                                        {index > 2 && (
                                            <span className="text-2xl font-bold w-8">{index + 1}</span>
                                        )}
                                        {getIcon(index + 1)}
                                        <span className="text-xl text-bold">{item.name}</span>
                                    </div>
                                    <span className="text-2xl font-bold ">{item.score}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}