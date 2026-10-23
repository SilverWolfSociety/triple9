import { useState } from 'react';
import {
    Check,
    Search,
    X,
} from 'lucide-react';
import { toast } from 'sonner';
import { AdminChartCard } from './admin-chart-card';
import type {
    AdminNavId,
    AdminPayoutItem,
    AdminSetoranItem,
    AdminTicketItem,
    AdminUserItem,
    PlatformSettings,
} from '../types';

interface AdminOverviewViewProps {
    onNavigate: (id: AdminNavId) => void;
    setoranList: AdminSetoranItem[];
    payoutList: AdminPayoutItem[];
    usersList: AdminUserItem[];
    ticketsList?: AdminTicketItem[];
    settings?: PlatformSettings;
    onApproveSetoran: (id: string) => void;
    onRejectSetoran: (id: string, reason?: string) => void;
    onCheckSetoran?: (id: string) => void;
}

export function AdminOverviewView({
    onNavigate,
    setoranList,
    payoutList,
    usersList,
    settings,
    onApproveSetoran,
    onRejectSetoran,
    onCheckSetoran,
}: AdminOverviewViewProps) {
    const pendingSetoran = setoranList.filter((s) => s.status === 'pending' || s.status === 'dicek');
    const validSetoran = setoranList.filter((s) => s.status === 'diterima' || s.status === 'valid');
    const pendingPayouts = payoutList.filter((p) => p.status === 'pending');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(pendingSetoran.length / itemsPerPage) || 1;
    const paginatedSetoran = pendingSetoran.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const totalPayoutAmount = payoutList
        .filter((p) => p.status === 'success')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const pendingPayoutAmount = pendingPayouts.reduce(
        (acc, curr) => acc + curr.amount,
        0,
    );

    const formatRupiah = (val: number) =>
        'Rp ' + new Intl.NumberFormat('id-ID').format(val);

    return (
        <div className="space-y-6">
            {/* Top 4 Neo-Brutalist Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Total Setoran */}
                <div
                    onClick={() => onNavigate('setoran')}
                    className="p-5 rounded-md border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000000] transition cursor-pointer flex flex-col justify-between text-black"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-black">
                            Total Setoran Akun
                        </span>
                        <div className="size-8 rounded-sm border-2 border-black bg-[#00C2CB] flex items-center justify-center shadow-[2px_2px_0px_0px_#000000]">
                            <img src="/images/icon/mail.png" alt="Total Setoran Akun" className="size-5 object-contain" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="text-3xl font-black font-mono text-black">
                            1.482
                        </div>
                    </div>
                </div>

                {/* 2. Pending Verification */}
                <div
                    onClick={() => onNavigate('setoran')}
                    className="p-5 rounded-md border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000000] transition cursor-pointer flex flex-col justify-between text-black"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-black">
                            Perlu Verifikasi
                        </span>
                        <div className="size-8 rounded-sm border-2 border-black bg-[#FFD700] flex items-center justify-center shadow-[2px_2px_0px_0px_#000000]">
                            <img src="/images/icon/pending.png" alt="Perlu Verifikasi" className="size-5 object-contain" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="text-3xl font-black font-mono text-black">
                            {pendingSetoran.length}
                        </div>
                    </div>
                </div>

                {/* 3. Total Payout Reward */}
                <div
                    onClick={() => onNavigate('payouts')}
                    className="p-5 rounded-md border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000000] transition cursor-pointer flex flex-col justify-between text-black"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-black">
                            Payout Dibayarkan
                        </span>
                        <div className="size-8 rounded-sm border-2 border-black bg-[#FF00FF] flex items-center justify-center shadow-[2px_2px_0px_0px_#000000]">
                            <img src="/images/icon/wallet.png" alt="Payout Dibayarkan" className="size-5 object-contain" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="text-2xl sm:text-3xl font-black font-mono text-black">
                            {formatRupiah(totalPayoutAmount + 3250000)}
                        </div>
                    </div>
                </div>

                {/* 4. Total Users */}
                <div
                    onClick={() => onNavigate('users')}
                    className="p-5 rounded-md border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000000] transition cursor-pointer flex flex-col justify-between text-black"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-black">
                            Total Pengguna
                        </span>
                        <div className="size-8 rounded-sm border-2 border-black bg-[#F5F5DC] flex items-center justify-center shadow-[2px_2px_0px_0px_#000000]">
                            <img src="/images/icon/person_yellow.png" alt="Total Pengguna" className="size-5 object-contain" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="text-3xl font-black font-mono text-black">
                            {usersList.length + 248}
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Analytics & Performance Chart Card */}
            <AdminChartCard />

            {/* Setoran Terbaru yang Membutuhkan Verifikasi */}
            <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                    <div>
                        <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-black">
                            Setoran Gmail
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={() => onNavigate('setoran')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-[#00C2CB] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer uppercase tracking-wider"
                    >
                        <span>Lihat Semua</span>
                    </button>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left text-xs border-2 border-black">
                        <thead>
                            <tr className="bg-[#FFD700] border-b-2 border-black text-black uppercase font-black tracking-wider text-[11px]">
                                <th className="p-3 border-r-2 border-black">ID & Waktu</th>
                                <th className="p-3 border-r-2 border-black">Pengguna</th>
                                <th className="p-3 border-r-2 border-black">Akun Gmail</th>
                                <th className="p-3 border-r-2 border-black">Password</th>
                                <th className="p-3 border-r-2 border-black">Reward</th>
                                <th className="p-3 border-r-2 border-black">Status</th>
                                <th className="p-3 text-right">Aksi Cepat</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-black bg-white font-medium">
                            {paginatedSetoran.map((item) => (
                                <tr key={item.id} className="hover:bg-[#F5F5DC] transition">
                                    <td className="p-3 border-r-2 border-black font-mono font-bold">
                                        <div className="text-black font-black">{item.id}</div>
                                        <div className="text-[10px] text-neutral-500">{item.time} WIB</div>
                                    </td>
                                    <td className="p-3 border-r-2 border-black">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={item.userAvatar}
                                                alt={item.userName}
                                                className="size-6 rounded-full border border-black bg-[#FFD700] object-contain shrink-0"
                                            />
                                            <div className="truncate max-w-[130px]">
                                                <div className="font-bold text-black truncate">{item.userName}</div>
                                                <div className="text-[10px] text-neutral-500 truncate">{item.userEmail}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3 border-r-2 border-black font-mono font-bold text-black select-all">
                                        {item.email}
                                    </td>
                                    <td className="p-3 border-r-2 border-black font-mono text-neutral-700 select-all">
                                        {item.password}
                                    </td>
                                    <td className="p-3 border-r-2 border-black font-mono font-black text-black">
                                        {formatRupiah(item.reward)}
                                    </td>
                                    <td className="p-3 border-r-2 border-black">
                                        {item.status === 'dicek' ? (
                                            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border border-black bg-[#F5F5DC] shadow-[1px_1px_0px_0px_#000000]" title="Di Cek">
                                                <img src="/images/icon/find.png" alt="Di Cek" className="size-5 object-contain shrink-0" />
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border border-black bg-[#FFD700] shadow-[1px_1px_0px_0px_#000000]" title="Menunggu">
                                                <img src="/images/icon/pending.png" alt="Menunggu" className="size-5 object-contain shrink-0" />
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3 text-right">
                                        <div className="inline-flex items-center gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    onApproveSetoran(item.id);
                                                    toast.success(`Akun ${item.email} diterima & saldo Rp ${item.reward} ditambahkan.`);
                                                }}
                                                title="Terima Setoran & Bayar Saldo"
                                                className="size-7 inline-flex items-center justify-center rounded-xs border border-black bg-[#00C2CB] hover:bg-[#00a8b0] text-black shadow-[1px_1px_0px_0px_#000000] cursor-pointer transition"
                                            >
                                                <Check className="size-4 stroke-[3]" />
                                            </button>
                                            {item.status === 'pending' && onCheckSetoran && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        onCheckSetoran(item.id);
                                                        toast.info(`Akun ${item.email} ditandai sedang dicek.`);
                                                    }}
                                                    title="Tandai Sedang Di Cek"
                                                    className="size-7 inline-flex items-center justify-center rounded-xs border border-black bg-[#F5F5DC] hover:bg-[#e6e6cc] text-black shadow-[1px_1px_0px_0px_#000000] cursor-pointer transition"
                                                >
                                                    <Search className="size-4 stroke-[3]" />
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    onRejectSetoran(item.id, 'Password salah / tidak valid');
                                                    toast.error(`Setoran ${item.email} ditolak.`);
                                                }}
                                                title="Tolak Setoran"
                                                className="size-7 inline-flex items-center justify-center rounded-xs border border-black bg-[#FF00FF] hover:bg-[#e000e0] text-black shadow-[1px_1px_0px_0px_#000000] cursor-pointer transition"
                                            >
                                                <X className="size-4 stroke-[3]" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-2 border-t border-black/10 text-xs font-black">
                        <span className="text-neutral-600 text-[11px] uppercase tracking-wider font-bold">
                            Halaman {currentPage} dari {totalPages} ({pendingSetoran.length} akun)
                        </span>
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                className="px-2.5 py-1 rounded-xs border-2 border-black bg-white hover:bg-[#F5F5DC] disabled:opacity-40 disabled:cursor-not-allowed shadow-[1px_1px_0px_0px_#000000] cursor-pointer text-[11px] font-black uppercase tracking-wider transition"
                            >
                                Prev
                            </button>
                            <span className="px-2 py-1 text-black font-mono font-bold text-xs">
                                {currentPage} / {totalPages}
                            </span>
                            <button
                                type="button"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                className="px-2.5 py-1 rounded-xs border-2 border-black bg-white hover:bg-[#F5F5DC] disabled:opacity-40 disabled:cursor-not-allowed shadow-[1px_1px_0px_0px_#000000] cursor-pointer text-[11px] font-black uppercase tracking-wider transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
