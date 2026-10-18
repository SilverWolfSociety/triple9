import { useState } from 'react';
import { X } from 'lucide-react';

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
            <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-2.5">
                        <img src="/images/icon/ticket.png" alt="Laporan" className="h-5 w-5 object-contain shrink-0" />
                        <div>
                            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                Buat Laporan Baru
                            </h3>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="space-y-3 text-xs">
                    <div>
                        <label className="block font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                            Judul Laporan
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Contoh: Akun storan belum terupdate"
                            className="w-full rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-2.5 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                            Kategori Kendala
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-2.5 text-xs text-neutral-900 dark:text-neutral-100 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition"
                        >
                            <option value="Kendala Stor Akun">Kendala Stor Akun</option>
                            <option value="Kendala Tarik Saldo">Kendala Tarik Saldo</option>
                            <option value="Akun & Verifikasi">Akun & Verifikasi</option>
                            <option value="Kendala Teknis Website">Kendala Teknis Website</option>
                            <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                            Deskripsi Kendala
                        </label>
                        <textarea
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Jelaskan detail kendala Anda secara lengkap..."
                            className="w-full rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-3 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition leading-relaxed"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition"
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
