"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logoutUser, getCurrentUser, User } from '@/lib/auth';
import { memo } from 'react';
import HabitCard from '@/components/habits/HabitCard';


const Dashboard = () => {

    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.replace('/login');
        }

        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, [router]);

    const handleLogout = () => {
        logoutUser();
        router.push('/login')
    }

    if (!user) {
        return <div className="p-8">Loading...</div>
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white p-2 rounded"
            >
                Logout
            </button>
            <p className="mt-4">Habit tracking ui</p>
            {/* <HabitCard /> */}
        </div>
    );
};

export default memo(Dashboard);