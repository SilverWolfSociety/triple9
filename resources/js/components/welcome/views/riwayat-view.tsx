import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import type { StorRecord, RiwayatFilter, JalurFilter, DayFilter } from '../types';

interface RiwayatViewProps {
    storHistory: StorRecord[];
    riwayatFilter: RiwayatFilter;
    onChangeRiwayatFilter: (filter: RiwayatFilter) => void;
}

export function RiwayatView({
    storHistory,
    riwayatFilter,
    onChangeRiwayatFilter,
}: RiwayatViewProps) {
    const [searchGmailQuery, setSearchGmailQuery] = useState('');
    const [jalurFilter, setJalurFilter] = useState<JalurFilter>('all');
    const [isJalurDropdownOpen, setIsJalurDropdownOpen] = useState(false);
    const [dayFilter, setDayFilter] = useState<DayFilter>('all');

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

    const pendingCount = storHistory.filter((s) => s.status === 'pending').length;
    const dicekCount = storHistory.filter((s) => s.status === 'dicek').length;
    const diterimaCount = storHistory.filter((s) => s.status === 'diterima').length;
    const ditolakCount = storHistory.filter((s) => s.status === 'ditolak').length;

    return (
        <div className="w-full space-y-4">
            <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-7 shadow-xs space-y-4">
                {/* 1. Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                        type="text"
                        value={searchGmailQuery}
                        onChange={(e) => setSearchGmailQuery(e.target.value)}
                        placeholder="Cari Gmail..."
                        className="w-full rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 focus:outline-none transition shadow-2xs"
                    />
                </div>

                {/* 2. Filter Controls: Status Pills, Dropdown Jalur, Day Pills */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
                    {/* Status Group */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        {[
                            { id: 'all' as const, label: 'Semua' },
                            { id: 'pending' as const, label: `Menunggu (${pendingCount})` },
                            { id: 'dicek' as const, label: `Di Cek (${dicekCount})` },
                            { id: 'diterima' as const, label: `Diterima (${diterimaCount})` },
                            { id: 'ditolak' as const, label: `Ditolak (${ditolakCount})` },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => onChangeRiwayatFilter(tab.id)}
                                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                                    riwayatFilter === tab.id
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* Dropdown Jalur (PW: triple999 / PW: 999triple) */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsJalurDropdownOpen(!isJalurDropdownOpen)}
                                className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 px-3.5 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 transition cursor-pointer shadow-2xs"
                            >
                                <span>
                                    {jalurFilter === 'all'
                                        ? 'Semua Jalur'
                                        : jalurFilter === 'triple9'
                                        ? 'PW: triple9'
                                        : 'PW: 9triple'}
                                </span>
                                <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
                            </button>

                            {isJalurDropdownOpen && (
                                <div className="absolute left-0 sm:right-0 sm:left-auto mt-1.5 w-44 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-1 shadow-lg z-20 text-xs">
                                    {[
                                        { id: 'all' as const, label: 'Semua Jalur' },
                                        { id: 'triple9' as const, label: 'PW: triple9' },
                                        { id: '9triple' as const, label: 'PW: 9triple' },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => {
                                                setJalurFilter(item.id);
                                                setIsJalurDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                                                jalurFilter === item.id
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
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
                                { id: 'all' as const, label: 'Semua' },
                                { id: 'today' as const, label: 'Hari Ini' },
                                { id: '7days' as const, label: '7 Hari' },
                                { id: '30days' as const, label: '30 Hari' },
                            ].map((d) => (
                                <button
                                    key={d.id}
                                    type="button"
                                    onClick={() => setDayFilter(d.id)}
                                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                                        dayFilter === d.id
                                            ? 'bg-blue-600 text-white shadow-xs'
                                            : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800'
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
                    <div className="rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 py-16 px-4 text-center">
                        <p className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-500">
                            Belum ada setoran.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200/80 dark:border-neutral-800 text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                <tr>
                                    <th className="px-4 py-3">Gmail</th>
                                    <th className="px-4 py-3">Jalur</th>
                                    <th className="px-4 py-3">Tanggal</th>
                                    <th className="px-4 py-3 text-center">Status</th>
                                    <th className="px-4 py-3 text-right">Reward</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-200">
                                {filteredStorHistory.map((item) => (
                                    <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 transition">
                                        <td className="px-4 py-3 font-medium">{item.email}</td>
                                        <td className="px-4 py-3 text-[11px] text-neutral-600 dark:text-neutral-400">
                                            PW: {item.room}
                                        </td>
                                        <td className="px-4 py-3 text-neutral-500">{item.date}</td>
                                        <td className="px-4 py-3 text-center align-middle">
                                            {item.status === 'ditolak' ? (
                                                <div className="inline-flex items-center justify-center gap-1.5" title="Ditolak">
                                                    <img src="/images/icon/reject.png" alt="Ditolak" className="h-4 w-4 object-contain shrink-0" />
                                                    <span className="text-[11px] font-medium text-rose-600 dark:text-rose-400">
                                                        Ditolak
                                                    </span>
                                                </div>
                                            ) : item.status === 'pending' ? (
                                                <div className="inline-flex items-center justify-center gap-1.5" title="Menunggu">
                                                    <img src="/images/icon/pending.png" alt="Menunggu" className="h-4 w-4 object-contain shrink-0" />
                                                    <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
                                                        Menunggu
                                                    </span>
                                                </div>
                                            ) : item.status === 'dicek' ? (
                                                <div className="inline-flex items-center justify-center gap-1.5" title="Di Cek">
                                                    <img src="/images/icon/pending.png" alt="Di Cek" className="h-4 w-4 object-contain shrink-0" />
                                                    <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
                                                        Di Cek
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="inline-flex items-center justify-center gap-1.5" title="Diterima">
                                                    <img src="/images/icon/checklist.png" alt="Diterima" className="h-4 w-4 object-contain shrink-0" />
                                                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                                                        Diterima
                                                    </span>
                                                </div>
                                            )}
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
    );
}
