import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { toast } from 'sonner';
import type { EwalletType } from '../types';
import { ewalletOptions } from '../constants';

interface WithdrawModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentBalance: number;
    selectedEwallet: EwalletType;
    onChangeEwallet?: (wallet: EwalletType) => void;
    savedEwalletNumbers?: Record<string, string>;
    onSaveEwalletNumber?: (wallet: EwalletType, number: string) => void;
    onConfirmWithdraw: (amount: number, account: string) => void;
}

const WITHDRAW_PRESETS = [10000, 20000, 50000, 100000, 500000, 1000000];

export function WithdrawModal({
    isOpen,
    onClose,
    currentBalance,
    selectedEwallet,
    onChangeEwallet,
    savedEwalletNumbers,
    onSaveEwalletNumber,
    onConfirmWithdraw,
}: WithdrawModalProps) {
    const [currentWallet, setCurrentWallet] = useState<EwalletType>(selectedEwallet);
    const [accountInput, setAccountInput] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setCurrentWallet(selectedEwallet);
            setAccountInput(savedEwalletNumbers?.[selectedEwallet] || '');
            setWithdrawAmount('');
            setIsSaved(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSelectWallet = (wallet: EwalletType) => {
        setCurrentWallet(wallet);
        onChangeEwallet?.(wallet);
        setAccountInput(savedEwalletNumbers?.[wallet] || '');
        setIsSaved(false);
    };

    const handleSaveEwallet = () => {
        if (accountInput.length >= 10) {
            onSaveEwalletNumber?.(currentWallet, accountInput);
            setIsSaved(true);
            toast.info('Nomor telah tersimpan.');
            setTimeout(() => setIsSaved(false), 2000);
        } else {
            toast.error('Nomor e-wallet harus terdiri dari 10-15 digit angka.');
        }
    };

    const handleConfirm = () => {
        const numAmount = Number(withdrawAmount);
        const targetAccount = accountInput.trim();

        if (!targetAccount || targetAccount.length < 10) {
            toast.error('Silakan masukkan nomor e-wallet yang valid (10-15 digit).');
            return;
        }
        if (!numAmount || numAmount < 10000) {
            toast.error('Minimal penarikan adalah Rp10.000.');
            return;
        }
        if (numAmount > currentBalance) {
            toast.error('Saldo Anda belum mencukupi untuk melakukan penarikan ini.');
            return;
        }

        onConfirmWithdraw(numAmount, targetAccount);
        onClose();
        toast.success('Pengajuan penarikan berhasil dikirim!');
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-6 shadow-xl space-y-4 animate-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto no-scrollbar">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-2.5">
                        <img src="/images/icon/wallet.png" alt="Tarik Saldo" className="h-5 w-5 object-contain shrink-0" />
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                Tarik Saldo
                            </h3>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="space-y-4 text-xs">
                    {/* Saldo Tersedia */}
                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-800 flex justify-between items-center">
                        <span className="text-neutral-500 dark:text-neutral-400">Saldo Tersedia:</span>
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 text-sm font-tabular-nums">
                            Rp{currentBalance.toLocaleString('id-ID')}
                        </span>
                    </div>

                    {/* E-Wallet Selection & Saved Number */}
                    <div className="space-y-2.5">
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                            Tujuan Penarikan
                        </label>

                        {/* E-wallet selector tabs */}
                        <div className="grid grid-cols-4 gap-2">
                            {ewalletOptions.map((wallet) => (
                                <button
                                    key={wallet.id}
                                    type="button"
                                    onClick={() => handleSelectWallet(wallet.id)}
                                    className={`flex h-11 sm:h-12 w-full items-center justify-center p-2 rounded-xl transition cursor-pointer border ${currentWallet === wallet.id
                                        ? 'bg-neutral-50 dark:bg-neutral-800/80 border-blue-500 dark:border-blue-400 shadow-xs ring-1 ring-blue-500/30'
                                        : 'bg-white dark:bg-neutral-900 border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                                        }`}
                                >
                                    {wallet.id === 'GoPay' ? (
                                        <>
                                            <img
                                                src="/images/saldo/gopay.png"
                                                alt="GoPay"
                                                className="h-full w-full object-contain dark:hidden"
                                            />
                                            <img
                                                src="/images/saldo/gopay-dark.png"
                                                alt="GoPay"
                                                className="h-full w-full object-contain hidden dark:block"
                                            />
                                        </>
                                    ) : wallet.id === 'OVO' ? (
                                        <>
                                            <img
                                                src="/images/saldo/ovo.png"
                                                alt="OVO"
                                                className="h-full w-full object-contain dark:hidden"
                                            />
                                            <img
                                                src="/images/saldo/ovo-dark.png"
                                                alt="OVO"
                                                className="h-full w-full object-contain hidden dark:block"
                                            />
                                        </>
                                    ) : (
                                        <img
                                            src={wallet.logo}
                                            alt={wallet.id}
                                            className="h-full w-full object-contain"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight">
                            Simpan nomor {currentWallet} Anda agar tidak perlu mengetik ulang setiap penarikan. Hanya angka, 10-15 digit.
                        </p>

                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={accountInput}
                                onChange={(e) => setAccountInput(e.target.value.replace(/\D/g, ''))}
                                placeholder="081234567890"
                                maxLength={15}
                                className="flex-1 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3.5 py-2.5 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 focus:outline-none transition shadow-2xs"
                            />
                            <button
                                type="button"
                                onClick={handleSaveEwallet}
                                title={isSaved ? 'Nomor Tersimpan' : 'Simpan nomor'}
                                aria-label="Simpan nomor"
                                className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition cursor-pointer shrink-0"
                            >
                                {isSaved ? (
                                    <Check
                                        className="h-5 w-5"
                                        style={{ color: '#22c55e' }}
                                        stroke="#22c55e"
                                        strokeWidth={2.5}
                                    />
                                ) : (
                                    <img src="/images/icon/save.png" alt="Simpan" className="h-5 w-5 object-contain shrink-0" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Nominal Penarikan */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                                Nominal Penarikan
                            </label>
                            {currentBalance >= 10000 && (
                                <button
                                    type="button"
                                    onClick={() => setWithdrawAmount(String(currentBalance))}
                                    className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                                >
                                    Tarik Semua
                                </button>
                            )}
                        </div>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-xs font-semibold text-slate-500 dark:text-slate-400 select-none pointer-events-none">
                                Rp.
                            </span>
                            <input
                                type="text"
                                inputMode="numeric"
                                placeholder="10.000"
                                value={
                                    withdrawAmount !== ''
                                        ? Number(withdrawAmount).toLocaleString('id-ID')
                                        : ''
                                }
                                onChange={(e) => {
                                    const raw = e.target.value.replace(/\D/g, '');
                                    setWithdrawAmount(raw ? String(Number(raw.slice(0, 10))) : '');
                                }}
                                className="w-full rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-2.5 pl-10 pr-3 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 focus:outline-none transition"
                            />
                        </div>

                        {/* Template nominal buttons */}
                        <div className="mt-2.5 grid grid-cols-3 gap-2">
                            {WITHDRAW_PRESETS.map((preset) => {
                                const isSelected = Number(withdrawAmount) === preset;
                                return (
                                    <button
                                        key={preset}
                                        type="button"
                                        onClick={() => setWithdrawAmount(String(preset))}
                                        className={`py-2 px-1.5 rounded-xl text-xs font-medium border text-center transition cursor-pointer ${isSelected
                                            ? 'border-blue-600 dark:border-blue-500 bg-transparent text-blue-600 dark:text-blue-400 font-semibold shadow-2xs'
                                            : 'border-neutral-200/80 dark:border-neutral-800 bg-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:border-neutral-300 dark:hover:border-neutral-700'
                                            }`}
                                    >
                                        Rp{preset.toLocaleString('id-ID')}
                                    </button>
                                );
                            })}
                        </div>

                        <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-2">
                            Minimal penarikan adalah Rp10.000.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition cursor-pointer"
                    >
                        Konfirmasi Penarikan
                    </button>
                </div>
            </div>
        </div>
    );
}
