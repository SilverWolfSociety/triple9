import { useState } from 'react';
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
            {/* Banner Rules: Cek Rules dulu sebelum setor */}
            <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 px-5 min-h-[68px] sm:h-18 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 py-3.5 sm:py-0">
                <div className="flex items-center gap-3">
                    <img src="/images/icon/notes.png" alt="Notes" className="h-6 w-6 object-contain shrink-0" />
                    <div>
                        <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                            Cek rules dulu sebelum setor gmail
                        </h2>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onNavigateToRules}
                    className="self-start sm:self-auto inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white shadow-xs transition cursor-pointer"
                >
                    Buka Rules
                </button>
            </div>

            {/* Main Card: Formulir Setor Gmail */}
            <div className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-7 lg:p-8 shadow-xs space-y-5">
                {/* Header Section */}
                <div>
                    <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                        Setor Daftar Gmail
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                        Tempel daftar, satu Gmail per baris. Duplikat otomatis dihapus. Hanya Gmail hasil &ldquo;Generate Gmail&rdquo; milik akun ini yang bisa disetor.
                    </p>
                </div>

                {/* Alert 1: Password Wajib */}
                <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 p-4 text-xs space-y-1.5">
                    <div className="flex items-center gap-2 font-semibold text-neutral-900 dark:text-neutral-100">
                        <img src="/images/icon/key.png" alt="Password" className="h-4 w-4 object-contain shrink-0" />
                        <span>Password wajib untuk Gmail yang disetor:</span>
                    </div>
                    <div className="pl-6 space-y-1">
                        <p className="font-mono font-bold text-neutral-900 dark:text-neutral-100 text-sm tracking-wide">
                            triple9 <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400 font-sans">ATAU</span> 9triple
                        </p>
                        <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                            Pilih Salah satu password &amp; setorkan sesuai Room
                        </p>
                        <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                            Pastikan setiap Gmail menggunakan password di atas. Gmail dengan password berbeda akan ditolak.
                        </p>
                    </div>
                </div>

                {/* Section 2: Generate Gmail Guide & Action */}
                <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 p-4 sm:p-5 space-y-3">
                    <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100 font-bold text-sm">
                        <img src="/images/icon/generate.png" alt="Generate" className="h-4 w-4 object-contain shrink-0" />
                        <span>Generate Gmail</span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        Ambil nama Gmail dari stok yang sudah disiapkan admin, lalu daftarkan akun Gmail asli memakai nama tersebut sebelum disetorkan pada kolom storan di bagian bawah halaman.
                    </p>

                    <ol className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300 list-decimal list-inside pl-0.5">
                        <li>
                            Tekan tombol <strong className="text-neutral-900 dark:text-neutral-100">Generate Gmail</strong> dan pilih jumlah yang Anda butuhkan.
                        </li>
                        <li>Salin nama Gmail satu per satu, atau salin semuanya sekaligus.</li>
                        <li>Daftarkan akun Gmail dengan nama tersebut dan password wajib di atas.</li>
                        <li>Tempel Gmail yang sudah jadi ke kolom storan di bawah, lalu kirim.</li>
                    </ol>

                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 pt-1">
                        Password wajib: <code className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">triple9</code> ATAU <code className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">9triple</code> Pilih Salah satu password &amp; setorkan sesuai Room
                    </p>

                    <div className="pt-1">
                        <button
                            type="button"
                            onClick={() => handleGenerateGmail(generateCount)}
                            disabled={isGenerating}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-2.5 px-4 text-xs sm:text-sm font-semibold shadow-xs transition cursor-pointer disabled:opacity-60"
                        >
                            <img src="/images/icon/generate.png" alt="Generate" className="h-4 w-4 object-contain shrink-0" />
                            <span>{isGenerating ? 'Menyiapkan Stok Akun Gmail...' : 'Generate'}</span>
                        </button>
                    </div>
                </div>

                {/* Section 3: Room Selection Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Room 1 */}
                    <div
                        onClick={() => setSelectedRoom('triple9')}
                        className={`rounded-xl border p-4 cursor-pointer transition flex items-start gap-3.5 bg-white dark:bg-neutral-900 ${selectedRoom === 'triple9'
                            ? 'border-blue-600 dark:border-blue-500 ring-1 ring-blue-600 dark:ring-blue-500 shadow-xs'
                            : 'border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                            }`}
                    >
                        <img src="/images/icon/key.png" alt="Key" className="h-5 w-5 object-contain shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                    PW: triple9
                                </h4>
                                {selectedRoom === 'triple9' && (
                                    <span className="h-2 w-2 shrink-0 aspect-square rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                                )}
                            </div>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                                Untuk Gmail dengan status Good
                            </p>
                            <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 mt-1.5">
                                Harga: Rp5.000
                            </div>
                        </div>
                    </div>

                    {/* Room 2 */}
                    <div
                        onClick={() => setSelectedRoom('9triple')}
                        className={`rounded-xl border p-4 cursor-pointer transition flex items-start gap-3.5 bg-white dark:bg-neutral-900 ${selectedRoom === '9triple'
                            ? 'border-blue-600 dark:border-blue-500 ring-1 ring-blue-600 dark:ring-blue-500 shadow-xs'
                            : 'border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                            }`}
                    >
                        <img src="/images/icon/key.png" alt="Key" className="h-5 w-5 object-contain shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                    PW: 9triple
                                </h4>
                                {selectedRoom === '9triple' && (
                                    <span className="h-2 w-2 shrink-0 aspect-square rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                                )}
                            </div>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                                Untuk Gmail dengan status Good
                            </p>
                            <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 mt-1.5">
                                Harga: Rp5.000
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 4: Textarea Input */}
                <div>
                    <textarea
                        rows={11}
                        value={storInput}
                        onChange={(e) => setStorInput(e.target.value)}
                        placeholder={`triple9@gmail.com\n9triple@gmail.com`}
                        spellCheck={false}
                        className="w-full min-h-[240px] rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 focus:outline-none transition leading-relaxed shadow-2xs"
                    />
                </div>

                {/* Section 5: Footer Actions & Summary */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                    <div className="space-y-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                        <div>
                            Terdeteksi:{' '}
                            <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-tabular-nums">
                                {uniqueLinesCount} baris
                            </span>
                        </div>
                        <div className="text-[11px]">
                            PW:{' '}
                            <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">
                                {selectedRoom}
                            </span>{' '}
                            |{' '}
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                Rp5.000 jika di ACC
                            </span>
                        </div>
                        <div className="text-[11px] text-neutral-400 dark:text-neutral-500">
                            Estimasi pengecekan 24-48 jam.
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmitSetoran}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white px-4 py-2 text-xs font-semibold shadow-xs transition cursor-pointer self-start sm:self-auto"
                    >
                        <span>Kirim Setoran</span>
                    </button>
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
