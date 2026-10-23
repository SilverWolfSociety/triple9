import { useState } from 'react';
import {
    CheckCircle,
    Search,
} from 'lucide-react';
import { toast } from 'sonner';
import type { AdminTicketItem, TicketStatus } from '../types';

interface AdminSupportViewProps {
    ticketsList: AdminTicketItem[];
    onOpenReplyModal: (ticket: AdminTicketItem) => void;
    onCloseTicket: (ticketId: string) => void;
}

export function AdminSupportView({
    ticketsList,
    onOpenReplyModal,
    onCloseTicket,
}: AdminSupportViewProps) {
    const [selectedStatus, setSelectedStatus] = useState<'all' | TicketStatus>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const resolvedCount = ticketsList.filter((t) => t.status === 'resolved').length;

    const filteredTickets = ticketsList.filter((t) => {
        const matchesStatus =
            selectedStatus === 'all' ? true : t.status === selectedStatus;
        const matchesSearch =
            t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getCategoryBadgeColor = (category: string) => {
        const c = category.toLowerCase();
        if (c.includes('setor')) return 'bg-[#00C2CB] text-black'; // Cyan / Toska (seperti DANA)
        if (c.includes('tarik') || c.includes('saldo') || c.includes('payout')) return 'bg-[#FF00FF] text-black'; // Magenta (seperti OVO)
        if (c.includes('pertanyaan') || c.includes('umum')) return 'bg-[#A3E635] text-black'; // Lime Green (seperti GOPAY)
        if (c.includes('akun') || c.includes('keamanan') || c.includes('login')) return 'bg-[#FF8A00] text-black'; // Orange (seperti ShopeePay)
        return 'bg-[#FFD700] text-black';
    };

    return (
        <div className="space-y-6">
            {/* Control Card */}
            <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                {/* 1. Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-black stroke-[2.5]" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari tiket / user / kendala..."
                        className="w-full rounded-sm border-2 border-black bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm font-bold text-black placeholder:text-neutral-500 shadow-[4px_4px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                    />
                </div>

                {/* Filter Status */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <button
                        type="button"
                        onClick={() => setSelectedStatus('all')}
                        className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedStatus === 'all'
                                ? 'bg-black text-white shadow-[2px_2px_0px_0px_#000000]'
                                : 'bg-white text-black hover:bg-[#F5F5DC]'
                            }`}
                    >
                        Semua Tiket ({ticketsList.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedStatus('resolved')}
                        className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedStatus === 'resolved'
                                ? 'bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]'
                                : 'bg-white text-black hover:bg-[#F5F5DC]'
                            }`}
                    >
                        Selesai ({resolvedCount})
                    </button>
                </div>

                {/* Tickets Table */}
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left text-xs border-2 border-black">
                        <thead>
                            <tr className="bg-[#FFD700] border-b-2 border-black text-black uppercase font-black tracking-wider text-[11px]">
                                <th className="p-3 border-r-2 border-black">No Tiket</th>
                                <th className="p-3 border-r-2 border-black">Pengirim</th>
                                <th className="p-3 border-r-2 border-black">Kategori</th>
                                <th className="p-3 border-r-2 border-black">Subjek & Pesan</th>
                                <th className="p-3 border-r-2 border-black">Waktu</th>
                                <th className="p-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-black bg-white font-medium">
                            {filteredTickets.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-xs font-black uppercase tracking-wider text-neutral-500">
                                        Tidak ada tiket bantuan yang ditemukan.
                                    </td>
                                </tr>
                            ) : (
                                filteredTickets.map((item) => (
                                    <tr key={item.id} className="hover:bg-[#F5F5DC] transition">
                                        <td className="p-3 border-r-2 border-black font-mono font-black text-black">
                                            {item.ticketNumber}
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
                                                className={`inline-flex px-2 py-0.5 rounded-xs border border-black font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000000] ${getCategoryBadgeColor(
                                                    item.category,
                                                )}`}
                                            >
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="p-3 border-r-2 border-black max-w-sm">
                                            <div className="font-black text-black truncate">{item.subject}</div>
                                            <div className="text-[11px] text-neutral-600 line-clamp-1 mt-0.5">
                                                {item.message}
                                            </div>
                                        </td>
                                        <td className="p-3 border-r-2 border-black font-mono text-[11px] text-neutral-600 whitespace-nowrap">
                                            {item.date} {item.time}
                                        </td>
                                        <td className="p-3 text-right whitespace-nowrap">
                                            <div className="inline-flex items-center gap-1.5">
                                                <button
                                                    type="button"
                                                    onClick={() => onOpenReplyModal(item)}
                                                    title={`Balas (${item.replies.length})`}
                                                    className="size-7 inline-flex items-center justify-center rounded-xs border border-black bg-[#00C2CB] hover:bg-[#00a8b0] text-black shadow-[1px_1px_0px_0px_#000000] cursor-pointer transition"
                                                >
                                                    <img src="/images/icon/message.png" alt="Balas" className="size-4.5 object-contain" />
                                                </button>
                                                {item.status !== 'resolved' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            onCloseTicket(item.id);
                                                            toast.success(`Tiket ${item.ticketNumber} ditandai selesai.`);
                                                        }}
                                                        className="size-7 inline-flex items-center justify-center rounded-xs border border-black bg-white hover:bg-[#FFD700] text-black shadow-[1px_1px_0px_0px_#000000] cursor-pointer transition"
                                                        title="Tandai Selesai"
                                                    >
                                                        <CheckCircle className="size-4 stroke-[2.5]" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
