import type {
    AdminSetoranItem,
    AdminPayoutItem,
    AdminUserItem,
    PlatformSettings,
} from '@/components/admin/types';
import {
    initialSetoranData,
    initialPayoutData,
    initialUsersData,
    initialPlatformSettings,
} from '@/components/admin/mock-data';
import type {
    NotificationItem,
    TransactionRecord,
    StorRecord,
} from '@/components/welcome/types';

export const STORAGE_KEYS = {
    SETORAN: 'triple9_admin_setoran',
    PAYOUTS: 'triple9_admin_payouts',
    USERS: 'triple9_admin_users',
    SETTINGS: 'triple9_admin_settings',
    RULES: 'triple9_rules',
    NOTIFICATIONS: 'triple9_user_notifications',
    USER_BALANCE: 'triple9_user_balance',
    USER_TRANSACTIONS: 'triple9_transaction_history',
    SAVED_EWALLETS: 'triple9_saved_ewallets',
    SAVED_EWALLET_NAMES: 'triple9_saved_ewallet_names',
    INTRO_SEEN: 'triple9_intro_seen',
} as const;

export const SYNC_EVENTS = {
    SETORAN: 'triple9_sync_setoran',
    PAYOUTS: 'triple9_sync_payouts',
    USERS: 'triple9_sync_users',
    SETTINGS: 'triple9_sync_settings',
    RULES: 'triple9_rules_updated',
    NOTIFICATIONS: 'triple9_notifications_updated',
    BALANCE: 'triple9_balance_updated',
    ALL: 'triple9_sync_all',
} as const;

export const formatRupiah = (val: number): string =>
    'Rp ' + new Intl.NumberFormat('id-ID').format(val);

// Clean non-dummy initial transactions
export const defaultUserTransactions: TransactionRecord[] = [];

// Clean non-dummy initial notifications
export const defaultNotifications: NotificationItem[] = [];

// One-time auto cleanup to purge only leftover dummy data from localStorage, preserving all real user data
const DUMMY_CLEANUP_KEY = 'triple9_dummy_cleaned_v5';
export function cleanupOldDummyData(): void {
    if (typeof window === 'undefined') return;
    try {
        const isCleaned = localStorage.getItem(DUMMY_CLEANUP_KEY);
        if (!isCleaned) {
            // Remove known dummy items from SETORAN without touching user-submitted items
            const rawSetoran = localStorage.getItem(STORAGE_KEYS.SETORAN);
            if (rawSetoran) {
                try {
                    const parsed: AdminSetoranItem[] = JSON.parse(rawSetoran);
                    const filtered = parsed.filter(
                        (item) =>
                            !item.id.match(/^SET-9(0[1-9]|1[0-9]|20)$/) &&
                            !item.email.includes('andi.prasetyo88') &&
                            !item.email.includes('budi.santoso') &&
                            !item.email.includes('citra.lestari')
                    );
                    localStorage.setItem(STORAGE_KEYS.SETORAN, JSON.stringify(filtered));
                    localStorage.setItem('triple9_setoran_list', JSON.stringify(filtered));
                } catch {
                    localStorage.setItem(STORAGE_KEYS.SETORAN, JSON.stringify([]));
                    localStorage.setItem('triple9_setoran_list', JSON.stringify([]));
                }
            }

            // Remove known dummy items from PAYOUTS without touching user payouts
            const rawPayouts = localStorage.getItem(STORAGE_KEYS.PAYOUTS);
            if (rawPayouts) {
                try {
                    const parsed: AdminPayoutItem[] = JSON.parse(rawPayouts);
                    const filtered = parsed.filter((item) => !item.id.match(/^TRX-WD-80[1-8]$/));
                    localStorage.setItem(STORAGE_KEYS.PAYOUTS, JSON.stringify(filtered));
                    localStorage.setItem('triple9_payout_list', JSON.stringify(filtered));
                } catch {
                    localStorage.setItem(STORAGE_KEYS.PAYOUTS, JSON.stringify([]));
                    localStorage.setItem('triple9_payout_list', JSON.stringify([]));
                }
            }

            // Ensure USERS has default users if empty
            const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS);
            if (!rawUsers || rawUsers === '[]') {
                localStorage.setItem(
                    STORAGE_KEYS.USERS,
                    JSON.stringify([
                        {
                            id: 1,
                            name: 'Admin Utama',
                            email: 'admin@triple9.com',
                            avatar: '/images/avatar/rubah.png',
                            role: 'admin',
                            totalSetoran: 0,
                            currentBalance: 0,
                            joinedDate: '2026-10-01',
                            status: 'active',
                        },
                        {
                            id: 10,
                            name: 'Hawwin Ramadhan',
                            email: 'firstxyz0@gmail.com',
                            avatar: '/images/avatar/kucing.png',
                            role: 'user',
                            totalSetoran: 0,
                            currentBalance: 0,
                            joinedDate: '2026-10-22',
                            status: 'active',
                        },
                    ])
                );
            }

            localStorage.setItem(DUMMY_CLEANUP_KEY, 'true');
        }
    } catch {
        // ignore
    }
}
cleanupOldDummyData();

// Helper safe JSON parse & stringify with secondary key fallback
function safeGet<T>(primaryKey: string, fallback: T, secondaryKey?: string): T {
    try {
        if (typeof window === 'undefined') return fallback;
        const raw = localStorage.getItem(primaryKey);
        if (raw !== null && raw !== '') {
            return JSON.parse(raw);
        }
        if (secondaryKey) {
            const rawSec = localStorage.getItem(secondaryKey);
            if (rawSec !== null && rawSec !== '') {
                return JSON.parse(rawSec);
            }
        }
    } catch {
        // ignore
    }
    return fallback;
}

function safeSet(primaryKey: string, value: unknown, secondaryKey?: string): void {
    try {
        if (typeof window === 'undefined') return;
        const serialized = JSON.stringify(value);
        localStorage.setItem(primaryKey, serialized);
        if (secondaryKey) {
            localStorage.setItem(secondaryKey, serialized);
        }
    } catch {
        // ignore
    }
}

export function dispatchSync(event: string): void {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(event));
        // Also dispatch standard custom events for listeners
        if (event === SYNC_EVENTS.BALANCE) {
            window.dispatchEvent(new Event('triple9_balance_updated'));
        }
        if (event === SYNC_EVENTS.NOTIFICATIONS) {
            window.dispatchEvent(new Event('triple9_notifications_updated'));
        }
        if (event === SYNC_EVENTS.SETTINGS) {
            window.dispatchEvent(new Event('triple9_settings_updated'));
        }
    }
}

// 1. SETORAN SYNC
export function getStoredSetoran(): AdminSetoranItem[] {
    return safeGet<AdminSetoranItem[]>(STORAGE_KEYS.SETORAN, initialSetoranData, 'triple9_setoran_list');
}

export function saveStoredSetoran(list: AdminSetoranItem[]): void {
    safeSet(STORAGE_KEYS.SETORAN, list, 'triple9_setoran_list');
    dispatchSync(SYNC_EVENTS.SETORAN);
}

// 2. PAYOUTS SYNC
export function getStoredPayouts(): AdminPayoutItem[] {
    return safeGet<AdminPayoutItem[]>(STORAGE_KEYS.PAYOUTS, initialPayoutData, 'triple9_payout_list');
}

export function saveStoredPayouts(list: AdminPayoutItem[]): void {
    safeSet(STORAGE_KEYS.PAYOUTS, list, 'triple9_payout_list');
    dispatchSync(SYNC_EVENTS.PAYOUTS);
}

// 3. USERS SYNC
export function getStoredUsers(): AdminUserItem[] {
    return safeGet<AdminUserItem[]>(STORAGE_KEYS.USERS, initialUsersData, 'triple9_users_list');
}

export function saveStoredUsers(list: AdminUserItem[]): void {
    safeSet(STORAGE_KEYS.USERS, list, 'triple9_users_list');
    dispatchSync(SYNC_EVENTS.USERS);
}

// 4. SETTINGS SYNC
export function getStoredSettings(): PlatformSettings {
    return safeGet<PlatformSettings>(STORAGE_KEYS.SETTINGS, initialPlatformSettings);
}

export function saveStoredSettings(settings: PlatformSettings): void {
    safeSet(STORAGE_KEYS.SETTINGS, settings);
    dispatchSync(SYNC_EVENTS.SETTINGS);
}

// 5. NOTIFICATIONS SYNC
export function getStoredNotifications(): NotificationItem[] {
    return safeGet<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, defaultNotifications);
}

export function saveStoredNotifications(notifs: NotificationItem[]): void {
    safeSet(STORAGE_KEYS.NOTIFICATIONS, notifs);
    dispatchSync(SYNC_EVENTS.NOTIFICATIONS);
}

export function addStoredNotification(notif: {
    title: string;
    message: string;
    type?: NotificationItem['type'];
    actionNav?: string;
}): void {
    const current = getStoredNotifications();
    const newNotif: NotificationItem = {
        id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: notif.title,
        message: notif.message,
        time: 'Baru saja',
        type: notif.type || 'system',
        read: false,
        actionNav: notif.actionNav || 'dashboard',
    };
    saveStoredNotifications([newNotif, ...current]);
}

// 6. USER BALANCE SYNC
export function getStoredUserBalance(fallback = 0): number {
    try {
        if (typeof window === 'undefined') return fallback;
        const raw = localStorage.getItem(STORAGE_KEYS.USER_BALANCE);
        if (raw !== null && raw !== '') {
            return parseInt(raw, 10);
        }
    } catch {
        // ignore
    }
    return fallback;
}

export function saveStoredUserBalance(balance: number): void {
    try {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEYS.USER_BALANCE, String(balance));
    } catch {
        // ignore
    }
    dispatchSync(SYNC_EVENTS.BALANCE);
}

// 7. USER TRANSACTIONS SYNC
export function getStoredUserTransactions(): TransactionRecord[] {
    return safeGet<TransactionRecord[]>(STORAGE_KEYS.USER_TRANSACTIONS, defaultUserTransactions);
}

export function saveStoredUserTransactions(history: TransactionRecord[]): void {
    safeSet(STORAGE_KEYS.USER_TRANSACTIONS, history);
    dispatchSync(SYNC_EVENTS.BALANCE);
}

// 8. CONVERT ADMIN SETORAN TO FRONTEND STOR RECORD
export function filterUserSetoran(
    adminList: AdminSetoranItem[],
    userEmail = 'firstxyz0@gmail.com',
    userId?: number
): StorRecord[] {
    return adminList
        .filter(
            (item) =>
                (userId !== undefined && item.userId === userId) ||
                item.userEmail === userEmail ||
                item.id.startsWith('SET-') ||
                item.id.startsWith('stor-')
        )
        .map((item) => ({
            id: item.id,
            email: item.email,
            room: (item.password === 'triple9' || item.password === '9triple' ? item.password : 'triple9') as StorRecord['room'],
            status: item.status === 'valid' ? 'diterima' : item.status === 'invalid' ? 'ditolak' : item.status,
            date: item.date,
            reward: item.reward,
            note: item.note,
        }));
}

// 9. SUBSCRIBE TO SYNC HELPER (LISTENS TO STORAGE, FOCUS, VISIBILITY & CUSTOM EVENTS)
export function subscribeToSync(eventNames: string[], callback: () => void): () => void {
    if (typeof window === 'undefined') return () => {};

    const handleUpdate = () => callback();

    // Cross-tab storage changes
    window.addEventListener('storage', handleUpdate);

    // Custom events in the same window
    eventNames.forEach((ev) => window.addEventListener(ev, handleUpdate));

    // Focus & visibility: immediately update when user switches to this tab
    window.addEventListener('focus', handleUpdate);
    document.addEventListener('visibilitychange', handleUpdate);

    // Safety fallback interval (every 1.5 seconds)
    const intervalId = setInterval(handleUpdate, 1500);

    return () => {
        window.removeEventListener('storage', handleUpdate);
        eventNames.forEach((ev) => window.removeEventListener(ev, handleUpdate));
        window.removeEventListener('focus', handleUpdate);
        document.removeEventListener('visibilitychange', handleUpdate);
        clearInterval(intervalId);
    };
}
