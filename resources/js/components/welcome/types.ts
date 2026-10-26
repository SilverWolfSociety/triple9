import type React from 'react';

export interface NavItemConfig {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
}

export interface NavGroupConfig {
    title: string;
    items: NavItemConfig[];
}

export type StorRoom = 'triple9' | '9triple' | 'triple999' | '999triple' | 'zero1122' | 'hehe1122';

export interface StorRecord {
    id: string;
    email: string;
    room: StorRoom;
    status: 'pending' | 'dicek' | 'diterima' | 'ditolak';
    date: string;
    reward: number;
    note?: string;
}

export type RiwayatFilter = 'all' | 'diterima' | 'pending' | 'ditolak' | 'dicek';
export type JalurFilter = 'all' | StorRoom;
export type DayFilter = 'all' | 'today' | '7days' | '30days';

export interface TicketReply {
    id: string;
    sender: 'user' | 'admin';
    name: string;
    message: string;
    time: string;
}

export interface TicketRecord {
    id: string;
    ticketNumber: string;
    title: string;
    category: string;
    priority: 'biasa' | 'penting' | 'mendesak';
    message: string;
    date: string;
    status: 'menunggu' | 'diproses' | 'selesai';
    whatsapp?: string;
    relatedId?: string;
    adminReply?: string;
    replies?: TicketReply[];
}

export interface TransactionRecord {
    date: string;
    desc: string;
    amount: number;
    balance: number;
    status?: 'pending' | 'complete' | 'sukses' | 'selesai' | 'ditolak' | string;
    note?: string;
    method?: string;
    accountNumber?: string;
    accountName?: string;
}

export interface WithdrawRecord {
    date: string;
    method: string;
    account: string;
    amount: number;
    status: string;
}

export interface LeaderboardItem {
    rank: number;
    name: string;
    initials: string;
    avatarBg: string;
    avatar?: string;
    gmails: number;
    earnings: number;
}

export type LeaderboardPeriod = 'today' | '7days' | '30days' | 'all';

export type EwalletType = 'DANA' | 'OVO' | 'GoPay' | 'ShopeePay';

export interface AnnouncementItem {
    badge: string;
    badgeColor: string;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    actionText?: string;
    onAction?: () => void;
}

export type NotificationCategory = 'reward' | 'wallet' | 'bonus' | 'system' | 'ticket';

export interface NotificationItem {
    id: string;
    title: string;
    message: string;
    time: string;
    type: NotificationCategory;
    read: boolean;
    actionNav?: string;
}
