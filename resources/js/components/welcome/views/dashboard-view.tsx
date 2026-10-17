import { useState, useEffect } from 'react';
import {
    Clock,
    Trophy,
    Megaphone,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    Eye,
    EyeOff,
    Wallet,
    History,
    CheckCircle2,
    XCircle,
    ScanSearch,
    Send,
} from 'lucide-react';
import type { StorRecord, RiwayatFilter, AnnouncementItem } from '../types';

interface DashboardViewProps {
    currentBalance: number;
    isSaldoVisible: boolean;
    onToggleSaldo: () => void;
    storHistory: StorRecord[];
    onNavigate: (navId: string) => void;
    onNavigateToRiwayat: (filter: RiwayatFilter) => void;
    onOpenWithdrawModal: () => void;
}

export function DashboardView({
    currentBalance,
    isSaldoVisible,
    onToggleSaldo,
    storHistory,
    onNavigate,
    onNavigateToRiwayat,
    onOpenWithdrawModal,
}: DashboardViewProps) {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isSlidePaused, setIsSlidePaused] = useState(false);

    const announcements: AnnouncementItem[] = [
        {
            badge: 'Pengumuman Storan',
            badgeColor: 'text-emerald-600 dark:text-emerald-400',
            icon: Clock,
            title: 'Storan OPEN setiap Senin–Jumat',
            description: 'Jam operasional: 07.00–17.00 WIB. Sabtu & Minggu storan CLOSE.',
            actionText: 'Stor Akun',
            onAction: () => {
                onNavigate('stor');
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
                onNavigate('leaderboard');
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
                onNavigate('rules');
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

    const diterimaCount = storHistory.filter((s) => s.status === 'diterima').length;
    const pendingCount = storHistory.filter((s) => s.status === 'pending').length;
    const ditolakCount = storHistory.filter((s) => s.status === 'ditolak').length;
    const dicekCount = storHistory.filter((s) => s.status === 'dicek').length;

    const ActiveIcon = announcements[activeSlideIndex].icon;

    return (
        <div className="space-y-6">
            {/* SECTION 0: SLIDESHOW PENGUMUMAN (Diatas Card Saldo) */}
            <div
                onMouseEnter={() => setIsSlidePaused(true)}
                onMouseLeave={() => setIsSlidePaused(false)}
                className="rounded-xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-[#27272a] p-4 sm:p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group"
            >
                {/* Top row: Badge, Counter, Prev/Next controls */}
                <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider ${announcements[activeSlideIndex].badgeColor}`}>
                            <ActiveIcon className="h-3.5 w-3.5" />
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
                            className="h-6 w-6 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                            title="Sebelumnya"
                            aria-label="Pengumuman sebelumnya"
                        >
                            <ChevronLeft className="h-3.5 w-3.5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveSlideIndex((prev) => (prev + 1) % announcements.length)}
                            className="h-6 w-6 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
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
                                    : 'w-1.5 bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300'
                                }`}
                            aria-label={`Ke slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* SECTION 1: BALANCE CARD (Full Width Di Bawah Pengumuman) */}
            <div className="rounded-xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-[#27272a] p-6 shadow-xs">
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
                                onClick={onToggleSaldo}
                                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
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
                                onNavigate('saldo');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                setTimeout(() => {
                                    document.getElementById('card-saldo-penarikan')?.scrollIntoView({ behavior: 'smooth' });
                                    onOpenWithdrawModal();
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
                                onNavigate('saldo');
                                setTimeout(() => {
                                    document.getElementById('riwayat-transaksi-table')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white dark:bg-[#121215] hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-zinc-800 px-4 py-2 text-xs font-medium transition cursor-pointer"
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
                        onClick={() => onNavigateToRiwayat('diterima')}
                        className="group flex flex-col justify-between rounded-xl bg-white dark:bg-[#09090b] p-4.5 border border-slate-200 dark:border-[#27272a] shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                Diterima
                            </span>
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="flex items-baseline justify-between mt-1">
                            <span className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 font-tabular-nums">
                                {diterimaCount}
                            </span>
                            <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                Akun lolos
                            </span>
                        </div>
                    </div>

                    {/* 2. PENDING */}
                    <div
                        onClick={() => onNavigateToRiwayat('pending')}
                        className="group flex flex-col justify-between rounded-xl bg-white dark:bg-[#09090b] p-4.5 border border-slate-200 dark:border-[#27272a] shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                Pending
                            </span>
                            <Clock className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                        </div>
                        <div className="flex items-baseline justify-between mt-1">
                            <span className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 font-tabular-nums">
                                {pendingCount}
                            </span>
                            <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                Dalam antrean
                            </span>
                        </div>
                    </div>

                    {/* 3. DITOLAK */}
                    <div
                        onClick={() => onNavigateToRiwayat('ditolak')}
                        className="group flex flex-col justify-between rounded-xl bg-white dark:bg-[#09090b] p-4.5 border border-slate-200 dark:border-[#27272a] shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                Ditolak
                            </span>
                            <XCircle className="h-4 w-4 text-rose-500 dark:text-rose-400" />
                        </div>
                        <div className="flex items-baseline justify-between mt-1">
                            <span className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 font-tabular-nums">
                                {ditolakCount}
                            </span>
                            <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                Tidak valid
                            </span>
                        </div>
                    </div>

                    {/* 4. DI CEK */}
                    <div
                        onClick={() => onNavigateToRiwayat('dicek')}
                        className="group flex flex-col justify-between rounded-xl bg-white dark:bg-[#09090b] p-4.5 border border-slate-200 dark:border-[#27272a] shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                Di Cek
                            </span>
                            <ScanSearch className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                        </div>
                        <div className="flex items-baseline justify-between mt-1">
                            <span className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 font-tabular-nums">
                                {dicekCount}
                            </span>
                            <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                Proses verifikasi
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 3: REFACTORED RECENT ACTIVITY */}
            <div className="rounded-xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-[#27272a] shadow-xs overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-[#27272a]">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            Aktivitas Stor Terakhir
                        </h3>
                    </div>

                    <button
                        type="button"
                        onClick={() => onNavigate('riwayat')}
                        className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                        <span>Lihat Semua</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                </div>

                {storHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-[#121215] text-slate-400 dark:text-slate-500 mb-3">
                            <History className="h-5 w-5" />
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                            Belum Ada Aktivitas Stor
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-4 leading-relaxed">
                            Setiap pengajuan stor akun akan dicatat di sini secara transparan beserta status verifikasi dan reward saldo Anda.
                        </p>
                        <button
                            type="button"
                            onClick={() => onNavigate('stor')}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 text-xs font-medium shadow-xs transition cursor-pointer"
                        >
                            <Send className="h-3.5 w-3.5" />
                            <span>Mulai Stor Akun Sekarang</span>
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 dark:bg-[#121215]/50 border-b border-slate-200 dark:border-zinc-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                <tr>
                                    <th className="px-5 py-3">Gmail</th>
                                    <th className="px-5 py-3">Jalur</th>
                                    <th className="px-5 py-3">Tanggal</th>
                                    <th className="px-5 py-3 text-center">Status</th>
                                    <th className="px-5 py-3 text-right">Reward</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-200">
                                {storHistory.slice(0, 5).map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/40 transition">
                                        <td className="px-5 py-3 font-medium">{item.email}</td>
                                        <td className="px-5 py-3 text-[11px] text-slate-600 dark:text-slate-400">PW: {item.room}</td>
                                        <td className="px-5 py-3 text-slate-500">{item.date}</td>
                                        <td className="px-5 py-3 text-center align-middle">
                                            {item.status === 'pending' ? (
                                                <div className="flex items-center justify-center" title="Pending">
                                                    <Clock className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                                                </div>
                                            ) : (
                                                <span className={`inline-block text-[11px] font-semibold uppercase ${item.status === 'diterima'
                                                        ? 'text-emerald-600 dark:text-emerald-400'
                                                        : item.status === 'ditolak'
                                                            ? 'text-rose-600 dark:text-rose-400'
                                                            : 'text-amber-600 dark:text-amber-400'
                                                    }`}>
                                                    {item.status === 'dicek' ? 'Di Cek' : item.status}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3 text-right font-semibold text-slate-900 dark:text-slate-100">
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
    );
}
