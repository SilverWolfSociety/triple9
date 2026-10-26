import { useEffect, useMemo, useRef, useState } from 'react';
import {
    Check,
    ChevronDown,
    Copy,
    Download,
    Filter,
    X,
} from 'lucide-react';
import { toast } from 'sonner';
import type { AdminSetoranItem, SetoranStatus } from '../types';

interface AdminExportModalProps {
    isOpen: boolean;
    onClose: () => void;
    setoranList: AdminSetoranItem[];
    selectedIds?: string[];
    initialStatus?: 'all' | SetoranStatus;
    initialUserId?: 'all' | number;
    initialBatch?: 'all' | string;
}

type ExportFormat = 'email|pass' | 'email:pass' | 'email,pass' | 'email_only';

export function AdminExportModal({
    isOpen,
    onClose,
    setoranList,
    selectedIds = [],
    initialStatus = 'all',
    initialUserId = 'all',
    initialBatch = 'all',
}: AdminExportModalProps) {
    const [filterStatus, setFilterStatus] = useState<'all' | SetoranStatus>(initialStatus);
    const [filterUserId, setFilterUserId] = useState<'all' | number>(initialUserId);
    const [filterBatch, setFilterBatch] = useState<'all' | string>(initialBatch);
    const [useCheckedOnly, setUseCheckedOnly] = useState<boolean>(selectedIds.length > 0);
    const [format, setFormat] = useState<ExportFormat>('email|pass');
    const [includeHeader, setIncludeHeader] = useState<boolean>(false);

    // Custom Dropdown Open States and Refs
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isBatchDropdownOpen, setIsBatchDropdownOpen] = useState(false);
    const statusDropdownRef = useRef<HTMLDivElement>(null);
    const userDropdownRef = useRef<HTMLDivElement>(null);
    const batchDropdownRef = useRef<HTMLDivElement>(null);

    // Sync when modal opens or initial props change
    useEffect(() => {
        if (isOpen) {
            setFilterStatus(initialStatus);
            setFilterUserId(initialUserId);
            setFilterBatch(initialBatch);
            setUseCheckedOnly(selectedIds.length > 0);
            setIsStatusDropdownOpen(false);
            setIsUserDropdownOpen(false);
            setIsBatchDropdownOpen(false);
        }
    }, [isOpen, initialStatus, initialUserId, initialBatch, selectedIds]);

    // Outside click listener
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                statusDropdownRef.current &&
                !statusDropdownRef.current.contains(event.target as Node)
            ) {
                setIsStatusDropdownOpen(false);
            }
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

    // Extract unique users
    const uniqueUsers = useMemo(() => {
        const map = new Map<number, { id: number; name: string; count: number }>();
        setoranList.forEach((item) => {
            const current = map.get(item.userId);
            if (current) {
                current.count += 1;
            } else {
                map.set(item.userId, { id: item.userId, name: item.userName, count: 1 });
            }
        });
        return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, [setoranList]);

    // Extract unique batches
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

    // Matched items according to filters
    const exportItems = useMemo(() => {
        if (useCheckedOnly && selectedIds.length > 0) {
            return setoranList.filter((item) => selectedIds.includes(item.id));
        }

        return setoranList.filter((item) => {
            // Status match
            const matchesStatus =
                filterStatus === 'all'
                    ? true
                    : filterStatus === 'diterima'
                        ? item.status === 'diterima' || item.status === 'valid'
                        : filterStatus === 'ditolak'
                            ? item.status === 'ditolak' || item.status === 'invalid'
                            : item.status === filterStatus;

            // User match
            const matchesUser = filterUserId === 'all' ? true : item.userId === filterUserId;

            // Batch match
            const itemBatch = item.batchId || ('BATCH-' + item.date.replace(/-/g, '').slice(2));
            const matchesBatch = filterBatch === 'all' ? true : itemBatch === filterBatch;

            return matchesStatus && matchesUser && matchesBatch;
        });
    }, [setoranList, selectedIds, useCheckedOnly, filterStatus, filterUserId, filterBatch]);

    // Generate output text lines
    const generatedContent = useMemo(() => {
        const lines = exportItems.map((item) => {
            const email = item.email.trim();
            const pass = item.password.trim();

            switch (format) {
                case 'email|pass':
                    return `${email}|${pass}`;
                case 'email:pass':
                    return `${email}:${pass}`;
                case 'email,pass':
                    return `${email},${pass}`;
                case 'email_only':
                    return email;
                default:
                    return `${email}|${pass}`;
            }
        });

        if (includeHeader) {
            const todayStr = new Date().toISOString().slice(0, 10);
            const header = [
                `# TRIPLE9 SETORAN EXPORT`,
                `# Tanggal: ${todayStr}`,
                `# Total Akun: ${lines.length}`,
                `# Status Filter: ${filterStatus.toUpperCase()}`,
                `# Format: ${format}`,
                `# ----------------------------------------`,
            ].join('\n');
            return header + '\n' + lines.join('\n');
        }

        return lines.join('\n');
    }, [exportItems, format, includeHeader, filterStatus]);

    const statusOptions: { id: 'all' | SetoranStatus; label: string; icon: string }[] = [
        { id: 'all', label: 'Semua Status', icon: '/images/icon/checklist.png' },
        { id: 'pending', label: 'Menunggu', icon: '/images/icon/pending.png' },
        { id: 'dicek', label: 'Sedang Di Cek', icon: '/images/icon/find.png' },
        { id: 'diterima', label: 'Diterima / Valid', icon: '/images/icon/checklist.png' },
        { id: 'ditolak', label: 'Ditolak / Invalid', icon: '/images/icon/reject.png' },
    ];

    const selectedStatusObj = statusOptions.find((s) => s.id === filterStatus) || statusOptions[0];
    const selectedUserObj = filterUserId !== 'all' ? uniqueUsers.find((u) => u.id === filterUserId) : null;
    const selectedBatchObj = filterBatch !== 'all' ? uniqueBatches.find((b) => b.batch === filterBatch) : null;

    if (!isOpen) return null;

    const handleCopy = () => {
        if (exportItems.length === 0) {
            toast.error('Tidak ada akun yang sesuai filter untuk disalin.');
            return;
        }
        navigator.clipboard.writeText(generatedContent);
        toast.success(`${exportItems.length} akun berhasil disalin`);
    };

    const handleDownload = () => {
        if (exportItems.length === 0) {
            toast.error('Tidak ada akun yang sesuai filter untuk diekspor.');
            return;
        }

        const blob = new Blob([generatedContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const dateStr = new Date().toISOString().slice(0, 10);
        const batchSuffix = filterBatch !== 'all' ? `_${filterBatch}` : '';
        const statusSuffix = filterStatus !== 'all' ? `_${filterStatus}` : '';
        a.download = `triple9_export${statusSuffix}${batchSuffix}_${dateStr}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success(`File TXT berhasil diunduh (${exportItems.length} akun).`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-2xl bg-white border-[3px] border-black rounded-md shadow-[8px_8px_0px_0px_#000000] flex flex-col max-h-[92vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b-[3px] border-black bg-[#FFD700]">
                    <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-sm border-2 border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_0px_#000000]">
                            <img src="/images/icon/download.png" alt="Download" className="size-5 object-contain" />
                        </div>
                        <div>
                            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-black">
                                Ekspor Setoran TXT
                            </h3>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="size-8 rounded-sm border-2 border-black bg-white hover:bg-neutral-100 flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px]"
                    >
                        <X className="size-4.5 text-black stroke-[3]" />
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-5 overflow-y-auto no-scrollbar space-y-5 flex-1">
                    {/* Option: Gunakan Tercentang vs Filter */}
                    {selectedIds.length > 0 && (
                        <div className="p-3 bg-[#00C2CB]/20 border-2 border-black rounded-sm flex items-center justify-between gap-3 shadow-[2px_2px_0px_0px_#000000]">
                            <div>
                                <span className="text-xs font-black uppercase tracking-wider text-black block">
                                    {selectedIds.length} Akun Sedang Dicentang di Tabel
                                </span>
                                <span className="text-[11px] font-bold text-neutral-700">
                                    Anda dapat mengekspor akun yang dicentang saja atau menggunakan filter bebas di bawah.
                                </span>
                            </div>
                            <label className="inline-flex items-center gap-2 cursor-pointer font-black text-xs uppercase shrink-0">
                                <input
                                    type="checkbox"
                                    checked={useCheckedOnly}
                                    onChange={(e) => setUseCheckedOnly(e.target.checked)}
                                    className="size-4 border-2 border-black rounded-none cursor-pointer"
                                />
                                <span>Centang Saja</span>
                            </label>
                        </div>
                    )}

                    {/* Filter Grid */}
                    <div className={`space-y-4 ${useCheckedOnly ? 'opacity-40 pointer-events-none' : ''}`}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-30">
                            {/* 1. Status Filter */}
                            <div className="space-y-1">
                                <div className="relative" ref={statusDropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsStatusDropdownOpen(!isStatusDropdownOpen);
                                            setIsUserDropdownOpen(false);
                                            setIsBatchDropdownOpen(false);
                                        }}
                                        className="w-full h-[40px] px-3 border-2 border-black rounded-sm bg-white hover:bg-[#F5F5DC] flex items-center justify-between text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000000] transition cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2 truncate pr-2">
                                            <img src={selectedStatusObj.icon} alt="" className="size-3.5 object-contain shrink-0" />
                                            <span className="truncate font-black">{selectedStatusObj.label}</span>
                                        </div>
                                        <ChevronDown
                                            className={`size-3.5 text-black stroke-[3] shrink-0 transition-transform ${isStatusDropdownOpen ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {isStatusDropdownOpen && (
                                        <div className="absolute left-0 top-full mt-1.5 w-full rounded-sm bg-white border-2 border-black p-1 shadow-[4px_4px_0px_0px_#000000] z-40 text-xs">
                                            {statusOptions.map((opt) => {
                                                const isSelected = filterStatus === opt.id;
                                                return (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setFilterStatus(opt.id);
                                                            setIsStatusDropdownOpen(false);
                                                        }}
                                                        className={`w-full text-left px-3 py-2 rounded-xs font-black transition cursor-pointer flex items-center gap-2 ${isSelected
                                                            ? 'bg-[#00C2CB] text-black'
                                                            : 'text-black hover:bg-[#F5F5DC]'
                                                            }`}
                                                    >
                                                        <img src={opt.icon} alt="" className="size-3.5 object-contain shrink-0" />
                                                        <span className="truncate">{opt.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 2. User Filter */}
                            <div className="space-y-1">
                                <div className="relative" ref={userDropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsUserDropdownOpen(!isUserDropdownOpen);
                                            setIsStatusDropdownOpen(false);
                                            setIsBatchDropdownOpen(false);
                                        }}
                                        className="w-full h-[40px] px-3 border-2 border-black rounded-sm bg-white hover:bg-[#F5F5DC] flex items-center justify-between text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000000] transition cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2 truncate pr-2">
                                            <img src="/images/icon/person_yellow.png" alt="" className="size-3.5 object-contain shrink-0" />
                                            <span className="truncate font-black">
                                                {filterUserId === 'all'
                                                    ? `Semua Pengguna (${setoranList.length})`
                                                    : `${selectedUserObj?.name} (${selectedUserObj?.count} akun)`}
                                            </span>
                                        </div>
                                        <ChevronDown
                                            className={`size-3.5 text-black stroke-[3] shrink-0 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {isUserDropdownOpen && (
                                        <div className="absolute left-0 top-full mt-1.5 w-full max-h-52 overflow-y-auto no-scrollbar rounded-sm bg-white border-2 border-black p-1 shadow-[4px_4px_0px_0px_#000000] z-40 text-xs">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFilterUserId('all');
                                                    setIsUserDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 rounded-xs font-black transition cursor-pointer flex items-center justify-between ${filterUserId === 'all'
                                                    ? 'bg-[#00C2CB] text-black'
                                                    : 'text-black hover:bg-[#F5F5DC]'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <img src="/images/icon/person_yellow.png" alt="" className="size-3.5 object-contain shrink-0" />
                                                    <span>Semua Pengguna</span>
                                                </div>
                                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs border border-black bg-white text-black font-black">
                                                    {setoranList.length} akun
                                                </span>
                                            </button>
                                            {uniqueUsers.map((u) => {
                                                const isSelected = filterUserId === u.id;
                                                return (
                                                    <button
                                                        key={u.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setFilterUserId(u.id);
                                                            setIsUserDropdownOpen(false);
                                                        }}
                                                        className={`w-full text-left px-3 py-2 rounded-xs font-black transition cursor-pointer flex items-center justify-between gap-2 ${isSelected
                                                            ? 'bg-[#00C2CB] text-black'
                                                            : 'text-black hover:bg-[#F5F5DC]'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-2 truncate">
                                                            <img src="/images/icon/person_yellow.png" alt="" className="size-3.5 object-contain shrink-0" />
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

                            {/* 3. Batch Filter */}
                            <div className="space-y-1">
                                <div className="relative" ref={batchDropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsBatchDropdownOpen(!isBatchDropdownOpen);
                                            setIsStatusDropdownOpen(false);
                                            setIsUserDropdownOpen(false);
                                        }}
                                        className="w-full h-[40px] px-3 border-2 border-black rounded-sm bg-white hover:bg-[#F5F5DC] flex items-center justify-between text-xs font-mono font-bold text-black shadow-[2px_2px_0px_0px_#000000] transition cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2 truncate pr-2 font-mono">
                                            <img src="/images/icon/filter.png" alt="" className="size-3.5 object-contain shrink-0" />
                                            <span className="truncate font-black">
                                                {filterBatch === 'all'
                                                    ? `Semua Batch (${uniqueBatches.length})`
                                                    : `#${filterBatch} (${selectedBatchObj?.count || 0} akun)`}
                                            </span>
                                        </div>
                                        <ChevronDown
                                            className={`size-3.5 text-black stroke-[3] shrink-0 transition-transform ${isBatchDropdownOpen ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {isBatchDropdownOpen && (
                                        <div className="absolute left-0 top-full mt-1.5 w-full max-h-52 overflow-y-auto no-scrollbar rounded-sm bg-white border-2 border-black p-1 shadow-[4px_4px_0px_0px_#000000] z-40 text-xs">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFilterBatch('all');
                                                    setIsBatchDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 rounded-xs font-black font-mono transition cursor-pointer flex items-center justify-between ${filterBatch === 'all'
                                                    ? 'bg-[#00C2CB] text-black'
                                                    : 'text-black hover:bg-[#F5F5DC]'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <img src="/images/icon/filter.png" alt="" className="size-3.5 object-contain shrink-0" />
                                                    <span>Semua Batch</span>
                                                </div>
                                                <span className="text-[10px] px-1.5 py-0.5 rounded-xs border border-black bg-white text-black font-black">
                                                    {uniqueBatches.length} batch
                                                </span>
                                            </button>
                                            {uniqueBatches.map((b) => {
                                                const isSelected = filterBatch === b.batch;
                                                return (
                                                    <button
                                                        key={b.batch}
                                                        type="button"
                                                        onClick={() => {
                                                            setFilterBatch(b.batch);
                                                            setIsBatchDropdownOpen(false);
                                                        }}
                                                        className={`w-full text-left px-3 py-2 rounded-xs font-black font-mono transition cursor-pointer flex items-center justify-between gap-2 ${isSelected
                                                            ? 'bg-[#00C2CB] text-black'
                                                            : 'text-black hover:bg-[#F5F5DC]'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-2 truncate font-mono">
                                                            <img src="/images/icon/filter.png" alt="" className="size-3.5 object-contain shrink-0" />
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
                        </div>
                    </div>

                    {/* Format Options */}
                    <div className="space-y-2">
                        <label className="block text-[11px] font-black uppercase tracking-wider text-black">
                            Format Baris TXT
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <label
                                className={`flex items-center gap-2 p-2.5 border-2 border-black rounded-sm cursor-pointer transition ${format === 'email|pass'
                                    ? 'bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000]'
                                    : 'bg-white hover:bg-[#F5F5DC]'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="export_format"
                                    checked={format === 'email|pass'}
                                    onChange={() => setFormat('email|pass')}
                                    className="size-3.5 border-2 border-black cursor-pointer"
                                />
                                <div>
                                    <div className="font-mono font-bold text-black">email|password</div>
                                    <div className="text-[10px] text-neutral-600">Format default standar Triple9</div>
                                </div>
                            </label>

                            <label
                                className={`flex items-center gap-2 p-2.5 border-2 border-black rounded-sm cursor-pointer transition ${format === 'email:pass'
                                    ? 'bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000]'
                                    : 'bg-white hover:bg-[#F5F5DC]'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="export_format"
                                    checked={format === 'email:pass'}
                                    onChange={() => setFormat('email:pass')}
                                    className="size-3.5 border-2 border-black cursor-pointer"
                                />
                                <div>
                                    <div className="font-mono font-bold text-black">email:password</div>
                                    <div className="text-[10px] text-neutral-600">Separator titik dua (:)</div>
                                </div>
                            </label>

                            <label
                                className={`flex items-center gap-2 p-2.5 border-2 border-black rounded-sm cursor-pointer transition ${format === 'email,pass'
                                    ? 'bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000]'
                                    : 'bg-white hover:bg-[#F5F5DC]'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="export_format"
                                    checked={format === 'email,pass'}
                                    onChange={() => setFormat('email,pass')}
                                    className="size-3.5 border-2 border-black cursor-pointer"
                                />
                                <div>
                                    <div className="font-mono font-bold text-black">email,password</div>
                                    <div className="text-[10px] text-neutral-600">Format CSV (separator koma)</div>
                                </div>
                            </label>

                            <label
                                className={`flex items-center gap-2 p-2.5 border-2 border-black rounded-sm cursor-pointer transition ${format === 'email_only'
                                    ? 'bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000]'
                                    : 'bg-white hover:bg-[#F5F5DC]'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="export_format"
                                    checked={format === 'email_only'}
                                    onChange={() => setFormat('email_only')}
                                    className="size-3.5 border-2 border-black cursor-pointer"
                                />
                                <div>
                                    <div className="font-mono font-bold text-black">email</div>
                                    <div className="text-[10px] text-neutral-600">Hanya daftar email saja</div>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Extra options */}
                    <div className="flex items-center justify-between pt-1 border-t border-black/20">
                        <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-black">
                            <input
                                type="checkbox"
                                checked={includeHeader}
                                onChange={(e) => setIncludeHeader(e.target.checked)}
                                className="size-4 border-2 border-black rounded-none cursor-pointer"
                            />
                            <span>Sertakan header informasi & tanggal di awal file TXT</span>
                        </label>
                    </div>

                    {/* Live Preview Box */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-black uppercase">
                            <span className="text-black flex items-center gap-1.5">
                                <img src="/images/icon/txt-file.png" alt="TXT" className="size-4 object-contain" />
                                <span>Preview Hasil Export</span>
                            </span>
                            <span className="font-mono bg-[#00C2CB] px-2 py-0.5 border border-black rounded-xs">
                                {exportItems.length} Akun Terpilih
                            </span>
                        </div>
                        <div className="bg-neutral-900 border-2 border-black rounded-sm p-3 font-mono text-[11px] text-emerald-400 max-h-36 overflow-y-auto no-scrollbar select-all">
                            {exportItems.length === 0 ? (
                                <span className="text-neutral-500 italic">
                                    Tidak ada akun yang sesuai kriteria filter saat ini.
                                </span>
                            ) : (
                                generatedContent.split('\n').slice(0, 10).join('\n') +
                                (generatedContent.split('\n').length > 10
                                    ? `\n... (+${generatedContent.split('\n').length - 10} baris lainnya)`
                                    : '')
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-5 py-3.5 border-t-[3px] border-black bg-[#F5F5DC] flex flex-wrap items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-sm border-2 border-black bg-white hover:bg-neutral-100 text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
                    >
                        Batal
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleCopy}
                            disabled={exportItems.length === 0}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border-2 border-black bg-[#FFD700] hover:bg-[#ffc800] disabled:opacity-40 disabled:cursor-not-allowed text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
                        >
                            <img src="/images/icon/copy.png" alt="Salin" className="size-4 object-contain" />
                            <span>Salin</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleDownload}
                            disabled={exportItems.length === 0}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border-2 border-black bg-[#00C2CB] hover:bg-[#00a8b0] disabled:opacity-40 disabled:cursor-not-allowed text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
                        >
                            <img src="/images/icon/download.png" alt="Unduh" className="size-4 object-contain" />
                            <span>Unduh File TXT</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
