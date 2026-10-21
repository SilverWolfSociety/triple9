import { useState, useRef, useEffect } from 'react';
import { Send, ExternalLink, ChevronDown, Check } from 'lucide-react';
import { toast } from 'sonner';

interface SupportTicket {
    id: string;
    title: string;
    category: string;
    whatsapp?: string;
    message: string;
    date: string;
    status: 'menunggu' | 'diproses' | 'selesai';
}

interface SupportViewProps {
    userName?: string;
    userEmail?: string;
}

const CATEGORIES = [
    'Kendala Setor Akun Gmail',
    'Kendala Penarikan Saldo',
    'Kendala Email Checker',
    'Akun & Keamanan',
    'Pertanyaan Umum / Lainnya',
];

export function SupportView({ userName = 'Pengguna' }: SupportViewProps) {
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [whatsapp, setWhatsapp] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error('Silakan isi judul keluhan.');
            return;
        }

        if (!message.trim()) {
            toast.error('Silakan jelaskan detail kendala Anda.');
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            const newTicket: SupportTicket = {
                id: `TR-${Math.floor(1000 + Math.random() * 9000)}`,
                title: title.trim(),
                category,
                whatsapp: whatsapp.trim() || undefined,
                message: message.trim(),
                date: new Date().toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                }),
                status: 'menunggu',
            };

            setTickets((prev) => [newTicket, ...prev]);
            setTitle('');
            setMessage('');
            setWhatsapp('');
            setIsSubmitting(false);
            toast.success('Keluhan Anda telah berhasil dikirim ke tim support Triple9!');
        }, 300);
    };

    return (
        <div className="w-full space-y-4 sm:space-y-5">
            {/* Header Card */}
            <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 px-5 min-h-[68px] sm:h-18 shadow-xs flex items-center justify-between gap-3 sm:gap-4 py-3.5 sm:py-0">
                <div className="flex items-center gap-3">
                    <img
                        src="/images/icon/headphone.png"
                        alt="Support"
                        className="h-6 w-6 object-contain shrink-0"
                    />
                    <div>
                        <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                            Triple9 Support
                        </h2>
                    </div>
                </div>
            </div>

            {/* Grid 2 Kolom: Form Keluhan & Riwayat / Kontak */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Kolom Kiri: Form Isi Keluhan */}
                <div className="lg:col-span-7 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-4">
                    <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
                        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                            Kirim Keluhan atau Pertanyaan
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                            Isi formulir di bawah ini untuk melaporkan kendala yang Anda alami.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                        {/* Kategori Kendala */}
                        <div>
                            <label className="block font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
                                Kategori Kendala <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className={`w-full flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-950 transition cursor-pointer ${
                                        isDropdownOpen
                                            ? 'border-blue-600 ring-1 ring-blue-600'
                                            : 'border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                                    }`}
                                >
                                    <span className="font-medium">{category}</span>
                                    <ChevronDown
                                        className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${
                                            isDropdownOpen ? 'rotate-180 text-blue-600' : ''
                                        }`}
                                    />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute left-0 right-0 mt-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 p-1.5 shadow-xl z-20 space-y-0.5 text-xs">
                                        {CATEGORIES.map((cat) => {
                                            const isSelected = category === cat;
                                            return (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => {
                                                        setCategory(cat);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition cursor-pointer text-left ${
                                                        isSelected
                                                            ? 'bg-blue-600 text-white font-semibold shadow-xs'
                                                            : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                                    }`}
                                                >
                                                    <span>{cat}</span>
                                                    {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Judul Keluhan */}
                        <div>
                            <label className="block font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
                                Judul Keluhan <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Contoh: Akun storan belum masuk verifikasi"
                                className="w-full rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3.5 py-2.5 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition"
                                required
                            />
                        </div>

                        {/* Nomor WhatsApp */}
                        <div>
                            <label className="block font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
                                No. WhatsApp <span className="text-neutral-400 font-normal">(opsional)</span>
                            </label>
                            <input
                                type="text"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                placeholder="Contoh: 081234567890"
                                className="w-full rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3.5 py-2.5 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition"
                            />
                        </div>

                        {/* Detail Keluhan */}
                        <div>
                            <label className="block font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
                                Rincian Keluhan <span className="text-rose-500">*</span>
                            </label>
                            <textarea
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Jelaskan detail kendala Anda secara lengkap..."
                                className="w-full rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-3 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition leading-relaxed resize-none"
                                required
                            />
                        </div>

                        {/* Tombol Kirim */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white px-5 py-2.5 text-xs font-semibold shadow-xs transition cursor-pointer disabled:opacity-50"
                            >
                                <span>{isSubmitting ? 'Mengirim...' : 'Kirim Keluhan'}</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Kolom Kanan: Riwayat Keluhan & CS WhatsApp */}
                <div className="lg:col-span-5 space-y-4">
                    {/* Riwayat Keluhan */}
                    <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 shadow-xs space-y-3">
                        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                            <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                                Riwayat Keluhan Saya
                            </span>
                            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                                {tickets.length} Tiket
                            </span>
                        </div>

                        {tickets.length === 0 ? (
                            <div className="py-8 text-center space-y-2">
                                <img
                                    src="/images/icon/headphone.png"
                                    alt="Belum ada keluhan"
                                    className="h-8 w-8 mx-auto object-contain opacity-40"
                                />
                                <p className="text-xs text-neutral-400 dark:text-neutral-500">
                                    Belum ada keluhan yang dikirim.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-2.5 max-h-[300px] overflow-y-auto no-scrollbar">
                                {tickets.map((t) => (
                                    <div
                                        key={t.id}
                                        className="p-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 text-xs space-y-1.5"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-neutral-900 dark:text-neutral-100 truncate mr-2">
                                                {t.title}
                                            </span>
                                            <span className="text-[10px] text-neutral-400 shrink-0">
                                                {t.date}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                                            {t.message}
                                        </p>
                                        <div className="flex items-center justify-between pt-1 border-t border-neutral-100 dark:border-neutral-800/60 text-[10px]">
                                            <span className="text-neutral-400">{t.category}</span>
                                            <span className="inline-flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
                                                <img
                                                    src="/images/icon/pending.png"
                                                    alt="Menunggu"
                                                    className="h-3 w-3 object-contain"
                                                />
                                                Menunggu Respon
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bantuan Langsung via WhatsApp CS */}
                    <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 shadow-xs space-y-3">
                        <div className="flex items-start gap-3">
                            <img
                                src="/images/icon/whatsapp.png"
                                alt="WhatsApp"
                                className="h-8 w-8 object-contain shrink-0"
                            />
                            <div>
                                <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                                    Butuh Bantuan Cepat?
                                </h4>
                                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                                    Hubungi CS WhatsApp kami untuk respon instan seputar kendala akun atau transaksi.
                                </p>
                            </div>
                        </div>

                        <a
                            href="https://wa.me/6281234567890?text=Halo%20Admin%20Triple9,%20saya%20butuh%20bantuan%20terkait%20layanan%20Triple9."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white px-4 py-2.5 text-xs font-semibold shadow-xs transition cursor-pointer"
                        >
                            <span>Chat CS WhatsApp (+62 812-3456-7890)</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
