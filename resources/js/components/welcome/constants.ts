import {
    LayoutDashboard,
    Mail,
    Wallet,
    SearchCheck,
    History,
    FileText,
    Ticket,
    Trophy,
    Users,
    Gift,
    Headphones,
} from 'lucide-react';
import type {
    NavGroupConfig,
    LeaderboardItem,
    LeaderboardPeriod,
    EwalletType,
} from './types';

export const navGroups: NavGroupConfig[] = [
    {
        title: 'Menu Utama',
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'stor', label: 'Setor Akun', icon: Mail },
            { id: 'saldo', label: 'Saldo & Penarikan', icon: Wallet },
            { id: 'checker', label: 'Email Checker', icon: SearchCheck },
        ],
    },
    {
        title: 'Transaksi & Audit',
        items: [
            { id: 'riwayat', label: 'Riwayat Setor', icon: History },
            { id: 'rules', label: 'Ketentuan & Rules', icon: FileText },
            { id: 'laporan', label: 'Laporan Saya', icon: Ticket },
        ],
    },
    {
        title: 'Ekosistem & Bantuan',
        items: [
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { id: 'komunitas', label: 'Komunitas', icon: Users },
            { id: 'referral', label: 'Referral', icon: Gift },
            { id: 'support', label: 'Triple9 Support', icon: Headphones },
        ],
    },
];

export const allNavItems = navGroups.flatMap((g) => g.items);

export const leaderboardData: Record<LeaderboardPeriod, LeaderboardItem[]> = {
    all: [
        { rank: 1, name: 'Enriko Ganz', initials: 'EG', avatarBg: 'from-amber-500 to-yellow-600', gmails: 1549, earnings: 6970500 },
        { rank: 2, name: 'popipu papepo', initials: 'PP', avatarBg: 'from-slate-400 to-slate-600', gmails: 1469, earnings: 6610500 },
        { rank: 3, name: 'Ricanwardana', initials: 'RW', avatarBg: 'from-amber-700 to-amber-900', gmails: 1467, earnings: 6601500 },
        { rank: 4, name: 'diskominfo berau', initials: 'DB', avatarBg: 'from-blue-500 to-indigo-600', gmails: 1256, earnings: 5652000 },
        { rank: 5, name: 'Neng ceca', initials: 'NC', avatarBg: 'from-rose-500 to-pink-600', gmails: 1138, earnings: 5121000 },
        { rank: 6, name: 'Geoffrey Hunter', initials: 'GH', avatarBg: 'from-cyan-500 to-blue-600', gmails: 1076, earnings: 4842000 },
        { rank: 7, name: 'Risfina', initials: 'RF', avatarBg: 'from-violet-500 to-purple-600', gmails: 1071, earnings: 4819500 },
        { rank: 8, name: 'Dimas Aditya', initials: 'DA', avatarBg: 'from-emerald-500 to-teal-600', gmails: 942, earnings: 4239000 },
        { rank: 9, name: 'Kurniawan99', initials: 'K9', avatarBg: 'from-amber-600 to-orange-600', gmails: 890, earnings: 4005000 },
        { rank: 10, name: 'Bayu Pratama', initials: 'BP', avatarBg: 'from-indigo-500 to-purple-600', gmails: 815, earnings: 3667500 },
    ],
    '30days': [
        { rank: 1, name: 'Enriko Ganz', initials: 'EG', avatarBg: 'from-amber-500 to-yellow-600', gmails: 620, earnings: 2790000 },
        { rank: 2, name: 'popipu papepo', initials: 'PP', avatarBg: 'from-slate-400 to-slate-600', gmails: 584, earnings: 2628000 },
        { rank: 3, name: 'Ricanwardana', initials: 'RW', avatarBg: 'from-amber-700 to-amber-900', gmails: 540, earnings: 2430000 },
        { rank: 4, name: 'Geoffrey Hunter', initials: 'GH', avatarBg: 'from-cyan-500 to-blue-600', gmails: 490, earnings: 2205000 },
        { rank: 5, name: 'diskominfo berau', initials: 'DB', avatarBg: 'from-blue-500 to-indigo-600', gmails: 462, earnings: 2079000 },
        { rank: 6, name: 'Risfina', initials: 'RF', avatarBg: 'from-violet-500 to-purple-600', gmails: 410, earnings: 1845000 },
        { rank: 7, name: 'Neng ceca', initials: 'NC', avatarBg: 'from-rose-500 to-pink-600', gmails: 395, earnings: 1777500 },
        { rank: 8, name: 'Dimas Aditya', initials: 'DA', avatarBg: 'from-emerald-500 to-teal-600', gmails: 340, earnings: 1530000 },
        { rank: 9, name: 'Kurniawan99', initials: 'K9', avatarBg: 'from-amber-600 to-orange-600', gmails: 315, earnings: 1417500 },
        { rank: 10, name: 'Bayu Pratama', initials: 'BP', avatarBg: 'from-indigo-500 to-purple-600', gmails: 280, earnings: 1260000 },
    ],
    '7days': [
        { rank: 1, name: 'popipu papepo', initials: 'PP', avatarBg: 'from-amber-500 to-yellow-600', gmails: 198, earnings: 891000 },
        { rank: 2, name: 'Enriko Ganz', initials: 'EG', avatarBg: 'from-slate-400 to-slate-600', gmails: 185, earnings: 832500 },
        { rank: 3, name: 'Ricanwardana', initials: 'RW', avatarBg: 'from-amber-700 to-amber-900', gmails: 164, earnings: 738000 },
        { rank: 4, name: 'Risfina', initials: 'RF', avatarBg: 'from-violet-500 to-purple-600', gmails: 142, earnings: 639000 },
        { rank: 5, name: 'diskominfo berau', initials: 'DB', avatarBg: 'from-blue-500 to-indigo-600', gmails: 130, earnings: 585000 },
        { rank: 6, name: 'Geoffrey Hunter', initials: 'GH', avatarBg: 'from-cyan-500 to-blue-600', gmails: 121, earnings: 544500 },
        { rank: 7, name: 'Neng ceca', initials: 'NC', avatarBg: 'from-rose-500 to-pink-600', gmails: 115, earnings: 517500 },
        { rank: 8, name: 'Dimas Aditya', initials: 'DA', avatarBg: 'from-emerald-500 to-teal-600', gmails: 98, earnings: 441000 },
        { rank: 9, name: 'Kurniawan99', initials: 'K9', avatarBg: 'from-amber-600 to-orange-600', gmails: 88, earnings: 396000 },
        { rank: 10, name: 'Bayu Pratama', initials: 'BP', avatarBg: 'from-indigo-500 to-purple-600', gmails: 74, earnings: 333000 },
    ],
    today: [
        { rank: 1, name: 'Ricanwardana', initials: 'RW', avatarBg: 'from-amber-500 to-yellow-600', gmails: 45, earnings: 202500 },
        { rank: 2, name: 'Enriko Ganz', initials: 'EG', avatarBg: 'from-slate-400 to-slate-600', gmails: 38, earnings: 171000 },
        { rank: 3, name: 'popipu papepo', initials: 'PP', avatarBg: 'from-amber-700 to-amber-900', gmails: 32, earnings: 144000 },
        { rank: 4, name: 'Geoffrey Hunter', initials: 'GH', avatarBg: 'from-cyan-500 to-blue-600', gmails: 26, earnings: 117000 },
        { rank: 5, name: 'diskominfo berau', initials: 'DB', avatarBg: 'from-blue-500 to-indigo-600', gmails: 22, earnings: 99000 },
        { rank: 6, name: 'Risfina', initials: 'RF', avatarBg: 'from-violet-500 to-purple-600', gmails: 19, earnings: 85500 },
        { rank: 7, name: 'Neng ceca', initials: 'NC', avatarBg: 'from-rose-500 to-pink-600', gmails: 15, earnings: 67500 },
        { rank: 8, name: 'Dimas Aditya', initials: 'DA', avatarBg: 'from-emerald-500 to-teal-600', gmails: 12, earnings: 54000 },
        { rank: 9, name: 'Kurniawan99', initials: 'K9', avatarBg: 'from-amber-600 to-orange-600', gmails: 10, earnings: 45000 },
        { rank: 10, name: 'Bayu Pratama', initials: 'BP', avatarBg: 'from-indigo-500 to-purple-600', gmails: 8, earnings: 36000 },
    ],
};

export const ewalletOptions: { id: EwalletType; logo: string }[] = [
    { id: 'DANA', logo: '/images/saldo/dana.png' },
    { id: 'OVO', logo: '/images/saldo/ovo.png' },
    { id: 'GoPay', logo: '/images/saldo/gopay.png' },
    { id: 'ShopeePay', logo: '/images/saldo/shopeepay.png' },
];
