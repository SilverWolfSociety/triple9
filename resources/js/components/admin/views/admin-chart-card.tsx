import { useState } from 'react';
import {
    ArrowUpRight,
} from 'lucide-react';

interface DailyDataPoint {
    day: string;
    date: string;
    diterima: number;
    ditolak: number;
    pending: number;
    totalAkun: number;
    payoutRupiah: number;
}

const sevenDaysData: DailyDataPoint[] = [
    { day: 'Jum', date: '16 Okt', diterima: 135, ditolak: 8, pending: 4, totalAkun: 147, payoutRupiah: 337500 },
    { day: 'Sab', date: '17 Okt', diterima: 172, ditolak: 10, pending: 6, totalAkun: 188, payoutRupiah: 430000 },
    { day: 'Min', date: '18 Okt', diterima: 205, ditolak: 12, pending: 8, totalAkun: 225, payoutRupiah: 512500 },
    { day: 'Sen', date: '19 Okt', diterima: 194, ditolak: 9, pending: 7, totalAkun: 210, payoutRupiah: 485000 },
    { day: 'Sel', date: '20 Okt', diterima: 238, ditolak: 14, pending: 8, totalAkun: 260, payoutRupiah: 595000 },
    { day: 'Rab', date: '21 Okt', diterima: 254, ditolak: 11, pending: 10, totalAkun: 275, payoutRupiah: 635000 },
    { day: 'Kam', date: '22 Okt (Hari ini)', diterima: 232, ditolak: 8, pending: 12, totalAkun: 252, payoutRupiah: 580000 },
];

const thirtyDaysData: DailyDataPoint[] = [
    { day: 'Mgg 1', date: '25 Sep - 01 Okt', diterima: 980, ditolak: 52, pending: 15, totalAkun: 1047, payoutRupiah: 2450000 },
    { day: 'Mgg 2', date: '02 Okt - 08 Okt', diterima: 1140, ditolak: 64, pending: 22, totalAkun: 1226, payoutRupiah: 2850000 },
    { day: 'Mgg 3', date: '09 Okt - 15 Okt', diterima: 1320, ditolak: 71, pending: 28, totalAkun: 1419, payoutRupiah: 3300000 },
    { day: 'Mgg 4', date: '16 Okt - 22 Okt', diterima: 1430, ditolak: 72, pending: 55, totalAkun: 1557, payoutRupiah: 3575000 },
];

export function AdminChartCard() {
    const [timeframe, setTimeframe] = useState<'7d' | '30d'>('7d');
    const [metric, setMetric] = useState<'setoran' | 'payout'>('setoran');
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    const activeData = timeframe === '7d' ? sevenDaysData : thirtyDaysData;

    // Calculate max value for scaling
    const maxVal = Math.max(
        ...activeData.map((d) => (metric === 'setoran' ? d.totalAkun : d.payoutRupiah)),
    );
    const chartHeight = 180; // px
    const chartMax = Math.ceil(maxVal * 1.15);

    // Summary calculation
    const totalSetoranPeriod = activeData.reduce((acc, curr) => acc + curr.totalAkun, 0);
    const totalPayoutPeriod = activeData.reduce((acc, curr) => acc + curr.payoutRupiah, 0);
    const totalApproved = activeData.reduce((acc, curr) => acc + curr.diterima, 0);
    const approvalRate = totalSetoranPeriod > 0 ? ((totalApproved / totalSetoranPeriod) * 100).toFixed(1) : '0';

    const formatRupiah = (val: number) =>
        'Rp ' + new Intl.NumberFormat('id-ID').format(val);

    return (
        <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-5 text-black">
            {/* Header: Judul & Filter Toggles */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black pb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="size-8 rounded-sm border-2 border-black bg-[#FFD700] flex items-center justify-center shadow-[2px_2px_0px_0px_#000000]">
                            <img src="/images/icon/chart.png" alt="Grafik Statistik" className="size-5.5 object-contain" />
                        </div>
                        <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-black">
                            Grafik Statistik & Tren Performa
                        </h3>
                    </div>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap items-center gap-2">
                    {/* Metric Switch */}
                    <div className="inline-flex rounded-sm border-2 border-black p-0.5 bg-neutral-100 shadow-[2px_2px_0px_0px_#000000]">
                        <button
                            type="button"
                            onClick={() => setMetric('setoran')}
                            className={`px-3 py-1 rounded-xs text-xs font-black uppercase tracking-wider transition cursor-pointer ${metric === 'setoran'
                                ? 'bg-[#00C2CB] text-black border border-black shadow-[1px_1px_0px_0px_#000000]'
                                : 'text-neutral-700 hover:text-black'
                                }`}
                        >
                            Setoran Akun
                        </button>
                        <button
                            type="button"
                            onClick={() => setMetric('payout')}
                            className={`px-3 py-1 rounded-xs text-xs font-black uppercase tracking-wider transition cursor-pointer ${metric === 'payout'
                                ? 'bg-[#FF00FF] text-black border border-black shadow-[1px_1px_0px_0px_#000000]'
                                : 'text-neutral-700 hover:text-black'
                                }`}
                        >
                            Payout
                        </button>
                    </div>

                    {/* Timeframe Switch */}
                    <div className="inline-flex rounded-sm border-2 border-black p-0.5 bg-neutral-100 shadow-[2px_2px_0px_0px_#000000]">
                        <button
                            type="button"
                            onClick={() => {
                                setTimeframe('7d');
                                setHoveredIdx(null);
                            }}
                            className={`px-2.5 py-1 rounded-xs text-xs font-black uppercase tracking-wider transition cursor-pointer ${timeframe === '7d'
                                ? 'bg-[#FFD700] text-black border border-black shadow-[1px_1px_0px_0px_#000000]'
                                : 'text-neutral-700 hover:text-black'
                                }`}
                        >
                            7 Hari
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setTimeframe('30d');
                                setHoveredIdx(null);
                            }}
                            className={`px-2.5 py-1 rounded-xs text-xs font-black uppercase tracking-wider transition cursor-pointer ${timeframe === '30d'
                                ? 'bg-[#FFD700] text-black border border-black shadow-[1px_1px_0px_0px_#000000]'
                                : 'text-neutral-700 hover:text-black'
                                }`}
                        >
                            30 Hari
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick KPI Summary Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-sm border-2 border-black bg-[#F5F5DC] shadow-[2px_2px_0px_0px_#000000]">
                    <div className="text-[10px] font-black uppercase tracking-wider text-neutral-600">
                        Total {timeframe === '7d' ? '7 Hari' : '30 Hari'}
                    </div>
                    <div className="text-lg font-black font-mono text-black mt-0.5">
                        {metric === 'setoran' ? `${totalSetoranPeriod} Akun` : formatRupiah(totalPayoutPeriod)}
                    </div>
                </div>
                <div className="p-3 rounded-sm border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000000]">
                    <div className="text-[10px] font-black uppercase tracking-wider text-neutral-600">
                        Rata-Rata {timeframe === '7d' ? 'Harian' : 'Mingguan'}
                    </div>
                    <div className="text-lg font-black font-mono text-black mt-0.5">
                        {metric === 'setoran'
                            ? `${Math.round(totalSetoranPeriod / activeData.length)} Akun`
                            : formatRupiah(Math.round(totalPayoutPeriod / activeData.length))}
                    </div>
                </div>
                <div className="p-3 rounded-sm border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000000]">
                    <div className="text-[10px] font-black uppercase tracking-wider text-neutral-600">
                        Approval Rate
                    </div>
                    <div className="text-lg font-black font-mono text-black mt-0.5 flex items-center gap-1">
                        <span>{approvalRate}%</span>
                        <ArrowUpRight className="size-4 text-emerald-600 stroke-[3]" />
                    </div>
                </div>
                <div className="p-3 rounded-sm border-2 border-black bg-[#00C2CB] shadow-[2px_2px_0px_0px_#000000]">
                    <div className="text-[10px] font-black uppercase tracking-wider text-black">
                        Tren Pertumbuhan
                    </div>
                    <div className="text-lg font-black font-mono text-black mt-0.5">
                        +18.4% ▲
                    </div>
                </div>
            </div>

            {/* Interactive Chart Container */}
            <div className="relative pt-4 pb-2 border-2 border-black rounded-sm bg-[#FAF9F6] p-4 shadow-[3px_3px_0px_0px_#000000]">
                {/* Y-axis guidelines */}
                <div className="absolute inset-x-4 top-4 bottom-10 flex flex-col justify-between pointer-events-none opacity-30">
                    <div className="border-b border-dashed border-black w-full" />
                    <div className="border-b border-dashed border-black w-full" />
                    <div className="border-b border-dashed border-black w-full" />
                    <div className="border-b border-dashed border-black w-full" />
                </div>

                {/* SVG & Bars Area */}
                <div className="relative h-[200px] flex items-end justify-between gap-2 sm:gap-6 px-2 sm:px-6 z-10">
                    {activeData.map((d, idx) => {
                        const val = metric === 'setoran' ? d.totalAkun : d.payoutRupiah;
                        const heightPct = Math.min(100, Math.max(12, (val / chartMax) * 100));
                        const isHovered = hoveredIdx === idx;

                        return (
                            <div
                                key={d.day}
                                className="relative flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                                onMouseEnter={() => setHoveredIdx(idx)}
                                onMouseLeave={() => setHoveredIdx(null)}
                            >
                                {/* Tooltip on Hover */}
                                {isHovered && (
                                    <div className="absolute -top-20 z-30 pointer-events-none whitespace-nowrap rounded-sm border-2 border-black bg-white p-2.5 text-xs shadow-[4px_4px_0px_0px_#000000] animate-in fade-in zoom-in-95 duration-150">
                                        <div className="font-black text-black border-b border-black pb-1 mb-1 text-[11px]">
                                            {d.day} • {d.date}
                                        </div>
                                        {metric === 'setoran' ? (
                                            <div className="space-y-0.5 font-mono text-[11px]">
                                                <div className="text-black font-bold flex items-center justify-between gap-3">
                                                    <span>Total Setor:</span>
                                                    <span className="font-black">{d.totalAkun} akun</span>
                                                </div>
                                                <div className="text-emerald-700 flex items-center justify-between gap-3">
                                                    <span>Diterima:</span>
                                                    <span className="font-bold">{d.diterima}</span>
                                                </div>
                                                <div className="text-amber-700 flex items-center justify-between gap-3">
                                                    <span>Menunggu:</span>
                                                    <span className="font-bold">{d.pending}</span>
                                                </div>
                                                <div className="text-rose-700 flex items-center justify-between gap-3">
                                                    <span>Ditolak:</span>
                                                    <span className="font-bold">{d.ditolak}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="font-mono text-[11px] font-black text-black">
                                                Payout: {formatRupiah(d.payoutRupiah)}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Bar Element with Neo-Brutalist Border & Drop Shadow */}
                                <div
                                    style={{ height: `${heightPct}%` }}
                                    className={`w-full max-w-[48px] rounded-xs border-2 border-black transition-all duration-200 flex flex-col justify-end overflow-hidden ${metric === 'setoran'
                                        ? isHovered
                                            ? 'bg-[#00C2CB] shadow-[4px_4px_0px_0px_#000000] -translate-y-1'
                                            : 'bg-[#00C2CB] shadow-[2px_2px_0px_0px_#000000]'
                                        : isHovered
                                            ? 'bg-[#FF00FF] shadow-[4px_4px_0px_0px_#000000] -translate-y-1'
                                            : 'bg-[#FF00FF] shadow-[2px_2px_0px_0px_#000000]'
                                        }`}
                                >
                                    {/* Sub-breakdown pattern for setoran */}
                                    {metric === 'setoran' && (
                                        <div className="w-full flex flex-col justify-end h-full">
                                            {/* Ditolak segment */}
                                            {d.ditolak > 0 && (
                                                <div
                                                    style={{ height: `${(d.ditolak / d.totalAkun) * 100}%` }}
                                                    className="w-full bg-[#FF00FF] border-b border-black"
                                                    title={`Ditolak: ${d.ditolak}`}
                                                />
                                            )}
                                            {/* Pending segment */}
                                            {d.pending > 0 && (
                                                <div
                                                    style={{ height: `${(d.pending / d.totalAkun) * 100}%` }}
                                                    className="w-full bg-[#FFD700] border-b border-black"
                                                    title={`Menunggu: ${d.pending}`}
                                                />
                                            )}
                                            {/* Diterima segment is the rest */}
                                            <div className="w-full flex-1 bg-[#00C2CB]" />
                                        </div>
                                    )}
                                </div>

                                {/* Value above bar on hover */}
                                <div className="text-[10px] font-mono font-bold text-neutral-800 mt-1.5 truncate">
                                    {metric === 'setoran'
                                        ? d.totalAkun
                                        : `${Math.round(d.payoutRupiah / 1000)}k`}
                                </div>

                                {/* X-axis Label */}
                                <div className="text-[11px] font-black uppercase text-black mt-0.5">
                                    {d.day}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Legend & Insights */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                {metric === 'setoran' ? (
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1.5 font-bold text-neutral-800 text-[11px]">
                            <span className="size-3 rounded-xs border border-black bg-[#00C2CB] shadow-[1px_1px_0px_0px_#000000]" />
                            <span>Diterima</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-bold text-neutral-800 text-[11px]">
                            <span className="size-3 rounded-xs border border-black bg-[#FFD700] shadow-[1px_1px_0px_0px_#000000]" />
                            <span>Menunggu</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-bold text-neutral-800 text-[11px]">
                            <span className="size-3 rounded-xs border border-black bg-[#FF00FF] shadow-[1px_1px_0px_0px_#000000]" />
                            <span>Ditolak</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 font-bold text-neutral-800 text-[11px]">
                        <span className="size-3 rounded-xs border border-black bg-[#FF00FF] shadow-[1px_1px_0px_0px_#000000]" />
                        <span>Total Payout Reward Dibayarkan</span>
                    </div>
                )}
            </div>
        </div>
    );
}
