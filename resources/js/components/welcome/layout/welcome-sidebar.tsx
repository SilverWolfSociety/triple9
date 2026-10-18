import { Link } from '@inertiajs/react';
import {
    ChevronsUpDown,
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
import { useIsMobile } from '@/hooks/use-mobile';
import { dashboard, login, register } from '@/routes';
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

    const handleNavClick = (id: string) => {
        onSelectNav(id);
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            {/* Top Brand Logo matching Admin Dashboard */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Navigation Groups with animated group labels and icon tooltips */}
            <SidebarContent>
                {navGroups.map((group) => (
                    <SidebarGroup key={group.title} className="px-2 py-0">
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarMenu>
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeNav === item.id;
                                return (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            tooltip={{ children: item.label }}
                                            onClick={() => handleNavClick(item.id)}
                                            className="cursor-pointer"
                                        >
                                            <Icon className="size-4 shrink-0" />
                                            <span>{item.label}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            {/* Bottom Footer User Menu matching Admin Dashboard */}
            <SidebarFooter>
                {user ? (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent cursor-pointer"
                                        data-test="sidebar-user-button"
                                    >
                                        <UserInfo user={user} showEmail={true} />
                                        <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                    align="end"
                                    side={
                                        isMobile
                                            ? 'bottom'
                                            : state === 'collapsed'
                                              ? 'right'
                                              : 'top'
                                    }
                                >
                                    <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                                        <UserInfo user={user} showEmail={true} />
                                    </div>
                                    <DropdownMenuSeparator />
                                    {user.role === 'admin' && (
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href={dashboard()}
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <Shield className="h-4 w-4 text-muted-foreground" />
                                                <span>Admin Console</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    {onOpenAccountSettings && (
                                        <DropdownMenuItem
                                            onClick={onOpenAccountSettings}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                                            <span>Pengaturan Akun</span>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="flex w-full items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Keluar</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                ) : (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                tooltip={{ children: 'Masuk' }}
                                className="cursor-pointer"
                            >
                                <Link href={login()}>
                                    <LogIn className="size-4" />
                                    <span>Masuk</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                variant="outline"
                                tooltip={{ children: 'Daftar' }}
                                className="cursor-pointer"
                            >
                                <Link href={register()}>
                                    <UserIcon className="size-4" />
                                    <span>Daftar</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
