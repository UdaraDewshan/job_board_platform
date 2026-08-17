import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/jobs/');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError('Failed to load jobs. Please try again later.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-black font-sans">
      <Navbar />

      <div className="container mx-auto px-5 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-800">Dream Job</span> Today
        </h1>
        <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
          Connect with top employers in Sri Lanka and discover opportunities that perfectly match your skills and passion.
        </p>

        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-2 rounded-2xl md:rounded-full flex flex-col md:flex-row gap-2 shadow-2xl">
          <input
            type="text"
            placeholder="Job title, keywords, or company..."
            className="w-full bg-transparent text-white px-6 py-3 outline-none"
          />
          <button className="bg-gradient-to-r from-violet-500 to-blue-500 text-white font-semibold py-3 px-8 rounded-xl md:rounded-full hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all cursor-pointer">
            Search Jobs
          </button>
        </div>
      </div>


      <div className="container mx-auto px-5 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Featured Opportunities</h2>

        {loading && <p className="text-center text-violet-400">Loading amazing jobs for you...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {!loading && !error && jobs.length === 0 && (
          <p className="text-center text-slate-400">No jobs available at the moment. Check back later!</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {jobs.map((job) => (
            <div key={job.id} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
              <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
              <p className="text-violet-400 text-sm mb-4">{job.company_name} • {job.location}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-white/10 text-slate-300 text-xs px-3 py-1 rounded-full">
                  {job.job_type || 'Full-Time'}
                </span>
              </div>

              <Link
                to={`/jobs/${job.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                View Details
              </Link>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Home;