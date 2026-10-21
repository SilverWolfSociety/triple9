import { useState } from 'react';
import {
    Check,
    ExternalLink,
    X,
} from 'lucide-react';
import { toast } from 'sonner';

interface CommunityChannel {
    id: string;
    platform: 'whatsapp' | 'telegram';
    title: string;
    subtitle: string;
    type: 'channel' | 'group';
    membersCount: string;
    activityLevel: string;
    description: string;
    features: string[];
    url: string;
    handle: string;
    buttonColor: string;
    isPrimary?: boolean;
}

const communityChannels: CommunityChannel[] = [
    {
        id: 'wa-channel',
        platform: 'whatsapp',
        title: 'Saluran Resmi WhatsApp Triple9',
        subtitle: 'Informasi Tercepat & Kuota Harian',
        type: 'channel',
        membersCount: '14.500+ Pengikut',
        activityLevel: 'Update Harian',
        description:
            'Saluran satu arah resmi dari manajemen Triple9. Dapatkan info pembukaan kuota setor, update harga beli akun Gmail, dan pengumuman pemenang mingguan.',
        features: [
            'Privasi Aman: Nomor HP Anda tidak terlihat oleh anggota lain',
            'Sinyal instan saat kuota Room 1 dan 2 dibuka',
            'Update harga beli akun Gmail fresh.',
        ],
        url: 'https://whatsapp.com/channel/0029Vb3Triple9Official',
        handle: 'whatsapp.com/channel/Triple9Official',
        buttonColor: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20',
        isPrimary: true,
    },
    {
        id: 'tg-group',
        platform: 'telegram',
        title: 'Grup Komunitas Telegram Triple9',
        subtitle: 'Forum Diskusi Terbuka untuk Setor Gmail',
        type: 'group',
        membersCount: '9.800+ Anggota',
        activityLevel: 'Aktif (24 Jam)',
        description:
            'Ruang diskusi dua arah bagi seluruh penyetor akun Gmail di Triple9. Tempat berbagi tips bypass OTP/No-HP, tanya jawab kendala apapun, serta bertukar pengalaman.',
        features: [
            'Diskusi terbuka 24/7 bersama tiap member berpengalaman',
            'Moderator & admin aktif membantu menjawab pertanyaan',
            'Sharing pengalaman storer top leaderboard.',
        ],
        url: 'https://t.me/Triple9Community',
        handle: 't.me/Triple9Community',
        buttonColor: 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20',
        isPrimary: true,
    },
];

export function KomunitasView() {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [qrModalItem, setQrModalItem] = useState<CommunityChannel | null>(null);

    const handleCopy = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast.info('Tautan telah disalin.');
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="w-full space-y-4 sm:space-y-5">
            {/* 1. Header Card */}
            <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 px-5 min-h-[68px] sm:h-18 shadow-xs flex items-center justify-between gap-3 sm:gap-4 py-3.5 sm:py-0">
                <div className="flex items-center gap-3">
                    <img
                        src="/images/icon/person_yellow.png"
                        alt="Komunitas"
                        className="h-6 w-6 object-contain shrink-0"
                    />
                    <div>
                        <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                            Komunitas & Saluran Resmi
                        </h2>
                    </div>
                </div>
            </div>

            {/* 2. Community Channels Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {communityChannels.map((channel) => {
                    const isWhatsApp = channel.platform === 'whatsapp';
                    const isCopied = copiedId === channel.id;

                    return (
                        <div
                            key={channel.id}
                            className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 flex flex-col justify-between shadow-xs relative overflow-hidden"
                        >
                            {/* Top row: Platform Icon + Badge */}
                            <div>
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={isWhatsApp ? '/images/icon/whatsapp.png' : '/images/icon/telegram.png'}
                                            alt={isWhatsApp ? 'WhatsApp' : 'Telegram'}
                                            className="h-12 w-12 object-contain shrink-0"
                                        />
                                        <div>
                                            <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                                                {channel.title}
                                            </h4>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats row */}
                                <div className="grid grid-cols-2 gap-2 mb-4 bg-neutral-50 dark:bg-neutral-800/50 p-2.5 rounded-xl border border-neutral-200/60 dark:border-neutral-800">
                                    <div>
                                        <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 dark:text-neutral-500">
                                            Komunitas
                                        </div>
                                        <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                                            {channel.membersCount}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 dark:text-neutral-500">
                                            Aktivitas
                                        </div>
                                        <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                                            {channel.activityLevel}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                                    {channel.description}
                                </p>

                                {/* Features Checklist */}
                                <div className="space-y-2 mb-5">
                                    <div className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 tracking-wide uppercase">
                                        Keuntungan di Saluran Ini:
                                    </div>
                                    {channel.features.map((feat, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                                            <Check
                                                className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${isWhatsApp
                                                    ? 'text-emerald-500'
                                                    : 'text-sky-500'
                                                    }`}
                                            />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                <a
                                    href={channel.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition active:scale-[0.99] cursor-pointer ${channel.buttonColor}`}
                                >
                                    <img
                                        src={isWhatsApp ? '/images/icon/whatsapp.png' : '/images/icon/telegram.png'}
                                        alt={isWhatsApp ? 'WhatsApp' : 'Telegram'}
                                        className="h-4 w-4 object-contain shrink-0"
                                    />
                                    <span>
                                        {isWhatsApp ? 'Ikuti Saluran WhatsApp' : 'Gabung Komunitas Telegram'}
                                    </span>
                                    <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                                </a>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleCopy(channel.id, channel.url)}
                                        title="Salin Tautan"
                                        className="inline-flex items-center justify-center p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition cursor-pointer"
                                    >
                                        {isCopied ? (
                                            <Check className="h-4 w-4 text-emerald-500" />
                                        ) : (
                                            <img
                                                src="/images/icon/copy.png"
                                                alt="Salin Link"
                                                className="h-4 w-4 object-contain shrink-0"
                                            />
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setQrModalItem(channel)}
                                        title="Scan QR Code"
                                        className="inline-flex items-center justify-center p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition cursor-pointer"
                                    >
                                        <img
                                            src="/images/icon/qr-code.png"
                                            alt="Scan QR Code"
                                            className="h-4 w-4 object-contain shrink-0 dark:invert"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 5. Tata Tertib & Rules Komunitas */}
            <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2.5">
                    <img
                        src="/images/icon/tatatertib.png"
                        alt="Tata Tertib"
                        className="h-5 w-5 object-contain shrink-0"
                    />
                    <div>
                        <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100">
                            Tata Tertib & Aturan Komunitas
                        </h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                    <div className="p-3.5 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/30">
                        <span className="font-bold text-neutral-900 dark:text-white block mb-1">
                            1. Dilarang Spam & Promo Liar
                        </span>
                        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-[11px]">
                            Dilarang mengirimkan link affiliate platform lain, judi online, pinjaman online, atau konten tidak pantas.
                        </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/30">
                        <span className="font-bold text-neutral-900 dark:text-white block mb-1">
                            2. Transaksi Hanya di Website
                        </span>
                        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-[11px]">
                            Semua transaksi setor dan pembayaran wajib melalui web resmi Triple9. Hindari tawaran rekber pribadi di luar web.
                        </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/30">
                        <span className="font-bold text-neutral-900 dark:text-white block mb-1">
                            3. Saling Menghargai
                        </span>
                        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-[11px]">
                            Gunakan bahasa yang sopan. Anggota baru dipersilakan bertanya dan anggota senior diharapkan membimbing.
                        </p>
                    </div>
                </div>
            </div>

            {/* 6. FAQ Seputar Komunitas */}
            <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 mb-2">
                    <img
                        src="/images/icon/what.png"
                        alt="FAQ"
                        className="h-4 w-4 object-contain shrink-0"
                    />
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        Pertanyaan Umum (FAQ)
                    </h3>
                </div>

                <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800">
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                            Apakah bergabung ke Saluran WhatsApp atau Telegram dipungut biaya?
                        </h4>
                        <p className="text-neutral-500 dark:text-neutral-400 text-[11px] leading-relaxed">
                            Sama sekali tidak. Semua saluran dan komunitas resmi Triple9 adalah <strong>100% GRATIS</strong> untuk semua storer.
                        </p>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800">
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                            Apa perbedaan Saluran WhatsApp dan Komunitas Telegram?
                        </h4>
                        <p className="text-neutral-500 dark:text-neutral-400 text-[11px] leading-relaxed">
                            <strong>Saluran WhatsApp</strong> bersifat siaran satu arah yang sangat privat (nomor telepon Anda dirahasiakan oleh WhatsApp) untuk update sinyal dan kuota. Sedangkan <strong>Grup Telegram</strong> adalah forum dua arah di mana Anda bisa mengobrol dan berdiskusi langsung dengan sesama peternak Gmail.
                        </p>
                    </div>
                </div>
            </div>

            {/* 7. Modal Scan QR Code */}
            {qrModalItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 shadow-xl space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <img
                                    src={qrModalItem.platform === 'whatsapp' ? '/images/icon/whatsapp.png' : '/images/icon/telegram.png'}
                                    alt={qrModalItem.platform}
                                    className="h-8 w-8 object-contain shrink-0"
                                />
                                <div>
                                    <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                                        Scan untuk Bergabung
                                    </h4>
                                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                        {qrModalItem.title}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setQrModalItem(null)}
                                className="h-8 w-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Simulated QR Code SVG pattern */}
                        <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 transition">
                            <div className="relative p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/60 dark:border-neutral-800 shadow-2xs">
                                {/* Clean QR Code SVG vector pattern */}
                                <svg
                                    viewBox="0 0 200 200"
                                    width="170"
                                    height="170"
                                    className="text-neutral-900 dark:text-white"
                                >
                                    {/* Corner squares */}
                                    <rect x="10" y="10" width="50" height="50" rx="4" fill="none" stroke="currentColor" strokeWidth="12" />
                                    <rect x="25" y="25" width="20" height="20" rx="2" fill="currentColor" />
                                    <rect x="140" y="10" width="50" height="50" rx="4" fill="none" stroke="currentColor" strokeWidth="12" />
                                    <rect x="155" y="25" width="20" height="20" rx="2" fill="currentColor" />
                                    <rect x="10" y="140" width="50" height="50" rx="4" fill="none" stroke="currentColor" strokeWidth="12" />
                                    <rect x="25" y="155" width="20" height="20" rx="2" fill="currentColor" />

                                    {/* Data pattern blocks */}
                                    <rect x="75" y="20" width="10" height="30" fill="currentColor" />
                                    <rect x="95" y="10" width="15" height="15" fill="currentColor" />
                                    <rect x="115" y="25" width="12" height="20" fill="currentColor" />
                                    <rect x="20" y="75" width="25" height="12" fill="currentColor" />
                                    <rect x="75" y="75" width="50" height="50" rx="4" fill="currentColor" opacity="0.1" />
                                    <rect x="55" y="95" width="12" height="15" fill="currentColor" />
                                    <rect x="145" y="75" width="15" height="25" fill="currentColor" />
                                    <rect x="170" y="90" width="15" height="15" fill="currentColor" />
                                    <rect x="75" y="145" width="20" height="25" fill="currentColor" />
                                    <rect x="105" y="140" width="25" height="12" fill="currentColor" />
                                    <rect x="140" y="145" width="20" height="15" fill="currentColor" />
                                    <rect x="170" y="140" width="15" height="40" fill="currentColor" />
                                    <rect x="105" y="165" width="25" height="15" fill="currentColor" />

                                    {/* Center logo badge */}
                                    <circle cx="100" cy="100" r="22" className="fill-white dark:fill-neutral-900 stroke-neutral-900 dark:stroke-white" strokeWidth="4" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                        src={qrModalItem.platform === 'whatsapp' ? '/images/icon/whatsapp.png' : '/images/icon/telegram.png'}
                                        alt={qrModalItem.platform}
                                        className="h-8 w-8 object-contain shrink-0"
                                    />
                                </div>
                            </div>

                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-3 text-center">
                                Arahkan kamera HP Anda untuk membuka tautan langsung.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <a
                                href={qrModalItem.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition active:scale-[0.99] cursor-pointer ${qrModalItem.buttonColor}`}
                            >
                                <span>Buka Tautan Langsung</span>
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                            <button
                                type="button"
                                onClick={() => handleCopy(qrModalItem.id, qrModalItem.url)}
                                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition cursor-pointer"
                            >
                                <span>{qrModalItem.handle}</span>
                                {copiedId === qrModalItem.id && (
                                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
