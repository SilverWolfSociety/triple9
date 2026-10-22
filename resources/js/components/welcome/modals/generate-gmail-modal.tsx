import { useState } from 'react';
import { X, Check } from 'lucide-react';

interface GenerateGmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    generatedGmails: string[];
    generateCount?: number;
    isGenerating?: boolean;
    onRegenerate?: (count: number) => void;
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-in fade-in duration-150">
            <div className="relative w-full max-w-lg rounded-md bg-white border-[3px] border-black p-6 shadow-[10px_10px_0px_0px_#000000] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                            <img src="/images/icon/generate.png" alt="Generate" className="h-4 w-4 object-contain shrink-0" />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-wider text-black">
                            Stok Nama Gmail
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-sm border-2 border-black bg-white hover:bg-[#FF00FF] shadow-[2px_2px_0px_0px_#000000] transition cursor-pointer text-black"
                    >
                        <X className="h-4 w-4 stroke-[3]" />
                    </button>
                </div>

                {/* List of generated Gmails */}
                <div className="max-h-60 overflow-y-auto no-scrollbar space-y-2 rounded-sm border-2 border-black bg-[#F5F5DC] p-3 text-xs">
                    {generatedGmails.map((email, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between p-2.5 rounded-sm bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000000]"
                        >
                            <span className="text-black font-mono font-bold select-all">
                                {email}
                            </span>
                            <button
                                type="button"
                                onClick={() => copyToClipboard(email, idx)}
                                title="Salin Email"
                                className="h-7 w-7 inline-flex items-center justify-center rounded-sm border-2 border-black bg-white hover:bg-[#00C2CB] shadow-[1px_1px_0px_0px_#000000] transition cursor-pointer"
                            >
                                {copiedIndex === idx ? (
                                    <Check className="h-3.5 w-3.5 text-black stroke-[3]" />
                                ) : (
                                    <img
                                        src="/images/icon/copy.png"
                                        alt="Salin"
                                        className="h-3.5 w-3.5 object-contain shrink-0"
                                    />
                                )}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 border-t-2 border-black">
                    <button
                        type="button"
                        onClick={() => copyToClipboard(generatedGmails.join('\n'))}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md text-xs font-black uppercase tracking-wider border-2 border-black bg-white hover:bg-[#F5F5DC] text-black shadow-[2px_2px_0px_0px_#000000] transition cursor-pointer"
                    >
                        {copiedAll ? (
                            <Check className="h-4 w-4 text-black stroke-[3]" />
                        ) : (
                            <>
                                <img
                                    src="/images/icon/copy.png"
                                    alt="Salin Semua"
                                    className="h-4 w-4 object-contain shrink-0"
                                />
                                <span>Salin Semua</span>
                            </>
                        )}
                    </button>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={onInsertToForm}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-md text-xs font-black uppercase tracking-wider bg-[#00C2CB] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000000] transition cursor-pointer"
                        >
                            <span>Tempel ke Kolom Storan</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
