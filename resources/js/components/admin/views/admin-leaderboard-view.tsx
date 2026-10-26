import { useMemo, useState } from 'react';
import { Eye, Search, Wallet } from 'lucide-react';
import type { AdminSetoranItem, AdminUserItem } from '../types';
import { leaderboardData } from '@/components/welcome/constants';
import type { LeaderboardPeriod } from '@/components/welcome/types';

interface AdminLeaderboardViewProps {
    usersList: AdminUserItem[];
    setoranList: AdminSetoranItem[];
    onFilterUserSetoran: (userId: number) => void;
    onOpenBalanceModal: (user: AdminUserItem) => void;
}

export function AdminLeaderboardView({
    usersList,
    setoranList,
    onFilterUserSetoran,
    onOpenBalanceModal,
}: AdminLeaderboardViewProps) {
    const [period, setPeriod] = useState<LeaderboardPeriod>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const periodLabels: { id: LeaderboardPeriod; label: string }[] = [
        { id: 'today', label: 'Hari Ini' },
        { id: '7days', label: '7 Hari Terakhir' },
        { id: '30days', label: '30 Hari Terakhir' },
        { id: 'all', label: 'Sepanjang Masa' },
    ];

    const formatRupiah = (val: number) =>
        'Rp ' + new Intl.NumberFormat('id-ID').format(val || 0);

    // Merge static leaderboard with real users data to provide rich ranking
    const rankingList = useMemo(() => {
        const base = leaderboardData[period] || leaderboardData.all;

        const mapped = base.map((item, idx) => {
            // Check if there is a matching user in usersList
            const matchedUser = usersList.find(
                (u) => u.name.toLowerCase() === item.name.toLowerCase(),
            );
            const userSetoran = setoranList.filter(
                (s) => matchedUser && s.userId === matchedUser.id,
            );
            return {
                ...item,
                rank: idx + 1,
                userId: matchedUser ? matchedUser.id : 100 + idx,
                email: matchedUser ? matchedUser.email : `${item.initials.toLowerCase()}@triple9.id`,
                matchedUser: matchedUser || null,
            };
        });

        if (!searchQuery.trim()) return mapped;
        const q = searchQuery.toLowerCase().trim();
        return mapped.filter(
            (m) =>
                m.name.toLowerCase().includes(q) ||
                m.email.toLowerCase().includes(q) ||
                String(m.rank).includes(q),
        );
    }, [period, usersList, setoranList, searchQuery]);

    const top1 = rankingList.find((i) => i.rank === 1) || rankingList[0];
    const top2 = rankingList.find((i) => i.rank === 2) || rankingList[1];
    const top3 = rankingList.find((i) => i.rank === 3) || rankingList[2];

    return (
        <div className="space-y-6">
            <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                {/* Filter Tabs & Search */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    {/* Period Tabs */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        {periodLabels.map((p) => {
                            const isActive = period === p.id;
                            return (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => setPeriod(p.id)}
                                    className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${isActive
                                        ? 'bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]'
                                        : 'bg-white text-black hover:bg-[#F5F5DC]'
                                        }`}
                                >
                                    {p.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Search */}
                    <div className="relative min-w-[220px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-black stroke-[2.5]" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama penyetor..."
                            className="w-full pl-9 pr-3 py-1.5 border-2 border-black rounded-sm bg-white font-bold text-xs text-black shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC]"
                        />
                    </div>
                </div>

                {/* TOP 3 PODIUM */}
                {rankingList.length >= 3 && !searchQuery && (
                    <div className="pt-4 pb-2 border-t-2 border-black">
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-3xl mx-auto items-end px-2">
                            {/* Rank 2 (Left) */}
                            {top2 && (
                                <div className="flex flex-col items-center justify-end text-center">
                                    <img src="/images/icon/2nd.png" alt="Juara 2" className="size-6 sm:size-7 object-contain mb-1" />
                                    <img
                                        src={top2.avatar}
                                        alt={top2.name}
                                        className="size-11 sm:size-12 rounded-sm border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000000] object-contain p-0.5 mb-1"
                                    />
                                    <h4 className="text-xs sm:text-sm font-black uppercase text-black leading-snug whitespace-nowrap">
                                        {top2.name}
                                    </h4>
                                    <div className="text-[11px] font-bold text-neutral-700 leading-tight">
                                        {top2.gmails.toLocaleString('id-ID')} Gmail
                                    </div>
                                    <div className="text-xs font-mono font-black text-black leading-tight mt-0.5">
                                        {formatRupiah(top2.earnings)}
                                    </div>
                                    <div className="w-full h-16 sm:h-20 rounded-t-sm bg-white border-2 border-black flex items-center justify-center font-mono font-black text-xl sm:text-2xl shadow-[3px_3px_0px_0px_#000000] mt-2">
                                        2
                                    </div>
                                </div>
                            )}

                            {/* Rank 1 (Center) */}
                            {top1 && (
                                <div className="flex flex-col items-center justify-end text-center">
                                    <img src="/images/icon/1st.png" alt="Juara 1" className="size-7 sm:size-8 object-contain mb-1" />
                                    <img
                                        src={top1.avatar}
                                        alt={top1.name}
                                        className="size-13 sm:size-14 rounded-sm border-[3px] border-black bg-[#FFD700] shadow-[3px_3px_0px_0px_#000000] object-contain p-0.5 mb-1"
                                    />
                                    <h4 className="text-xs sm:text-sm font-black uppercase text-black leading-snug whitespace-nowrap">
                                        {top1.name}
                                    </h4>
                                    <div className="text-xs font-black text-black bg-[#FFD700] px-1.5 py-0.5 border border-black rounded-xs leading-tight mt-0.5">
                                        {top1.gmails.toLocaleString('id-ID')} Gmail
                                    </div>
                                    <div className="text-xs sm:text-sm font-mono font-black text-black leading-tight mt-0.5">
                                        {formatRupiah(top1.earnings)}
                                    </div>
                                    <div className="w-full h-24 sm:h-28 rounded-t-sm bg-[#FFD700] border-2 border-black flex items-center justify-center font-mono font-black text-2xl sm:text-3xl shadow-[3px_3px_0px_0px_#000000] mt-2">
                                        1
                                    </div>
                                </div>
                            )}

                            {/* Rank 3 (Right) */}
                            {top3 && (
                                <div className="flex flex-col items-center justify-end text-center">
                                    <img src="/images/icon/3rd.png" alt="Juara 3" className="size-6 sm:size-7 object-contain mb-1" />
                                    <img
                                        src={top3.avatar}
                                        alt={top3.name}
                                        className="size-11 sm:size-12 rounded-sm border-2 border-black bg-[#00C2CB] shadow-[2px_2px_0px_0px_#000000] object-contain p-0.5 mb-1"
                                    />
                                    <h4 className="text-xs sm:text-sm font-black uppercase text-black leading-snug whitespace-nowrap">
                                        {top3.name}
                                    </h4>
                                    <div className="text-[11px] font-bold text-neutral-700 leading-tight">
                                        {top3.gmails.toLocaleString('id-ID')} Gmail
                                    </div>
                                    <div className="text-xs font-mono font-black text-black leading-tight mt-0.5">
                                        {formatRupiah(top3.earnings)}
                                    </div>
                                    <div className="w-full h-12 sm:h-16 rounded-t-sm bg-[#00C2CB] border-2 border-black flex items-center justify-center font-mono font-black text-lg sm:text-xl shadow-[3px_3px_0px_0px_#000000] mt-2">
                                        3
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Table of all ranks */}
                <div className="overflow-x-auto no-scrollbar pt-2">
                    <table className="w-full text-left text-xs border-2 border-black">
                        <thead>
                            <tr className="bg-[#FFD700] border-b-2 border-black text-black uppercase font-black tracking-wider text-[11px]">
                                <th className="p-3 border-r-2 border-black w-14 text-center whitespace-nowrap">Rank</th>
                                <th className="p-3 border-r-2 border-black whitespace-nowrap">Penyetor</th>
                                <th className="p-3 border-r-2 border-black whitespace-nowrap">Total Setoran Gmail</th>
                                <th className="p-3 border-r-2 border-black whitespace-nowrap">Total Reward</th>
                                <th className="p-3 text-right whitespace-nowrap">Aksi Admin</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-black bg-white font-medium">
                            {rankingList.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-xs font-black uppercase tracking-wider text-neutral-500">
                                        Tidak ada penyetor yang cocok dengan filter pencarian.
                                    </td>
                                </tr>
                            ) : (
                                rankingList.map((item) => {
                                    const rankBg =
                                        item.rank === 1
                                            ? 'bg-[#FFD700] text-black font-black'
                                            : item.rank === 2
                                                ? 'bg-neutral-200 text-black font-black'
                                                : item.rank === 3
                                                    ? 'bg-[#00C2CB] text-black font-black'
                                                    : 'bg-white text-black font-bold';

                                    return (
                                        <tr key={item.rank} className="hover:bg-[#F5F5DC] transition">
                                            {/* Rank Badge */}
                                            <td className="p-3 border-r-2 border-black text-center whitespace-nowrap">
                                                <span
                                                    className={`inline-flex items-center justify-center size-7 rounded-sm border-2 border-black font-mono text-xs shadow-[1px_1px_0px_0px_#000000] ${rankBg}`}
                                                >
                                                    {item.rank <= 3 ? (
                                                        <img
                                                            src={`/images/icon/${item.rank === 1 ? '1st' : item.rank === 2 ? '2nd' : '3rd'}.png`}
                                                            alt={`Juara ${item.rank}`}
                                                            className="size-4.5 object-contain"
                                                        />
                                                    ) : (
                                                        `#${item.rank}`
                                                    )}
                                                </span>
                                            </td>

                                            {/* User Profile */}
                                            <td className="p-3 border-r-2 border-black whitespace-nowrap">
                                                <div className="flex items-center gap-2.5">
                                                    <img
                                                        src={item.avatar}
                                                        alt={item.name}
                                                        className="size-7 rounded-full border border-black bg-[#FFD700] object-contain p-0.5 shrink-0"
                                                    />
                                                    <div className="min-w-0">
                                                        <div className="font-bold text-black leading-snug">
                                                            {item.name}
                                                        </div>
                                                        <div className="text-[10px] text-neutral-500 font-mono leading-tight">
                                                            {item.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Total Gmails */}
                                            <td className="p-3 border-r-2 border-black font-mono font-black text-black whitespace-nowrap">
                                                <span className="bg-[#F5F5DC] px-2 py-0.5 rounded-xs border border-black">
                                                    {item.gmails.toLocaleString('id-ID')} Akun
                                                </span>
                                            </td>

                                            {/* Total Earnings */}
                                            <td className="p-3 border-r-2 border-black font-mono font-black text-black whitespace-nowrap">
                                                {formatRupiah(item.earnings)}
                                            </td>

                                            {/* Actions */}
                                            <td className="p-3 text-right whitespace-nowrap">
                                                <div className="inline-flex items-center gap-1.5">
                                                    {/* Filter user's setoran */}
                                                    <button
                                                        type="button"
                                                        onClick={() => onFilterUserSetoran(item.userId)}
                                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs border border-black bg-[#00C2CB] hover:bg-[#00a8b0] text-black text-[11px] font-black uppercase tracking-wider shadow-[1px_1px_0px_0px_#000000] cursor-pointer"
                                                        title={`Lihat seluruh setoran dari ${item.name}`}
                                                    >
                                                        <Eye className="size-3.5 stroke-[2.5]" />
                                                        <span>Setoran</span>
                                                    </button>

                                                    {/* Adjust balance */}
                                                    {item.matchedUser && (
                                                        <button
                                                            type="button"
                                                            onClick={() => onOpenBalanceModal(item.matchedUser!)}
                                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs border border-black bg-[#FFD700] hover:bg-[#ffc800] text-black text-[11px] font-black uppercase tracking-wider shadow-[1px_1px_0px_0px_#000000] cursor-pointer"
                                                            title={`Sesuaikan saldo untuk ${item.name}`}
                                                        >
                                                            <Wallet className="size-3.5 stroke-[2.5]" />
                                                            <span>Saldo</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
