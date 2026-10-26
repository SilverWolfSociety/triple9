import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { AdminSetoranItem } from '../types';

export type RejectModalTarget =
    | {
        type: 'single';
        item: AdminSetoranItem;
    }
    | {
        type: 'batch';
        ids: string[];
        count: number;
    };

interface AdminRejectModalProps {
    isOpen: boolean;
    onClose: () => void;
    target: RejectModalTarget | null;
    onConfirm: (reason: string) => void;
}

const QUICK_REASONS = [
    'Password salah / tidak bisa login',
    '2FA / Verifikasi No HP aktif',
    'Akun tidak aktif / disabled',
    'Format akun tidak sesuai rules',
    'Bukan akun fresh',
];

export function AdminRejectModal({
    isOpen,
    onClose,
    target,
    onConfirm,
}: AdminRejectModalProps) {
    const [reason, setReason] = useState<string>('');

    // Reset input when modal opens with new target
    useEffect(() => {
        if (isOpen) {
            setReason('');
        }
    }, [isOpen, target]);

    if (!isOpen || !target) return null;

    const handleConfirm = () => {
        onConfirm(reason.trim());
        onClose();
    };

    const isSingle = target.type === 'single';

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
                                {isSingle
                                    ? 'Tolak Setoran Akun'
                                    : `Tolak ${target.count} Setoran Sekaligus`}
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

                {/* Target Information Card */}
                <div className="bg-[#F5F5DC] border-2 border-black rounded-sm p-3 text-xs space-y-1 shadow-[2px_2px_0px_0px_#000000]">
                    {isSingle ? (
                        <>
                            <div className="font-mono font-black text-black select-all break-all">
                                {target.item.email}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-neutral-700 text-[11px] font-bold">
                                <span>Pengirim: {target.item.userName}</span>
                                <span>Batch: {target.item.batchId || '-'}</span>
                            </div>
                        </>
                    ) : (
                        <div className="font-bold text-neutral-800">
                            <span className="font-black text-black font-mono">
                                {target.count}
                            </span>{' '}
                            akun setoran yang sedang dicentang akan ditandai{' '}
                            <span className="font-black text-[#FF00FF]">
                                Ditolak
                            </span>
                            .
                        </div>
                    )}
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
                        {QUICK_REASONS.map((qr) => (
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
                        <span>Tolak Setoran</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
