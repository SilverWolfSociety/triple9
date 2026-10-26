import { useState, useRef, useEffect } from 'react';
import {
    Bell,
    X,
    ChevronRight,
    RotateCcw,
} from 'lucide-react';
import type { NotificationItem } from '../types';

interface NotificationDropdownProps {
    onNavigate?: (navId: string) => void;
}

const initialNotifications: NotificationItem[] = [];

export function NotificationDropdown({ onNavigate }: NotificationDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
    const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
        try {
            const saved = localStorage.getItem('triple9_user_notifications');
            if (saved) return JSON.parse(saved);
        } catch {
            // ignore
        }
        return initialNotifications;
    });
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter((n) => !n.read).length;

    // Listen for notification updates from admin actions or other tabs
    useEffect(() => {
        const syncNotifications = () => {
            try {
                const saved = localStorage.getItem('triple9_user_notifications');
                if (saved) setNotifications(JSON.parse(saved));
            } catch {
                // ignore
            }
        };
        window.addEventListener('storage', syncNotifications);
        window.addEventListener('triple9_notifications_updated', syncNotifications);
        return () => {
            window.removeEventListener('storage', syncNotifications);
            window.removeEventListener('triple9_notifications_updated', syncNotifications);
        };
    }, []);

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

    const updateAndPersist = (updater: (prev: NotificationItem[]) => NotificationItem[]) => {
        setNotifications((prev) => {
            const next = updater(prev);
            try {
                localStorage.setItem('triple9_user_notifications', JSON.stringify(next));
            } catch {
                // ignore
            }
            return next;
        });
    };

    const markAllAsRead = () => {
        updateAndPersist((prev) =>
            prev.map((item) => ({ ...item, read: true }))
        );
    };

    const markAsRead = (id: string) => {
        updateAndPersist((prev) =>
            prev.map((item) => (item.id === id ? { ...item, read: true } : item))
        );
    };

    const deleteNotification = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        updateAndPersist((prev) => prev.filter((item) => item.id !== id));
    };

    const clearAll = () => {
        updateAndPersist(() => []);
    };

    const resetNotifications = () => {
        updateAndPersist(() => initialNotifications);
    };

    const handleItemClick = (item: NotificationItem) => {
        markAsRead(item.id);
        if (item.actionNav && onNavigate) {
            onNavigate(item.actionNav);
            setIsOpen(false);
        }
    };

    const renderIcon = (type: NotificationItem['type']) => {
        const iconBg =
            type === 'reward'
                ? 'bg-[#00C2CB]'
                : type === 'bonus'
                    ? 'bg-[#FFD700]'
                    : type === 'ticket'
                        ? 'bg-[#FF00FF]'
                        : type === 'wallet'
                            ? 'bg-[#00C2CB]'
                            : 'bg-[#F5F5DC]';

        let iconSrc = '/images/icon/find.png';
        let altText = 'System';
        if (type === 'reward') {
            iconSrc = '/images/icon/checklist.png';
            altText = 'Reward';
        } else if (type === 'wallet') {
            iconSrc = '/images/icon/wallet.png';
            altText = 'Wallet';
        } else if (type === 'bonus') {
            iconSrc = '/images/icon/fire.png';
            altText = 'Bonus';
        } else if (type === 'ticket') {
            iconSrc = '/images/icon/ticket.png';
            altText = 'Ticket';
        }

        return (
            <div className={`flex shrink-0 size-8 items-center justify-center rounded-sm border-2 border-black ${iconBg} shadow-[2px_2px_0px_0px_#000000]`}>
                <img src={iconSrc} alt={altText} className="h-4.5 w-4.5 object-contain shrink-0" />
            </div>
        );
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`relative flex h-9 w-9 items-center justify-center rounded-md border-2 border-black ${isOpen
                    ? 'bg-[#FFD700] translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_#000000]'
                    : 'bg-white hover:bg-[#F5F5DC] shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000]'
                    } active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer text-black`}
                title="Notifikasi"
                aria-label="Notifikasi sistem"
                aria-expanded={isOpen}
            >
                <Bell className="h-4.5 w-4.5 text-black stroke-[2.5]" />
                {unreadCount > 0 && (
                    <span
                        className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-[#FF00FF] text-white text-[9px] font-black border-2 border-black shadow-[1px_1px_0px_0px_#000000] flex items-center justify-center font-mono leading-none"
                        title={`${unreadCount} notifikasi baru`}
                    >
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Menu Modal */}
            {isOpen && (
                <div className="fixed left-3 right-3 top-20 sm:left-auto sm:right-0 sm:top-12 sm:w-[390px] z-50 rounded-md bg-white shadow-[8px_8px_0px_0px_#000000] border-[3px] border-black animate-in fade-in zoom-in-95 overflow-hidden text-black">
                    {/* Header */}
                    <div className="p-3.5 border-b-[3px] border-black bg-[#F5F5DC]">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                    Notifikasi
                                </h3>
                                {unreadCount > 0 ? (
                                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#FF00FF] text-white border-2 border-black shadow-[2px_2px_0px_0px_#000000] rounded-sm">
                                        {unreadCount} baru
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#00C2CB] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000000] rounded-sm">
                                        Terbaca
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-1.5">
                                {unreadCount > 0 && (
                                    <button
                                        type="button"
                                        onClick={markAllAsRead}
                                        className="text-[10px] font-black uppercase tracking-wider bg-[#00C2CB] hover:bg-[#00a8b0] text-black inline-flex items-center gap-1 px-2 py-1 rounded-sm border-2 border-black shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000000] transition-all cursor-pointer"
                                        title="Tandai semua telah dibaca"
                                    >
                                        <img
                                            src="/images/icon/checklist_notif.png"
                                            alt="Tandai dibaca"
                                            className="h-3.5 w-3.5 object-contain shrink-0"
                                        />
                                        <span>Tandai dibaca</span>
                                    </button>
                                )}

                                {notifications.length > 0 ? (
                                    <button
                                        type="button"
                                        onClick={clearAll}
                                        className="p-1 rounded-sm border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_#000000] hover:bg-[#FF00FF] hover:text-white transition-all cursor-pointer"
                                        title="Hapus semua notifikasi"
                                    >
                                        <img
                                            src="/images/icon/trash.png"
                                            alt="Hapus semua notifikasi"
                                            className="h-3.5 w-3.5 object-contain shrink-0"
                                        />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={resetNotifications}
                                        className="p-1 rounded-sm border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_#000000] hover:bg-[#00C2CB] hover:text-black transition-all cursor-pointer"
                                        title="Muat ulang notifikasi demo"
                                    >
                                        <RotateCcw className="h-3.5 w-3.5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Segmented Filter Tabs in Neo-Brutalist 2-button row */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                                type="button"
                                onClick={() => setActiveTab('all')}
                                className={`py-1.5 px-3 rounded-sm text-xs font-black uppercase tracking-wide border-2 border-black transition-all cursor-pointer ${activeTab === 'all'
                                    ? 'bg-[#FFD700] text-black shadow-[2px_2px_0px_0px_#000000] translate-x-[1px] translate-y-[1px]'
                                    : 'bg-white text-black hover:bg-[#F5F5DC] shadow-[2px_2px_0px_0px_#000000]'
                                    }`}
                            >
                                Semua ({notifications.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('unread')}
                                className={`py-1.5 px-3 rounded-sm text-xs font-black uppercase tracking-wide border-2 border-black transition-all cursor-pointer ${activeTab === 'unread'
                                    ? 'bg-[#FFD700] text-black shadow-[2px_2px_0px_0px_#000000] translate-x-[1px] translate-y-[1px]'
                                    : 'bg-white text-black hover:bg-[#F5F5DC] shadow-[2px_2px_0px_0px_#000000]'
                                    }`}
                            >
                                Belum Dibaca ({unreadCount})
                            </button>
                        </div>
                    </div>

                    {/* Notification List Body */}
                    <div className="max-h-[340px] overflow-y-auto divide-y-2 divide-black no-scrollbar bg-white">
                        {filteredNotifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-sm border-2 border-black bg-[#FFD700] text-black shadow-[3px_3px_0px_0px_#000000] mb-2.5">
                                    <img
                                        src="/images/icon/notification_disabled.png"
                                        alt="Tidak ada notifikasi"
                                        className="h-7 w-7 object-contain"
                                    />
                                </div>
                                <p className="text-xs font-black uppercase text-black">
                                    {activeTab === 'unread'
                                        ? 'Tidak ada notifikasi belum dibaca'
                                        : 'Tidak ada notifikasi'}
                                </p>
                            </div>
                        ) : (
                            filteredNotifications.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleItemClick(item)}
                                    className={`group relative flex items-start gap-3 p-3.5 transition-all cursor-pointer ${!item.read
                                        ? 'bg-[#F5F5DC] hover:bg-[#eaeac8]'
                                        : 'bg-white hover:bg-[#F5F5DC]/60'
                                        }`}
                                >
                                    {renderIcon(item.type)}

                                    <div className="flex-1 min-w-0 pr-4">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            <p className="text-xs truncate font-black uppercase tracking-wide text-black">
                                                {item.title}
                                            </p>
                                            {!item.read && (
                                                <span className="h-2 w-2 shrink-0 rounded-full bg-[#FF00FF] border border-black shadow-[1px_1px_0px_0px_#000000]" />
                                            )}
                                        </div>

                                        <p className="text-[11px] font-bold text-neutral-700 leading-snug line-clamp-2">
                                            {item.message}
                                        </p>

                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className="text-[10px] font-mono font-bold text-neutral-500">
                                                {item.time}
                                            </span>
                                            {item.actionNav && (
                                                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 bg-[#00C2CB] text-black border border-black shadow-[1px_1px_0px_0px_#000000] group-hover:translate-x-[1px] transition-all">
                                                    Buka
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Delete single notification button */}
                                    <button
                                        type="button"
                                        onClick={(e) => deleteNotification(e, item.id)}
                                        className="opacity-0 group-hover:opacity-100 size-6 flex items-center justify-center rounded-sm border border-black bg-white text-black hover:bg-[#FF00FF] hover:text-white shadow-[1px_1px_0px_0px_#000000] transition-all absolute top-2.5 right-2.5 cursor-pointer"
                                        title="Hapus notifikasi"
                                    >
                                        <X className="h-3.5 w-3.5 stroke-[2.5]" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t-[3px] border-black bg-[#00C2CB] hover:bg-[#00a8b0] transition-colors">
                        <button
                            type="button"
                            onClick={() => {
                                onNavigate?.('riwayat');
                                setIsOpen(false);
                            }}
                            className="w-full py-2.5 px-4 text-center text-xs font-black uppercase tracking-wider text-black flex items-center justify-center gap-1.5 cursor-pointer active:translate-y-[1px]"
                        >
                            <span>Lihat Semua Riwayat Aktivitas</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
