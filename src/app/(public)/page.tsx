"use client";

export default function HomePage() {
  return (
    <div className="p-4 md:p-10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase">
              Nexus CRM
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Data Management Dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
