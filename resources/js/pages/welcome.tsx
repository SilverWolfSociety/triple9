import { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import type { Auth } from '@/types';
import {
    allNavItems,
    WelcomeSidebar,
    WelcomeHeader,
    DashboardView,
    StorView,
    SaldoView,
    CheckerView,
    RiwayatView,
    RulesView,
    LeaderboardView,
    KomunitasView,
    ReferralView,
    SupportView,
    Triple9IntroModal,
    AccountSettingsModal,
} from '@/components/welcome';
import type {
    StorRecord,
    RiwayatFilter,
    EwalletType,
    TransactionRecord,
} from '@/components/welcome';
import type { AdminSetoranItem, AdminPayoutItem, PlatformSettings } from '@/components/admin/types';
import {
    formatRupiah,
    getStoredSetoran,
    saveStoredSetoran,
    getStoredPayouts,
    saveStoredPayouts,
    getStoredUsers,
    saveStoredUsers,
    getStoredSettings,
    getStoredUserBalance,
    saveStoredUserBalance,
    getStoredUserTransactions,
    saveStoredUserTransactions,
    addStoredNotification,
    filterUserSetoran,
    subscribeToSync,
    SYNC_EVENTS,
} from '@/lib/shared-store';

export default function Welcome() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const user = auth?.user || {
        id: 10,
        name: 'Hawwin Ramadhan',
        email: 'firstxyz0@gmail.com',
        avatar: '/images/avatar/kucing.png',
        role: 'user' as const,
        email_verified_at: null,
        created_at: '2026-10-22T00:00:00.000000Z',
        updated_at: '2026-10-22T00:00:00.000000Z',
    };

    // Navigation state
    const [activeNav, setActiveNav] = useState('dashboard');

    // Balance, E-Wallet & Transactions with localStorage
    const [currentBalance, setCurrentBalance] = useState<number>(() => getStoredUserBalance(0));
    const [isSaldoVisible, setIsSaldoVisible] = useState(true);
    const [selectedEwallet, setSelectedEwallet] = useState<EwalletType>('DANA');
    const [platformSettings, setPlatformSettings] = useState<PlatformSettings>(() => getStoredSettings());

    const [savedEwalletNumbers, setSavedEwalletNumbers] = useState<Record<string, string>>(() => {
        try {
            const saved = localStorage.getItem('triple9_saved_ewallets');
            if (saved) return JSON.parse(saved);
        } catch {
            // ignore
        }
        return {
            DANA: '',
            OVO: '',
            GoPay: '',
            ShopeePay: '',
        };
    });

    const [savedEwalletNames, setSavedEwalletNames] = useState<Record<string, string>>(() => {
        try {
            const saved = localStorage.getItem('triple9_saved_ewallet_names');
            if (saved) return JSON.parse(saved);
        } catch {
            // ignore
        }
        return {
            DANA: 'Hawwin Ramadhan',
            OVO: '',
            GoPay: '',
            ShopeePay: '',
        };
    });

    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
    const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] = useState(false);
    const [transactionHistory, setTransactionHistory] = useState<TransactionRecord[]>(() =>
        getStoredUserTransactions()
    );

    // Stor Akun History synced with admin setoran list
    const [storHistory, setStorHistory] = useState<StorRecord[]>(() =>
        filterUserSetoran(getStoredSetoran(), user.email, user.id)
    );
    const [riwayatFilter, setRiwayatFilter] = useState<RiwayatFilter>('all');

    // Real-time synchronization across browser tabs and same-window events
    useEffect(() => {
        const syncAllData = () => {
            setCurrentBalance(getStoredUserBalance(0));
            setTransactionHistory(getStoredUserTransactions());
            setStorHistory(filterUserSetoran(getStoredSetoran(), user.email, user.id));
            setPlatformSettings(getStoredSettings());
        };

        const unsubscribe = subscribeToSync(
            [
                SYNC_EVENTS.SETORAN,
                SYNC_EVENTS.PAYOUTS,
                SYNC_EVENTS.USERS,
                SYNC_EVENTS.SETTINGS,
                SYNC_EVENTS.BALANCE,
                SYNC_EVENTS.NOTIFICATIONS,
            ],
            syncAllData
        );
        return unsubscribe;
    }, [user.email, user.id]);

    useEffect(() => {
        try {
            const hasSeen = localStorage.getItem('triple9_intro_seen');
            if (!hasSeen) {
                setIsIntroModalOpen(true);
            }
        } catch {
            // ignore
        }
    }, []);

    const activeItemLabel = allNavItems.find((n) => n.id === activeNav)?.label || 'Dashboard';

    const handleSelectNav = (id: string) => {
        setActiveNav(id);
    };

    // Front-end deposit handler: syncs into shared admin setoran store
    const handleAddStorRecords = (newRecords: StorRecord[]) => {
        const curSettings = getStoredSettings();
        const currentRate = curSettings.gmailRate || 5000;
        const todayStr = new Date().toISOString().split('T')[0];
        const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':');
        const batchCode = `BATCH-${todayStr.replace(/-/g, '').slice(2)}-${Math.floor(10 + Math.random() * 90)}`;

        const newAdminItems: AdminSetoranItem[] = newRecords.map((r, idx) => ({
            id: r.id && r.id.startsWith('SET-') ? r.id : `SET-${Date.now()}-${idx}`,
            userId: user.id || 10,
            userName: user.name || 'Hawwin Ramadhan',
            userEmail: user.email || 'firstxyz0@gmail.com',
            userAvatar: user.avatar || '/images/avatar/kucing.png',
            email: r.email,
            password: r.room,
            date: todayStr,
            time: timeStr,
            status: 'pending',
            reward: r.reward || currentRate,
            batchId: batchCode,
            note: '-',
        }));

        const currentStored = getStoredSetoran();
        const updatedStored = [...newAdminItems, ...currentStored];
        saveStoredSetoran(updatedStored);
        setStorHistory(filterUserSetoran(updatedStored, user.email, user.id));

        // Ensure user is in stored users list
        const currentUsers = getStoredUsers();
        const userExists = currentUsers.some((u) => u.id === user.id || u.email === user.email);
        if (!userExists) {
            const nextUsers = [
                ...currentUsers,
                {
                    id: user.id || 10,
                    name: user.name || 'Hawwin Ramadhan',
                    email: user.email || 'firstxyz0@gmail.com',
                    avatar: user.avatar || '/images/avatar/kucing.png',
                    role: (user.role || 'user') as 'admin' | 'user',
                    totalSetoran: newRecords.length,
                    currentBalance: getStoredUserBalance(0),
                    joinedDate: todayStr,
                    status: 'active' as const,
                },
            ];
            saveStoredUsers(nextUsers);
        }

        addStoredNotification({
            title: 'Setoran Akun Terkirim',
            message: `Berhasil mengirim ${newRecords.length} akun Gmail (PW: ${newRecords[0]?.room || 'triple9'}). Sedang menunggu verifikasi tim audit.`,
            type: 'system',
            actionNav: 'riwayat',
        });
    };

    const handleSaveEwalletNumber = (wallet: EwalletType, number: string, name?: string) => {
        setSavedEwalletNumbers((prev) => {
            const next = {
                ...prev,
                [wallet]: number,
            };
            try {
                localStorage.setItem('triple9_saved_ewallets', JSON.stringify(next));
            } catch {
                // ignore
            }
            return next;
        });
        if (name !== undefined) {
            setSavedEwalletNames((prev) => {
                const next = {
                    ...prev,
                    [wallet]: name,
                };
                try {
                    localStorage.setItem('triple9_saved_ewallet_names', JSON.stringify(next));
                } catch {
                    // ignore
                }
                return next;
            });
        }
    };

    // Front-end withdrawal handler: deducts balance, inserts into admin payouts list & user history
    const handleWithdraw = (amount: number, account: string, accountName?: string) => {
        const nextBalance = currentBalance - amount;
        setCurrentBalance(nextBalance);
        saveStoredUserBalance(nextBalance);

        // Update user balance in admin users list as well
        const curUsers = getStoredUsers();
        const nextUsers = curUsers.map((u) =>
            u.id === (user.id || 10) ? { ...u, currentBalance: nextBalance } : u
        );
        saveStoredUsers(nextUsers);

        const todayStr = new Date().toISOString().split('T')[0];
        const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':');
        const newPayoutId = `TRX-WD-${Date.now()}`;
        const newPayoutItem: AdminPayoutItem = {
            id: newPayoutId,
            userId: user.id || 10,
            userName: user.name || 'Hawwin Ramadhan',
            userEmail: user.email || 'firstxyz0@gmail.com',
            userAvatar: user.avatar || '/images/avatar/kucing.png',
            method: selectedEwallet,
            accountName: accountName || 'Hawwin Ramadhan',
            accountNumber: account,
            amount: amount,
            date: todayStr,
            time: timeStr,
            status: 'pending',
            note: '-',
        };

        const curPayouts = getStoredPayouts();
        saveStoredPayouts([newPayoutItem, ...curPayouts]);

        const descStr = accountName
            ? `Tarik Saldo ke ${selectedEwallet} (${account} a.n ${accountName})`
            : `Tarik Saldo ke ${selectedEwallet} (${account})`;

        const newTx: TransactionRecord = {
            date: todayStr,
            desc: descStr,
            amount: -amount,
            balance: nextBalance,
            status: 'pending',
            note: '-',
            method: selectedEwallet,
            accountNumber: account,
            accountName: accountName,
        };

        const nextTxList = [newTx, ...getStoredUserTransactions()];
        setTransactionHistory(nextTxList);
        saveStoredUserTransactions(nextTxList);

        addStoredNotification({
            title: 'Pengajuan Penarikan Saldo',
            message: `Pengajuan penarikan ${formatRupiah(amount)} ke ${selectedEwallet} (${account}) berhasil diajukan dan sedang diproses admin.`,
            type: 'wallet',
            actionNav: 'saldo',
        });
    };

    const handleNavigateToRiwayat = (filter: RiwayatFilter) => {
        setRiwayatFilter(filter);
        setActiveNav('riwayat');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCloseIntroModal = () => {
        setIsIntroModalOpen(false);
        try {
            localStorage.setItem('triple9_intro_seen', 'true');
        } catch {
            // ignore
        }
    };

    return (
        <>
            <Head title={`${activeItemLabel} — Triple9`} />

            {/* Main Application Shell using Paper Beige Neo-Brutalist Canvas */}
            <SidebarProvider defaultOpen={true} className="bg-[#F5F5DC] min-h-screen text-black font-sans">
                {/* SIDEBAR */}
                <WelcomeSidebar
                    user={user}
                    activeNav={activeNav}
                    onSelectNav={handleSelectNav}
                    onOpenAccountSettings={() => setIsAccountSettingsModalOpen(true)}
                />

                {/* INSET MAIN CONTENT AREA */}
                <SidebarInset className="min-w-0 overflow-x-clip bg-[#F5F5DC] flex flex-col flex-1 min-h-screen">
                    {/* TOP HEADER */}
                    <WelcomeHeader
                        user={user}
                        activeItemLabel={activeItemLabel}
                        onNavigate={handleSelectNav}
                        onOpenAccountSettings={() => setIsAccountSettingsModalOpen(true)}
                        onOpenIntroModal={() => setIsIntroModalOpen(true)}
                    />

                    {/* DASHBOARD PAGE CONTENT CANVAS */}
                    <div className="flex-1 p-4 sm:p-6 lg:p-7 bg-[#F5F5DC]">
                        <div className="max-w-7xl w-full mx-auto space-y-6 pb-12">
                            {/* 1. DASHBOARD VIEW */}
                            {activeNav === 'dashboard' && (
                                <DashboardView
                                    currentBalance={currentBalance}
                                    isSaldoVisible={isSaldoVisible}
                                    onToggleSaldo={() => setIsSaldoVisible(!isSaldoVisible)}
                                    storHistory={storHistory}
                                    onNavigate={handleSelectNav}
                                    onNavigateToRiwayat={handleNavigateToRiwayat}
                                    onOpenWithdrawModal={() => setIsWithdrawModalOpen(true)}
                                    onOpenIntroModal={() => setIsIntroModalOpen(true)}
                                />
                            )}

                            {/* 2. STOR VIEW */}
                            {activeNav === 'stor' && (
                                <StorView
                                    onNavigateToRules={() => handleSelectNav('rules')}
                                    onAddStorRecords={handleAddStorRecords}
                                    gmailRate={platformSettings?.gmailRate || 5000}
                                />
                            )}

                            {/* 3. SALDO VIEW */}
                            {activeNav === 'saldo' && (
                                <SaldoView
                                    currentBalance={currentBalance}
                                    isSaldoVisible={isSaldoVisible}
                                    onToggleSaldo={() => setIsSaldoVisible(!isSaldoVisible)}
                                    selectedEwallet={selectedEwallet}
                                    onChangeEwallet={setSelectedEwallet}
                                    savedEwalletNumbers={savedEwalletNumbers}
                                    savedEwalletNames={savedEwalletNames}
                                    onSaveEwalletNumber={handleSaveEwalletNumber}
                                    transactionHistory={transactionHistory}
                                    onWithdraw={handleWithdraw}
                                    isWithdrawModalOpen={isWithdrawModalOpen}
                                    onSetWithdrawModalOpen={setIsWithdrawModalOpen}
                                    minWithdraw={platformSettings?.minWithdraw || 10000}
                                />
                            )}

                            {/* 4. CHECKER VIEW */}
                            {activeNav === 'checker' && <CheckerView />}

                            {/* 5. RIWAYAT VIEW */}
                            {activeNav === 'riwayat' && (
                                <RiwayatView
                                    storHistory={storHistory}
                                    riwayatFilter={riwayatFilter}
                                    onChangeRiwayatFilter={setRiwayatFilter}
                                />
                            )}

                            {/* 6. RULES VIEW */}
                            {activeNav === 'rules' && (
                                <RulesView onNavigateToStor={() => handleSelectNav('stor')} />
                            )}

                            {/* 7. LEADERBOARD VIEW */}
                            {activeNav === 'leaderboard' && <LeaderboardView user={user} />}

                            {/* 9. KOMUNITAS VIEW */}
                            {activeNav === 'komunitas' && <KomunitasView />}

                            {/* 10. REFERRAL VIEW */}
                            {activeNav === 'referral' && <ReferralView />}

                            {/* 11. SUPPORT VIEW */}
                            {activeNav === 'support' && (
                                <SupportView
                                    userName={user?.name}
                                    userEmail={user?.email}
                                    onNavigate={handleSelectNav}
                                />
                            )}
                        </div>
                    </div>
                </SidebarInset>

                {/* TRIPLE9 INTRODUCTION POPUP MODAL */}
                <Triple9IntroModal
                    isOpen={isIntroModalOpen}
                    onClose={handleCloseIntroModal}
                    onNavigate={handleSelectNav}
                />

                {/* ACCOUNT SETTINGS POPUP MODAL */}
                <AccountSettingsModal
                    isOpen={isAccountSettingsModalOpen}
                    onClose={() => setIsAccountSettingsModalOpen(false)}
                    user={user}
                    selectedEwallet={selectedEwallet}
                    onChangeEwallet={setSelectedEwallet}
                    savedEwalletNumbers={savedEwalletNumbers}
                    onSaveEwalletNumber={handleSaveEwalletNumber}
                />
            </SidebarProvider>
        </>
    );
}
