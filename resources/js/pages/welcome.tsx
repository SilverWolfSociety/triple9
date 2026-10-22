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

    // Balance, E-Wallet & Transactions
    const [currentBalance, setCurrentBalance] = useState(20000);
    const [isSaldoVisible, setIsSaldoVisible] = useState(true);
    const [selectedEwallet, setSelectedEwallet] = useState<EwalletType>('DANA');
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
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
    const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] = useState(false);
    const [transactionHistory, setTransactionHistory] = useState<TransactionRecord[]>([]);

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

    // Stor Akun History with demo item matching Neo-Brutalist specification
    const [storHistory, setStorHistory] = useState<StorRecord[]>([
        {
            id: 'stor-demo-1',
            email: 'frt12@gmail.com',
            room: 'triple9',
            date: '2026-10-22',
            status: 'pending',
            reward: 5000,
        },
    ]);
    const [riwayatFilter, setRiwayatFilter] = useState<RiwayatFilter>('all');

    const activeItemLabel = allNavItems.find((n) => n.id === activeNav)?.label || 'Dashboard';

    const handleSelectNav = (id: string) => {
        setActiveNav(id);
    };

    const handleAddStorRecords = (newRecords: StorRecord[]) => {
        setStorHistory((prev) => [...newRecords, ...prev]);
    };

    const handleSaveEwalletNumber = (wallet: EwalletType, number: string) => {
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
    };

    const handleWithdraw = (amount: number, account: string) => {
        setCurrentBalance((prev) => prev - amount);
        const todayStr = new Date().toISOString().split('T')[0];
        setTransactionHistory((prev) => [
            {
                date: todayStr,
                desc: `Tarik Saldo ke ${selectedEwallet} (${account})`,
                amount: -amount,
                balance: currentBalance - amount,
                status: 'complete',
            },
            ...prev,
        ]);
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
                                onSaveEwalletNumber={handleSaveEwalletNumber}
                                transactionHistory={transactionHistory}
                                onWithdraw={handleWithdraw}
                                isWithdrawModalOpen={isWithdrawModalOpen}
                                onSetWithdrawModalOpen={setIsWithdrawModalOpen}
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
                            <SupportView userName={user?.name} userEmail={user?.email} />
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
