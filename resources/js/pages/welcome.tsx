import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Send,
    Wallet,
    SearchCheck,
    History,
    FileText,
    Receipt,
    Trophy,
    Users,
    Gift,
    Headphones,
    CheckCircle2,
    Clock,
    XCircle,
    ScanSearch,
    Eye,
    EyeOff,
    PanelLeftClose,
    PanelLeftOpen,
    Bell,
    ChevronDown,
    ChevronRight,
    LogOut,
    LogIn,
    User as UserIcon,
    Shield,
    Sun,
    Moon,
    Check,
    Copy,
    ArrowUpRight,
    MessageCircle,
    AlertCircle,
    Info,
    Menu,
    X,
} from 'lucide-react';
import { dashboard, login, register } from '@/routes';
import { useAppearance } from '@/hooks/use-appearance';
import type { Auth } from '@/types';

interface NavItemConfig {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
}

interface NavGroupConfig {
    title: string;
    items: NavItemConfig[];
}

const navGroups: NavGroupConfig[] = [
    {
        title: 'Menu Utama',
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'stor', label: 'Stor Akun', icon: Send },
            { id: 'saldo', label: 'Saldo & Penarikan', icon: Wallet },
            { id: 'checker', label: 'Bulk Checker', icon: SearchCheck },
        ],
    },
    {
        title: 'Transaksi & Audit',
        items: [
            { id: 'riwayat', label: 'Riwayat Stor', icon: History },
            { id: 'rules', label: 'Ketentuan & Rules', icon: FileText },
            { id: 'laporan', label: 'Laporan Statistik', icon: Receipt },
        ],
    },
    {
        title: 'Ekosistem & Bantuan',
        items: [
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { id: 'komunitas', label: 'Komunitas', icon: Users },
            { id: 'referral', label: 'Program Referral', icon: Gift },
            { id: 'support', label: 'Triple9 Support', icon: Headphones },
        ],
    },
];

const allNavItems = navGroups.flatMap((g) => g.items);

export default function Welcome() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const user = auth?.user;
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const [activeNav, setActiveNav] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [riwayatFilter, setRiwayatFilter] = useState<'all' | 'diterima' | 'pending' | 'ditolak' | 'dicek'>('all');
    const [storInput, setStorInput] = useState('');
    const [checkerInput, setCheckerInput] = useState('');
    const [referralCopied, setReferralCopied] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawMethod, setWithdrawMethod] = useState('BCA');
    const [withdrawAccount, setWithdrawAccount] = useState('');
    const [isSaldoVisible, setIsSaldoVisible] = useState(true);

    const activeItemLabel = allNavItems.find((n) => n.id === activeNav)?.label || 'Dashboard';

    const handleNavClick = (id: string) => {
        setActiveNav(id);
        setIsMobileMenuOpen(false);
    };

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    return (
        <>
            <Head title={`${activeItemLabel} — Triple9`} />

            {/* Main Application Shell */}
            <div className="flex h-screen w-full bg-slate-50 dark:bg-[#0B1120] font-sans antialiased text-slate-900 dark:text-slate-100 overflow-hidden">
                {/* Mobile Backdrop */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* SIDEBAR */}
                <aside
                    className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between shrink-0 bg-white dark:bg-[#111827] border-r border-slate-200 dark:border-[#273449] select-none h-full transition-all duration-200 ease-in-out lg:static ${isMobileMenuOpen
                        ? 'translate-x-0 w-64'
                        : '-translate-x-full lg:translate-x-0 ' + (isSidebarOpen ? 'w-64' : 'w-18')
                        }`}
                >
                    {/* Top Brand & Workspace Header */}
                    <div className="flex flex-col flex-1 min-h-0">
                        <div
                            className={`flex items-center h-14 border-b border-slate-200 dark:border-[#273449] px-4 shrink-0 ${isSidebarOpen ? 'justify-between' : 'justify-center'
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
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="hidden lg:flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                        title="Ciutkan Sidebar"
                                        aria-label="Ciutkan Sidebar"
                                    >
                                        <PanelLeftClose className="h-4 w-4" />
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="hidden lg:flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                    title="Buka Sidebar"
                                    aria-label="Buka Sidebar"
                                >
                                    <PanelLeftOpen className="h-4 w-4" />
                                </button>
                            )}

                            {/* Mobile Close Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex lg:hidden h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                aria-label="Tutup menu"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Navigation Groups */}
                        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
                            {navGroups.map((group) => (
                                <div key={group.title} className="space-y-1">
                                    {isSidebarOpen ? (
                                        <h4 className="px-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                            {group.title}
                                        </h4>
                                    ) : (
                                        <div className="my-1 border-t border-slate-100 dark:border-slate-800/80" />
                                    )}

                                    <div className="space-y-0.5">
                                        {group.items.map((item) => {
                                            const Icon = item.icon;
                                            const isActive = activeNav === item.id;
                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => handleNavClick(item.id)}
                                                    title={!isSidebarOpen ? item.label : undefined}
                                                    className={`group relative flex items-center w-full rounded-lg text-xs font-medium transition-colors ${isSidebarOpen
                                                        ? 'gap-2.5 px-2.5 py-2'
                                                        : 'justify-center h-9 w-9 mx-auto'
                                                        } ${isActive
                                                            ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold'
                                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                                                        }`}
                                                >
                                                    <Icon
                                                        className={`h-4 w-4 shrink-0 transition-colors ${isActive
                                                            ? 'text-blue-600 dark:text-blue-400'
                                                            : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                                                            }`}
                                                    />
                                                    {isSidebarOpen && (
                                                        <span className="truncate text-left flex-1">
                                                            {item.label}
                                                        </span>
                                                    )}
                                                    {isSidebarOpen && isActive && (
                                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
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
                    <div className="border-t border-slate-200 dark:border-[#273449] p-3 shrink-0">
                        {user ? (
                            isSidebarOpen ? (
                                <div className="flex items-center justify-between gap-2.5 p-1.5 rounded-lg bg-slate-50 dark:bg-[#1F2937]/50 border border-slate-200/80 dark:border-slate-800">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold">
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
                        ) : (
                            isSidebarOpen ? (
                                <div className="flex flex-col gap-1.5">
                                    <Link
                                        href={login()}
                                        className="flex items-center justify-center gap-1.5 w-full rounded-lg bg-white dark:bg-[#1F2937] border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
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
                                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                        title="Masuk"
                                    >
                                        <LogIn className="h-4 w-4" />
                                    </Link>
                                </div>
                            )
                        )}
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto">
                    {/* TOP HEADER */}
                    <header className="sticky top-0 z-30 shrink-0 flex items-center justify-between h-14 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-[#273449]">
                        <div className="flex items-center gap-3 min-w-0">
                            {/* Mobile Hamburger Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="flex lg:hidden h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
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
                                onClick={toggleTheme}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-slate-200 dark:border-slate-800"
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
                                className="relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-slate-200 dark:border-slate-800"
                                title="Notifikasi"
                                aria-label="Notifikasi sistem"
                            >
                                <Bell className="h-4 w-4" />
                                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 ring-2 ring-white dark:ring-[#111827]" />
                            </button>

                            {/* User Profile Pill & Dropdown */}
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center gap-2 rounded-lg py-1 px-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-slate-200 dark:border-slate-800"
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
                                        <div className="absolute right-0 top-10 z-50 w-52 rounded-xl bg-white dark:bg-[#1F2937] p-1.5 shadow-lg border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95">
                                            <div className="px-2.5 py-2 border-b border-slate-100 dark:border-slate-700/60 mb-1">
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
                                                    className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                                                >
                                                    <Shield className="h-3.5 w-3.5 text-slate-500" />
                                                    <span>Admin Console</span>
                                                </Link>
                                            )}

                                            <Link
                                                href="/settings/profile"
                                                className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
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
                                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
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

                    {/* DASHBOARD PAGE CONTENT */}
                    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                        {/* 1. DASHBOARD VIEW */}
                        {activeNav === 'dashboard' && (
                            <div className="space-y-6">
                                {/* SECTION 1: REFACTORED BALANCE CARD (Professional SaaS, Restrained, High Contrast) */}
                                <div className="rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-6 shadow-xs">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                                    Saldo Tersedia
                                                </span>
                                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                    Siap Ditarik
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 font-tabular-nums">
                                                    {isSaldoVisible ? 'Rp20.000' : 'Rp ••••••'}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsSaldoVisible(!isSaldoVisible)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                                    title={isSaldoVisible ? 'Sembunyikan saldo' : 'Tampilkan saldo'}
                                                    aria-label={isSaldoVisible ? 'Sembunyikan saldo' : 'Tampilkan saldo'}
                                                >
                                                    {isSaldoVisible ? (
                                                        <Eye className="h-4 w-4" />
                                                    ) : (
                                                        <EyeOff className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>

                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                Minimal penarikan Rp10.000 • Diproses otomatis 1x24 jam
                                            </p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2.5 shrink-0">
                                            <button
                                                onClick={() => setActiveNav('saldo')}
                                                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-medium shadow-xs transition"
                                            >
                                                <Wallet className="h-3.5 w-3.5" />
                                                <span>Tarik Saldo</span>
                                            </button>
                                            <button
                                                onClick={() => setActiveNav('riwayat')}
                                                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white dark:bg-[#1F2937] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-medium transition"
                                            >
                                                <History className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                                                <span>Riwayat Saldo</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2: REFACTORED STATUS SUMMARY (4 Columns, Subtle Semantic Indicators, No Heavy Badges) */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Ringkasan Verifikasi Stor
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                                        {/* 1. DITERIMA */}
                                        <div
                                            onClick={() => {
                                                setActiveNav('riwayat');
                                                setRiwayatFilter('diterima');
                                            }}
                                            className="group flex flex-col justify-between rounded-xl bg-white dark:bg-[#111827] p-4.5 border border-slate-200 dark:border-[#273449] shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                                    Diterima
                                                </span>
                                                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <div className="flex items-baseline justify-between mt-1">
                                                <span className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 font-tabular-nums">
                                                    0
                                                </span>
                                                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                                    Akun lolos
                                                </span>
                                            </div>
                                        </div>

                                        {/* 2. PENDING */}
                                        <div
                                            onClick={() => {
                                                setActiveNav('riwayat');
                                                setRiwayatFilter('pending');
                                            }}
                                            className="group flex flex-col justify-between rounded-xl bg-white dark:bg-[#111827] p-4.5 border border-slate-200 dark:border-[#273449] shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                                    Pending
                                                </span>
                                                <Clock className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                                            </div>
                                            <div className="flex items-baseline justify-between mt-1">
                                                <span className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 font-tabular-nums">
                                                    0
                                                </span>
                                                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                                    Dalam antrean
                                                </span>
                                            </div>
                                        </div>

                                        {/* 3. DITOLAK */}
                                        <div
                                            onClick={() => {
                                                setActiveNav('riwayat');
                                                setRiwayatFilter('ditolak');
                                            }}
                                            className="group flex flex-col justify-between rounded-xl bg-white dark:bg-[#111827] p-4.5 border border-slate-200 dark:border-[#273449] shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                                    Ditolak
                                                </span>
                                                <XCircle className="h-4 w-4 text-rose-500 dark:text-rose-400" />
                                            </div>
                                            <div className="flex items-baseline justify-between mt-1">
                                                <span className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 font-tabular-nums">
                                                    0
                                                </span>
                                                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                                    Tidak valid
                                                </span>
                                            </div>
                                        </div>

                                        {/* 4. DI CEK */}
                                        <div
                                            onClick={() => {
                                                setActiveNav('riwayat');
                                                setRiwayatFilter('dicek');
                                            }}
                                            className="group flex flex-col justify-between rounded-xl bg-white dark:bg-[#111827] p-4.5 border border-slate-200 dark:border-[#273449] shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                                    Di Cek
                                                </span>
                                                <ScanSearch className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                                            </div>
                                            <div className="flex items-baseline justify-between mt-1">
                                                <span className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 font-tabular-nums">
                                                    0
                                                </span>
                                                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                                    Proses verifikasi
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 3: REFACTORED RECENT ACTIVITY (Deliberate Table Structure, Clean Empty State) */}
                                <div className="rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] shadow-xs overflow-hidden">
                                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-[#273449]">
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                                Aktivitas Stor Terakhir
                                            </h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                Daftar pengajuan stor akun dan status verifikasi terbaru Anda
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => setActiveNav('riwayat')}
                                            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                                        >
                                            <span>Lihat Semua</span>
                                            <ChevronRight className="h-3.5 w-3.5" />
                                        </button>
                                    </div>

                                    {/* Deliberate Clean Empty State */}
                                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-[#1F2937] text-slate-400 dark:text-slate-500 mb-3">
                                            <History className="h-5 w-5" />
                                        </div>
                                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                            Belum Ada Aktivitas Stor
                                        </h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-4 leading-relaxed">
                                            Setiap pengajuan stor akun akan dicatat di sini secara transparan beserta status verifikasi dan reward saldo Anda.
                                        </p>
                                        <button
                                            onClick={() => setActiveNav('stor')}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 text-xs font-medium shadow-xs transition"
                                        >
                                            <Send className="h-3.5 w-3.5" />
                                            <span>Mulai Stor Akun Sekarang</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. STOR VIEW */}
                        {activeNav === 'stor' && (
                            <div className="max-w-3xl space-y-6">
                                <div className="rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-6 shadow-xs">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
                                        <div>
                                            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                                                Formulir Stor Akun
                                            </h2>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                Masukkan daftar akun yang ingin disubmit untuk verifikasi
                                            </p>
                                        </div>
                                        <span className="self-start sm:self-auto inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40">
                                            Rp4.300 / Akun Valid
                                        </span>
                                    </div>

                                    <div className="space-y-4 pt-5">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                Daftar Akun (Satu baris per akun)
                                            </label>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                                                Format wajib:{' '}
                                                <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-slate-800 dark:text-slate-200 text-[11px]">
                                                    email|password|recovery_email
                                                </code>
                                            </p>
                                            <textarea
                                                rows={8}
                                                value={storInput}
                                                onChange={(e) => setStorInput(e.target.value)}
                                                placeholder={`contoh@gmail.com|Password123|recovery@email.com\nakun2@gmail.com|Password456|recovery@email.com`}
                                                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] p-3 font-mono text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                                            />
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                Total input:{' '}
                                                <span className="font-semibold text-slate-900 dark:text-slate-100">
                                                    {storInput.trim() ? storInput.trim().split('\n').filter((l) => l.trim().length > 0).length : 0}
                                                </span>{' '}
                                                akun
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (storInput.trim()) {
                                                        alert('Fitur Stor Akun siap disambungkan ke backend database!');
                                                    } else {
                                                        alert('Silakan masukkan akun terlebih dahulu.');
                                                    }
                                                }}
                                                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-medium shadow-xs transition"
                                            >
                                                <Send className="h-3.5 w-3.5" />
                                                <span>Kirim Pengajuan Stor</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 3. SALDO VIEW */}
                        {activeNav === 'saldo' && (
                            <div className="max-w-3xl space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                                    <div className="rounded-xl bg-white dark:bg-[#111827] p-4.5 border border-slate-200 dark:border-[#273449] shadow-xs">
                                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                            Saldo Tersedia
                                        </span>
                                        <div className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 font-tabular-nums mt-1">
                                            Rp20.000
                                        </div>
                                    </div>
                                    <div className="rounded-xl bg-white dark:bg-[#111827] p-4.5 border border-slate-200 dark:border-[#273449] shadow-xs">
                                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                            Total Ditarik
                                        </span>
                                        <div className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 font-tabular-nums mt-1">
                                            Rp0
                                        </div>
                                    </div>
                                    <div className="rounded-xl bg-white dark:bg-[#111827] p-4.5 border border-slate-200 dark:border-[#273449] shadow-xs">
                                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                            Dalam Proses
                                        </span>
                                        <div className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 font-tabular-nums mt-1">
                                            Rp0
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-6 shadow-xs">
                                    <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                        Formulir Tarik Saldo
                                    </h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                                        Minimal penarikan adalah Rp10.000 tanpa biaya admin tambahan
                                    </p>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                Metode Penarikan
                                            </label>
                                            <select
                                                value={withdrawMethod}
                                                onChange={(e) => setWithdrawMethod(e.target.value)}
                                                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
                                            >
                                                <option value="BCA">Bank Central Asia (BCA)</option>
                                                <option value="BRI">Bank Rakyat Indonesia (BRI)</option>
                                                <option value="Mandiri">Bank Mandiri</option>
                                                <option value="BNI">Bank Negara Indonesia (BNI)</option>
                                                <option value="DANA">DANA (E-Wallet)</option>
                                                <option value="OVO">OVO (E-Wallet)</option>
                                                <option value="GoPay">GoPay (E-Wallet)</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                Nomor Rekening / Nomor E-Wallet
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Contoh: 1234567890 atau 08123456789"
                                                value={withdrawAccount}
                                                onChange={(e) => setWithdrawAccount(e.target.value)}
                                                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] p-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                Nominal Penarikan (Rp)
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Minimal 10000"
                                                value={withdrawAmount}
                                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] p-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>

                                        <button
                                            onClick={() => alert('Permintaan penarikan saldo telah dicatat!')}
                                            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-2.5 text-xs font-medium shadow-xs transition mt-2"
                                        >
                                            Konfirmasi Penarikan Saldo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 4. CHECKER VIEW */}
                        {activeNav === 'checker' && (
                            <div className="max-w-3xl space-y-6">
                                <div className="rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-6 shadow-xs">
                                    <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                        Bulk Account Checker
                                    </h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                                        Periksa validitas dan status login akun sebelum melakukan stor
                                    </p>

                                    <textarea
                                        rows={8}
                                        value={checkerInput}
                                        onChange={(e) => setCheckerInput(e.target.value)}
                                        placeholder="Masukkan daftar email|password untuk dicek..."
                                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] p-3 font-mono text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                                    />

                                    <div className="flex justify-end mt-3">
                                        <button
                                            onClick={() => alert('Fitur Checker akun siap dijalankan!')}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-medium shadow-xs transition"
                                        >
                                            <SearchCheck className="h-3.5 w-3.5" />
                                            <span>Mulai Pengecekan</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 5. RIWAYAT VIEW */}
                        {activeNav === 'riwayat' && (
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-1.5">
                                    {[
                                        { id: 'all', label: 'Semua Status' },
                                        { id: 'diterima', label: 'Diterima' },
                                        { id: 'pending', label: 'Pending' },
                                        { id: 'ditolak', label: 'Ditolak' },
                                        { id: 'dicek', label: 'Di Cek' },
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setRiwayatFilter(tab.id as any)}
                                            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${riwayatFilter === tab.id
                                                ? 'bg-blue-600 text-white shadow-xs'
                                                : 'bg-white dark:bg-[#111827] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#273449]'
                                                }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="rounded-xl bg-white dark:bg-[#111827] p-10 border border-slate-200 dark:border-[#273449] shadow-xs text-center">
                                    <History className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-2.5" />
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                        Tidak Ada Data Riwayat
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                                        Belum ditemukan transaksi atau pengajuan stor dengan filter{' '}
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                                            {riwayatFilter}
                                        </span>
                                        .
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* 6. RULES VIEW */}
                        {activeNav === 'rules' && (
                            <div className="max-w-3xl rounded-xl bg-white dark:bg-[#111827] p-6 border border-slate-200 dark:border-[#273449] shadow-xs space-y-4">
                                <div>
                                    <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                                        Ketentuan & Rules Stor Akun
                                    </h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Patuhi ketentuan berikut agar akun lolos verifikasi dan reward segera cair
                                    </p>
                                </div>

                                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 pt-2">
                                    <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#1F2937]/50 border border-slate-200/80 dark:border-slate-800">
                                        <strong className="text-slate-900 dark:text-slate-100 block mb-1">
                                            1. Format Wajib Baris Akun
                                        </strong>
                                        Setiap baris wajib mengikuti pola <code className="font-mono text-slate-800 dark:text-slate-200">email|password|recovery_email</code>. Tanpa spasi ekstra di awal atau akhir baris.
                                    </div>
                                    <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#1F2937]/50 border border-slate-200/80 dark:border-slate-800">
                                        <strong className="text-slate-900 dark:text-slate-100 block mb-1">
                                            2. Pengaturan Keamanan (2FA & Nomor HP)
                                        </strong>
                                        Akun tidak boleh mengaktifkan verifikasi 2 langkah (2FA) SMS yang meminta kode OTP telepon saat masuk.
                                    </div>
                                    <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#1F2937]/50 border border-slate-200/80 dark:border-slate-800">
                                        <strong className="text-slate-900 dark:text-slate-100 block mb-1">
                                            3. Service Level Agreement (SLA) Verifikasi
                                        </strong>
                                        Pengecekan akun oleh tim audit diproses maksimal 1x24 jam sejak antrean masuk.
                                    </div>
                                    <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#1F2937]/50 border border-slate-200/80 dark:border-slate-800">
                                        <strong className="text-slate-900 dark:text-slate-100 block mb-1">
                                            4. Pencairan Saldo Otomatis
                                        </strong>
                                        Saldo senilai Rp4.300/akun otomatis ditambahkan ke saldo dompet Anda seketika status berubah menjadi <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Diterima</span>.
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 7. LAPORAN VIEW */}
                        {activeNav === 'laporan' && (
                            <div className="max-w-3xl rounded-xl bg-white dark:bg-[#111827] p-6 border border-slate-200 dark:border-[#273449] shadow-xs space-y-4">
                                <div>
                                    <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                                        Laporan Statistik
                                    </h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Ringkasan performa dan approval rate pengajuan Anda
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#1F2937]/50 border border-slate-200/80 dark:border-slate-800 text-center">
                                        <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                                            Approval Rate
                                        </span>
                                        <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                            0%
                                        </span>
                                    </div>
                                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#1F2937]/50 border border-slate-200/80 dark:border-slate-800 text-center">
                                        <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                                            Total Disubmit
                                        </span>
                                        <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                            0
                                        </span>
                                    </div>
                                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#1F2937]/50 border border-slate-200/80 dark:border-slate-800 text-center">
                                        <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                                            Total Diterima
                                        </span>
                                        <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                            0
                                        </span>
                                    </div>
                                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#1F2937]/50 border border-slate-200/80 dark:border-slate-800 text-center">
                                        <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                                            Total Reward
                                        </span>
                                        <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                            Rp0
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 8. LEADERBOARD VIEW */}
                        {activeNav === 'leaderboard' && (
                            <div className="max-w-3xl rounded-xl bg-white dark:bg-[#111827] p-6 border border-slate-200 dark:border-[#273449] shadow-xs space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                                            Leaderboard Storer
                                        </h2>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Top contributor dengan volume akun valid tertinggi bulan ini
                                        </p>
                                    </div>
                                    <Trophy className="h-5 w-5 text-amber-500" />
                                </div>

                                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs pt-1">
                                    {[
                                        { rank: 1, name: 'S****r99', total: '1.240 Akun', reward: 'Bonus Rp200.000' },
                                        { rank: 2, name: 'M****o21', total: '980 Akun', reward: 'Bonus Rp100.000' },
                                        { rank: 3, name: 'B****z88', total: '750 Akun', reward: 'Bonus Rp50.000' },
                                    ].map((item) => (
                                        <div key={item.rank} className="flex items-center justify-between py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                                    {item.rank}
                                                </span>
                                                <span className="font-medium text-slate-900 dark:text-slate-100">
                                                    {item.name}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-slate-500 dark:text-slate-400">
                                                    {item.total}
                                                </span>
                                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                                    {item.reward}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 9. KOMUNITAS VIEW */}
                        {activeNav === 'komunitas' && (
                            <div className="max-w-3xl space-y-4">
                                <div className="rounded-xl bg-white dark:bg-[#111827] p-6 border border-slate-200 dark:border-[#273449] shadow-xs">
                                    <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                        Komunitas Triple9
                                    </h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                                        Bergabung dengan jaringan storer aktif untuk update kuota, tips, dan diskusi
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <a
                                            href="https://whatsapp.com"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-3 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1F2937]/50 hover:border-slate-300 dark:hover:border-slate-700 transition"
                                        >
                                            <MessageCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                            <div>
                                                <strong className="text-xs text-slate-900 dark:text-slate-100 block">
                                                    Grup WhatsApp
                                                </strong>
                                                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                                    Diskusi storer dan kuota harian
                                                </span>
                                            </div>
                                        </a>

                                        <a
                                            href="https://telegram.org"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-3 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1F2937]/50 hover:border-slate-300 dark:hover:border-slate-700 transition"
                                        >
                                            <Send className="h-5 w-5 text-blue-500 dark:text-blue-400 shrink-0" />
                                            <div>
                                                <strong className="text-xs text-slate-900 dark:text-slate-100 block">
                                                    Saluran Telegram
                                                </strong>
                                                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                                    Broadcast pengumuman sistem
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 10. REFERRAL VIEW */}
                        {activeNav === 'referral' && (
                            <div className="max-w-3xl space-y-4">
                                <div className="rounded-xl bg-white dark:bg-[#111827] p-6 border border-slate-200 dark:border-[#273449] shadow-xs">
                                    <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                        Program Referral Triple9
                                    </h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                                        Dapatkan komisi bonus Rp100 untuk setiap akun yang disetujui dari rekan yang Anda ajak
                                    </p>

                                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#1F2937]/50 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
                                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                                            Tautan Referral Anda
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                readOnly
                                                value="https://triple9.com/register?ref=TRIPLE9USER"
                                                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111827] px-3 py-2 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none"
                                            />
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText('https://triple9.com/register?ref=TRIPLE9USER');
                                                    setReferralCopied(true);
                                                    setTimeout(() => setReferralCopied(false), 2000);
                                                }}
                                                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 text-xs font-medium shrink-0 transition"
                                            >
                                                {referralCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                                                <span>{referralCopied ? 'Tersalin' : 'Salin'}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 11. SUPPORT VIEW */}
                        {activeNav === 'support' && (
                            <div className="max-w-3xl space-y-4">
                                <div className="rounded-xl bg-white dark:bg-[#111827] p-6 border border-slate-200 dark:border-[#273449] shadow-xs">
                                    <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                        Layanan Bantuan Pelanggan
                                    </h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                                        Butuh bantuan terkait akun, stor, atau pencairan saldo? Hubungi tim support resmi Triple9
                                    </p>

                                    <div className="space-y-2.5">
                                        <a
                                            href="https://whatsapp.com"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1F2937]/50 hover:border-slate-300 dark:hover:border-slate-700 transition group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                                                    <MessageCircle className="h-4.5 w-4.5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                                                        WhatsApp Customer Care
                                                    </h3>
                                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                                        08:00 - 22:00 WIB • Respon cepat
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                                Hubungi &rarr;
                                            </span>
                                        </a>

                                        <a
                                            href="https://telegram.org"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1F2937]/50 hover:border-slate-300 dark:hover:border-slate-700 transition group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                                                    <Send className="h-4.5 w-4.5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                                                        Telegram Official Support
                                                    </h3>
                                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                                        Direct message konsultasi
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                                Hubungi &rarr;
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
