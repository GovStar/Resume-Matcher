'use client'
import { useParams } from 'next/navigation';
import Resume from '@/components/dashboard/resume-component';
import { useState, useEffect } from 'react';
import { getResume } from '@/lib/api/resume';
import { ResumeData } from '@/components/dashboard/resume-component';

export default function ResumePage() {
    const { id } = useParams()
    const [resume, setResume] = useState<any>(null);
    useEffect(() => {
        const fetchResume = async () => {
            if (!id) return;
            const resume = await getResume(id as string);
            console.debug(resume);
            setResume(resume);
        }
        fetchResume();
    }, [id]);

    const p_resume = resume.processed_resume;

    const preview: ResumeData = {
        personalInfo: {
            name: `${p_resume.personal_data.firstName} ${p_resume.personal_data.lastName}`,
            email: p_resume.personal_data.email,
            linkedin: p_resume.personal_data.linkedin,
        },
        summary: '',
        experience: p_resume.experiences.map((ex: any, index: number) => ({
            id: index,
            title: ex.job_title,
            description: ex.description,
            company: ex.company,
            location: ex.location,

        })),
        education: p_resume.education.map(ed => ({
            institution: ed.institution,
            degree: `${ed.degree} - ${ed.field_of_study}`,
            years: `${ed.start_date} - ${ed.end_date}`,
            description: ed.description,
        })),
        skills: p_resume.skills.map((skill: any) => `${skill.category} - ${skill.skill_name}`),
    }

    return (
        <div className="w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-center">Resume {id}</h1>
            <div className="mt-4">
                <div className="flex-grow overflow-auto">
                    <Resume resumeData={preview} />
                </div>
            </div>

        </div>
    );
}