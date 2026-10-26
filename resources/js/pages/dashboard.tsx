import { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import type { Auth, User } from '@/types';
import {
    AdminSidebar,
    AdminHeader,
    AdminOverviewView,
    AdminSetoranView,
    AdminPayoutsView,
    AdminUsersView,
    AdminLeaderboardView,
    AdminSettingsView,
    AdminBalanceModal,
} from '@/components/admin';
import type {
    AdminNavId,
    AdminSetoranItem,
    AdminPayoutItem,
    AdminUserItem,
    PlatformSettings,
} from '@/components/admin';
import {
    formatRupiah,
    getStoredSetoran,
    saveStoredSetoran,
    getStoredPayouts,
    saveStoredPayouts,
    getStoredUsers,
    saveStoredUsers,
    getStoredSettings,
    saveStoredSettings,
    getStoredUserBalance,
    saveStoredUserBalance,
    getStoredUserTransactions,
    saveStoredUserTransactions,
    addStoredNotification,
    subscribeToSync,
    SYNC_EVENTS,
} from '@/lib/shared-store';
import type { TransactionRecord } from '@/components/welcome/types';

export default function Dashboard() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const user: User = auth?.user || {
        id: 1,
        name: 'Administrator',
        email: 'admin@triple9.com',
        avatar: '/images/avatar/rubah.png',
        role: 'admin',
        email_verified_at: null,
        created_at: '2026-10-01T00:00:00.000000Z',
        updated_at: '2026-10-01T00:00:00.000000Z',
    };

    // Active Tab Navigation
    const [activeNav, setActiveNav] = useState<AdminNavId>('overview');

    // Platform Settings State
    const [settings, setSettings] = useState<PlatformSettings>(() => getStoredSettings());

    // Setoran List State
    const [setoranList, setSetoranList] = useState<AdminSetoranItem[]>(() => getStoredSetoran());

    // Payout List State
    const [payoutList, setPayoutList] = useState<AdminPayoutItem[]>(() => getStoredPayouts());

    // Users List State
    const [usersList, setUsersList] = useState<AdminUserItem[]>(() => getStoredUsers());

    // Modals State
    const [balanceModalUser, setBalanceModalUser] = useState<AdminUserItem | null>(null);
    const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
    const [presetSetoranUserId, setPresetSetoranUserId] = useState<number | 'all'>('all');

    // Cross-tab and same-window reactive synchronization
    useEffect(() => {
        const refreshData = () => {
            setSetoranList(getStoredSetoran());
            setPayoutList(getStoredPayouts());
            setUsersList(getStoredUsers());
            setSettings(getStoredSettings());
        };

        const unsubscribe = subscribeToSync(
            [
                SYNC_EVENTS.SETORAN,
                SYNC_EVENTS.PAYOUTS,
                SYNC_EVENTS.USERS,
                SYNC_EVENTS.SETTINGS,
                SYNC_EVENTS.BALANCE,
            ],
            refreshData
        );
        return unsubscribe;
    }, []);

    // Badges / Counters
    const pendingSetoranCount = setoranList.filter((s) => s.status === 'pending' || s.status === 'dicek').length;
    const pendingPayoutCount = payoutList.filter((p) => p.status === 'pending').length;

    // Active item label mapping
    const navTitles: Record<AdminNavId, string> = {
        overview: 'Ringkasan Platform',
        setoran: 'Kelola Setoran Akun',
        payouts: 'Pencairan Saldo',
        users: 'Data & Saldo Pengguna',
        leaderboard: 'Leaderboard Penyetor',
        settings: 'Pengaturan Sistem',
    };
    const activeItemLabel = navTitles[activeNav] || 'Admin Panel';

    // Handlers: Setoran
    const handleApproveSetoran = (id: string) => {
        const target = setoranList.find((s) => s.id === id);
        if (!target) return;
        if (target.status === 'diterima' || target.status === 'valid') return;

        const nextSetoran = setoranList.map((s) =>
            s.id === id ? { ...s, status: 'diterima' as const } : s,
        );
        setSetoranList(nextSetoran);
        saveStoredSetoran(nextSetoran);

        // Update corresponding user balance and total setoran
        const nextUsers = usersList.map((u) => {
            if (u.id === target.userId || (target.userEmail && u.email === target.userEmail)) {
                return {
                    ...u,
                    totalSetoran: u.totalSetoran + 1,
                    currentBalance: u.currentBalance + target.reward,
                };
            }
            return u;
        });
        setUsersList(nextUsers);
        saveStoredUsers(nextUsers);

        // Credit front-page balance & notify
        const curBal = getStoredUserBalance(0);
        const newBal = curBal + target.reward;
        saveStoredUserBalance(newBal);

        const todayStr = new Date().toISOString().split('T')[0];
        const existingHist = getStoredUserTransactions();
        const newTx: TransactionRecord = {
            date: todayStr,
            desc: `Reward Setor Akun (${target.email})`,
            amount: target.reward,
            balance: newBal,
            status: 'selesai',
            note: target.note && target.note !== '-' ? target.note : 'Akun valid & disetujui admin',
        };
        saveStoredUserTransactions([newTx, ...existingHist]);

        addStoredNotification({
            title: 'Reward Setor Diterima',
            message: `Akun ${target.email} (PW: ${target.password}) disetujui. Reward +${formatRupiah(target.reward)} telah masuk ke saldo.`,
            type: 'reward',
            actionNav: 'riwayat',
        });
    };

    const handleRejectSetoran = (id: string, reason?: string) => {
        const target = setoranList.find((s) => s.id === id);
        if (!target) return;
        const cleanReason = reason && reason.trim() ? reason.trim() : '-';

        const nextSetoran = setoranList.map((s) =>
            s.id === id
                ? { ...s, status: 'ditolak' as const, note: cleanReason }
                : s,
        );
        setSetoranList(nextSetoran);
        saveStoredSetoran(nextSetoran);

        addStoredNotification({
            title: 'Setoran Akun Ditolak',
            message: `Akun ${target.email} (PW: ${target.password}) ditolak admin. Alasan: "${cleanReason}".`,
            type: 'system',
            actionNav: 'riwayat',
        });
    };

    const handleCheckSetoran = (id: string) => {
        const target = setoranList.find((s) => s.id === id);
        if (!target) return;

        const nextSetoran = setoranList.map((s) =>
            s.id === id ? { ...s, status: 'dicek' as const } : s,
        );
        setSetoranList(nextSetoran);
        saveStoredSetoran(nextSetoran);

        addStoredNotification({
            title: 'Setoran Sedang Dicek',
            message: `Akun ${target.email} sedang dalam proses verifikasi kualitas oleh tim audit.`,
            type: 'system',
            actionNav: 'riwayat',
        });
    };

    const handleBatchCheck = (ids: string[]) => {
        const nextSetoran = setoranList.map((s) =>
            ids.includes(s.id) ? { ...s, status: 'dicek' as const } : s,
        );
        setSetoranList(nextSetoran);
        saveStoredSetoran(nextSetoran);

        const hawwinItems = setoranList.filter(
            (s) => ids.includes(s.id) && (s.userId === 10 || s.userEmail === 'firstxyz0@gmail.com'),
        );
        if (hawwinItems.length > 0) {
            addStoredNotification({
                title: 'Batch Setoran Sedang Dicek',
                message: `${hawwinItems.length} akun pada batch setoran Anda sedang dalam proses verifikasi tim audit.`,
                type: 'system',
                actionNav: 'riwayat',
            });
        }
    };

    const handleBatchApprove = (ids: string[]) => {
        let hawwinBonus = 0;
        const nextSetoran = setoranList.map((s) => {
            if (ids.includes(s.id)) {
                if ((s.userId === 10 || s.userEmail === 'firstxyz0@gmail.com') && s.status !== 'diterima' && s.status !== 'valid') {
                    hawwinBonus += s.reward;
                }
                return { ...s, status: 'diterima' as const };
            }
            return s;
        });
        setSetoranList(nextSetoran);
        saveStoredSetoran(nextSetoran);

        // Calculate rewards per user
        const rewardMap: Record<number, number> = {};
        const countMap: Record<number, number> = {};
        setoranList.forEach((s) => {
            if (ids.includes(s.id) && s.status !== 'diterima' && s.status !== 'valid') {
                rewardMap[s.userId] = (rewardMap[s.userId] || 0) + s.reward;
                countMap[s.userId] = (countMap[s.userId] || 0) + 1;
            }
        });

        const nextUsers = usersList.map((u) => {
            if (rewardMap[u.id]) {
                return {
                    ...u,
                    totalSetoran: u.totalSetoran + (countMap[u.id] || 0),
                    currentBalance: u.currentBalance + rewardMap[u.id],
                };
            }
            return u;
        });
        setUsersList(nextUsers);
        saveStoredUsers(nextUsers);

        if (hawwinBonus > 0) {
            const curBal = getStoredUserBalance(0);
            const newBal = curBal + hawwinBonus;
            saveStoredUserBalance(newBal);

            const todayStr = new Date().toISOString().split('T')[0];
            const existingHist = getStoredUserTransactions();
            const newTx: TransactionRecord = {
                date: todayStr,
                desc: `Reward Batch Setor (${ids.length} akun)`,
                amount: hawwinBonus,
                balance: newBal,
                status: 'selesai',
                note: 'Disetujui batch oleh admin verifikator',
            };
            saveStoredUserTransactions([newTx, ...existingHist]);

            addStoredNotification({
                title: 'Batch Setor Diterima',
                message: `${ids.length} akun pada batch setoran Anda berhasil disetujui. Reward +${formatRupiah(hawwinBonus)} telah masuk ke saldo.`,
                type: 'reward',
                actionNav: 'riwayat',
            });
        }
    };

    const handleBatchReject = (ids: string[], reason?: string) => {
        const cleanReason = reason && reason.trim() ? reason.trim() : '-';
        const nextSetoran = setoranList.map((s) =>
            ids.includes(s.id)
                ? { ...s, status: 'ditolak' as const, note: cleanReason }
                : s,
        );
        setSetoranList(nextSetoran);
        saveStoredSetoran(nextSetoran);

        const hawwinItems = setoranList.filter(
            (s) => ids.includes(s.id) && (s.userId === 10 || s.userEmail === 'firstxyz0@gmail.com'),
        );
        if (hawwinItems.length > 0) {
            addStoredNotification({
                title: 'Batch Setoran Ditolak',
                message: `${hawwinItems.length} akun pada batch Anda ditolak admin. Alasan: "${cleanReason}".`,
                type: 'system',
                actionNav: 'riwayat',
            });
        }
    };

    // Handlers: Payouts
    const handleApprovePayout = (id: string, note?: string) => {
        const target = payoutList.find((p) => p.id === id);
        if (!target) return;

        const cleanNote = note && note.trim()
            ? note.trim()
            : `Transfer berhasil dikirim ke ${target.method} (${target.accountNumber} a.n ${target.accountName || target.userName})`;

        const nextPayouts = payoutList.map((p) =>
            p.id === id
                ? {
                    ...p,
                    status: 'success' as const,
                    note: cleanNote,
                }
                : p,
        );
        setPayoutList(nextPayouts);
        saveStoredPayouts(nextPayouts);

        const existingHist = getStoredUserTransactions();
        let matched = false;
        const updatedHist = existingHist.map((tx) => {
            if (!matched && tx.status === 'pending' && (tx.desc.includes(target.accountNumber) || Math.abs(tx.amount) === target.amount)) {
                matched = true;
                return {
                    ...tx,
                    status: 'selesai' as const,
                    note: cleanNote,
                };
            }
            return tx;
        });
        saveStoredUserTransactions(updatedHist);

        addStoredNotification({
            title: 'Penarikan Sukses Diproses',
            message: `Penarikan saldo ${formatRupiah(target.amount)} ke ${target.method} (${target.accountNumber}) telah berhasil dikirim admin. Catatan: "${cleanNote}".`,
            type: 'wallet',
            actionNav: 'saldo',
        });
    };

    const handleRejectPayout = (id: string, reason?: string) => {
        const target = payoutList.find((p) => p.id === id);
        if (!target) return;

        const cleanReason = reason && reason.trim() ? reason.trim() : 'Data rekening tidak sesuai / ditolak admin';

        const nextPayouts = payoutList.map((p) =>
            p.id === id
                ? {
                    ...p,
                    status: 'rejected' as const,
                    note: cleanReason,
                }
                : p,
        );
        setPayoutList(nextPayouts);
        saveStoredPayouts(nextPayouts);

        // Refund balance to user
        const nextUsers = usersList.map((u) => {
            if (u.id === target.userId || (target.userEmail && u.email === target.userEmail)) {
                const refunded = u.currentBalance + target.amount;
                return {
                    ...u,
                    currentBalance: refunded,
                };
            }
            return u;
        });
        setUsersList(nextUsers);
        saveStoredUsers(nextUsers);

        const curBal = getStoredUserBalance(0);
        const newBal = curBal + target.amount;
        saveStoredUserBalance(newBal);

        const todayStr = new Date().toISOString().split('T')[0];
        const existingHist = getStoredUserTransactions();
        let matched = false;
        const updatedHist = existingHist.map((tx) => {
            if (!matched && tx.status === 'pending' && (tx.desc.includes(target.accountNumber) || Math.abs(tx.amount) === target.amount)) {
                matched = true;
                return {
                    ...tx,
                    status: 'ditolak' as const,
                    note: cleanReason,
                };
            }
            return tx;
        });

        const refundTx: TransactionRecord = {
            date: todayStr,
            desc: `Pengembalian Dana (${target.method} Ditolak)`,
            amount: target.amount,
            balance: newBal,
            status: 'selesai',
            note: `Refund penarikan: ${cleanReason}`,
        };
        saveStoredUserTransactions([refundTx, ...updatedHist]);

        addStoredNotification({
            title: 'Penarikan Saldo Ditolak',
            message: `Penarikan ${formatRupiah(target.amount)} (${target.method}) ditolak oleh admin. Alasan: "${cleanReason}". Saldo telah dikembalikan ke akun Anda.`,
            type: 'wallet',
            actionNav: 'saldo',
        });
    };

    // Handlers: Users
    const handleUpdateBalance = (userId: number, delta: number, note?: string) => {
        const targetUser = usersList.find((u) => u.id === userId);
        const newBalance = Math.max(0, (targetUser?.currentBalance || 0) + delta);
        const isAdd = delta >= 0;
        const cleanNote = note && note.trim() ? note.trim() : '-';

        const nextUsers = usersList.map((u) => {
            if (u.id === userId) {
                return {
                    ...u,
                    currentBalance: newBalance,
                };
            }
            return u;
        });
        setUsersList(nextUsers);
        saveStoredUsers(nextUsers);

        // If target is Hawwin (userId: 10 or email), update front-page balance & notify
        if (userId === 10 || targetUser?.email === 'firstxyz0@gmail.com') {
            saveStoredUserBalance(newBalance);

            const todayStr = new Date().toISOString().split('T')[0];
            const existingHist = getStoredUserTransactions();
            const newTx: TransactionRecord = {
                date: todayStr,
                desc: `Penyesuaian Saldo Admin (${isAdd ? 'Tambah' : 'Kurang'})`,
                amount: delta,
                balance: newBalance,
                status: 'selesai',
                note: cleanNote,
            };
            saveStoredUserTransactions([newTx, ...existingHist]);

            const notifTitle = isAdd ? 'Saldo Ditambahkan oleh Admin' : 'Saldo Dikurangi oleh Admin';
            const notifMessage = `${isAdd ? 'Penambahan' : 'Pengurangan'} saldo sebesar ${isAdd ? '+' : '-'}${formatRupiah(Math.abs(delta))}. Catatan: "${cleanNote}".`;
            addStoredNotification({
                title: notifTitle,
                message: notifMessage,
                type: isAdd ? 'reward' : 'wallet',
                actionNav: 'saldo',
            });
        }
    };

    const handleToggleUserRole = (userId: number) => {
        const nextUsers = usersList.map((u) => {
            if (u.id === userId) {
                return {
                    ...u,
                    role: u.role === 'admin' ? ('user' as const) : ('admin' as const),
                };
            }
            return u;
        });
        setUsersList(nextUsers);
        saveStoredUsers(nextUsers);
    };

    const handleToggleUserStatus = (userId: number) => {
        const nextUsers = usersList.map((u) => {
            if (u.id === userId) {
                return {
                    ...u,
                    status: u.status === 'active' ? ('suspended' as const) : ('active' as const),
                };
            }
            return u;
        });
        setUsersList(nextUsers);
        saveStoredUsers(nextUsers);
    };

    // Handlers: Settings
    const handleSaveSettings = (newSettings: PlatformSettings) => {
        setSettings(newSettings);
        saveStoredSettings(newSettings);
    };

    return (
        <>
            <Head title={`${activeItemLabel} — Triple9 Admin`} />

            {/* Neo-brutalist Shell matching Welcome layout */}
            <SidebarProvider defaultOpen={true} className="bg-[#F5F5DC] min-h-screen text-black font-sans">
                {/* ADMIN SIDEBAR */}
                <AdminSidebar
                    user={user}
                    activeNav={activeNav}
                    onSelectNav={(id) => {
                        setActiveNav(id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    pendingSetoranCount={pendingSetoranCount}
                    pendingPayoutCount={pendingPayoutCount}
                />

                {/* INSET MAIN CONTENT AREA */}
                <SidebarInset className="min-w-0 overflow-x-clip bg-[#F5F5DC] flex flex-col flex-1 min-h-screen">
                    {/* TOP HEADER */}
                    <AdminHeader activeItemLabel={activeItemLabel} />

                    {/* ADMIN DASHBOARD CONTENT CANVAS */}
                    <div className="flex-1 p-4 sm:p-6 lg:p-7 bg-[#F5F5DC]">
                        <div className="max-w-7xl w-full mx-auto space-y-6 pb-12">
                            {/* 1. OVERVIEW VIEW */}
                            {activeNav === 'overview' && (
                                <AdminOverviewView
                                    onNavigate={setActiveNav}
                                    setoranList={setoranList}
                                    payoutList={payoutList}
                                    usersList={usersList}
                                    settings={settings}
                                    onApproveSetoran={handleApproveSetoran}
                                    onRejectSetoran={handleRejectSetoran}
                                    onCheckSetoran={handleCheckSetoran}
                                />
                            )}

                            {/* 2. SETORAN VIEW */}
                            {activeNav === 'setoran' && (
                                <AdminSetoranView
                                    setoranList={setoranList}
                                    presetUserId={presetSetoranUserId}
                                    onApproveSetoran={handleApproveSetoran}
                                    onRejectSetoran={handleRejectSetoran}
                                    onCheckSetoran={handleCheckSetoran}
                                    onBatchApprove={handleBatchApprove}
                                    onBatchReject={handleBatchReject}
                                    onBatchCheck={handleBatchCheck}
                                />
                            )}

                            {/* 3. PAYOUTS VIEW */}
                            {activeNav === 'payouts' && (
                                <AdminPayoutsView
                                    payoutList={payoutList}
                                    onApprovePayout={handleApprovePayout}
                                    onRejectPayout={handleRejectPayout}
                                />
                            )}

                            {/* 4. USERS VIEW */}
                            {activeNav === 'users' && (
                                <AdminUsersView
                                    usersList={usersList}
                                    onOpenBalanceModal={(userItem) => {
                                        setBalanceModalUser(userItem);
                                        setIsBalanceModalOpen(true);
                                    }}
                                    onToggleUserRole={handleToggleUserRole}
                                    onToggleUserStatus={handleToggleUserStatus}
                                />
                            )}

                            {/* 5. LEADERBOARD VIEW */}
                            {activeNav === 'leaderboard' && (
                                <AdminLeaderboardView
                                    usersList={usersList}
                                    setoranList={setoranList}
                                    onFilterUserSetoran={(userId) => {
                                        setPresetSetoranUserId(userId);
                                        setActiveNav('setoran');
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    onOpenBalanceModal={(userItem) => {
                                        setBalanceModalUser(userItem);
                                        setIsBalanceModalOpen(true);
                                    }}
                                />
                            )}

                            {/* 6. SETTINGS VIEW */}
                            {activeNav === 'settings' && (
                                <AdminSettingsView
                                    settings={settings}
                                    onSaveSettings={handleSaveSettings}
                                />
                            )}
                        </div>
                    </div>
                </SidebarInset>

                {/* MODAL: Sesuaikan Saldo User */}
                <AdminBalanceModal
                    isOpen={isBalanceModalOpen}
                    onClose={() => {
                        setIsBalanceModalOpen(false);
                        setBalanceModalUser(null);
                    }}
                    user={balanceModalUser}
                    onUpdateBalance={handleUpdateBalance}
                />
            </SidebarProvider>
        </>
    );
}
