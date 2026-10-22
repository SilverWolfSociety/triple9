import { Link } from '@inertiajs/react';
import {
    BarChart3,
    CheckSquare,
    ChevronsUpDown,
    Headphones,
    LogOut,
    Settings,
    Users,
    Wallet,
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
import { logout } from '@/routes';
import type { User } from '@/types';
import type { AdminNavId, AdminNavGroup } from './types';

interface AdminSidebarProps {
    user?: User;
    activeNav: AdminNavId;
    onSelectNav: (id: AdminNavId) => void;
    pendingSetoranCount: number;
    pendingPayoutCount: number;
    waitingTicketCount: number;
}

export function AdminSidebar({
    user,
    activeNav,
    onSelectNav,
    pendingSetoranCount,
    pendingPayoutCount,
    waitingTicketCount,
}: AdminSidebarProps) {
    const { state, isMobile, setOpenMobile } = useSidebar();

    const handleNavClick = (id: AdminNavId) => {
        onSelectNav(id);
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    const displayUser: User = user || {
        id: 1,
        name: 'Administrator',
        email: 'admin@example.com',
        avatar: '/images/avatar/rubah.png',
        role: 'admin',
        email_verified_at: null,
        created_at: '2026-10-01T00:00:00.000000Z',
        updated_at: '2026-10-01T00:00:00.000000Z',
    };

    const adminNavGroups: AdminNavGroup[] = [
        {
            title: 'Utama',
            items: [
                {
                    id: 'overview',
                    label: 'Ringkasan',
                    icon: BarChart3,
                },
                {
                    id: 'setoran',
                    label: 'Kelola Setoran',
                    icon: CheckSquare,
                    badge: pendingSetoranCount > 0 ? pendingSetoranCount : undefined,
                    badgeColor: 'bg-[#FFD700]',
                },
                {
                    id: 'payouts',
                    label: 'Pencairan Saldo',
                    icon: Wallet,
                    badge: pendingPayoutCount > 0 ? pendingPayoutCount : undefined,
                    badgeColor: 'bg-[#FF00FF]',
                },
            ],
        },
        {
            title: 'Manajemen',
            items: [
                {
                    id: 'users',
                    label: 'Data Pengguna',
                    icon: Users,
                },
                {
                    id: 'support',
                    label: 'Tiket Bantuan',
                    icon: Headphones,
                    badge: waitingTicketCount > 0 ? waitingTicketCount : undefined,
                    badgeColor: 'bg-[#00C2CB]',
                },
            ],
        },
        {
            title: 'Konfigurasi',
            items: [
                {
                    id: 'settings',
                    label: 'Pengaturan Sistem',
                    icon: Settings,
                },
            ],
        },
    ];

    return (
        <Sidebar
            collapsible="icon"
            className="bg-white text-black border-r-4 border-black z-30"
        >
            {/* Top Brand Header */}
            <SidebarHeader className="h-16 flex items-center justify-center border-b-4 border-black bg-white shrink-0 px-2 overflow-hidden">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="hover:bg-transparent active:bg-transparent cursor-pointer"
                        >
                            <Link href="/dashboard" prefetch>
                                <AppLogo showText={false} />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Navigation Groups */}
            <SidebarContent className="no-scrollbar bg-white py-2">
                {adminNavGroups.map((group) => (
                    <SidebarGroup key={group.title} className="px-2 py-0">
                        <SidebarGroupLabel className="text-[11px] font-black uppercase tracking-wider text-black px-2 transition-[margin,opacity] duration-200 ease-linear">
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeNav === item.id;

                                return (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton
                                            asChild={false}
                                            isActive={isActive}
                                            tooltip={{ children: item.label }}
                                            onClick={() => handleNavClick(item.id)}
                                            className={`cursor-pointer select-none rounded-md text-xs font-bold transition-all duration-200 ${isActive
                                                ? 'bg-[#00C2CB] text-black font-black border-2 border-black shadow-[2px_2px_0px_0px_#000000] hover:bg-[#00C2CB] hover:text-black'
                                                : 'text-black border-2 border-transparent hover:border-black hover:bg-[#F5F5DC] hover:shadow-[2px_2px_0px_0px_#000000]'
                                                }`}
                                        >
                                            <Icon className="size-4 shrink-0 stroke-[2.5] text-black" />
                                            <span className="truncate flex-1">{item.label}</span>
                                            {item.badge !== undefined && (
                                                <span
                                                    className={`ml-auto px-1.5 py-0.2 rounded-xs border border-black font-black text-[10px] ${item.badgeColor || 'bg-[#FFD700]'} text-black shadow-[1px_1px_0px_0px_#000000] transition-opacity duration-200 group-data-[collapsible=icon]:hidden`}
                                                >
                                                    {item.badge}
                                                </span>
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
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
