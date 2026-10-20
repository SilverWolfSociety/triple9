import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';

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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header Banner */}
                <div className="relative p-6 pb-5 bg-neutral-50 dark:bg-neutral-900/90 border-b border-neutral-200/80 dark:border-neutral-800 shrink-0">
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                        }}
                        className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
                        aria-label="Tutup popup"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <div className="relative z-10 flex items-start gap-3.5 pr-12">
                        <div className="flex shrink-0 items-center justify-center mt-1">
                            <AppLogoIcon className="h-8 w-8 text-[#FF2D20] fill-current shrink-0" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-snug">
                                Selamat datang di Triple9
                            </h2>
                            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mt-1">
                                Platform setoran akun gmail terpercaya dan menguntungkan.
                            </p>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="relative z-10 flex items-center gap-1.5 mt-5 bg-neutral-100 dark:bg-neutral-800/70 p-1 rounded-xl text-xs font-semibold">
                        <button
                            type="button"
                            onClick={() => setActiveTab('about')}
                            className={`flex-1 py-2 px-3 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === 'about'
                                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs font-bold border border-neutral-200/80 dark:border-neutral-700/60'
                                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-white/50 dark:hover:bg-neutral-800/50'
                                }`}
                        >
                            <img src="/images/icon/what.png" alt="Info" className="h-4 w-4 object-contain shrink-0" />
                            <span>Apa itu Triple9</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('how')}
                            className={`flex-1 py-2 px-3 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === 'how'
                                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs font-bold border border-neutral-200/80 dark:border-neutral-700/60'
                                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-white/50 dark:hover:bg-neutral-800/50'
                                }`}
                        >
                            <img src="/images/icon/generate.png" alt="Cara Kerja" className="h-4 w-4 object-contain shrink-0" />
                            <span>Cara Kerja &amp; Cuan</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('tips')}
                            className={`flex-1 py-2 px-3 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === 'tips'
                                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs font-bold border border-neutral-200/80 dark:border-neutral-700/60'
                                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-white/50 dark:hover:bg-neutral-800/50'
                                }`}
                        >
                            <img src="/images/icon/notes.png" alt="Rules" className="h-4 w-4 object-contain shrink-0" />
                            <span>Ketentuan &amp; Rules</span>
                        </button>
                    </div>
                </div>

                {/* Body Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed no-scrollbar">
                    {/* TAB 1: APA ITU TRIPLE9 */}
                    {activeTab === 'about' && (
                        <div className="space-y-4 animate-in fade-in duration-150">
                            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                                    Mengenal Platform
                                </h3>
                                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                    <strong>Triple9</strong> adalah ekosistem digital resmi untuk penyetoran, verifikasi, dan pertukaran akun Gmail yang dibuat sesuai standar kualitas. Setiap akun yang disetor dan berhasil lolos verifikasi akan langsung dikonversi menjadi saldo reward rupiah tunai.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                                    <div className="flex items-center mb-2.5">
                                        <img src="/images/icon/salary.png" alt="Reward Saldo" className="h-7 w-7 object-contain shrink-0" />
                                    </div>
                                    <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                                        Reward Saldo Instan
                                    </h4>
                                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                                        Setiap akun Gmail yang disetujui menghasilkan reward saldo Rp5.000/akun.
                                    </p>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                                    <div className="flex items-center mb-2.5">
                                        <img src="/images/icon/wallet.png" alt="Pencairan E-Wallet" className="h-7 w-7 object-contain shrink-0" />
                                    </div>
                                    <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                                        Pencairan E-Wallet
                                    </h4>
                                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                                        Tarik saldo kapan pun ke DANA, GoPay, OVO, atau ShopeePay dengan minimal Rp10.000.
                                    </p>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                                    <div className="flex items-center mb-2.5">
                                        <img src="/images/icon/fire.png" alt="Bonus Room & Event" className="h-7 w-7 object-contain shrink-0" />
                                    </div>
                                    <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                                        Bonus Room &amp; Event
                                    </h4>
                                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                                        Dapatkan bonus rate harian pada room tertentu dan hadiah kompetisi Leaderboard.
                                    </p>
                                </div>
                            </div>

                            <div className="p-3.5 rounded-2xl bg-neutral-50/80 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-800">
                                <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1.5">
                                    Siapa saja yang bisa menggunakan Triple9?
                                </h4>
                                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                    Siapa saja yang ingin mendapatkan penghasilan sampingan secara fleksibel dari rumah. Cukup gunakan HP atau laptop Anda untuk membuat akun Gmail sesuai format ketentuan, setorkan, dan nikmati hasilnya!
                                </p>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: CARA KERJA & CUAN */}
                    {activeTab === 'how' && (
                        <div className="space-y-3.5 animate-in fade-in duration-150">
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                Ikuti 4 alur langkah mudah untuk mulai menghasilkan saldo di Triple9:
                            </p>

                            <div className="space-y-2.5">
                                <div className="flex items-start gap-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-neutral-900 dark:text-white font-extrabold text-xs mt-0.5">
                                        01.
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                                            Buat Akun Gmail Sesuai Format
                                        </h4>
                                        <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed">
                                            Gunakan format password room yang tersedia. Manfaatkan fitur Generator Gmail Cepat untuk inspirasi nama email.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-neutral-900 dark:text-white font-extrabold text-xs mt-0.5">
                                        02.
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                                            Setorkan Akun di Menu &quot;Setor Akun&quot;
                                        </h4>
                                        <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed">
                                            Ketik atau paste email Anda bisa batch banyak akun sekaligus. Pilih jalur room yang sesuai dan klik tombol Setor.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-neutral-900 dark:text-white font-extrabold text-xs mt-0.5">
                                        03.
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                                            Audit &amp; Verifikasi Transparan
                                        </h4>
                                        <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed">
                                            Sistem dan tim pemeriksa mengecek validitas akun secara akurat. Pantau status akun Anda secara realtime di menu <strong>Riwayat Setor</strong>.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-neutral-900 dark:text-white font-extrabold text-xs mt-0.5">
                                        04.
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                                            Reward Masuk &amp; Tarik ke E-Wallet
                                        </h4>
                                        <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed">
                                            Reward otomatis menambah Saldo Anda begitu akun berstatus <strong>Diterima</strong>. Tarik saldo kapan pun ke e-wallet tanpa biaya admin!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 3: KETENTUAN & RULES*/}
                    {activeTab === 'tips' && (
                        <div className="space-y-3.5 animate-in fade-in duration-150">
                            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                                <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1 flex items-center gap-1.5">
                                    <img src="/images/icon/checklist.png" alt="ACC" className="h-4 w-4 object-contain shrink-0" />
                                    <span>Tips Agar 100% Akun Disetujui:</span>
                                </h4>
                                <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400 pl-5 list-disc mt-1.5">
                                    <li>Pastikan password akun persis sesuai room (misal: <code className="text-neutral-800 dark:text-neutral-200 font-semibold">triple9</code>).</li>
                                    <li>Akun tidak dalam status dinonaktifkan atau meminta verifikasi nomor telepon.</li>
                                    <li>Gunakan format nama pengguna yang wajar dan bukan spam acak.</li>
                                    <li>Cek berkala ketentuan terbaru pada menu <strong>Ketentuan &amp; Rules</strong>.</li>
                                </ul>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                                    <h5 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1 flex items-center gap-1.5">
                                        <img src="/images/icon/find_checker.png" alt="Checker" className="h-4 w-4 object-contain shrink-0" />
                                        <span>Email Checker Terintegrasi</span>
                                    </h5>
                                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                                        Uji validitas email Anda terlebih dahulu sebelum disetor ke sistem.
                                    </p>
                                </div>

                                <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                                    <h5 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1 flex items-center gap-1.5">
                                        <img src="/images/icon/ticket.png" alt="Bantuan" className="h-4 w-4 object-contain shrink-0" />
                                        <span>Bantuan CS 24 Jam</span>
                                    </h5>
                                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                                        Kirimkan kendala melalui menu Laporan Saya.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="p-4 sm:p-5 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                    <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                        <span>Panduan Resmi Triple9</span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={() => handleAction('rules')}
                            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition cursor-pointer"
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
