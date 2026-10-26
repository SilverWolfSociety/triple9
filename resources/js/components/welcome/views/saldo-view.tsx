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
    savedEwalletNames?: Record<string, string>;
    onSaveEwalletNumber: (wallet: EwalletType, number: string, name?: string) => void;
    transactionHistory: TransactionRecord[];
    onWithdraw: (amount: number, account: string, accountName?: string) => void;
    isWithdrawModalOpen: boolean;
    onSetWithdrawModalOpen: (open: boolean) => void;
    minWithdraw?: number;
}

const getMethodBadgeColor = (method: string) => {
    const m = method.toLowerCase();
    if (m.includes('dana')) return 'bg-[#00C2CB] text-black';
    if (m.includes('ovo')) return 'bg-[#FF00FF] text-black';
    if (m.includes('gopay')) return 'bg-[#A3E635] text-black';
    if (m.includes('shopee')) return 'bg-[#FF8A00] text-black';
    if (m.includes('setor')) return 'bg-[#FFD700] text-black';
    if (m.includes('admin')) return 'bg-[#F5F5DC] text-black';
    return 'bg-white text-black';
};

const formatRupiah = (val: number) =>
    'Rp ' + new Intl.NumberFormat('id-ID').format(val);

const parseTransactionMethod = (item: TransactionRecord) => {
    if (item.method) {
        return {
            method: item.method,
            accountNumber: item.accountNumber || '',
            accountName: item.accountName || '',
        };
    }
    const desc = item.desc || '';
    // e.g. "Tarik Saldo ke DANA (0987654321 a.n Hawwin Ramadhan)"
    const matchWd = desc.match(/Tarik Saldo ke ([a-zA-Z]+)(?:\s*\((.*?)\))?/i);
    if (matchWd) {
        const method = matchWd[1];
        const inner = matchWd[2] || '';
        const anSplit = inner.split(/ a\.n /i);
        return {
            method: method.toUpperCase(),
            accountNumber: anSplit[0]?.trim() || '',
            accountName: anSplit[1]?.trim() || '',
        };
    }

    // e.g. "Pengembalian Dana (DANA Ditolak)"
    const matchRefund = desc.match(/Pengembalian Dana \(([a-zA-Z]+)/i);
    if (matchRefund) {
        return {
            method: matchRefund[1].toUpperCase(),
            accountNumber: '',
            accountName: 'Refund',
        };
    }

    // e.g. "Reward Setor Akun (user9739@gmail.com)" or "Reward Batch Setor"
    if (desc.toLowerCase().includes('setor')) {
        const matchEmail = desc.match(/\((.*?)\)/);
        return {
            method: 'Setor Akun',
            accountNumber: matchEmail ? matchEmail[1] : '',
            accountName: '',
        };
    }

    // e.g. "Penyesuaian Saldo Admin"
    if (desc.toLowerCase().includes('penyesuaian') || desc.toLowerCase().includes('admin')) {
        return {
            method: 'Admin',
            accountNumber: desc.includes('Tambah') ? 'Penambahan Saldo' : 'Pengurangan Saldo',
            accountName: '',
        };
    }

    return {
        method: 'Saldo',
        accountNumber: desc,
        accountName: '',
    };
};

export function SaldoView({
    currentBalance,
    isSaldoVisible,
    onToggleSaldo,
    selectedEwallet,
    onChangeEwallet,
    savedEwalletNumbers,
    savedEwalletNames,
    onSaveEwalletNumber,
    transactionHistory,
    onWithdraw,
    isWithdrawModalOpen,
    onSetWithdrawModalOpen,
    minWithdraw = 10000,
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
                                <th className="p-3 border-r-2 border-black whitespace-nowrap w-28">Tanggal</th>
                                <th className="p-3 border-r-2 border-black whitespace-nowrap">Metode</th>
                                <th className="p-3 border-r-2 border-black whitespace-nowrap">Nomor E-Wallet</th>
                                <th className="p-3 border-r-2 border-black whitespace-nowrap">Atas Nama</th>
                                <th className="p-3 border-r-2 border-black whitespace-nowrap">Nominal</th>
                                <th className="p-3 border-r-2 border-black whitespace-nowrap">Status</th>
                                <th className="p-3 border-r-2 border-black whitespace-nowrap min-w-[150px]">Keterangan</th>
                                <th className="p-3 text-right whitespace-nowrap">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-black bg-white font-medium text-black">
                            {transactionHistory.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="py-10 text-center text-xs font-bold text-neutral-600"
                                    >
                                        Belum ada riwayat penarikan saldo.
                                    </td>
                                </tr>
                            ) : (
                                transactionHistory.map((item, idx) => {
                                    const parsedMethod = parseTransactionMethod(item);
                                    return (
                                        <tr
                                            key={idx}
                                            className="hover:bg-[#F5F5DC] transition"
                                        >
                                            <td className="p-3 border-r-2 border-black font-mono font-bold text-black whitespace-nowrap">
                                                {item.date}
                                            </td>
                                            <td className="p-3 border-r-2 border-black whitespace-nowrap">
                                                <span
                                                    className={`inline-flex px-2 py-0.5 rounded-xs border border-black font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000000] ${getMethodBadgeColor(
                                                        parsedMethod.method,
                                                    )}`}
                                                >
                                                    {parsedMethod.method}
                                                </span>
                                            </td>
                                            <td className="p-3 border-r-2 border-black font-mono font-bold text-black select-all whitespace-nowrap">
                                                {parsedMethod.accountNumber || '-'}
                                            </td>
                                            <td className="p-3 border-r-2 border-black font-bold text-black whitespace-nowrap">
                                                {parsedMethod.accountName || '-'}
                                            </td>
                                            <td className="p-3 border-r-2 border-black font-mono font-black text-black whitespace-nowrap">
                                                {formatRupiah(Math.abs(item.amount))}
                                            </td>
                                            <td className="p-3 border-r-2 border-black align-middle whitespace-nowrap">
                                                {item.status === 'ditolak' || item.status === 'rejected' || item.status === 'gagal' ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs border-2 border-black bg-[#FF00FF] font-black text-[10px] uppercase shadow-[2px_2px_0px_0px_#000000]">
                                                        <img src="/images/icon/reject.png" alt="Ditolak" className="size-3.5 object-contain shrink-0" />
                                                        <span>Ditolak</span>
                                                    </span>
                                                ) : item.status === 'pending' || item.status === 'menunggu' ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs border-2 border-black bg-[#FFD700] font-black text-[10px] uppercase shadow-[2px_2px_0px_0px_#000000]">
                                                        <img src="/images/icon/pending.png" alt="Pending" className="size-3.5 object-contain shrink-0" />
                                                        <span>Pending</span>
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs border-2 border-black bg-[#00C2CB] font-black text-[10px] uppercase shadow-[2px_2px_0px_0px_#000000]">
                                                        <img src="/images/icon/checklist.png" alt="Berhasil" className="size-3.5 object-contain shrink-0" />
                                                        <span>Berhasil</span>
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-3 border-r-2 border-black text-xs text-neutral-600 whitespace-nowrap min-w-[150px]">
                                                {item.note || '-'}
                                            </td>
                                            <td className="p-3 text-right whitespace-nowrap">
                                                {item.status === 'pending' || item.status === 'menunggu' ? (
                                                    <span className="text-[11px] font-bold text-neutral-500">
                                                        Diproses
                                                    </span>
                                                ) : (
                                                    <span className="text-[11px] font-bold text-neutral-400">
                                                        Terselesaikan
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
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
                savedEwalletNames={savedEwalletNames}
                onSaveEwalletNumber={onSaveEwalletNumber}
                onConfirmWithdraw={onWithdraw}
                minWithdraw={minWithdraw}
            />
        </div>
    );
}
