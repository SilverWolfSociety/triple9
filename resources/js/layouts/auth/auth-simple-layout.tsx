import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative min-h-svh flex flex-col items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-neutral-100 p-4 sm:p-6 lg:p-8 font-sans antialiased text-neutral-900 selection:bg-blue-100 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 -left-24 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-24 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="rounded-[28px] border border-neutral-200/90 bg-white p-7 sm:p-9 shadow-xl shadow-neutral-900/5">
                    {/* Header Title */}
                    {(title || description) && (
                        <div className="space-y-1.5 mb-6 text-center">
                            {title && (
                                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                                    {title}
                                </h1>
                            )}
                            {description && (
                                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                                    {description}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Children Form */}
                    {children}
                </div>

                {/* Footer Note */}
                <div className="mt-6 text-center text-xs text-neutral-400">
                    &copy; {new Date().getFullYear()} Triple9 Finance. All rights reserved.
                </div>
            </div>
        </div>
    );
}
