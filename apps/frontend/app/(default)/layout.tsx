import { ResumePreviewProvider } from '@/components/common/resume_previewer_context';
import Link from 'next/link';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <ResumePreviewProvider>
      <main className="min-h-screen flex flex-col">
        <header className="bg-gray-800 relative">
          <nav className="mx-auto max-w-7xl h-16 text-white flex items-center gap-4">
            <div className="text-2xl font-bold cursor-pointer">
              <Link href="/">GovStar Resume Matcher</Link>
            </div>
          </nav>
        </header>
        {children}</main>
    </ResumePreviewProvider>
  );
}