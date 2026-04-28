"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logoutUser } from '@/lib/auth';
import { memo } from 'react';


const Dashboard = () => {

    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.replace('/login');
        }
    }, [router]);

    const handleLogout = () => {
        logoutUser();
        router.push('/login')
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
        </div>
    );
};

export default memo(Dashboard);