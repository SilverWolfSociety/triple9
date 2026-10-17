import { useState } from 'react';
import { Trophy, Medal, Crown, CheckCircle2 } from 'lucide-react';
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
        <div className="w-full space-y-4 sm:space-y-5">
            {/* Header & Filter Controls Card */}
            <div className="rounded-2xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-[#27272a] px-5 min-h-[68px] sm:h-18 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 py-3.5 sm:py-0">
                <div className="flex items-center gap-3">
                    <Trophy className="h-6 w-6 text-amber-500 dark:text-amber-400 shrink-0" />
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                        Leaderboard Storer
                    </h2>
                </div>

                {/* Period Tabs */}
                <div className="inline-flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
                    {periodLabels.map((p) => {
                        const isActive = leaderboardPeriod === p.id;
                        return (
                            <button
                                key={p.id}
                                type="button"
                                onClick={() => setLeaderboardPeriod(p.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                    isActive
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'bg-slate-100 dark:bg-[#121215] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200/80 dark:border-zinc-800'
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
                            <Medal className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 dark:text-zinc-300 fill-slate-400/20 mb-1" />
                            <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-tr ${top2.avatarBg} text-white font-extrabold text-xs sm:text-sm shadow-md ring-2 ring-slate-400/40 mb-1 group-hover:scale-105 transition duration-200`}>
                                {top2.initials}
                            </div>
                            <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate max-w-[105px] sm:max-w-[180px]">
                                {top2.name}
                            </h3>
                            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                                {top2.gmails.toLocaleString('id-ID')} Gmail
                            </p>
                            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5 font-tabular-nums">
                                Rp{top2.earnings.toLocaleString('id-ID')}
                            </p>
                        </div>

                        {/* Pedestal Bar #2 */}
                        <div className="w-full h-18 sm:h-24 rounded-t-xl sm:rounded-t-2xl bg-gradient-to-b from-slate-200 via-slate-100 to-white dark:from-zinc-800 dark:via-zinc-900/90 dark:to-[#09090b] border-t-2 border-x border-slate-300 dark:border-zinc-700/80 flex flex-col items-center justify-center p-2 relative shadow-md">
                            <span className="text-lg sm:text-2xl font-extrabold text-slate-400 dark:text-zinc-500 font-mono">
                                2
                            </span>
                        </div>
                    </div>

                    {/* Rank 1 (Center - Tallest) */}
                    <div className="flex flex-col items-center justify-end text-center group">
                        {/* Member Details */}
                        <div className="flex flex-col items-center mb-2">
                            <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400 fill-amber-400/30 mb-1" />
                            <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-tr ${top1.avatarBg} text-slate-950 font-black text-sm sm:text-base shadow-lg ring-3 ring-amber-400/50 mb-1 group-hover:scale-105 transition duration-200`}>
                                {top1.initials}
                            </div>
                            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate max-w-[115px] sm:max-w-[200px]">
                                {top1.name}
                            </h3>
                            <p className="text-[10px] sm:text-xs font-medium text-amber-600 dark:text-amber-400 mt-0.5">
                                {top1.gmails.toLocaleString('id-ID')} Gmail
                            </p>
                            <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5 font-tabular-nums">
                                Rp{top1.earnings.toLocaleString('id-ID')}
                            </p>
                        </div>

                        {/* Pedestal Bar #1 */}
                        <div className="w-full h-24 sm:h-32 rounded-t-xl sm:rounded-t-2xl bg-gradient-to-b from-amber-400/30 via-amber-500/10 to-amber-950/20 dark:from-amber-500/25 dark:via-amber-950/30 dark:to-[#09090b] border-t-2 border-x border-amber-400 dark:border-amber-500/70 flex flex-col items-center justify-center p-2 relative shadow-lg shadow-amber-500/10">
                            <span className="text-xl sm:text-3xl font-extrabold text-amber-500 dark:text-amber-400 font-mono drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                                1
                            </span>
                        </div>
                    </div>

                    {/* Rank 3 (Right) */}
                    <div className="flex flex-col items-center justify-end text-center group">
                        {/* Member Details */}
                        <div className="flex flex-col items-center mb-2">
                            <Medal className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-500 fill-amber-600/20 mb-1" />
                            <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-tr ${top3.avatarBg} text-amber-100 font-extrabold text-xs sm:text-sm shadow-md ring-2 ring-amber-700/40 mb-1 group-hover:scale-105 transition duration-200`}>
                                {top3.initials}
                            </div>
                            <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate max-w-[105px] sm:max-w-[180px]">
                                {top3.name}
                            </h3>
                            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                                {top3.gmails.toLocaleString('id-ID')} Gmail
                            </p>
                            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5 font-tabular-nums">
                                Rp{top3.earnings.toLocaleString('id-ID')}
                            </p>
                        </div>

                        {/* Pedestal Bar #3 */}
                        <div className="w-full h-14 sm:h-18 rounded-t-xl sm:rounded-t-2xl bg-gradient-to-b from-amber-700/20 via-amber-800/10 to-transparent dark:from-amber-900/30 dark:via-zinc-900/90 dark:to-[#09090b] border-t-2 border-x border-amber-700/50 dark:border-amber-800/60 flex flex-col items-center justify-center p-2 relative shadow-md">
                            <span className="text-lg sm:text-2xl font-extrabold text-amber-700 dark:text-amber-600 font-mono">
                                3
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* LIST TABLE: RANKS #4 TO #10 */}
            <div className="rounded-2xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-[#27272a] shadow-xs overflow-hidden">
                {/* Table Header */}
                <div className="px-4 sm:px-5 py-3 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    <span className="flex-1 min-w-0">Peringkat & Member</span>
                    <div className="flex items-center shrink-0">
                        <span className="hidden sm:inline-block w-32 sm:w-40 text-left">Gmail Diterima</span>
                        <span className="w-28 sm:w-36 text-right">Total Pendapatan</span>
                    </div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-slate-100 dark:divide-zinc-800/80">
                    {restRanks.map((item) => (
                        <div
                            key={item.rank}
                            className="px-4 sm:px-5 py-3 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-[#121215] transition"
                        >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold text-slate-400 dark:text-zinc-500 font-tabular-nums">
                                    #{item.rank}
                                </span>
                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr ${item.avatarBg} text-white font-bold text-xs shadow-2xs`}>
                                    {item.initials}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                                        {item.name}
                                    </p>
                                    <p className="text-[11px] text-slate-400 dark:text-slate-500 sm:hidden">
                                        {item.gmails.toLocaleString('id-ID')} Gmail diterima
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center shrink-0">
                                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-zinc-400 w-32 sm:w-40 text-left">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                                    <span className="font-tabular-nums">{item.gmails.toLocaleString('id-ID')} Gmail</span>
                                </span>
                                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-tabular-nums w-28 sm:w-36 text-right">
                                    Rp{item.earnings.toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* User Rank Row */}
            <div className="rounded-2xl border border-slate-200 dark:border-[#27272a] bg-white dark:bg-[#09090b] px-4 sm:px-5 py-3 shadow-xs flex items-center justify-between transition">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold text-blue-500 dark:text-blue-400 font-tabular-nums">
                        #14
                    </span>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs shadow-2xs">
                        {user ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                                {user ? user.name : 'Anda'}
                            </p>
                            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                                (Anda)
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 sm:hidden">
                            140 Gmail diterima
                        </p>
                    </div>
                </div>

                <div className="flex items-center shrink-0">
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-zinc-400 w-32 sm:w-40 text-left">
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        <span className="font-tabular-nums">140 Gmail</span>
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-tabular-nums w-28 sm:w-36 text-right">
                        Rp630.000
                    </span>
                </div>
            </div>
        </div>
    );
}
