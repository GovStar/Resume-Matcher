'use client'
import Resume from '@/components/dashboard/resume-component';
import { useState, useEffect } from 'react';
import { getResume } from '@/lib/api/resume';

export default function ResumePage() {
    const params = {
        id: ''
    }
    // const params = useParams()
    const [resume, setResume] = useState<any>(null);
    useEffect(() => {
        const fetchResume = async () => {
            const resume = await getResume(params.id);
            setResume(resume);
        }
        fetchResume();
    }, [params.id]);

    const preview = {

    }
    
    return (
        <div>
            <h1>Resume {params.id}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div></div>
                <div>
                    <div className="flex-grow overflow-auto">
                        <Resume resumeData={preview} />
                    </div>
                </div>

            </div>
        </div>
    );
}