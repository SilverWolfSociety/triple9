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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-in fade-in duration-150"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-md bg-white border-[3px] border-black shadow-[10px_10px_0px_0px_#000000] overflow-hidden">
                {/* Header Banner */}
                <div className="relative p-6 pb-5 bg-[#F5F5DC] border-b-2 border-black shrink-0">
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute top-4 right-4 z-30 flex h-8 w-8 items-center justify-center rounded-sm border-2 border-black bg-white hover:bg-[#FF00FF] shadow-[2px_2px_0px_0px_#000000] text-black transition cursor-pointer"
                        aria-label="Tutup pengaturan akun"
                    >
                        <X className="h-4 w-4 stroke-[3]" />
                    </button>

                    <div className="relative z-10 flex items-start gap-3.5 pr-12">
                        <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                            <img src="/images/icon/person_yellow.png" alt="Profil" className="h-5 w-5 object-contain" />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-black">
                                Pengaturan Akun
                            </h2>
                            <p className="text-xs font-bold text-neutral-700 mt-1">
                                Kelola identitas profil dan keamanan kata sandi akun Triple9 Anda.
                            </p>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="relative z-10 grid grid-cols-2 gap-2 mt-5">
                        <button
                            type="button"
                            onClick={() => setActiveTab('profile')}
                            className={`py-2 px-3 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer flex items-center justify-center gap-2 ${
                                activeTab === 'profile'
                                    ? 'bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]'
                                    : 'bg-white text-black hover:bg-neutral-100'
                            }`}
                        >
                            <img src="/images/icon/person_yellow.png" alt="Profil" className="h-4 w-4 object-contain shrink-0" />
                            <span>Profil</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('security')}
                            className={`py-2 px-3 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer flex items-center justify-center gap-2 ${
                                activeTab === 'security'
                                    ? 'bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]'
                                    : 'bg-white text-black hover:bg-neutral-100'
                            }`}
                        >
                            <img src="/images/icon/key.png" alt="Keamanan" className="h-4 w-4 object-contain shrink-0" />
                            <span>Keamanan</span>
                        </button>
                    </div>
                </div>

                {/* Body Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 text-black text-xs sm:text-sm leading-relaxed no-scrollbar bg-white">
                    {/* TAB 1: PROFIL & DATA DIRI */}
                    {activeTab === 'profile' && (
                        <div className="space-y-4 animate-in fade-in duration-150">
                            {/* Member ID Card */}
                            <div className="flex items-center gap-3.5 p-4 rounded-sm bg-[#F5F5DC] border-2 border-black shadow-[4px_4px_0px_0px_#000000]">
                                <Avatar className="h-12 w-12 shrink-0 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000]">
                                    <AvatarImage src={selectedAvatar || user?.avatar} alt={user?.name} className="object-cover size-full" />
                                    <AvatarFallback className="rounded-sm bg-[#FFD700] text-black font-black text-base">
                                        {user?.name ? getInitials(user.name) : 'TR'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-black uppercase text-black truncate">
                                            {user?.name || 'Member Triple9'}
                                        </h3>
                                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-1.5 py-0.2 rounded-xs border border-black bg-[#00C2CB] text-black">
                                            <span>Aktif</span>
                                        </span>
                                    </div>
                                    <p className="text-xs font-mono font-bold text-neutral-800 truncate mt-0.5">
                                        {user?.email || 'member@triple9.id'}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-[10px] font-black uppercase text-neutral-600">ID Member</div>
                                    <div className="text-xs font-mono font-black text-black">
                                        #TRP-{user?.id ? String(user.id).padStart(4, '0') : '9999'}
                                    </div>
                                </div>
                            </div>

                            {/* Form Edit Profile */}
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-wider text-black">
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
                                                    className={`relative aspect-square rounded-sm p-1.5 transition-all flex items-center justify-center cursor-pointer ${
                                                        isSelected
                                                            ? 'border-2 border-black bg-[#00C2CB] shadow-[3px_3px_0px_0px_#000000] scale-105'
                                                            : 'border-2 border-black bg-white hover:bg-[#F5F5DC]'
                                                    }`}
                                                    title={item.name}
                                                >
                                                    <img
                                                        src={item.path}
                                                        alt={item.name}
                                                        className="h-full w-full object-contain"
                                                    />
                                                    {isSelected && (
                                                        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-xs bg-[#FFD700] border border-black text-black shadow-xs">
                                                            <Check className="h-2.5 w-2.5 stroke-[4]" />
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="settings-name" className="text-xs font-black uppercase tracking-wider text-black">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        id="settings-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Nama lengkap Anda"
                                        className="w-full rounded-sm border-2 border-black bg-white px-3.5 py-2.5 text-xs font-bold text-black placeholder:text-neutral-500 shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="settings-email" className="text-xs font-black uppercase tracking-wider text-black">
                                        Alamat Email
                                    </label>
                                    <input
                                        id="settings-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="email@example.com"
                                        className="w-full rounded-sm border-2 border-black bg-white px-3.5 py-2.5 text-xs font-bold text-black placeholder:text-neutral-500 shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                                    />
                                </div>

                                <div className="pt-2 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSavingProfile}
                                        className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-md text-xs font-black uppercase tracking-wider bg-[#00C2CB] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition cursor-pointer disabled:opacity-50"
                                    >
                                        <span>{isSavingProfile ? 'Menyimpan...' : 'Simpan Profil'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* TAB 2: KEAMANAN & KATA SANDI */}
                    {activeTab === 'security' && (
                        <div className="space-y-4 animate-in fade-in duration-150">
                            <form onSubmit={handleUpdatePassword} className="space-y-3.5">
                                <div className="space-y-1.5">
                                    <label htmlFor="settings-current-pw" className="text-xs font-black uppercase tracking-wider text-black">
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
                                            className="w-full rounded-sm border-2 border-black bg-white px-3.5 py-2.5 pr-10 text-xs font-bold text-black placeholder:text-neutral-500 shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPw(!showCurrentPw)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-black cursor-pointer"
                                        >
                                            {showCurrentPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label htmlFor="settings-new-pw" className="text-xs font-black uppercase tracking-wider text-black">
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
                                                className="w-full rounded-sm border-2 border-black bg-white px-3.5 py-2.5 pr-10 text-xs font-bold text-black placeholder:text-neutral-500 shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPw(!showNewPw)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-black cursor-pointer"
                                            >
                                                {showNewPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="settings-confirm-pw" className="text-xs font-black uppercase tracking-wider text-black">
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
                                                className="w-full rounded-sm border-2 border-black bg-white px-3.5 py-2.5 pr-10 text-xs font-bold text-black placeholder:text-neutral-500 shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPw(!showConfirmPw)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-black cursor-pointer"
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
                                        className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-md text-xs font-black uppercase tracking-wider bg-[#00C2CB] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition cursor-pointer disabled:opacity-50"
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
