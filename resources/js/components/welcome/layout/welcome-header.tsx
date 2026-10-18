import { Link } from '@inertiajs/react';
import { Sun, Moon } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { login, register } from '@/routes';
import type { User } from '@/types';
import { NotificationDropdown } from './notification-dropdown';

interface WelcomeHeaderProps {
    user?: User;
    activeItemLabel: string;
    resolvedAppearance: string;
    onToggleTheme: () => void;
    onNavigate?: (id: string) => void;
    onOpenAccountSettings?: () => void;
}

export function WelcomeHeader({
    user,
    activeItemLabel,
    resolvedAppearance,
    onToggleTheme,
    onNavigate,
}: WelcomeHeaderProps) {
    return (
        <header className="sticky top-0 z-20 shrink-0 flex items-center justify-between h-14 bg-background/80 backdrop-blur-md px-4 sm:px-6 border-b border-sidebar-border/50 transition-[width,height] ease-linear">
            <div className="flex items-center gap-3 min-w-0">
                {/* Standard Animated Sidebar Trigger from Shadcn UI */}
                <SidebarTrigger className="-ml-1 rounded-lg" />

                <h1 className="text-sm font-semibold text-foreground truncate">
                    {activeItemLabel}
                </h1>
            </div>

            {/* Top Header Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Theme Switcher Toggle */}
                <button
                    onClick={onToggleTheme}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition border border-sidebar-border/50 cursor-pointer"
                    title={`Ganti tema (${resolvedAppearance === 'dark' ? 'Mode Terang' : 'Mode Gelap'})`}
                    aria-label="Ganti tema aplikasi"
                >
                    {resolvedAppearance === 'dark' ? (
                        <Sun className="h-4 w-4" />
                    ) : (
                        <Moon className="h-4 w-4" />
                    )}
                </button>

                {/* Notification Dropdown */}
                <NotificationDropdown onNavigate={onNavigate} />

                {/* Guest Auth Buttons if not logged in */}
                {!user && (
                    <div className="flex items-center gap-1.5">
                        <Link
                            href={login()}
                            className="rounded-lg px-3 py-1.5 text-xs font-medium text-foreground hover:bg-sidebar-accent transition"
                        >
                            Masuk
                        </Link>
                        <Link
                            href={register()}
                            className="rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 px-3 py-1.5 text-xs font-medium transition shadow-xs"
                        >
                            Daftar
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
