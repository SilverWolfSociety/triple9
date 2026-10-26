import { useEffect, useMemo, useRef, useState } from 'react';
import {
    Check,
    CheckCheck,
    ChevronDown,
    Download,
    Eye,
    EyeOff,
    FileText,
    Filter,
    RotateCcw,
    Search,
    User,
    X,
} from 'lucide-react';
import { toast } from 'sonner';
import type { AdminSetoranItem, SetoranStatus } from '../types';
import { AdminExportModal } from '../modals/admin-export-modal';
import { AdminRejectModal, type RejectModalTarget } from '../modals/admin-reject-modal';

interface AdminSetoranViewProps {
    setoranList: AdminSetoranItem[];
    presetUserId?: number | 'all';
    presetBatch?: string | 'all';
    onApproveSetoran: (id: string) => void;
    onRejectSetoran: (id: string, reason?: string) => void;
    onCheckSetoran: (id: string) => void;
    onBatchApprove: (ids: string[]) => void;
    onBatchReject: (ids: string[], reason?: string) => void;
    onBatchCheck: (ids: string[]) => void;
}

export function AdminSetoranView({
    setoranList,
    presetUserId = 'all',
    presetBatch = 'all',
    onApproveSetoran,
    onRejectSetoran,
    onCheckSetoran,
    onBatchApprove,
    onBatchReject,
    onBatchCheck,
}: AdminSetoranViewProps) {
    const [selectedStatus, setSelectedStatus] = useState<'all' | SetoranStatus>('all');
    const [selectedUserId, setSelectedUserId] = useState<'all' | number>(presetUserId);
    const [selectedBatch, setSelectedBatch] = useState<'all' | string>(presetBatch);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [rejectTarget, setRejectTarget] = useState<RejectModalTarget | null>(null);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

    // Custom Dropdown Open States and Refs
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isBatchDropdownOpen, setIsBatchDropdownOpen] = useState(false);
    const userDropdownRef = useRef<HTMLDivElement>(null);
    const batchDropdownRef = useRef<HTMLDivElement>(null);

    // Outside click to close custom dropdowns
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target as Node)
            ) {
                setIsUserDropdownOpen(false);
            }
            if (
                batchDropdownRef.current &&
                !batchDropdownRef.current.contains(event.target as Node)
            ) {
                setIsBatchDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Sync if presets change from outside (e.g. navigation from leaderboard)
    useEffect(() => {
        if (presetUserId !== undefined) {
            setSelectedUserId(presetUserId);
        }
    }, [presetUserId]);

    useEffect(() => {
        if (presetBatch !== undefined) {
            setSelectedBatch(presetBatch);
        }
    }, [presetBatch]);

    const togglePasswordVisibility = (id: string) => {
        setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const copyText = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} berhasil disalin ke clipboard!`);
    };

    // Extract unique users with submission counts
    const uniqueUsers = useMemo(() => {
        const map = new Map<number, { id: number; name: string; email: string; avatar: string; count: number }>();
        setoranList.forEach((item) => {
            const existing = map.get(item.userId);
            if (existing) {
                existing.count += 1;
            } else {
                map.set(item.userId, {
                    id: item.userId,
                    name: item.userName,
                    email: item.userEmail,
                    avatar: item.userAvatar,
                    count: 1,
                });
            }
        });
        return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, [setoranList]);

    // Extract unique batches with counts
    const uniqueBatches = useMemo(() => {
        const map = new Map<string, number>();
        setoranList.forEach((item) => {
            const b = item.batchId || ('BATCH-' + item.date.replace(/-/g, '').slice(2));
            map.set(b, (map.get(b) || 0) + 1);
        });
        return Array.from(map.entries())
            .map(([batch, count]) => ({ batch, count }))
            .sort((a, b) => b.batch.localeCompare(a.batch));
    }, [setoranList]);

    // Active filtered setoran list
    const filteredList = useMemo(() => {
        return setoranList.filter((item) => {
            // 1. Status Filter
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

            // 2. User Filter
            const matchesUser = selectedUserId === 'all' ? true : item.userId === selectedUserId;

            // 3. Batch Filter
            const itemBatch = item.batchId || ('BATCH-' + item.date.replace(/-/g, '').slice(2));
            const matchesBatch = selectedBatch === 'all' ? true : itemBatch === selectedBatch;

            // 4. Search Query
            const query = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !query ||
                item.email.toLowerCase().includes(query) ||
                item.userName.toLowerCase().includes(query) ||
                item.id.toLowerCase().includes(query) ||
                itemBatch.toLowerCase().includes(query) ||
                (item.note && item.note.toLowerCase().includes(query));

            return matchesStatus && matchesUser && matchesBatch && matchesSearch;
        });
    }, [setoranList, selectedStatus, selectedUserId, selectedBatch, searchQuery]);

    const pendingCount = setoranList.filter((s) => s.status === 'pending').length;
    const dicekCount = setoranList.filter((s) => s.status === 'dicek').length;
    const diterimaCount = setoranList.filter((s) => s.status === 'diterima' || s.status === 'valid').length;
    const ditolakCount = setoranList.filter((s) => s.status === 'ditolak' || s.status === 'invalid').length;

    // Check if any filter is active
    const hasActiveFilters =
        selectedStatus !== 'all' ||
        selectedUserId !== 'all' ||
        selectedBatch !== 'all' ||
        searchQuery.trim().length > 0;

    const handleResetAllFilters = () => {
        setSelectedStatus('all');
        setSelectedUserId('all');
        setSelectedBatch('all');
        setSearchQuery('');
        toast.info('Semua filter setoran telah direset.');
    };

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedStatus, selectedUserId, selectedBatch, searchQuery, itemsPerPage]);

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

        const lines = targets.map((t) => `${t.email}|${t.password}`);
        navigator.clipboard.writeText(lines.join('\n'));
        toast.success(
            `${targets.length} akun berhasil disalin dengan format (email|password)!`,
        );
    };

    const selectedUserObj =
        selectedUserId !== 'all'
            ? uniqueUsers.find((u) => u.id === selectedUserId)
            : null;

    const selectedUserName =
        selectedUserId !== 'all'
            ? selectedUserObj?.name || `User #${selectedUserId}`
            : null;

    const selectedBatchObj =
        selectedBatch !== 'all'
            ? uniqueBatches.find((b) => b.batch === selectedBatch)
            : null;

    return (
        <div className="space-y-6">
            {/* Header Control Card */}
            <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                {/* 1. Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-black stroke-[2.5]" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari email / user / batch / ID setoran..."
                        className="w-full rounded-sm border-2 border-black bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm font-bold text-black placeholder:text-neutral-500 shadow-[4px_4px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition"
                    />
                </div>

                {/* 2. Main Filters Row: Filter per User & Filter per Batch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3.5 bg-[#F5F5DC] border-2 border-black rounded-sm shadow-[3px_3px_0px_0px_#000000] relative z-20">
                    {/* User Filter Dropdown */}
                    <div className="space-y-1">
                        <div className="h-5 flex items-center">
                            <label className="text-[11px] font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                                <span>Filter Pengguna</span>
                            </label>
                        </div>
                        <div className="relative" ref={userDropdownRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsUserDropdownOpen(!isUserDropdownOpen);
                                    setIsBatchDropdownOpen(false);
                                }}
                                className="w-full h-[42px] px-3 border-2 border-black rounded-sm bg-white hover:bg-[#F5F5DC] flex items-center justify-between text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000000] transition cursor-pointer"
                            >
                                <div className="flex items-center gap-2 truncate pr-2">
                                    <img src="/images/icon/person_yellow.png" alt="Pengguna" className="size-4 object-contain shrink-0" />
                                    <span className="truncate font-black">
                                        {selectedUserId === 'all'
                                            ? `Semua Pengguna (${setoranList.length} Akun)`
                                            : `${selectedUserName} (${selectedUserObj?.count || 0} akun)`}
                                    </span>
                                </div>
                                <ChevronDown
                                    className={`size-3.5 text-black stroke-[3] shrink-0 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {isUserDropdownOpen && (
                                <div className="absolute left-0 top-full mt-1.5 w-full max-h-60 overflow-y-auto no-scrollbar rounded-sm bg-white border-2 border-black p-1 shadow-[4px_4px_0px_0px_#000000] z-30 text-xs">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedUserId('all');
                                            setIsUserDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-xs font-black transition cursor-pointer flex items-center justify-between ${selectedUserId === 'all'
                                            ? 'bg-[#00C2CB] text-black'
                                            : 'text-black hover:bg-[#F5F5DC]'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <img src="/images/icon/person_yellow.png" alt="Pengguna" className="size-4 object-contain shrink-0" />
                                            <span>Semua Pengguna</span>
                                        </div>
                                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs border border-black bg-white text-black font-black">
                                            {setoranList.length} akun
                                        </span>
                                    </button>
                                    {uniqueUsers.map((u) => {
                                        const isSelected = selectedUserId === u.id;
                                        return (
                                            <button
                                                key={u.id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedUserId(u.id);
                                                    setIsUserDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 rounded-xs font-black transition cursor-pointer flex items-center justify-between gap-2 ${isSelected
                                                    ? 'bg-[#00C2CB] text-black'
                                                    : 'text-black hover:bg-[#F5F5DC]'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2 truncate">
                                                    <img src="/images/icon/person_yellow.png" alt="Pengguna" className="size-4 object-contain shrink-0" />
                                                    <span className="truncate">{u.name}</span>
                                                </div>
                                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs border border-black bg-white text-black font-black shrink-0">
                                                    {u.count} akun
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Batch Filter Dropdown */}
                    <div className="space-y-1">
                        <div className="h-5 flex items-center">
                            <label className="text-[11px] font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                                <span>Filter Batch</span>
                            </label>
                        </div>
                        <div className="relative" ref={batchDropdownRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsBatchDropdownOpen(!isBatchDropdownOpen);
                                    setIsUserDropdownOpen(false);
                                }}
                                className="w-full h-[42px] px-3 border-2 border-black rounded-sm bg-white hover:bg-[#F5F5DC] flex items-center justify-between text-xs font-mono font-bold text-black shadow-[2px_2px_0px_0px_#000000] transition cursor-pointer"
                            >
                                <div className="flex items-center gap-2 truncate pr-2 font-mono">
                                    <img src="/images/icon/filter.png" alt="Filter Batch" className="size-4 object-contain shrink-0" />
                                    <span className="truncate font-black">
                                        {selectedBatch === 'all'
                                            ? `Semua Batch (${uniqueBatches.length} Batch)`
                                            : `#${selectedBatch} (${selectedBatchObj?.count || 0} akun)`}
                                    </span>
                                </div>
                                <ChevronDown
                                    className={`size-3.5 text-black stroke-[3] shrink-0 transition-transform ${isBatchDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {isBatchDropdownOpen && (
                                <div className="absolute left-0 top-full mt-1.5 w-full max-h-60 overflow-y-auto no-scrollbar rounded-sm bg-white border-2 border-black p-1 shadow-[4px_4px_0px_0px_#000000] z-30 text-xs">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedBatch('all');
                                            setIsBatchDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-xs font-black font-mono transition cursor-pointer flex items-center justify-between ${selectedBatch === 'all'
                                            ? 'bg-[#00C2CB] text-black'
                                            : 'text-black hover:bg-[#F5F5DC]'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <img src="/images/icon/filter.png" alt="Filter Batch" className="size-4 object-contain shrink-0" />
                                            <span>Semua Batch</span>
                                        </div>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded-xs border border-black bg-white text-black font-black">
                                            {uniqueBatches.length} batch
                                        </span>
                                    </button>
                                    {uniqueBatches.map((b) => {
                                        const isSelected = selectedBatch === b.batch;
                                        return (
                                            <button
                                                key={b.batch}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedBatch(b.batch);
                                                    setIsBatchDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 rounded-xs font-black font-mono transition cursor-pointer flex items-center justify-between gap-2 ${isSelected
                                                    ? 'bg-[#00C2CB] text-black'
                                                    : 'text-black hover:bg-[#F5F5DC]'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2 truncate font-mono">
                                                    <img src="/images/icon/filter.png" alt="Filter Batch" className="size-4 object-contain shrink-0" />
                                                    <span className="truncate">#{b.batch}</span>
                                                </div>
                                                <span className="text-[10px] px-1.5 py-0.5 rounded-xs border border-black bg-white text-black font-black shrink-0">
                                                    {b.count} akun
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Reset Filters & Hasil Filter Summary */}
                    <div className="space-y-1">
                        <div className="h-5 flex items-center invisible select-none">
                            <span className="text-[11px] font-black uppercase tracking-wider">Aksi</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleResetAllFilters}
                                disabled={!hasActiveFilters}
                                className={`flex-1 h-[42px] px-3 rounded-sm border-2 border-black flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider transition cursor-pointer shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] ${hasActiveFilters
                                    ? 'bg-white hover:bg-neutral-100 text-black'
                                    : 'bg-neutral-100 text-neutral-400 border-neutral-400 shadow-none cursor-not-allowed'
                                    }`}
                                title={hasActiveFilters ? 'Reset semua filter' : 'Tidak ada filter yang aktif'}
                            >
                                <RotateCcw className="size-3.5 stroke-[2.5]" />
                                <span>Reset Filter</span>
                            </button>

                            <div className="flex-1 h-[42px] px-2.5 rounded-sm border-2 border-black bg-white flex flex-col items-center justify-center shadow-[2px_2px_0px_0px_#000000] text-center">
                                <span className="text-[10px] text-neutral-500 uppercase font-black tracking-wide leading-tight mb-0.5">
                                    HASIL FILTER
                                </span>
                                <span className="text-black font-mono text-xs font-black leading-tight">
                                    {filteredList.length} / {setoranList.length} Akun
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Status Tabs & Action Toolbar */}
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

                    {/* Action Buttons: Salin & Filterable TXT Export */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={handleCopyFormatted}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border-2 border-black bg-[#00C2CB] text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition cursor-pointer"
                            title="Salin hasil filter dengan format email|password"
                        >
                            <img src="/images/icon/copy.png" alt="Salin" className="size-4 object-contain" />
                            <span>Salin</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsExportModalOpen(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border-2 border-black bg-[#FFD700] hover:bg-[#ffc800] text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition cursor-pointer"
                            title="Buka dialog ekspor TXT dengan filter khusus"
                        >
                            <img src="/images/icon/download.png" alt="Ekspor" className="size-4 object-contain" />
                            <span>Ekspor TXT</span>
                        </button>
                    </div>
                </div>

                {/* Active Filter Chips Bar */}
                {hasActiveFilters && (
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                        <span className="font-bold text-neutral-600 text-[11px] uppercase tracking-wider">
                            Filter Aktif:
                        </span>
                        {selectedUserId !== 'all' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-white border-2 border-black text-black font-black text-xs shadow-[1px_1px_0px_0px_#000000]">
                                <img src="/images/icon/person_yellow.png" alt="Pengguna" className="size-3.5 object-contain" />
                                <span>Pengguna: {selectedUserName}</span>
                                <button
                                    type="button"
                                    onClick={() => setSelectedUserId('all')}
                                    className="hover:text-rose-600 cursor-pointer ml-1"
                                >
                                    <X className="size-3.5 stroke-[3]" />
                                </button>
                            </span>
                        )}
                        {selectedBatch !== 'all' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-[#FFD700] border-2 border-black text-black font-mono font-black text-xs shadow-[1px_1px_0px_0px_#000000]">
                                <img src="/images/icon/filter.png" alt="Batch" className="size-3.5 object-contain" />
                                <span>Batch: #{selectedBatch}</span>
                                <button
                                    type="button"
                                    onClick={() => setSelectedBatch('all')}
                                    className="hover:text-rose-600 cursor-pointer ml-1"
                                >
                                    <X className="size-3.5 stroke-[3]" />
                                </button>
                            </span>
                        )}
                        {selectedStatus !== 'all' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm bg-[#00C2CB] border-2 border-black text-black font-black text-xs uppercase shadow-[1px_1px_0px_0px_#000000]">
                                <span>Status: {selectedStatus}</span>
                                <button
                                    type="button"
                                    onClick={() => setSelectedStatus('all')}
                                    className="hover:text-rose-600 cursor-pointer ml-1"
                                >
                                    <X className="size-3.5 stroke-[3]" />
                                </button>
                            </span>
                        )}
                        {searchQuery.trim().length > 0 && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm bg-neutral-100 border-2 border-black text-black font-bold text-xs shadow-[1px_1px_0px_0px_#000000]">
                                <span>Kata Kunci: "{searchQuery}"</span>
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="hover:text-rose-600 cursor-pointer ml-1"
                                >
                                    <X className="size-3.5 stroke-[3]" />
                                </button>
                            </span>
                        )}
                    </div>
                )}

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
                                    setRejectTarget({
                                        type: 'batch',
                                        ids: [...selectedIds],
                                        count: selectedIds.length,
                                    });
                                    setIsRejectModalOpen(true);
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

                {/* Setoran Table with Clean Font Layout & No Truncation Issues */}
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
                                <th className="p-3 border-r-2 border-black whitespace-nowrap">ID & Tanggal</th>
                                <th className="p-3 border-r-2 border-black whitespace-nowrap">Batch</th>
                                <th className="p-3 border-r-2 border-black whitespace-nowrap">Pengirim</th>
                                <th className="p-3 border-r-2 border-black whitespace-nowrap">Email Gmail</th>
                                <th className="p-3 border-r-2 border-black whitespace-nowrap">Password</th>
                                <th className="p-3 border-r-2 border-black whitespace-nowrap">Status</th>
                                <th className="p-3 border-r-2 border-black whitespace-nowrap">Catatan</th>
                                <th className="p-3 text-right whitespace-nowrap">Aksi</th>
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
                                    const itemBatch = item.batchId || ('BATCH-' + item.date.replace(/-/g, '').slice(2));

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

                                            {/* ID & Date */}
                                            <td className="p-3 border-r-2 border-black font-mono font-bold whitespace-nowrap">
                                                <div className="text-black font-black leading-snug">{item.id}</div>
                                                <div className="text-[10px] text-neutral-500 font-sans leading-normal">
                                                    {item.date} {item.time}
                                                </div>
                                            </td>

                                            {/* Batch Code */}
                                            <td className="p-3 border-r-2 border-black whitespace-nowrap">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedBatch(itemBatch)}
                                                    title={`Filter akun pada batch #${itemBatch}`}
                                                    className="px-2 py-0.5 rounded-xs border border-black bg-[#F5F5DC] hover:bg-[#FFD700] text-black font-mono font-black text-[10px] shadow-[1px_1px_0px_0px_#000000] transition cursor-pointer"
                                                >
                                                    #{itemBatch}
                                                </button>
                                            </td>

                                            {/* Sender / User */}
                                            <td className="p-3 border-r-2 border-black whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={item.userAvatar}
                                                        alt={item.userName}
                                                        className="size-6 rounded-full border border-black bg-[#FFD700] object-contain shrink-0"
                                                    />
                                                    <div className="min-w-0">
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedUserId(item.userId)}
                                                            className="font-bold text-black hover:underline cursor-pointer block text-left leading-snug"
                                                            title={`Filter setoran oleh ${item.userName}`}
                                                        >
                                                            {item.userName}
                                                        </button>
                                                        <div className="text-[10px] text-neutral-500 font-mono leading-tight">
                                                            {item.userEmail}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Email Gmail */}
                                            <td className="p-3 border-r-2 border-black font-mono font-bold text-black select-all whitespace-nowrap min-w-[180px]">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="leading-snug">{item.email}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => copyText(item.email, 'Email')}
                                                        title="Salin email"
                                                        className="size-5 inline-flex items-center justify-center rounded-xs hover:bg-[#00C2CB] border border-transparent hover:border-black transition cursor-pointer shrink-0"
                                                    >
                                                        <img src="/images/icon/copy.png" alt="Salin" className="size-3.5 object-contain" />
                                                    </button>
                                                </div>
                                            </td>

                                            {/* Password */}
                                            <td className="p-3 border-r-2 border-black font-mono text-neutral-800 select-all whitespace-nowrap min-w-[130px]">
                                                <div className="flex items-center justify-between gap-1.5">
                                                    <span className="leading-snug">{showPassword ? item.password : '••••••••'}</span>
                                                    <div className="flex items-center gap-1 shrink-0">
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

                                            {/* Status Badge */}
                                            <td className="p-3 border-r-2 border-black whitespace-nowrap">
                                                {item.status === 'diterima' || item.status === 'valid' ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs border-2 border-black bg-[#00C2CB] font-black text-[10px] uppercase shadow-[2px_2px_0px_0px_#000000]">
                                                        <img src="/images/icon/checklist.png" alt="Diterima" className="size-3.5 object-contain shrink-0" />
                                                        <span>Diterima</span>
                                                    </span>
                                                ) : item.status === 'ditolak' || item.status === 'invalid' ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs border-2 border-black bg-[#FF00FF] font-black text-[10px] uppercase shadow-[2px_2px_0px_0px_#000000]">
                                                        <img src="/images/icon/reject.png" alt="Ditolak" className="size-3.5 object-contain shrink-0" />
                                                        <span>Ditolak</span>
                                                    </span>
                                                ) : item.status === 'dicek' ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs border-2 border-black bg-[#F5F5DC] font-black text-[10px] uppercase shadow-[2px_2px_0px_0px_#000000]">
                                                        <img src="/images/icon/find.png" alt="Di Cek" className="size-3.5 object-contain shrink-0" />
                                                        <span>Di Cek</span>
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs border-2 border-black bg-[#FFD700] font-black text-[10px] uppercase shadow-[2px_2px_0px_0px_#000000]">
                                                        <img src="/images/icon/pending.png" alt="Menunggu" className="size-3.5 object-contain shrink-0" />
                                                        <span>Menunggu</span>
                                                    </span>
                                                )}
                                            </td>

                                            {/* Note */}
                                            <td className="p-3 border-r-2 border-black text-xs text-neutral-600 whitespace-nowrap min-w-[120px]">
                                                {item.note || '-'}
                                            </td>

                                            {/* Actions */}
                                            <td className="p-3 text-right whitespace-nowrap">
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
                                                                    setRejectTarget({
                                                                        type: 'single',
                                                                        item,
                                                                    });
                                                                    setIsRejectModalOpen(true);
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

            {/* Modal Ekspor TXT dengan Filter Kustom */}
            <AdminExportModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                setoranList={setoranList}
                selectedIds={selectedIds}
                initialStatus={selectedStatus}
                initialUserId={selectedUserId}
                initialBatch={selectedBatch}
            />

            {/* Modal Alasan Penolakan Akun (Opsional) */}
            <AdminRejectModal
                isOpen={isRejectModalOpen}
                onClose={() => {
                    setIsRejectModalOpen(false);
                    setRejectTarget(null);
                }}
                target={rejectTarget}
                onConfirm={(reason) => {
                    if (!rejectTarget) return;
                    if (rejectTarget.type === 'single') {
                        onRejectSetoran(rejectTarget.item.id, reason);
                    } else {
                        onBatchReject(rejectTarget.ids, reason);
                        setSelectedIds([]);
                    }
                }}
            />
        </div>
    );
}
