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

                {/* 7 Rules Cards */}
                <div className="space-y-3 text-xs sm:text-sm text-black">
                    <div className="flex items-start gap-3.5 p-3.5 rounded-sm bg-[#F5F5DC] border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#00C2CB] text-black font-black text-xs shadow-[1px_1px_0px_0px_#000000]">
                            01
                        </span>
                        <div className="pt-0.5">
                            <strong className="text-black font-black">
                                Gmail harus Fresh (baru dibuat).
                            </strong>
                        </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3.5 rounded-sm bg-[#F5F5DC] border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#FFD700] text-black font-black text-xs shadow-[1px_1px_0px_0px_#000000]">
                            02
                        </span>
                        <div className="pt-0.5">
                            <strong className="text-black font-black">
                                Nama Gmail yang didaftarkan wajib sama persis dengan nama Gmail hasil Generate di website.
                            </strong>
                            <p className="text-xs font-bold text-neutral-700 mt-1">
                                Tidak boleh mengubah, menambah, atau mengurangi karakter apa pun.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3.5 rounded-sm bg-[#F5F5DC] border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#FF00FF] text-black font-black text-xs shadow-[1px_1px_0px_0px_#000000]">
                            03
                        </span>
                        <div className="pt-0.5">
                            <strong className="text-black font-black">
                                Tanggal lahir akun Gmail wajib 18 tahun ke atas.
                            </strong>
                        </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3.5 rounded-sm bg-[#F5F5DC] border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-white text-black font-black text-xs shadow-[1px_1px_0px_0px_#000000]">
                            04
                        </span>
                        <div className="pt-0.5">
                            <strong className="text-black font-black">
                                Password Gmail wajib menggunakan: <span className="bg-white px-1.5 py-0.5 border border-black font-mono font-black">triple9</span> ATAU <span className="bg-white px-1.5 py-0.5 border border-black font-mono font-black">9triple</span>
                            </strong>
                            <p className="text-xs font-bold text-neutral-700 mt-1">
                                (Pilih salah satu password room yang aktif)
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3.5 rounded-sm bg-[#F5F5DC] border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#00C2CB] text-black font-black text-xs shadow-[1px_1px_0px_0px_#000000]">
                            05
                        </span>
                        <div className="pt-0.5">
                            <strong className="text-black font-black">
                                Akun tidak boleh ditautkan dengan nomor pemulihan maupun Gmail pemulihan.
                            </strong>
                        </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3.5 rounded-sm bg-[#F5F5DC] border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#FFD700] text-black font-black text-xs shadow-[1px_1px_0px_0px_#000000]">
                            06
                        </span>
                        <div className="pt-0.5">
                            <strong className="text-black font-black">
                                Sebelum melakukan storan, cek status Gmail di{' '}
                                <a
                                    href="https://en.gmailcheck.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black font-black underline bg-white px-1 border border-black hover:bg-[#00C2CB] transition"
                                >
                                    https://en.gmailcheck.com/
                                </a>
                            </strong>
                        </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3.5 rounded-sm bg-[#F5F5DC] border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[#FF00FF] text-black font-black text-xs shadow-[1px_1px_0px_0px_#000000]">
                            07
                        </span>
                        <div className="pt-0.5">
                            <strong className="text-black font-black">
                                Hanya kirim Gmail dengan status Live/Aktif.
                            </strong>
                        </div>
                    </div>
                </div>

                {/* Catatan Box - Neo-brutalist yellow card style */}
                <div className="rounded-md border-2 border-black bg-[#FFD700] p-4 sm:p-5 shadow-[4px_4px_0px_0px_#000000] space-y-2 text-xs sm:text-sm text-black">
                    <h4 className="font-black text-black uppercase tracking-wider flex items-center gap-2">
                        <img src="/images/icon/checklist.png" alt="Penting" className="h-4 w-4 object-contain shrink-0" />
                        <span>Catatan Penting:</span>
                    </h4>
                    <ul className="space-y-1.5 list-disc list-inside font-bold text-black pl-1">
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
