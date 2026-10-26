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
    savedEwalletNames?: Record<string, string>;
    onSaveEwalletNumber?: (wallet: EwalletType, number: string, name?: string) => void;
    onConfirmWithdraw: (amount: number, account: string, accountName?: string) => void;
    minWithdraw?: number;
}

const WITHDRAW_PRESETS = [10000, 20000, 50000, 100000, 500000, 1000000];

export function WithdrawModal({
    isOpen,
    onClose,
    currentBalance,
    selectedEwallet,
    onChangeEwallet,
    savedEwalletNumbers,
    savedEwalletNames,
    onSaveEwalletNumber,
    onConfirmWithdraw,
    minWithdraw = 10000,
}: WithdrawModalProps) {
    const [currentWallet, setCurrentWallet] = useState<EwalletType>(selectedEwallet);
    const [accountInput, setAccountInput] = useState('');
    const [accountNameInput, setAccountNameInput] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setCurrentWallet(selectedEwallet);
            setAccountInput(savedEwalletNumbers?.[selectedEwallet] || '');
            setAccountNameInput(savedEwalletNames?.[selectedEwallet] || '');
            setWithdrawAmount('');
            setIsSaved(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSelectWallet = (wallet: EwalletType) => {
        setCurrentWallet(wallet);
        onChangeEwallet?.(wallet);
        setAccountInput(savedEwalletNumbers?.[wallet] || '');
        setAccountNameInput(savedEwalletNames?.[wallet] || '');
        setIsSaved(false);
    };

    const handleSaveEwallet = () => {
        if (accountInput.length >= 10) {
            onSaveEwalletNumber?.(currentWallet, accountInput, accountNameInput.trim());
            setIsSaved(true);
            toast.info('Data e-wallet telah tersimpan.');
            setTimeout(() => setIsSaved(false), 2000);
        } else {
            toast.error('Nomor e-wallet harus terdiri dari 10-15 digit angka.');
        }
    };

    const handleConfirm = () => {
        const numAmount = Number(withdrawAmount);
        const targetAccount = accountInput.trim();
        const targetName = accountNameInput.trim();

        if (!targetAccount || targetAccount.length < 10) {
            toast.error('Silakan masukkan nomor e-wallet yang valid (10-15 digit).');
            return;
        }
        if (!targetName) {
            toast.error('Silakan masukkan nama pemilik rekening / atas nama.');
            return;
        }
        if (!numAmount || numAmount < minWithdraw) {
            toast.error(`Minimal penarikan adalah Rp${minWithdraw.toLocaleString('id-ID')}.`);
            return;
        }
        if (numAmount > currentBalance) {
            toast.error('Saldo Anda belum mencukupi untuk melakukan penarikan ini.');
            return;
        }

        onConfirmWithdraw(numAmount, targetAccount, targetName);
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
            <div className="relative w-full max-w-lg rounded-md bg-white border-[3px] border-black p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4 animate-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto no-scrollbar text-black">
                <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                    <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-sm border-2 border-black bg-[#00C2CB] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                            <img src="/images/icon/wallet.png" alt="Tarik Saldo" className="h-4 w-4 object-contain" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                Tarik Saldo
                            </h3>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-sm border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000000] hover:bg-[#FF00FF] transition cursor-pointer text-black"
                    >
                        <X className="h-4 w-4 stroke-[2.5]" />
                    </button>
                </div>

                <div className="space-y-4 text-xs">
                    {/* Saldo Tersedia */}
                    <div className="p-3.5 rounded-sm bg-[#FFD700] border-2 border-black shadow-[3px_3px_0px_0px_#000000] flex justify-between items-center">
                        <span className="font-black uppercase tracking-wider text-black">Saldo Tersedia:</span>
                        <span className="font-black text-black text-base font-mono">
                            Rp{currentBalance.toLocaleString('id-ID')}
                        </span>
                    </div>

                    {/* E-Wallet Selection & Saved Number */}
                    <div className="space-y-2.5">
                        <label className="block text-xs font-black uppercase tracking-wider text-black">
                            Tujuan Penarikan
                        </label>

                        {/* E-wallet selector tabs */}
                        <div className="grid grid-cols-4 gap-2.5">
                            {ewalletOptions.map((wallet) => (
                                <button
                                    key={wallet.id}
                                    type="button"
                                    onClick={() => handleSelectWallet(wallet.id)}
                                    className={`flex h-12 w-full items-center justify-center p-2 rounded-sm transition cursor-pointer border-2 border-black ${currentWallet === wallet.id
                                        ? 'bg-[#00C2CB] shadow-[3px_3px_0px_0px_#000000]'
                                        : 'bg-white shadow-[2px_2px_0px_0px_#000000] hover:bg-[#F5F5DC]'
                                        }`}
                                >
                                    {wallet.id === 'GoPay' ? (
                                        <img
                                            src="/images/saldo/gopay.png"
                                            alt="GoPay"
                                            className="h-full w-full object-contain"
                                        />
                                    ) : wallet.id === 'OVO' ? (
                                        <img
                                            src="/images/saldo/ovo.png"
                                            alt="OVO"
                                            className="h-full w-full object-contain"
                                        />
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

                        <p className="text-[11px] font-bold text-neutral-700 leading-tight">
                            Simpan nomor & nama {currentWallet} Anda agar tidak perlu mengetik ulang setiap penarikan.
                        </p>

                        <div className="space-y-2.5">
                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-wider text-black mb-1">
                                    Nomor {currentWallet}
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={accountInput}
                                        onChange={(e) => setAccountInput(e.target.value.replace(/\D/g, ''))}
                                        placeholder="081234567890"
                                        maxLength={15}
                                        className="flex-1 rounded-sm border-2 border-black bg-white px-3.5 py-2.5 text-xs font-mono font-bold text-black placeholder:text-neutral-400 focus:outline-none shadow-[2px_2px_0px_0px_#000000]"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSaveEwallet}
                                        title={isSaved ? 'Data Tersimpan' : 'Simpan data'}
                                        aria-label="Simpan data"
                                        className="inline-flex items-center justify-center p-2 rounded-sm border-2 border-black bg-white hover:bg-[#00C2CB] shadow-[2px_2px_0px_0px_#000000] transition cursor-pointer shrink-0"
                                    >
                                        {isSaved ? (
                                            <Check
                                                className="h-5 w-5 text-black stroke-[3]"
                                            />
                                        ) : (
                                            <img src="/images/icon/save.png" alt="Simpan" className="h-5 w-5 object-contain shrink-0" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-wider text-black mb-1">
                                    Atas Nama
                                </label>
                                <input
                                    type="text"
                                    value={accountNameInput}
                                    onChange={(e) => setAccountNameInput(e.target.value)}
                                    placeholder="Contoh: Hawwin Ramadhan"
                                    className="w-full rounded-sm border-2 border-black bg-white px-3.5 py-2.5 text-xs font-bold text-black placeholder:text-neutral-400 focus:outline-none shadow-[2px_2px_0px_0px_#000000]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Nominal Penarikan */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between mb-1">
                            <label className="block text-xs font-black uppercase tracking-wider text-black">
                                Nominal Penarikan
                            </label>
                            {currentBalance >= minWithdraw && (
                                <button
                                    type="button"
                                    onClick={() => setWithdrawAmount(String(currentBalance))}
                                    className="text-xs font-black uppercase tracking-wider text-black hover:text-[#00C2CB] cursor-pointer"
                                >
                                    Tarik Semua
                                </button>
                            )}
                        </div>
                        <div className="relative flex items-center">
                            <span className="absolute left-3.5 text-xs font-black text-black select-none pointer-events-none">
                                Rp
                            </span>
                            <input
                                type="text"
                                inputMode="numeric"
                                placeholder={minWithdraw.toLocaleString('id-ID')}
                                value={
                                    withdrawAmount !== ''
                                        ? Number(withdrawAmount).toLocaleString('id-ID')
                                        : ''
                                }
                                onChange={(e) => {
                                    const raw = e.target.value.replace(/\D/g, '');
                                    setWithdrawAmount(raw ? String(Number(raw.slice(0, 10))) : '');
                                }}
                                className="w-full rounded-sm border-2 border-black bg-white py-2.5 pl-10 pr-3 text-xs font-mono font-black text-black placeholder:text-neutral-400 focus:outline-none shadow-[2px_2px_0px_0px_#000000] transition"
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
                                        className={`py-2 px-1.5 rounded-sm text-xs font-mono font-black border-2 border-black text-center transition cursor-pointer ${isSelected
                                            ? 'bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]'
                                            : 'bg-white text-black hover:bg-[#F5F5DC] shadow-[1px_1px_0px_0px_#000000]'
                                            }`}
                                    >
                                        Rp{preset.toLocaleString('id-ID')}
                                    </button>
                                );
                            })}
                        </div>

                        <p className="text-[11px] font-bold text-neutral-700 mt-2">
                            Minimal penarikan adalah Rp{minWithdraw.toLocaleString('id-ID')}.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-black">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-md text-xs font-black uppercase tracking-wider border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none text-black transition cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="px-5 py-2.5 rounded-md text-xs font-black uppercase tracking-wider bg-[#00C2CB] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition cursor-pointer"
                    >
                        Konfirmasi Penarikan
                    </button>
                </div>
            </div>
        </div>
    );
}
