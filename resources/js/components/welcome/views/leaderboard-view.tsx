import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User } from '@/types';
import type { LeaderboardPeriod } from '../types';
import { leaderboardData } from '../constants';

interface LeaderboardViewProps {
    user?: User;
}

export function LeaderboardView({ user }: LeaderboardViewProps) {
    const [leaderboardPeriod, setLeaderboardPeriod] = useState<LeaderboardPeriod>('all');

    const currentList = leaderboardData[leaderboardPeriod];
    const top1 = currentList.find((i) => i.rank === 1)!;
    const top2 = currentList.find((i) => i.rank === 2)!;
    const top3 = currentList.find((i) => i.rank === 3)!;
    const restRanks = currentList.filter((i) => i.rank > 3);

    const periodLabels: { id: LeaderboardPeriod; label: string }[] = [
        { id: 'today', label: 'Hari Ini' },
        { id: '7days', label: '7 Hari' },
        { id: '30days', label: '30 Hari' },
        { id: 'all', label: 'Sepanjang Masa' },
    ];

    return (
        <div className="w-full space-y-5">
            {/* Header & Filter Controls Card */}
            <div className="rounded-md bg-white border-[3px] border-black px-6 min-h-[70px] shadow-[8px_8px_0px_0px_#000000] flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                        <img src="/images/icon/trophy.png" alt="Leaderboard" className="h-5 w-5 object-contain" />
                    </div>
                    <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-black">
                        Leaderboard Penyetor
                    </h2>
                </div>

                {/* Period Tabs */}
                <div className="inline-flex flex-wrap items-center gap-2 self-start sm:self-auto">
                    {periodLabels.map((p) => {
                        const isActive = leaderboardPeriod === p.id;
                        return (
                            <button
                                key={p.id}
                                type="button"
                                onClick={() => setLeaderboardPeriod(p.id)}
                                className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${isActive
                                        ? 'bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]'
                                        : 'bg-white text-black hover:bg-[#F5F5DC] shadow-[1px_1px_0px_0px_#000000]'
                                    }`}
                            >
                                {p.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* TOP 3 PODIUM DIAGRAM */}
            <div className="pt-2 sm:pt-4 pb-1">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 items-end max-w-4xl mx-auto px-1 sm:px-4">
                    {/* Rank 2 (Left) */}
                    <div className="flex flex-col items-center justify-end text-center group">
                        {/* Member Details */}
                        <div className="flex flex-col items-center mb-2">
                            <img src="/images/icon/2nd.png" alt="Juara 2" className="h-6 w-6 sm:h-7 sm:w-7 object-contain mb-1" />
                            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 rounded-sm border-2 border-black shadow-[3px_3px_0px_0px_#000000] mb-1 bg-white">
                                <AvatarImage src={top2.avatar} alt={top2.name} className="object-contain p-0.5 size-full" />
                                <AvatarFallback className="bg-white text-black font-black text-xs sm:text-sm">
                                    {top2.initials}
                                </AvatarFallback>
                            </Avatar>
                            <h3 className="text-xs sm:text-sm font-black uppercase text-black truncate max-w-[105px] sm:max-w-[180px]">
                                {top2.name}
                            </h3>
                            <p className="text-[10px] sm:text-xs font-bold text-neutral-700 mt-0.5">
                                {top2.gmails.toLocaleString('id-ID')} Gmail
                            </p>
                            <p className="text-xs sm:text-sm font-black font-mono text-black mt-0.5">
                                Rp{top2.earnings.toLocaleString('id-ID')}
                            </p>
                        </div>

                        {/* Pedestal Bar #2 */}
                        <div className="w-full h-20 sm:h-28 rounded-t-sm bg-white border-3 border-black flex flex-col items-center justify-center p-2 relative shadow-[4px_4px_0px_0px_#000000]">
                            <span className="text-2xl sm:text-3xl font-black text-black font-mono">
                                2
                            </span>
                        </div>
                    </div>

                    {/* Rank 1 (Center - Tallest) */}
                    <div className="flex flex-col items-center justify-end text-center group">
                        {/* Member Details */}
                        <div className="flex flex-col items-center mb-2">
                            <img src="/images/icon/1st.png" alt="Juara 1" className="h-7 w-7 sm:h-8 sm:w-8 object-contain mb-1" />
                            <Avatar className="h-12 w-12 sm:h-14 sm:w-14 rounded-sm border-3 border-black shadow-[4px_4px_0px_0px_#000000] mb-1 bg-[#FFD700]">
                                <AvatarImage src={top1.avatar} alt={top1.name} className="object-contain p-0.5 size-full" />
                                <AvatarFallback className="bg-[#FFD700] text-black font-black text-sm sm:text-base">
                                    {top1.initials}
                                </AvatarFallback>
                            </Avatar>
                            <h3 className="text-xs sm:text-sm font-black uppercase text-black truncate max-w-[115px] sm:max-w-[200px]">
                                {top1.name}
                            </h3>
                            <p className="text-[10px] sm:text-xs font-black text-black mt-0.5 bg-[#FFD700] px-1 border border-black rounded-xs">
                                {top1.gmails.toLocaleString('id-ID')} Gmail
                            </p>
                            <p className="text-xs sm:text-sm font-black font-mono text-black mt-0.5">
                                Rp{top1.earnings.toLocaleString('id-ID')}
                            </p>
                        </div>

                        {/* Pedestal Bar #1 */}
                        <div className="w-full h-28 sm:h-36 rounded-t-sm bg-[#FFD700] border-3 border-black flex flex-col items-center justify-center p-2 relative shadow-[4px_4px_0px_0px_#000000]">
                            <span className="text-3xl sm:text-4xl font-black text-black font-mono">
                                1
                            </span>
                        </div>
                    </div>

                    {/* Rank 3 (Right) */}
                    <div className="flex flex-col items-center justify-end text-center group">
                        {/* Member Details */}
                        <div className="flex flex-col items-center mb-2">
                            <img src="/images/icon/3rd.png" alt="Juara 3" className="h-6 w-6 sm:h-7 sm:w-7 object-contain mb-1" />
                            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 rounded-sm border-2 border-black shadow-[3px_3px_0px_0px_#000000] mb-1 bg-[#00C2CB]">
                                <AvatarImage src={top3.avatar} alt={top3.name} className="object-contain p-0.5 size-full" />
                                <AvatarFallback className="bg-[#00C2CB] text-black font-black text-xs sm:text-sm">
                                    {top3.initials}
                                </AvatarFallback>
                            </Avatar>
                            <h3 className="text-xs sm:text-sm font-black uppercase text-black truncate max-w-[105px] sm:max-w-[180px]">
                                {top3.name}
                            </h3>
                            <p className="text-[10px] sm:text-xs font-bold text-neutral-700 mt-0.5">
                                {top3.gmails.toLocaleString('id-ID')} Gmail
                            </p>
                            <p className="text-xs sm:text-sm font-black font-mono text-black mt-0.5">
                                Rp{top3.earnings.toLocaleString('id-ID')}
                            </p>
                        </div>

                        {/* Pedestal Bar #3 */}
                        <div className="w-full h-16 sm:h-22 rounded-t-sm bg-[#00C2CB] border-3 border-black flex flex-col items-center justify-center p-2 relative shadow-[4px_4px_0px_0px_#000000]">
                            <span className="text-2xl sm:text-3xl font-black text-black font-mono">
                                3
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* LIST TABLE: RANKS #4 TO #10 */}
            <div className="rounded-md bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_#000000] overflow-hidden">
                {/* Table Header: Kuning #FFD700 identik dengan Admin Dashboard */}
                <div className="px-4 sm:px-5 py-3 bg-[#FFD700] text-black border-b-2 border-black flex items-center justify-between text-xs font-black uppercase tracking-wider">
                    <span className="flex-1 min-w-0">Peringkat & Member</span>
                    <div className="flex items-center shrink-0">
                        <span className="hidden sm:inline-block w-32 sm:w-40 text-left">Gmail Diterima</span>
                        <span className="w-28 sm:w-36 text-right">Total Pendapatan</span>
                    </div>
                </div>

                {/* Rows */}
                <div className="divide-y-2 divide-black">
                    {restRanks.map((item) => (
                        <div
                            key={item.rank}
                            className="px-4 sm:px-5 py-3 flex items-center justify-between hover:bg-[#F5F5DC] transition"
                        >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center text-xs font-black font-mono text-black">
                                    #{item.rank}
                                </span>
                                <Avatar className="h-8 w-8 shrink-0 rounded-sm border-2 border-black shadow-[2px_2px_0px_0px_#000000] bg-white">
                                    <AvatarImage src={item.avatar} alt={item.name} className="object-contain p-0.5 size-full" />
                                    <AvatarFallback className="bg-white text-black font-black text-xs">
                                        {item.initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm font-bold text-black truncate">
                                        {item.name}
                                    </p>
                                    <p className="text-[11px] font-bold text-neutral-600 sm:hidden">
                                        {item.gmails.toLocaleString('id-ID')} Gmail diterima
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center shrink-0">
                                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-black w-32 sm:w-40 text-left">
                                    <img src="/images/icon/checklist.png" alt="Diterima" className="h-3.5 w-3.5 object-contain shrink-0" />
                                    <span className="font-mono">{item.gmails.toLocaleString('id-ID')} Gmail</span>
                                </span>
                                <span className="text-xs sm:text-sm font-black font-mono text-black w-28 sm:w-36 text-right">
                                    Rp{item.earnings.toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* User Rank Row */}
            <div className="rounded-md border-[3px] border-black bg-[#FFD700] px-4 sm:px-5 py-3.5 shadow-[4px_4px_0px_0px_#000000] flex items-center justify-between transition">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-xs font-black font-mono text-black bg-white border-2 border-black shadow-[1px_1px_0px_0px_#000000] rounded-xs">
                        #14
                    </span>
                    <Avatar className="h-8 w-8 shrink-0 rounded-sm border-2 border-black shadow-[2px_2px_0px_0px_#000000] bg-white">
                        <AvatarImage
                            src={user?.avatar || '/images/avatar/kucing.png'}
                            alt={user?.name || 'Anda'}
                            className="object-contain p-0.5 size-full"
                        />
                        <AvatarFallback className="bg-white text-black font-black text-xs">
                            {user ? user.name.charAt(0).toUpperCase() : 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="text-xs sm:text-sm font-black uppercase text-black truncate">
                                {user ? user.name : 'Anda'}
                            </p>
                            <span className="text-[10px] bg-black text-white px-1.5 py-0.2 rounded-xs font-black uppercase">
                                Anda
                            </span>
                        </div>
                        <p className="text-[11px] font-bold text-black sm:hidden">
                            140 Gmail diterima
                        </p>
                    </div>
                </div>

                <div className="flex items-center shrink-0">
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black text-black w-32 sm:w-40 text-left">
                        <img src="/images/icon/checklist.png" alt="Diterima" className="h-3.5 w-3.5 object-contain shrink-0" />
                        <span className="font-mono">140 Gmail</span>
                    </span>
                    <span className="text-xs sm:text-sm font-black font-mono text-black w-28 sm:w-36 text-right">
                        Rp630.000
                    </span>
                </div>
            </div>
        </div>
    );
}
