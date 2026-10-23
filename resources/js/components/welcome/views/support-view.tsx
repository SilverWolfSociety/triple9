import { ExternalLink, ArrowLeft, Clock, ShieldCheck, Zap } from 'lucide-react';

interface SupportViewProps {
    userName?: string;
    userEmail?: string;
    onNavigate?: (id: string) => void;
}

const WHATSAPP_URL =
    'https://wa.me/6281234567890?text=Halo%20Admin%20Triple9,%20saya%20butuh%20bantuan%20terkait%20layanan%20Triple9.';

export function SupportView({ onNavigate }: SupportViewProps) {
    return (
        <div className="w-full space-y-6">
            {/* Header Card */}
            <div className="rounded-md bg-white border-[3px] border-black px-6 min-h-[70px] shadow-[8px_8px_0px_0px_#000000] flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                        <img
                            src="/images/icon/headphone.png"
                            alt="Support"
                            className="h-5 w-5 object-contain"
                        />
                    </div>
                    <div>
                        <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-black">
                            Triple9 Support
                        </h2>
                    </div>
                </div>

                {onNavigate && (
                    <button
                        type="button"
                        onClick={() => onNavigate('dashboard')}
                        className="inline-flex items-center gap-2 rounded-sm border-2 border-black bg-white hover:bg-[#F5F5DC] px-3 py-1.5 text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition cursor-pointer"
                    >
                        <ArrowLeft className="h-3.5 w-3.5 stroke-[2.5]" />
                        <span>Ke Dashboard</span>
                    </button>
                )}
            </div>

            {/* Main WhatsApp Support Container */}
            <div className="rounded-md bg-white border-[3px] border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000000] space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b-2 border-black">
                    <div className="size-14 rounded-sm border-2 border-black bg-[#00C2CB] shadow-[4px_4px_0px_0px_#000000] flex items-center justify-center shrink-0">
                        <img
                            src="/images/icon/whatsapp.png"
                            alt="WhatsApp"
                            className="h-8 w-8 object-contain"
                        />
                    </div>
                    <div className="space-y-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-xs border border-black bg-[#FFD700] text-black font-black text-[10px] uppercase tracking-wider shadow-[1px_1px_0px_0px_#000000]">
                            Respon Cepat 24/7
                        </span>
                        <h3 className="text-lg sm:text-xl font-black uppercase tracking-wider text-black">
                            Butuh Bantuan Cepat?
                        </h3>
                        <p className="text-xs sm:text-sm font-bold text-neutral-700 max-w-2xl leading-relaxed">
                            Hubungi CS WhatsApp kami untuk respon instan seputar kendala akun atau transaksi.
                        </p>
                    </div>
                </div>

                {/* Big WhatsApp CTA Button */}
                <div>
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-md bg-[#00C2CB] hover:bg-[#00a8b0] text-black border-2 border-black px-6 py-4 text-xs sm:text-sm font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition cursor-pointer"
                    >
                        <span>Chat CS WhatsApp (+62 812-3456-7890)</span>
                        <ExternalLink className="h-4 w-4 stroke-[2.5]" />
                    </a>
                </div>

                {/* 3 Info Cards in Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t-2 border-black">
                    <div className="rounded-sm border-2 border-black bg-[#F5F5DC] p-4 shadow-[3px_3px_0px_0px_#000000] space-y-1.5">
                        <div className="flex items-center gap-2 text-black">
                            <Clock className="size-4 stroke-[2.5]" />
                            <h4 className="text-xs font-black uppercase tracking-wider">Jam Operasional</h4>
                        </div>
                        <p className="text-[11px] font-bold text-neutral-700">
                            Aktif setiap hari mulai pukul 08:00 – 22:00 WIB untuk respon langsung.
                        </p>
                    </div>

                    <div className="rounded-sm border-2 border-black bg-[#F5F5DC] p-4 shadow-[3px_3px_0px_0px_#000000] space-y-1.5">
                        <div className="flex items-center gap-2 text-black">
                            <Zap className="size-4 stroke-[2.5]" />
                            <h4 className="text-xs font-black uppercase tracking-wider">Respon Instan</h4>
                        </div>
                        <p className="text-[11px] font-bold text-neutral-700">
                            Rata-rata waktu tunggu kurang dari 5 menit oleh tim support resmi Triple9.
                        </p>
                    </div>

                    <div className="rounded-sm border-2 border-black bg-[#F5F5DC] p-4 shadow-[3px_3px_0px_0px_#000000] space-y-1.5">
                        <div className="flex items-center gap-2 text-black">
                            <ShieldCheck className="size-4 stroke-[2.5]" />
                            <h4 className="text-xs font-black uppercase tracking-wider">Verifikasi Resmi</h4>
                        </div>
                        <p className="text-[11px] font-bold text-neutral-700">
                            Nomor CS terverifikasi: +62 812-3456-7890. Hati-hati terhadap pihak yang mengatasnamakan Triple9.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
