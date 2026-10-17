import { useState } from 'react';
import { Gift, Users, Trophy, Check, Copy } from 'lucide-react';

export function ReferralView() {
    const [referralCodeCopied, setReferralCodeCopied] = useState(false);
    const [referralLinkCopied, setReferralLinkCopied] = useState(false);
    const [referralTab, setReferralTab] = useState<'referral' | 'bonus'>('referral');

    const referralCode = 'KEG7QRV0';
    const referralUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/auth?ref=${referralCode}`
        : `https://triple9.com/auth?ref=${referralCode}`;

    const handleCopyCode = () => {
        navigator.clipboard.writeText(referralCode);
        setReferralCodeCopied(true);
        setTimeout(() => setReferralCodeCopied(false), 2000);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralUrl);
        setReferralLinkCopied(true);
        setTimeout(() => setReferralLinkCopied(false), 2000);
    };

    return (
        <div className="w-full space-y-4 sm:space-y-5">
            {/* Header Card */}
            <div className="rounded-2xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-[#27272a] px-5 min-h-[68px] sm:h-18 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 py-3.5 sm:py-0">
                <div className="flex items-center gap-3">
                    <Gift className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0" />
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                        Misi Referral
                    </h2>
                </div>
            </div>

            {/* Mission Card: Undang 20 teman & dapatkan Rp15.000 */}
            <div className="rounded-2xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-[#27272a] p-5 sm:p-6 shadow-xs relative overflow-hidden">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                    Undang 20 teman & dapatkan Rp15.000
                </h2>

                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4">
                    <div className="bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800 rounded-xl p-3 sm:p-3.5">
                        <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Progress Bonus</div>
                        <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">0 / 20</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800 rounded-xl p-3 sm:p-3.5">
                        <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Sisa</div>
                        <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">20 Teman</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800 rounded-xl p-3 sm:p-3.5">
                        <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Bonus</div>
                        <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">Rp15.000</div>
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="h-2 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
                        <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: '0%' }} />
                    </div>
                    <div className="flex justify-end">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">0%</span>
                    </div>
                </div>
            </div>

            {/* 3 Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-2xl bg-white dark:bg-[#09090b] p-4 sm:p-5 border border-slate-200 dark:border-[#27272a] shadow-xs hover:border-slate-300 dark:hover:border-zinc-700 transition">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                        <Users className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                        <span>Total Diundang</span>
                    </div>
                    <div className="mt-2 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        0
                    </div>
                </div>

                <div className="rounded-2xl bg-white dark:bg-[#09090b] p-4 sm:p-5 border border-slate-200 dark:border-[#27272a] shadow-xs hover:border-slate-300 dark:hover:border-zinc-700 transition">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                        <Users className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                        <span>Referral Berhasil</span>
                    </div>
                    <div className="mt-2 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        0
                    </div>
                </div>

                <div className="rounded-2xl bg-white dark:bg-[#09090b] p-4 sm:p-5 border border-slate-200 dark:border-[#27272a] shadow-xs hover:border-slate-300 dark:hover:border-zinc-700 transition">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                        <Trophy className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                        <span>Total Bonus Diterima</span>
                    </div>
                    <div className="mt-2 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Rp0
                    </div>
                </div>
            </div>

            {/* Card: Kode & Link Referral Anda */}
            <div className="rounded-2xl bg-white dark:bg-[#09090b] p-5 sm:p-6 border border-slate-200 dark:border-[#27272a] shadow-xs space-y-3.5">
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    Kode & Link Referral Anda
                </h3>

                {/* Box Kode */}
                <div className="bg-slate-50 dark:bg-zinc-900/60 rounded-xl p-3 sm:p-3.5 border border-slate-200/80 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                        <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                            KODE
                        </div>
                        <div className="text-base sm:text-lg font-bold font-mono tracking-wider text-slate-900 dark:text-white mt-0.5">
                            {referralCode}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleCopyCode}
                        title={referralCodeCopied ? 'Tersalin' : 'Salin Kode'}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 text-xs font-medium text-slate-700 dark:text-slate-200 transition shadow-2xs cursor-pointer active:scale-95 shrink-0"
                    >
                        {referralCodeCopied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-500" />}
                    </button>
                </div>

                {/* Box Link Undangan */}
                <div className="bg-slate-50 dark:bg-zinc-900/60 rounded-xl p-3 sm:p-3.5 border border-slate-200/80 dark:border-zinc-800 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                            LINK UNDANGAN
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 truncate mt-0.5 font-medium">
                            {referralUrl}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleCopyLink}
                        title={referralLinkCopied ? 'Tersalin' : 'Salin Link Undangan'}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 text-xs font-medium text-slate-700 dark:text-slate-200 transition shadow-2xs shrink-0 cursor-pointer active:scale-95"
                    >
                        {referralLinkCopied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-slate-500" />}
                    </button>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Syarat: Teman melakukan stor Gmail pertama yang diterima.
                </p>
            </div>

            {/* Card: Riwayat Tabs & Empty State */}
            <div className="rounded-2xl bg-white dark:bg-[#09090b] p-5 sm:p-6 border border-slate-200 dark:border-[#27272a] shadow-xs space-y-4">
                <div className="flex items-center rounded-xl bg-slate-100 dark:bg-zinc-900/80 p-1 border border-slate-200/60 dark:border-zinc-800">
                    <button
                        type="button"
                        onClick={() => setReferralTab('referral')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            referralTab === 'referral'
                                ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-2xs font-semibold'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                        <span>Riwayat Referral</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setReferralTab('bonus')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            referralTab === 'bonus'
                                ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-2xs font-semibold'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                        <span>Riwayat Bonus</span>
                    </button>
                </div>

                <div className="py-4 sm:py-6 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {referralTab === 'referral' ? (
                        'Belum ada teman yang bergabung menggunakan kode Anda.'
                    ) : (
                        'Belum ada riwayat bonus referral yang diterima.'
                    )}
                </div>
            </div>
        </div>
    );
}
