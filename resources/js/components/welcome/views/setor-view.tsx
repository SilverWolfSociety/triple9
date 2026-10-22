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
        <div className="w-full space-y-5">
            {/* 1. Header Banner */}
            <div className="rounded-md bg-white border-[3px] border-black px-6 min-h-[70px] shadow-[8px_8px_0px_0px_#000000] flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="size-9 rounded-sm border-2 border-black bg-[#00C2CB] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                        <img src="/images/icon/mail.png" alt="Setor" className="h-5 w-5 object-contain" />
                    </div>
                    <div>
                        <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-black">
                            Setor Akun Gmail
                        </h2>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onNavigateToRules}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs font-black uppercase tracking-wider bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer shrink-0"
                >
                    <img src="/images/icon/notes.png" alt="Rules" className="h-4 w-4 object-contain" />
                    <span>Rules</span>
                </button>
            </div>

            {/* 2. Main 2-Column Split Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* LEFT COLUMN: Main Form & Room Selection (8 cols on lg) */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                    <div className="rounded-md bg-white border-[3px] border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-6">
                        {/* Section 1: Room Selection */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-black flex items-center gap-2">
                                    <span>Pilih Room Password</span>
                                    <span className="text-[11px] font-bold text-neutral-600">
                                        (Wajib sesuai)
                                    </span>
                                </label>
                                <span className="text-xs font-bold font-mono text-black">
                                    Harga: <strong className="font-black bg-[#FFD700] px-1.5 py-0.5 rounded-xs border border-black">Rp5.000 / akun</strong>
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {/* Room 1: triple9 */}
                                <div
                                    onClick={() => setSelectedRoom('triple9')}
                                    className={`rounded-md border-2 border-black p-4 cursor-pointer transition-all flex items-start gap-3.5 ${
                                        selectedRoom === 'triple9'
                                            ? 'bg-[#00C2CB] shadow-[4px_4px_0px_0px_#000000] translate-x-[1px]'
                                            : 'bg-white hover:bg-[#F5F5DC] shadow-[2px_2px_0px_0px_#000000]'
                                    }`}
                                >
                                    <div className="size-8 rounded-xs border-2 border-black bg-white shadow-[1px_1px_0px_0px_#000000] flex items-center justify-center shrink-0 mt-0.5">
                                        <img src="/images/icon/key.png" alt="Key" className="h-4 w-4 object-contain" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-xs sm:text-sm font-black text-black uppercase tracking-wider">
                                                PW: triple9
                                            </h4>
                                            {selectedRoom === 'triple9' && (
                                                <span className="size-5 rounded-xs bg-black text-white flex items-center justify-center">
                                                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs font-bold text-black/80 mt-1">
                                            Untuk Gmail dengan password triple9
                                        </p>
                                        <div className="text-xs font-black font-mono text-black mt-2">
                                            Reward: Rp5.000
                                        </div>
                                    </div>
                                </div>

                                {/* Room 2: 9triple */}
                                <div
                                    onClick={() => setSelectedRoom('9triple')}
                                    className={`rounded-md border-2 border-black p-4 cursor-pointer transition-all flex items-start gap-3.5 ${
                                        selectedRoom === '9triple'
                                            ? 'bg-[#00C2CB] shadow-[4px_4px_0px_0px_#000000] translate-x-[1px]'
                                            : 'bg-white hover:bg-[#F5F5DC] shadow-[2px_2px_0px_0px_#000000]'
                                    }`}
                                >
                                    <div className="size-8 rounded-xs border-2 border-black bg-white shadow-[1px_1px_0px_0px_#000000] flex items-center justify-center shrink-0 mt-0.5">
                                        <img src="/images/icon/key.png" alt="Key" className="h-4 w-4 object-contain" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-xs sm:text-sm font-black text-black uppercase tracking-wider">
                                                PW: 9triple
                                            </h4>
                                            {selectedRoom === '9triple' && (
                                                <span className="size-5 rounded-xs bg-black text-white flex items-center justify-center">
                                                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs font-bold text-black/80 mt-1">
                                            Untuk Gmail dengan password 9triple
                                        </p>
                                        <div className="text-xs font-black font-mono text-black mt-2">
                                            Reward: Rp5.000
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Input Textarea */}
                        <div className="space-y-2.5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-black">
                                    Daftar Akun Gmail
                                </label>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono font-bold bg-[#FFD700] px-2 py-0.5 rounded-xs border border-black text-black">
                                        {uniqueLinesCount} email
                                    </span>
                                    {storInput.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setStorInput('')}
                                            className="inline-flex items-center gap-1 text-xs font-bold text-black border-2 border-black bg-white px-2 py-0.5 rounded-sm hover:bg-[#FF00FF] transition cursor-pointer shadow-[1px_1px_0px_0px_#000000]"
                                        >
                                            <RotateCcw className="h-3 w-3 stroke-[2.5]" />
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
                                className="w-full min-h-[250px] rounded-md border-2 border-black bg-white p-4 text-xs sm:text-sm font-mono text-black placeholder:text-neutral-500 focus:outline-none shadow-[4px_4px_0px_0px_#000000] leading-relaxed transition"
                            />

                            <p className="text-xs font-bold text-neutral-700">
                                Masukkan 1 email per baris tanpa password. Duplikat akan otomatis disaring oleh sistem.
                            </p>
                        </div>

                        {/* Section 3: Summary Bar & Submit */}
                        <div className="pt-4 border-t-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <span className="text-[11px] text-neutral-600 uppercase tracking-wider font-black block">
                                    Estimasi Saldo Diterima
                                </span>
                                <div className="text-xl sm:text-2xl font-black font-mono text-black">
                                    Rp{estimatedReward.toLocaleString('id-ID')}
                                    <span className="text-xs font-bold text-neutral-700 ml-2 font-sans">
                                        ({uniqueLinesCount} akun x Rp5.000)
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleSubmitSetoran}
                                disabled={uniqueLinesCount === 0}
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#00C2CB] text-black font-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all px-6 py-3 text-xs sm:text-sm uppercase tracking-wider cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>Kirim Setoran</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Generate Gmail Tool & Essential Rules (5 cols on lg) */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-5">
                    {/* Card 1: Generate Gmail Tool */}
                    <div className="rounded-md bg-white border-[3px] border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/generate.png" alt="Generate Gmail" className="h-5 w-5 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                    Generate Gmail
                                </h3>
                                <p className="text-xs font-bold text-neutral-700">
                                    Ambil stok nama Gmail unik siap pakai
                                </p>
                            </div>
                        </div>

                        <p className="text-xs font-bold text-neutral-800 leading-relaxed">
                            Gunakan nama yang digenerate oleh sistem untuk mendaftarkan akun Gmail baru agar formatnya valid.
                        </p>

                        {/* Quick count chips */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-wider text-black">
                                Jumlah Akun:
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {[5, 10, 20, 50].map((cnt) => (
                                    <button
                                        key={cnt}
                                        type="button"
                                        onClick={() => setGenerateCount(cnt)}
                                        className={`py-1.5 px-2 rounded-sm text-xs font-black border-2 border-black transition cursor-pointer text-center ${
                                            generateCount === cnt
                                                ? 'bg-black text-[#FFD700] shadow-[2px_2px_0px_0px_#000000]'
                                                : 'bg-white text-black shadow-[1px_1px_0px_0px_#000000] hover:bg-[#F5F5DC]'
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
                            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#FFD700] text-black font-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all py-2.5 px-4 text-xs uppercase tracking-wider cursor-pointer disabled:opacity-60"
                        >
                            <img src="/images/icon/generate.png" alt="Generate" className="h-4 w-4 object-contain shrink-0" />
                            <span>{isGenerating ? 'Menyiapkan...' : `Generate ${generateCount} Gmail`}</span>
                        </button>

                        {/* 3 Step Guide */}
                        <div className="pt-3 border-t-2 border-black space-y-2 text-xs font-bold text-neutral-800">
                            <div className="flex items-start gap-2">
                                <span className="size-4 rounded-xs bg-black text-white flex items-center justify-center text-[10px] font-black shrink-0">1</span>
                                <span>Generate &amp; salin daftar nama Gmail</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="size-4 rounded-xs bg-black text-white flex items-center justify-center text-[10px] font-black shrink-0">2</span>
                                <span>Daftarkan akun dengan password wajib</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="size-4 rounded-xs bg-black text-white flex items-center justify-center text-[10px] font-black shrink-0">3</span>
                                <span>Tempel hasil di form kiri &amp; kirim</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Ketentuan & Rules Singkat */}
                    <div className="rounded-md bg-white border-[3px] border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                        <div className="flex items-center gap-2.5">
                            <div className="size-8 rounded-sm border-2 border-black bg-[#FF00FF] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                                <img src="/images/icon/tatatertib.png" alt="Ketentuan Wajib" className="h-4 w-4 object-contain" />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-wider text-black">
                                Ketentuan Wajib
                            </h3>
                        </div>

                        <div className="space-y-2.5 text-xs font-bold text-neutral-800">
                            <div className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-black shrink-0 mt-0.5 stroke-[3]" />
                                <span>
                                    Password akun wajib <strong className="bg-[#FFD700] px-1 border border-black">triple9</strong> atau <strong className="bg-[#FFD700] px-1 border border-black">9triple</strong>.
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-black shrink-0 mt-0.5 stroke-[3]" />
                                <span>Hanya menerima akun Gmail fresh dan aktif.</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-black shrink-0 mt-0.5 stroke-[3]" />
                                <span>Pastikan tidak ada verifikasi 2 langkah (2FA).</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-black shrink-0 mt-0.5 stroke-[3]" />
                                <span>Saldo otomatis masuk setelah selesai pengecekan admin.</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onNavigateToRules}
                            className="w-full pt-3 border-t-2 border-black inline-flex items-center justify-between text-xs font-black uppercase tracking-wider text-black hover:text-[#00C2CB] transition cursor-pointer"
                        >
                            <span>Pelajari aturan selengkapnya &gt;</span>
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
