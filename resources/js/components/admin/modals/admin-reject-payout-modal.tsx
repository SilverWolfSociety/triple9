import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { AdminPayoutItem } from '../types';

interface AdminRejectPayoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    payout: AdminPayoutItem | null;
    onConfirm: (reason: string) => void;
}

const QUICK_PAYOUT_REASONS = [
    'Nomor e-wallet tidak valid / salah',
    'Nama penerima tidak sesuai akun',
    'Batas limit transaksi e-wallet penuh',
    'Akun e-wallet belum upgrade (KYC)',
    'Permintaan penarikan ganda',
];

export function AdminRejectPayoutModal({
    isOpen,
    onClose,
    payout,
    onConfirm,
}: AdminRejectPayoutModalProps) {
    const [reason, setReason] = useState<string>('');

    useEffect(() => {
        if (isOpen) {
            setReason('');
        }
    }, [isOpen, payout]);

    if (!isOpen || !payout) return null;

    const formatRupiah = (val: number) =>
        'Rp ' + new Intl.NumberFormat('id-ID').format(val);

    const handleConfirm = () => {
        const trimmed = reason.trim();
        onClose();
        onConfirm(trimmed);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="relative w-full max-w-md bg-white border-[3px] border-black rounded-md shadow-[8px_8px_0px_0px_#000000] p-5 sm:p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                    <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-sm border-2 border-black bg-[#FF00FF] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                            <img
                                src="/images/icon/reject.png"
                                alt="Tolak"
                                className="size-4.5 object-contain"
                            />
                        </div>
                        <div>
                            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-black">
                                Tolak Penarikan Saldo
                            </h3>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="size-7 inline-flex items-center justify-center rounded-xs border-2 border-black bg-white hover:bg-neutral-100 text-black shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
                    >
                        <X className="size-4 stroke-[3]" />
                    </button>
                </div>

                {/* Payout Details Preview Card */}
                <div className="bg-[#F5F5DC] border-2 border-black rounded-sm p-3.5 text-xs space-y-2 shadow-[2px_2px_0px_0px_#000000]">
                    <div className="flex items-center justify-between border-b border-black/20 pb-1.5">
                        <span className="text-[10px] font-black uppercase text-neutral-600">ID Transaksi</span>
                        <span className="font-mono font-black text-black">{payout.id}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-black/20 pb-1.5">
                        <span className="text-[10px] font-black uppercase text-neutral-600">Penerima</span>
                        <div className="text-right">
                            <span className="font-bold text-black">{payout.userName}</span>
                            <span className="text-[10px] text-neutral-600 block">{payout.userEmail}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-b border-black/20 pb-1.5">
                        <span className="text-[10px] font-black uppercase text-neutral-600">Tujuan</span>
                        <div className="text-right">
                            <span className="font-mono font-black text-black">
                                {payout.method} - {payout.accountNumber}
                            </span>
                            <span className="text-[10px] text-neutral-700 block">
                                a.n {payout.accountName}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-0.5">
                        <span className="text-[10px] font-black uppercase text-black">Nominal</span>
                        <span className="font-mono font-black text-sm text-[#FF00FF]">
                            {formatRupiah(payout.amount)}
                        </span>
                    </div>
                </div>

                {/* Reason Form */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-black uppercase tracking-wider text-black">
                            Alasan Ditolak
                        </label>
                        <span className="text-[10px] font-bold text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded-xs border border-neutral-300">
                            Opsional
                        </span>
                    </div>

                    {/* Quick Reason Chips */}
                    <div className="flex flex-wrap gap-1.5">
                        {QUICK_PAYOUT_REASONS.map((qr) => (
                            <button
                                key={qr}
                                type="button"
                                onClick={() => setReason(qr)}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-xs border border-black cursor-pointer transition ${reason === qr
                                    ? 'bg-black text-white shadow-[1px_1px_0px_0px_#000000]'
                                    : 'bg-[#F5F5DC] hover:bg-white text-black'
                                    }`}
                            >
                                {qr}
                            </button>
                        ))}
                    </div>

                    <textarea
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Ketikkan alasan penolakan di sini..."
                        className="w-full rounded-sm border-2 border-black bg-white p-3 text-xs font-medium text-black placeholder:text-neutral-500 shadow-[3px_3px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                    />
                </div>

                <p className="text-[10px] font-bold text-neutral-600 leading-tight">
                    Saldo sebesar {formatRupiah(payout.amount)} akan otomatis dikembalikan ke saldo akun pengguna.
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-end gap-2.5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-sm border-2 border-black bg-white hover:bg-[#F5F5DC] text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] cursor-pointer transition"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border-2 border-black bg-[#FF00FF] hover:bg-[#e000e0] text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] cursor-pointer transition active:translate-x-[1px] active:translate-y-[1px]"
                    >
                        <img
                            src="/images/icon/reject.png"
                            alt="Tolak"
                            className="size-4 object-contain"
                        />
                        <span>Tolak Penarikan</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
