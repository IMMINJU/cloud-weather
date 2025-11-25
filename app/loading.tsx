export default function Loading() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 relative overflow-hidden">
      {/* Weather background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-white/15 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* 헤더 스켈레톤 */}
        <div className="text-center mb-8 md:mb-12 animate-pulse">
          <div className="h-12 md:h-16 bg-white/50 rounded-2xl w-64 mx-auto mb-4"></div>
          <div className="h-6 bg-white/40 rounded-xl w-96 mx-auto"></div>
        </div>

        {/* 히어로 카드 스켈레톤 */}
        <div className="mb-6 animate-pulse">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-10 md:p-12 border-2 border-white/50 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4 flex-1">
                {/* 날씨 아이콘 영역 */}
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-12 md:h-14 bg-gray-200 rounded-xl w-48 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-24"></div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
            </div>
          </div>
        </div>

        {/* 작은 카드들 스켈레톤 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border-2 border-white/50 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded-lg w-32 mb-2"></div>
                    <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>

        {/* 통계 섹션 스켈레톤 */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-white/50 mb-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded-xl w-48 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded-2xl p-5 h-28"></div>
            ))}
          </div>
        </div>

        {/* 타임라인 섹션 스켈레톤 */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-white/50 animate-pulse">
          <div className="h-8 bg-gray-200 rounded-xl w-32 mb-6"></div>

          {/* 검색 바 스켈레톤 */}
          <div className="h-12 bg-gray-200 rounded-2xl w-full mb-6"></div>

          {/* 필터 버튼들 스켈레톤 */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
            <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
            <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
          </div>

          {/* 타임라인 아이템 스켈레톤 */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl p-5 h-32"></div>
            ))}
          </div>
        </div>

        {/* 로딩 인디케이터 */}
        <div className="fixed bottom-8 right-8 bg-white rounded-full p-4 shadow-2xl">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
