'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러를 콘솔에 로깅 (프로덕션에서는 에러 트래킹 서비스로 전송)
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden flex items-center justify-center">
      {/* 배경 장식 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-slow"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-2xl">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/50 text-center">
          {/* 에러 아이콘 */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-orange-600 rounded-full">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* 에러 메시지 */}
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">
            ⛈️ 예상치 못한 문제가 발생했습니다
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            서비스 상태를 불러오는 중 오류가 발생했습니다.
          </p>

          {/* 에러 상세 정보 (개발 환경에서만) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mb-6 text-left">
              <summary className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900 mb-2">
                기술적 세부사항 보기
              </summary>
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 font-mono overflow-auto max-h-48">
                <p className="font-bold text-red-600 mb-2">{error.name}</p>
                <p className="mb-2">{error.message}</p>
                {error.digest && (
                  <p className="text-xs text-gray-500">Error Digest: {error.digest}</p>
                )}
              </div>
            </details>
          )}

          {/* 액션 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              🔄 다시 시도
            </button>

            <a
              href="/"
              className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              🏠 홈으로 돌아가기
            </a>
          </div>

          {/* 도움말 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              문제가 계속되면 페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
