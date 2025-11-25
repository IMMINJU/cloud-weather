import { AutoRefresh } from '@/components/AutoRefresh';
import { ScrollToTop } from '@/components/ScrollToTop';
import { DashboardClient } from '@/components/DashboardClient';
import { getAWSStatus } from '@/lib/api/aws';
import { getCloudflareStatus } from '@/lib/api/cloudflare';
import { getGitHubStatus } from '@/lib/api/github';
import { getVercelStatus } from '@/lib/api/vercel';
import { getAllIncidents } from '@/lib/api/incidents';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export default async function Home() {
  // 모든 서비스 상태와 incidents를 병렬로 가져오기
  const [aws, cloudflare, github, vercel, incidents] = await Promise.all([
    getAWSStatus(),
    getCloudflareStatus(),
    getGitHubStatus(),
    getVercelStatus(),
    getAllIncidents(),
  ]);

  const services = [aws, cloudflare, github, vercel];

  return (
    <main className="min-h-screen py-20 md:py-32 px-4 md:px-8 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 relative overflow-hidden">
      {/* Weather background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-white/15 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-8 text-center">
          <h1 className="text-6xl md:text-7xl font-display font-black mb-3 text-white drop-shadow-lg animate-fade-in tracking-tight">
            ☁️ Cloud Weather
          </h1>
          <p className="text-white/90 text-xl md:text-2xl font-light drop-shadow-md">
            Real-time Cloud Service Status
          </p>
          <div className="mt-4 text-white/80 text-sm font-medium">
            {format(new Date(), 'EEEE, MMMM d, yyyy', { locale: enUS })}
          </div>
        </header>

        <DashboardClient services={services} incidents={incidents} />

        <footer className="mt-12 text-center text-sm text-white/60">
          <p className="mb-2">
            🌐 AWS · Cloudflare · GitHub · Vercel
          </p>
          <p>
            🔄 Auto-refresh every minute
          </p>
        </footer>
      </div>

      <AutoRefresh intervalMs={60000} />
      <ScrollToTop />
    </main>
  );
}
