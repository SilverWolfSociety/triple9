import { useState } from 'react';
import {
    Check,
    DollarSign,
    Shield,
    ToggleLeft,
    ToggleRight,
} from 'lucide-react';
import { toast } from 'sonner';
import type { PlatformSettings } from '../types';

interface AdminSettingsViewProps {
    settings: PlatformSettings;
    onSaveSettings: (newSettings: PlatformSettings) => void;
}

export function AdminSettingsView({
    settings,
    onSaveSettings,
}: AdminSettingsViewProps) {
    const [formData, setFormData] = useState<PlatformSettings>({ ...settings });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSaveSettings(formData);
        toast.success('Pengaturan platform Triple9 berhasil diperbarui!');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header Card */}
            <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black pb-4">
                    <div>
                        <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-black flex items-center gap-2">
                            <img src="/images/icon/gear.png" alt="Pengaturan" className="size-5 object-contain shrink-0" />
                            Konfigurasi & Pengaturan Sistem
                        </h2>
                    </div>

                    <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border-2 border-black bg-[#00C2CB] hover:bg-[#00a8b0] text-black text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition cursor-pointer"
                    >
                        <img src="/images/icon/save.png" alt="Simpan" className="size-4 object-contain shrink-0" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
                    {/* Rate Harga Gmail */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-wider text-black">
                            Rate Harga Per Akun Gmail (Rp)
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-black">
                                Rp
                            </span>
                            <input
                                type="number"
                                required
                                min={500}
                                step={100}
                                value={formData.gmailRate}
                                onChange={(e) =>
                                    setFormData({ ...formData, gmailRate: Number(e.target.value) })
                                }
                                className="w-full pl-9 pr-3 py-2 rounded-none border-2 border-black bg-white text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000000] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Minimal Penarikan */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-wider text-black">
                            Batas Minimal Tarik Saldo (Rp)
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-black">
                                Rp
                            </span>
                            <input
                                type="number"
                                required
                                min={10000}
                                step={5000}
                                value={formData.minWithdraw}
                                onChange={(e) =>
                                    setFormData({ ...formData, minWithdraw: Number(e.target.value) })
                                }
                                className="w-full pl-9 pr-3 py-2 rounded-none border-2 border-black bg-white text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000000] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Bonus Referral */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-wider text-black">
                            Bonus Komisi Referral (Rp)
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-black">
                                Rp
                            </span>
                            <input
                                type="number"
                                required
                                min={100}
                                step={50}
                                value={formData.referralBonus}
                                onChange={(e) =>
                                    setFormData({ ...formData, referralBonus: Number(e.target.value) })
                                }
                                className="w-full pl-9 pr-3 py-2 rounded-none border-2 border-black bg-white text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000000] focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Platform Operational Toggles */}
            <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-black border-b-2 border-black pb-3">
                    Kontrol Operasional Sistem
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Buka/Tutup Setoran */}
                    <div className="p-4 rounded-sm border-2 border-black bg-[#F5F5DC] shadow-[3px_3px_0px_0px_#000000] flex items-center justify-between">
                        <div>
                            <div className="text-xs font-black uppercase tracking-wider text-black">
                                Penerimaan Setoran Akun
                            </div>
                            <div className="text-[11px] font-bold text-neutral-600 mt-0.5">
                                {formData.depositsOpen
                                    ? 'Platform saat ini menerima setoran akun dari user.'
                                    : 'Setoran sementara ditutup untuk maintenance.'}
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                setFormData({ ...formData, depositsOpen: !formData.depositsOpen })
                            }
                            className={`px-3 py-1.5 rounded-sm border-2 border-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] cursor-pointer ${formData.depositsOpen
                                ? 'bg-[#00C2CB] text-black'
                                : 'bg-[#FF00FF] text-black'
                                }`}
                        >
                            {formData.depositsOpen ? 'BUKA' : 'TUTUP'}
                        </button>
                    </div>

                    {/* Auto-Checker Bot */}
                    <div className="p-4 rounded-sm border-2 border-black bg-[#F5F5DC] shadow-[3px_3px_0px_0px_#000000] flex items-center justify-between">
                        <div>
                            <div className="text-xs font-black uppercase tracking-wider text-black">
                                Sistem Auto-Checker Bot
                            </div>
                            <div className="text-[11px] font-bold text-neutral-600 mt-0.5">
                                {formData.autoCheckActive
                                    ? 'Pengecekan live akun berjalan secara otomatis.'
                                    : 'Pengecekan otomatis dinonaktifkan (manual review).'}
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    autoCheckActive: !formData.autoCheckActive,
                                })
                            }
                            className={`px-3 py-1.5 rounded-sm border-2 border-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] cursor-pointer ${formData.autoCheckActive
                                ? 'bg-[#00C2CB] text-black'
                                : 'bg-white text-black'
                                }`}
                        >
                            {formData.autoCheckActive ? 'AKTIF' : 'NONAKTIF'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Broadcast Announcement Bar */}
            <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                    <div>
                        <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-black flex items-center gap-2">
                            <img src="/images/icon/notification.png" alt="Pengumuman" className="size-5 object-contain shrink-0" />
                            Banner Pengumuman
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={() =>
                            setFormData({
                                ...formData,
                                announcementActive: !formData.announcementActive,
                            })
                        }
                        className={`px-3 py-1.5 rounded-sm border-2 border-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] cursor-pointer ${formData.announcementActive
                            ? 'bg-[#FFD700] text-black'
                            : 'bg-white text-black'
                            }`}
                    >
                        {formData.announcementActive ? 'TAMPILKAN' : 'SEMBUNYIKAN'}
                    </button>
                </div>

                <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-black uppercase tracking-wider text-black">
                        Teks Pesan Pengumuman
                    </label>
                    <textarea
                        rows={3}
                        value={formData.announcementText}
                        onChange={(e) =>
                            setFormData({ ...formData, announcementText: e.target.value })
                        }
                        placeholder="Tuliskan pengumuman yang akan dibaca oleh user..."
                        className="w-full p-3 rounded-none border-2 border-black bg-white text-xs font-bold text-black placeholder:text-black/40 shadow-[2px_2px_0px_0px_#000000] focus:outline-none"
                    />
                </div>

                {formData.announcementActive && (
                    <div className="p-3 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center gap-2 text-xs font-bold text-black">
                        <span>Pratinjau: {formData.announcementText}</span>
                    </div>
                )}

                <div className="pt-2">
                    <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border-2 border-black bg-[#00C2CB] hover:bg-[#00a8b0] text-black text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition cursor-pointer"
                    >
                        <img src="/images/icon/save.png" alt="Simpan" className="size-4 object-contain shrink-0" />
                    </button>
                </div>
            </div>
        </form>
    );
}
