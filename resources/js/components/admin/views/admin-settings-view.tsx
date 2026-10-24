import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { PlatformSettings } from '../types';
import { initialPlatformSettings } from '../mock-data';

interface AdminSettingsViewProps {
    settings?: PlatformSettings;
    onSaveSettings?: (newSettings: PlatformSettings) => void;
}

type SettingsTab = 'tarif' | 'operasional' | 'broadcast' | 'komunitas' | 'sistem';

export function AdminSettingsView({
    settings = initialPlatformSettings,
    onSaveSettings,
}: AdminSettingsViewProps) {
    const [activeTab, setActiveTab] = useState<SettingsTab>('tarif');
    const [formData, setFormData] = useState<PlatformSettings>(() => ({
        ...initialPlatformSettings,
        ...settings,
    }));
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    // Sync formData when parent settings prop updates
    useEffect(() => {
        if (settings) {
            setFormData((prev) => ({
                ...prev,
                ...settings,
            }));
            setHasChanges(false);
        }
    }, [settings]);

    const updateField = <K extends keyof PlatformSettings>(key: K, value: PlatformSettings[K]) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
        setHasChanges(true);
    };

    const handleSave = () => {
        if (onSaveSettings) {
            onSaveSettings(formData);
        }
        setHasChanges(false);
        toast.success('Pengaturan sistem Triple9 berhasil disimpan!');
    };

    const handleReset = () => {
        if (confirm('Kembalikan semua pengaturan ke konfigurasi default bawaan sistem?')) {
            setFormData({ ...initialPlatformSettings });
            if (onSaveSettings) {
                onSaveSettings({ ...initialPlatformSettings });
            }
            setHasChanges(false);
            toast.info('Pengaturan berhasil direset ke default.');
        }
    };

    const formatRupiah = (val: number) =>
        'Rp ' + new Intl.NumberFormat('id-ID').format(val || 0);

    const formatThousand = (val?: number | null) =>
        val && val > 0 ? new Intl.NumberFormat('id-ID').format(val) : '';

    return (
        <div className="space-y-6">
            {/* 1. Key Metrics Status Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000000] flex items-center gap-2.5">
                    <div className="size-8 rounded-xs border border-black bg-[#FFD700] flex items-center justify-center shrink-0">
                        <img src="/images/icon/salary.png" alt="Rate" className="size-5 object-contain" />
                    </div>
                    <div className="min-w-0">
                        <div className="text-[10px] font-bold text-neutral-500 uppercase truncate">Rate Gmail</div>
                        <div className="font-mono font-black text-black truncate">{formatRupiah(formData.gmailRate)}</div>
                    </div>
                </div>

                <div className="p-3 bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000000] flex items-center gap-2.5">
                    <div className="size-8 rounded-xs border border-black bg-[#00C2CB] flex items-center justify-center shrink-0">
                        <img src="/images/icon/wallet.png" alt="Min Payout" className="size-5 object-contain" />
                    </div>
                    <div className="min-w-0">
                        <div className="text-[10px] font-bold text-neutral-500 uppercase truncate">Min. Penarikan</div>
                        <div className="font-mono font-black text-black truncate">{formatRupiah(formData.minWithdraw)}</div>
                    </div>
                </div>

                <div className="p-3 bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000000] flex items-center gap-2.5">
                    <div className={`size-8 rounded-xs border border-black flex items-center justify-center shrink-0 ${formData.depositsOpen ? 'bg-[#00C2CB]' : 'bg-[#FF00FF]'}`}>
                        <img src={formData.depositsOpen ? '/images/icon/checklist.png' : '/images/icon/reject.png'} alt="Kuota" className="size-5 object-contain" />
                    </div>
                    <div className="min-w-0">
                        <div className="text-[10px] font-bold text-neutral-500 uppercase truncate">Status Kuota</div>
                        <div className="font-black text-black uppercase text-[11px] truncate">
                            {formData.depositsOpen ? 'Dibuka' : 'Ditutup'}
                        </div>
                    </div>
                </div>

                <div className="p-3 bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000000] flex items-center gap-2.5">
                    <div className={`size-8 rounded-xs border border-black flex items-center justify-center shrink-0 ${formData.announcementActive ? 'bg-[#FFD700]' : 'bg-neutral-200'}`}>
                        <img src="/images/icon/announcement.png" alt="Broadcast" className="size-5 object-contain" />
                    </div>
                    <div className="min-w-0">
                        <div className="text-[10px] font-bold text-neutral-500 uppercase truncate">Banner Broadcast</div>
                        <div className="font-black text-black uppercase text-[11px] truncate">
                            {formData.announcementActive ? 'Tayang' : 'Mati'}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b-2 border-black pb-3">
                <button
                    type="button"
                    onClick={() => setActiveTab('tarif')}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${activeTab === 'tarif'
                        ? 'bg-[#FFD700] text-black shadow-[3px_3px_0px_0px_#000000]'
                        : 'bg-white text-black hover:bg-[#F5F5DC]'
                        }`}
                >
                    <img src="/images/icon/salary.png" alt="Tarif" className="size-4 object-contain" />
                    <span>Tarif & Finansial</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab('operasional')}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${activeTab === 'operasional'
                        ? 'bg-[#00C2CB] text-black shadow-[3px_3px_0px_0px_#000000]'
                        : 'bg-white text-black hover:bg-[#F5F5DC]'
                        }`}
                >
                    <img src="/images/icon/mail.png" alt="Operasional" className="size-4 object-contain" />
                    <span>Operasional & Kuota</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab('broadcast')}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${activeTab === 'broadcast'
                        ? 'bg-[#FF00FF] text-black shadow-[3px_3px_0px_0px_#000000]'
                        : 'bg-white text-black hover:bg-[#F5F5DC]'
                        }`}
                >
                    <img src="/images/icon/announcement.png" alt="Broadcast" className="size-4 object-contain" />
                    <span>Broadcast Pengumuman</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab('komunitas')}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${activeTab === 'komunitas'
                        ? 'bg-[#00C2CB] text-black shadow-[3px_3px_0px_0px_#000000]'
                        : 'bg-white text-black hover:bg-[#F5F5DC]'
                        }`}
                >
                    <img src="/images/icon/whatsapp.png" alt="Komunitas" className="size-4 object-contain" />
                    <span>Komunitas & Kontak</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab('sistem')}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${activeTab === 'sistem'
                        ? 'bg-[#F5F5DC] text-black shadow-[3px_3px_0px_0px_#000000]'
                        : 'bg-white text-black hover:bg-[#F5F5DC]'
                        }`}
                >
                    <img src="/images/icon/shield.png" alt="Sistem & Server" className="size-4 object-contain" />
                    <span>Sistem & Server</span>
                </button>
            </div>

            {/* 4. Tab Contents */}

            {/* TAB 1: TARIF & FINANSIAL */}
            {activeTab === 'tarif' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Rate Pembelian Gmail */}
                    <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
                        <div className="flex items-center gap-2.5 pb-3 border-b-2 border-black">
                            <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/salary.png" alt="Rate" className="size-5 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                    Harga Beli Akun Gmail
                                </h3>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                                Rate per Akun
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-xs text-neutral-500">
                                    Rp
                                </span>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={formatThousand(formData.gmailRate)}
                                    onFocus={(e) => e.target.select()}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '');
                                        updateField('gmailRate', val === '' ? 0 : parseInt(val, 10));
                                    }}
                                    placeholder="0"
                                    className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-sm font-mono font-black text-base text-black bg-white focus:bg-[#F5F5DC] focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Quick Presets */}
                        <div>
                            <span className="text-[11px] font-bold text-neutral-600 block mb-1.5">
                                Preset Cepat:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {[2000, 2500, 3000, 3500, 5000].map((preset) => (
                                    <button
                                        key={preset}
                                        type="button"
                                        onClick={() => updateField('gmailRate', preset)}
                                        className={`px-2.5 py-1 rounded-xs border border-black font-mono font-bold text-xs transition cursor-pointer ${formData.gmailRate === preset
                                            ? 'bg-[#FFD700] text-black shadow-[1px_1px_0px_0px_#000000]'
                                            : 'bg-[#F5F5DC] hover:bg-neutral-200 text-black'
                                            }`}
                                    >
                                        {formatRupiah(preset)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Minimal Penarikan (Withdrawal) */}
                    <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
                        <div className="flex items-center gap-2.5 pb-3 border-b-2 border-black">
                            <div className="size-9 rounded-sm border-2 border-black bg-[#00C2CB] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/wallet.png" alt="Withdraw" className="size-5 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                    Batas Minimal Penarikan
                                </h3>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                                Minimal Penarikan Saldo
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-xs text-neutral-500">
                                    Rp
                                </span>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={formatThousand(formData.minWithdraw)}
                                    onFocus={(e) => e.target.select()}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '');
                                        updateField('minWithdraw', val === '' ? 0 : parseInt(val, 10));
                                    }}
                                    placeholder="0"
                                    className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-sm font-mono font-black text-base text-black bg-white focus:bg-[#F5F5DC] focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Quick Presets */}
                        <div>
                            <span className="text-[11px] font-bold text-neutral-600 block mb-1.5">
                                Preset Cepat:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {[10000, 20000, 25000, 50000, 100000].map((preset) => (
                                    <button
                                        key={preset}
                                        type="button"
                                        onClick={() => updateField('minWithdraw', preset)}
                                        className={`px-2.5 py-1 rounded-xs border border-black font-mono font-bold text-xs transition cursor-pointer ${formData.minWithdraw === preset
                                            ? 'bg-[#00C2CB] text-black shadow-[1px_1px_0px_0px_#000000]'
                                            : 'bg-[#F5F5DC] hover:bg-neutral-200 text-black'
                                            }`}
                                    >
                                        {formatRupiah(preset)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Komisi Referral */}
                    <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
                        <div className="flex items-center gap-2.5 pb-3 border-b-2 border-black">
                            <div className="size-9 rounded-sm border-2 border-black bg-[#FF00FF] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/fire.png" alt="Referral" className="size-5 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                    Bonus Komisi Referral
                                </h3>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                                Bonus per Akun Teman
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-xs text-neutral-500">
                                    Rp
                                </span>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={formatThousand(formData.referralBonus)}
                                    onFocus={(e) => e.target.select()}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '');
                                        updateField('referralBonus', val === '' ? 0 : parseInt(val, 10));
                                    }}
                                    placeholder="0"
                                    className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-sm font-mono font-black text-base text-black bg-white focus:bg-[#F5F5DC] focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <span className="text-[11px] font-bold text-neutral-600 block mb-1.5">
                                Preset Cepat:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {[200, 300, 500, 1000].map((preset) => (
                                    <button
                                        key={preset}
                                        type="button"
                                        onClick={() => updateField('referralBonus', preset)}
                                        className={`px-2.5 py-1 rounded-xs border border-black font-mono font-bold text-xs transition cursor-pointer ${formData.referralBonus === preset
                                            ? 'bg-[#FF00FF] text-black shadow-[1px_1px_0px_0px_#000000]'
                                            : 'bg-[#F5F5DC] hover:bg-neutral-200 text-black'
                                            }`}
                                    >
                                        {formatRupiah(preset)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Biaya Admin / Payout Fee */}
                    <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
                        <div className="flex items-center gap-2.5 pb-3 border-b-2 border-black">
                            <div className="size-9 rounded-sm border-2 border-black bg-[#F5F5DC] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/edit_payment.png" alt="Fee" className="size-5 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                    Biaya Admin Penarikan
                                </h3>
                            </div>
                        </div>

                        <div className="p-3 bg-[#00C2CB]/15 border-2 border-black rounded-sm flex items-center justify-between">
                            <div className="text-xs font-black uppercase text-black">Bebas Biaya Admin</div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: OPERASIONAL & KUOTA */}
            {activeTab === 'operasional' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Buka / Tutup Kuota Setoran */}
                    <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
                        <div className="flex items-center gap-2.5 pb-3 border-b-2 border-black">
                            <div className="size-9 rounded-sm border-2 border-black bg-[#00C2CB] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/mail.png" alt="Kuota" className="size-5 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                    Status Kuota Setoran Gmail
                                </h3>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border-2 border-black rounded-sm bg-[#F5F5DC]">
                            <div className="text-xs font-black uppercase text-black">
                                {formData.depositsOpen ? 'Penerimaan Kuota Sedang Buka' : 'Penerimaan Kuota Ditutup'}
                            </div>

                            <button
                                type="button"
                                onClick={() => updateField('depositsOpen', !formData.depositsOpen)}
                                className={`px-4 py-2 rounded-sm border-2 border-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition cursor-pointer ${formData.depositsOpen
                                    ? 'bg-[#00C2CB] text-black hover:bg-[#00a8b0]'
                                    : 'bg-[#FF00FF] text-black hover:bg-[#e000e0]'
                                    }`}
                            >
                                {formData.depositsOpen ? 'Tutup Kuota' : 'Buka Kuota'}
                            </button>
                        </div>
                    </div>

                    {/* Auto-check & Bot Validator */}
                    <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
                        <div className="flex items-center gap-2.5 pb-3 border-b-2 border-black">
                            <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/find_checker.png" alt="Auto Check" className="size-5 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                    Sistem Auto Check Akun
                                </h3>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border-2 border-black rounded-sm bg-[#F5F5DC]">
                            <div className="text-xs font-black uppercase text-black">
                                {formData.autoCheckActive ? 'Bot Validator Aktif' : 'Bot Validator Nonaktif'}
                            </div>

                            <button
                                type="button"
                                onClick={() => updateField('autoCheckActive', !formData.autoCheckActive)}
                                className={`px-4 py-2 rounded-sm border-2 border-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition cursor-pointer ${formData.autoCheckActive
                                    ? 'bg-[#00C2CB] text-black hover:bg-[#00a8b0]'
                                    : 'bg-white text-black hover:bg-[#F5F5DC]'
                                    }`}
                            >
                                {formData.autoCheckActive ? 'Matikan Bot' : 'Aktifkan Bot'}
                            </button>
                        </div>
                    </div>

                    {/* Batas Maksimal Upload Batch */}
                    <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
                        <div className="flex items-center gap-2.5 pb-3 border-b-2 border-black">
                            <div className="size-9 rounded-sm border-2 border-black bg-[#F5F5DC] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/upload.png" alt="Batas Upload" className="size-5 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                    Batas Upload per Batch
                                </h3>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                                Batas Akun per Submit
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={formatThousand(formData.maxBatchDeposit)}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    updateField('maxBatchDeposit', val === '' ? 0 : parseInt(val, 10));
                                }}
                                placeholder="0"
                                className="w-full px-4 py-2 border-2 border-black rounded-sm font-mono font-black text-base text-black bg-white focus:bg-[#F5F5DC] focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                            {[10, 25, 50, 100].map((batch) => (
                                <button
                                    key={batch}
                                    type="button"
                                    onClick={() => updateField('maxBatchDeposit', batch)}
                                    className={`px-3 py-1 rounded-xs border border-black font-mono font-bold text-xs transition cursor-pointer ${(formData.maxBatchDeposit || 50) === batch
                                        ? 'bg-[#FFD700] text-black shadow-[1px_1px_0px_0px_#000000]'
                                        : 'bg-[#F5F5DC] hover:bg-neutral-200 text-black'
                                        }`}
                                >
                                    {batch} Akun
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Jam Operasional Layanan */}
                    <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
                        <div className="flex items-center gap-2.5 pb-3 border-b-2 border-black">
                            <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/clock.png" alt="Jam Operasional" className="size-5 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                    Jam Operasional
                                </h3>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                                Keterangan Jam Kerja
                            </label>
                            <input
                                type="text"
                                value={formData.operatingHours || '08:00 - 23:00 WIB'}
                                onChange={(e) => updateField('operatingHours', e.target.value)}
                                placeholder="Contoh: 08:00 - 23:00 WIB"
                                className="w-full px-4 py-2 border-2 border-black rounded-sm font-bold text-xs text-black bg-white focus:bg-[#F5F5DC] focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 3: BROADCAST PENGUMUMAN */}
            {activeTab === 'broadcast' && (
                <div className="space-y-5">
                    <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000000] space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                            <div className="flex items-center gap-2.5">
                                <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                    <img src="/images/icon/announcement.png" alt="Broadcast" className="size-5 object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                        Konfigurasi Pesan Broadcast
                                    </h3>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => updateField('announcementActive', !formData.announcementActive)}
                                className={`px-4 py-1.5 rounded-sm border-2 border-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition cursor-pointer ${formData.announcementActive
                                    ? 'bg-[#00C2CB] text-black hover:bg-[#00a8b0]'
                                    : 'bg-neutral-200 text-neutral-500'
                                    }`}
                            >
                                {formData.announcementActive ? 'Tayang' : 'Dimatikan'}
                            </button>
                        </div>

                        {/* Kategori Pengumuman sesuai Banner Halaman Depan */}
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                                Kategori Pengumuman
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                                {[
                                    {
                                        id: 'Pengumuman Setoran',
                                        label: 'Pengumuman Setoran',
                                        icon: '/images/icon/announcement.png',
                                        defaultTitle: 'Setoran OPEN Setiap Hari Senin s/d Jumat',
                                        defaultDesc: 'Jam operasional verifikasi setor akun: 08:00 - 16:00 WIB.',
                                    },
                                    {
                                        id: 'Event Reward',
                                        label: 'Event Reward',
                                        icon: '/images/icon/trophy.png',
                                        defaultTitle: 'Bonus Reward Leaderboard Top 10',
                                        defaultDesc: 'Tingkatkan setoran dan dapatkan hadiah bonus saldo mingguan untuk 10 member teratas.',
                                    },
                                    {
                                        id: 'Ketentuan & Rules',
                                        label: 'Ketentuan & Rules',
                                        icon: '/images/icon/notes.png',
                                        defaultTitle: 'Pastikan Format Akun Sesuai Ketentuan',
                                        defaultDesc: 'Gmail harus Fresh, Tanggal lahir akun Gmail wajib 18 tahun ke atas.',
                                    },
                                    {
                                        id: 'Panduan Triple9',
                                        label: 'Panduan Triple9',
                                        icon: '/images/icon/what.png',
                                        defaultTitle: 'Apa itu Triple9 & Cara Kerjanya?',
                                        defaultDesc: 'Pelajari alur penyetoran Gmail hingga pencairan reward saldo instan.',
                                    },
                                ].map((t) => {
                                    const isSelected = (formData.announcementCategory || 'Pengumuman Setoran') === t.id;
                                    return (
                                        <button
                                            key={t.id}
                                            type="button"
                                            onClick={() => {
                                                updateField('announcementCategory', t.id);
                                                updateField('announcementTitle', t.defaultTitle);
                                                updateField('announcementText', t.defaultDesc);
                                            }}
                                            className={`p-3 rounded-sm border-2 border-black text-left flex items-center gap-2.5 transition cursor-pointer ${isSelected
                                                ? 'bg-[#FFD700] text-black shadow-[3px_3px_0px_0px_#000000]'
                                                : 'bg-white text-black hover:bg-[#F5F5DC]'
                                                }`}
                                        >
                                            <img src={t.icon} alt={t.label} className="size-5 object-contain shrink-0" />
                                            <span className="text-xs font-black uppercase tracking-wide text-black">
                                                {t.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Judul Pengumuman */}
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                                Judul Pengumuman
                            </label>
                            <input
                                type="text"
                                value={formData.announcementTitle || 'Setoran OPEN Setiap Hari Senin s/d Jumat'}
                                onChange={(e) => updateField('announcementTitle', e.target.value)}
                                placeholder="Ketik judul banner pengumuman..."
                                className="w-full px-4 py-2 border-2 border-black rounded-sm font-bold text-xs text-black bg-white focus:bg-[#F5F5DC] focus:outline-none"
                            />
                        </div>

                        {/* Deskripsi Pengumuman Textarea */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-black uppercase tracking-wider text-black">
                                    Deskripsi Pengumuman
                                </label>
                                <span className="text-[11px] font-mono font-bold text-neutral-500">
                                    {formData.announcementText.length} Karakter
                                </span>
                            </div>
                            <textarea
                                rows={3}
                                value={formData.announcementText}
                                onChange={(e) => updateField('announcementText', e.target.value)}
                                placeholder="Ketik deskripsi banner pengumuman..."
                                className="w-full p-3 border-2 border-black rounded-sm font-bold text-xs text-black bg-white focus:bg-[#F5F5DC] focus:outline-none leading-relaxed"
                            />
                        </div>

                        {/* Pratinjau Banner Halaman Depan (Live Preview) */}
                        <div className="pt-2">
                            <span className="text-xs font-black uppercase tracking-wider text-black block mb-2">
                                Pratinjau Banner Halaman Depan
                            </span>
                            <div className="rounded-md bg-[#FFD700] border-[3px] border-black shadow-[6px_6px_0px_0px_#000000] p-5 relative overflow-hidden flex flex-col justify-between text-black">
                                <div className="flex items-center justify-between gap-3 mb-3">
                                    <div className="inline-flex items-center gap-2 bg-white text-black border-2 border-black px-3 py-1 rounded-sm shadow-[2px_2px_0px_0px_#000000]">
                                        <img
                                            src={
                                                (formData.announcementCategory === 'Event Reward' && '/images/icon/trophy.png') ||
                                                (formData.announcementCategory === 'Ketentuan & Rules' && '/images/icon/notes.png') ||
                                                (formData.announcementCategory === 'Panduan Triple9' && '/images/icon/what.png') ||
                                                '/images/icon/announcement.png'
                                            }
                                            alt={formData.announcementCategory || 'Pengumuman Setoran'}
                                            className="size-4 object-contain shrink-0"
                                        />
                                        <span className="text-xs font-black uppercase tracking-wider font-mono">
                                            {formData.announcementCategory || 'Pengumuman Setoran'}
                                        </span>
                                    </div>
                                    <span className="text-[11px] font-mono font-bold text-black border border-black bg-white px-2 py-0.5 rounded-xs shadow-[1px_1px_0px_0px_#000000]">
                                        Live Preview
                                    </span>
                                </div>
                                <div className="py-1">
                                    <h3 className="text-lg sm:text-xl font-black text-black uppercase tracking-tight leading-tight">
                                        {formData.announcementTitle || 'Setoran OPEN Setiap Hari Senin s/d Jumat'}
                                    </h3>
                                    <p className="text-xs sm:text-sm font-bold text-black/90 leading-relaxed max-w-2xl mt-1.5">
                                        {formData.announcementText || 'Jam operasional verifikasi setor akun: 08:00 - 16:00 WIB.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 4: KOMUNITAS & KONTAK */}
            {activeTab === 'komunitas' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Link Saluran WhatsApp */}
                    <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
                        <div className="flex items-center gap-2.5 pb-3 border-b-2 border-black">
                            <div className="size-9 rounded-sm border-2 border-black bg-[#00C2CB] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/whatsapp.png" alt="WhatsApp" className="size-5 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                    Saluran Resmi WhatsApp
                                </h3>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                                URL Saluran WhatsApp
                            </label>
                            <input
                                type="url"
                                value={formData.waChannelUrl || ''}
                                onChange={(e) => updateField('waChannelUrl', e.target.value)}
                                placeholder="https://whatsapp.com/channel/..."
                                className="w-full px-4 py-2 border-2 border-black rounded-sm font-bold text-xs text-black bg-white focus:bg-[#F5F5DC] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Link Grup Telegram */}
                    <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
                        <div className="flex items-center gap-2.5 pb-3 border-b-2 border-black">
                            <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/telegram.png" alt="Telegram" className="size-5 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                    Grup Komunitas Telegram
                                </h3>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                                URL Grup Telegram
                            </label>
                            <input
                                type="url"
                                value={formData.tgGroupUrl || ''}
                                onChange={(e) => updateField('tgGroupUrl', e.target.value)}
                                placeholder="https://t.me/..."
                                className="w-full px-4 py-2 border-2 border-black rounded-sm font-bold text-xs text-black bg-white focus:bg-[#F5F5DC] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Nomor Customer Service */}
                    <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
                        <div className="flex items-center gap-2.5 pb-3 border-b-2 border-black">
                            <div className="size-9 rounded-sm border-2 border-black bg-[#FF00FF] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/headphone.png" alt="Support" className="size-5 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                    Kontak Layanan Bantuan
                                </h3>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                                Nomor WhatsApp CS
                            </label>
                            <input
                                type="text"
                                value={formData.supportContact || ''}
                                onChange={(e) => updateField('supportContact', e.target.value)}
                                placeholder="Contoh: 0812-9999-9999"
                                className="w-full px-4 py-2 border-2 border-black rounded-sm font-bold text-xs text-black bg-white focus:bg-[#F5F5DC] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Aturan Keamanan Komunitas */}
                    <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
                        <div className="flex items-center gap-2.5 pb-3 border-b-2 border-black">
                            <div className="size-9 rounded-sm border-2 border-black bg-[#F5F5DC] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/warning.png" alt="Peringatan" className="size-5 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                    Aturan Keamanan
                                </h3>
                            </div>
                        </div>

                        <div className="p-3.5 bg-[#F5F5DC] border-2 border-black rounded-sm">
                            <p className="text-xs font-bold text-black leading-relaxed">
                                Pastikan semua tautan resmi selalu mengarahkan ke akun terverifikasi milik Triple9. Dilarang memasukkan kontak perorangan tidak resmi untuk mencegah penipuan di luar sistem web.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 5: SISTEM & SERVER */}
            {activeTab === 'sistem' && (
                <div className="space-y-5">
                    {/* Mode Pemeliharaan (Maintenance) */}
                    <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000000] space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                            <div className="flex items-center gap-2.5">
                                <div className={`size-9 rounded-sm border-2 border-black flex items-center justify-center shrink-0 ${formData.maintenanceMode ? 'bg-[#FF00FF]' : 'bg-[#F5F5DC]'}`}>
                                    <img src="/images/icon/shield.png" alt="Mode Pemeliharaan" className="size-5 object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                        Mode Pemeliharaan
                                    </h3>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => updateField('maintenanceMode', !formData.maintenanceMode)}
                                className={`px-4 py-1.5 rounded-sm border-2 border-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition cursor-pointer ${formData.maintenanceMode
                                    ? 'bg-[#FF00FF] text-black hover:bg-[#e000e0]'
                                    : 'bg-white text-black hover:bg-[#F5F5DC]'
                                    }`}
                            >
                                {formData.maintenanceMode ? 'Maintenance Aktif' : 'Server Normal'}
                            </button>
                        </div>

                        <div className={`p-4 border-2 border-black rounded-sm ${formData.maintenanceMode ? 'bg-[#FF00FF]/20 text-black' : 'bg-[#F5F5DC] text-neutral-700'}`}>
                            <div className="text-xs font-black uppercase mb-1">
                                {formData.maintenanceMode
                                    ? 'PERINGATAN: MODE PEMELIHARAAN SEDANG AKTIF!'
                                    : 'STATUS SERVER: BEROPERASI NORMAL'}
                            </div>
                            <p className="text-xs font-bold leading-relaxed">
                                {formData.maintenanceMode
                                    ? 'Pengguna biasa akan melihat layar 503 maintenance sementara admin tetap dapat mengakses seluruh data console.'
                                    : 'Seluruh pengguna dapat mengakses dashboard, menyetor Gmail, dan mencairkan saldo tanpa kendala.'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* 5. Sticky Bottom Action Bar (if has changes) */}
            {hasChanges && (
                <div className="sticky bottom-4 z-20 flex items-center justify-between p-4 bg-[#FFD700] border-[3px] border-black shadow-[6px_6px_0px_0px_#000000] rounded-md animate-in slide-in-from-bottom duration-200">
                    <div className="flex items-center gap-2.5">
                        <div className="text-xs font-black uppercase text-black">Perubahan Belum Disimpan</div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({ ...settings });
                                setHasChanges(false);
                            }}
                            className="px-3 py-1.5 rounded-sm border-2 border-black bg-white hover:bg-[#F5F5DC] text-black text-xs font-black uppercase shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-sm border-2 border-black bg-[#00C2CB] hover:bg-[#00a8b0] text-black text-xs font-black uppercase shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
                        >
                            <span>Simpan Sekarang</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
