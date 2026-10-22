import { useState } from 'react';
import { X, Send, AlertCircle, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import type { TicketRecord } from '../types';

interface CreateTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateTicket: (ticket: Omit<TicketRecord, 'id' | 'ticketNumber' | 'date' | 'status' | 'replies'>) => void;
    defaultCategory?: string;
}

export function CreateTicketModal({
    isOpen,
    onClose,
    onCreateTicket,
    defaultCategory = 'Kendala Setor Akun',
}: CreateTicketModalProps) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(defaultCategory);
    const [priority, setPriority] = useState<'biasa' | 'penting' | 'mendesak'>('biasa');
    const [whatsapp, setWhatsapp] = useState('');
    const [relatedId, setRelatedId] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error('Silakan isi judul keluhan / laporan');
            return;
        }

        if (!message.trim()) {
            toast.error('Silakan jelaskan detail kendala Anda secara lengkap');
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            onCreateTicket({
                title: title.trim(),
                category,
                priority,
                whatsapp: whatsapp.trim() || undefined,
                relatedId: relatedId.trim() || undefined,
                message: message.trim(),
            });

            toast.success('Tiket keluhan berhasil dibuat! Tim Support akan segera menindaklanjuti.');
            setTitle('');
            setMessage('');
            setWhatsapp('');
            setRelatedId('');
            setPriority('biasa');
            setCategory(defaultCategory);
            setIsSubmitting(false);
            onClose();
        }, 300);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-in fade-in duration-150">
            <div className="relative w-full max-w-lg rounded-md bg-white border-[3px] border-black p-5 sm:p-6 shadow-[10px_10px_0px_0px_#000000] max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b-2 border-black shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-sm bg-[#FFD700] border-2 border-black shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                            <img src="/images/icon/ticket.png" alt="Support" className="h-5 w-5 object-contain" />
                        </div>
                        <div>
                            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-black">
                                Buat Laporan / Keluhan Baru
                            </h3>
                            <p className="text-[11px] font-bold text-neutral-600">
                                Sampaikan kendala transaksi atau akun Anda ke Tim Support Triple9
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-sm p-1.5 border-2 border-black bg-white hover:bg-[#FF00FF] shadow-[2px_2px_0px_0px_#000000] text-black transition cursor-pointer"
                    >
                        <X className="h-4 w-4 stroke-[3]" />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="overflow-y-auto space-y-4 py-4 text-xs flex-1 pr-1">
                    {/* Judul Laporan */}
                    <div>
                        <label className="block font-black uppercase tracking-wider text-black mb-1.5">
                            Judul Keluhan / Masalah <span className="text-[#FF00FF]">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Contoh: Akun storan belum masuk verifikasi / Saldo tertunda"
                            className="w-full rounded-sm border-2 border-black bg-white px-3.5 py-2.5 text-xs font-bold text-black placeholder:text-neutral-500 shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                            required
                        />
                    </div>

                    {/* Kategori Kendala */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block font-black uppercase tracking-wider text-black mb-1.5">
                                Kategori Kendala <span className="text-[#FF00FF]">*</span>
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full rounded-sm border-2 border-black bg-white px-3 py-2.5 text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                            >
                                <option value="Kendala Setor Akun">📥 Kendala Setor Akun Gmail</option>
                                <option value="Kendala Penarikan Saldo">💰 Kendala Penarikan Saldo</option>
                                <option value="Email Checker">🔍 Kendala Email Checker</option>
                                <option value="Referral & Bonus">🎁 Masalah Referral & Bonus</option>
                                <option value="Akun & Keamanan">🔐 Akun & Keamanan</option>
                                <option value="Kendala Teknis Website">⚙️ Kendala Teknis Website</option>
                                <option value="Saran & Masukan">💡 Saran & Masukan Fitur</option>
                                <option value="Pertanyaan Umum">❓ Pertanyaan Umum</option>
                            </select>
                        </div>

                        {/* Tingkat Prioritas */}
                        <div>
                            <label className="block font-black uppercase tracking-wider text-black mb-1.5">
                                Tingkat Prioritas
                            </label>
                            <div className="grid grid-cols-3 gap-1.5">
                                {(
                                    [
                                        { id: 'biasa', label: 'Biasa' },
                                        { id: 'penting', label: 'Penting' },
                                        { id: 'mendesak', label: 'Mendesak' },
                                    ] as const
                                ).map((p) => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => setPriority(p.id)}
                                        className={`py-2 text-[11px] font-black uppercase tracking-wider rounded-sm border-2 border-black transition text-center cursor-pointer ${
                                            priority === p.id
                                                ? p.id === 'mendesak'
                                                    ? 'bg-[#FF00FF] text-black shadow-[2px_2px_0px_0px_#000000]'
                                                    : p.id === 'penting'
                                                      ? 'bg-[#FFD700] text-black shadow-[2px_2px_0px_0px_#000000]'
                                                      : 'bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]'
                                                : 'bg-white text-black hover:bg-[#F5F5DC]'
                                        }`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Nomor WA & ID Transaksi Terkait */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block font-black uppercase tracking-wider text-black mb-1.5">
                                No. WhatsApp Anda <span className="text-neutral-600 font-bold lowercase">(opsional)</span>
                            </label>
                            <input
                                type="text"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                placeholder="08xxxxxxxxxx (untuk follow up)"
                                className="w-full rounded-sm border-2 border-black bg-white px-3.5 py-2.5 text-xs font-bold text-black placeholder:text-neutral-500 shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                            />
                        </div>

                        <div>
                            <label className="block font-black uppercase tracking-wider text-black mb-1.5">
                                ID Batch / Transaksi <span className="text-neutral-600 font-bold lowercase">(opsional)</span>
                            </label>
                            <input
                                type="text"
                                value={relatedId}
                                onChange={(e) => setRelatedId(e.target.value)}
                                placeholder="Contoh: #TR-9921 / email akun"
                                className="w-full rounded-sm border-2 border-black bg-white px-3.5 py-2.5 text-xs font-bold text-black placeholder:text-neutral-500 shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                            />
                        </div>
                    </div>

                    {/* Deskripsi Keluhan */}
                    <div>
                        <label className="block font-black uppercase tracking-wider text-black mb-1.5">
                            Rincian Detail Keluhan <span className="text-[#FF00FF]">*</span>
                        </label>
                        <textarea
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Jelaskan secara detail kendala yang dialami, sertakan waktu kejadian atau kronologi agar tim support dapat segera membantu menyelesaikan..."
                            className="w-full rounded-sm border-2 border-black bg-white p-3 text-xs font-bold text-black placeholder:text-neutral-500 shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition leading-relaxed resize-none"
                            required
                        />
                    </div>

                    <div className="rounded-sm p-3 bg-[#F5F5DC] border-2 border-black shadow-[2px_2px_0px_0px_#000000] flex items-start gap-2.5 text-[11px] font-bold text-black">
                        <AlertCircle className="h-4 w-4 text-black stroke-[3] shrink-0 mt-0.5" />
                        <span>
                            Tiket akan otomatis masuk ke antrean penanganan tim admin. Estimasi respon dalam 5 - 15 menit pada jam aktif.
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2.5 pt-3 border-t-2 border-black shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-md text-xs font-black uppercase tracking-wider border-2 border-black bg-white hover:bg-[#F5F5DC] text-black shadow-[2px_2px_0px_0px_#000000] transition cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-black uppercase tracking-wider bg-[#00C2CB] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition cursor-pointer disabled:opacity-50"
                        >
                            <Send className="h-3.5 w-3.5 stroke-[2.5]" />
                            <span>{isSubmitting ? 'Mengirim...' : 'Kirim Laporan'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
