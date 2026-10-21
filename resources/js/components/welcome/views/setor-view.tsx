import { useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import type { StorRecord, StorRoom } from '../types';
import { GenerateGmailModal } from '../modals/generate-gmail-modal';

interface StorViewProps {
    onNavigateToRules: () => void;
    onAddStorRecords: (records: StorRecord[]) => void;
}

export function StorView({ onNavigateToRules, onAddStorRecords }: StorViewProps) {
    const [selectedRoom, setSelectedRoom] = useState<StorRoom>('triple9');
    const [storInput, setStorInput] = useState('');
    const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
    const [generateCount, setGenerateCount] = useState(5);
    const [generatedGmails, setGeneratedGmails] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateGmail = (count: number) => {
        setIsGenerating(true);
        setTimeout(() => {
            const prefixes = ['triple9', '9triple', 'triple9acc', 'triple9mail', 'user9', 'speed9', 'validmail', 'primeacc'];
            const results: string[] = [];
            for (let i = 0; i < count; i++) {
                const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
                const randNum = Math.floor(100 + Math.random() * 900);
                results.push(`${prefix}${randNum}@gmail.com`);
            }
            setGeneratedGmails(results);
            setIsGenerating(false);
            setIsGenerateModalOpen(true);
        }, 300);
    };

    const insertGeneratedToForm = () => {
        if (generatedGmails.length === 0) return;
        const currentTrimmed = storInput.trim();
        const newContent = currentTrimmed
            ? `${currentTrimmed}\n${generatedGmails.join('\n')}`
            : generatedGmails.join('\n');
        setStorInput(newContent);
        setIsGenerateModalOpen(false);
    };

    const rawLines = storInput
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
    const uniqueLines = Array.from(new Set(rawLines));
    const uniqueLinesCount = uniqueLines.length;
    const estimatedReward = uniqueLinesCount * 5000;

    const handleSubmitSetoran = () => {
        if (uniqueLinesCount > 0) {
            const todayStr = new Date().toISOString().split('T')[0];
            const newRecords: StorRecord[] = uniqueLines.map((email, idx) => ({
                id: `stor-${Date.now()}-${idx}`,
                email,
                room: selectedRoom,
                status: 'pending',
                date: todayStr,
                reward: 5000,
            }));
            onAddStorRecords(newRecords);
            setStorInput('');
            alert(
                `Berhasil mengirim ${uniqueLinesCount} akun Gmail untuk Room PW: ${selectedRoom}!\nStatus pengecekan dapat dipantau di menu Riwayat.`
            );
        } else {
            alert('Silakan masukkan daftar Gmail terlebih dahulu.');
        }
    };

    return (
        <div className="w-full space-y-4 sm:space-y-5">
            {/* 1. Header Banner */}
            <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 px-5 min-h-[68px] sm:h-18 shadow-xs flex items-center justify-between gap-3 sm:gap-4 py-3.5 sm:py-0">
                <div className="flex items-center gap-3">
                    <img src="/images/icon/mail.png" alt="Setor" className="h-6 w-6 object-contain shrink-0" />
                    <div>
                        <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                            Setor Akun Gmail
                        </h2>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onNavigateToRules}
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700/80 text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700 transition cursor-pointer shrink-0"
                >
                    <img src="/images/icon/notes.png" alt="Rules" className="h-4 w-4 object-contain" />
                    <span>Rules</span>
                </button>
            </div>

            {/* 2. Main 2-Column Split Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* LEFT COLUMN: Main Form & Room Selection (8 cols on lg) */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-5">
                    <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-5">
                        {/* Section 1: Room Selection */}
                        <div className="space-y-2.5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                                    <span>Pilih Room Password</span>
                                    <span className="text-[11px] font-normal text-neutral-400">
                                        (Wajib sesuai)
                                    </span>
                                </label>
                                <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                    Harga: <strong className="text-neutral-900 dark:text-neutral-100">Rp5.000 / akun</strong>
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* Room 1: triple9 */}
                                <div
                                    onClick={() => setSelectedRoom('triple9')}
                                    className={`rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 p-4 cursor-pointer transition flex items-start gap-3.5 bg-white dark:bg-neutral-950/40 ${selectedRoom === 'triple9' ? 'shadow-xs' : ''}`}
                                >
                                    <img src="/images/icon/key.png" alt="Key" className="h-5 w-5 object-contain shrink-0 mt-0.5" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                                PW: triple9
                                            </h4>
                                            {selectedRoom === 'triple9' && (
                                                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={2.5} />
                                            )}
                                        </div>
                                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                                            Untuk Gmail dengan password triple9
                                        </p>
                                        <div className="text-[11px] font-semibold text-neutral-900 dark:text-neutral-100 mt-1.5">
                                            Reward: Rp5.000
                                        </div>
                                    </div>
                                </div>

                                {/* Room 2: 9triple */}
                                <div
                                    onClick={() => setSelectedRoom('9triple')}
                                    className={`rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 p-4 cursor-pointer transition flex items-start gap-3.5 bg-white dark:bg-neutral-950/40 ${selectedRoom === '9triple' ? 'shadow-xs' : ''}`}
                                >
                                    <img src="/images/icon/key.png" alt="Key" className="h-5 w-5 object-contain shrink-0 mt-0.5" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                                PW: 9triple
                                            </h4>
                                            {selectedRoom === '9triple' && (
                                                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={2.5} />
                                            )}
                                        </div>
                                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                                            Untuk Gmail dengan password 9triple
                                        </p>
                                        <div className="text-[11px] font-semibold text-neutral-900 dark:text-neutral-100 mt-1.5">
                                            Reward: Rp5.000
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Input Textarea */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                    Daftar Akun Gmail
                                </label>
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                                        {uniqueLinesCount} email terdeteksi
                                    </span>
                                    {storInput.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setStorInput('')}
                                            className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition cursor-pointer"
                                        >
                                            <RotateCcw className="h-3 w-3" />
                                            <span>Reset</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            <textarea
                                rows={12}
                                value={storInput}
                                onChange={(e) => setStorInput(e.target.value)}
                                placeholder={`triple9@gmail.com\n9triple@gmail.com`}
                                spellCheck={false}
                                className="w-full min-h-[250px] rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 focus:outline-none transition leading-relaxed shadow-2xs"
                            />

                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                Masukkan 1 email per baris tanpa password. Duplikat akan otomatis disaring oleh sistem.
                            </p>
                        </div>

                        {/* Section 3: Summary Bar & Submit */}
                        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold block">
                                    Estimasi Saldo Diterima
                                </span>
                                <div className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                                    Rp{estimatedReward.toLocaleString('id-ID')}
                                    <span className="text-xs font-normal text-neutral-400 ml-1.5">
                                        ({uniqueLinesCount} akun x Rp5.000)
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleSubmitSetoran}
                                disabled={uniqueLinesCount === 0}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white px-5 py-2.5 text-xs font-semibold shadow-xs transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>Kirim Setoran</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Generate Gmail Tool & Essential Rules (5 cols on lg) */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-4">
                    {/* Card 1: Generate Gmail Tool */}
                    <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 shadow-xs space-y-4">
                        <div className="flex items-center gap-2.5">
                            <img src="/images/icon/generate.png" alt="Generate Gmail" className="h-6 w-6 object-contain shrink-0" />
                            <div>
                                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                    Generate Gmail
                                </h3>
                                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                    Ambil stok nama Gmail unik siap pakai
                                </p>
                            </div>
                        </div>

                        <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                            Gunakan nama yang digenerate oleh sistem untuk mendaftarkan akun Gmail baru agar formatnya valid.
                        </p>

                        {/* Quick count chips */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
                                Jumlah Akun:
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {[5, 10, 20, 50].map((cnt) => (
                                    <button
                                        key={cnt}
                                        type="button"
                                        onClick={() => setGenerateCount(cnt)}
                                        className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition cursor-pointer text-center ${generateCount === cnt
                                            ? 'border-neutral-400 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
                                            : 'border-neutral-200/80 dark:border-neutral-800/80 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-neutral-500 dark:text-neutral-400'
                                            }`}
                                    >
                                        {cnt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            type="button"
                            onClick={() => handleGenerateGmail(generateCount)}
                            disabled={isGenerating}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-2.5 px-4 text-xs font-semibold shadow-xs transition cursor-pointer disabled:opacity-60"
                        >
                            <img src="/images/icon/generate.png" alt="Generate" className="h-4 w-4 object-contain shrink-0" />
                            <span>{isGenerating ? 'Menyiapkan...' : `Generate ${generateCount} Gmail`}</span>
                        </button>

                        {/* 3 Step Guide */}
                        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 space-y-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                            <div className="flex items-start gap-1.5">
                                <span className="font-semibold text-neutral-600 dark:text-neutral-300 shrink-0">1.</span>
                                <span>Generate &amp; salin daftar nama Gmail</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                                <span className="font-semibold text-neutral-600 dark:text-neutral-300 shrink-0">2.</span>
                                <span>Daftarkan akun dengan password wajib</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                                <span className="font-semibold text-neutral-600 dark:text-neutral-300 shrink-0">3.</span>
                                <span>Tempel hasil di form kiri &amp; kirim</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Ketentuan & Rules Singkat */}
                    <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 shadow-xs space-y-3.5">
                        <div className="flex items-center gap-2">
                            <img src="/images/icon/tatatertib.png" alt="Ketentuan Wajib" className="h-5 w-5 object-contain shrink-0" />
                            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                Ketentuan Wajib
                            </h3>
                        </div>

                        <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                            <div className="flex items-start gap-2">
                                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" strokeWidth={2.5} />
                                <span>
                                    Password akun wajib <strong className="text-neutral-900 dark:text-neutral-100">triple9</strong> atau <strong className="text-neutral-900 dark:text-neutral-100">9triple</strong>.
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" strokeWidth={2.5} />
                                <span>Hanya menerima akun Gmail fresh dan aktif.</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" strokeWidth={2.5} />
                                <span>Pastikan tidak ada verifikasi 2 langkah (2FA).</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" strokeWidth={2.5} />
                                <span>Saldo otomatis masuk setelah selesai pengecekan admin.</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onNavigateToRules}
                            className="w-full pt-2 border-t border-neutral-100 dark:border-neutral-800/80 inline-flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                        >
                            <span>Pelajari aturan selengkapnya</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Popup: Generate Gmail */}
            <GenerateGmailModal
                isOpen={isGenerateModalOpen}
                onClose={() => setIsGenerateModalOpen(false)}
                generatedGmails={generatedGmails}
                generateCount={generateCount}
                isGenerating={isGenerating}
                onRegenerate={(count) => {
                    setGenerateCount(count);
                    handleGenerateGmail(count);
                }}
                onInsertToForm={insertGeneratedToForm}
            />
        </div>
    );
}
