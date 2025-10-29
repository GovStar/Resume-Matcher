'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// Unused imports from base design, commented out for now, could be useful later if we want to adopt GovStar styling.
// import BackgroundContainer from '@/components/common/background-container';
// import GitHubStarBadge from '@/components/common/github-star-badge';

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Users, ArrowRight, Database, BarChart3 } from "lucide-react";

import { getAllJobs, getAllResumes, resumeCount } from '@/lib/api/resume';
//Updated from base design for govstar use case.

export default function Hero() {
	const [processedCount, setProcessedCount] = useState<number>(0);
	const [allResumes, setAllResumes] = useState<Resume[]>([]);
	const [allJobs, setAllJobs] = useState<any[]>([]);

	useEffect(() => {
		const fetchAllResumes = async () => {
			const resumes = await getAllResumes();
			setAllResumes(resumes);
		};
		fetchAllResumes();
	}, []);

	useEffect(() => {
		const fetchAllJobs = async () => {
			const jobs = await getAllJobs();
			setAllJobs(jobs);
		};
		fetchAllJobs();
	}, []);

	useEffect(() => {
		const fetchCount = async () => {
			const count = await resumeCount();
			setProcessedCount(count);
		};
		fetchCount();
	}, []);

	const stats = [
		{
			icon: Users,
			title: "Users",
			value: processedCount.toLocaleString(), // formats number like "1,245"
			desc: "Active this month",
			color: "text-blue-600",
		},
	];

	return (
		<main className="flex min-h-screen flex-col w-7xl mx-auto">

			{/* Content */}
			<section className="flex-1 p-6">
				<h1 className="mb-6 text-2xl font-bold tracking-tight">Resume Matcher Dashboard</h1>

				{/* Dashboard Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{stats.map((stat, idx) => (
						<div key={idx} className={`p-4 rounded shadow ${stat.color}`}>
							<stat.icon className="w-6 h-6" />
							<h3>{stat.title}</h3>
							<p>{stat.value}</p>
							<small>{stat.desc}</small>
						</div>
					))}
				</div>
				<div className="my-6 flex flex-row gap-4">
					<Link
						href="/resume"
						className="group relative inline-flex h-10 overflow-hidden rounded-full p-[1px]"
					>
						<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3A59D1_0%,#7AC6D2_50%,#3A59D1_100%)]" />
						<span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-gray-100 backdrop-blur-3xl">
							Upload Resume
							<ArrowRight className="w-4 h-4" />
						</span>
					</Link>
					<Link
						href="/jobs"
						className="group relative inline-flex h-10 overflow-hidden rounded-full p-[1px]"
					>
						<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3A59D1_0%,#7AC6D2_50%,#3A59D1_100%)]" />
						<span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-gray-100 backdrop-blur-3xl">
							Upload Job Description
							<ArrowRight className="w-4 h-4" />
						</span>
					</Link>
				</div>

				<div>
					<h1 className="text-2xl font-bold">Jobs</h1>
					<table className="table-fixed border w-full mt-4">
						<thead className="border">
							<tr className="text-left">
								<th className="p-3">Job ID</th>
								<th className="p-3">Job Title</th>
								<th className="p-3">Company Profile</th>
							</tr>
						</thead>
						<tbody>
							{allJobs?.map((job) => (
								<tr key={job.job_id}>
									<td className="text-blue-500 hover:text-blue-700 p-3"><Link href={`/jobs/${job.job_id}`}>{job.job_id}</Link></td>
									<td className="p-3">{job.job_title}</td>
									<td className="p-3">{job.company_profile.company_name}</td>
								</tr>
							))}
						</tbody>
					</table>

				</div>
				<div className="mt-10">
					<h1 className="text-2xl font-bold">Resumes</h1>
					<table className="table-fixed border w-full mt-4">
						<thead>
							<tr className="text-left">
								<th className="p-3">Resume ID</th>
								<th className="p-3">User Email</th>
								<th className="p-3">Experiences</th>
								<th className="p-3">Education</th>
								<th className="p-3">Keywords</th>
							</tr>
						</thead>
						<tbody>
							{allResumes.map((resume) => (
								<tr key={resume.resume_id} className="border">
									<td className="text-blue-500 hover:text-blue-700 p-3"><Link href={`/resumes/${resume.resume_id}`}>{resume.resume_id}</Link></td>
									<td className="p-3">{resume.processed_resume.personal_data.email}</td>
									<td className="p-3">
										<ul className="list-disc list-inside">{resume.processed_resume.experiences.slice(0, 3).map((experience: any, index: number) => (
											<li key={index}>
												{`${experience.job_title} at ${experience.company}`}
											</li>))}
										</ul>
									</td>
									<td className="p-3">{resume.processed_resume.education.map((education: any) => education.institution).join(', ')}</td>
									<td className="p-3">
										{resume.processed_resume.extracted_keywords.join(', ')}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{/* Example Dialog with Form */}
				<div className="mt-10">
					<Dialog>
						<DialogTrigger asChild>
							<Button>Add Feedback</Button>
						</DialogTrigger>
						<DialogContent>
							<h3 className="text-lg font-semibold">Submit Feedback</h3>
							<div className="mt-4 space-y-3">
								<Label htmlFor="feedback">Your thoughts</Label>
								<Textarea id="feedback" placeholder="Write something..." />
							</div>
							<div className="mt-6 flex justify-end">
								<Button type="submit">Submit</Button>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</section>
		</main>
	);
}
