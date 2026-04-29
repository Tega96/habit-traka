"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logoutUser, getCurrentUser, User } from '@/lib/auth';
import { memo } from 'react';
import HabitCard from '@/components/habits/HabitCard';
import { HabitProps } from '@/types/habit';
import { getHabitsForUser } from '@/lib/habits';
import HabitForm from '@/components/habits/HabitForm';
import EditHabitModal from '@/components/habits/EditHabitModal';


const Dashboard = () => {

    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [habits, setHabits] = useState<HabitProps[]>([]);
    const [editingHabit, setEditingHabit] = useState<HabitProps | null>(null);

    const loadUser = () => {
        if (!isAuthenticated()) {
            router.replace('/login');
            return null;
        }
        const currentUser = getCurrentUser();
        setUser(currentUser);
        return currentUser;
    }

    const loadHabits = (userId: string) => {
        const userHabits = getHabitsForUser(userId);
        setHabits(userHabits);
    };

    useEffect(() => {
        const currentUser = loadUser();
        if (currentUser) {
            loadHabits(currentUser.id)
        }

    }, [router]);

    const handleLogout = () => {
        logoutUser();
        router.push('/login')
    }

    const refreshData = () => {
        if (user) {
            loadHabits(user.id)
        }
    };

    if (!user) {
        return <div className="flex min-h-screen justify-center items-center ">Loading...</div>
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