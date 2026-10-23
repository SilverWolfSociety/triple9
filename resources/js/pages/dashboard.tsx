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
    AdminSettingsView,
    AdminBalanceModal,
    initialSetoranData,
    initialPayoutData,
    initialUsersData,
    initialPlatformSettings,
} from '@/components/admin';
import type {
    AdminNavId,
    AdminSetoranItem,
    AdminPayoutItem,
    AdminUserItem,
    PlatformSettings,
} from '@/components/admin';

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
    const [settings, setSettings] = useState<PlatformSettings>(() => {
        try {
            const saved = localStorage.getItem('triple9_admin_settings');
            if (saved) return JSON.parse(saved);
        } catch {
            // ignore
        }
        return initialPlatformSettings;
    });

    // Setoran List State
    const [setoranList, setSetoranList] = useState<AdminSetoranItem[]>(() => {
        try {
            const saved = localStorage.getItem('triple9_admin_setoran');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.length >= 20) {
                    return parsed.map((item: any) => {
                        let status = item.status;
                        if (status === 'valid') status = 'diterima';
                        if (status === 'invalid') status = 'ditolak';
                        return { ...item, status };
                    });
                }
            }
        } catch {
            // ignore
        }
        return initialSetoranData;
    });

    // Payout List State
    const [payoutList, setPayoutList] = useState<AdminPayoutItem[]>(() => {
        try {
            const saved = localStorage.getItem('triple9_admin_payouts');
            if (saved) {
                const parsed = JSON.parse(saved);
                const allowed: Record<string, 'DANA' | 'OVO' | 'GoPay' | 'ShopeePay'> = {
                    dana: 'DANA',
                    ovo: 'OVO',
                    gopay: 'GoPay',
                    shopeepay: 'ShopeePay',
                    bca: 'OVO',
                    bri: 'GoPay',
                    mandiri: 'DANA',
                    qris: 'ShopeePay',
                };
                return parsed.map((item: any) => {
                    const key = String(item.method || '').toLowerCase();
                    const method = allowed[key] || 'DANA';
                    return { ...item, method };
                });
            }
        } catch {
            // ignore
        }
        return initialPayoutData;
    });

    // Users List State
    const [usersList, setUsersList] = useState<AdminUserItem[]>(() => {
        try {
            const saved = localStorage.getItem('triple9_admin_users');
            if (saved) return JSON.parse(saved);
        } catch {
            // ignore
        }
        return initialUsersData;
    });

    // Modals State
    const [balanceModalUser, setBalanceModalUser] = useState<AdminUserItem | null>(null);
    const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);

    // Sync to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('triple9_admin_settings', JSON.stringify(settings));
        } catch { }
    }, [settings]);

    useEffect(() => {
        try {
            localStorage.setItem('triple9_admin_setoran', JSON.stringify(setoranList));
        } catch { }
    }, [setoranList]);

    useEffect(() => {
        try {
            localStorage.setItem('triple9_admin_payouts', JSON.stringify(payoutList));
        } catch { }
    }, [payoutList]);

    useEffect(() => {
        try {
            localStorage.setItem('triple9_admin_users', JSON.stringify(usersList));
        } catch { }
    }, [usersList]);

    // Badges / Counters
    const pendingSetoranCount = setoranList.filter((s) => s.status === 'pending' || s.status === 'dicek').length;
    const pendingPayoutCount = payoutList.filter((p) => p.status === 'pending').length;

    // Active item label mapping
    const navTitles: Record<AdminNavId, string> = {
        overview: 'Ringkasan Platform',
        setoran: 'Kelola Setoran Akun',
        payouts: 'Pencairan Saldo',
        users: 'Data & Saldo Pengguna',
        settings: 'Pengaturan Sistem',
    };
    const activeItemLabel = navTitles[activeNav] || 'Admin Panel';

    // Handlers: Setoran
    const handleApproveSetoran = (id: string) => {
        const target = setoranList.find((s) => s.id === id);
        if (!target) return;

        setSetoranList((prev) =>
            prev.map((s) => (s.id === id ? { ...s, status: 'diterima' as const } : s)),
        );

        // Update corresponding user balance and total setoran
        setUsersList((prev) =>
            prev.map((u) => {
                if (u.id === target.userId) {
                    return {
                        ...u,
                        totalSetoran: u.totalSetoran + 1,
                        currentBalance: u.currentBalance + target.reward,
                    };
                }
                return u;
            }),
        );
    };

    const handleRejectSetoran = (id: string, reason?: string) => {
        setSetoranList((prev) =>
            prev.map((s) =>
                s.id === id
                    ? { ...s, status: 'ditolak' as const, note: reason || 'Akun tidak valid / password salah' }
                    : s,
            ),
        );
    };

    const handleCheckSetoran = (id: string) => {
        setSetoranList((prev) =>
            prev.map((s) => (s.id === id ? { ...s, status: 'dicek' as const } : s)),
        );
    };

    const handleBatchCheck = (ids: string[]) => {
        setSetoranList((prev) =>
            prev.map((s) => (ids.includes(s.id) ? { ...s, status: 'dicek' as const } : s)),
        );
    };

    const handleBatchApprove = (ids: string[]) => {
        setSetoranList((prev) =>
            prev.map((s) => (ids.includes(s.id) ? { ...s, status: 'diterima' as const } : s)),
        );

        // Calculate rewards per user
        const rewardMap: Record<number, number> = {};
        setoranList.forEach((s) => {
            if (ids.includes(s.id) && s.status !== 'diterima' && s.status !== 'valid') {
                rewardMap[s.userId] = (rewardMap[s.userId] || 0) + s.reward;
            }
        });

        setUsersList((prev) =>
            prev.map((u) => {
                if (rewardMap[u.id]) {
                    return {
                        ...u,
                        totalSetoran: u.totalSetoran + 1,
                        currentBalance: u.currentBalance + rewardMap[u.id],
                    };
                }
                return u;
            }),
        );
    };

    const handleBatchReject = (ids: string[], reason?: string) => {
        setSetoranList((prev) =>
            prev.map((s) =>
                ids.includes(s.id)
                    ? { ...s, status: 'ditolak' as const, note: reason || 'Batch tolak verifikasi' }
                    : s,
            ),
        );
    };

    // Handlers: Payouts
    const handleApprovePayout = (id: string, note?: string) => {
        setPayoutList((prev) =>
            prev.map((p) =>
                p.id === id
                    ? {
                        ...p,
                        status: 'success' as const,
                        note: note || `Transfer berhasil dikirim ke ${p.method} (${p.accountNumber})`,
                    }
                    : p,
            ),
        );
    };

    const handleRejectPayout = (id: string, reason?: string) => {
        const target = payoutList.find((p) => p.id === id);
        if (!target) return;

        setPayoutList((prev) =>
            prev.map((p) =>
                p.id === id
                    ? {
                        ...p,
                        status: 'rejected' as const,
                        note: reason || 'Permintaan pencairan ditolak, saldo dikembalikan ke user',
                    }
                    : p,
            ),
        );

        // Refund balance to user
        setUsersList((prev) =>
            prev.map((u) => {
                if (u.id === target.userId) {
                    return {
                        ...u,
                        currentBalance: u.currentBalance + target.amount,
                    };
                }
                return u;
            }),
        );
    };

    // Handlers: Users
    const handleUpdateBalance = (userId: number, delta: number) => {
        setUsersList((prev) =>
            prev.map((u) => {
                if (u.id === userId) {
                    return {
                        ...u,
                        currentBalance: Math.max(0, u.currentBalance + delta),
                    };
                }
                return u;
            }),
        );
    };

    const handleToggleUserRole = (userId: number) => {
        setUsersList((prev) =>
            prev.map((u) => {
                if (u.id === userId) {
                    return {
                        ...u,
                        role: u.role === 'admin' ? ('user' as const) : ('admin' as const),
                    };
                }
                return u;
            }),
        );
    };

    const handleToggleUserStatus = (userId: number) => {
        setUsersList((prev) =>
            prev.map((u) => {
                if (u.id === userId) {
                    return {
                        ...u,
                        status: u.status === 'active' ? ('suspended' as const) : ('active' as const),
                    };
                }
                return u;
            }),
        );
    };

    // Handlers: Settings
    const handleSaveSettings = (newSettings: PlatformSettings) => {
        setSettings(newSettings);
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

                            {/* 5. SETTINGS VIEW */}
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
