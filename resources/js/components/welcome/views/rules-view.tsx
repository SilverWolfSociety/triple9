import { FileText } from 'lucide-react';

interface RulesViewProps {
    onNavigateToStor: () => void;
}

export function RulesView({ onNavigateToStor }: RulesViewProps) {
    return (
        <div className="w-full space-y-4 sm:space-y-5">
            {/* Header Card */}
            <div className="rounded-2xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-[#27272a] px-5 min-h-[68px] sm:h-18 shadow-xs flex items-center justify-between gap-3 sm:gap-4 py-3.5 sm:py-0">
                <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0" />
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                        Rules Storan Gmail
                    </h2>
                </div>
            </div>

            {/* Main Rules Card */}
            <div className="rounded-2xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-[#27272a] p-5 sm:p-7 lg:p-8 shadow-xs space-y-6">

                {/* 7 Rules List */}
                <ol className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs">
                            1
                        </span>
                        <div className="pt-0.5">
                            <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                                Gmail harus Fresh (baru dibuat).
                            </strong>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs">
                            2
                        </span>
                        <div className="pt-0.5">
                            <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                                Nama Gmail yang didaftarkan wajib sama persis dengan nama Gmail hasil Generate di website.
                            </strong>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                Tidak boleh mengubah, menambah, atau mengurangi karakter apa pun.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs">
                            3
                        </span>
                        <div className="pt-0.5">
                            <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                                Tanggal lahir akun Gmail wajib 18 tahun ke atas.
                            </strong>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs">
                            4
                        </span>
                        <div className="pt-0.5">
                            <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                                Password Gmail wajib menggunakan: <code className="font-mono font-semibold text-slate-900 dark:text-slate-100">zero1122</code> ATAU <code className="font-mono font-semibold text-slate-900 dark:text-slate-100">hehe1122</code>
                            </strong>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                (Pilih salah satu pasword)
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs">
                            5
                        </span>
                        <div className="pt-0.5">
                            <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                                Akun tidak boleh ditautkan dengan nomor pemulihan maupun Gmail pemulihan.
                            </strong>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs">
                            6
                        </span>
                        <div className="pt-0.5">
                            <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                                Sebelum melakukan storan, cek status Gmail di{' '}
                                <a
                                    href="https://en.gmailcheck.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 transition"
                                >
                                    https://en.gmailcheck.com/
                                </a>
                            </strong>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs">
                            7
                        </span>
                        <div className="pt-0.5">
                            <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                                Hanya kirim Gmail dengan status Live/Aktif.
                            </strong>
                        </div>
                    </li>
                </ol>

                {/* Catatan Box */}
                <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-[#121215]/50 p-4 sm:p-5 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">
                        Catatan:
                    </h4>
                    <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm">
                        <li>
                            Status di checkgmail.online hanya digunakan untuk memastikan Gmail masih aktif, bukan penentu diterima atau ditolaknya Gmail saat pengecekan admin.
                        </li>
                        <li>
                            Gmail yang tidak sesuai rules atau berbeda dengan hasil Generate di website akan ditolak dan akun dapat diblokir oleh admin.
                        </li>
                    </ul>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                    <button
                        type="button"
                        onClick={onNavigateToStor}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-3 px-4 text-xs sm:text-sm font-semibold shadow-xs transition cursor-pointer"
                    >
                        <span>Saya sudah paham, lanjut setor</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
