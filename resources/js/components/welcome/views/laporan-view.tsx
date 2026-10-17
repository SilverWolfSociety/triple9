import { useState } from 'react';
import { Ticket, TicketPlus, CheckCircle2, Clock } from 'lucide-react';
import type { TicketRecord } from '../types';
import { CreateTicketModal } from '../modals/create-ticket-modal';

interface LaporanViewProps {
    userName?: string;
}

export function LaporanView({ userName }: LaporanViewProps) {
    const [tickets, setTickets] = useState<TicketRecord[]>([]);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);

    const handleCreateTicket = (data: { title: string; category: string; message: string }) => {
        const newTicket: TicketRecord = {
            id: `ticket-${Date.now()}`,
            title: data.title,
            category: data.category,
            message: data.message,
            date: new Date().toISOString().split('T')[0],
            status: 'menunggu',
        };
        setTickets((prev) => [newTicket, ...prev]);
        setSelectedTicketId(newTicket.id);
    };

    const selectedTicket = tickets.find((t) => t.id === selectedTicketId);

    return (
        <div className="w-full space-y-4 sm:space-y-5">
            {/* Top Header Bar */}
            <div className="rounded-2xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-[#27272a] px-5 min-h-[68px] sm:h-18 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 py-3.5 sm:py-0">
                <div className="flex items-center gap-3">
                    <Ticket className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0" />
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                        Laporan Saya
                    </h2>
                </div>

                <button
                    type="button"
                    onClick={() => setIsCreateTicketModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white px-3.5 py-2 text-xs font-semibold shadow-xs transition cursor-pointer self-start sm:self-auto"
                >
                    <TicketPlus className="h-4 w-4" />
                    <span>Buat Laporan</span>
                </button>
            </div>

            {/* Two Column Layout (Tickets List & Details) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Left Column: Tiket Saya List */}
                <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-[#27272a] p-4 sm:p-5 shadow-xs flex flex-col min-h-[420px]">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 tracking-wider">
                            TIKET SAYA
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400">
                            {tickets.length}
                        </span>
                    </div>

                    {tickets.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                                Belum ada laporan.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2 pt-3 overflow-y-auto no-scrollbar max-h-[460px]">
                            {tickets.map((t) => (
                                <div
                                    key={t.id}
                                    onClick={() => setSelectedTicketId(t.id)}
                                    className={`p-3 rounded-xl border transition cursor-pointer text-xs ${
                                        selectedTicketId === t.id
                                            ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 dark:border-blue-500 shadow-2xs'
                                            : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] hover:bg-slate-50 dark:hover:bg-zinc-800'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="font-semibold text-slate-900 dark:text-slate-100 truncate mr-2">
                                            {t.title}
                                        </span>
                                        <span className="text-[10px] text-slate-400 shrink-0">
                                            {t.date}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
                                        {t.message}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                                            {t.category}
                                        </span>
                                        <span title={t.status === 'selesai' ? 'Selesai' : t.status === 'diproses' ? 'Diproses' : 'Menunggu'}>
                                            {t.status === 'selesai' ? (
                                                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                            ) : (
                                                <Clock className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                                            )}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Ticket Details / Empty Placeholder */}
                <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-[#27272a] p-5 shadow-xs flex flex-col min-h-[420px]">
                    {!selectedTicket ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                            <Ticket className="h-10 w-10 text-slate-300 dark:text-slate-600 stroke-[1.5]" />
                            <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500">
                                Pilih tiket di sebelah kiri atau buat laporan baru.
                            </p>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col space-y-5">
                            {/* Ticket Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-zinc-800">
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                                        {selectedTicket.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        {selectedTicket.category} • Dibuat pada {selectedTicket.date}
                                    </p>
                                </div>
                                <div
                                    title={
                                        selectedTicket.status === 'selesai'
                                            ? 'Selesai'
                                            : selectedTicket.status === 'diproses'
                                            ? 'Sedang Diproses'
                                            : 'Menunggu Respon'
                                    }
                                    className="self-start sm:self-auto flex items-center"
                                >
                                    {selectedTicket.status === 'selesai' ? (
                                        <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    ) : (
                                        <Clock className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                                    )}
                                </div>
                            </div>

                            {/* Detail Laporan Biasa (Non-Chat) */}
                            <div className="space-y-4 flex-1">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                        Isi Laporan / Kendala
                                    </label>
                                    <div className="rounded-xl bg-slate-50 dark:bg-[#121215]/50 border border-slate-200/80 dark:border-zinc-800 p-4 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                                        {selectedTicket.message}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                        Status Penanganan
                                    </label>
                                    <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215]/30 p-4 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                                        <div>
                                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                                                {selectedTicket.status === 'selesai'
                                                    ? 'Laporan Telah Ditangani'
                                                    : selectedTicket.status === 'diproses'
                                                    ? 'Laporan Sedang Diproses'
                                                    : 'Menunggu Antrean Tim Support'}
                                            </span>
                                        </div>
                                        <p className="leading-relaxed">
                                            {selectedTicket.status === 'selesai'
                                                ? 'Kendala yang Anda sampaikan telah diselesaikan oleh tim teknis kami.'
                                                : selectedTicket.status === 'diproses'
                                                ? 'Laporan Anda sedang dalam proses penanganan oleh admin/tim audit. Hasil akan segera diperbarui.'
                                                : 'Laporan Anda telah berhasil dicatat ke dalam sistem dan akan ditinjau oleh tim support dalam waktu maksimal 1x24 jam.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-zinc-800">
                                    <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-[#121215]/30 border border-slate-100 dark:border-zinc-800">
                                        <span className="text-[11px] text-slate-400 block mb-0.5">Pelapor</span>
                                        <span className="text-xs font-medium text-slate-900 dark:text-slate-100">{userName || 'User Triple9'}</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-[#121215]/30 border border-slate-100 dark:border-zinc-800">
                                        <span className="text-[11px] text-slate-400 block mb-0.5">ID Laporan</span>
                                        <span className="text-xs font-mono font-medium text-slate-900 dark:text-slate-100">#{selectedTicket.id}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Buat Laporan */}
            <CreateTicketModal
                isOpen={isCreateTicketModalOpen}
                onClose={() => setIsCreateTicketModalOpen(false)}
                onCreateTicket={handleCreateTicket}
            />
        </div>
    );
}
