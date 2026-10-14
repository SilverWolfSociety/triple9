import { useState, useEffect } from 'react';
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
    ChevronLeft,
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
    Sparkles,
    KeyRound,
    BookOpen,
    ArrowLeft,
    Search,
    Trash2,
    Save,
    Ticket,
    TicketPlus,
    Megaphone,
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
            { id: 'checker', label: 'Email Cecker', icon: SearchCheck },
        ],
    },
    {
        title: 'Transaksi & Audit',
        items: [
            { id: 'riwayat', label: 'Riwayat Stor', icon: History },
            { id: 'rules', label: 'Ketentuan & Rules', icon: FileText },
            { id: 'laporan', label: 'Laporan Saya', icon: Ticket },
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
    const [searchGmailQuery, setSearchGmailQuery] = useState('');
    const [jalurFilter, setJalurFilter] = useState<'all' | 'zero1122' | 'hehe1122'>('all');
    const [isJalurDropdownOpen, setIsJalurDropdownOpen] = useState(false);
    const [dayFilter, setDayFilter] = useState<'all' | 'today' | '7days' | '30days'>('all');
    const [storHistory, setStorHistory] = useState<Array<{
        id: string;
        email: string;
        room: 'zero1122' | 'hehe1122';
        status: 'pending' | 'dicek' | 'diterima' | 'ditolak';
        date: string;
        reward: number;
    }>>([]);

    // Laporan / Tiket Dukungan States
    const [tickets, setTickets] = useState<Array<{
        id: string;
        title: string;
        category: string;
        message: string;
        date: string;
        status: 'menunggu' | 'diproses' | 'selesai';
    }>>([]);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
    const [ticketTitleInput, setTicketTitleInput] = useState('');
    const [ticketCategoryInput, setTicketCategoryInput] = useState('Kendala Stor Akun');
    const [ticketDescInput, setTicketDescInput] = useState('');
    const [storInput, setStorInput] = useState('');
    const [checkerInput, setCheckerInput] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [isSalinDropdownOpen, setIsSalinDropdownOpen] = useState(false);
    const [checkerResults, setCheckerResults] = useState<{ email: string; status: 'valid' | 'invalid' }[] | null>(null);
    const [referralCopied, setReferralCopied] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawMethod, setWithdrawMethod] = useState('DANA');
    const [withdrawAccount, setWithdrawAccount] = useState('');
    const [isSaldoVisible, setIsSaldoVisible] = useState(true);

    // Saldo & Penarikan (E-Wallet & Withdrawal) States
    const [currentBalance, setCurrentBalance] = useState(20000);
    const [selectedEwallet, setSelectedEwallet] = useState<'DANA' | 'OVO' | 'GoPay' | 'ShopeePay'>('DANA');
    const [savedEwalletNumbers, setSavedEwalletNumbers] = useState<Record<string, string>>({
        DANA: '',
        OVO: '',
        GoPay: '',
        ShopeePay: '',
    });
    const [ewalletInput, setEwalletInput] = useState('');
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isSavedSuccess, setIsSavedSuccess] = useState(false);

    // Slideshow Pengumuman Dashboard States
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isSlidePaused, setIsSlidePaused] = useState(false);

    const announcements = [
        {
            badge: 'Pengumuman Storan',
            badgeColor: 'text-emerald-600 dark:text-emerald-400',
            icon: Clock,
            title: 'Storan OPEN setiap Senin–Jumat',
            description: 'Jam operasional: 07.00–17.00 WIB. Sabtu & Minggu storan CLOSE.',
            actionText: 'Stor Akun',
            onAction: () => {
                setActiveNav('stor');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
        },
        {
            badge: 'Event Reward',
            badgeColor: 'text-amber-600 dark:text-amber-400',
            icon: Trophy,
            title: 'Bonus Reward Leaderboard Top 10',
            description: 'Tingkatkan setoran akun Anda dan raih hadiah saldo ekstra mingguan untuk 10 member teratas.',
            actionText: 'Lihat Peringkat',
            onAction: () => {
                setActiveNav('leaderboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
        },
        {
            badge: 'Rules & Ketentuan',
            badgeColor: 'text-purple-600 dark:text-purple-400',
            icon: Megaphone,
            title: 'Pastikan Format Akun Sesuai Ketentuan',
            description: 'Wajib email utama, recovery email, password terformat dan 2FA aktif agar setoran lolos audit.',
            actionText: 'Buka Rules',
            onAction: () => {
                setActiveNav('rules');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
        },
    ];

    useEffect(() => {
        if (isSlidePaused) return;
        const interval = setInterval(() => {
            setActiveSlideIndex((prev) => (prev + 1) % announcements.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isSlidePaused, announcements.length]);
    const [withdrawHistory, setWithdrawHistory] = useState<Array<{
        date: string;
        method: string;
        account: string;
        amount: number;
        status: string;
    }>>([]);
    const [transactionHistory, setTransactionHistory] = useState<Array<{
        date: string;
        desc: string;
        amount: number;
        balance: number;
    }>>([]);

    // Stor Akun (Gmail) Workflow States
    const [selectedRoom, setSelectedRoom] = useState<'zero1122' | 'hehe1122'>('zero1122');
    const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
    const [generateCount, setGenerateCount] = useState(5);
    const [generatedGmails, setGeneratedGmails] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [copiedAll, setCopiedAll] = useState(false);

    const handleGenerateGmail = (count: number) => {
        setIsGenerating(true);
        setTimeout(() => {
            const prefixes = ['zerogtg', 'account', 'validmail', 'alphastore', 'usergtg', 'speedgtg', 'turbomail', 'primeacc'];
            const results: string[] = [];
            for (let i = 0; i < count; i++) {
                const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
                const randNum = Math.floor(100 + Math.random() * 900);
                results.push(`${prefix}${randNum}@gmail.com`);
            }
            setGeneratedGmails(results);
            setIsGenerating(false);
            setIsGenerateModalOpen(true);
        }, 300);
    };

    const copyToClipboard = (text: string, index?: number) => {
        navigator.clipboard.writeText(text);
        if (index !== undefined) {
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 1500);
        } else {
            setCopiedAll(true);
            setTimeout(() => setCopiedAll(false), 1500);
        }
    };

    const insertGeneratedToForm = () => {
        if (generatedGmails.length === 0) return;
        const currentTrimmed = storInput.trim();
        const newContent = currentTrimmed
            ? `${currentTrimmed}\n${generatedGmails.join('\n')}`
            : generatedGmails.join('\n');
        setStorInput(newContent);
        setIsGenerateModalOpen(false);
    };

    // Calculate unique lines & auto duplicate removal
    const rawLines = storInput
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
    const uniqueLines = Array.from(new Set(rawLines));
    const uniqueLinesCount = uniqueLines.length;

    const activeItemLabel = allNavItems.find((n) => n.id === activeNav)?.label || 'Dashboard';

    // Filter stor history by search, status, jalur (room), and day
    const filteredStorHistory = storHistory.filter((item) => {
        if (searchGmailQuery.trim()) {
            if (!item.email.toLowerCase().includes(searchGmailQuery.trim().toLowerCase())) {
                return false;
            }
        }
        if (riwayatFilter !== 'all' && item.status !== riwayatFilter) {
            return false;
        }
        if (jalurFilter !== 'all' && item.room !== jalurFilter) {
            return false;
        }
        if (dayFilter === 'today') {
            const todayStr = new Date().toISOString().split('T')[0];
            if (item.date !== todayStr) return false;
        } else if (dayFilter === '7days') {
            const cutoff = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
            if (item.date < cutoff) return false;
        } else if (dayFilter === '30days') {
            const cutoff = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0];
            if (item.date < cutoff) return false;
        }
        return true;
    });

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
                                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#111827]" />
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
                                {/* SECTION 0: SLIDESHOW PENGUMUMAN (Diatas Card Saldo) */}
                                <div
                                    onMouseEnter={() => setIsSlidePaused(true)}
                                    onMouseLeave={() => setIsSlidePaused(false)}
                                    className="rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-4 sm:p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group"
                                >
                                    {/* Top row: Badge, Counter, Prev/Next controls */}
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider ${announcements[activeSlideIndex].badgeColor}`}>
                                                {(() => {
                                                    const IconComponent = announcements[activeSlideIndex].icon;
                                                    return <IconComponent className="h-3.5 w-3.5" />;
                                                })()}
                                                <span>{announcements[activeSlideIndex].badge}</span>
                                            </span>
                                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium font-tabular-nums">
                                                {activeSlideIndex + 1}/{announcements.length}
                                            </span>
                                        </div>

                                        {/* Prev / Next Buttons */}
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => setActiveSlideIndex((prev) => (prev - 1 + announcements.length) % announcements.length)}
                                                className="h-6 w-6 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                                                title="Sebelumnya"
                                                aria-label="Pengumuman sebelumnya"
                                            >
                                                <ChevronLeft className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setActiveSlideIndex((prev) => (prev + 1) % announcements.length)}
                                                className="h-6 w-6 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                                                title="Selanjutnya"
                                                aria-label="Pengumuman selanjutnya"
                                            >
                                                <ChevronRight className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Middle row: Content and CTA button */}
                                    <div key={activeSlideIndex} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-1 animate-in fade-in duration-300">
                                        <div className="space-y-0.5">
                                            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                                                {announcements[activeSlideIndex].title}
                                            </h3>
                                            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                                {announcements[activeSlideIndex].description}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={announcements[activeSlideIndex].onAction}
                                            className="inline-flex items-center gap-1.5 self-start sm:self-center shrink-0 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition cursor-pointer"
                                        >
                                            <span>{announcements[activeSlideIndex].actionText}</span>
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </button>
                                    </div>

                                    {/* Bottom row: Dot Indicators */}
                                    <div className="flex items-center justify-end gap-1.5 pt-2">
                                        {announcements.map((_, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setActiveSlideIndex(idx)}
                                                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === activeSlideIndex
                                                    ? 'w-5 bg-blue-600 dark:bg-blue-400'
                                                    : 'w-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'
                                                    }`}
                                                aria-label={`Ke slide ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* SECTION 1: BALANCE CARD (Full Width Di Bawah Pengumuman) */}
                                <div className="rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-6 shadow-xs">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-1.5">
                                            <div>
                                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                                    Saldo Tersedia
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 font-tabular-nums">
                                                    {isSaldoVisible ? `Rp${currentBalance.toLocaleString('id-ID')}` : 'Rp ••••••'}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsSaldoVisible(!isSaldoVisible)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
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
                                                type="button"
                                                onClick={() => {
                                                    setActiveNav('saldo');
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    setTimeout(() => {
                                                        document.getElementById('card-saldo-penarikan')?.scrollIntoView({ behavior: 'smooth' });
                                                        setIsWithdrawModalOpen(true);
                                                    }, 150);
                                                }}
                                                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-medium shadow-xs transition cursor-pointer"
                                            >
                                                <Wallet className="h-3.5 w-3.5" />
                                                <span>Tarik Saldo</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setActiveNav('saldo');
                                                    setTimeout(() => {
                                                        document.getElementById('riwayat-transaksi-table')?.scrollIntoView({ behavior: 'smooth' });
                                                    }, 100);
                                                }}
                                                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white dark:bg-[#1F2937] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-medium transition cursor-pointer"
                                            >
                                                <History className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                                                <span>Riwayat Penarikan</span>
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
                            <div className="w-full space-y-4">
                                {/* Banner Rules: Cek Rules dulu sebelum stor */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-[#273449] bg-white dark:bg-[#111827] px-4 py-3 shadow-2xs">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                                        <div>
                                            <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                                                Cek Rules dulu sebelum stor
                                            </h4>
                                            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                                                Wajib dibaca agar Gmail tidak ditolak.
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setActiveNav('rules')}
                                        className="self-start sm:self-auto inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition cursor-pointer"
                                    >
                                        Buka Rules
                                    </button>
                                </div>

                                {/* Main Card: Formulir Setor Gmail */}
                                <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-5 sm:p-7 lg:p-8 shadow-xs space-y-5">
                                    {/* Header Section */}
                                    <div>
                                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                                            Setor Daftar Gmail
                                        </h2>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                            Tempel daftar, satu Gmail per baris. Duplikat otomatis dihapus. Hanya Gmail hasil &ldquo;Generate Gmail&rdquo; milik akun ini yang bisa disetor.
                                        </p>
                                    </div>

                                    {/* Alert 1: Password Wajib */}
                                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#1F2937]/50 p-4 text-xs space-y-1.5">
                                        <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                                            <KeyRound className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                                            <span>Password wajib untuk Gmail yang disetor:</span>
                                        </div>
                                        <div className="pl-6 space-y-1">
                                            <p className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm tracking-wide">
                                                zero1122 <span className="text-xs font-normal text-slate-500 dark:text-slate-400 font-sans">ATAU</span> hehe1122
                                            </p>
                                            <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                                Pilih Salah satu password &amp; setorkan sesuai Room
                                            </p>
                                            <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                                Pastikan setiap Gmail menggunakan password di atas. Gmail dengan password berbeda akan ditolak.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Section 2: Generate Gmail Guide & Action */}
                                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#1F2937]/50 p-4 sm:p-5 space-y-3">
                                        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-sm">
                                            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            <span>Generate Gmail</span>
                                        </div>
                                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                            Ambil nama Gmail dari stok yang sudah disiapkan admin, lalu daftarkan akun Gmail asli memakai nama tersebut sebelum disetorkan pada kolom storan di bagian bawah halaman.
                                        </p>

                                        <ol className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-decimal list-inside pl-0.5">
                                            <li>
                                                Tekan tombol <strong className="text-slate-900 dark:text-slate-100">Generate Gmail</strong> dan pilih jumlah yang Anda butuhkan.
                                            </li>
                                            <li>Salin nama Gmail satu per satu, atau salin semuanya sekaligus.</li>
                                            <li>Daftarkan akun Gmail dengan nama tersebut dan password wajib di atas.</li>
                                            <li>Tempel Gmail yang sudah jadi ke kolom storan di bawah, lalu kirim.</li>
                                        </ol>

                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                                            Password wajib: <code className="font-mono font-semibold text-slate-800 dark:text-slate-200">zero1122</code> ATAU <code className="font-mono font-semibold text-slate-800 dark:text-slate-200">hehe1122</code> Pilih Salah satu password &amp; setorkan sesuai Room
                                        </p>

                                        <div className="pt-1">
                                            <button
                                                type="button"
                                                onClick={() => handleGenerateGmail(generateCount)}
                                                disabled={isGenerating}
                                                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-2.5 px-4 text-xs sm:text-sm font-semibold shadow-xs transition cursor-pointer disabled:opacity-60"
                                            >
                                                <Sparkles className="h-4 w-4" />
                                                <span>{isGenerating ? 'Menyiapkan Stok Akun Gmail...' : 'Generate'}</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Section 3: Room Selection Cards */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                        {/* Room 1 */}
                                        <div
                                            onClick={() => setSelectedRoom('zero1122')}
                                            className={`rounded-xl border p-4 cursor-pointer transition flex items-start gap-3.5 bg-white dark:bg-[#111827] ${selectedRoom === 'zero1122'
                                                ? 'border-blue-600 dark:border-blue-500 ring-1 ring-blue-600 dark:ring-blue-500 shadow-xs'
                                                : 'border-slate-200 dark:border-[#273449] hover:border-slate-300 dark:hover:border-slate-700'
                                                }`}
                                        >
                                            <Send className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                                                        PW: zero1122
                                                    </h4>
                                                    {selectedRoom === 'zero1122' && (
                                                        <span className="h-2 w-2 shrink-0 aspect-square rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                                                    )}
                                                </div>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                                    Untuk Gmail dengan status Good
                                                </p>
                                                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 mt-1.5">
                                                    Harga: Rp4.300
                                                </div>
                                            </div>
                                        </div>

                                        {/* Room 2 */}
                                        <div
                                            onClick={() => setSelectedRoom('hehe1122')}
                                            className={`rounded-xl border p-4 cursor-pointer transition flex items-start gap-3.5 bg-white dark:bg-[#111827] ${selectedRoom === 'hehe1122'
                                                ? 'border-blue-600 dark:border-blue-500 ring-1 ring-blue-600 dark:ring-blue-500 shadow-xs'
                                                : 'border-slate-200 dark:border-[#273449] hover:border-slate-300 dark:hover:border-slate-700'
                                                }`}
                                        >
                                            <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                                                        PW: hehe1122
                                                    </h4>
                                                    {selectedRoom === 'hehe1122' && (
                                                        <span className="h-2 w-2 shrink-0 aspect-square rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                                                    )}
                                                </div>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                                    Untuk Gmail dengan status Good
                                                </p>
                                                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 mt-1.5">
                                                    Harga: Rp4.300
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 4: Textarea Input */}
                                    <div>
                                        <textarea
                                            rows={11}
                                            value={storInput}
                                            onChange={(e) => setStorInput(e.target.value)}
                                            placeholder={`zerogtg1@gmail.com\nzerogtg2@gmail.com`}
                                            className="w-full min-h-[240px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] p-4 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 focus:outline-none transition leading-relaxed shadow-2xs"
                                        />
                                    </div>

                                    {/* Section 5: Footer Actions & Summary */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                                        <div className="space-y-0.5 text-xs text-slate-500 dark:text-slate-400">
                                            <div>
                                                Terdeteksi:{' '}
                                                <span className="font-semibold text-slate-900 dark:text-slate-100 font-tabular-nums">
                                                    {uniqueLinesCount} baris
                                                </span>
                                            </div>
                                            <div className="text-[11px]">
                                                PW:{' '}
                                                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                                                    {selectedRoom}
                                                </span>{' '}
                                                |{' '}
                                                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                                    Rp4.300 jika di ACC
                                                </span>
                                            </div>
                                            <div className="text-[11px] text-slate-400 dark:text-slate-500">
                                                Estimasi pengecekan 24-48 jam.
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (uniqueLinesCount > 0) {
                                                    const lines = storInput
                                                        .split('\n')
                                                        .map((l) => l.trim())
                                                        .filter((l) => l.length > 0);
                                                    const uniqueEmails = Array.from(new Set(lines));
                                                    const todayStr = new Date().toISOString().split('T')[0];
                                                    const newRecords = uniqueEmails.map((email, idx) => ({
                                                        id: `stor-${Date.now()}-${idx}`,
                                                        email,
                                                        room: selectedRoom,
                                                        status: 'pending' as const,
                                                        date: todayStr,
                                                        reward: 4300,
                                                    }));
                                                    setStorHistory((prev) => [...newRecords, ...prev]);
                                                    setStorInput('');
                                                    alert(
                                                        `Berhasil mengirim ${uniqueLinesCount} akun Gmail untuk Room PW: ${selectedRoom}!\nStatus pengecekan dapat dipantau di menu Riwayat.`
                                                    );
                                                } else {
                                                    alert('Silakan masukkan daftar Gmail terlebih dahulu.');
                                                }
                                            }}
                                            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white px-4 py-2 text-xs font-semibold shadow-xs transition cursor-pointer self-start sm:self-auto"
                                        >
                                            <Send className="h-3.5 w-3.5" />
                                            <span>Kirim Setoran</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Modal Popup: Generate Gmail */}
                                {isGenerateModalOpen && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
                                        <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-6 shadow-xl space-y-4">
                                            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                                                <div className="flex items-center gap-2.5">
                                                    <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                                                    <div>
                                                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                                            Stok Nama Gmail
                                                        </h3>
                                                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                                            Hasil generate resmi untuk akun Anda
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsGenerateModalOpen(false)}
                                                    className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>

                                            {/* Quantity selector */}
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-slate-500 dark:text-slate-400 font-medium">
                                                    Jumlah Generate:
                                                </span>
                                                <div className="flex items-center gap-1.5">
                                                    {[5, 10, 20, 50].map((num) => (
                                                        <button
                                                            key={num}
                                                            type="button"
                                                            onClick={() => {
                                                                setGenerateCount(num);
                                                                handleGenerateGmail(num);
                                                            }}
                                                            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${generateCount === num
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                                                }`}
                                                        >
                                                            {num}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* List of generated Gmails */}
                                            <div className="max-h-60 overflow-y-auto space-y-1.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-[#1F2937]/40 p-3 font-mono text-xs">
                                                {generatedGmails.map((email, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-700/60"
                                                    >
                                                        <span className="text-slate-800 dark:text-slate-200 select-all">
                                                            {email}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => copyToClipboard(email, idx)}
                                                            className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-sans font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition"
                                                        >
                                                            {copiedIndex === idx ? (
                                                                <>
                                                                    <Check className="h-3 w-3 text-emerald-600" />
                                                                    <span className="text-emerald-600">Disalin</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Copy className="h-3 w-3" />
                                                                    <span>Salin</span>
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => copyToClipboard(generatedGmails.join('\n'))}
                                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                                                >
                                                    {copiedAll ? (
                                                        <>
                                                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                                                            <span className="text-emerald-600">Semua Disalin!</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="h-3.5 w-3.5" />
                                                            <span>Salin Semua ({generatedGmails.length})</span>
                                                        </>
                                                    )}
                                                </button>

                                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                                    <button
                                                        type="button"
                                                        onClick={insertGeneratedToForm}
                                                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition"
                                                    >
                                                        <span>Tempel ke Kolom Storan</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 3. SALDO VIEW */}
                        {activeNav === 'saldo' && (
                            <div className="w-full space-y-5">
                                {/* Card 1: Saldo Tersedia (Sama persis seperti Dashboard) */}
                                <div id="card-saldo-penarikan" className="rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-6 shadow-xs">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-1.5">
                                            <div>
                                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                                    Saldo Tersedia
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 font-tabular-nums">
                                                    {isSaldoVisible ? `Rp${currentBalance.toLocaleString('id-ID')}` : 'Rp ••••••'}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsSaldoVisible(!isSaldoVisible)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
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
                                                type="button"
                                                onClick={() => setIsWithdrawModalOpen(true)}
                                                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-medium shadow-xs transition cursor-pointer"
                                            >
                                                <Wallet className="h-3.5 w-3.5" />
                                                <span>Tarik Saldo</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                {/* Card 3: Nomor E-Wallet Tersimpan */}
                                <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-5 sm:p-6 shadow-xs space-y-4">
                                    <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
                                        <span className="flex h-6.5 w-11 items-center justify-center rounded-lg bg-white p-1 shrink-0 border border-slate-200 dark:border-slate-700 shadow-2xs">
                                            <img
                                                src={`/images/${selectedEwallet.toLowerCase()}.png`}
                                                alt={selectedEwallet}
                                                className="h-full w-full object-contain"
                                            />
                                        </span>
                                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                                            Nomor {selectedEwallet} Tersimpan
                                        </h3>
                                    </div>

                                    {/* E-wallet selector tabs */}
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        {([
                                            { id: 'DANA', logo: '/images/dana.png' },
                                            { id: 'OVO', logo: '/images/ovo.png' },
                                            { id: 'GoPay', logo: '/images/gopay.png' },
                                            { id: 'ShopeePay', logo: '/images/shopeepay.png' },
                                        ] as const).map((wallet) => (
                                            <button
                                                key={wallet.id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedEwallet(wallet.id);
                                                    setEwalletInput(savedEwalletNumbers[wallet.id] || '');
                                                }}
                                                className={`inline-flex items-center justify-center p-2 rounded-xl transition cursor-pointer border ${selectedEwallet === wallet.id
                                                    ? 'bg-blue-600 border-blue-600 shadow-xs'
                                                    : 'bg-white dark:bg-[#1F2937] border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }`}
                                            >
                                                <span className="flex h-7 w-14 items-center justify-center rounded-lg bg-white p-1 shrink-0 shadow-2xs">
                                                    <img
                                                        src={wallet.logo}
                                                        alt={wallet.id}
                                                        className="h-full w-full object-contain"
                                                    />
                                                </span>
                                            </button>
                                        ))}
                                    </div>

                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Simpan nomor {selectedEwallet} Anda agar tidak perlu mengetik ulang setiap penarikan. Hanya angka, 10-15 digit.
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                                        <input
                                            type="text"
                                            value={ewalletInput}
                                            onChange={(e) => setEwalletInput(e.target.value.replace(/\D/g, ''))}
                                            placeholder="081234567890"
                                            maxLength={15}
                                            className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] px-4 py-2.5 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 focus:outline-none transition shadow-2xs"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (ewalletInput.length >= 10) {
                                                    setSavedEwalletNumbers((prev) => ({
                                                        ...prev,
                                                        [selectedEwallet]: ewalletInput,
                                                    }));
                                                    setIsSavedSuccess(true);
                                                    setTimeout(() => setIsSavedSuccess(false), 2000);
                                                } else {
                                                    alert('Nomor e-wallet harus terdiri dari 10-15 digit angka.');
                                                }
                                            }}
                                            title={isSavedSuccess ? 'Tersimpan!' : 'Simpan'}
                                            aria-label="Simpan"
                                            className="inline-flex items-center justify-center p-2.5 sm:px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white shadow-xs transition cursor-pointer shrink-0"
                                        >
                                            {isSavedSuccess ? (
                                                <Check className="h-4 w-4" />
                                            ) : (
                                                <Save className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Card 4: Tabel Riwayat Penarikan */}
                                <div id="riwayat-transaksi-table" className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-5 sm:p-6 shadow-xs space-y-3">
                                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                                        Riwayat Penarikan
                                    </h3>
                                    <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
                                        <table className="w-full text-left text-xs">
                                            <thead className="bg-slate-50 dark:bg-[#1F2937]/50 border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                <tr>
                                                    <th className="px-4 py-3">Tanggal</th>
                                                    <th className="px-4 py-3">Keterangan</th>
                                                    <th className="px-4 py-3">Nominal</th>
                                                    <th className="px-4 py-3">Saldo</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                                                {transactionHistory.length === 0 ? (
                                                    <tr>
                                                        <td
                                                            colSpan={4}
                                                            className="py-8 text-center font-sans text-xs text-slate-400 dark:text-slate-500"
                                                        >
                                                            Belum ada transaksi.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    transactionHistory.map((item, idx) => (
                                                        <tr
                                                            key={idx}
                                                            className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                                                        >
                                                            <td className="px-4 py-3 font-sans text-slate-600 dark:text-slate-300">
                                                                {item.date}
                                                            </td>
                                                            <td className="px-4 py-3 font-sans text-slate-800 dark:text-slate-200">
                                                                {item.desc}
                                                            </td>
                                                            <td className={`px-4 py-3 font-semibold font-tabular-nums ${item.amount < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                                                {item.amount < 0 ? `-Rp${Math.abs(item.amount).toLocaleString('id-ID')}` : `+Rp${item.amount.toLocaleString('id-ID')}`}
                                                            </td>
                                                            <td className="px-4 py-3 font-tabular-nums text-slate-900 dark:text-slate-100">
                                                                Rp{item.balance.toLocaleString('id-ID')}
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Modal Popup: Tarik Saldo */}
                                {isWithdrawModalOpen && (
                                    <div
                                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
                                        onClick={(e) => {
                                            if (e.target === e.currentTarget) setIsWithdrawModalOpen(false);
                                        }}
                                    >
                                        <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-6 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
                                            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                                                <div className="flex items-center gap-2.5">
                                                    <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                                                    <div>
                                                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                                            Tarik Saldo
                                                        </h3>
                                                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                                            Pencairan saldo ke e-wallet Anda
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsWithdrawModalOpen(false)}
                                                    className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="space-y-3.5 text-xs">
                                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1F2937]/50 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                                    <span className="text-slate-500 dark:text-slate-400">Saldo Tersedia:</span>
                                                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm font-tabular-nums">
                                                        Rp{currentBalance.toLocaleString('id-ID')}
                                                    </span>
                                                </div>

                                                <div>
                                                    <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                        <span>Tujuan Penarikan</span>
                                                        <span className="inline-flex items-center gap-1.5 font-semibold text-slate-900 dark:text-slate-100">
                                                            <span className="flex h-4.5 w-7 items-center justify-center rounded bg-white p-0.5 shrink-0 border border-slate-200 dark:border-slate-700 shadow-2xs">
                                                                <img
                                                                    src={`/images/${selectedEwallet.toLowerCase()}.png`}
                                                                    alt={selectedEwallet}
                                                                    className="h-full w-full object-contain"
                                                                />
                                                            </span>
                                                            <span>({selectedEwallet})</span>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={savedEwalletNumbers[selectedEwallet] || ewalletInput}
                                                        onChange={(e) => setEwalletInput(e.target.value.replace(/\D/g, ''))}
                                                        placeholder="Masukkan nomor e-wallet tujuan"
                                                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] p-2.5 font-mono text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 focus:outline-none transition"
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
                                                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] p-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 focus:outline-none transition"
                                                    />
                                                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                                                        Minimal penarikan adalah Rp10.000.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsWithdrawModalOpen(false)}
                                                    className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const numAmount = Number(withdrawAmount);
                                                        const targetAccount = savedEwalletNumbers[selectedEwallet] || ewalletInput;
                                                        if (!targetAccount || targetAccount.length < 10) {
                                                            alert('Silakan masukkan nomor e-wallet yang valid.');
                                                            return;
                                                        }
                                                        if (!numAmount || numAmount < 10000) {
                                                            alert('Minimal penarikan adalah Rp10.000.');
                                                            return;
                                                        }
                                                        if (numAmount > currentBalance) {
                                                            alert('Saldo Anda belum mencukupi untuk melakukan penarikan ini.');
                                                            return;
                                                        }
                                                        // Deduct balance and record history
                                                        setCurrentBalance((prev) => prev - numAmount);
                                                        const newEntry = {
                                                            date: new Date().toISOString().split('T')[0],
                                                            method: selectedEwallet,
                                                            account: targetAccount,
                                                            amount: numAmount,
                                                            status: 'Diproses',
                                                        };
                                                        setWithdrawHistory((prev) => [newEntry, ...prev]);
                                                        setTransactionHistory((prev) => [
                                                            {
                                                                date: new Date().toISOString().split('T')[0],
                                                                desc: `Tarik Saldo ke ${selectedEwallet} (${targetAccount})`,
                                                                amount: -numAmount,
                                                                balance: currentBalance - numAmount,
                                                            },
                                                            ...prev,
                                                        ]);
                                                        setIsWithdrawModalOpen(false);
                                                        setWithdrawAmount('');
                                                        alert('Pengajuan penarikan berhasil dikirim!');
                                                    }}
                                                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition"
                                                >
                                                    Konfirmasi Penarikan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 4. CHECKER VIEW */}
                        {activeNav === 'checker' && (
                            <div className="w-full space-y-4">
                                <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-5 sm:p-7 lg:p-8 shadow-xs space-y-5">
                                    <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center gap-2">
                                            <SearchCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                                            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                                                Email Checker
                                            </h2>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            Periksa status Gmail hasil Generate milik Anda sebelum disetor.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            Daftar Email
                                        </label>

                                        <textarea
                                            rows={11}
                                            value={checkerInput}
                                            onChange={(e) => {
                                                setCheckerInput(e.target.value);
                                                if (checkerResults) setCheckerResults(null);
                                            }}
                                            placeholder="Masukkan daftar email di sini..."
                                            className="w-full min-h-[260px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] p-4 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 focus:outline-none transition leading-relaxed shadow-2xs"
                                        />

                                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                            {checkerInput.split('\n').filter((l) => l.trim().length > 0).length} email terdeteksi • 1 per baris • maks 100 per cek. Hanya email hasil Generate Gmail milik Anda yang diproses.
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 pt-1">
                                        {/* Mulai Checker Button */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const lines = checkerInput
                                                    .split('\n')
                                                    .map((l) => l.trim())
                                                    .filter((l) => l.length > 0);

                                                if (lines.length === 0) {
                                                    alert('Silakan masukkan daftar email terlebih dahulu.');
                                                    return;
                                                }

                                                if (lines.length > 100) {
                                                    alert('Maksimal 100 email per kali pengecekan.');
                                                    return;
                                                }

                                                setIsChecking(true);
                                                setTimeout(() => {
                                                    setIsChecking(false);
                                                    const results = lines.map((email) => ({
                                                        email,
                                                        status: email.includes('@') && email.endsWith('@gmail.com') && email.length > 10 ? ('valid' as const) : ('invalid' as const),
                                                    }));
                                                    setCheckerResults(results);
                                                }, 700);
                                            }}
                                            disabled={isChecking}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white px-4 py-2 text-xs font-semibold shadow-xs transition cursor-pointer disabled:opacity-60"
                                        >
                                            <Search className="h-3.5 w-3.5" />
                                            <span>{isChecking ? 'Memeriksa...' : 'Mulai Checker'}</span>
                                        </button>

                                        {/* Salin Dropdown Button */}
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setIsSalinDropdownOpen(!isSalinDropdownOpen)}
                                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-3.5 py-2 text-xs font-medium transition cursor-pointer shadow-2xs"
                                            >
                                                <Copy className="h-3.5 w-3.5" />
                                                <ChevronDown className="h-3 w-3 text-slate-400" />
                                            </button>
                                            {isSalinDropdownOpen && (
                                                <div className="absolute left-0 mt-1.5 w-40 rounded-xl bg-white dark:bg-[#1F2937] border border-slate-200 dark:border-slate-700 p-1 shadow-lg z-20 text-xs">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (checkerInput.trim()) {
                                                                navigator.clipboard.writeText(checkerInput);
                                                                alert('Daftar email berhasil disalin!');
                                                            } else {
                                                                alert('Tidak ada email untuk disalin.');
                                                            }
                                                            setIsSalinDropdownOpen(false);
                                                        }}
                                                        className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
                                                    >
                                                        Salin Semua
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const validLines = checkerInput
                                                                .split('\n')
                                                                .map((l) => l.trim())
                                                                .filter((l) => l.endsWith('@gmail.com'));
                                                            if (validLines.length > 0) {
                                                                navigator.clipboard.writeText(validLines.join('\n'));
                                                                alert(`${validLines.length} Gmail disalin!`);
                                                            } else {
                                                                alert('Tidak ada Gmail valid untuk disalin.');
                                                            }
                                                            setIsSalinDropdownOpen(false);
                                                        }}
                                                        className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
                                                    >
                                                        Salin Valid Saja
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Hapus Button */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCheckerInput('');
                                                setCheckerResults(null);
                                            }}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 dark:hover:bg-rose-950/30 text-slate-700 dark:text-slate-300 px-3.5 py-2 text-xs font-medium transition cursor-pointer shadow-2xs"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>

                                    {/* Checker Results Table if checked */}
                                    {checkerResults && (
                                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                                                    Hasil Pengecekan ({checkerResults.length} akun)
                                                </h4>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <span className="text-emerald-600 font-semibold">
                                                        {checkerResults.filter((r) => r.status === 'valid').length} Valid
                                                    </span>
                                                    <span className="text-slate-300">•</span>
                                                    <span className="text-rose-600 font-semibold">
                                                        {checkerResults.filter((r) => r.status === 'invalid').length} Tidak Valid
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="max-h-60 overflow-y-auto space-y-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1F2937]/40 p-2 font-mono text-xs">
                                                {checkerResults.map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-700"
                                                    >
                                                        <span className="text-slate-800 dark:text-slate-200 truncate mr-2">
                                                            {item.email}
                                                        </span>
                                                        <span
                                                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${item.status === 'valid'
                                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                                                                : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                                                                }`}
                                                        >
                                                            {item.status === 'valid' ? 'Valid' : 'Gagal'}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 5. RIWAYAT VIEW */}
                        {activeNav === 'riwayat' && (
                            <div className="w-full space-y-4">
                                <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-5 sm:p-7 shadow-xs space-y-4">
                                    {/* 1. Search Bar */}
                                    <div className="relative">
                                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <input
                                            type="text"
                                            value={searchGmailQuery}
                                            onChange={(e) => setSearchGmailQuery(e.target.value)}
                                            placeholder="Cari Gmail..."
                                            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 focus:outline-none transition shadow-2xs"
                                        />
                                    </div>

                                    {/* 2. Filter Controls: Status Pills, Dropdown Jalur, Day Pills */}
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
                                        {/* Status Group */}
                                        <div className="flex flex-wrap items-center gap-1.5">
                                            {[
                                                { id: 'all', label: 'Semua' },
                                                { id: 'pending', label: `Pending (${storHistory.filter((s) => s.status === 'pending').length})` },
                                                { id: 'dicek', label: `Di Cek (${storHistory.filter((s) => s.status === 'dicek').length})` },
                                                { id: 'diterima', label: `Diterima (${storHistory.filter((s) => s.status === 'diterima').length})` },
                                                { id: 'ditolak', label: `Ditolak (${storHistory.filter((s) => s.status === 'ditolak').length})` },
                                            ].map((tab) => (
                                                <button
                                                    key={tab.id}
                                                    type="button"
                                                    onClick={() => setRiwayatFilter(tab.id as any)}
                                                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer ${riwayatFilter === tab.id
                                                        ? 'bg-blue-600 text-white shadow-xs'
                                                        : 'bg-white dark:bg-[#1F2937] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                                                        }`}
                                                >
                                                    {tab.label}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            {/* Dropdown Jalur (PW: zero1122 / PW: hehe1122) */}
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsJalurDropdownOpen(!isJalurDropdownOpen)}
                                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] hover:bg-slate-50 dark:hover:bg-slate-800 px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 transition cursor-pointer shadow-2xs"
                                                >
                                                    <span>
                                                        {jalurFilter === 'all'
                                                            ? 'Semua Jalur'
                                                            : jalurFilter === 'zero1122'
                                                                ? 'PW: zero1122'
                                                                : 'PW: hehe1122'}
                                                    </span>
                                                    <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                                                </button>

                                                {isJalurDropdownOpen && (
                                                    <div className="absolute left-0 sm:right-0 sm:left-auto mt-1.5 w-44 rounded-xl bg-white dark:bg-[#1F2937] border border-slate-200 dark:border-slate-700 p-1 shadow-lg z-20 text-xs">
                                                        {[
                                                            { id: 'all', label: 'Semua Jalur' },
                                                            { id: 'zero1122', label: 'PW: zero1122' },
                                                            { id: 'hehe1122', label: 'PW: hehe1122' },
                                                        ].map((item) => (
                                                            <button
                                                                key={item.id}
                                                                type="button"
                                                                onClick={() => {
                                                                    setJalurFilter(item.id as any);
                                                                    setIsJalurDropdownOpen(false);
                                                                }}
                                                                className={`w-full text-left px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${jalurFilter === item.id
                                                                    ? 'bg-blue-600 text-white'
                                                                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                                    }`}
                                                            >
                                                                {item.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Day Filter Pills */}
                                            <div className="flex items-center gap-1">
                                                {[
                                                    { id: 'all', label: 'Semua' },
                                                    { id: 'today', label: 'Hari Ini' },
                                                    { id: '7days', label: '7 Hari' },
                                                    { id: '30days', label: '30 Hari' },
                                                ].map((d) => (
                                                    <button
                                                        key={d.id}
                                                        type="button"
                                                        onClick={() => setDayFilter(d.id as any)}
                                                        className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition cursor-pointer ${dayFilter === d.id
                                                            ? 'bg-blue-600 text-white shadow-xs'
                                                            : 'bg-white dark:bg-[#1F2937] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                                                            }`}
                                                    >
                                                        {d.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Setoran Content Table / Empty State */}
                                    {filteredStorHistory.length === 0 ? (
                                        <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 py-16 px-4 text-center">
                                            <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500">
                                                Belum ada setoran.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                                            <table className="w-full text-left text-xs">
                                                <thead className="bg-slate-50 dark:bg-[#1F2937]/50 border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                    <tr>
                                                        <th className="px-4 py-3">Gmail</th>
                                                        <th className="px-4 py-3">Jalur</th>
                                                        <th className="px-4 py-3">Tanggal</th>
                                                        <th className="px-4 py-3">Status</th>
                                                        <th className="px-4 py-3 text-right">Reward</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                                                    {filteredStorHistory.map((item) => (
                                                        <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                            <td className="px-4 py-3 font-mono font-medium">{item.email}</td>
                                                            <td className="px-4 py-3">
                                                                <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                                                    PW: {item.room}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3 text-slate-500">{item.date}</td>
                                                            <td className="px-4 py-3">
                                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${item.status === 'diterima'
                                                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                                                                    : item.status === 'ditolak'
                                                                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
                                                                        : item.status === 'dicek'
                                                                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                                                                            : 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                                                                    }`}>
                                                                    {item.status === 'dicek' ? 'Di Cek' : item.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-slate-100">
                                                                Rp{item.reward.toLocaleString('id-ID')}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 6. RULES VIEW */}
                        {activeNav === 'rules' && (
                            <div className="w-full space-y-4">
                                {/* Banner Warning */}
                                <div className="flex items-center gap-3 rounded-xl border border-rose-200 dark:border-rose-900/40 px-4 py-3 text-xs sm:text-sm text-rose-600 dark:text-rose-400">
                                    <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
                                    <span>
                                        Baca aturan berikut sebelum menyetor Gmail. Melanggar rules dapat menyebabkan Gmail ditolak atau akun diblokir.
                                    </span>
                                </div>

                                {/* Main Rules Card */}
                                <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-5 sm:p-7 lg:p-8 shadow-xs space-y-6">
                                    <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                                            Rules Storan Gmail
                                        </h2>
                                    </div>

                                    {/* 7 Rules List */}
                                    <ol className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs">
                                                1
                                            </span>
                                            <div className="pt-0.5">
                                                <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                                                    Gmail harus Fresh (baru dibuat).
                                                </strong>
                                            </div>
                                        </li>

                                        <li className="flex items-start gap-3">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs">
                                                2
                                            </span>
                                            <div className="pt-0.5">
                                                <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                                                    Nama Gmail yang didaftarkan wajib sama persis dengan nama Gmail hasil Generate di website.
                                                </strong>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                    Tidak boleh mengubah, menambah, atau mengurangi karakter apa pun.
                                                </p>
                                            </div>
                                        </li>

                                        <li className="flex items-start gap-3">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs">
                                                3
                                            </span>
                                            <div className="pt-0.5">
                                                <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                                                    Tanggal lahir akun Gmail wajib 18 tahun ke atas.
                                                </strong>
                                            </div>
                                        </li>

                                        <li className="flex items-start gap-3">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs">
                                                4
                                            </span>
                                            <div className="pt-0.5">
                                                <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                                                    Password Gmail wajib menggunakan: <code className="font-mono font-semibold text-slate-900 dark:text-slate-100">zero1122</code> ATAU <code className="font-mono font-semibold text-slate-900 dark:text-slate-100">hehe1122</code>
                                                </strong>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                    (Pilih salah satu pasword)
                                                </p>
                                            </div>
                                        </li>

                                        <li className="flex items-start gap-3">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs">
                                                5
                                            </span>
                                            <div className="pt-0.5">
                                                <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                                                    Akun tidak boleh ditautkan dengan nomor pemulihan maupun Gmail pemulihan.
                                                </strong>
                                            </div>
                                        </li>

                                        <li className="flex items-start gap-3">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs">
                                                6
                                            </span>
                                            <div className="pt-0.5">
                                                <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                                                    Sebelum melakukan storan, cek status Gmail di{' '}
                                                    <a
                                                        href="https://en.gmailcheck.com/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 transition"
                                                    >
                                                        https://en.gmailcheck.com/
                                                    </a>
                                                </strong>
                                            </div>
                                        </li>

                                        <li className="flex items-start gap-3">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs">
                                                7
                                            </span>
                                            <div className="pt-0.5">
                                                <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                                                    Hanya kirim Gmail dengan status Live/Aktif.
                                                </strong>
                                            </div>
                                        </li>
                                    </ol>

                                    {/* Catatan Box */}
                                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#1F2937]/50 p-4 sm:p-5 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                        <h4 className="font-bold text-slate-900 dark:text-slate-100">
                                            Catatan:
                                        </h4>
                                        <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm">
                                            <li>
                                                Status di checkgmail.online hanya digunakan untuk memastikan Gmail masih aktif, bukan penentu diterima atau ditolaknya Gmail saat pengecekan admin.
                                            </li>
                                            <li>
                                                Gmail yang tidak sesuai rules atau berbeda dengan hasil Generate di website akan ditolak dan akun dapat diblokir oleh admin.
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setActiveNav('stor')}
                                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-3 px-4 text-xs sm:text-sm font-semibold shadow-xs transition cursor-pointer"
                                        >
                                            <span>Saya sudah paham, lanjut setor</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 7. LAPORAN / TIKET VIEW */}
                        {activeNav === 'laporan' && (
                            <div className="w-full space-y-4">
                                {/* Top Header Bar */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-5 shadow-xs">
                                    <div className="flex items-center gap-3">
                                        <Ticket className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0" />
                                        <div>
                                            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                                                Laporan Saya
                                            </h2>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                Riwayat tiket dukungan
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setIsCreateTicketModalOpen(true)}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white px-4 py-2.5 text-xs sm:text-sm font-semibold shadow-xs transition cursor-pointer self-start sm:self-auto"
                                    >
                                        <TicketPlus className="h-4 w-4" />
                                        <span>Buat Laporan</span>
                                    </button>
                                </div>

                                {/* Two Column Layout (Tickets List & Details) */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                                    {/* Left Column: Tiket Saya List */}
                                    <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-4 sm:p-5 shadow-xs flex flex-col min-h-[460px]">
                                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 tracking-wider">
                                                TIKET SAYA
                                            </span>
                                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                {tickets.length}
                                            </span>
                                        </div>

                                        {tickets.length === 0 ? (
                                            <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
                                                <p className="text-xs text-slate-400 dark:text-slate-500">
                                                    Belum ada laporan.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-2 pt-3 overflow-y-auto max-h-[500px]">
                                                {tickets.map((t) => (
                                                    <div
                                                        key={t.id}
                                                        onClick={() => setSelectedTicketId(t.id)}
                                                        className={`p-3.5 rounded-xl border transition cursor-pointer text-xs ${selectedTicketId === t.id
                                                            ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 dark:border-blue-500 shadow-2xs'
                                                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] hover:bg-slate-50 dark:hover:bg-slate-800'
                                                            }`}
                                                    >
                                                        <div className="flex items-center justify-between mb-1.5">
                                                            <span className="font-bold text-slate-900 dark:text-slate-100 truncate mr-2">
                                                                {t.title}
                                                            </span>
                                                            <span className="text-[10px] text-slate-400 shrink-0">
                                                                {t.date}
                                                            </span>
                                                        </div>
                                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
                                                            {t.message}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                                                                {t.category}
                                                            </span>
                                                            <span title={t.status === 'selesai' ? 'Selesai' : t.status === 'diproses' ? 'Diproses' : 'Menunggu'}>
                                                                {t.status === 'selesai' ? (
                                                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                                                ) : (
                                                                    <Clock className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Column: Ticket Details / Empty Placeholder */}
                                    <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-5 sm:p-6 shadow-xs flex flex-col min-h-[460px]">
                                        {!selectedTicketId || !tickets.find((t) => t.id === selectedTicketId) ? (
                                            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                                                <Ticket className="h-12 w-12 text-slate-300 dark:text-slate-600 stroke-[1.5]" />
                                                <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500">
                                                    Pilih tiket di sebelah kiri atau buat laporan baru.
                                                </p>
                                            </div>
                                        ) : (
                                            (() => {
                                                const ticket = tickets.find((t) => t.id === selectedTicketId)!;
                                                return (
                                                    <div className="flex-1 flex flex-col space-y-5">
                                                        {/* Ticket Header */}
                                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                                                            <div>
                                                                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                                                                    {ticket.title}
                                                                </h3>
                                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                                    {ticket.category} • Dibuat pada {ticket.date}
                                                                </p>
                                                            </div>
                                                            <div
                                                                title={
                                                                    ticket.status === 'selesai'
                                                                        ? 'Selesai'
                                                                        : ticket.status === 'diproses'
                                                                            ? 'Sedang Diproses'
                                                                            : 'Menunggu Respon'
                                                                }
                                                                className="self-start sm:self-auto flex items-center"
                                                            >
                                                                {ticket.status === 'selesai' ? (
                                                                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                                                ) : (
                                                                    <Clock className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Detail Laporan Biasa (Non-Chat) */}
                                                        <div className="space-y-4 flex-1">
                                                            <div>
                                                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                                                    Isi Laporan / Kendala
                                                                </label>
                                                                <div className="rounded-xl bg-slate-50 dark:bg-[#1F2937]/50 border border-slate-200/80 dark:border-slate-800 p-4 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                                                                    {ticket.message}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                                                    Status Penanganan
                                                                </label>
                                                                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1F2937]/30 p-4 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                                                                    <div>
                                                                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                                                                            {ticket.status === 'selesai'
                                                                                ? 'Laporan Telah Ditangani'
                                                                                : ticket.status === 'diproses'
                                                                                    ? 'Laporan Sedang Diproses'
                                                                                    : 'Menunggu Antrean Tim Support'}
                                                                        </span>
                                                                    </div>
                                                                    <p className="leading-relaxed">
                                                                        {ticket.status === 'selesai'
                                                                            ? 'Kendala yang Anda sampaikan telah diselesaikan oleh tim teknis kami.'
                                                                            : ticket.status === 'diproses'
                                                                                ? 'Laporan Anda sedang dalam proses penanganan oleh admin/tim audit. Hasil akan segera diperbarui.'
                                                                                : 'Laporan Anda telah berhasil dicatat ke dalam sistem dan akan ditinjau oleh tim support dalam waktu maksimal 1x24 jam.'}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                                                                <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-[#1F2937]/30 border border-slate-100 dark:border-slate-800">
                                                                    <span className="text-[11px] text-slate-400 block mb-0.5">Pelapor</span>
                                                                    <span className="text-xs font-medium text-slate-900 dark:text-slate-100">{user?.name || 'User Triple9'}</span>
                                                                </div>
                                                                <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-[#1F2937]/30 border border-slate-100 dark:border-slate-800">
                                                                    <span className="text-[11px] text-slate-400 block mb-0.5">ID Laporan</span>
                                                                    <span className="text-xs font-mono font-medium text-slate-900 dark:text-slate-100">#{ticket.id}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })()
                                        )}
                                    </div>
                                </div>

                                {/* Modal Buat Laporan */}
                                {isCreateTicketModalOpen && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
                                        <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#273449] p-6 shadow-xl space-y-4">
                                            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                                                <div className="flex items-center gap-2.5">
                                                    <Ticket className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                                                    <div>
                                                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                                            Buat Laporan Baru
                                                        </h3>
                                                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                                            Sampaikan kendala atau pertanyaan Anda kepada tim support
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsCreateTicketModalOpen(false)}
                                                    className="rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="space-y-3 text-xs">
                                                <div>
                                                    <label className="block font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                                        Judul Laporan
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={ticketTitleInput}
                                                        onChange={(e) => setTicketTitleInput(e.target.value)}
                                                        placeholder="Contoh: Akun storan belum terupdate"
                                                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] p-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                                        Kategori Kendala
                                                    </label>
                                                    <select
                                                        value={ticketCategoryInput}
                                                        onChange={(e) => setTicketCategoryInput(e.target.value)}
                                                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition"
                                                    >
                                                        <option value="Kendala Stor Akun">Kendala Stor Akun</option>
                                                        <option value="Kendala Tarik Saldo">Kendala Tarik Saldo</option>
                                                        <option value="Akun & Verifikasi">Akun & Verifikasi</option>
                                                        <option value="Kendala Teknis Website">Kendala Teknis Website</option>
                                                        <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                                        Deskripsi Kendala
                                                    </label>
                                                    <textarea
                                                        rows={4}
                                                        value={ticketDescInput}
                                                        onChange={(e) => setTicketDescInput(e.target.value)}
                                                        placeholder="Jelaskan detail kendala Anda secara lengkap..."
                                                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1F2937] p-3 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition leading-relaxed"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsCreateTicketModalOpen(false)}
                                                    className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (!ticketTitleInput.trim() || !ticketDescInput.trim()) {
                                                            alert('Silakan isi judul dan deskripsi kendala.');
                                                            return;
                                                        }
                                                        const newTicket = {
                                                            id: `ticket-${Date.now()}`,
                                                            title: ticketTitleInput.trim(),
                                                            category: ticketCategoryInput,
                                                            message: ticketDescInput.trim(),
                                                            date: new Date().toISOString().split('T')[0],
                                                            status: 'menunggu' as const,
                                                        };
                                                        setTickets((prev) => [newTicket, ...prev]);
                                                        setSelectedTicketId(newTicket.id);
                                                        setTicketTitleInput('');
                                                        setTicketDescInput('');
                                                        setIsCreateTicketModalOpen(false);
                                                        alert('Laporan berhasil dikirim ke tim support!');
                                                    }}
                                                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition"
                                                >
                                                    Kirim Laporan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
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
