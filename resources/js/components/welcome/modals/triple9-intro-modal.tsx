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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-in fade-in duration-150"
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-md bg-white border-[3px] border-black shadow-[10px_10px_0px_0px_#000000] overflow-hidden">
                {/* Header Banner */}
                <div className="relative p-6 pb-5 bg-[#F5F5DC] border-b-2 border-black shrink-0">
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                        }}
                        className="absolute top-4 right-4 z-30 flex h-8 w-8 items-center justify-center rounded-sm border-2 border-black bg-white hover:bg-[#FF00FF] shadow-[2px_2px_0px_0px_#000000] text-black transition cursor-pointer"
                        aria-label="Tutup popup"
                    >
                        <X className="h-4 w-4 stroke-[3]" />
                    </button>

                    <div className="relative z-10 flex items-start gap-3.5 pr-12">
                        <div className="size-9 rounded-sm border-2 border-black bg-[#00C2CB] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                            <AppLogoIcon className="h-6 w-6 text-black fill-current shrink-0" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-black">
                                Selamat datang di Triple9
                            </h2>
                            <p className="text-xs sm:text-sm font-bold text-neutral-700 mt-1">
                                Platform setoran akun gmail terpercaya dan menguntungkan.
                            </p>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="relative z-10 flex items-center gap-2 mt-5">
                        <button
                            type="button"
                            onClick={() => setActiveTab('about')}
                            className={`flex-1 py-2 px-3 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
                                activeTab === 'about'
                                    ? 'bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]'
                                    : 'bg-white text-black hover:bg-neutral-100'
                            }`}
                        >
                            <img src="/images/icon/what.png" alt="Info" className="h-4 w-4 object-contain shrink-0" />
                            <span>Apa itu Triple9</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('how')}
                            className={`flex-1 py-2 px-3 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
                                activeTab === 'how'
                                    ? 'bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]'
                                    : 'bg-white text-black hover:bg-neutral-100'
                            }`}
                        >
                            <img src="/images/icon/generate.png" alt="Cara Kerja" className="h-4 w-4 object-contain shrink-0" />
                            <span>Cara Kerja &amp; Cuan</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('tips')}
                            className={`flex-1 py-2 px-3 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
                                activeTab === 'tips'
                                    ? 'bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]'
                                    : 'bg-white text-black hover:bg-neutral-100'
                            }`}
                        >
                            <img src="/images/icon/notes.png" alt="Rules" className="h-4 w-4 object-contain shrink-0" />
                            <span>Ketentuan &amp; Rules</span>
                        </button>
                    </div>
                </div>

                {/* Body Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 text-black text-xs sm:text-sm leading-relaxed no-scrollbar bg-white">
                    {/* TAB 1: APA ITU TRIPLE9 */}
                    {activeTab === 'about' && (
                        <div className="space-y-4 animate-in fade-in duration-150">
                            <div className="p-4 rounded-sm bg-[#F5F5DC] border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                                <h3 className="text-sm font-black uppercase tracking-wider text-black mb-1">
                                    Mengenal Platform
                                </h3>
                                <p className="text-xs font-bold text-neutral-800 leading-relaxed">
                                    <strong>Triple9</strong> adalah ekosistem digital resmi untuk penyetoran dan pertukaran akun Gmail yang dibuat sesuai standar kualitas. Setiap akun yang disetor dan berhasil lolos verifikasi akan langsung dikonversi menjadi saldo reward rupiah tunai.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="p-4 rounded-sm bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                                    <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[1px_1px_0px_0px_#000000] flex items-center justify-center mb-2.5">
                                        <img src="/images/icon/salary.png" alt="Reward Saldo" className="h-5 w-5 object-contain" />
                                    </div>
                                    <h4 className="text-xs font-black uppercase tracking-wider text-black mb-1">
                                        Reward Saldo Instan
                                    </h4>
                                    <p className="text-[11px] font-bold text-neutral-700 leading-snug">
                                        Setiap akun Gmail yang disetujui menghasilkan reward saldo Rp5.000/akun.
                                    </p>
                                </div>

                                <div className="p-4 rounded-sm bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                                    <div className="size-9 rounded-sm border-2 border-black bg-[#00C2CB] shadow-[1px_1px_0px_0px_#000000] flex items-center justify-center mb-2.5">
                                        <img src="/images/icon/wallet.png" alt="Pencairan E-Wallet" className="h-5 w-5 object-contain" />
                                    </div>
                                    <h4 className="text-xs font-black uppercase tracking-wider text-black mb-1">
                                        Pencairan E-Wallet
                                    </h4>
                                    <p className="text-[11px] font-bold text-neutral-700 leading-snug">
                                        Tarik saldo kapan pun ke DANA, GoPay, OVO, atau ShopeePay dengan minimal Rp10.000.
                                    </p>
                                </div>

                                <div className="p-4 rounded-sm bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                                    <div className="size-9 rounded-sm border-2 border-black bg-[#FF00FF] shadow-[1px_1px_0px_0px_#000000] flex items-center justify-center mb-2.5">
                                        <img src="/images/icon/fire.png" alt="Bonus Room & Event" className="h-5 w-5 object-contain" />
                                    </div>
                                    <h4 className="text-xs font-black uppercase tracking-wider text-black mb-1">
                                        Bonus Room &amp; Event
                                    </h4>
                                    <p className="text-[11px] font-bold text-neutral-700 leading-snug">
                                        Dapatkan bonus rate harian pada room tertentu dan hadiah kompetisi Leaderboard.
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 rounded-sm bg-[#F5F5DC] border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                                <h4 className="text-xs font-black uppercase tracking-wider text-black mb-1.5">
                                    Siapa saja yang bisa menggunakan Triple9?
                                </h4>
                                <p className="text-xs font-bold text-neutral-800 leading-relaxed">
                                    Siapa saja yang ingin mendapatkan penghasilan sampingan secara fleksibel dari rumah. Cukup gunakan HP atau laptop Anda untuk membuat akun Gmail sesuai format ketentuan, setorkan, dan nikmati hasilnya!
                                </p>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: CARA KERJA & CUAN */}
                    {activeTab === 'how' && (
                        <div className="space-y-3.5 animate-in fade-in duration-150">
                            <p className="text-xs font-black uppercase tracking-wider text-black">
                                Ikuti 4 alur langkah mudah untuk mulai menghasilkan saldo di Triple9:
                            </p>

                            <div className="space-y-2.5">
                                <div className="flex items-start gap-3 p-3.5 rounded-sm bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#FFD700] text-black font-black text-xs">
                                        01
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-wider text-black">
                                            Buat Akun Gmail Sesuai Format
                                        </h4>
                                        <p className="text-[11px] font-bold text-neutral-700 mt-1 leading-relaxed">
                                            Gunakan format password dari room yang tersedia. Manfaatkan fitur Generator Gmail Cepat untuk inspirasi nama email.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3.5 rounded-sm bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#00C2CB] text-black font-black text-xs">
                                        02
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-wider text-black">
                                            Setorkan Akun di Menu &quot;Setor Akun&quot;
                                        </h4>
                                        <p className="text-[11px] font-bold text-neutral-700 mt-1 leading-relaxed">
                                            Ketik atau paste email Anda bisa batch banyak akun sekaligus. Pilih jalur room yang sesuai dan klik tombol Setor.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3.5 rounded-sm bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#FF00FF] text-black font-black text-xs">
                                        03
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-wider text-black">
                                            Audit &amp; Verifikasi Transparan
                                        </h4>
                                        <p className="text-[11px] font-bold text-neutral-700 mt-1 leading-relaxed">
                                            Sistem dan tim pemeriksa akan mengecek validitas akun secara akurat. Pantau status akun Anda di menu <strong>Riwayat Setor</strong>.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3.5 rounded-sm bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#FFD700] text-black font-black text-xs">
                                        04
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-wider text-black">
                                            Reward Masuk &amp; Tarik ke E-Wallet
                                        </h4>
                                        <p className="text-[11px] font-bold text-neutral-700 mt-1 leading-relaxed">
                                            Reward otomatis menambah Saldo ke akun anda yang berstatus <strong>Diterima</strong>. Tarik saldo kapan pun ke e-wallet tanpa biaya admin!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 3: KETENTUAN & RULES*/}
                    {activeTab === 'tips' && (
                        <div className="space-y-3.5 animate-in fade-in duration-150">
                            <div className="p-4 rounded-sm bg-[#F5F5DC] border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                                <h4 className="text-xs font-black uppercase tracking-wider text-black mb-1 flex items-center gap-1.5">
                                    <img src="/images/icon/checklist.png" alt="ACC" className="h-4 w-4 object-contain shrink-0" />
                                    <span>Tips Agar 100% Akun Disetujui:</span>
                                </h4>
                                <ul className="space-y-1.5 text-xs font-bold text-neutral-800 pl-5 list-disc mt-2">
                                    <li>Pastikan password akun persis sesuai room (misal: <strong className="bg-[#FFD700] px-1 border border-black font-mono">triple9</strong>).</li>
                                    <li>Akun tidak dalam status dinonaktifkan atau meminta verifikasi nomor telepon.</li>
                                    <li>Gunakan format nama pengguna yang wajar dan bukan spam acak.</li>
                                    <li>Cek berkala ketentuan terbaru pada menu <strong>Ketentuan &amp; Rules</strong>.</li>
                                </ul>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                <div className="p-3.5 rounded-sm bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                                    <h5 className="text-xs font-black uppercase tracking-wider text-black mb-1 flex items-center gap-1.5">
                                        <img src="/images/icon/find_checker.png" alt="Checker" className="h-4 w-4 object-contain shrink-0" />
                                        <span>Email Checker Terintegrasi</span>
                                    </h5>
                                    <p className="text-[11px] font-bold text-neutral-700 leading-snug">
                                        Uji validitas email Anda terlebih dahulu sebelum disetor ke sistem.
                                    </p>
                                </div>

                                <div className="p-3.5 rounded-sm bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                                    <h5 className="text-xs font-black uppercase tracking-wider text-black mb-1 flex items-center gap-1.5">
                                        <img src="/images/icon/ticket.png" alt="Bantuan" className="h-4 w-4 object-contain shrink-0" />
                                        <span>Bantuan CS 24 Jam</span>
                                    </h5>
                                    <p className="text-[11px] font-bold text-neutral-700 leading-snug">
                                        Kirimkan kendala langsung melalui WhatsApp CS Triple9.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="p-4 sm:p-5 border-t-2 border-black bg-[#F5F5DC] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black">
                        <span>Panduan Resmi Triple9</span>
                    </div>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={() => handleAction('rules')}
                            className="flex-1 sm:flex-none px-4 py-2.5 rounded-md text-xs font-black uppercase tracking-wider text-black border-2 border-black bg-white hover:bg-[#F5F5DC] shadow-[2px_2px_0px_0px_#000000] transition cursor-pointer"
                        >
                            Baca Rules
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAction('stor')}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-md text-xs font-black uppercase tracking-wider text-black bg-[#00C2CB] border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition cursor-pointer"
                        >
                            <span>Mulai Setor Akun</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
