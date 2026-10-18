import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { useAppearance } from '@/hooks/use-appearance';
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
    LaporanView,
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
    const user = auth?.user;
    const { resolvedAppearance, updateAppearance } = useAppearance();

    // Navigation state
    const [activeNav, setActiveNav] = useState('dashboard');

    // Balance, E-Wallet & Transactions
    const [currentBalance, setCurrentBalance] = useState(20000);
    const [isSaldoVisible, setIsSaldoVisible] = useState(true);
    const [selectedEwallet, setSelectedEwallet] = useState<EwalletType>('DANA');
    const [savedEwalletNumbers, setSavedEwalletNumbers] = useState<Record<string, string>>({
        DANA: '',
        OVO: '',
        GoPay: '',
        ShopeePay: '',
    });
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isIntroModalOpen, setIsIntroModalOpen] = useState(true);
    const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] = useState(false);
    const [transactionHistory, setTransactionHistory] = useState<TransactionRecord[]>([]);

    // Stor Akun History
    const [storHistory, setStorHistory] = useState<StorRecord[]>([]);
    const [riwayatFilter, setRiwayatFilter] = useState<RiwayatFilter>('all');

    const activeItemLabel = allNavItems.find((n) => n.id === activeNav)?.label || 'Dashboard';

    const handleSelectNav = (id: string) => {
        setActiveNav(id);
    };

    const handleToggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    const handleAddStorRecords = (newRecords: StorRecord[]) => {
        setStorHistory((prev) => [...newRecords, ...prev]);
    };

    const handleSaveEwalletNumber = (wallet: EwalletType, number: string) => {
        setSavedEwalletNumbers((prev) => ({
            ...prev,
            [wallet]: number,
        }));
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
            },
            ...prev,
        ]);
    };

    const handleNavigateToRiwayat = (filter: RiwayatFilter) => {
        setRiwayatFilter(filter);
        setActiveNav('riwayat');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Head title={`${activeItemLabel} — Triple9`} />

            {/* Main Application Shell using shadcn SidebarProvider & SidebarInset */}
            <SidebarProvider defaultOpen={true} className="bg-sidebar">
                {/* SIDEBAR */}
                <WelcomeSidebar
                    user={user}
                    activeNav={activeNav}
                    onSelectNav={handleSelectNav}
                    onOpenAccountSettings={() => setIsAccountSettingsModalOpen(true)}
                />

                {/* INSET MAIN CONTENT AREA WITH ROUNDED CORNERS & BORDER */}
                <SidebarInset className="min-w-0 overflow-hidden m-2 md:m-2 md:ml-0 rounded-xl border border-sidebar-border/70 shadow-sm bg-background flex flex-col h-[calc(100vh-1rem)]">
                    {/* TOP HEADER */}
                    <WelcomeHeader
                        user={user}
                        activeItemLabel={activeItemLabel}
                        resolvedAppearance={resolvedAppearance}
                        onToggleTheme={handleToggleTheme}
                        onNavigate={handleSelectNav}
                        onOpenAccountSettings={() => setIsAccountSettingsModalOpen(true)}
                    />

                    {/* DASHBOARD PAGE CONTENT */}
                    <div className="flex-1 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden p-4 sm:p-6 lg:p-6">
                        <div className="max-w-7xl w-full mx-auto">
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

                        {/* 7. LAPORAN / TIKET VIEW */}
                        {activeNav === 'laporan' && <LaporanView userName={user?.name} />}

                        {/* 8. LEADERBOARD VIEW */}
                        {activeNav === 'leaderboard' && <LeaderboardView user={user} />}

                        {/* 9. KOMUNITAS VIEW */}
                        {activeNav === 'komunitas' && <KomunitasView />}

                        {/* 10. REFERRAL VIEW */}
                        {activeNav === 'referral' && <ReferralView />}

                        {/* 11. SUPPORT VIEW */}
                        {activeNav === 'support' && <SupportView />}
                        </div>
                    </div>
                </SidebarInset>

                {/* TRIPLE9 INTRODUCTION POPUP MODAL */}
                <Triple9IntroModal
                    isOpen={isIntroModalOpen}
                    onClose={() => setIsIntroModalOpen(false)}
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
