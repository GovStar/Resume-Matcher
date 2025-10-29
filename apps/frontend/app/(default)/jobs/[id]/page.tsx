'use client'
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getJob, getAllResumes, improveResume } from "@/lib/api/resume";
import Link from "next/link";

export default function JobPage() {
    const { id } = useParams()
    const [job, setJob] = useState<any>(null);
    const [resumes, setResumes] = useState<any[]>([]);
    const [scores, setScores] = useState<any[]>([]);

    useEffect(() => {
        const fetchJob = async () => {
            if (!id) return;

            const job = await getJob(id as string);
            console.log(job);
            setJob(job);
        }
        const fetchResumes = async () => {
            if (!id) return;
            const resumes = await getAllResumes();
            console.log(resumes);
            setResumes(resumes);
        }
        fetchJob();
        fetchResumes();
    }, [id]);

    useEffect(() => {
        const fetchScores = async () => {
            const jobId = job?.job_id;
            if (!jobId) {
                console.warn('Job ID is required to fetch scores');
                return;
            }
            const scores = await Promise.all(resumes.map(async (resume) => {
                const response = await improveResume(resume.resume_id, jobId);
                return response.data;
            }));
            console.log(scores);
            setScores(scores);
        }
        fetchScores();
    }, [job, resumes, id]);

    const getJobResumeScore = (resumeId: string) => {
        const score = scores.find((score) => score.resume_id === resumeId)?.new_score;

        if (!score) {
            return "Calculating..."
        }

        return (score * 100).toFixed(0) + " %";
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">Job {id}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <div className="flex-grow ">
                        <h2 className="text-lg font-bold">Raw Job Description</h2>
                        {job?.raw_job?.content}
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-bold">Processed Job Description</h2>
                    <h3 className="text-md font-bold">Job Title</h3>
                    {job?.processed_job?.job_title}
                    <h3 className="text-md font-bold">Summary</h3>
                    {job?.processed_job?.job_summary}
                    <h3 className="text-md font-bold">Company Profile</h3>
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="font-bold">Name</dt>
                            <dd className="sm:col-span-2">{job?.processed_job?.company_profile?.company_name}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="font-bold">Industry</dt>
                            <dd className="sm:col-span-2">{job?.processed_job?.company_profile?.industry}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="font-bold">Website</dt>
                            <dd className="sm:col-span-2">{job?.processed_job?.company_profile?.website}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="font-bold">Description</dt>
                            <dd className="sm:col-span-2">{job?.processed_job?.company_profile?.description}</dd>
                        </div>
                    </dl>
                    <div>
                        <h3 className="text-md font-bold">Responsibilities</h3>
                        <ul className="list-disc list-inside">
                            {job?.processed_job?.key_responsibilities.map((responsibility: string) => (
                                <li key={responsibility}>{responsibility}</li>
                            ))}
                        </ul>
                    </div>
                    {/* <h3>Location</h3>
                    {JSON.stringify(job?.processed_job?.location)} */}
                    <h3 className="text-md font-bold">Keywords</h3>
                    <ul className="list-disc list-inside">
                        {job?.processed_job?.extracted_keywords.map((keyword: string) => (
                            <li key={keyword}>{keyword}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg font-bold">Resumes</h2>
                    <table className="table-fixed border w-full">
                        <thead>
                            <tr>
                                <th>Resume ID</th>
                                <th>Profile</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resumes.map((resume) => (
                                <tr key={resume.resume_id}>
                                    <td><Link href={`/resumes/${resume.resume_id}`}>{resume.resume_id}</Link></td>
                                    <td>{resume.processed_resume.personal_data.email}</td>
                                    <td>{getJobResumeScore(resume.resume_id)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}