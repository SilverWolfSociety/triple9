import { useState } from 'react';
import { X, Check, Copy } from 'lucide-react';

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
            <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-2.5">
                        <img src="/images/icon/generate.png" alt="Generate" className="h-5 w-5 object-contain shrink-0" />
                        <div>
                            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                Stok Nama Gmail
                            </h3>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Quantity selector */}
                <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500 dark:text-neutral-400 font-medium">
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
                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                {/* List of generated Gmails */}
                <div className="max-h-60 overflow-y-auto no-scrollbar space-y-1.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 p-3 text-xs">
                    {generatedGmails.map((email, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800"
                        >
                            <span className="text-neutral-800 dark:text-neutral-200 select-all font-medium">
                                {email}
                            </span>
                            <button
                                type="button"
                                onClick={() => copyToClipboard(email, idx)}
                                className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium text-neutral-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition"
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
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition"
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
