import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

"use client";


// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Insert new user into the users table
            const { data, error } = await supabase
                .from('users')
                .insert([
                    { user_name: userName, email: email || null }
                ])
                .select();

            if (error) throw error;
            
            if (data && data.length > 0) {
                setUserId(data[0].id);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during registration');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Create Account</h1>
                    <p className="mt-2 text-gray-600">Enter your details to create a new account</p>
                </div>
                
                {userId ? (
                    <div className="mt-6 text-center">
                        <h2 className="text-xl font-semibold text-green-600">Account Created!</h2>
                        <p className="mt-2">Your user ID is:</p>
                        <p className="mt-1 p-2 bg-gray-50 rounded border font-mono text-sm break-all">{userId}</p>
                        <button 
                            onClick={() => {
                                setUserId(null);
                                setUserName('');
                                setEmail('');
                            }}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Create Another Account
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter username"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email (optional)
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter email"
                            />
                        </div>
                        
                        {error && (
                            <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded">
                                {error}
                            </div>
                        )}
                        
                        <div>
                            <button
                                type="submit"
                                disabled={loading || !userName}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                    loading || !userName ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                                {loading ? 'Creating...' : 'Create Account'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}