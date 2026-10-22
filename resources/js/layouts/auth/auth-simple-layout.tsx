import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative min-h-svh flex flex-col items-center justify-center bg-[#F5F5DC] p-4 sm:p-6 lg:p-8 font-sans antialiased text-black">
            {/* Main Outer Container */}
            <div className="w-full max-w-4xl lg:max-w-5xl relative z-10 flex flex-col items-center">
                {/* The Split Card */}
                <div className="w-full overflow-hidden rounded-md border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_#000000]">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[560px]">
                        {/* LEFT COLUMN: Neo-Brutalist Branding Panel */}
                        <div className="flex flex-col justify-end p-8 sm:p-10 lg:p-12 relative overflow-hidden bg-[#FFD700] border-b-4 md:border-b-0 md:border-r-4 border-black text-black">
                            {/* Bottom Title & Description */}
                            <div className="space-y-4">
                                <h2 className="text-3xl sm:text-4xl font-black text-black leading-tight uppercase">
                                    Setor Akun Gmail & Dapatkan Reward!
                                </h2>
                                <p className="text-xs sm:text-sm font-bold text-black/80 leading-relaxed max-w-sm">
                                    Platform resmi setoran akun Gmail Triple9. Dapatkan reward instan dan tukar saldo tanpa ribet dengan rate terbaik.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Form Section */}
                        <div className="flex-1 flex flex-col justify-center p-6 sm:p-10 lg:p-12 bg-white">
                            {title && (
                                <div className="mb-6 space-y-1 text-left">
                                    <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
                                        {title}
                                    </h1>
                                    {description && (
                                        <p className="text-xs font-semibold text-black/70 leading-relaxed">
                                            {description}
                                        </p>
                                    )}
                                </div>
                            )}

                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
