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
        <div className="w-full space-y-5">
            {/* Header Card */}
            <div className="rounded-md bg-white border-[3px] border-black px-6 min-h-[70px] shadow-[8px_8px_0px_0px_#000000] flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                        <img src="/images/icon/gift.png" alt="Referral" className="h-5 w-5 object-contain" />
                    </div>
                    <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-black">
                        Misi Referral
                    </h2>
                </div>
            </div>

            {/* Mission Card: Undang 20 teman & dapatkan Rp50.000 */}
            <div className="rounded-md bg-[#FFD700] border-[3px] border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] relative space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-black">
                        Undang 20 teman & dapatkan Rp50.000
                    </h2>
                    <span className="bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-xs">
                        Bonus Member
                    </span>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-white border-2 border-black rounded-sm p-3 sm:p-3.5 shadow-[3px_3px_0px_0px_#000000]">
                        <div className="text-[11px] font-black uppercase tracking-wider text-neutral-700">Progress Bonus</div>
                        <div className="text-sm sm:text-base font-black font-mono text-black mt-0.5">0 / 20</div>
                    </div>
                    <div className="bg-white border-2 border-black rounded-sm p-3 sm:p-3.5 shadow-[3px_3px_0px_0px_#000000]">
                        <div className="text-[11px] font-black uppercase tracking-wider text-neutral-700">Sisa</div>
                        <div className="text-sm sm:text-base font-black font-mono text-black mt-0.5">20 Teman</div>
                    </div>
                    <div className="bg-white border-2 border-black rounded-sm p-3 sm:p-3.5 shadow-[3px_3px_0px_0px_#000000]">
                        <div className="text-[11px] font-black uppercase tracking-wider text-neutral-700">Bonus</div>
                        <div className="text-sm sm:text-base font-black font-mono text-black mt-0.5">Rp50.000</div>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="h-3.5 w-full bg-white border-2 border-black rounded-xs overflow-hidden">
                        <div className="h-full bg-[#00C2CB] transition-all duration-500" style={{ width: '0%' }} />
                    </div>
                    <div className="flex justify-end">
                        <span className="text-xs font-mono font-black text-black">0% SELESAI</span>
                    </div>
                </div>
            </div>

            {/* 3 Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col justify-between rounded-md bg-white p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000000]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase tracking-wider text-neutral-700">
                            Total Diundang
                        </span>
                        <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                            <img
                                src="/images/icon/person_yellow.png"
                                alt="Total Diundang"
                                className="h-5 w-5 object-contain"
                            />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between mt-2">
                        <span className="text-2xl sm:text-3xl font-black font-mono text-black">
                            0
                        </span>
                    </div>
                </div>

                <div className="flex flex-col justify-between rounded-md bg-white p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000000]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase tracking-wider text-neutral-700">
                            Referral Berhasil
                        </span>
                        <div className="size-9 rounded-sm border-2 border-black bg-[#00C2CB] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                            <img
                                src="/images/icon/person_green.png"
                                alt="Referral Berhasil"
                                className="h-5 w-5 object-contain"
                            />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between mt-2">
                        <span className="text-2xl sm:text-3xl font-black font-mono text-black">
                            0
                        </span>
                    </div>
                </div>

                <div className="flex flex-col justify-between rounded-md bg-white p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000000]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase tracking-wider text-neutral-700">
                            Total Bonus
                        </span>
                        <div className="size-9 rounded-sm border-2 border-black bg-[#FF00FF] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                            <img
                                src="/images/icon/bonus.png"
                                alt="Total Bonus Diterima"
                                className="h-5 w-5 object-contain"
                            />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between mt-2">
                        <span className="text-2xl sm:text-3xl font-black font-mono text-black">
                            Rp0
                        </span>
                    </div>
                </div>
            </div>

            {/* Card: Kode & Link Referral Anda */}
            <div className="rounded-md bg-white p-5 sm:p-6 border-[3px] border-black shadow-[8px_8px_0px_0px_#000000] space-y-4">
                <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-black">
                    Kode & Link Referral Anda
                </h3>

                {/* Box Kode */}
                <div className="bg-[#F5F5DC] rounded-sm p-4 border-2 border-black shadow-[3px_3px_0px_0px_#000000] flex items-center justify-between">
                    <div>
                        <div className="text-[10px] font-black text-neutral-700 tracking-wider uppercase">
                            KODE REFERRAL
                        </div>
                        <div className="text-lg sm:text-xl font-black font-mono tracking-wider text-black mt-0.5">
                            {referralCode}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleCopyCode}
                        title={referralCodeCopied ? 'Tersalin' : 'Salin Kode'}
                        className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition cursor-pointer"
                    >
                        {referralCodeCopied ? (
                            <Check className="h-4 w-4 stroke-[3]" />
                        ) : (
                            <img
                                src="/images/icon/copy.png"
                                alt="Salin Kode"
                                className="h-4 w-4 object-contain"
                            />
                        )}
                    </button>
                </div>

                {/* Box Link Undangan */}
                <div className="bg-[#F5F5DC] rounded-sm p-4 border-2 border-black shadow-[3px_3px_0px_0px_#000000] flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-black text-neutral-700 tracking-wider uppercase">
                            LINK UNDANGAN
                        </div>
                        <div className="text-xs sm:text-sm text-black truncate mt-0.5 font-mono font-bold">
                            {referralUrl}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleCopyLink}
                        title={referralLinkCopied ? 'Tersalin' : 'Salin Link Undangan'}
                        className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition cursor-pointer"
                    >
                        {referralLinkCopied ? (
                            <Check className="h-4 w-4 stroke-[3]" />
                        ) : (
                            <img
                                src="/images/icon/copy.png"
                                alt="Salin Link Undangan"
                                className="h-4 w-4 object-contain"
                            />
                        )}
                    </button>
                </div>

                <p className="text-xs font-bold text-neutral-700">
                    Syarat: Teman melakukan stor Gmail pertama yang telah diterima & terverifikasi admin.
                </p>
            </div>

            {/* Card: Riwayat Tabs & Empty State */}
            <div className="rounded-md bg-white p-5 sm:p-6 border-[3px] border-black shadow-[8px_8px_0px_0px_#000000] space-y-4">
                <div className="flex items-center gap-2 border-b-2 border-black pb-3">
                    <button
                        type="button"
                        onClick={() => setReferralTab('referral')}
                        className={`px-4 py-2 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${referralTab === 'referral'
                                ? 'bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]'
                                : 'bg-white text-black hover:bg-[#F5F5DC]'
                            }`}
                    >
                        Riwayat Referral
                    </button>
                    <button
                        type="button"
                        onClick={() => setReferralTab('bonus')}
                        className={`px-4 py-2 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${referralTab === 'bonus'
                                ? 'bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]'
                                : 'bg-white text-black hover:bg-[#F5F5DC]'
                            }`}
                    >
                        Riwayat Bonus
                    </button>
                </div>

                <div className="py-8 text-center text-xs sm:text-sm font-black text-neutral-600 uppercase tracking-wider bg-[#F5F5DC]/40 border-2 border-dashed border-black rounded-sm">
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
