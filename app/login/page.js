'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      alert('Wrong Password');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="space-y-4 text-center">
        <h1 className="text-2xl">Admin Access</h1>
        <input 
          type="password" 
          placeholder="Enter Password" 
          className="p-2 text-black rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="block w-full bg-white text-black p-2 rounded font-bold">Login</button>
      </form>
    </div>
  );
}