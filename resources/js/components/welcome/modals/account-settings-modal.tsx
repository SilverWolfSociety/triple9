import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import {
    X,
    User,
    Mail,
    KeyRound,
    Wallet,
    ShieldCheck,
    Info,
    Check,
    BadgeCheck,
    Calendar,
    LogOut,
    AlertCircle,
    Eye,
    EyeOff,
} from 'lucide-react';
import type { User as UserType } from '@/types';
import type { EwalletType } from '../types';

interface AccountSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    user?: UserType;
    selectedEwallet: EwalletType;
    onChangeEwallet: (wallet: EwalletType) => void;
    savedEwalletNumbers: Record<string, string>;
    onSaveEwalletNumber: (wallet: EwalletType, number: string) => void;
}

export function AccountSettingsModal({
    isOpen,
    onClose,
    user,
    selectedEwallet,
    onChangeEwallet,
    savedEwalletNumbers,
    onSaveEwalletNumber,
}: AccountSettingsModalProps) {
    const [activeTab, setActiveTab] = useState<'profile' | 'wallet' | 'security' | 'info'>('profile');

    // Profile Form State
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [profileSuccessMsg, setProfileSuccessMsg] = useState('');
    const [profileErrorMsg, setProfileErrorMsg] = useState('');

    // E-Wallet Form State
    const [currentEwallet, setCurrentEwallet] = useState<EwalletType>(selectedEwallet || 'DANA');
    const [ewalletNumber, setEwalletNumber] = useState(savedEwalletNumbers[selectedEwallet] || '');
    const [ewalletSuccessMsg, setEwalletSuccessMsg] = useState('');

    // Security Form State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPw, setShowCurrentPw] = useState(false);
    const [showNewPw, setShowNewPw] = useState(false);
    const [isSavingPassword, setIsSavingPassword] = useState(false);
    const [passwordSuccessMsg, setPasswordSuccessMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    useEffect(() => {
        setEwalletNumber(savedEwalletNumbers[currentEwallet] || '');
    }, [currentEwallet, savedEwalletNumbers]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setProfileSuccessMsg('');
        setProfileErrorMsg('');
        setIsSavingProfile(true);

        router.patch(
            '/settings/profile',
            { name, email },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSavingProfile(false);
                    setProfileSuccessMsg('Data profil berhasil diperbarui!');
                    setTimeout(() => setProfileSuccessMsg(''), 3500);
                },
                onError: (errs) => {
                    setIsSavingProfile(false);
                    setProfileErrorMsg(errs.name || errs.email || 'Gagal memperbarui profil.');
                },
            }
        );
    };

    const handleSaveEwallet = (e: React.FormEvent) => {
        e.preventDefault();
        if (!ewalletNumber.trim() || ewalletNumber.length < 10) {
            alert('Nomor e-wallet minimal 10 digit angka.');
            return;
        }
        onChangeEwallet(currentEwallet);
        onSaveEwalletNumber(currentEwallet, ewalletNumber.trim());
        setEwalletSuccessMsg(`Nomor rekening ${currentEwallet} berhasil disimpan!`);
        setTimeout(() => setEwalletSuccessMsg(''), 3500);
    };

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordSuccessMsg('');
        setPasswordErrorMsg('');

        if (newPassword.length < 8) {
            setPasswordErrorMsg('Kata sandi baru minimal 8 karakter.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordErrorMsg('Konfirmasi kata sandi baru tidak cocok.');
            return;
        }

        setIsSavingPassword(true);
        router.put(
            '/settings/password',
            {
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: confirmPassword,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSavingPassword(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setPasswordSuccessMsg('Kata sandi berhasil diperbarui!');
                    setTimeout(() => setPasswordSuccessMsg(''), 3500);
                },
                onError: (errs) => {
                    setIsSavingPassword(false);
                    setPasswordErrorMsg(
                        errs.current_password ||
                        errs.password ||
                        'Gagal memperbarui kata sandi. Periksa kata sandi saat ini.'
                    );
                },
            }
        );
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header Banner */}
                <div className="relative p-6 pb-5 bg-blue-600 text-white shrink-0">
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute top-3.5 right-3.5 z-30 flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/15 active:bg-white/25 active:scale-95 transition cursor-pointer"
                        aria-label="Tutup pengaturan akun"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <div className="relative z-10 flex items-start gap-3.5 pr-12">
                        <div className="flex shrink-0 items-center justify-center text-white mt-1">
                            <User className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-100 mb-1">
                                <span>Manajemen Pengguna</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-snug">
                                Pengaturan Akun
                            </h2>
                            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed mt-1">
                                Kelola identitas profil, akun e-wallet pencairan, dan keamanan sandi akun Triple9 Anda.
                            </p>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-5 bg-blue-700/80 p-1 rounded-xl text-xs font-semibold">
                        <button
                            type="button"
                            onClick={() => setActiveTab('profile')}
                            className={`py-1.5 px-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                                activeTab === 'profile'
                                    ? 'bg-white text-blue-700 shadow-sm font-bold'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            <User className="h-3.5 w-3.5" />
                            <span>Profil</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('wallet')}
                            className={`py-1.5 px-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                                activeTab === 'wallet'
                                    ? 'bg-white text-blue-700 shadow-sm font-bold'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            <Wallet className="h-3.5 w-3.5" />
                            <span>E-Wallet</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('security')}
                            className={`py-1.5 px-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                                activeTab === 'security'
                                    ? 'bg-white text-blue-700 shadow-sm font-bold'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            <KeyRound className="h-3.5 w-3.5" />
                            <span>Keamanan</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('info')}
                            className={`py-1.5 px-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                                activeTab === 'info'
                                    ? 'bg-white text-blue-700 shadow-sm font-bold'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            <Info className="h-3.5 w-3.5" />
                            <span>Status Akun</span>
                        </button>
                    </div>
                </div>

                {/* Body Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed no-scrollbar">
                    {/* TAB 1: PROFIL & DATA DIRI */}
                    {activeTab === 'profile' && (
                        <div className="space-y-4 animate-in fade-in duration-150">
                            {/* Member ID Card */}
                            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white font-black text-lg shadow-sm">
                                    {user?.name ? user.name.slice(0, 2).toUpperCase() : 'TR'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                                            {user?.name || 'Member Triple9'}
                                        </h3>
                                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                            <BadgeCheck className="h-3.5 w-3.5" />
                                            <span>Aktif</span>
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                        {user?.email || 'member@triple9.id'}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-[10px] text-slate-400 dark:text-slate-500">ID Member</div>
                                    <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                                        #TRP-{user?.id ? String(user.id).padStart(4, '0') : '9999'}
                                    </div>
                                </div>
                            </div>

                            {/* Alert Notifications */}
                            {profileSuccessMsg && (
                                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                    <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                                    <span>{profileSuccessMsg}</span>
                                </div>
                            )}

                            {profileErrorMsg && (
                                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                                    <span>{profileErrorMsg}</span>
                                </div>
                            )}

                            {/* Form Edit Profile */}
                            <form onSubmit={handleUpdateProfile} className="space-y-3.5">
                                <div className="space-y-1.5">
                                    <label htmlFor="settings-name" className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        id="settings-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Nama lengkap Anda"
                                        className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="settings-email" className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                        Alamat Email
                                    </label>
                                    <input
                                        id="settings-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="email@example.com"
                                        className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                                    />
                                </div>

                                <div className="pt-2 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSavingProfile}
                                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition cursor-pointer disabled:opacity-50"
                                    >
                                        {isSavingProfile ? 'Menyimpan...' : 'Simpan Profil'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* TAB 2: E-WALLET & PENCAIRAN */}
                    {activeTab === 'wallet' && (
                        <div className="space-y-4 animate-in fade-in duration-150">
                            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                                    Akun Penarikan Saldo Reward
                                </h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Tentukan e-wallet tujuan utama Anda. Nomor ini otomatis terpasang saat melakukan penarikan saldo reward pada menu Saldo.
                                </p>
                            </div>

                            {ewalletSuccessMsg && (
                                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                    <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                                    <span>{ewalletSuccessMsg}</span>
                                </div>
                            )}

                            {/* Wallet Selector Buttons */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {(['DANA', 'OVO', 'GoPay', 'ShopeePay'] as const).map((wallet) => (
                                    <button
                                        key={wallet}
                                        type="button"
                                        onClick={() => setCurrentEwallet(wallet)}
                                        className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                                            currentEwallet === wallet
                                                ? 'border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                                                : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] text-slate-700 dark:text-slate-300 hover:border-slate-300'
                                        }`}
                                    >
                                        <div className="text-xs font-bold">{wallet}</div>
                                        <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                                            {savedEwalletNumbers[wallet] || 'Belum diisi'}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Form Edit Wallet Number */}
                            <form onSubmit={handleSaveEwallet} className="space-y-3.5 pt-1">
                                <div className="space-y-1.5">
                                    <label htmlFor="settings-ewallet" className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                        Nomor E-Wallet {currentEwallet}
                                    </label>
                                    <input
                                        id="settings-ewallet"
                                        type="tel"
                                        value={ewalletNumber}
                                        onChange={(e) => setEwalletNumber(e.target.value.replace(/[^0-9]/g, ''))}
                                        required
                                        placeholder="Contoh: 081234567890"
                                        className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition font-mono"
                                    />
                                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                        Pastikan akun e-wallet Anda sudah aktif dan terdaftar dengan nomor HP di atas.
                                    </p>
                                </div>

                                <div className="pt-2 flex justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition cursor-pointer"
                                    >
                                        <span>Simpan Nomor {currentEwallet}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* TAB 3: KEAMANAN & KATA SANDI */}
                    {activeTab === 'security' && (
                        <div className="space-y-4 animate-in fade-in duration-150">
                            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                                    <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    <span>Ganti Kata Sandi Akun</span>
                                </h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Gunakan kata sandi yang kuat dengan minimal 8 karakter agar akun Triple9 Anda selalu aman.
                                </p>
                            </div>

                            {passwordSuccessMsg && (
                                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                    <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                                    <span>{passwordSuccessMsg}</span>
                                </div>
                            )}

                            {passwordErrorMsg && (
                                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                                    <span>{passwordErrorMsg}</span>
                                </div>
                            )}

                            <form onSubmit={handleUpdatePassword} className="space-y-3.5">
                                <div className="space-y-1.5">
                                    <label htmlFor="settings-current-pw" className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                        Kata Sandi Saat Ini
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="settings-current-pw"
                                            type={showCurrentPw ? 'text' : 'password'}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            required
                                            placeholder="Masukkan kata sandi saat ini"
                                            className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] px-3.5 py-2.5 pr-10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPw(!showCurrentPw)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                        >
                                            {showCurrentPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label htmlFor="settings-new-pw" className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                            Kata Sandi Baru
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="settings-new-pw"
                                                type={showNewPw ? 'text' : 'password'}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                                placeholder="Minimal 8 karakter"
                                                className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] px-3.5 py-2.5 pr-10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPw(!showNewPw)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                            >
                                                {showNewPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="settings-confirm-pw" className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                            Konfirmasi Kata Sandi Baru
                                        </label>
                                        <input
                                            id="settings-confirm-pw"
                                            type={showNewPw ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            placeholder="Ketik ulang kata sandi baru"
                                            className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSavingPassword}
                                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition cursor-pointer disabled:opacity-50"
                                    >
                                        {isSavingPassword ? 'Menyimpan...' : 'Perbarui Kata Sandi'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* TAB 4: STATUS & INFORMASI AKUN */}
                    {activeTab === 'info' && (
                        <div className="space-y-3.5 animate-in fade-in duration-150">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                                    <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">
                                        Peran Pengguna
                                    </div>
                                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1 flex items-center gap-1.5">
                                        <BadgeCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        <span>{user?.role === 'admin' ? 'Administrator Staff' : 'Member Pengguna Triple9'}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                                        Memiliki hak akses penuh untuk menyetor akun Gmail dan mencairkan reward saldo.
                                    </p>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                                    <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">
                                        Status Keanggotaan
                                    </div>
                                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
                                        <Check className="h-4 w-4" />
                                        <span>Verified &amp; Active</span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                                        Akun dalam kondisi normal tanpa pembatasan setoran maupun penalti audit.
                                    </p>
                                </div>
                            </div>

                            <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                        <span>Waktu Server</span>
                                    </span>
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                                        WIB (GMT+7)
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60 dark:border-zinc-800">
                                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                                        <span>Status Email</span>
                                    </span>
                                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                        Terverifikasi
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
