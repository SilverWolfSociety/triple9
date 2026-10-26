import type { LucideIcon } from 'lucide-react';
import type { User } from '@/types';

export type AdminNavId =
    | 'overview'
    | 'setoran'
    | 'payouts'
    | 'users'
    | 'leaderboard'
    | 'settings';

export interface AdminNavItem {
    id: AdminNavId;
    label: string;
    icon: LucideIcon;
    badge?: number | string;
    badgeColor?: string;
}

export interface AdminNavGroup {
    title: string;
    items: AdminNavItem[];
}

export type SetoranStatus = 'pending' | 'dicek' | 'diterima' | 'ditolak' | 'valid' | 'invalid';

export interface AdminSetoranItem {
    id: string;
    userId: number;
    userName: string;
    userEmail: string;
    userAvatar: string;
    email: string;
    password: string;
    date: string;
    time: string;
    status: SetoranStatus;
    reward: number;
    batchId?: string;
    note?: string;
}

export interface SystemRuleItem {
    id: string;
    number: string;
    title: string;
    description?: string;
    badgeColor?: string;
    isActive?: boolean;
}

export interface SystemRulesConfig {
    rules: SystemRuleItem[];
    importantNotes: string[];
}

export type PayoutStatus = 'pending' | 'success' | 'rejected';
export type PayoutMethod = 'DANA' | 'OVO' | 'GoPay' | 'ShopeePay';

export interface AdminPayoutItem {
    id: string;
    userId: number;
    userName: string;
    userEmail: string;
    userAvatar: string;
    method: PayoutMethod;
    accountName: string;
    accountNumber: string;
    amount: number;
    date: string;
    time: string;
    status: PayoutStatus;
    note?: string;
}

export interface AdminUserItem {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: 'user' | 'admin';
    totalSetoran: number;
    currentBalance: number;
    joinedDate: string;
    status: 'active' | 'suspended';
}

export type TicketStatus = 'waiting' | 'in_progress' | 'resolved' | 'closed';

export interface AdminTicketItem {
    id: string;
    ticketNumber: string;
    userId: number;
    userName: string;
    userEmail: string;
    userAvatar: string;
    category: string;
    subject: string;
    message: string;
    date: string;
    time: string;
    status: TicketStatus;
    replies: {
        sender: 'user' | 'admin';
        name: string;
        message: string;
        time: string;
    }[];
}

export interface PlatformSettings {
    gmailRate: number;
    minWithdraw: number;
    referralBonus: number;
    announcementText: string;
    announcementActive: boolean;
    depositsOpen: boolean;
    autoCheckActive: boolean;
    announcementType?: string;
    announcementTitle?: string;
    announcementCategory?: string;
    maxBatchDeposit?: number;
    maintenanceMode?: boolean;
    waChannelUrl?: string;
    tgGroupUrl?: string;
    supportContact?: string;
    operatingHours?: string;
    rules?: SystemRuleItem[];
    rulesNotes?: string[];
}
