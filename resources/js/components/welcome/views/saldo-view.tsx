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
        <div className="w-full space-y-6">
            {/* Card 1: Saldo Tersedia */}
            <div id="card-saldo-penarikan" className="rounded-md bg-white border-[3px] border-black p-6 shadow-[8px_8px_0px_0px_#000000]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <span className="text-xs font-black uppercase tracking-widest text-black">
                            Saldo Tersedia
                        </span>

                        <div className="flex items-center gap-3">
                            <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black font-mono">
                                {isSaldoVisible ? `Rp${currentBalance.toLocaleString('id-ID')}` : 'Rp ••••••'}
                            </span>
                            <button
                                type="button"
                                onClick={onToggleSaldo}
                                className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all text-black cursor-pointer"
                                title={isSaldoVisible ? 'Sembunyikan saldo' : 'Tampilkan saldo'}
                                aria-label={isSaldoVisible ? 'Sembunyikan saldo' : 'Tampilkan saldo'}
                            >
                                {isSaldoVisible ? (
                                    <Eye className="h-4.5 w-4.5 stroke-[2.5]" />
                                ) : (
                                    <EyeOff className="h-4.5 w-4.5 stroke-[2.5]" />
                                )}
                            </button>
                        </div>

                        <p className="text-xs font-bold text-neutral-800">
                            Minimal penarikan Rp10.000 • Diproses otomatis 1x24 jam
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2.5 shrink-0">
                        <button
                            type="button"
                            onClick={() => onSetWithdrawModalOpen(true)}
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#00C2CB] text-black font-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all px-5 py-2.5 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
                        >
                            <img src="/images/icon/wallet.png" alt="Wallet" className="h-4 w-4 object-contain shrink-0" />
                            <span>Tarik Saldo</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Card 2: Tabel Riwayat Penarikan */}
            <div id="riwayat-transaksi-table" className="rounded-md bg-white border-[3px] border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-black">
                    Riwayat Penarikan
                </h3>
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left text-xs border-2 border-black">
                        <thead>
                            <tr className="bg-[#FFD700] border-b-2 border-black text-black uppercase font-black tracking-wider text-[11px]">
                                <th className="p-3 border-r-2 border-black">Tanggal</th>
                                <th className="p-3 border-r-2 border-black">Keterangan</th>
                                <th className="p-3 border-r-2 border-black">Nominal</th>
                                <th className="p-3 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-black bg-white font-medium text-black">
                            {transactionHistory.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="py-10 text-center text-xs font-bold text-neutral-600"
                                    >
                                        Belum ada riwayat penarikan saldo.
                                    </td>
                                </tr>
                            ) : (
                                transactionHistory.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-[#F5F5DC] transition"
                                    >
                                        <td className="p-3 border-r-2 border-black font-mono font-bold text-black">
                                            {item.date}
                                        </td>
                                        <td className="p-3 border-r-2 border-black font-bold text-black">
                                            {item.desc}
                                        </td>
                                        <td className={`p-3 border-r-2 border-black font-black font-mono ${item.amount < 0 ? 'text-[#FF00FF]' : 'text-black'}`}>
                                            {item.amount < 0 ? `-Rp${Math.abs(item.amount).toLocaleString('id-ID')}` : `+Rp${item.amount.toLocaleString('id-ID')}`}
                                        </td>
                                        <td className="p-3 text-center align-middle">
                                            {item.status === 'ditolak' || item.status === 'rejected' || item.status === 'gagal' ? (
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border-2 border-black bg-[#FF00FF] shadow-[2px_2px_0px_0px_#000000]" title="Ditolak">
                                                    <img src="/images/icon/reject.png" alt="Ditolak" className="size-5 object-contain shrink-0" />
                                                </span>
                                            ) : item.status === 'pending' || item.status === 'menunggu' ? (
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000]" title="Menunggu">
                                                    <img src="/images/icon/pending.png" alt="Menunggu" className="size-5 object-contain shrink-0" />
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border-2 border-black bg-[#00C2CB] shadow-[2px_2px_0px_0px_#000000]" title="Selesai">
                                                    <img src="/images/icon/checklist.png" alt="Selesai" className="size-5 object-contain shrink-0" />
                                                </span>
                                            )}
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
