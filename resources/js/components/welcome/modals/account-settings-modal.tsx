import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import {
    X,
    Eye,
    EyeOff,
    Check,
} from 'lucide-react';
import type { User as UserType } from '@/types';
import type { EwalletType } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';

const AVAILABLE_AVATARS = [
    { id: 'anjing', name: 'Anjing', path: '/images/avatar/anjing.png' },
    { id: 'kelinci', name: 'Kelinci', path: '/images/avatar/kelinci.png' },
    { id: 'kucing', name: 'Kucing', path: '/images/avatar/kucing.png' },
    { id: 'panda', name: 'Panda', path: '/images/avatar/panda.png' },
    { id: 'penguin', name: 'Penguin', path: '/images/avatar/penguin.png' },
    { id: 'rubah', name: 'Rubah', path: '/images/avatar/rubah.png' },
];

interface AccountSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    user?: UserType;
    selectedEwallet?: EwalletType;
    onChangeEwallet?: (wallet: EwalletType) => void;
    savedEwalletNumbers?: Record<string, string>;
    onSaveEwalletNumber?: (wallet: EwalletType, number: string) => void;
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
    const getInitials = useInitials();
    const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

    // Profile Form State
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '/images/avatar/kucing.png');
    const [isSavingProfile, setIsSavingProfile] = useState(false);

    // Security Form State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPw, setShowCurrentPw] = useState(false);
    const [showNewPw, setShowNewPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);
    const [isSavingPassword, setIsSavingPassword] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            if (user.avatar) {
                setSelectedAvatar(user.avatar);
            }
        }
    }, [user]);


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
        setIsSavingProfile(true);

        router.patch(
            '/settings/profile',
            { name, email, avatar: selectedAvatar },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setIsSavingProfile(false);
                    onClose();
                },
                onError: (errs) => {
                    setIsSavingProfile(false);
                    toast.error(errs.name || errs.email || errs.avatar || 'Gagal memperbarui profil.');
                },
            }
        );
    };



    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            toast.error('Kata sandi baru minimal 8 karakter.');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Konfirmasi kata sandi baru tidak cocok.');
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
                preserveState: true,
                onSuccess: () => {
                    setIsSavingPassword(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    onClose();
                },
                onError: (errs) => {
                    setIsSavingPassword(false);
                    toast.error(
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header Banner */}
                <div className="relative p-6 pb-5 bg-neutral-50 dark:bg-neutral-900/90 border-b border-neutral-200/80 dark:border-neutral-800 shrink-0">
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
                        aria-label="Tutup pengaturan akun"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <div className="relative z-10 flex items-start gap-3.5 pr-12">
                        <div className="flex shrink-0 items-center justify-center mt-1">
                            <img src="/images/icon/person_yellow.png" alt="Profil" className="h-7 w-7 object-contain shrink-0" />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-snug">
                                Pengaturan Akun
                            </h2>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mt-1">
                                Kelola identitas profil dan keamanan kata sandi akun Triple9 Anda.
                            </p>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="relative z-10 grid grid-cols-2 gap-1.5 mt-5 bg-neutral-100 dark:bg-neutral-800/70 p-1 rounded-xl text-xs font-semibold">
                        <button
                            type="button"
                            onClick={() => setActiveTab('profile')}
                            className={`py-2 px-3 rounded-lg transition cursor-pointer flex items-center justify-center gap-2 ${activeTab === 'profile'
                                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs font-bold border border-neutral-200/80 dark:border-neutral-700/60'
                                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-white/50 dark:hover:bg-neutral-800/50'
                                }`}
                        >
                            <img src="/images/icon/person_yellow.png" alt="Profil" className="h-4 w-4 object-contain shrink-0" />
                            <span>Profil</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('security')}
                            className={`py-2 px-3 rounded-lg transition cursor-pointer flex items-center justify-center gap-2 ${activeTab === 'security'
                                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs font-bold border border-neutral-200/80 dark:border-neutral-700/60'
                                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-white/50 dark:hover:bg-neutral-800/50'
                                }`}
                        >
                            <img src="/images/icon/key.png" alt="Keamanan" className="h-4 w-4 object-contain shrink-0" />
                            <span>Keamanan</span>
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
                                <Avatar className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
                                    <AvatarImage src={selectedAvatar || user?.avatar} alt={user?.name} className="object-cover size-full" />
                                    <AvatarFallback className="rounded-full bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white font-semibold text-base">
                                        {user?.name ? getInitials(user.name) : 'TR'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                                            {user?.name || 'Member Triple9'}
                                        </h3>
                                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                            <img src="/images/icon/checklist.png" alt="Aktif" className="h-3.5 w-3.5 object-contain shrink-0" />
                                            <span>Aktif</span>
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                        {user?.email || 'member@triple9.id'}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-[10px] text-slate-400 dark:text-slate-500">ID Member</div>
                                    <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                        #TRP-{user?.id ? String(user.id).padStart(4, '0') : '9999'}
                                    </div>
                                </div>
                            </div>

                            {/* Form Edit Profile */}
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                        Pilih Avatar Profil
                                    </label>
                                    <div className="grid grid-cols-6 gap-2">
                                        {AVAILABLE_AVATARS.map((item) => {
                                            const isSelected = selectedAvatar === item.path;
                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => setSelectedAvatar(item.path)}
                                                    className={`relative aspect-square rounded-2xl p-1.5 transition-all flex items-center justify-center cursor-pointer ${
                                                        isSelected
                                                            ? 'border-2 border-blue-600 bg-transparent scale-105 shadow-xs'
                                                            : 'border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 bg-transparent hover:scale-102'
                                                    }`}
                                                    title={item.name}
                                                >
                                                    <img
                                                        src={item.path}
                                                        alt={item.name}
                                                        className="h-full w-full object-contain"
                                                    />
                                                    {isSelected && (
                                                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
                                                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
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
                                        <span>{isSavingProfile ? 'Menyimpan...' : 'Simpan Profil'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}



                    {/* TAB 3: KEAMANAN & KATA SANDI */}
                    {activeTab === 'security' && (
                        <div className="space-y-4 animate-in fade-in duration-150">



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
                                        <div className="relative">
                                            <input
                                                id="settings-confirm-pw"
                                                type={showConfirmPw ? 'text' : 'password'}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                placeholder="Ketik ulang kata sandi baru"
                                                className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] px-3.5 py-2.5 pr-10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPw(!showConfirmPw)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                                            >
                                                {showConfirmPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSavingPassword}
                                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition cursor-pointer disabled:opacity-50"
                                    >
                                        <span>{isSavingPassword ? 'Menyimpan...' : 'Perbarui Kata Sandi'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
}
