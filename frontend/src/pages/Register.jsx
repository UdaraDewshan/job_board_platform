import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('job_seeker');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://127.0.0.1:8000/api/users/register/', { 
        username: username, 
        email: email,
        password: password, 
        role: role,
      });
      
      alert('Registration Successful! Please login.');
      navigate('/login'); 

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Registration failed. Please check your details.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950 p-5 font-sans">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-2xl w-full max-w-md shadow-2xl text-center">
        
        <h2 className="text-white text-3xl font-bold mb-1">Create an Account</h2>
        <p className="text-slate-400 text-sm mb-8">Join the Job Board platform today</p>
        
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          
          <div className="text-left">
            <label className="block text-slate-300 text-sm mb-1 font-medium">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-violet-500"
              required 
            />
          </div>

          <div className="text-left">
            <label className="block text-slate-300 text-sm mb-1 font-medium">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-violet-500"
              required 
            />
          </div>
          
          <div className="text-left">
            <label className="block text-slate-300 text-sm mb-1 font-medium">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-violet-500"
              required 
            />
          </div>

          <div className="text-left">
            <label className="block text-slate-300 text-sm mb-1 font-medium">I am a...</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-white/10 text-white outline-none focus:border-violet-500 cursor-pointer"
            >
              <option value="job_seeker">Job Seeker (Looking for a job)</option>
              <option value="employer">Employer (Posting jobs)</option>
            </select>
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-violet-500 to-blue-500 text-white font-semibold py-3 rounded-lg mt-4 transition-all hover:shadow-[0_10px_20px_rgba(139,92,246,0.4)]">
            Register
          </button>
        </form>
        
        <p className="mt-6 text-slate-400 text-sm">
          Already have an account? 
          <Link to="/login" className="text-violet-500 font-semibold hover:text-violet-400 ml-1">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;