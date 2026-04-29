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
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex flex-row items-center justify-between mb-6">
                <div className="">
                    <h1 className="text-3xl font-bold">Habit Traka</h1>
                    <p className="text-gray-600">Welcome, {user.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-4 bg-red-500 text-white p-2 rounded"
                >
                    Logout
                </button>
            </div>

            <div className="mb-6">
                <HabitForm userId={user.id} onHabitCreated={refreshData} />
            </div>

            {habits.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p>No habits yet. Click "Add Habit" to get started!</p>
                </div>
            ): (
                <div className="grid gap-4 md:grid-cols-2">
                    {habits.map((habit) => (
                        <HabitCard
                            key={habit.id}
                            habit={habit}
                            userId={user.id}
                            onUpdate={refreshData}
                            onEdit={setEditingHabit}
                        />
                    ))}
                </div>
            )}

            {editingHabit && (
                <EditHabitModal
                    habit={editingHabit}
                    userId={user.id}
                    onClose={() => setEditingHabit(null)}
                    onUpdate={refreshData}
                />
            )}
        </div>
    );
};

export default memo(Dashboard);