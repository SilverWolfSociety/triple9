import { useState, useRef, useEffect } from 'react';
import {
    Bell,
    CheckCheck,
    Trash2,
    X,
    ChevronRight,
    BellOff,
    RotateCcw,
} from 'lucide-react';
import type { NotificationItem } from '../types';

interface NotificationDropdownProps {
    onNavigate?: (navId: string) => void;
}

const initialNotifications: NotificationItem[] = [
    {
        id: 'notif-1',
        title: 'Reward Stor Diterima',
        message: 'Akun google.sec***@gmail.com (PW: hehe1122) berhasil disetujui. Reward +Rp4.500 telah masuk ke saldo.',
        time: '5 menit lalu',
        type: 'reward',
        read: false,
        actionNav: 'riwayat',
    },
    {
        id: 'notif-2',
        title: 'Penarikan Sukses Diproses',
        message: 'Penarikan saldo Rp50.000 ke DANA (0812****8990) telah dikirim oleh admin verifikator.',
        time: '35 menit lalu',
        type: 'wallet',
        read: false,
        actionNav: 'saldo',
    },
    {
        id: 'notif-3',
        title: 'Event Bonus Rate Hehe1122! 🔥',
        message: 'Rate stor untuk jalur hehe1122 naik menjadi Rp4.800 per akun sampai pukul 23:59 WIB hari ini.',
        time: '2 jam lalu',
        type: 'bonus',
        read: false,
        actionNav: 'stor',
    },
    {
        id: 'notif-4',
        title: 'Batch Stor Sedang Dicek',
        message: '5 akun pada batch #TR-9921 sedang dalam proses pengecekan kualitas oleh tim audit.',
        time: '4 jam lalu',
        type: 'system',
        read: true,
        actionNav: 'riwayat',
    },
    {
        id: 'notif-5',
        title: 'Tiket Bantuan Dibalas',
        message: 'Admin telah membalas tiket kendala verifikasi Anda di menu Laporan Saya.',
        time: '1 hari lalu',
        type: 'ticket',
        read: true,
        actionNav: 'laporan',
    },
];

export function NotificationDropdown({ onNavigate }: NotificationDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
    const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter((n) => !n.read).length;

    // Filter notifications based on selected tab
    const filteredNotifications =
        activeTab === 'unread'
            ? notifications.filter((n) => !n.read)
            : notifications;

    // Handle outside click to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((item) => ({ ...item, read: true }))
        );
    };

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((item) => (item.id === id ? { ...item, read: true } : item))
        );
    };

    const deleteNotification = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setNotifications((prev) => prev.filter((item) => item.id !== id));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const resetNotifications = () => {
        setNotifications(initialNotifications);
    };

    const handleItemClick = (item: NotificationItem) => {
        markAsRead(item.id);
        if (item.actionNav && onNavigate) {
            onNavigate(item.actionNav);
            setIsOpen(false);
        }
    };

    const renderIcon = (type: NotificationItem['type']) => {
        switch (type) {
            case 'reward':
                return (
                    <div className="flex shrink-0 items-center justify-center pt-0.5">
                        <img src="/images/icon/checklist.png" alt="Reward" className="h-5 w-5 object-contain shrink-0" />
                    </div>
                );
            case 'wallet':
                return (
                    <div className="flex shrink-0 items-center justify-center pt-0.5">
                        <img src="/images/icon/wallet.png" alt="Wallet" className="h-5 w-5 object-contain shrink-0" />
                    </div>
                );
            case 'bonus':
                return (
                    <div className="flex shrink-0 items-center justify-center pt-0.5">
                        <img src="/images/icon/fire.png" alt="Bonus" className="h-5 w-5 object-contain shrink-0" />
                    </div>
                );
            case 'ticket':
                return (
                    <div className="flex shrink-0 items-center justify-center pt-0.5">
                        <img src="/images/icon/ticket.png" alt="Ticket" className="h-5 w-5 object-contain shrink-0" />
                    </div>
                );
            case 'system':
            default:
                return (
                    <div className="flex shrink-0 items-center justify-center pt-0.5">
                        <img src="/images/icon/find.png" alt="System" className="h-5 w-5 object-contain shrink-0" />
                    </div>
                );
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition border border-neutral-200/80 dark:border-neutral-800 cursor-pointer"
                title="Notifikasi"
                aria-label="Notifikasi sistem"
                aria-expanded={isOpen}
            >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-neutral-900" />
                )}
            </button>

            {/* Dropdown Menu Modal */}
            {isOpen && (
                <div className="fixed left-3 right-3 top-16 sm:left-auto sm:right-0 sm:top-10 sm:w-[380px] z-50 rounded-xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-200/80 dark:border-neutral-800 animate-in fade-in zoom-in-95 overflow-hidden">
                    {/* Header */}
                    <div className="p-3.5 border-b border-neutral-100 dark:border-neutral-800">
                        <div className="flex items-center justify-between mb-2.5">
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                    Notifikasi
                                </h3>
                                {unreadCount > 0 ? (
                                    <span className="text-xs font-medium text-red-600 dark:text-red-400">
                                        {unreadCount} baru
                                    </span>
                                ) : (
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                        Semua terbaca
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-1">
                                {unreadCount > 0 && (
                                    <button
                                        type="button"
                                        onClick={markAllAsRead}
                                        className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-blue-50 dark:hover:bg-blue-950/50 transition cursor-pointer"
                                        title="Tandai semua telah dibaca"
                                    >
                                        <CheckCheck className="h-3 w-3" />
                                        <span>Tandai dibaca</span>
                                    </button>
                                )}

                                {notifications.length > 0 ? (
                                    <button
                                        type="button"
                                        onClick={clearAll}
                                        className="p-1 rounded-md text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                                        title="Hapus semua notifikasi"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={resetNotifications}
                                        className="p-1 rounded-md text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                                        title="Muat ulang notifikasi demo"
                                    >
                                        <RotateCcw className="h-3.5 w-3.5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Segmented Filter Tabs */}
                        <div className="flex items-center rounded-lg bg-slate-100 dark:bg-zinc-800/60 p-0.5 text-xs">
                            <button
                                type="button"
                                onClick={() => setActiveTab('all')}
                                className={`flex-1 py-1 px-2.5 rounded-md font-medium transition cursor-pointer ${activeTab === 'all'
                                        ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-slate-100 shadow-xs'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                    }`}
                            >
                                Semua ({notifications.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('unread')}
                                className={`flex-1 py-1 px-2.5 rounded-md font-medium transition cursor-pointer ${activeTab === 'unread'
                                        ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-slate-100 shadow-xs'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                    }`}
                            >
                                Belum Dibaca ({unreadCount})
                            </button>
                        </div>
                    </div>

                    {/* Notification List Body */}
                    <div className="max-h-[340px] overflow-y-auto divide-y divide-slate-100 dark:divide-zinc-800/60 no-scrollbar">
                        {filteredNotifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800/80 text-slate-400 dark:text-slate-500 mb-2.5">
                                    <BellOff className="h-5 w-5" />
                                </div>
                                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                    {activeTab === 'unread'
                                        ? 'Tidak ada notifikasi belum dibaca'
                                        : 'Tidak ada notifikasi'}
                                </p>
                                <p className="text-[11px] text-slate-400 dark:text-slate-500 max-w-[220px] mt-1 leading-relaxed">
                                    {activeTab === 'unread'
                                        ? 'Semua notifikasi Anda sudah dibaca.'
                                        : 'Update reward stor, penarikan, dan bonus akan tampil di sini.'}
                                </p>
                                {notifications.length === 0 && (
                                    <button
                                        type="button"
                                        onClick={resetNotifications}
                                        className="mt-3 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                                    >
                                        <RotateCcw className="h-3 w-3" />
                                        <span>Muat Contoh Notifikasi</span>
                                    </button>
                                )}
                            </div>
                        ) : (
                            filteredNotifications.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleItemClick(item)}
                                    className="group relative flex items-start gap-3 p-3.5 transition cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800/40"
                                >
                                    {renderIcon(item.type)}

                                    <div className="flex-1 min-w-0 pr-4">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            <p
                                                className={`text-xs truncate ${!item.read
                                                        ? 'font-semibold text-slate-900 dark:text-slate-100'
                                                        : 'font-medium text-slate-700 dark:text-slate-300'
                                                    }`}
                                            >
                                                {item.title}
                                            </p>
                                            {!item.read && (
                                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                                            )}
                                        </div>

                                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                                            {item.message}
                                        </p>

                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className="text-[10px] text-slate-400 dark:text-slate-500">
                                                {item.time}
                                            </span>
                                            {item.actionNav && (
                                                <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                                                    Buka
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Delete single notification button */}
                                    <button
                                        type="button"
                                        onClick={(e) => deleteNotification(e, item.id)}
                                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 rounded transition absolute top-2.5 right-2.5 cursor-pointer"
                                        title="Hapus notifikasi"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-slate-100 dark:border-zinc-800/80 bg-slate-50/60 dark:bg-zinc-900/40">
                        <button
                            type="button"
                            onClick={() => {
                                onNavigate?.('riwayat');
                                setIsOpen(false);
                            }}
                            className="w-full py-2.5 px-4 text-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-slate-100/60 dark:hover:bg-zinc-800/50 transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                            <span>Lihat Semua Riwayat Aktivitas</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
