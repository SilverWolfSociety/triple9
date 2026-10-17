import { useState } from 'react';
import { Search, ChevronDown, Clock } from 'lucide-react';
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
            <div className="rounded-2xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-[#27272a] p-5 sm:p-7 shadow-xs space-y-4">
                {/* 1. Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        value={searchGmailQuery}
                        onChange={(e) => setSearchGmailQuery(e.target.value)}
                        placeholder="Cari Gmail..."
                        className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 focus:outline-none transition shadow-2xs"
                    />
                </div>

                {/* 2. Filter Controls: Status Pills, Dropdown Jalur, Day Pills */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
                    {/* Status Group */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        {[
                            { id: 'all' as const, label: 'Semua' },
                            { id: 'pending' as const, label: `Pending (${pendingCount})` },
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
                                        : 'bg-white dark:bg-[#121215] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800'
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
                                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] hover:bg-slate-50 dark:hover:bg-zinc-800 px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 transition cursor-pointer shadow-2xs"
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
                                <div className="absolute left-0 sm:right-0 sm:left-auto mt-1.5 w-44 rounded-xl bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 p-1 shadow-lg z-20 text-xs">
                                    {[
                                        { id: 'all' as const, label: 'Semua Jalur' },
                                        { id: 'zero1122' as const, label: 'PW: zero1122' },
                                        { id: 'hehe1122' as const, label: 'PW: hehe1122' },
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
                                                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800'
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
                                            : 'bg-white dark:bg-[#121215] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800'
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
                    <div className="rounded-xl border border-dashed border-slate-200 dark:border-zinc-800 py-16 px-4 text-center">
                        <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500">
                            Belum ada setoran.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-800">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 dark:bg-[#121215]/50 border-b border-slate-200 dark:border-zinc-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                <tr>
                                    <th className="px-4 py-3">Gmail</th>
                                    <th className="px-4 py-3">Jalur</th>
                                    <th className="px-4 py-3">Tanggal</th>
                                    <th className="px-4 py-3 text-center">Status</th>
                                    <th className="px-4 py-3 text-right">Reward</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                                {filteredStorHistory.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/40 transition">
                                        <td className="px-4 py-3 font-medium">{item.email}</td>
                                        <td className="px-4 py-3 text-[11px] text-slate-600 dark:text-slate-400">
                                            PW: {item.room}
                                        </td>
                                        <td className="px-4 py-3 text-slate-500">{item.date}</td>
                                        <td className="px-4 py-3 text-center align-middle">
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
