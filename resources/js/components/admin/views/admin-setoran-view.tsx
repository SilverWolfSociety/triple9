import { useEffect, useState } from 'react';
import {
    Check,
    CheckCheck,
    Eye,
    EyeOff,
    FileText,
    Filter,
    Search,
    X,
} from 'lucide-react';
import { toast } from 'sonner';
import type { AdminSetoranItem, SetoranStatus } from '../types';

interface AdminSetoranViewProps {
    setoranList: AdminSetoranItem[];
    onApproveSetoran: (id: string) => void;
    onRejectSetoran: (id: string, reason?: string) => void;
    onCheckSetoran: (id: string) => void;
    onBatchApprove: (ids: string[]) => void;
    onBatchReject: (ids: string[], reason?: string) => void;
    onBatchCheck: (ids: string[]) => void;
}

export function AdminSetoranView({
    setoranList,
    onApproveSetoran,
    onRejectSetoran,
    onCheckSetoran,
    onBatchApprove,
    onBatchReject,
    onBatchCheck,
}: AdminSetoranViewProps) {
    const [selectedStatus, setSelectedStatus] = useState<'all' | SetoranStatus>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

    const togglePasswordVisibility = (id: string) => {
        setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const copyText = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} berhasil disalin ke clipboard!`);
    };

    const filteredList = setoranList.filter((item) => {
        const matchesStatus =
            selectedStatus === 'all'
                ? true
                : selectedStatus === 'diterima'
                    ? item.status === 'diterima' || item.status === 'valid'
                    : selectedStatus === 'ditolak'
                        ? item.status === 'ditolak' || item.status === 'invalid'
                        : selectedStatus === 'dicek'
                            ? item.status === 'dicek'
                            : selectedStatus === 'pending'
                                ? item.status === 'pending'
                                : item.status === selectedStatus;
        const matchesSearch =
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const pendingCount = setoranList.filter((s) => s.status === 'pending').length;
    const dicekCount = setoranList.filter((s) => s.status === 'dicek').length;
    const diterimaCount = setoranList.filter((s) => s.status === 'diterima' || s.status === 'valid').length;
    const ditolakCount = setoranList.filter((s) => s.status === 'ditolak' || s.status === 'invalid').length;

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedStatus, searchQuery, itemsPerPage]);

    const paginatedList = filteredList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const pageIds = paginatedList.map((item) => item.id);
    const isAllPageSelected = pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));

    const toggleSelectAll = () => {
        if (isAllPageSelected) {
            setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
        } else {
            setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
        }
    };

    const getVisiblePages = (curr: number, total: number) => {
        if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
        if (curr <= 3) return [1, 2, 3, 4, '...', total];
        if (curr >= total - 2) return [1, '...', total - 3, total - 2, total - 1, total];
        return [1, '...', curr - 1, curr, curr + 1, '...', total];
    };

    const toggleSelectOne = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
    };

    const handleCopyFormatted = () => {
        const targets =
            selectedIds.length > 0
                ? setoranList.filter((s) => selectedIds.includes(s.id))
                : filteredList;

        if (targets.length === 0) {
            toast.error('Tidak ada akun untuk disalin.');
            return;
        }

        const lines = targets.map(
            (t) => `${t.email}|${t.password}|${t.recovery || ''}`,
        );
        navigator.clipboard.writeText(lines.join('\n'));
        toast.success(
            `${targets.length} akun berhasil disalin dengan format (email|pass|rec)!`,
        );
    };

    const handleExportTxt = () => {
        const targets =
            selectedIds.length > 0
                ? setoranList.filter((s) => selectedIds.includes(s.id))
                : filteredList;

        if (targets.length === 0) {
            toast.error('Tidak ada akun untuk diekspor.');
            return;
        }

        const lines = targets.map(
            (t) => `${t.email}|${t.password}|${t.recovery || ''}`,
        );
        const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `triple9_setoran_export_${new Date().toISOString().slice(0, 10)}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success(`Berhasil mengunduh ${targets.length} akun.`);
    };

    return (
        <div className="space-y-6">
            {/* Header Control Card */}
            <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                {/* 1. Search Bar - Identik dengan riwayat-view.tsx */}
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-black stroke-[2.5]" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari email / user / ID..."
                        className="w-full rounded-sm border-2 border-black bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm font-bold text-black placeholder:text-neutral-500 shadow-[4px_4px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                    />
                </div>

                {/* 2. Filters & Action Toolbar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => setSelectedStatus('all')}
                            className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedStatus === 'all'
                                ? 'bg-black text-white shadow-[2px_2px_0px_0px_#000000]'
                                : 'bg-white text-black hover:bg-[#F5F5DC]'
                                }`}
                        >
                            Semua ({setoranList.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedStatus('pending')}
                            className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedStatus === 'pending'
                                ? 'bg-[#FFD700] text-black shadow-[2px_2px_0px_0px_#000000]'
                                : 'bg-white text-black hover:bg-[#F5F5DC]'
                                }`}
                        >
                            Menunggu ({pendingCount})
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedStatus('dicek')}
                            className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedStatus === 'dicek'
                                ? 'bg-[#F5F5DC] text-black font-black shadow-[2px_2px_0px_0px_#000000]'
                                : 'bg-white text-black hover:bg-[#F5F5DC]'
                                }`}
                        >
                            Di Cek ({dicekCount})
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedStatus('diterima')}
                            className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedStatus === 'diterima'
                                ? 'bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]'
                                : 'bg-white text-black hover:bg-[#F5F5DC]'
                                }`}
                        >
                            Diterima ({diterimaCount})
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedStatus('ditolak')}
                            className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedStatus === 'ditolak'
                                ? 'bg-[#FF00FF] text-black shadow-[2px_2px_0px_0px_#000000]'
                                : 'bg-white text-black hover:bg-[#F5F5DC]'
                                }`}
                        >
                            Ditolak ({ditolakCount})
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={handleCopyFormatted}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border-2 border-black bg-[#00C2CB] text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition cursor-pointer"
                        >
                            <img src="/images/icon/copy.png" alt="Salin" className="size-4 object-contain" />
                            <span>Salin Semua</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleExportTxt}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border-2 border-black bg-white hover:bg-[#F5F5DC] text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition cursor-pointer"
                        >
                            <img src="/images/icon/download.png" alt="Ekspor TXT" className="size-4 object-contain" />
                            <span>Ekspor TXT</span>
                        </button>
                    </div>
                </div>

                {/* Batch Action Bar if items selected */}
                {selectedIds.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#FFD700] border-2 border-black rounded-sm shadow-[3px_3px_0px_0px_#000000]">
                        <span className="text-xs font-black text-black uppercase tracking-wider">
                            {selectedIds.length} Akun Dipilih
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    onBatchApprove(selectedIds);
                                    setSelectedIds([]);
                                    toast.success(`${selectedIds.length} akun disetujui sekaligus.`);
                                }}
                                className="px-3 py-1 rounded-sm border-2 border-black bg-[#00C2CB] hover:bg-[#00a8b0] text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
                            >
                                Terima Semua ({selectedIds.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    onBatchCheck(selectedIds);
                                    setSelectedIds([]);
                                    toast.info(`${selectedIds.length} akun ditandai sedang dicek.`);
                                }}
                                className="px-3 py-1 rounded-sm border-2 border-black bg-[#F5F5DC] hover:bg-[#e6e6cc] text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
                            >
                                Tandai Di Cek ({selectedIds.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    onBatchReject(selectedIds, 'Akun ditolak verifikasi massal');
                                    setSelectedIds([]);
                                    toast.error(`${selectedIds.length} akun ditolak.`);
                                }}
                                className="px-3 py-1 rounded-sm border-2 border-black bg-[#FF00FF] hover:bg-[#e000e0] text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
                            >
                                Tolak Semua ({selectedIds.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedIds([])}
                                className="px-2 py-1 rounded-sm border border-black bg-white text-black text-xs font-bold cursor-pointer"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                )}

                {/* Setoran Table */}
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left text-xs border-2 border-black">
                        <thead>
                            <tr className="bg-[#FFD700] border-b-2 border-black text-black uppercase font-black tracking-wider text-[11px]">
                                <th className="p-3 border-r-2 border-black w-10 text-center">
                                    <input
                                        type="checkbox"
                                        checked={isAllPageSelected}
                                        onChange={toggleSelectAll}
                                        className="size-4 rounded-none border-2 border-black cursor-pointer"
                                    />
                                </th>
                                <th className="p-3 border-r-2 border-black">ID & Tanggal</th>
                                <th className="p-3 border-r-2 border-black">Pengirim</th>
                                <th className="p-3 border-r-2 border-black">Email Gmail</th>
                                <th className="p-3 border-r-2 border-black">Password</th>
                                <th className="p-3 border-r-2 border-black">Recovery</th>
                                <th className="p-3 border-r-2 border-black">Status</th>
                                <th className="p-3 border-r-2 border-black">Catatan</th>
                                <th className="p-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-black bg-white font-medium">
                            {filteredList.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="p-8 text-center text-xs font-black uppercase tracking-wider text-neutral-500">
                                        Tidak ada data setoran yang cocok dengan filter.
                                    </td>
                                </tr>
                            ) : (
                                paginatedList.map((item) => {
                                    const isSelected = selectedIds.includes(item.id);
                                    const showPassword = !!visiblePasswords[item.id];

                                    return (
                                        <tr
                                            key={item.id}
                                            className={`hover:bg-[#F5F5DC] transition ${isSelected ? 'bg-[#FFD700]/20' : ''
                                                }`}
                                        >
                                            <td className="p-3 border-r-2 border-black text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => toggleSelectOne(item.id)}
                                                    className="size-4 rounded-none border-2 border-black cursor-pointer"
                                                />
                                            </td>
                                            <td className="p-3 border-r-2 border-black font-mono font-bold">
                                                <div className="text-black font-black">{item.id}</div>
                                                <div className="text-[10px] text-neutral-500">
                                                    {item.date} {item.time}
                                                </div>
                                            </td>
                                            <td className="p-3 border-r-2 border-black">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={item.userAvatar}
                                                        alt={item.userName}
                                                        className="size-6 rounded-full border border-black bg-[#FFD700] object-contain shrink-0"
                                                    />
                                                    <div className="truncate max-w-[120px]">
                                                        <div className="font-bold text-black truncate">{item.userName}</div>
                                                        <div className="text-[10px] text-neutral-500 truncate">{item.userEmail}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3 border-r-2 border-black font-mono font-bold text-black select-all">
                                                <div className="flex items-center justify-between gap-1">
                                                    <span className="truncate max-w-[160px]">{item.email}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => copyText(item.email, 'Email')}
                                                        title="Salin email"
                                                        className="size-5 inline-flex items-center justify-center rounded-xs hover:bg-[#00C2CB] border border-transparent hover:border-black transition cursor-pointer"
                                                    >
                                                        <img src="/images/icon/copy.png" alt="Salin" className="size-3.5 object-contain" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-3 border-r-2 border-black font-mono text-neutral-800 select-all">
                                                <div className="flex items-center justify-between gap-1">
                                                    <span>{showPassword ? item.password : '••••••••'}</span>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => togglePasswordVisibility(item.id)}
                                                            title={showPassword ? 'Sembunyikan' : 'Lihat'}
                                                            className="size-5 inline-flex items-center justify-center rounded-xs hover:bg-[#F5F5DC] cursor-pointer"
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="size-3 text-black" />
                                                            ) : (
                                                                <Eye className="size-3 text-black" />
                                                            )}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => copyText(item.password, 'Password')}
                                                            title="Salin password"
                                                            className="size-5 inline-flex items-center justify-center rounded-xs hover:bg-[#00C2CB] border border-transparent hover:border-black transition cursor-pointer"
                                                        >
                                                            <img src="/images/icon/copy.png" alt="Salin" className="size-3.5 object-contain" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3 border-r-2 border-black font-mono text-neutral-600 truncate max-w-[130px] select-all">
                                                {item.recovery || '-'}
                                            </td>
                                            <td className="p-3 border-r-2 border-black">
                                                {item.status === 'diterima' || item.status === 'valid' ? (
                                                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border border-black bg-[#00C2CB] shadow-[1px_1px_0px_0px_#000000]" title="Diterima">
                                                        <img src="/images/icon/checklist.png" alt="Diterima" className="size-5 object-contain shrink-0" />
                                                    </span>
                                                ) : item.status === 'ditolak' || item.status === 'invalid' ? (
                                                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border border-black bg-[#FF00FF] shadow-[1px_1px_0px_0px_#000000]" title="Ditolak">
                                                        <img src="/images/icon/reject.png" alt="Ditolak" className="size-5 object-contain shrink-0" />
                                                    </span>
                                                ) : item.status === 'dicek' ? (
                                                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border border-black bg-[#F5F5DC] shadow-[1px_1px_0px_0px_#000000]" title="Di Cek">
                                                        <img src="/images/icon/find.png" alt="Di Cek" className="size-5 object-contain shrink-0" />
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border border-black bg-[#FFD700] shadow-[1px_1px_0px_0px_#000000]" title="Menunggu">
                                                        <img src="/images/icon/pending.png" alt="Menunggu" className="size-5 object-contain shrink-0" />
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-3 border-r-2 border-black text-xs text-neutral-600 truncate max-w-[120px]">
                                                {item.note || '-'}
                                            </td>
                                            <td className="p-3 text-right">
                                                <div className="inline-flex items-center gap-1.5">
                                                    {item.status === 'pending' || item.status === 'dicek' ? (
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    onApproveSetoran(item.id);
                                                                    toast.success(`Akun ${item.email} diterima & reward ditambahkan.`);
                                                                }}
                                                                title="Terima Setoran"
                                                                className="size-7 inline-flex items-center justify-center rounded-xs border border-black bg-[#00C2CB] hover:bg-[#00a8b0] text-black shadow-[1px_1px_0px_0px_#000000] cursor-pointer transition"
                                                            >
                                                                <Check className="size-4 stroke-[3]" />
                                                            </button>
                                                            {item.status === 'pending' && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        onCheckSetoran(item.id);
                                                                        toast.info(`Akun ${item.email} ditandai sedang dicek.`);
                                                                    }}
                                                                    title="Tandai Sedang Di Cek"
                                                                    className="size-7 inline-flex items-center justify-center rounded-xs border border-black bg-[#F5F5DC] hover:bg-[#e6e6cc] text-black shadow-[1px_1px_0px_0px_#000000] cursor-pointer transition"
                                                                >
                                                                    <Search className="size-4 stroke-[3]" />
                                                                </button>
                                                            )}
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    onRejectSetoran(item.id, 'Password salah / 2FA aktif');
                                                                    toast.error(`Setoran ${item.email} ditolak.`);
                                                                }}
                                                                title="Tolak Setoran"
                                                                className="size-7 inline-flex items-center justify-center rounded-xs border border-black bg-[#FF00FF] hover:bg-[#e000e0] text-black shadow-[1px_1px_0px_0px_#000000] cursor-pointer transition"
                                                            >
                                                                <X className="size-4 stroke-[3]" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <span className="text-[10px] font-bold text-neutral-400">
                                                            Selesai
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t-2 border-black text-xs font-black">
                    <div className="flex flex-wrap items-center gap-2 text-neutral-700 text-[11px] uppercase tracking-wider font-bold">
                        <span>
                            Menampilkan{' '}
                            <span className="font-mono font-black text-black">
                                {filteredList.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
                            </span>{' '}
                            -{' '}
                            <span className="font-mono font-black text-black">
                                {Math.min(currentPage * itemsPerPage, filteredList.length)}
                            </span>{' '}
                            dari{' '}
                            <span className="font-mono font-black text-black">{filteredList.length}</span> akun
                        </span>
                        <span className="hidden sm:inline text-neutral-300">•</span>
                        <div className="inline-flex items-center gap-1.5">
                            <span className="text-neutral-500 text-[10px]">Baris:</span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                className="px-2 py-0.5 border border-black rounded-xs bg-white text-[11px] font-black cursor-pointer shadow-[1px_1px_0px_0px_#000000] focus:outline-none"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            className="px-3 py-1.5 rounded-xs border-2 border-black bg-white hover:bg-[#F5F5DC] disabled:opacity-40 disabled:cursor-not-allowed shadow-[2px_2px_0px_0px_#000000] cursor-pointer text-xs font-black uppercase tracking-wider transition"
                        >
                            Prev
                        </button>

                        <div className="flex items-center gap-1">
                            {getVisiblePages(currentPage, totalPages).map((p, idx) =>
                                p === '...' ? (
                                    <span key={`ellipsis-${idx}`} className="px-1 text-black font-mono font-bold text-xs">
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={`page-${p}`}
                                        type="button"
                                        onClick={() => setCurrentPage(p as number)}
                                        className={`size-8 rounded-xs border-2 border-black text-xs font-black font-mono transition cursor-pointer shadow-[2px_2px_0px_0px_#000000] ${currentPage === p
                                                ? 'bg-[#00C2CB] text-black'
                                                : 'bg-white text-black hover:bg-[#F5F5DC]'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ),
                            )}
                        </div>

                        <button
                            type="button"
                            disabled={currentPage === totalPages || filteredList.length === 0}
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            className="px-3 py-1.5 rounded-xs border-2 border-black bg-white hover:bg-[#F5F5DC] disabled:opacity-40 disabled:cursor-not-allowed shadow-[2px_2px_0px_0px_#000000] cursor-pointer text-xs font-black uppercase tracking-wider transition"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
