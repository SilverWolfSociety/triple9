import { Link } from '@inertiajs/react';
import {
    ChevronsUpDown,
    ExternalLink,
    LogIn,
    LogOut,
    Shield,
    User as UserIcon,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { dashboard, login, logout, register } from '@/routes';
import type { User } from '@/types';
import { navGroups } from '../constants';

interface WelcomeSidebarProps {
    user?: User;
    activeNav: string;
    onSelectNav: (id: string) => void;
    onOpenAccountSettings?: () => void;
}

export function WelcomeSidebar({
    user,
    activeNav,
    onSelectNav,
    onOpenAccountSettings,
}: WelcomeSidebarProps) {
    const { state, isMobile, setOpenMobile } = useSidebar();

    const WHATSAPP_SUPPORT_URL =
        'https://wa.me/6281234567890?text=Halo%20Admin%20Triple9,%20saya%20butuh%20bantuan%20terkait%20layanan%20Triple9.';

    const handleNavClick = (id: string) => {
        if (id === 'support') {
            window.open(WHATSAPP_SUPPORT_URL, '_blank', 'noopener,noreferrer');
            if (isMobile) {
                setOpenMobile(false);
            }
            return;
        }
        onSelectNav(id);
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    // Ensure fallback to Hawwin Ramadhan as per design specifications
    const displayUser: User = user || {
        id: 10,
        name: 'Hawwin Ramadhan',
        email: 'firstxyz0@gmail.com',
        avatar: '/images/avatar/kucing.png',
        role: 'user',
        email_verified_at: null,
        created_at: '2026-10-22T00:00:00.000000Z',
        updated_at: '2026-10-22T00:00:00.000000Z',
    };

    return (
        <Sidebar
            collapsible="icon"
            className="bg-white text-black border-r-4 border-black z-30"
        >
            {/* Top Brand Header - Exactly h-16 and border-b-4 border-black to perfectly align with WelcomeHeader */}
            <SidebarHeader className="h-16 flex items-center justify-center border-b-4 border-black bg-white shrink-0 px-2 overflow-hidden">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="hover:bg-transparent active:bg-transparent cursor-pointer"
                        >
                            <Link href="/" prefetch>
                                <AppLogo showText={false} />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Navigation Groups with smooth collapsible transitions like Laravel starter kit */}
            <SidebarContent className="no-scrollbar bg-white py-2">
                {navGroups.map((group) => (
                    <SidebarGroup key={group.title} className="px-2 py-0">
                        <SidebarGroupLabel className="text-[11px] font-black uppercase tracking-wider text-black px-2 transition-[margin,opacity] duration-200 ease-linear">
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeNav === item.id;
                                const isSupport = item.id === 'support';
                                return (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton
                                            asChild={false}
                                            isActive={isActive}
                                            tooltip={{ children: isSupport ? `${item.label} (WhatsApp)` : item.label }}
                                            onClick={() => handleNavClick(item.id)}
                                            className={`cursor-pointer select-none rounded-md text-xs font-bold transition-all duration-200 ${
                                                isActive
                                                    ? 'bg-[#00C2CB] text-black font-black border-2 border-black shadow-[2px_2px_0px_0px_#000000] hover:bg-[#00C2CB] hover:text-black'
                                                    : 'text-black border-2 border-transparent hover:border-black hover:bg-[#F5F5DC] hover:shadow-[2px_2px_0px_0px_#000000]'
                                            }`}
                                        >
                                            <Icon className="size-4 shrink-0 stroke-[2.5] text-black" />
                                            <span className="truncate">{item.label}</span>
                                            {isSupport && (
                                                <ExternalLink className="size-3 ml-auto text-neutral-600 stroke-[2.5] shrink-0 group-data-[collapsible=icon]:hidden" />
                                            )}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            {/* Bottom Footer User Menu with Neo-Brutalist Profile Card */}
            <SidebarFooter className="border-t-4 border-black bg-white p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="w-full rounded-md border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all duration-200 cursor-pointer group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:shadow-none group-data-[collapsible=icon]:hover:translate-x-0 group-data-[collapsible=icon]:hover:translate-y-0"
                                    data-test="sidebar-user-button"
                                >
                                    <UserInfo user={displayUser} showEmail={true} />
                                    <ChevronsUpDown className="ml-auto size-4 shrink-0 text-black stroke-[2.5] transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 overflow-hidden" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-md border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000000] p-1.5 font-bold text-black"
                                align="end"
                                side={
                                    isMobile
                                        ? 'bottom'
                                        : state === 'collapsed'
                                          ? 'right'
                                          : 'top'
                                }
                            >
                                <div className="p-2 border-b-2 border-black mb-1 bg-[#F5F5DC] rounded-sm">
                                    <UserInfo user={displayUser} showEmail={true} />
                                </div>

                                {displayUser.role === 'admin' && (
                                    <DropdownMenuItem asChild className="cursor-pointer font-bold focus:bg-[#00C2CB] focus:text-black rounded-sm">
                                        <Link
                                            href={dashboard()}
                                            className="flex items-center gap-2 cursor-pointer p-2"
                                        >
                                            <Shield className="h-4 w-4 stroke-[2.5]" />
                                            <span>Admin Console</span>
                                        </Link>
                                    </DropdownMenuItem>
                                )}

                                {onOpenAccountSettings && (
                                    <DropdownMenuItem
                                        onClick={onOpenAccountSettings}
                                        className="flex items-center gap-2 cursor-pointer p-2 font-bold focus:bg-[#00C2CB] focus:text-black rounded-sm"
                                    >
                                        <UserIcon className="h-4 w-4 stroke-[2.5]" />
                                        <span>Pengaturan Akun</span>
                                    </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator className="bg-black h-[2px] my-1" />

                                {user ? (
                                    <DropdownMenuItem asChild className="cursor-pointer font-bold text-rose-600 focus:bg-rose-100 focus:text-rose-700 rounded-sm">
                                        <Link
                                            href={logout()}
                                            method="post"
                                            as="button"
                                            className="flex w-full items-center gap-2 cursor-pointer p-2"
                                        >
                                            <LogOut className="h-4 w-4 stroke-[2.5]" />
                                            <span>Keluar</span>
                                        </Link>
                                    </DropdownMenuItem>
                                ) : (
                                    <div className="grid grid-cols-2 gap-1.5 p-1">
                                        <Link
                                            href={login()}
                                            className="text-center py-1.5 text-xs font-black bg-white text-black border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_#000000]"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={register()}
                                            className="text-center py-1.5 text-xs font-black bg-[#00C2CB] text-black border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_#000000]"
                                        >
                                            Daftar
                                        </Link>
                                    </div>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
