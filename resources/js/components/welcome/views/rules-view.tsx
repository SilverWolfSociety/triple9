interface RulesViewProps {
    onNavigateToStor: () => void;
}

export function RulesView({ onNavigateToStor }: RulesViewProps) {
    return (
        <div className="w-full space-y-4 sm:space-y-5">
            {/* Header Card */}
            <div className="rounded-md bg-white border-[3px] border-black px-6 min-h-[70px] shadow-[8px_8px_0px_0px_#000000] flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                        <img src="/images/icon/notes.png" alt="Rules" className="h-5 w-5 object-contain" />
                    </div>
                    <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-black">
                        Rules Storan Gmail
                    </h2>
                </div>
            </div>

            {/* Main Rules Card */}
            <div className="rounded-md bg-white border-[3px] border-black p-5 sm:p-7 lg:p-8 shadow-[8px_8px_0px_0px_#000000] space-y-6">

                {/* 7 Rules List */}
                <ol className="space-y-4 text-xs sm:text-sm text-black">
                    <li className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#00C2CB] text-black font-black text-xs shadow-[2px_2px_0px_0px_#000000]">
                            1
                        </span>
                        <div className="pt-1">
                            <strong className="text-black font-black">
                                Gmail harus Fresh (baru dibuat).
                            </strong>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#00C2CB] text-black font-black text-xs shadow-[2px_2px_0px_0px_#000000]">
                            2
                        </span>
                        <div className="pt-1">
                            <strong className="text-black font-black">
                                Nama Gmail yang didaftarkan wajib sama persis dengan nama Gmail hasil Generate di website.
                            </strong>
                            <p className="text-xs font-bold text-neutral-700 mt-1">
                                Tidak boleh mengubah, menambah, atau mengurangi karakter apa pun.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#00C2CB] text-black font-black text-xs shadow-[2px_2px_0px_0px_#000000]">
                            3
                        </span>
                        <div className="pt-1">
                            <strong className="text-black font-black">
                                Tanggal lahir akun Gmail wajib 18 tahun ke atas.
                            </strong>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#00C2CB] text-black font-black text-xs shadow-[2px_2px_0px_0px_#000000]">
                            4
                        </span>
                        <div className="pt-1">
                            <strong className="text-black font-black">
                                Password Gmail wajib menggunakan: <span className="bg-[#FFD700] px-1.5 py-0.5 border border-black font-mono font-black">triple9</span> ATAU <span className="bg-[#FFD700] px-1.5 py-0.5 border border-black font-mono font-black">9triple</span>
                            </strong>
                            <p className="text-xs font-bold text-neutral-700 mt-1">
                                (Pilih salah satu password)
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#00C2CB] text-black font-black text-xs shadow-[2px_2px_0px_0px_#000000]">
                            5
                        </span>
                        <div className="pt-1">
                            <strong className="text-black font-black">
                                Akun tidak boleh ditautkan dengan nomor pemulihan maupun Gmail pemulihan.
                            </strong>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#00C2CB] text-black font-black text-xs shadow-[2px_2px_0px_0px_#000000]">
                            6
                        </span>
                        <div className="pt-1">
                            <strong className="text-black font-black">
                                Sebelum melakukan storan, cek status Gmail di{' '}
                                <a
                                    href="https://en.gmailcheck.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black font-black underline bg-[#FFD700] px-1 border border-black hover:bg-[#00C2CB] transition"
                                >
                                    https://en.gmailcheck.com/
                                </a>
                            </strong>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#00C2CB] text-black font-black text-xs shadow-[2px_2px_0px_0px_#000000]">
                            7
                        </span>
                        <div className="pt-1">
                            <strong className="text-black font-black">
                                Hanya kirim Gmail dengan status Live/Aktif.
                            </strong>
                        </div>
                    </li>
                </ol>

                {/* Catatan Box */}
                <div className="rounded-md border-2 border-black bg-[#F5F5DC] p-4 sm:p-5 shadow-[4px_4px_0px_0px_#000000] space-y-2 text-xs sm:text-sm text-black">
                    <h4 className="font-black text-black uppercase tracking-wider">
                        Catatan Penting:
                    </h4>
                    <ul className="space-y-1.5 list-disc list-inside font-bold text-neutral-800">
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
                        className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#00C2CB] text-black border-2 border-black py-3.5 px-4 text-xs sm:text-sm font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
                    >
                        <span>Saya sudah paham, lanjut setor</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
