import { useState, useEffect } from 'react';
import {
    Sparkles,
    ShieldCheck,
    Workflow,
    Wallet,
    CheckCircle2,
    X,
    Coins,
    Flame,
    ArrowRight,
    HelpCircle,
    Info,
    Check,
} from 'lucide-react';

interface Triple9IntroModalProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate?: (navId: string) => void;
}

export function Triple9IntroModal({
    isOpen,
    onClose,
    onNavigate,
}: Triple9IntroModalProps) {
    const [activeTab, setActiveTab] = useState<'about' | 'how' | 'tips'>('about');

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleClose = () => {
        onClose();
    };

    const handleAction = (navId: string) => {
        onClose();
        if (onNavigate) {
            onNavigate(navId);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header Banner */}
                <div className="relative p-6 pb-5 bg-blue-600 text-white shrink-0">
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                        }}
                        className="absolute top-3.5 right-3.5 z-30 flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/15 active:bg-white/25 active:scale-95 transition cursor-pointer"
                        aria-label="Tutup popup"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <div className="relative z-10 flex items-start gap-3.5 pr-12">
                        <div className="flex shrink-0 items-center justify-center text-white mt-1">
                            <Sparkles className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-100 mb-1">
                                <span>Selamat Datang di Triple9</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-snug">
                                Platform Storan &amp; Reward Akun Gmail
                            </h2>
                            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed mt-1">
                                Kenali alur kerja transparan, rate reward, dan cara mencairkan saldo ke e-wallet favorit Anda.
                            </p>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="relative z-10 flex items-center gap-1.5 mt-5 bg-blue-700/80 p-1 rounded-xl text-xs font-semibold">
                        <button
                            type="button"
                            onClick={() => setActiveTab('about')}
                            className={`flex-1 py-1.5 px-3 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === 'about'
                                ? 'bg-white text-blue-700 shadow-sm'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <Info className="h-3.5 w-3.5" />
                            <span>Apa itu Triple9?</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('how')}
                            className={`flex-1 py-1.5 px-3 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === 'how'
                                ? 'bg-white text-blue-700 shadow-sm'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <Workflow className="h-3.5 w-3.5" />
                            <span>Cara Kerja &amp; Cuan</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('tips')}
                            className={`flex-1 py-1.5 px-3 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === 'tips'
                                ? 'bg-white text-blue-700 shadow-sm'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <span>Rules &amp; Keunggulan</span>
                        </button>
                    </div>
                </div>

                {/* Body Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed no-scrollbar">
                    {/* TAB 1: APA ITU TRIPLE9 */}
                    {activeTab === 'about' && (
                        <div className="space-y-4 animate-in fade-in duration-150">
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                                    Mengenal Platform
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    <strong>Triple9</strong> adalah ekosistem digital resmi untuk penyetoran, verifikasi, dan pertukaran akun Gmail yang dibuat sesuai standar kualitas. Setiap akun yang disetor dan berhasil lolos verifikasi akan langsung dikonversi menjadi saldo reward rupiah tunai.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800">
                                    <div className="flex items-center text-emerald-600 dark:text-emerald-400 mb-2">
                                        <Coins className="h-5 w-5" />
                                    </div>
                                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                                        Reward Saldo Instan
                                    </h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                                        Setiap akun Gmail yang disetujui menghasilkan reward saldo Rp4.500 – Rp4.800/akun.
                                    </p>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800">
                                    <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
                                        <Wallet className="h-5 w-5" />
                                    </div>
                                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                                        Pencairan E-Wallet
                                    </h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                                        Tarik saldo kapan pun ke DANA, GoPay, OVO, atau ShopeePay dengan minimal Rp10.000.
                                    </p>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800">
                                    <div className="flex items-center text-amber-600 dark:text-amber-400 mb-2">
                                        <Flame className="h-5 w-5" />
                                    </div>
                                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                                        Bonus Room &amp; Event
                                    </h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                                        Dapatkan bonus rate harian pada room tertentu dan hadiah kompetisi Leaderboard.
                                    </p>
                                </div>
                            </div>

                            <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                                    Siapa saja yang bisa menggunakan Triple9?
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Siapa saja yang ingin mendapatkan penghasilan sampingan secara fleksibel dari rumah. Cukup gunakan HP atau laptop Anda untuk membuat akun Gmail sesuai format ketentuan, setorkan, dan nikmati hasilnya!
                                </p>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: CARA KERJA & CUAN */}
                    {activeTab === 'how' && (
                        <div className="space-y-3.5 animate-in fade-in duration-150">
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Ikuti 4 alur langkah mudah untuk mulai menghasilkan saldo di Triple9:
                            </p>

                            <div className="space-y-2.5">
                                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-blue-600 dark:text-blue-400 font-extrabold text-xs mt-0.5">
                                        01.
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                            Buat Akun Gmail Sesuai Format
                                        </h4>
                                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                                            Gunakan format password room yang tersedia (misal: <code>hehe1122</code> atau <code>zero1122</code>). Manfaatkan fitur Generator Gmail Cepat untuk inspirasi nama email.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-blue-600 dark:text-blue-400 font-extrabold text-xs mt-0.5">
                                        02.
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                            Setorkan Akun di Menu &quot;Stor Akun&quot;
                                        </h4>
                                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                                            Ketik atau paste email Anda (bisa batch banyak akun sekaligus). Pilih jalur room yang sesuai dan klik tombol Stor.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-blue-600 dark:text-blue-400 font-extrabold text-xs mt-0.5">
                                        03.
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                            Audit &amp; Verifikasi Transparan
                                        </h4>
                                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                                            Sistem dan tim pemeriksa mengecek validitas akun secara akurat. Pantau status akun Anda secara realtime di menu <strong>Riwayat Stor</strong>.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-blue-600 dark:text-blue-400 font-extrabold text-xs mt-0.5">
                                        04.
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                            Reward Masuk &amp; Tarik ke E-Wallet
                                        </h4>
                                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                                            Reward otomatis menambah Saldo Anda begitu akun berstatus <strong>Diterima</strong>. Tarik saldo kapan pun ke e-wallet tanpa biaya admin!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 3: RULES & KEUNGGULAN */}
                    {activeTab === 'tips' && (
                        <div className="space-y-3.5 animate-in fade-in duration-150">
                            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                    <span>Tips Agar 100% Akun Disetujui (ACC):</span>
                                </h4>
                                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pl-5 list-disc mt-1.5">
                                    <li>Pastikan password akun persis sesuai room (misal: <code className="text-slate-800 dark:text-slate-200 font-semibold">hehe1122</code>).</li>
                                    <li>Akun tidak dalam status dinonaktifkan (*disabled*) atau meminta verifikasi nomor telepon.</li>
                                    <li>Gunakan format nama pengguna yang wajar dan bukan spam acak ekstrim.</li>
                                    <li>Cek berkala ketentuan terbaru pada menu <strong>Ketentuan &amp; Rules</strong>.</li>
                                </ul>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                                    <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                                        <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                        <span>Email Checker Terintegrasi</span>
                                    </h5>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                                        Uji validitas email Anda terlebih dahulu sebelum disetor ke sistem.
                                    </p>
                                </div>

                                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                                    <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                                        <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                        <span>Bantuan CS 24 Jam</span>
                                    </h5>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                                        Kirimkan kendala melalui menu Laporan Saya atau grup komunitas Triple9.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>Panduan resmi ekosistem &amp; reward Triple9</span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={() => handleAction('rules')}
                            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-zinc-800 transition cursor-pointer"
                        >
                            Baca Rules
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAction('stor')}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition cursor-pointer"
                        >
                            <span>Mulai Stor Akun</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
