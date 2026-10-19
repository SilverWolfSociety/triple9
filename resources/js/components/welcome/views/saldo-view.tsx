import { Eye, EyeOff } from 'lucide-react';
import type { EwalletType, TransactionRecord } from '../types';
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

            {/* Card 2: Tabel Riwayat Penarikan */}
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
                onChangeEwallet={onChangeEwallet}
                savedEwalletNumbers={savedEwalletNumbers}
                onSaveEwalletNumber={onSaveEwalletNumber}
                onConfirmWithdraw={onWithdraw}
            />
        </div>
    );
}
