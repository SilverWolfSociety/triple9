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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-2xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 flex items-center justify-center shrink-0">
                            <img src="/images/icon/ticket.png" alt="Support" className="h-5 w-5 object-contain" />
                        </div>
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100">
                                Buat Laporan / Keluhan Baru
                            </h3>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                Sampaikan kendala transaksi atau akun Anda ke Tim Support Triple9
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="overflow-y-auto space-y-4 py-4 text-xs flex-1 pr-1">
                    {/* Judul Laporan */}
                    <div>
                        <label className="block font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
                            Judul Keluhan / Masalah <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Contoh: Akun storan belum masuk verifikasi / Saldo tertunda"
                            className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3.5 py-2.5 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition"
                            required
                        />
                    </div>

                    {/* Kategori Kendala */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
                                Kategori Kendala <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3 py-2.5 text-xs text-neutral-900 dark:text-neutral-100 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition"
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
                            <label className="block font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
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
                                        className={`py-2 text-[11px] font-semibold rounded-xl border transition text-center cursor-pointer ${
                                            priority === p.id
                                                ? p.id === 'mendesak'
                                                    ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-600 dark:text-rose-400'
                                                    : p.id === 'penting'
                                                      ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-600 dark:text-amber-400'
                                                      : 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-600 dark:text-blue-400'
                                                : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
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
                            <label className="block font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
                                No. WhatsApp Anda <span className="text-neutral-400 font-normal">(opsional)</span>
                            </label>
                            <input
                                type="text"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                placeholder="08xxxxxxxxxx (untuk follow up)"
                                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3.5 py-2.5 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
                                ID Batch / Transaksi <span className="text-neutral-400 font-normal">(opsional)</span>
                            </label>
                            <input
                                type="text"
                                value={relatedId}
                                onChange={(e) => setRelatedId(e.target.value)}
                                placeholder="Contoh: #TR-9921 / email akun"
                                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3.5 py-2.5 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Deskripsi Keluhan */}
                    <div>
                        <label className="block font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
                            Rincian Detail Keluhan <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Jelaskan secara detail kendala yang dialami, sertakan waktu kejadian atau kronologi agar tim support dapat segera membantu menyelesaikan..."
                            className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-3 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition leading-relaxed resize-none"
                            required
                        />
                    </div>

                    <div className="rounded-xl p-3 bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-800 flex items-start gap-2.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                        <AlertCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>
                            Tiket akan otomatis masuk ke antrean penanganan tim admin. Estimasi respon dalam 5 - 15 menit pada jam aktif.
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100 dark:border-neutral-800 shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition active:scale-[0.99] cursor-pointer disabled:opacity-50"
                        >
                            <Send className="h-3.5 w-3.5" />
                            <span>{isSubmitting ? 'Mengirim...' : 'Kirim Laporan'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
