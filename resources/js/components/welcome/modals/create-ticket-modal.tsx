import { useState } from 'react';
import { Ticket, X } from 'lucide-react';

interface CreateTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateTicket: (ticket: { title: string; category: string; message: string }) => void;
}

export function CreateTicketModal({
    isOpen,
    onClose,
    onCreateTicket,
}: CreateTicketModalProps) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Kendala Stor Akun');
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!title.trim() || !message.trim()) {
            alert('Silakan isi judul dan deskripsi kendala.');
            return;
        }

        onCreateTicket({
            title: title.trim(),
            category,
            message: message.trim(),
        });

        setTitle('');
        setMessage('');
        setCategory('Kendala Stor Akun');
        onClose();
        alert('Laporan berhasil dikirim ke tim support!');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-[#27272a] p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2.5">
                        <Ticket className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                Buat Laporan Baru
                            </h3>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="space-y-3 text-xs">
                    <div>
                        <label className="block font-semibold text-slate-900 dark:text-slate-100 mb-1">
                            Judul Laporan
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Contoh: Akun storan belum terupdate"
                            className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] p-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-slate-900 dark:text-slate-100 mb-1">
                            Kategori Kendala
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition"
                        >
                            <option value="Kendala Stor Akun">Kendala Stor Akun</option>
                            <option value="Kendala Tarik Saldo">Kendala Tarik Saldo</option>
                            <option value="Akun & Verifikasi">Akun & Verifikasi</option>
                            <option value="Kendala Teknis Website">Kendala Teknis Website</option>
                            <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold text-slate-900 dark:text-slate-100 mb-1">
                            Deskripsi Kendala
                        </label>
                        <textarea
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Jelaskan detail kendala Anda secara lengkap..."
                            className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] p-3 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition leading-relaxed"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-300 transition"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition"
                    >
                        Kirim Laporan
                    </button>
                </div>
            </div>
        </div>
    );
}
