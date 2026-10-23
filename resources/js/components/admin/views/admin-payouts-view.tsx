import { useState } from 'react';
import {
    Check,
    Search,
    X,
} from 'lucide-react';
import { toast } from 'sonner';
import type { AdminPayoutItem, PayoutStatus } from '../types';

interface AdminPayoutsViewProps {
    payoutList: AdminPayoutItem[];
    onApprovePayout: (id: string, note?: string) => void;
    onRejectPayout: (id: string, reason?: string) => void;
}

export function AdminPayoutsView({
    payoutList,
    onApprovePayout,
    onRejectPayout,
}: AdminPayoutsViewProps) {
    const [selectedStatus, setSelectedStatus] = useState<'all' | PayoutStatus>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [confirmPayoutItem, setConfirmPayoutItem] = useState<AdminPayoutItem | null>(null);

    const formatRupiah = (val: number) =>
        'Rp ' + new Intl.NumberFormat('id-ID').format(val);

    const pendingPayouts = payoutList.filter((p) => p.status === 'pending');
    const successPayouts = payoutList.filter((p) => p.status === 'success');
    const rejectedPayouts = payoutList.filter((p) => p.status === 'rejected');

    const totalPendingAmount = pendingPayouts.reduce((acc, curr) => acc + curr.amount, 0);
    const totalSuccessAmount = successPayouts.reduce((acc, curr) => acc + curr.amount, 0);

    const filteredList = payoutList.filter((item) => {
        const matchesStatus =
            selectedStatus === 'all' ? true : item.status === selectedStatus;
        const matchesSearch =
            item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.accountName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getMethodBadgeColor = (method: string) => {
        const m = method.toLowerCase();
        if (m.includes('dana')) return 'bg-[#00C2CB] text-black';
        if (m.includes('ovo')) return 'bg-[#FF00FF] text-black';
        if (m.includes('gopay')) return 'bg-[#A3E635] text-black';
        if (m.includes('shopee')) return 'bg-[#FF8A00] text-black';
        return 'bg-white text-black';
    };

    return (
        <div className="space-y-6">
            {/* Top Summaries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-md border-[3px] border-black bg-white text-black shadow-[6px_6px_0px_0px_#000000]">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-black">
                            Antrian Pencairan Saldo
                        </span>
                        <div className="size-8 rounded-sm border-2 border-black bg-[#FFD700] flex items-center justify-center shadow-[2px_2px_0px_0px_#000000]">
                            <img src="/images/icon/wallet.png" alt="Antrian Pencairan Saldo" className="size-5 object-contain" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="text-3xl font-black font-mono text-black">
                            {formatRupiah(totalPendingAmount)}
                        </div>
                    </div>
                </div>

                <div className="p-5 rounded-md border-[3px] border-black bg-white text-black shadow-[6px_6px_0px_0px_#000000]">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-black">
                            Total Berhasil Ditransfer
                        </span>
                        <div className="size-8 rounded-sm border-2 border-black bg-[#00C2CB] flex items-center justify-center shadow-[2px_2px_0px_0px_#000000]">
                            <img src="/images/icon/checklist.png" alt="Total Berhasil Ditransfer" className="size-5 object-contain" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="text-3xl font-black font-mono text-black">
                            {formatRupiah(totalSuccessAmount + 3250000)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Card */}
            <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                {/* 1. Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-black stroke-[2.5]" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari e-wallet / nomor / nama..."
                        className="w-full rounded-sm border-2 border-black bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm font-bold text-black placeholder:text-neutral-500 shadow-[4px_4px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                    />
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <button
                        type="button"
                        onClick={() => setSelectedStatus('all')}
                        className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedStatus === 'all'
                            ? 'bg-black text-white shadow-[2px_2px_0px_0px_#000000]'
                            : 'bg-white text-black hover:bg-[#F5F5DC]'
                            }`}
                    >
                        Semua ({payoutList.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedStatus('pending')}
                        className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedStatus === 'pending'
                            ? 'bg-[#FFD700] text-black shadow-[2px_2px_0px_0px_#000000]'
                            : 'bg-white text-black hover:bg-[#F5F5DC]'
                            }`}
                    >
                        Pending ({pendingPayouts.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedStatus('success')}
                        className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedStatus === 'success'
                            ? 'bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]'
                            : 'bg-white text-black hover:bg-[#F5F5DC]'
                            }`}
                    >
                        Berhasil ({successPayouts.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedStatus('rejected')}
                        className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedStatus === 'rejected'
                            ? 'bg-[#FF00FF] text-black shadow-[2px_2px_0px_0px_#000000]'
                            : 'bg-white text-black hover:bg-[#F5F5DC]'
                            }`}
                    >
                        Ditolak ({rejectedPayouts.length})
                    </button>
                </div>

                {/* Payouts Table */}
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left text-xs border-2 border-black">
                        <thead>
                            <tr className="bg-[#FFD700] border-b-2 border-black text-black uppercase font-black tracking-wider text-[11px]">
                                <th className="p-3 border-r-2 border-black">ID & Tanggal</th>
                                <th className="p-3 border-r-2 border-black">Pengguna</th>
                                <th className="p-3 border-r-2 border-black">Metode</th>
                                <th className="p-3 border-r-2 border-black">Nomor E-Wallet</th>
                                <th className="p-3 border-r-2 border-black">Atas Nama</th>
                                <th className="p-3 border-r-2 border-black">Nominal</th>
                                <th className="p-3 border-r-2 border-black">Status</th>
                                <th className="p-3 border-r-2 border-black">Keterangan</th>
                                <th className="p-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-black bg-white font-medium">
                            {filteredList.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="p-8 text-center text-xs font-black uppercase tracking-wider text-neutral-500">
                                        Tidak ada transaksi penarikan yang cocok dengan filter.
                                    </td>
                                </tr>
                            ) : (
                                filteredList.map((item) => (
                                    <tr key={item.id} className="hover:bg-[#F5F5DC] transition">
                                        <td className="p-3 border-r-2 border-black font-mono font-bold">
                                            <div className="text-black font-black">{item.id}</div>
                                            <div className="text-[10px] text-neutral-500">
                                                {item.date} {item.time}
                                            </div>
                                        </td>
                                        <td className="p-3 border-r-2 border-black">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={item.userAvatar}
                                                    alt={item.userName}
                                                    className="size-6 rounded-full border border-black bg-[#FFD700] object-contain shrink-0"
                                                />
                                                <div className="truncate max-w-[120px]">
                                                    <div className="font-bold text-black truncate">{item.userName}</div>
                                                    <div className="text-[10px] text-neutral-500 truncate">{item.userEmail}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3 border-r-2 border-black">
                                            <span
                                                className={`inline-flex px-2 py-0.5 rounded-xs border border-black font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000000] ${getMethodBadgeColor(
                                                    item.method,
                                                )}`}
                                            >
                                                {item.method}
                                            </span>
                                        </td>
                                        <td className="p-3 border-r-2 border-black font-mono font-bold text-black select-all">
                                            {item.accountNumber}
                                        </td>
                                        <td className="p-3 border-r-2 border-black font-bold text-black truncate max-w-[130px]">
                                            {item.accountName}
                                        </td>
                                        <td className="p-3 border-r-2 border-black font-mono font-black text-black">
                                            {formatRupiah(item.amount)}
                                        </td>
                                        <td className="p-3 border-r-2 border-black">
                                            {item.status === 'success' ? (
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border border-black bg-[#00C2CB] shadow-[1px_1px_0px_0px_#000000]" title="Selesai">
                                                    <img src="/images/icon/checklist.png" alt="Selesai" className="size-5 object-contain shrink-0" />
                                                </span>
                                            ) : item.status === 'rejected' ? (
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border border-black bg-[#FF00FF] shadow-[1px_1px_0px_0px_#000000]" title="Ditolak">
                                                    <img src="/images/icon/reject.png" alt="Ditolak" className="size-5 object-contain shrink-0" />
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border border-black bg-[#FFD700] shadow-[1px_1px_0px_0px_#000000]" title="Pending">
                                                    <img src="/images/icon/pending.png" alt="Pending" className="size-5 object-contain shrink-0" />
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3 border-r-2 border-black text-xs text-neutral-600 truncate max-w-[130px]">
                                            {item.note || '-'}
                                        </td>
                                        <td className="p-3 text-right">
                                            {item.status === 'pending' ? (
                                                <div className="inline-flex items-center gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => setConfirmPayoutItem(item)}
                                                        title="Konfirmasi Transfer"
                                                        className="size-7 inline-flex items-center justify-center rounded-xs border border-black bg-[#00C2CB] hover:bg-[#00a8b0] text-black shadow-[1px_1px_0px_0px_#000000] cursor-pointer transition"
                                                    >
                                                        <Check className="size-4 stroke-[3]" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (confirm(`Apakah Anda yakin ingin menolak penarikan ${item.id} (${formatRupiah(item.amount)})? Saldo akan dikembalikan ke user.`)) {
                                                                onRejectPayout(item.id, 'Nomor e-wallet tidak valid');
                                                                toast.error(`Penarikan ${item.id} ditolak dan saldo dikembalikan.`);
                                                            }
                                                        }}
                                                        className="size-7 inline-flex items-center justify-center rounded-xs border border-black bg-[#FF00FF] hover:bg-[#e000e0] text-black shadow-[1px_1px_0px_0px_#000000] cursor-pointer transition"
                                                        title="Tolak Penarikan"
                                                    >
                                                        <X className="size-4 stroke-[3]" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-[10px] font-bold text-neutral-400">
                                                    Terselesaikan
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Konfirmasi Transfer Payout */}
            {confirmPayoutItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-150"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setConfirmPayoutItem(null);
                    }}
                >
                    <div className="relative w-full max-w-md bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_#000000] p-6 space-y-4 animate-in zoom-in-95 duration-150 text-black">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b-2 border-black pb-3">
                            <div className="flex items-center gap-2.5">
                                <img
                                    src="/images/icon/checklist.png"
                                    alt="Konfirmasi Transfer"
                                    className="size-6 object-contain shrink-0"
                                />
                                <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-black">
                                    Konfirmasi Transfer
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setConfirmPayoutItem(null)}
                                className="size-7 inline-flex items-center justify-center rounded-xs border-2 border-black bg-white hover:bg-[#FF00FF] text-black shadow-[2px_2px_0px_0px_#000000] cursor-pointer transition"
                            >
                                <X className="size-4 stroke-[3]" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="space-y-3">
                            <p className="text-xs font-bold text-neutral-800 leading-relaxed">
                                Apakah Anda yakin ingin menyetujui dan menandai penarikan saldo ini sebagai <strong className="font-black text-black">berhasil ditransfer</strong>?
                            </p>

                            {/* Detail Payout Card */}
                            <div className="p-3.5 bg-[#F5F5DC] border-2 border-black shadow-[3px_3px_0px_0px_#000000] space-y-2 rounded-xs">
                                <div className="flex items-center justify-between border-b border-black/20 pb-2">
                                    <span className="text-[11px] font-black uppercase text-neutral-600">ID Transaksi</span>
                                    <span className="text-xs font-mono font-black text-black">{confirmPayoutItem.id}</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-black/20 pb-2">
                                    <span className="text-[11px] font-black uppercase text-neutral-600">Penerima</span>
                                    <div className="text-right">
                                        <div className="text-xs font-black text-black">{confirmPayoutItem.userName}</div>
                                        <div className="text-[10px] text-neutral-600">{confirmPayoutItem.userEmail}</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-b border-black/20 pb-2">
                                    <span className="text-[11px] font-black uppercase text-neutral-600">Tujuan E-Wallet</span>
                                    <div className="text-right">
                                        <span className="inline-flex px-1.5 py-0.2 rounded-xs border border-black font-black text-[10px] uppercase bg-white">
                                            {confirmPayoutItem.method}
                                        </span>
                                        <div className="text-xs font-mono font-black text-black mt-0.5 select-all">
                                            {confirmPayoutItem.accountNumber}
                                        </div>
                                        <div className="text-[10px] font-bold text-neutral-700">
                                            a.n {confirmPayoutItem.accountName}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-1">
                                    <span className="text-xs font-black uppercase text-black">Nominal Transfer</span>
                                    <span className="text-base font-black font-mono text-emerald-700">
                                        {formatRupiah(confirmPayoutItem.amount)}
                                    </span>
                                </div>
                            </div>

                            <p className="text-[10px] font-bold text-neutral-600 leading-tight">
                                Pastikan dana sudah berhasil ditransfer ke nomor e-wallet penerima sebelum mengonfirmasi.
                            </p>
                        </div>

                        {/* Modal Action Buttons */}
                        <div className="flex items-center justify-end gap-2 pt-3 border-t-2 border-black">
                            <button
                                type="button"
                                onClick={() => setConfirmPayoutItem(null)}
                                className="px-4 py-2 rounded-xs text-xs font-black uppercase tracking-wider border-2 border-black bg-white hover:bg-neutral-100 text-black shadow-[2px_2px_0px_0px_#000000] cursor-pointer transition"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    onApprovePayout(confirmPayoutItem.id, `Transfer ${confirmPayoutItem.method} berhasil diproses.`);
                                    toast.success(`Penarikan ${formatRupiah(confirmPayoutItem.amount)} untuk ${confirmPayoutItem.userName} telah disetujui!`);
                                    setConfirmPayoutItem(null);
                                }}
                                className="px-4 py-2 rounded-xs text-xs font-black uppercase tracking-wider border-2 border-black bg-[#00C2CB] hover:bg-[#00a8b0] text-black shadow-[2px_2px_0px_0px_#000000] cursor-pointer transition flex items-center gap-1.5"
                            >
                                <span>Konfirmasi</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
