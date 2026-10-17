import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    Menu,
    Sun,
    Moon,
    Bell,
    ChevronDown,
    Shield,
    User as UserIcon,
    LogOut,
} from 'lucide-react';
import { dashboard, login, register } from '@/routes';
import type { User } from '@/types';

interface WelcomeHeaderProps {
    user?: User;
    activeItemLabel: string;
    resolvedAppearance: string;
    onToggleTheme: () => void;
    onOpenMobileMenu: () => void;
}

export function WelcomeHeader({
    user,
    activeItemLabel,
    resolvedAppearance,
    onToggleTheme,
    onOpenMobileMenu,
}: WelcomeHeaderProps) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 shrink-0 flex items-center justify-between h-14 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-[#27272a]">
            <div className="flex items-center gap-3 min-w-0">
                {/* Mobile Hamburger Button */}
                <button
                    onClick={onOpenMobileMenu}
                    className="flex lg:hidden h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                    aria-label="Buka navigasi"
                >
                    <Menu className="h-4 w-4" />
                </button>

                {/* Breadcrumbs / Page Title */}
                <div className="flex items-center gap-2 min-w-0">
                    <span className="hidden sm:inline text-xs font-medium text-slate-400 dark:text-slate-500">
                        Triple9
                    </span>
                    <span className="hidden sm:inline text-slate-300 dark:text-slate-600">/</span>
                    <h1 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {activeItemLabel}
                    </h1>
                </div>
            </div>

            {/* Top Header Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Theme Switcher Toggle */}
                <button
                    onClick={onToggleTheme}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition border border-slate-200 dark:border-zinc-800"
                    title={`Ganti tema (${resolvedAppearance === 'dark' ? 'Mode Terang' : 'Mode Gelap'})`}
                    aria-label="Ganti tema aplikasi"
                >
                    {resolvedAppearance === 'dark' ? (
                        <Sun className="h-4 w-4" />
                    ) : (
                        <Moon className="h-4 w-4" />
                    )}
                </button>

                {/* Notification Control */}
                <button
                    className="relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition border border-slate-200 dark:border-zinc-800"
                    title="Notifikasi"
                    aria-label="Notifikasi sistem"
                >
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#09090b]" />
                </button>

                {/* User Profile Pill & Dropdown */}
                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="flex items-center gap-2 rounded-lg py-1 px-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition border border-slate-200 dark:border-zinc-800"
                        >
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="hidden sm:inline max-w-[100px] truncate">
                                {user.name}
                            </span>
                            {user.role === 'admin' && (
                                <span className="hidden md:inline px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 uppercase tracking-wider">
                                    Admin
                                </span>
                            )}
                            <ChevronDown className="h-3 w-3 text-slate-400" />
                        </button>

                        {/* Dropdown Menu */}
                        {isUserMenuOpen && (
                            <div className="absolute right-0 top-10 z-50 w-52 rounded-xl bg-white dark:bg-[#121215] p-1.5 shadow-lg border border-slate-200 dark:border-zinc-800 animate-in fade-in zoom-in-95">
                                <div className="px-2.5 py-2 border-b border-slate-100 dark:border-zinc-800/60 mb-1">
                                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                                        {user.name}
                                    </p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                        {user.email}
                                    </p>
                                </div>

                                {user.role === 'admin' && (
                                    <Link
                                        href={dashboard()}
                                        className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                                    >
                                        <Shield className="h-3.5 w-3.5 text-slate-500" />
                                        <span>Admin Console</span>
                                    </Link>
                                )}

                                <Link
                                    href="/settings/profile"
                                    className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                                >
                                    <UserIcon className="h-3.5 w-3.5 text-slate-500" />
                                    <span>Pengaturan Profil</span>
                                </Link>

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition mt-1"
                                >
                                    <LogOut className="h-3.5 w-3.5" />
                                    <span>Keluar</span>
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5">
                        <Link
                            href={login()}
                            className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                        >
                            Masuk
                        </Link>
                        <Link
                            href={register()}
                            className="rounded-lg bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-xs font-medium text-white transition shadow-xs"
                        >
                            Daftar
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
