import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative min-h-svh flex flex-col items-center justify-center bg-gradient-to-br from-blue-50/50 via-slate-50 to-sky-100/40 dark:from-black dark:via-[#09090b] dark:to-black p-4 sm:p-6 lg:p-8 font-sans antialiased text-neutral-900 dark:text-neutral-100 selection:bg-blue-100 dark:selection:bg-blue-900/40 overflow-hidden">
            {/* Ambient background glows */}
            <div className="absolute top-1/4 -left-24 h-96 w-96 rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-24 h-96 w-96 rounded-full bg-sky-300/15 dark:bg-sky-500/5 blur-3xl pointer-events-none" />

            {/* Main Outer Container */}
            <div className="w-full max-w-4xl lg:max-w-5xl relative z-10 flex flex-col items-center">
                
                {/* The Split Card (Flush 50/50 layout) */}
                <div className="w-full overflow-hidden rounded-[24px] sm:rounded-[28px] border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-[#09090b] shadow-2xl shadow-blue-950/10 dark:shadow-2xl dark:shadow-black/90">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[560px]">
                        
                        {/* LEFT COLUMN: Pure Solid Blue Branding Panel (Clean minimalist) */}
                        <div className="hidden md:flex flex-col justify-end p-8 sm:p-10 lg:p-12 relative overflow-hidden bg-blue-600 dark:bg-blue-600 text-white shadow-inner">
                            {/* Ambient internal glows (pure blue) */}
                            <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

                            {/* Bottom: Welcome headline & carousel dots */}
                            <div className="relative z-10 space-y-3">
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                                        Welcome!
                                    </h2>
                                    <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed mt-1 max-w-xs">
                                        Platform resmi storan &amp; verifikasi akun Gmail Triple9.
                                    </p>
                                </div>

                                {/* Carousel pagination dots */}
                                <div className="flex items-center gap-1.5 pt-1">
                                    <span className="h-1.5 w-6 rounded-full bg-white shadow-xs" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Form Section */}
                        <div className="flex-1 flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                            {/* Header */}
                            {title && (
                                <div className="mb-4 space-y-1 text-left">
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                        {title}
                                    </h1>
                                    {description && (
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                            {description}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Children Form */}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
