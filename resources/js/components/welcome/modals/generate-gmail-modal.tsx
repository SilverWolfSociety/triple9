import { useState } from 'react';
import { Sparkles, X, Check, Copy } from 'lucide-react';

interface GenerateGmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    generatedGmails: string[];
    generateCount: number;
    isGenerating: boolean;
    onRegenerate: (count: number) => void;
    onInsertToForm: () => void;
}

export function GenerateGmailModal({
    isOpen,
    onClose,
    generatedGmails,
    generateCount,
    isGenerating,
    onRegenerate,
    onInsertToForm,
}: GenerateGmailModalProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [copiedAll, setCopiedAll] = useState(false);

    if (!isOpen) return null;

    const copyToClipboard = (text: string, index?: number) => {
        navigator.clipboard.writeText(text);
        if (index !== undefined) {
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 1500);
        } else {
            setCopiedAll(true);
            setTimeout(() => setCopiedAll(false), 1500);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-[#27272a] p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2.5">
                        <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                Stok Nama Gmail
                            </h3>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Quantity selector */}
                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                        Jumlah Generate:
                    </span>
                    <div className="flex items-center gap-1.5">
                        {[5, 10, 20, 50].map((num) => (
                            <button
                                key={num}
                                type="button"
                                disabled={isGenerating}
                                onClick={() => onRegenerate(num)}
                                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${generateCount === num
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-zinc-800'
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                {/* List of generated Gmails */}
                <div className="max-h-60 overflow-y-auto no-scrollbar space-y-1.5 rounded-xl border border-slate-100 dark:border-zinc-800 bg-slate-50/60 dark:bg-[#121215]/40 p-3 text-xs">
                    {generatedGmails.map((email, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#09090b] border border-slate-200/80 dark:border-zinc-800/60"
                        >
                            <span className="text-slate-800 dark:text-slate-200 select-all font-medium">
                                {email}
                            </span>
                            <button
                                type="button"
                                onClick={() => copyToClipboard(email, idx)}
                                className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition"
                            >
                                {copiedIndex === idx ? (
                                    <>
                                        <Check className="h-3 w-3 text-emerald-600" />
                                        <span className="text-emerald-600">Disalin</span>
                                    </>
                                ) : (
                                    <Copy className="h-3 w-3" />
                                )}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2">
                    <button
                        type="button"
                        onClick={() => copyToClipboard(generatedGmails.join('\n'))}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-300 transition"
                    >
                        {copiedAll ? (
                            <>
                                <Check className="h-3.5 w-3.5 text-emerald-600" />
                                <span className="text-emerald-600">Semua Disalin!</span>
                            </>
                        ) : (
                            <>
                                <Copy className="h-3.5 w-3.5" />
                                <span>Salin Semua</span>
                            </>
                        )}
                    </button>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={onInsertToForm}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition"
                        >
                            <span>Tempel ke Kolom Storan</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
