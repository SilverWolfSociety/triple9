import { Link } from '@inertiajs/react';
import { HelpCircle } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { login, register } from '@/routes';
import type { User } from '@/types';
import { NotificationDropdown } from './notification-dropdown';

interface WelcomeHeaderProps {
    user?: User;
    activeItemLabel: string;
    onNavigate?: (id: string) => void;
    onOpenAccountSettings?: () => void;
    onOpenIntroModal?: () => void;
}

export function WelcomeHeader({
    user,
    activeItemLabel,
    onNavigate,
    onOpenIntroModal,
}: WelcomeHeaderProps) {
    return (
        <header className="sticky top-0 z-30 shrink-0 flex items-center justify-between h-16 bg-white px-4 sm:px-6 border-b-4 border-black">
            <div className="flex items-center gap-3.5 min-w-0">
                {/* Neo-Brutalist Sidebar Trigger */}
                <SidebarTrigger className="h-9 w-9 rounded-md border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-black cursor-pointer shrink-0" />

                <h1 className="text-base sm:text-lg font-black text-black uppercase tracking-wider truncate">
                    {activeItemLabel}
                </h1>
            </div>

            {/* Top Header Controls */}
            <div className="flex items-center gap-2.5 sm:gap-3">
                {/* 1. Help / Panduan Modal Trigger */}
                {onOpenIntroModal && (
                    <button
                        type="button"
                        onClick={onOpenIntroModal}
                        className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-black cursor-pointer"
                        title="Panduan & Pengenalan Triple9"
                        aria-label="Buka panduan pengenalan"
                    >
                        <HelpCircle className="h-4.5 w-4.5 text-black stroke-[2.5]" />
                    </button>
                )}

                {/* 2. Notification Dropdown (With Accent Magenta #FF00FF badge dot) */}
                <NotificationDropdown onNavigate={onNavigate} />

                {/* Guest Auth Buttons if not logged in */}
                {!user && (
                    <div className="flex items-center gap-2 ml-1">
                        <Link
                            href={login()}
                            className="rounded-md border-2 border-black bg-white px-3 py-1.5 text-xs font-black text-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase"
                        >
                            Masuk
                        </Link>
                        <Link
                            href={register()}
                            className="rounded-md border-2 border-black bg-[#00C2CB] px-3 py-1.5 text-xs font-black text-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase"
                        >
                            Daftar
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
