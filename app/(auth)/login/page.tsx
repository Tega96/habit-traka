"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser } from '@/lib/auth';
import { memo } from 'react';


const Login = () => {
    const router = useRouter();
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const loggedIn = loginUser(email, password);
        if (loggedIn) {
            router.push("/dashboard")
        } else {
            setError("Invalid email or password")
        }
    };

        
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6">Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email"
                        placeholder='Email'
                        className='w-full p-2 border rounded mb-4'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    <input 
                        type="password"
                        placeholder='Password'
                        className='w-full p-2 border rounded mb-4'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                    <button type="submit" 
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                            Login
                        </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    No account? {" "}
                    <Link href={"/signup"} className="text-blue-500">Sign up</Link>
                </p>
            </div>
        
        </div>
    );
};

export default memo(Login);