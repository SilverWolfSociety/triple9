import { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import type { AdminTicketItem } from '../types';

interface AdminTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: AdminTicketItem | null;
    onSendReply: (ticketId: string, message: string) => void;
    onCloseTicket: (ticketId: string) => void;
}

export function AdminTicketModal({
    isOpen,
    onClose,
    ticket,
    onSendReply,
    onCloseTicket,
}: AdminTicketModalProps) {
    if (!isOpen || !ticket) return null;

    const [replyText, setReplyText] = useState('');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim()) {
            toast.error('Pesan balasan tidak boleh kosong.');
            return;
        }

        onSendReply(ticket.id, replyText.trim());
        toast.success(`Balasan terkirim ke ${ticket.userName}!`);
        setReplyText('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <div className="relative w-full max-w-2xl bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_#000000] p-5 sm:p-6 space-y-4 max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b-2 border-black pb-3 shrink-0">
                    <div className="flex items-center gap-2">
                        <img src="/images/icon/headphone.png" alt="Tiket Kendala" className="size-6 object-contain shrink-0" />
                        <div>
                            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-black">
                                Tiket {ticket.ticketNumber} — {ticket.category}
                            </h3>
                            <p className="text-xs font-bold text-neutral-600">
                                Pengirim: {ticket.userName} ({ticket.userEmail}) • {ticket.date} {ticket.time}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="size-7 inline-flex items-center justify-center rounded-xs border-2 border-black bg-white hover:bg-[#FF00FF] text-black shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
                    >
                        <X className="size-4 stroke-[3]" />
                    </button>
                </div>

                {/* Subject & Main Problem */}
                <div className="p-3 bg-[#F5F5DC] border-2 border-black rounded-sm shrink-0">
                    <div className="text-[11px] font-black uppercase text-neutral-600">Subjek Kendala:</div>
                    <div className="font-black text-black text-sm">{ticket.subject}</div>
                </div>

                {/* Conversation Thread */}
                <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 min-h-[160px] max-h-[300px] border-2 border-black p-3 bg-neutral-50 rounded-sm">
                    {/* Initial message */}
                    <div className="p-3 bg-white border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_#000000]">
                        <div className="flex items-center justify-between text-[11px] font-black uppercase pb-1 border-b border-black/10">
                            <span className="text-black flex items-center gap-1.5">
                                <span className="inline-block size-2 rounded-full bg-[#FFD700]" />
                                {ticket.userName} (Pengguna)
                            </span>
                            <span className="text-neutral-500 font-mono">{ticket.time}</span>
                        </div>
                        <p className="text-xs font-medium text-black mt-2 whitespace-pre-wrap">
                            {ticket.message}
                        </p>
                    </div>

                    {/* Replies */}
                    {ticket.replies
                        .filter((reply, idx) => !(idx === 0 && reply.sender === 'user' && reply.message.trim() === ticket.message.trim()))
                        .map((reply, idx) => {
                        const isAdmin = reply.sender === 'admin';
                        return (
                            <div
                                key={idx}
                                className={`p-3 border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_#000000] ${isAdmin ? 'bg-[#00C2CB]/20 ml-4' : 'bg-white mr-4'
                                    }`}
                            >
                                <div className="flex items-center justify-between text-[11px] font-black uppercase pb-1 border-b border-black/10">
                                    <span className="text-black flex items-center gap-1.5">
                                        <span
                                            className={`inline-block size-2 rounded-full ${isAdmin ? 'bg-[#00C2CB]' : 'bg-[#FFD700]'
                                                }`}
                                        />
                                        {reply.name} {isAdmin ? '(Admin Triple9)' : '(Pengguna)'}
                                    </span>
                                    <span className="text-neutral-500 font-mono">{reply.time}</span>
                                </div>
                                <p className="text-xs font-medium text-black mt-2 whitespace-pre-wrap">
                                    {reply.message}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSend} className="space-y-3 shrink-0">
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Ketik balasan untuk pengguna ini..."
                        rows={3}
                        className="w-full p-2.5 text-xs font-bold border-2 border-black bg-white rounded-sm focus:outline-hidden focus:bg-[#F5F5DC]"
                    />

                    <div className="flex items-center justify-between gap-2">
                        {ticket.status !== 'resolved' ? (
                            <button
                                type="button"
                                onClick={() => {
                                    onCloseTicket(ticket.id);
                                    toast.success(`Tiket ${ticket.ticketNumber} ditandai selesai!`);
                                    onClose();
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xs border-2 border-black bg-white hover:bg-[#FFD700] text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
                            >
                                <CheckCircle className="size-3.5 stroke-[2.5]" />
                                <span>Tandai Selesai</span>
                            </button>
                        ) : (
                            <span className="text-xs font-black uppercase text-emerald-600 flex items-center gap-1">
                                <CheckCircle className="size-4 stroke-[3]" />
                                Tiket Sudah Selesai
                            </span>
                        )}

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-3 py-2 rounded-xs border-2 border-black bg-neutral-200 hover:bg-neutral-300 text-black text-xs font-black uppercase tracking-wider cursor-pointer"
                            >
                                Tutup
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xs border-2 border-black bg-[#00C2CB] hover:bg-[#00a8b0] text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
                            >
                                <span>Kirim Balasan</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
