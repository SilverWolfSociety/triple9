import { ShieldCheck } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface AdminHeaderProps {
    activeItemLabel: string;
}

export function AdminHeader({ activeItemLabel }: AdminHeaderProps) {
    return (
        <header className="sticky top-0 z-30 shrink-0 flex items-center justify-between h-16 bg-white px-4 sm:px-6 border-b-4 border-black">
            <div className="flex items-center gap-3.5 min-w-0">
                {/* Neo-Brutalist Sidebar Trigger */}
                <SidebarTrigger className="h-9 w-9 rounded-md border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-black cursor-pointer shrink-0" />

                <div className="flex items-center gap-2.5 truncate">
                    <h1 className="text-base sm:text-lg font-black text-black uppercase tracking-wider truncate">
                        {activeItemLabel}
                    </h1>
                </div>
            </div>

            {/* Top Header Controls */}
            <div className="flex items-center gap-2.5 sm:gap-3">
                {/* Admin Status Pill */}
                <div className="inline-flex items-center gap-1.5 bg-[#FFD700] border-2 border-black px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_0px_#000000]">
                    <ShieldCheck className="h-3.5 w-3.5 stroke-[3] text-black" />
                    <span>Admin Mode V 1.0</span>
                </div>
            </div>
        </header>
    );
}
