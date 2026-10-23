import { useState } from 'react';
import {
    X,
    Clock,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import type { AdminTicketItem } from '../../admin/types';

interface UserTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: AdminTicketItem | null;
    onSendReply: (ticketId: string, message: string) => void;
}

export function UserTicketModal({
    isOpen,
    onClose,
    ticket,
    onSendReply,
}: UserTicketModalProps) {
    if (!isOpen || !ticket) return null;

    const [replyText, setReplyText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim()) {
            toast.error('Pesan tanggapan tidak boleh kosong.');
            return;
        }

        setIsSubmitting(true);
        onSendReply(ticket.id, replyText.trim());
        toast.success('Pesan balasan Anda berhasil dikirim ke Admin!');
        setReplyText('');
        setIsSubmitting(false);
    };

    const getStatusBadge = () => {
        if (ticket.status === 'resolved') {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs border-2 border-black bg-[#00C2CB] text-black text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000]">
                    <CheckCircle className="size-3.5 stroke-[3]" />
                    Selesai
                </span>
            );
        }
        if (ticket.status === 'in_progress' || (ticket.replies && ticket.replies.length > 0)) {
            return null;
        }
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs border-2 border-black bg-[#FFD700] text-black text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000]">
                <Clock className="size-3.5 stroke-[2.5]" />
                Menunggu Respon
            </span>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-in fade-in duration-150">
            <div className="relative w-full max-w-2xl bg-white border-[3px] border-black shadow-[10px_10px_0px_0px_#000000] p-5 sm:p-6 space-y-4 max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between border-b-2 border-black pb-3 shrink-0 gap-3">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-sm bg-[#FFD700] border-2 border-black shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                            <img
                                src="/images/icon/headphone.png"
                                alt="Support"
                                className="size-6 object-contain"
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-black">
                                    Tiket {ticket.ticketNumber}
                                </h3>
                                {getStatusBadge()}
                            </div>
                            <p className="text-xs font-bold text-neutral-600 mt-0.5">
                                Kategori: <span className="text-black font-black">{ticket.category}</span> • Dikirim: {ticket.date} {ticket.time}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        title="Tutup Modal"
                        className="size-8 inline-flex items-center justify-center rounded-xs border-2 border-black bg-white hover:bg-[#FF00FF] text-black shadow-[2px_2px_0px_0px_#000000] cursor-pointer transition"
                    >
                        <X className="size-4 stroke-[3]" />
                    </button>
                </div>

                {/* Subject Box */}
                <div className="p-3 bg-[#F5F5DC] border-2 border-black rounded-sm shrink-0">
                    <div className="text-[10px] font-black uppercase tracking-wider text-neutral-600">
                        Judul Keluhan / Laporan:
                    </div>
                    <div className="font-black text-black text-sm mt-0.5">{ticket.subject}</div>
                </div>

                {/* Conversation Thread */}
                <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 min-h-[180px] max-h-[320px] border-2 border-black p-3.5 bg-neutral-100 rounded-sm">
                    {/* Initial User Message */}
                    <div className="p-3.5 bg-white border-2 border-black rounded-sm shadow-[3px_3px_0px_0px_#000000] space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-black uppercase pb-1.5 border-b border-black/10">
                            <span className="text-black flex items-center gap-1.5">
                                <span className="inline-block size-2 rounded-full bg-[#FFD700] border border-black" />
                                {ticket.userName} (Pesan Awal Anda)
                            </span>
                            <span className="text-neutral-500 font-mono text-[10px]">{ticket.time}</span>
                        </div>
                        <p className="text-xs font-medium text-black whitespace-pre-wrap leading-relaxed">
                            {ticket.message}
                        </p>
                    </div>

                    {/* Replies List */}
                    {ticket.replies && ticket.replies.length > 0 ? (
                        ticket.replies.map((reply, idx) => {
                            const isAdmin = reply.sender === 'admin';
                            return (
                                <div
                                    key={idx}
                                    className={`p-3.5 border-2 border-black rounded-sm shadow-[3px_3px_0px_0px_#000000] space-y-1.5 ${isAdmin
                                        ? 'bg-[#00C2CB]/25 border-black ml-4 sm:ml-8'
                                        : 'bg-white mr-4 sm:mr-8'
                                        }`}
                                >
                                    <div className="flex items-center justify-between text-[11px] font-black uppercase pb-1.5 border-b border-black/10">
                                        <span className="text-black flex items-center gap-1.5">
                                            <span
                                                className={`inline-block size-2 rounded-full border border-black ${isAdmin ? 'bg-[#00C2CB]' : 'bg-[#FFD700]'
                                                    }`}
                                            />
                                            {isAdmin ? (
                                                <span className="text-black font-black flex items-center gap-1">
                                                    {reply.name || 'Admin Triple9'}
                                                    <span className="bg-[#00C2CB] text-black text-[9px] px-1 py-0.2 rounded-xs border border-black">
                                                        OFFICIAL
                                                    </span>
                                                </span>
                                            ) : (
                                                <span>{reply.name} (Anda)</span>
                                            )}
                                        </span>
                                        <span className="text-neutral-600 font-mono text-[10px]">
                                            {reply.time}
                                        </span>
                                    </div>
                                    <p className="text-xs font-medium text-black whitespace-pre-wrap leading-relaxed">
                                        {reply.message}
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <div className="py-6 text-center space-y-2 bg-[#F5F5DC] border-2 border-dashed border-black rounded-sm p-4">
                            <Clock className="size-6 text-black mx-auto stroke-[2.5]" />
                            <p className="text-xs font-black uppercase tracking-wider text-black">
                                Menunggu Respon dari Admin
                            </p>
                            <p className="text-[11px] font-bold text-neutral-600 max-w-sm mx-auto leading-relaxed">
                                Tiket Anda telah masuk ke antrean admin. Balasan akan muncul di sini segera setelah ditindaklanjuti.
                            </p>
                        </div>
                    )}
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSend} className="space-y-3 shrink-0">
                    {ticket.status === 'resolved' && (
                        <div className="p-2.5 rounded-sm bg-[#A3E635]/30 border-2 border-black flex items-center gap-2 text-xs font-bold text-black">
                            <AlertCircle className="size-4 shrink-0 text-black stroke-[2.5]" />
                            <span>Tiket ini ditandai selesai. Jika masih mengalami kendala, Anda dapat mengirim tanggapan lanjutan di bawah ini.</span>
                        </div>
                    )}

                    <div>
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Ketik tanggapan atau informasi tambahan untuk admin..."
                            rows={3}
                            className="w-full p-3 text-xs font-bold border-2 border-black bg-white rounded-sm focus:outline-hidden focus:bg-[#F5F5DC] shadow-[2px_2px_0px_0px_#000000] resize-none"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3.5 py-2 rounded-xs border-2 border-black bg-neutral-200 hover:bg-neutral-300 text-black text-xs font-black uppercase tracking-wider cursor-pointer transition shadow-[2px_2px_0px_0px_#000000]"
                        >
                            Tutup
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xs border-2 border-black bg-[#00C2CB] hover:bg-[#00a8b0] text-black text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000000] cursor-pointer transition disabled:opacity-50"
                        >
                            <span>{isSubmitting ? 'Mengirim...' : 'Kirim Balasan'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
