import { useState, useEffect } from 'react';
import {
    Clock,
    ChevronLeft,
    ChevronRight,
    Eye,
    EyeOff,
} from 'lucide-react';
import type { StorRecord, RiwayatFilter, AnnouncementItem } from '../types';

const TrophyIcon = () => (
    <img src="/images/icon/trophy.png" alt="Event Reward" className="h-4 w-4 object-contain shrink-0" />
);

const AnnouncementIcon = () => (
    <img src="/images/icon/announcement.png" alt="Pengumuman Storan" className="h-4 w-4 object-contain shrink-0" />
);

const NotesIcon = () => (
    <img src="/images/icon/notes.png" alt="Rules & Ketentuan" className="h-4 w-4 object-contain shrink-0" />
);

const WhatIcon = () => (
    <img src="/images/icon/what.png" alt="Panduan Triple9" className="h-4 w-4 object-contain shrink-0" />
);

interface DashboardViewProps {
    currentBalance: number;
    isSaldoVisible: boolean;
    onToggleSaldo: () => void;
    storHistory: StorRecord[];
    onNavigate: (navId: string) => void;
    onNavigateToRiwayat: (filter: RiwayatFilter) => void;
    onOpenWithdrawModal: () => void;
    onOpenIntroModal?: () => void;
}

export function DashboardView({
    currentBalance,
    isSaldoVisible,
    onToggleSaldo,
    storHistory,
    onNavigate,
    onNavigateToRiwayat,
    onOpenWithdrawModal,
    onOpenIntroModal,
}: DashboardViewProps) {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isSlidePaused, setIsSlidePaused] = useState(false);

    const announcements: AnnouncementItem[] = [
        {
            badge: 'Pengumuman Storan',
            badgeColor: 'text-emerald-600 dark:text-emerald-400',
            icon: AnnouncementIcon,
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
            icon: TrophyIcon,
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
            icon: NotesIcon,
            title: 'Pastikan Format Akun Sesuai Ketentuan',
            description: 'Wajib email utama, recovery email, password terformat dan 2FA aktif agar setoran lolos audit.',
            actionText: 'Buka Rules',
            onAction: () => {
                onNavigate('rules');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
        },
        {
            badge: 'Panduan Triple9',
            badgeColor: 'text-blue-600 dark:text-blue-400',
            icon: WhatIcon,
            title: 'Apa itu Triple9 & Cara Kerjanya?',
            description: 'Pelajari pengenalan platform, alur penyetoran Gmail, audit akun, hingga pencairan reward.',
            actionText: 'Buka Pengenalan',
            onAction: () => {
                if (onOpenIntroModal) {
                    onOpenIntroModal();
                } else {
                    onNavigate('rules');
                }
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
        <div className="space-y-4 sm:space-y-5">
            {/* 1. EVENT REWARD / ANNOUNCEMENT BANNER CAROUSEL */}
            <div
                onMouseEnter={() => setIsSlidePaused(true)}
                onMouseLeave={() => setIsSlidePaused(false)}
                className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between relative overflow-hidden group transition-colors"
            >
                {/* Top row: Badge, Counter, Prev/Next controls */}
                <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                            <ActiveIcon className="h-3.5 w-3.5 text-neutral-700 dark:text-neutral-300" />
                            <span>{announcements[activeSlideIndex].badge}</span>
                        </span>
                        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium font-tabular-nums">
                            {activeSlideIndex + 1}/{announcements.length}
                        </span>
                    </div>

                    {/* Prev / Next Buttons */}
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={() => setActiveSlideIndex((prev) => (prev - 1 + announcements.length) % announcements.length)}
                            className="h-7 w-7 rounded-md flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
                            title="Sebelumnya"
                            aria-label="Pengumuman sebelumnya"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveSlideIndex((prev) => (prev + 1) % announcements.length)}
                            className="h-7 w-7 rounded-md flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
                            title="Selanjutnya"
                            aria-label="Pengumuman selanjutnya"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Middle row: Content */}
                <div key={activeSlideIndex} className="py-1 animate-in fade-in duration-300">
                    <div className="space-y-1">
                        <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100">
                            {announcements[activeSlideIndex].title}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
                            {announcements[activeSlideIndex].description}
                        </p>
                    </div>
                </div>

                {/* Bottom row: Dot Indicators */}
                <div className="flex items-center justify-end gap-1.5 pt-2">
                    {announcements.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveSlideIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                idx === activeSlideIndex
                                    ? 'w-5 bg-neutral-900 dark:bg-neutral-100'
                                    : 'w-1.5 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300'
                            }`}
                            aria-label={`Ke slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* 2. SALDO TERSEDIA CARD */}
            <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-xs transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.5">
                        <div>
                            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                Saldo Tersedia
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 font-tabular-nums">
                                {isSaldoVisible ? `Rp${currentBalance.toLocaleString('id-ID')}` : 'Rp ••••••'}
                            </span>
                            <button
                                type="button"
                                onClick={onToggleSaldo}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
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

                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
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
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-xs font-medium shadow-xs transition cursor-pointer"
                        >
                            <img src="/images/icon/wallet.png" alt="Wallet" className="h-4 w-4 object-contain shrink-0" />
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
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 px-4 py-2.5 text-xs font-medium transition cursor-pointer"
                        >
                            <img src="/images/icon/history.png" alt="Riwayat" className="h-4 w-4 object-contain shrink-0" />
                            <span>Riwayat Penarikan</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. RINGKASAN VERIFIKASI STOR (4 Columns, subtle icons, clean typography) */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        Ringkasan Verifikasi Stor
                    </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                    {/* 1. DITERIMA */}
                    <div
                        onClick={() => onNavigateToRiwayat('diterima')}
                        className="group flex flex-col justify-between rounded-xl bg-white dark:bg-neutral-900 p-4.5 sm:p-5 border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                Diterima
                            </span>
                            <img src="/images/icon/checklist.png" alt="Diterima" className="h-7 w-7 sm:h-8 sm:w-8 object-contain shrink-0" />
                        </div>
                        <div className="flex items-baseline justify-between mt-1">
                            <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 font-tabular-nums">
                                {diterimaCount}
                            </span>
                        </div>
                    </div>

                    {/* 2. PENDING */}
                    <div
                        onClick={() => onNavigateToRiwayat('pending')}
                        className="group flex flex-col justify-between rounded-xl bg-white dark:bg-neutral-900 p-4.5 sm:p-5 border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                Pending
                            </span>
                            <img src="/images/icon/pending.png" alt="Pending" className="h-7 w-7 sm:h-8 sm:w-8 object-contain shrink-0" />
                        </div>
                        <div className="flex items-baseline justify-between mt-1">
                            <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 font-tabular-nums">
                                {pendingCount}
                            </span>
                        </div>
                    </div>

                    {/* 3. DITOLAK */}
                    <div
                        onClick={() => onNavigateToRiwayat('ditolak')}
                        className="group flex flex-col justify-between rounded-xl bg-white dark:bg-neutral-900 p-4.5 sm:p-5 border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                Ditolak
                            </span>
                            <img src="/images/icon/reject.png" alt="Ditolak" className="h-7 w-7 sm:h-8 sm:w-8 object-contain shrink-0" />
                        </div>
                        <div className="flex items-baseline justify-between mt-1">
                            <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 font-tabular-nums">
                                {ditolakCount}
                            </span>
                        </div>
                    </div>

                    {/* 4. DI CEK */}
                    <div
                        onClick={() => onNavigateToRiwayat('dicek')}
                        className="group flex flex-col justify-between rounded-xl bg-white dark:bg-neutral-900 p-4.5 sm:p-5 border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                Di Cek
                            </span>
                            <img src="/images/icon/find.png" alt="Di Cek" className="h-7 w-7 sm:h-8 sm:w-8 object-contain shrink-0" />
                        </div>
                        <div className="flex items-baseline justify-between mt-1">
                            <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 font-tabular-nums">
                                {dicekCount}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. AKTIVITAS STOR TERAKHIR */}
            <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs overflow-hidden transition-colors">
                <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200/80 dark:border-neutral-800">
                    <div>
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
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
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 mb-3">
                            <img src="/images/icon/pending.png" alt="Pending" className="h-6 w-6 object-contain" />
                        </div>
                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                            Belum Ada Aktivitas Stor
                        </h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mb-4 leading-relaxed">
                            Setiap pengajuan stor akun akan dicatat di sini secara transparan beserta status verifikasi dan reward saldo Anda.
                        </p>
                        <button
                            type="button"
                            onClick={() => onNavigate('stor')}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 text-xs font-medium shadow-xs transition cursor-pointer"
                        >
                            <span>Mulai Stor Akun Sekarang</span>
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-neutral-50/70 dark:bg-neutral-800/40 border-b border-neutral-200/80 dark:border-neutral-800 text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                <tr>
                                    <th className="px-5 py-3">Gmail</th>
                                    <th className="px-5 py-3">Jalur</th>
                                    <th className="px-5 py-3">Tanggal</th>
                                    <th className="px-5 py-3 text-center">Status</th>
                                    <th className="px-5 py-3 text-right">Reward</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-700 dark:text-neutral-200">
                                {storHistory.slice(0, 5).map((item) => (
                                    <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition">
                                        <td className="px-5 py-3 font-medium text-neutral-900 dark:text-neutral-100">{item.email}</td>
                                        <td className="px-5 py-3 text-[11px] text-neutral-500 dark:text-neutral-400">PW: {item.room}</td>
                                        <td className="px-5 py-3 text-neutral-500 dark:text-neutral-400">{item.date}</td>
                                        <td className="px-5 py-3 text-center align-middle">
                                            {item.status === 'pending' ? (
                                                <div className="flex items-center justify-center" title="Pending">
                                                    <Clock className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                                                </div>
                                            ) : (
                                                <span className={`inline-block text-[11px] font-semibold uppercase ${
                                                    item.status === 'diterima'
                                                        ? 'text-emerald-600 dark:text-emerald-400'
                                                        : item.status === 'ditolak'
                                                            ? 'text-rose-600 dark:text-rose-400'
                                                            : 'text-amber-600 dark:text-amber-400'
                                                }`}>
                                                    {item.status === 'dicek' ? 'Di Cek' : item.status}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3 text-right font-semibold text-neutral-900 dark:text-neutral-100 font-tabular-nums">
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

