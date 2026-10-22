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
        <div className="w-full space-y-5">
            {/* Header Card */}
            <div className="rounded-md bg-white border-[3px] border-black px-6 min-h-[70px] shadow-[8px_8px_0px_0px_#000000] flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                        <img
                            src="/images/icon/headphone.png"
                            alt="Support"
                            className="h-5 w-5 object-contain"
                        />
                    </div>
                    <div>
                        <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-black">
                            Triple9 Support
                        </h2>
                    </div>
                </div>
            </div>

            {/* Grid 2 Kolom: Form Keluhan & Riwayat / Kontak */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Kolom Kiri: Form Isi Keluhan */}
                <div className="lg:col-span-7 rounded-md bg-white border-[3px] border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                    <div className="pb-3 border-b-2 border-black">
                        <h3 className="text-sm font-black uppercase tracking-wider text-black">
                            Kirim Keluhan atau Pertanyaan
                        </h3>
                        <p className="text-xs font-bold text-neutral-600 mt-1">
                            Isi formulir di bawah ini untuk melaporkan kendala yang Anda alami.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                        {/* Kategori Kendala */}
                        <div>
                            <label className="block font-black uppercase tracking-wider text-black mb-1.5">
                                Kategori Kendala <span className="text-[#FF00FF]">*</span>
                            </label>
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full flex items-center justify-between rounded-sm border-2 border-black px-3.5 py-2.5 text-xs text-black font-bold bg-white shadow-[2px_2px_0px_0px_#000000] transition cursor-pointer"
                                >
                                    <span>{category}</span>
                                    <ChevronDown
                                        className={`h-4 w-4 text-black stroke-[3] transition-transform duration-200 ${
                                            isDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute left-0 right-0 mt-1.5 rounded-sm bg-white border-2 border-black p-1 shadow-[4px_4px_0px_0px_#000000] z-20 space-y-1 text-xs">
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
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xs font-black transition cursor-pointer text-left ${
                                                        isSelected
                                                            ? 'bg-[#00C2CB] text-black'
                                                            : 'text-black hover:bg-[#F5F5DC]'
                                                    }`}
                                                >
                                                    <span>{cat}</span>
                                                    {isSelected && <Check className="h-3.5 w-3.5 stroke-[3] shrink-0" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Judul Keluhan */}
                        <div>
                            <label className="block font-black uppercase tracking-wider text-black mb-1.5">
                                Judul Keluhan <span className="text-[#FF00FF]">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Contoh: Akun storan belum masuk verifikasi"
                                className="w-full rounded-sm border-2 border-black bg-white px-3.5 py-2.5 text-xs font-bold text-black placeholder:text-neutral-500 shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                                required
                            />
                        </div>

                        {/* Nomor WhatsApp */}
                        <div>
                            <label className="block font-black uppercase tracking-wider text-black mb-1.5">
                                No. WhatsApp <span className="text-neutral-600 font-bold lowercase">(opsional)</span>
                            </label>
                            <input
                                type="text"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                placeholder="Contoh: 081234567890"
                                className="w-full rounded-sm border-2 border-black bg-white px-3.5 py-2.5 text-xs font-bold text-black placeholder:text-neutral-500 shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                            />
                        </div>

                        {/* Detail Keluhan */}
                        <div>
                            <label className="block font-black uppercase tracking-wider text-black mb-1.5">
                                Rincian Keluhan <span className="text-[#FF00FF]">*</span>
                            </label>
                            <textarea
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Jelaskan detail kendala Anda secara lengkap..."
                                className="w-full rounded-sm border-2 border-black bg-white p-3 text-xs font-bold text-black placeholder:text-neutral-500 shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition leading-relaxed resize-none"
                                required
                            />
                        </div>

                        {/* Tombol Kirim */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#00C2CB] text-black border-2 border-black px-6 py-3 text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition cursor-pointer disabled:opacity-50"
                            >
                                <span>{isSubmitting ? 'Mengirim...' : 'Kirim Keluhan'}</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Kolom Kanan: Riwayat Keluhan & CS WhatsApp */}
                <div className="lg:col-span-5 space-y-5">
                    {/* Riwayat Keluhan */}
                    <div className="rounded-md bg-white border-[3px] border-black p-5 shadow-[8px_8px_0px_0px_#000000] space-y-3">
                        <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                            <span className="text-xs font-black text-black uppercase tracking-wider">
                                Riwayat Keluhan Saya
                            </span>
                            <span className="text-xs font-mono font-black text-black bg-[#FFD700] px-2 py-0.5 rounded-xs border border-black">
                                {tickets.length} Tiket
                            </span>
                        </div>

                        {tickets.length === 0 ? (
                            <div className="py-8 text-center space-y-2 bg-[#F5F5DC]/40 border-2 border-dashed border-black rounded-sm p-4">
                                <p className="text-xs font-black uppercase tracking-wider text-black">
                                    Belum ada keluhan yang dikirim.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-2.5 max-h-[300px] overflow-y-auto no-scrollbar">
                                {tickets.map((t) => (
                                    <div
                                        key={t.id}
                                        className="p-3 rounded-sm border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000000] text-xs space-y-1.5"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-black text-black truncate mr-2">
                                                {t.title}
                                            </span>
                                            <span className="text-[10px] font-mono font-bold text-neutral-600 shrink-0">
                                                {t.date}
                                            </span>
                                        </div>
                                        <p className="text-[11px] font-bold text-neutral-700 line-clamp-2 leading-relaxed">
                                            {t.message}
                                        </p>
                                        <div className="flex items-center justify-between pt-1 border-t-2 border-black text-[10px]">
                                            <span className="font-bold text-neutral-700">{t.category}</span>
                                            <span className="inline-flex items-center gap-1 font-black bg-[#FFD700] px-1.5 py-0.5 border border-black rounded-xs text-black">
                                                Menunggu Respon
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bantuan Langsung via WhatsApp CS */}
                    <div className="rounded-md bg-white border-[3px] border-black p-5 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="size-10 rounded-sm border-2 border-black bg-[#00C2CB] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img
                                    src="/images/icon/whatsapp.png"
                                    alt="WhatsApp"
                                    className="h-6 w-6 object-contain"
                                />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-wider text-black">
                                    Butuh Bantuan Cepat?
                                </h4>
                                <p className="text-[11px] font-bold text-neutral-700 mt-0.5 leading-relaxed">
                                    Hubungi CS WhatsApp kami untuk respon instan seputar kendala akun atau transaksi.
                                </p>
                            </div>
                        </div>

                        <a
                            href="https://wa.me/6281234567890?text=Halo%20Admin%20Triple9,%20saya%20butuh%20bantuan%20terkait%20layanan%20Triple9."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#00C2CB] text-black border-2 border-black px-4 py-3 text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition cursor-pointer"
                        >
                            <span>Chat CS WhatsApp (+62 812-3456-7890)</span>
                            <ExternalLink className="h-3.5 w-3.5 stroke-[2.5]" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
