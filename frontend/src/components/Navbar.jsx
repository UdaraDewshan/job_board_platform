import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('access_token');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900/50 backdrop-blur-md border-b border-white/10 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500 tracking-wide">
          JobBoard.
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Home</Link>
          <Link to="/jobs" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Find Jobs</Link>
          
          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium cursor-pointer">
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-lg transition-all text-sm font-medium shadow-[0_0_10px_rgba(139,92,246,0.3)]">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;