export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
          <div className="flex items-center gap-4">
            <div className="h-4 w-40 animate-pulse rounded bg-gray-200"></div>
            <div className="h-9 w-20 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </header>

      <main className="container flex-1 px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
              <div className="mt-2 h-16 animate-pulse rounded bg-gray-200"></div>
              {i === 1 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-md bg-gray-100 p-4 text-center">
                    <div className="mx-auto h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                    <div className="mt-1 h-4 animate-pulse rounded bg-gray-200"></div>
                  </div>
                  <div className="rounded-md bg-gray-100 p-4 text-center">
                    <div className="mx-auto h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                    <div className="mt-1 h-4 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>
              )}
              {i === 2 && (
                <div className="mt-4 flex flex-col gap-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-10 animate-pulse rounded bg-gray-200"></div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}