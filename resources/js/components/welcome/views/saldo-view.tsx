import { useState, useEffect } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';
import type { EwalletType, TransactionRecord } from '../types';
import { ewalletOptions } from '../constants';
import { WithdrawModal } from '../modals/withdraw-modal';

interface SaldoViewProps {
    currentBalance: number;
    isSaldoVisible: boolean;
    onToggleSaldo: () => void;
    selectedEwallet: EwalletType;
    onChangeEwallet: (wallet: EwalletType) => void;
    savedEwalletNumbers: Record<string, string>;
    onSaveEwalletNumber: (wallet: EwalletType, number: string) => void;
    transactionHistory: TransactionRecord[];
    onWithdraw: (amount: number, account: string) => void;
    isWithdrawModalOpen: boolean;
    onSetWithdrawModalOpen: (open: boolean) => void;
}

export function SaldoView({
    currentBalance,
    isSaldoVisible,
    onToggleSaldo,
    selectedEwallet,
    onChangeEwallet,
    savedEwalletNumbers,
    onSaveEwalletNumber,
    transactionHistory,
    onWithdraw,
    isWithdrawModalOpen,
    onSetWithdrawModalOpen,
}: SaldoViewProps) {
    const [ewalletInput, setEwalletInput] = useState(savedEwalletNumbers[selectedEwallet] || '');
    const [isSavedSuccess, setIsSavedSuccess] = useState(false);

    useEffect(() => {
        setEwalletInput(savedEwalletNumbers[selectedEwallet] || '');
    }, [selectedEwallet, savedEwalletNumbers]);

    const handleSaveEwallet = () => {
        if (ewalletInput.length >= 10) {
            onSaveEwalletNumber(selectedEwallet, ewalletInput);
            setIsSavedSuccess(true);
            setTimeout(() => setIsSavedSuccess(false), 2000);
        } else {
            alert('Nomor e-wallet harus terdiri dari 10-15 digit angka.');
        }
    };

    return (
        <div className="w-full space-y-5">
            {/* Card 1: Saldo Tersedia */}
            <div id="card-saldo-penarikan" className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-6 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.5">
                        <div>
                            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                Saldo Tersedia
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 font-tabular-nums">
                                {isSaldoVisible ? `Rp${currentBalance.toLocaleString('id-ID')}` : 'Rp ••••••'}
                            </span>
                            <button
                                type="button"
                                onClick={onToggleSaldo}
                                className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
                                title={isSaldoVisible ? 'Sembunyikan saldo' : 'Tampilkan saldo'}
                                aria-label={isSaldoVisible ? 'Sembunyikan saldo' : 'Tampilkan saldo'}
                            >
                                {isSaldoVisible ? (
                                    <Eye className="h-4 w-4" />
                                ) : (
                                    <EyeOff className="h-4 w-4" />
                                )}
                            </button>
                        </div>

                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            Minimal penarikan Rp10.000 • Diproses otomatis 1x24 jam
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2.5 shrink-0">
                        <button
                            type="button"
                            onClick={() => onSetWithdrawModalOpen(true)}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-medium shadow-xs transition cursor-pointer"
                        >
                            <img src="/images/icon/wallet.png" alt="Wallet" className="h-4 w-4 object-contain shrink-0" />
                            <span>Tarik Saldo</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Card 2: Nomor E-Wallet */}
            <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                    <span className="flex h-7 w-12 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 p-1 shrink-0 border border-neutral-200/80 dark:border-neutral-700/80 shadow-2xs">
                        {selectedEwallet === 'GoPay' ? (
                            <>
                                <img
                                    src="/images/gopay.png"
                                    alt="GoPay"
                                    className="h-full w-full object-contain dark:hidden"
                                />
                                <img
                                    src="/images/gopay-dark.png"
                                    alt="GoPay"
                                    className="h-full w-full object-contain hidden dark:block"
                                />
                            </>
                        ) : selectedEwallet === 'OVO' ? (
                            <>
                                <img
                                    src="/images/ovo.png"
                                    alt="OVO"
                                    className="h-full w-full object-contain dark:hidden"
                                />
                                <img
                                    src="/images/ovo-dark.png"
                                    alt="OVO"
                                    className="h-full w-full object-contain hidden dark:block"
                                />
                            </>
                        ) : (
                            <img
                                src={`/images/${selectedEwallet.toLowerCase()}.png`}
                                alt={selectedEwallet}
                                className="h-full w-full object-contain"
                            />
                        )}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100">
                        Nomor {selectedEwallet}
                    </h3>
                </div>

                {/* E-wallet selector tabs */}
                <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 max-w-xs sm:max-w-md">
                    {ewalletOptions.map((wallet) => (
                        <button
                            key={wallet.id}
                            type="button"
                            onClick={() => onChangeEwallet(wallet.id)}
                            className={`flex aspect-square w-full items-center justify-center p-2 sm:p-2.5 rounded-2xl transition cursor-pointer border ${selectedEwallet === wallet.id
                                ? 'bg-neutral-50 dark:bg-neutral-800/80 border-blue-500 dark:border-blue-400 shadow-xs ring-1 ring-blue-500/30'
                                : 'bg-white dark:bg-neutral-900 border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                                }`}
                        >
                            {wallet.id === 'GoPay' ? (
                                <>
                                    <img
                                        src="/images/gopay.png"
                                        alt="GoPay"
                                        className="h-full w-full object-contain dark:hidden"
                                    />
                                    <img
                                        src="/images/gopay-dark.png"
                                        alt="GoPay"
                                        className="h-full w-full object-contain hidden dark:block"
                                    />
                                </>
                            ) : wallet.id === 'OVO' ? (
                                <>
                                    <img
                                        src="/images/ovo.png"
                                        alt="OVO"
                                        className="h-full w-full object-contain dark:hidden"
                                    />
                                    <img
                                        src="/images/ovo-dark.png"
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

                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Simpan nomor {selectedEwallet} Anda agar tidak perlu mengetik ulang setiap penarikan. Hanya angka, 10-15 digit.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                    <input
                        type="text"
                        value={ewalletInput}
                        onChange={(e) => setEwalletInput(e.target.value.replace(/\D/g, ''))}
                        placeholder="081234567890"
                        maxLength={15}
                        className="flex-1 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-2.5 font-mono text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 focus:outline-none transition shadow-2xs"
                    />
                    <button
                        type="button"
                        onClick={handleSaveEwallet}
                        title={isSavedSuccess ? 'Tersimpan!' : 'Simpan'}
                        aria-label="Simpan"
                        className="inline-flex items-center justify-center p-2.5 sm:px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white shadow-xs transition cursor-pointer shrink-0"
                    >
                        {isSavedSuccess ? (
                            <Check className="h-4 w-4" />
                        ) : (
                            <img src="/images/icon/save.png" alt="Simpan" className="h-4 w-4 object-contain shrink-0" />
                        )}
                    </button>
                </div>
            </div>

            {/* Card 3: Tabel Riwayat Penarikan */}
            <div id="riwayat-transaksi-table" className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-3">
                <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100">
                    Riwayat Penarikan
                </h3>
                <div className="overflow-x-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200/80 dark:border-neutral-800 text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-3">Tanggal</th>
                                <th className="px-4 py-3">Keterangan</th>
                                <th className="px-4 py-3">Nominal</th>
                                <th className="px-4 py-3">Saldo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 font-mono">
                            {transactionHistory.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="py-8 text-center font-sans text-xs text-neutral-400 dark:text-neutral-500"
                                    >
                                        Belum ada transaksi.
                                    </td>
                                </tr>
                            ) : (
                                transactionHistory.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition"
                                    >
                                        <td className="px-4 py-3 font-sans text-neutral-600 dark:text-neutral-300">
                                            {item.date}
                                        </td>
                                        <td className="px-4 py-3 font-sans text-neutral-800 dark:text-neutral-200">
                                            {item.desc}
                                        </td>
                                        <td className={`px-4 py-3 font-semibold font-tabular-nums ${item.amount < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                            {item.amount < 0 ? `-Rp${Math.abs(item.amount).toLocaleString('id-ID')}` : `+Rp${item.amount.toLocaleString('id-ID')}`}
                                        </td>
                                        <td className="px-4 py-3 font-tabular-nums text-neutral-900 dark:text-neutral-100">
                                            Rp{item.balance.toLocaleString('id-ID')}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Popup: Tarik Saldo */}
            <WithdrawModal
                isOpen={isWithdrawModalOpen}
                onClose={() => onSetWithdrawModalOpen(false)}
                currentBalance={currentBalance}
                selectedEwallet={selectedEwallet}
                savedEwalletNumber={savedEwalletNumbers[selectedEwallet] || ewalletInput}
                onConfirmWithdraw={onWithdraw}
            />
        </div>
    );
}
