import { useState } from 'react';
import { Plus, Minus, X } from 'lucide-react';
import { toast } from 'sonner';
import type { AdminUserItem } from '../types';

interface AdminBalanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: AdminUserItem | null;
    onUpdateBalance: (userId: number, delta: number, note: string) => void;
}

export function AdminBalanceModal({
    isOpen,
    onClose,
    user,
    onUpdateBalance,
}: AdminBalanceModalProps) {
    if (!isOpen || !user) return null;

    const [actionType, setActionType] = useState<'add' | 'subtract'>('add');
    const [amount, setAmount] = useState<number>(10000);
    const [note, setNote] = useState<string>('Bonus penyesuaian admin');

    const formatRupiah = (val: number) =>
        'Rp ' + new Intl.NumberFormat('id-ID').format(val);

    const formatThousand = (val?: number | null) =>
        val && val > 0 ? new Intl.NumberFormat('id-ID').format(val) : '';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (amount <= 0) {
            toast.error('Nominal harus lebih dari 0.');
            return;
        }

        const delta = actionType === 'add' ? amount : -amount;
        onUpdateBalance(user.id, delta, note);
        toast.success(`Saldo ${user.name} berhasil disesuaikan (${actionType === 'add' ? '+' : '-'}${formatRupiah(amount)}).`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <div className="relative w-full max-w-md bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_#000000] p-6 space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                    <div className="flex items-center gap-2">
                        <img src="/images/icon/edit_payment.png" alt="Saldo" className="size-5 object-contain" />
                        <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-black">
                            Sesuaikan Saldo User
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="size-7 inline-flex items-center justify-center rounded-xs border-2 border-black bg-white hover:bg-[#FF00FF] text-black shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
                    >
                        <X className="size-4 stroke-[3]" />
                    </button>
                </div>

                {/* User Info Card */}
                <div className="p-3 bg-[#F5F5DC] border-2 border-black shadow-[2px_2px_0px_0px_#000000] flex items-center gap-3">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="size-10 rounded-full border-2 border-black bg-[#FFD700] object-contain"
                    />
                    <div className="min-w-0 flex-1">
                        <div className="font-black text-black truncate">{user.name}</div>
                        <div className="text-xs text-neutral-600 truncate">{user.email}</div>
                        <div className="text-xs font-mono font-bold text-black mt-0.5">
                            Saldo Saat Ini: <span className="font-black text-[#00C2CB]">{user.role === 'admin' ? '-' : formatRupiah(user.currentBalance)}</span>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Mode: Tambah / Kurang */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => setActionType('add')}
                            className={`py-2 px-3 rounded-sm border-2 border-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer ${
                                actionType === 'add'
                                    ? 'bg-[#00C2CB] text-black shadow-[3px_3px_0px_0px_#000000]'
                                    : 'bg-white text-black hover:bg-[#F5F5DC]'
                            }`}
                        >
                            <Plus className="size-3.5 stroke-[3]" />
                            <span>Tambah Saldo</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActionType('subtract')}
                            className={`py-2 px-3 rounded-sm border-2 border-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer ${
                                actionType === 'subtract'
                                    ? 'bg-[#FF00FF] text-black shadow-[3px_3px_0px_0px_#000000]'
                                    : 'bg-white text-black hover:bg-[#F5F5DC]'
                            }`}
                        >
                            <Minus className="size-3.5 stroke-[3]" />
                            <span>Kurangi Saldo</span>
                        </button>
                    </div>

                    {/* Nominal */}
                    <div className="space-y-1">
                        <label className="text-xs font-black uppercase tracking-wider text-black">
                            Nominal (Rp)
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-black">
                                Rp
                            </span>
                            <input
                                type="text"
                                inputMode="numeric"
                                required
                                value={formatThousand(amount)}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    setAmount(val === '' ? 0 : parseInt(val, 10));
                                }}
                                placeholder="0"
                                className="w-full pl-9 pr-3 py-2 rounded-none border-2 border-black bg-white text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000000] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Note */}
                    <div className="space-y-1">
                        <label className="text-xs font-black uppercase tracking-wider text-black">
                            Alasan / Keterangan
                        </label>
                        <input
                            type="text"
                            required
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Contoh: Kompensasi kendala sistem / Bonus reward"
                            className="w-full px-3 py-2 rounded-none border-2 border-black bg-white text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000000] focus:outline-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 pt-2 border-t-2 border-black">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-sm border-2 border-black bg-white hover:bg-[#F5F5DC] text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-sm border-2 border-black bg-[#00C2CB] hover:bg-[#00a8b0] text-black text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000000] cursor-pointer"
                        >
                            Konfirmasi Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
