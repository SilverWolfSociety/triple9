import { useState } from 'react';
import { Check } from 'lucide-react';

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
            <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 px-5 min-h-[68px] sm:h-18 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 py-3.5 sm:py-0">
                <div className="flex items-center gap-3">
                    <img src="/images/icon/gift.png" alt="Referral" className="h-6 w-6 object-contain shrink-0" />
                    <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                        Misi Referral
                    </h2>
                </div>
            </div>

            {/* Mission Card: Undang 20 teman & dapatkan Rp15.000 */}
            <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-xs relative overflow-hidden">
                <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-4 tracking-tight">
                    Undang 20 teman & dapatkan Rp15.000
                </h2>

                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4">
                    <div className="bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-800 rounded-xl p-3 sm:p-3.5">
                        <div className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium">Progress Bonus</div>
                        <div className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">0 / 20</div>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-800 rounded-xl p-3 sm:p-3.5">
                        <div className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium">Sisa</div>
                        <div className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">20 Teman</div>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-800 rounded-xl p-3 sm:p-3.5">
                        <div className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium">Bonus</div>
                        <div className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">Rp15.000</div>
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden p-0.5">
                        <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: '0%' }} />
                    </div>
                    <div className="flex justify-end">
                        <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">0%</span>
                    </div>
                </div>
            </div>

            {/* 3 Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="group flex flex-col justify-between rounded-xl bg-white dark:bg-neutral-900 p-4.5 sm:p-5 border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            Total Diundang
                        </span>
                        <img
                            src="/images/icon/person_yellow.png"
                            alt="Total Diundang"
                            className="h-7 w-7 sm:h-8 sm:w-8 object-contain shrink-0"
                        />
                    </div>
                    <div className="flex items-baseline justify-between mt-1">
                        <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 font-tabular-nums">
                            0
                        </span>
                    </div>
                </div>

                <div className="group flex flex-col justify-between rounded-xl bg-white dark:bg-neutral-900 p-4.5 sm:p-5 border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            Referral Berhasil
                        </span>
                        <img
                            src="/images/icon/person_green.png"
                            alt="Referral Berhasil"
                            className="h-7 w-7 sm:h-8 sm:w-8 object-contain shrink-0"
                        />
                    </div>
                    <div className="flex items-baseline justify-between mt-1">
                        <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 font-tabular-nums">
                            0
                        </span>
                    </div>
                </div>

                <div className="group flex flex-col justify-between rounded-xl bg-white dark:bg-neutral-900 p-4.5 sm:p-5 border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            Total Bonus Diterima
                        </span>
                        <img
                            src="/images/icon/bonus.png"
                            alt="Total Bonus Diterima"
                            className="h-7 w-7 sm:h-8 sm:w-8 object-contain shrink-0"
                        />
                    </div>
                    <div className="flex items-baseline justify-between mt-1">
                        <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 font-tabular-nums">
                            Rp0
                        </span>
                    </div>
                </div>
            </div>

            {/* Card: Kode & Link Referral Anda */}
            <div className="rounded-xl bg-white dark:bg-neutral-900 p-5 sm:p-6 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-3.5">
                <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100">
                    Kode & Link Referral Anda
                </h3>

                {/* Box Kode */}
                <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-3 sm:p-3.5 border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
                    <div>
                        <div className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider uppercase">
                            KODE
                        </div>
                        <div className="text-base sm:text-lg font-bold font-mono tracking-wider text-neutral-900 dark:text-neutral-100 mt-0.5">
                            {referralCode}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleCopyCode}
                        title={referralCodeCopied ? 'Tersalin' : 'Salin Kode'}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-200 transition shadow-2xs cursor-pointer active:scale-95 shrink-0"
                    >
                        {referralCodeCopied ? (
                            <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                            <img
                                src="/images/icon/copy.png"
                                alt="Salin Kode"
                                className="h-4 w-4 object-contain shrink-0"
                            />
                        )}
                    </button>
                </div>

                {/* Box Link Undangan */}
                <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-3 sm:p-3.5 border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <div className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider uppercase">
                            LINK UNDANGAN
                        </div>
                        <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 truncate mt-0.5 font-medium">
                            {referralUrl}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleCopyLink}
                        title={referralLinkCopied ? 'Tersalin' : 'Salin Link Undangan'}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-200 transition shadow-2xs shrink-0 cursor-pointer active:scale-95"
                    >
                        {referralLinkCopied ? (
                            <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                            <img
                                src="/images/icon/copy.png"
                                alt="Salin Link Undangan"
                                className="h-4 w-4 object-contain shrink-0"
                            />
                        )}
                    </button>
                </div>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    Syarat: Teman melakukan stor Gmail pertama yang diterima.
                </p>
            </div>

            {/* Card: Riwayat Tabs & Empty State */}
            <div className="rounded-xl bg-white dark:bg-neutral-900 p-5 sm:p-6 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
                <div className="flex items-center rounded-xl bg-neutral-100 dark:bg-neutral-800/80 p-1 border border-neutral-200/60 dark:border-neutral-700">
                    <button
                        type="button"
                        onClick={() => setReferralTab('referral')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            referralTab === 'referral'
                                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs font-semibold'
                                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                        }`}
                    >
                        <span>Riwayat Referral</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setReferralTab('bonus')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            referralTab === 'bonus'
                                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs font-semibold'
                                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                        }`}
                    >
                        <span>Riwayat Bonus</span>
                    </button>
                </div>

                <div className="py-4 sm:py-6 text-center text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
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
