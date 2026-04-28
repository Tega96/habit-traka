"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SplashScreen = () => {
    const router = useRouter();

    useEffect(() => {
        const session = localStorage.getItem("habit-tracker-session")

        if (session) {
            router.replace('/dashboard')
        } else {
            router.replace('/login')
        }
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-2">Habit Tracka</h1>
            <p className="text-gray-600">Checking session...</p>
        </div>
    )

    
}
export default SplashScreen;