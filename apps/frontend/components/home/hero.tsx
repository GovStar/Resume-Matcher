import React, {useState, useEffect } from 'react';
import Link from 'next/link';
// Unused imports from base design, commented out for now, could be useful later if we want to adopt GovStar styling.
// import BackgroundContainer from '@/components/common/background-container';
// import GitHubStarBadge from '@/components/common/github-star-badge';

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Users, Database, BarChart3 } from "lucide-react";

import { resumeCount } from '@/lib/api/resume';
//Updated from base design for govstar use case.

export default function Hero() {
	const [processedCount, setProcessedCount] = useState<number>(0);

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
    <main className="flex min-h-screen flex-col bg-gray-50">

      {/* Content */}
      <section className="flex-1 p-6">
        <h1 className="mb-6 text-2xl font-bold tracking-tight">App Dashboard</h1>

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
		<div className="mt-6">
			<Link
				href="/resume"
				className="group relative inline-flex h-10 overflow-hidden rounded-full p-[1px]"
			>
				<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3A59D1_0%,#7AC6D2_50%,#3A59D1_100%)]" />
				<span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-gray-100 backdrop-blur-3xl">
					Upload Resume
					<svg
						width="16"
						height="16"
						viewBox="0 0 0.3 0.3"
						fill="#FFF"
						xmlns="http://www.w3.org/2000/svg"
						className="ml-2 transition-transform duration-200 ease-in-out group-hover:translate-x-1" // Hover animation
					>
						<path d="M.166.046a.02.02 0 0 1 .028 0l.09.09a.02.02 0 0 1 0 .028l-.09.09A.02.02 0 0 1 .166.226L.22.17H.03a.02.02 0 0 1 0-.04h.19L.166.074a.02.02 0 0 1 0-.028" />
					</svg>
				</span>
			</Link>
		</div>
		<div className="mt-7">
			<Link
				href="/jobs"
				className="group relative inline-flex h-10 overflow-hidden rounded-full p-[1px]"
			>
				<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3A59D1_0%,#7AC6D2_50%,#3A59D1_100%)]" />
				<span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-gray-100 backdrop-blur-3xl">
					Compare against Job Description
					<svg
						width="16"
						height="16"
						viewBox="0 0 0.3 0.3"
						fill="#FFF"
						xmlns="http://www.w3.org/2000/svg"
						className="ml-2 transition-transform duration-200 ease-in-out group-hover:translate-x-1" // Hover animation
					>
						<path d="M.166.046a.02.02 0 0 1 .028 0l.09.09a.02.02 0 0 1 0 .028l-.09.09A.02.02 0 0 1 .166.226L.22.17H.03a.02.02 0 0 1 0-.04h.19L.166.074a.02.02 0 0 1 0-.028" />
					</svg>
				</span>
			</Link>
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
