import { useState, useEffect } from 'react';
import {
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
}: DashboardViewProps) {
    // Start at index 1 to match "🏆 EVENT REWARD 2/4" specified in design prompt
    const [activeSlideIndex, setActiveSlideIndex] = useState(1);
    const [isSlidePaused, setIsSlidePaused] = useState(false);

    const announcements: AnnouncementItem[] = [
        {
            badge: 'Pengumuman Setoran',
            badgeColor: 'text-black',
            icon: AnnouncementIcon,
            title: 'Setoran OPEN Setiap Hari Senin s/d Jumat',
            description: 'Jam operasional verifikasi setor akun: 08:00 - 16:00 WIB.',
        },
        {
            badge: 'Event Reward',
            badgeColor: 'text-black',
            icon: TrophyIcon,
            title: 'Bonus Reward Leaderboard Top 10',
            description: 'Tingkatkan setoran dan dapatkan hadiah bonus saldo mingguan untuk 10 member teratas.',
        },
        {
            badge: 'Ketentuan & Rules',
            badgeColor: 'text-black',
            icon: NotesIcon,
            title: 'Pastikan Format Akun Sesuai Ketentuan',
            description: 'Gmail harus Fresh, Tanggal lahir akun Gmail wajib 18 tahun ke atas.',
        },
        {
            badge: 'Panduan Triple9',
            badgeColor: 'text-black',
            icon: WhatIcon,
            title: 'Apa itu Triple9 & Cara Kerjanya?',
            description: 'Pelajari alur penyetoran Gmail hingga pencairan reward saldo instan.',
        },
    ];

    useEffect(() => {
        if (isSlidePaused) return;
        const interval = setInterval(() => {
            setActiveSlideIndex((prev) => (prev + 1) % announcements.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [isSlidePaused, announcements.length]);

    const diterimaCount = storHistory.filter((s) => s.status === 'diterima').length;
    const pendingCount = storHistory.filter((s) => s.status === 'pending').length;
    const ditolakCount = storHistory.filter((s) => s.status === 'ditolak').length;
    const dicekCount = storHistory.filter((s) => s.status === 'dicek').length;

    const ActiveIcon = announcements[activeSlideIndex].icon;

    return (
        <div className="space-y-6">
            {/* 1. BANNER CAROUSEL (ATAS) - Accent Yellow #FFD700, Border 3px, Shadow 8px */}
            <div
                onMouseEnter={() => setIsSlidePaused(true)}
                onMouseLeave={() => setIsSlidePaused(false)}
                className="rounded-md bg-[#FFD700] border-[3px] border-black shadow-[8px_8px_0px_0px_#000000] p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between transition-all text-black"
            >
                {/* Top row: Badge and Prev / Next Controls */}
                <div className="flex items-center justify-between gap-3 mb-3">
                    {/* Badge hitam dengan teks kuning "🏆 EVENT REWARD 2/4" */}
                    <div className="inline-flex items-center gap-2 bg-black text-[#FFD700] border-2 border-black px-3 py-1 rounded-sm shadow-[2px_2px_0px_0px_#000000]">
                        <ActiveIcon />
                        <span className="text-xs font-black uppercase tracking-wider font-mono">
                            {announcements[activeSlideIndex].badge} {activeSlideIndex + 1}/{announcements.length}
                        </span>
                    </div>

                    {/* Tombol panah navigasi kiri/kanan berbentuk kotak putih berbingkai hitam */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() =>
                                setActiveSlideIndex(
                                    (prev) => (prev - 1 + announcements.length) % announcements.length
                                )
                            }
                            className="h-8 w-8 rounded-md border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center text-black cursor-pointer"
                            title="Sebelumnya"
                            aria-label="Pengumuman sebelumnya"
                        >
                            <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setActiveSlideIndex((prev) => (prev + 1) % announcements.length)
                            }
                            className="h-8 w-8 rounded-md border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center text-black cursor-pointer"
                            title="Selanjutnya"
                            aria-label="Pengumuman selanjutnya"
                        >
                            <ChevronRight className="h-5 w-5 stroke-[2.5]" />
                        </button>
                    </div>
                </div>

                {/* Middle row: Judul besar & deskripsi */}
                <div key={activeSlideIndex} className="py-2 animate-in fade-in duration-200">
                    <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight leading-tight">
                        {announcements[activeSlideIndex].title}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-black/90 leading-relaxed max-w-2xl mt-1.5">
                        {announcements[activeSlideIndex].description}
                    </p>
                </div>

                {/* Bottom row: Indikator titik / bar pagination dengan border hitam */}
                <div className="flex items-center justify-end gap-1.5 pt-3">
                    {announcements.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveSlideIndex(idx)}
                            className={`h-2.5 rounded-xs border-2 border-black transition-all cursor-pointer ${
                                idx === activeSlideIndex
                                    ? 'w-7 bg-black'
                                    : 'w-2.5 bg-white hover:bg-neutral-100'
                            }`}
                            aria-label={`Ke slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* 2. CARD SALDO TERSEDIA - Card Putih #FFFFFF, Border 3px, Shadow 8px */}
            <div className="rounded-md bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_#000000] p-5 sm:p-6 transition-all text-black">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Sisi Kiri: Label SALDO TERSEDIA, Nominal Rp20.000, Eye button, Subteks */}
                    <div className="space-y-2">
                        <span className="text-xs font-black uppercase tracking-widest text-black">
                            SALDO TERSEDIA
                        </span>

                        <div className="flex items-center gap-3">
                            <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black font-mono">
                                {isSaldoVisible
                                    ? `Rp${currentBalance.toLocaleString('id-ID')}`
                                    : 'Rp ••••••'}
                            </span>
                            <button
                                type="button"
                                onClick={onToggleSaldo}
                                className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all text-black cursor-pointer"
                                title={isSaldoVisible ? 'Sembunyikan saldo' : 'Tampilkan saldo'}
                                aria-label={isSaldoVisible ? 'Sembunyikan saldo' : 'Tampilkan saldo'}
                            >
                                {isSaldoVisible ? (
                                    <Eye className="h-4.5 w-4.5 stroke-[2.5]" />
                                ) : (
                                    <EyeOff className="h-4.5 w-4.5 stroke-[2.5]" />
                                )}
                            </button>
                        </div>

                        <p className="text-xs font-bold text-neutral-800">
                            Minimal penarikan Rp10.000 • Diproses otomatis 1x24 jam
                        </p>
                    </div>

                    {/* Sisi Kanan: Tombol Primary "Tarik Saldo" (#00C2CB) & Secondary "Riwayat Penarikan" (#FFFFFF) */}
                    <div className="flex flex-wrap items-center gap-3 shrink-0">
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
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#00C2CB] text-black font-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all px-5 py-2.5 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
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
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-white text-black font-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all px-5 py-2.5 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
                        >
                            <img src="/images/icon/history.png" alt="Riwayat" className="h-4 w-4 object-contain shrink-0" />
                            <span>Riwayat Penarikan</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. GRID RINGKASAN VERIFIKASI SETOR (4 KOLOM) */}
            <div>
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-black mb-3">
                    RINGKASAN VERIFIKASI SETOR
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1: Diterima - Accent Teal #00C2CB */}
                    <div
                        onClick={() => onNavigateToRiwayat('diterima')}
                        className="group flex flex-col justify-between rounded-md bg-white p-4 sm:p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all cursor-pointer text-black"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <span className="text-xs font-black uppercase tracking-wider text-black">
                                Diterima
                            </span>
                            <div className="size-9 rounded-sm border-2 border-black bg-[#00C2CB] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/checklist.png" alt="Diterima" className="h-5 w-5 object-contain" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className="text-3xl sm:text-4xl font-black font-mono text-black">
                                {diterimaCount}
                            </span>
                        </div>
                    </div>

                    {/* Card 2: Pending - Accent Yellow #FFD700 */}
                    <div
                        onClick={() => onNavigateToRiwayat('pending')}
                        className="group flex flex-col justify-between rounded-md bg-white p-4 sm:p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all cursor-pointer text-black"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <span className="text-xs font-black uppercase tracking-wider text-black">
                                Pending
                            </span>
                            <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/pending.png" alt="Pending" className="h-5 w-5 object-contain" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className="text-3xl sm:text-4xl font-black font-mono text-black">
                                {pendingCount}
                            </span>
                        </div>
                    </div>

                    {/* Card 3: Ditolak - Accent Magenta #FF00FF */}
                    <div
                        onClick={() => onNavigateToRiwayat('ditolak')}
                        className="group flex flex-col justify-between rounded-md bg-white p-4 sm:p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all cursor-pointer text-black"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <span className="text-xs font-black uppercase tracking-wider text-black">
                                Ditolak
                            </span>
                            <div className="size-9 rounded-sm border-2 border-black bg-[#FF00FF] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/reject.png" alt="Ditolak" className="h-5 w-5 object-contain" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className="text-3xl sm:text-4xl font-black font-mono text-black">
                                {ditolakCount}
                            </span>
                        </div>
                    </div>

                    {/* Card 4: Di Cek - Paper Beige #F5F5DC */}
                    <div
                        onClick={() => onNavigateToRiwayat('dicek')}
                        className="group flex flex-col justify-between rounded-md bg-white p-4 sm:p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all cursor-pointer text-black"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <span className="text-xs font-black uppercase tracking-wider text-black">
                                Di Cek
                            </span>
                            <div className="size-9 rounded-sm border-2 border-black bg-[#F5F5DC] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/find.png" alt="Di Cek" className="h-5 w-5 object-contain" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className="text-3xl sm:text-4xl font-black font-mono text-black">
                                {dicekCount}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. TABEL AKTIVITAS SETORAN TERAKHIR - Card Putih #FFFFFF, Border 3px, Shadow 8px */}
            <div className="rounded-md bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_#000000] overflow-hidden transition-all text-black">
                {/* Header Card: Judul & Tombol "Lihat Semua >" berlatar #00C2CB */}
                <div className="flex items-center justify-between px-5 py-4 border-b-2 border-black bg-white">
                    <h3 className="text-sm sm:text-base font-black text-black uppercase tracking-wider">
                        Aktivitas Setoran Terakhir
                    </h3>

                    <button
                        type="button"
                        onClick={() => onNavigate('riwayat')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-[#00C2CB] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer uppercase tracking-wider"
                    >
                        <span>Lihat Semua</span>
                        <ChevronRight className="h-3.5 w-3.5 stroke-[2.5]" />
                    </button>
                </div>

                {storHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white">
                        <div className="flex h-12 w-12 items-center justify-center rounded-sm border-2 border-black bg-[#FFD700] shadow-[3px_3px_0px_0px_#000000] mb-3">
                            <img src="/images/icon/pending.png" alt="Pending" className="h-6 w-6 object-contain" />
                        </div>
                        <h4 className="text-base font-black text-black uppercase tracking-wider mb-1">
                            Belum Ada Aktivitas Setor
                        </h4>
                        <p className="text-xs font-bold text-neutral-700 max-w-sm mb-4 leading-relaxed">
                            Setiap pengajuan setor akun akan dicatat di sini secara transparan beserta status verifikasi dan reward saldo Anda.
                        </p>
                        <button
                            type="button"
                            onClick={() => onNavigate('stor')}
                            className="inline-flex items-center gap-1.5 rounded-md bg-[#00C2CB] text-black font-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] px-4 py-2 text-xs uppercase tracking-wider transition cursor-pointer"
                        >
                            <span>Mulai Setor Akun Sekarang</span>
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            {/* Header Tabel: Background Hitam Pekat #000000 dengan teks putih tebal */}
                            <thead className="bg-[#000000] text-white border-b-2 border-black">
                                <tr>
                                    <th className="px-5 py-3.5 font-black uppercase tracking-wider text-white">Gmail</th>
                                    <th className="px-5 py-3.5 font-black uppercase tracking-wider text-white">Jalur</th>
                                    <th className="px-5 py-3.5 font-black uppercase tracking-wider text-white">Tanggal</th>
                                    <th className="px-5 py-3.5 font-black uppercase tracking-wider text-white text-center">Status</th>
                                    <th className="px-5 py-3.5 font-black uppercase tracking-wider text-white text-right">Reward</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-black bg-white text-black">
                                {storHistory.slice(0, 5).map((item) => (
                                    <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                                        {/* GMAIL: font-bold */}
                                        <td className="px-5 py-3.5 font-bold text-black text-sm">
                                            {item.email}
                                        </td>
                                        {/* JALUR: font-mono */}
                                        <td className="px-5 py-3.5 font-mono font-bold text-black text-xs">
                                            PW: {item.room}
                                        </td>
                                        {/* TANGGAL: font-mono */}
                                        <td className="px-5 py-3.5 font-mono font-bold text-black text-xs">
                                            {item.date}
                                        </td>
                                        {/* STATUS: Badge kotak berbingkai hitam 2px */}
                                        <td className="px-5 py-3.5 text-center align-middle">
                                            {item.status === 'ditolak' ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs border-2 border-black bg-[#FF00FF] text-white font-black text-xs shadow-[2px_2px_0px_0px_#000000]">
                                                    <img src="/images/icon/reject.png" alt="Ditolak" className="h-3.5 w-3.5 object-contain" />
                                                    <span>Ditolak</span>
                                                </span>
                                            ) : item.status === 'pending' ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs border-2 border-black bg-[#FFD700] text-black font-black text-xs shadow-[2px_2px_0px_0px_#000000]">
                                                    <span>⏳</span>
                                                    <span>Menunggu</span>
                                                </span>
                                            ) : item.status === 'dicek' ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs border-2 border-black bg-[#F5F5DC] text-black font-black text-xs shadow-[2px_2px_0px_0px_#000000]">
                                                    <img src="/images/icon/find.png" alt="Di Cek" className="h-3.5 w-3.5 object-contain" />
                                                    <span>Di Cek</span>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs border-2 border-black bg-[#00C2CB] text-black font-black text-xs shadow-[2px_2px_0px_0px_#000000]">
                                                    <img src="/images/icon/checklist.png" alt="Diterima" className="h-3.5 w-3.5 object-contain" />
                                                    <span>Diterima</span>
                                                </span>
                                            )}
                                        </td>
                                        {/* REWARD: font-black font-mono */}
                                        <td className="px-5 py-3.5 text-right font-black font-mono text-black text-sm">
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

