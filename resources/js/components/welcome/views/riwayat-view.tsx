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
            <div className="rounded-md bg-white border-[3px] border-black p-5 sm:p-7 shadow-[8px_8px_0px_0px_#000000] space-y-5">
                {/* 1. Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-black stroke-[2.5]" />
                    <input
                        type="text"
                        value={searchGmailQuery}
                        onChange={(e) => setSearchGmailQuery(e.target.value)}
                        placeholder="Cari Gmail..."
                        className="w-full rounded-sm border-2 border-black bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm font-bold text-black placeholder:text-neutral-500 shadow-[4px_4px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                    />
                </div>

                {/* 2. Filter Controls: Status Pills, Dropdown Jalur, Day Pills */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
                    {/* Status Group */}
                    <div className="flex flex-wrap items-center gap-2">
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
                                className={`rounded-sm px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${
                                    riwayatFilter === tab.id
                                        ? 'bg-[#00C2CB] text-black shadow-[4px_4px_0px_0px_#000000] translate-x-[-1px] translate-y-[-1px]'
                                        : 'bg-white text-black hover:bg-[#F5F5DC] shadow-[2px_2px_0px_0px_#000000]'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* Dropdown Jalur (PW: triple9 / PW: 9triple) */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsJalurDropdownOpen(!isJalurDropdownOpen)}
                                className="inline-flex items-center gap-2 rounded-sm border-2 border-black bg-white hover:bg-[#F5F5DC] px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-black transition cursor-pointer shadow-[2px_2px_0px_0px_#000000]"
                            >
                                <span>
                                    {jalurFilter === 'all'
                                        ? 'Semua Jalur'
                                        : jalurFilter === 'triple9'
                                        ? 'PW: triple9'
                                        : 'PW: 9triple'}
                                </span>
                                <ChevronDown className="h-3.5 w-3.5 text-black stroke-[3]" />
                            </button>

                            {isJalurDropdownOpen && (
                                <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-44 rounded-sm bg-white border-2 border-black p-1 shadow-[4px_4px_0px_0px_#000000] z-20 text-xs">
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
                                            className={`w-full text-left px-3 py-1.5 rounded-xs font-black transition cursor-pointer ${
                                                jalurFilter === item.id
                                                    ? 'bg-[#00C2CB] text-black'
                                                    : 'text-black hover:bg-[#F5F5DC]'
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Day Filter Pills */}
                        <div className="flex items-center gap-1.5">
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
                                    className={`rounded-sm px-2.5 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${
                                        dayFilter === d.id
                                            ? 'bg-[#FFD700] text-black shadow-[2px_2px_0px_0px_#000000]'
                                            : 'bg-white text-black hover:bg-[#F5F5DC] shadow-[1px_1px_0px_0px_#000000]'
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
                    <div className="rounded-md border-2 border-dashed border-black py-16 px-4 text-center bg-[#F5F5DC]/40">
                        <p className="text-xs sm:text-sm font-black text-black uppercase tracking-wider">
                            Belum ada setoran.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-md border-2 border-black shadow-[4px_4px_0px_0px_#000000]">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-black border-b-2 border-black text-[11px] font-black text-white uppercase tracking-wider">
                                <tr>
                                    <th className="px-4 py-3">Gmail</th>
                                    <th className="px-4 py-3">Jalur</th>
                                    <th className="px-4 py-3">Tanggal</th>
                                    <th className="px-4 py-3 text-center">Status</th>
                                    <th className="px-4 py-3 text-right">Reward</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-black bg-white text-black">
                                {filteredStorHistory.map((item) => (
                                    <tr key={item.id} className="hover:bg-[#F5F5DC] transition">
                                        <td className="px-4 py-3 font-bold">{item.email}</td>
                                        <td className="px-4 py-3 text-xs font-mono font-bold text-neutral-800">
                                            PW: {item.room}
                                        </td>
                                        <td className="px-4 py-3 font-mono font-bold text-xs text-neutral-800">{item.date}</td>
                                        <td className="px-4 py-3 text-center align-middle">
                                            {item.status === 'ditolak' ? (
                                                <span className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-black border-2 border-black bg-[#FF00FF] text-black shadow-[2px_2px_0px_0px_#000000]">
                                                    <img src="/images/icon/reject.png" alt="Ditolak" className="h-3.5 w-3.5 object-contain shrink-0" />
                                                    Ditolak
                                                </span>
                                            ) : item.status === 'pending' ? (
                                                <span className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-black border-2 border-black bg-[#FFD700] text-black shadow-[2px_2px_0px_0px_#000000]">
                                                    <img src="/images/icon/pending.png" alt="Menunggu" className="h-3.5 w-3.5 object-contain shrink-0" />
                                                    Menunggu
                                                </span>
                                            ) : item.status === 'dicek' ? (
                                                <span className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-black border-2 border-black bg-[#F5F5DC] text-black shadow-[2px_2px_0px_0px_#000000]">
                                                    <img src="/images/icon/pending.png" alt="Di Cek" className="h-3.5 w-3.5 object-contain shrink-0" />
                                                    Di Cek
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-black border-2 border-black bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]">
                                                    <img src="/images/icon/checklist.png" alt="Diterima" className="h-3.5 w-3.5 object-contain shrink-0" />
                                                    Diterima
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right font-mono font-black text-xs text-black">
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
