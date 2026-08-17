import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function JobDetails() {
    const { id } = useParams(); 
    
    const [job, setJob] = useState(null); 

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/jobs/${id}/`)
            .then((response) => {
                setJob(response.data);
            })
            .catch((error) => console.log(error));
    }, [id]);

    if (!job) return <div className="text-white text-center mt-20 text-2xl">Loading...</div>;


    return (
        <div className="min-h-screen bg-gray-900 text-white p-10 flex justify-center items-center">
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl w-full max-w-3xl shadow-xl">
                
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                    {job.title}
                </h1>
                <h2 className="text-2xl text-gray-300 mb-6">{job.company_name}</h2>
                
                <div className="space-y-4 bg-black/20 p-6 rounded-xl border border-white/5">
                    <p><span className="font-semibold text-gray-400">Location:</span> {job.location}</p>
                    <p><span className="font-semibold text-gray-400">Salary:</span> {job.salary ? job.salary : "Not specified"}</p>
                    <p><span className="font-semibold text-gray-400">Posted on:</span> {new Date(job.created_at).toLocaleDateString()}</p>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-3 text-blue-300">Job Description</h3>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {job.description}
                    </p>
                </div>

                <div className="mt-10 flex gap-4">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                        Apply Now
                    </button>
                    <Link to="/" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
                        Back to Home
                    </Link>
                </div>

            </div>
            
        </div>
    );
}

export default JobDetails;