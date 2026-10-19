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
            <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-7 lg:p-8 shadow-xs space-y-5">
                <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-2.5">
                        <img
                            src="/images/icon/find_checker.png"
                            alt="Email Checker"
                            className="h-6 w-6 object-contain shrink-0"
                        />
                        <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                            Email Checker
                        </h2>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        Periksa status Gmail hasil Generate milik Anda sebelum disetor.
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        Daftar Email
                    </label>

                    <textarea
                        rows={11}
                        value={checkerInput}
                        onChange={(e) => {
                            setCheckerInput(e.target.value);
                            if (checkerResults) setCheckerResults(null);
                        }}
                        placeholder="Masukkan daftar email di sini..."
                        className="w-full min-h-[260px] rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 focus:outline-none transition leading-relaxed shadow-2xs"
                    />

                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {emailCount} email terdeteksi • 1 per baris • maks 100 per cek. Hanya email hasil Generate Gmail milik Anda yang diproses.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                    {/* Mulai Checker Button */}
                    <button
                        type="button"
                        onClick={handleRunChecker}
                        disabled={isChecking}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white px-4 py-2 text-xs font-semibold shadow-xs transition cursor-pointer disabled:opacity-60"
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
                            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-3.5 py-2 text-xs font-medium transition cursor-pointer shadow-2xs"
                        >
                            <img
                                src="/images/icon/copy.png"
                                alt="Salin"
                                className="h-4 w-4 object-contain shrink-0"
                            />
                            <ChevronDown className="h-3 w-3 text-neutral-400" />
                        </button>
                        {isSalinDropdownOpen && (
                            <div className="absolute left-0 mt-1.5 w-40 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-1 shadow-lg z-20 text-xs">
                                <button
                                    type="button"
                                    onClick={handleCopyAll}
                                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-medium cursor-pointer"
                                >
                                    Salin Semua
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCopyValidOnly}
                                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-medium cursor-pointer"
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
                        className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 dark:hover:bg-rose-950/30 text-neutral-700 dark:text-neutral-300 px-3.5 py-2 text-xs font-medium transition cursor-pointer shadow-2xs"
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
                    <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                Hasil Pengecekan ({checkerResults.length} akun)
                            </h4>
                            <div className="flex items-center gap-2 text-xs">
                                <span className="text-emerald-600 font-semibold">
                                    {checkerResults.filter((r) => r.status === 'valid').length} Valid
                                </span>
                                <span className="text-neutral-300 dark:text-neutral-600">•</span>
                                <span className="text-rose-600 font-semibold">
                                    {checkerResults.filter((r) => r.status === 'invalid').length} Tidak Valid
                                </span>
                            </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto no-scrollbar space-y-1.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 p-2 text-xs">
                            {checkerResults.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800"
                                >
                                    <span className="text-neutral-800 dark:text-neutral-200 truncate mr-2 font-medium">
                                        {item.email}
                                    </span>
                                    <span
                                        className={`text-[11px] font-bold uppercase tracking-wider ${
                                            item.status === 'valid'
                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                : 'text-rose-600 dark:text-rose-400'
                                        }`}
                                    >
                                        {item.status === 'valid' ? 'Valid' : 'Gagal'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
