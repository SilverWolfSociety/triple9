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

    const waitingCount = ticketsList.filter((t) => t.status === 'waiting').length;
    const inProgressCount = ticketsList.filter((t) => t.status === 'in_progress').length;
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

    return (
        <div className="space-y-6">
            {/* Control Card */}
            <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b-2 border-black pb-4">
                    <div>
                        <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-black">
                            Kelola Tiket Bantuan & CS
                        </h2>
                    </div>

                    {/* Search */}
                    <div className="relative min-w-[220px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-black" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari tiket / user / kendala..."
                            className="w-full pl-9 pr-3 py-1.5 rounded-none border-2 border-black bg-white text-xs font-bold text-black placeholder:text-black/40 shadow-[2px_2px_0px_0px_#000000] focus:outline-none"
                        />
                    </div>
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
                        onClick={() => setSelectedStatus('waiting')}
                        className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedStatus === 'waiting'
                                ? 'bg-[#FFD700] text-black shadow-[2px_2px_0px_0px_#000000]'
                                : 'bg-white text-black hover:bg-[#F5F5DC]'
                            }`}
                    >
                        Menunggu Respon ({waitingCount})
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedStatus('in_progress')}
                        className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedStatus === 'in_progress'
                                ? 'bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]'
                                : 'bg-white text-black hover:bg-[#F5F5DC]'
                            }`}
                    >
                        Diproses ({inProgressCount})
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedStatus('resolved')}
                        className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedStatus === 'resolved'
                                ? 'bg-white text-black font-black border-black shadow-[2px_2px_0px_0px_#000000]'
                                : 'bg-white text-black hover:bg-[#F5F5DC]'
                            }`}
                    >
                        Selesai ({resolvedCount})
                    </button>
                </div>
            </div>

            {/* Tickets Table */}
            <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left text-xs border-2 border-black">
                        <thead>
                            <tr className="bg-[#FFD700] border-b-2 border-black text-black uppercase font-black tracking-wider text-[11px]">
                                <th className="p-3 border-r-2 border-black">No Tiket</th>
                                <th className="p-3 border-r-2 border-black">Pengirim</th>
                                <th className="p-3 border-r-2 border-black">Kategori</th>
                                <th className="p-3 border-r-2 border-black">Subjek & Pesan</th>
                                <th className="p-3 border-r-2 border-black">Waktu</th>
                                <th className="p-3 border-r-2 border-black">Status</th>
                                <th className="p-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-black bg-white font-medium">
                            {filteredTickets.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-xs font-black uppercase tracking-wider text-neutral-500">
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
                                            <span className="inline-flex px-2 py-0.5 rounded-xs border border-black bg-[#F5F5DC] text-black font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000000]">
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
                                        <td className="p-3 border-r-2 border-black whitespace-nowrap">
                                            {item.status === 'waiting' ? (
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border border-black bg-[#FFD700] shadow-[1px_1px_0px_0px_#000000]" title="Menunggu Respon">
                                                    <img src="/images/icon/pending.png" alt="Menunggu Respon" className="size-5 object-contain shrink-0" />
                                                </span>
                                            ) : item.status === 'in_progress' ? (
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border border-black bg-[#F5F5DC] shadow-[1px_1px_0px_0px_#000000]" title="Diproses">
                                                    <img src="/images/icon/find.png" alt="Diproses" className="size-5 object-contain shrink-0" />
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border border-black bg-[#00C2CB] shadow-[1px_1px_0px_0px_#000000]" title="Selesai">
                                                    <img src="/images/icon/checklist.png" alt="Selesai" className="size-5 object-contain shrink-0" />
                                                </span>
                                            )}
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
