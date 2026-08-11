import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: username,
        password: password
      });


      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      

      navigate('/'); 

    } catch (err) {
      console.error(err);
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950 p-5 font-sans">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-2xl w-full max-w-md shadow-2xl text-center">
        
        <h2 className="text-white text-3xl font-bold mb-1">Welcome Back</h2>
        <p className="text-slate-400 text-sm mb-8">Login to your Job Board account</p>
        
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="text-left">
            <label className="block text-slate-300 text-sm mb-2 font-medium">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-base outline-none transition-all duration-300 focus:border-violet-500 focus:bg-white/10 focus:shadow-[0_0_10px_rgba(139,92,246,0.3)] box-border"
              required 
            />
          </div>
          
          <div className="text-left">
            <label className="block text-slate-300 text-sm mb-2 font-medium">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-base outline-none transition-all duration-300 focus:border-violet-500 focus:bg-white/10 focus:shadow-[0_0_10px_rgba(139,92,246,0.3)] box-border"
              required 
            />
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-violet-500 to-blue-500 text-white font-semibold py-3 rounded-lg mt-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(139,92,246,0.4)] cursor-pointer">
            Login
          </button>
        </form>
        
        <p className="mt-8 text-slate-400 text-sm">
          Don't have an account? 
          <Link to="/register" className="text-violet-500 font-semibold hover:text-violet-400 transition-colors ml-1 decoration-transparent">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;