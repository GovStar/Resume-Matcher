import { ImprovedResult } from '@/components/common/resume_previewer_context';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

/** Uploads job descriptions and returns a job_id */
export async function uploadJobDescriptions(
    descriptions: string[],
    resumeId: string
): Promise<string> {
    const res = await fetch(`${API_URL}/api/v1/jobs/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_descriptions: descriptions, resume_id: resumeId }),
    });
    if (!res.ok) throw new Error(`Upload failed with status ${res.status}`);
    const data = await res.json();
    console.log('Job upload response:', data);
    return data.job_id[0];
}

/** Improves the resume and returns the full preview object */
export async function improveResume(
    resumeId: string,
    jobId: string
): Promise<ImprovedResult> {
    let response: Response;
    try {
        response = await fetch(`${API_URL}/api/v1/resumes/improve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resume_id: resumeId, job_id: jobId }),
        });
    } catch (networkError) {
        console.error('Network error during improveResume:', networkError);
        throw networkError;
    }

    const text = await response.text();
    if (!response.ok) {
        console.error('Improve failed response body:', text);
        throw new Error(`Improve failed with status ${response.status}: ${text}`);
    }

    let data: ImprovedResult;
    try {
        data = JSON.parse(text) as ImprovedResult;
    } catch (parseError) {
        console.error('Failed to parse improveResume response:', parseError, 'Raw response:', text);
        throw parseError;
    }

    console.log('Resume improvement response:', data);
    return data;
}

export async function getAllResumes():Promise<any[]> {
    const res = await fetch(`${API_URL}/api/v1/resumes/all`, {
        method: 'get',
    });
    if (!res.ok) throw new Error(`Upload failed with status ${res.status}`);
    const data = await res.json();
    console.log('Job upload response:', data);
    return data.data;
}

export async function resumeCount():Promise<number> {
    const res = await fetch(`${API_URL}/api/v1/resumes/count`, {
        method: 'get',
    });
    if (!res.ok) throw new Error(`Upload failed with status ${res.status}`);
    const data = await res.json();
    console.log('Job upload response:', data);
    return data.ProcessedResumeCount
}

export async function getResume(id: string):Promise<any> {
    const res = await fetch(`${API_URL}/api/v1/resumes?resume_id=${id}`, {
        method: 'get',
    });
    if (!res.ok) throw new Error(`Upload failed with status ${res.status}`);
    const data = await res.json();
    return data.data;
}
export async function getAllJobs():Promise<any[]> { 

    const res = await fetch(`${API_URL}/api/v1/jobs/all`, {
        method: 'get',
    });
    if (!res.ok) throw new Error(`Upload failed with status ${res.status}`);
    const data = await res.json();
    console.log('Job upload response:', data);
    return data.data;
}

export async function getJob(id: string):Promise<any> {
    const res = await fetch(`${API_URL}/api/v1/jobs?job_id=${id}`, {
        method: 'get',
    });
    if (!res.ok) throw new Error(`Upload failed with status ${res.status}`);
    const data = await res.json();
    return data.data;
}