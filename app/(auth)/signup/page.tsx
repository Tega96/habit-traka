"use client"

import { memo } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUser, loginUser } from '@/lib/auth';



const SignUp = () => {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassoword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("")

        const created = createUser(email, password);
        if (!created) {
            setError("User already exists");
            return;
        }

        const loggedIn = loginUser(email, password);
        if (loggedIn) {
            router.push('/dashboard')
        } else {
            setError("Login failed after signup")
        };
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6">Sign up </h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded mb-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded mb-4"
                        value={password}
                        onChange={(e) => setPassoword(e.target.value)}
                        required 
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="login" className="text-blue-500">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default memo(SignUp);