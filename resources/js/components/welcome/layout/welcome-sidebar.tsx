import { Link } from '@inertiajs/react';
import {
    PanelLeftClose,
    PanelLeftOpen,
    LogOut,
    LogIn,
    X,
} from 'lucide-react';
import { login, register } from '@/routes';
import type { User } from '@/types';
import { navGroups } from '../constants';

interface WelcomeSidebarProps {
    user?: User;
    activeNav: string;
    isSidebarOpen: boolean;
    isMobileMenuOpen: boolean;
    onSelectNav: (id: string) => void;
    onToggleSidebar: (open: boolean) => void;
    onCloseMobileMenu: () => void;
}

export function WelcomeSidebar({
    user,
    activeNav,
    isSidebarOpen,
    isMobileMenuOpen,
    onSelectNav,
    onToggleSidebar,
    onCloseMobileMenu,
}: WelcomeSidebarProps) {
    return (
        <>
            {/* Mobile Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
                    onClick={onCloseMobileMenu}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between shrink-0 bg-white dark:bg-[#09090b] border-r border-slate-200 dark:border-[#27272a] select-none h-full transition-all duration-200 ease-in-out lg:static ${
                    isMobileMenuOpen
                        ? 'translate-x-0 w-64'
                        : '-translate-x-full lg:translate-x-0 ' + (isSidebarOpen ? 'w-64' : 'w-18')
                }`}
            >
                {/* Top Brand & Workspace Header */}
                <div className="flex flex-col flex-1 min-h-0">
                    <div
                        className={`flex items-center h-14 border-b border-slate-200 dark:border-[#27272a] px-4 shrink-0 ${
                            isSidebarOpen ? 'justify-between' : 'justify-center'
                        }`}
                    >
                        {isSidebarOpen ? (
                            <>
                                <Link
                                    href="/"
                                    className="flex items-center gap-2.5 min-w-0"
                                >
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
                                            Triple9
                                        </span>
                                    </div>
                                </Link>

                                {/* Collapse Button (Desktop Only) */}
                                <button
                                    onClick={() => onToggleSidebar(false)}
                                    className="hidden lg:flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                                    title="Ciutkan Sidebar"
                                    aria-label="Ciutkan Sidebar"
                                >
                                    <PanelLeftClose className="h-4 w-4" />
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => onToggleSidebar(true)}
                                className="hidden lg:flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                                title="Buka Sidebar"
                                aria-label="Buka Sidebar"
                            >
                                <PanelLeftOpen className="h-4 w-4" />
                            </button>
                        )}

                        {/* Mobile Close Button */}
                        <button
                            onClick={onCloseMobileMenu}
                            className="flex lg:hidden h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                            aria-label="Tutup menu"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Navigation Groups */}
                    <div className="flex-1 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-3 py-3 space-y-4">
                        {navGroups.map((group) => (
                            <div key={group.title} className="space-y-1">
                                {isSidebarOpen ? (
                                    <h4 className="px-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                        {group.title}
                                    </h4>
                                ) : (
                                    <div className="my-1 border-t border-slate-100 dark:border-zinc-800/80" />
                                )}

                                <div className="space-y-0.5">
                                    {group.items.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = activeNav === item.id;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => onSelectNav(item.id)}
                                                title={!isSidebarOpen ? item.label : undefined}
                                                className={`group relative flex items-center w-full rounded-lg text-xs font-medium transition-colors ${
                                                    isSidebarOpen
                                                        ? 'gap-2.5 px-2.5 py-2'
                                                        : 'justify-center h-9 w-9 mx-auto'
                                                } ${
                                                    isActive
                                                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold'
                                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800/60'
                                                }`}
                                            >
                                                <Icon
                                                    className={`h-4 w-4 shrink-0 transition-colors ${
                                                        isActive
                                                            ? 'text-blue-600 dark:text-blue-400'
                                                            : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                                                    }`}
                                                />
                                                {isSidebarOpen && (
                                                    <span className="truncate text-left flex-1">
                                                        {item.label}
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Sidebar: User & System Status */}
                <div className="border-t border-slate-200 dark:border-[#27272a] p-3 shrink-0">
                    {user ? (
                        isSidebarOpen ? (
                            <div className="flex items-center justify-between gap-2.5 p-1.5 rounded-lg bg-slate-50 dark:bg-[#121215]/50 border border-slate-200/80 dark:border-zinc-800">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-slate-200 text-xs font-semibold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate leading-tight">
                                            {user.name}
                                        </p>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate leading-tight">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition shrink-0"
                                    title="Keluar"
                                >
                                    <LogOut className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-1">
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                                    title="Keluar"
                                >
                                    <LogOut className="h-4 w-4" />
                                </Link>
                            </div>
                        )
                    ) : isSidebarOpen ? (
                        <div className="flex flex-col gap-1.5">
                            <Link
                                href={login()}
                                className="flex items-center justify-center gap-1.5 w-full rounded-lg bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-800 transition"
                            >
                                <LogIn className="h-3.5 w-3.5" />
                                <span>Masuk</span>
                            </Link>
                            <Link
                                href={register()}
                                className="flex items-center justify-center w-full rounded-lg bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-xs font-medium text-white transition shadow-xs"
                            >
                                Daftar Akun
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <Link
                                href={login()}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                                title="Masuk"
                            >
                                <LogIn className="h-4 w-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
