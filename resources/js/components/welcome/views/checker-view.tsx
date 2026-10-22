import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function CheckerView() {
    const [checkerInput, setCheckerInput] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [isSalinDropdownOpen, setIsSalinDropdownOpen] = useState(false);
    const [checkerResults, setCheckerResults] = useState<{ email: string; status: 'valid' | 'invalid' }[] | null>(null);

    const handleRunChecker = () => {
        const lines = checkerInput
            .split('\n')
            .map((l) => l.trim())
            .filter((l) => l.length > 0);

        if (lines.length === 0) {
            alert('Silakan masukkan daftar email terlebih dahulu.');
            return;
        }

        if (lines.length > 100) {
            alert('Maksimal 100 email per kali pengecekan.');
            return;
        }

        setIsChecking(true);
        setTimeout(() => {
            setIsChecking(false);
            const results = lines.map((email) => ({
                email,
                status: email.includes('@') && email.endsWith('@gmail.com') && email.length > 10 ? ('valid' as const) : ('invalid' as const),
            }));
            setCheckerResults(results);
        }, 700);
    };

    const handleCopyAll = () => {
        if (checkerInput.trim()) {
            navigator.clipboard.writeText(checkerInput);
            alert('Daftar email berhasil disalin!');
        } else {
            alert('Tidak ada email untuk disalin.');
        }
        setIsSalinDropdownOpen(false);
    };

    const handleCopyValidOnly = () => {
        const validLines = checkerInput
            .split('\n')
            .map((l) => l.trim())
            .filter((l) => l.endsWith('@gmail.com'));
        if (validLines.length > 0) {
            navigator.clipboard.writeText(validLines.join('\n'));
            alert(`${validLines.length} Gmail disalin!`);
        } else {
            alert('Tidak ada Gmail valid untuk disalin.');
        }
        setIsSalinDropdownOpen(false);
    };

    const handleClear = () => {
        setCheckerInput('');
        setCheckerResults(null);
    };

    const emailCount = checkerInput.split('\n').filter((l) => l.trim().length > 0).length;

    return (
        <div className="w-full space-y-4">
            <div className="rounded-md bg-white border-[3px] border-black p-5 sm:p-7 lg:p-8 shadow-[8px_8px_0px_0px_#000000] space-y-5">
                <div className="pb-4 border-b-2 border-black">
                    <div className="flex items-center gap-3">
                        <div className="size-9 rounded-sm border-2 border-black bg-[#00C2CB] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                            <img
                                src="/images/icon/find_checker.png"
                                alt="Email Checker"
                                className="h-5 w-5 object-contain"
                            />
                        </div>
                        <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-black">
                            Email Checker
                        </h2>
                    </div>
                    <p className="text-xs font-bold text-neutral-700 mt-2">
                        Periksa status Gmail hasil Generate milik Anda sebelum disetor.
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-black uppercase tracking-wider text-black">
                        Daftar Email
                    </label>

                    <textarea
                        rows={11}
                        value={checkerInput}
                        onChange={(e) => {
                            setCheckerInput(e.target.value);
                            if (checkerResults) setCheckerResults(null);
                        }}
                        placeholder="Masukkan daftar email di sini (1 per baris)..."
                        className="w-full min-h-[260px] rounded-sm border-2 border-black bg-white p-4 text-xs sm:text-sm font-mono font-bold text-black placeholder:text-neutral-500 shadow-[4px_4px_0px_0px_#000000] focus:outline-none focus:bg-[#F5F5DC] transition leading-relaxed"
                    />

                    <p className="text-[11px] font-bold text-neutral-700">
                        {emailCount} email terdeteksi • 1 per baris • maks 100 per cek. Hanya email hasil Generate Gmail milik Anda yang diproses.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    {/* Mulai Checker Button */}
                    <button
                        type="button"
                        onClick={handleRunChecker}
                        disabled={isChecking}
                        className="inline-flex items-center gap-2 rounded-md bg-[#00C2CB] text-black border-2 border-black px-5 py-2.5 text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition cursor-pointer disabled:opacity-60"
                    >
                        <img
                            src="/images/icon/find_checker.png"
                            alt="Checker"
                            className="h-4 w-4 object-contain shrink-0"
                        />
                        <span>{isChecking ? 'Memeriksa...' : 'Mulai Checker'}</span>
                    </button>

                    {/* Salin Dropdown Button */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsSalinDropdownOpen(!isSalinDropdownOpen)}
                            title="Salin"
                            className="inline-flex items-center gap-1.5 rounded-md border-2 border-black bg-white hover:bg-[#F5F5DC] text-black px-3 py-2.5 text-xs font-black shadow-[4px_4px_0px_0px_#000000] cursor-pointer transition"
                        >
                            <img
                                src="/images/icon/copy.png"
                                alt="Salin"
                                className="h-4 w-4 object-contain shrink-0"
                            />
                            <ChevronDown className="h-3.5 w-3.5 text-black stroke-[3]" />
                        </button>
                        {isSalinDropdownOpen && (
                            <div className="absolute left-0 mt-2 w-44 rounded-sm bg-white border-2 border-black p-1 shadow-[4px_4px_0px_0px_#000000] z-20 text-xs">
                                <button
                                    type="button"
                                    onClick={handleCopyAll}
                                    className="w-full text-left px-3 py-2 rounded-xs font-black text-black hover:bg-[#F5F5DC] cursor-pointer"
                                >
                                    Salin Semua
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCopyValidOnly}
                                    className="w-full text-left px-3 py-2 rounded-xs font-black text-black hover:bg-[#F5F5DC] cursor-pointer"
                                >
                                    Salin Valid Saja
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Hapus Button */}
                    <button
                        type="button"
                        onClick={handleClear}
                        title="Hapus"
                        className="inline-flex items-center gap-1.5 rounded-md border-2 border-black bg-white hover:bg-[#FF00FF] text-black px-4 py-2.5 text-xs font-black shadow-[4px_4px_0px_0px_#000000] cursor-pointer transition"
                    >
                        <img
                            src="/images/icon/trash.png"
                            alt="Hapus"
                            className="h-4 w-4 object-contain shrink-0"
                        />
                    </button>
                </div>

                {/* Checker Results Table if checked */}
                {checkerResults && (
                    <div className="pt-4 border-t-2 border-black space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-black">
                                Hasil Pengecekan ({checkerResults.length} akun)
                            </h4>
                            <div className="flex items-center gap-3 text-xs">
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border border-black bg-[#00C2CB] text-black font-black">
                                    <img
                                        src="/images/icon/checklist.png"
                                        alt="Valid"
                                        className="h-3.5 w-3.5 object-contain shrink-0"
                                    />
                                    <span>{checkerResults.filter((r) => r.status === 'valid').length} Valid</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border border-black bg-[#FF00FF] text-black font-black">
                                    <img
                                        src="/images/icon/reject.png"
                                        alt="Tidak Valid"
                                        className="h-3.5 w-3.5 object-contain shrink-0"
                                    />
                                    <span>{checkerResults.filter((r) => r.status === 'invalid').length} Tidak Valid</span>
                                </span>
                            </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto no-scrollbar space-y-2 rounded-sm border-2 border-black bg-[#F5F5DC] p-3 text-xs">
                            {checkerResults.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-2.5 rounded-sm bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000000]"
                                >
                                    <span className="text-black font-mono font-bold truncate mr-2">
                                        {item.email}
                                    </span>
                                    {item.status === 'valid' ? (
                                        <span className="shrink-0 px-2 py-0.5 rounded-xs border border-black bg-[#00C2CB] text-black font-black text-[10px] uppercase">
                                            Valid
                                        </span>
                                    ) : (
                                        <span className="shrink-0 px-2 py-0.5 rounded-xs border border-black bg-[#FF00FF] text-black font-black text-[10px] uppercase">
                                            Invalid
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
