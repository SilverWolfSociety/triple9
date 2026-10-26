import { useState } from 'react';
import {
    ArrowDown,
    ArrowUp,
    Check,
    FileText,
    Plus,
} from 'lucide-react';
import { toast } from 'sonner';
import type { SystemRuleItem } from '../types';

interface AdminRulesTabProps {
    rules: SystemRuleItem[];
    rulesNotes: string[];
    onChangeRules: (newRules: SystemRuleItem[]) => void;
    onChangeNotes: (newNotes: string[]) => void;
    onSaveDirectly?: () => void;
}

const colorPresets = [
    { label: 'Cyan Teal', value: '#00C2CB', bgClass: 'bg-[#00C2CB]' },
    { label: 'Gold Yellow', value: '#FFD700', bgClass: 'bg-[#FFD700]' },
    { label: 'Magenta Pink', value: '#FF00FF', bgClass: 'bg-[#FF00FF]' },
    { label: 'Paper Beige', value: '#F5F5DC', bgClass: 'bg-[#F5F5DC]' },
    { label: 'Lime Green', value: '#A3E635', bgClass: 'bg-[#A3E635]' },
];

export function AdminRulesTab({
    rules,
    rulesNotes,
    onChangeRules,
    onChangeNotes,
    onSaveDirectly,
}: AdminRulesTabProps) {
    const [newNoteInput, setNewNoteInput] = useState('');

    const handleUpdateRule = (index: number, updates: Partial<SystemRuleItem>) => {
        const next = [...rules];
        next[index] = { ...next[index], ...updates };
        onChangeRules(next);
    };

    const handleMoveRule = (index: number, direction: 'up' | 'down') => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === rules.length - 1)
        ) {
            return;
        }
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        const next = [...rules];
        const temp = next[index];
        next[index] = next[targetIndex];
        next[targetIndex] = temp;

        // Auto re-number rules to 01, 02, 03...
        const renumbered = next.map((r, idx) => ({
            ...r,
            number: String(idx + 1).padStart(2, '0'),
        }));

        onChangeRules(renumbered);
        toast.info(`Urutan Rule dipindahkan.`);
    };

    const handleDeleteRule = (index: number) => {
        if (rules.length <= 1) {
            toast.error('Minimal harus ada 1 rule di sistem.');
            return;
        }
        if (confirm(`Hapus Rule ${rules[index].number}: "${rules[index].title}"?`)) {
            const next = rules.filter((_, idx) => idx !== index);
            const renumbered = next.map((r, idx) => ({
                ...r,
                number: String(idx + 1).padStart(2, '0'),
            }));
            onChangeRules(renumbered);
            toast.success('Rule berhasil dihapus.');
        }
    };

    const handleAddRule = () => {
        const nextNum = String(rules.length + 1).padStart(2, '0');
        const colorPalette = ['#00C2CB', '#FFD700', '#FF00FF', '#FFFFFF'];
        const chosenColor = colorPalette[rules.length % colorPalette.length];

        const newRule: SystemRuleItem = {
            id: `rule-${Date.now()}`,
            number: nextNum,
            title: `Aturan Baru #${nextNum}`,
            description: 'Tuliskan deskripsi detail ketentuan di sini.',
            badgeColor: chosenColor,
            isActive: true,
        };

        onChangeRules([...rules, newRule]);
        toast.success(`Rule baru #${nextNum} ditambahkan.`);
    };

    const handleAddNote = () => {
        if (!newNoteInput.trim()) return;
        onChangeNotes([...rulesNotes, newNoteInput.trim()]);
        setNewNoteInput('');
        toast.success('Catatan penting baru ditambahkan.');
    };

    const handleUpdateNote = (index: number, value: string) => {
        const next = [...rulesNotes];
        next[index] = value;
        onChangeNotes(next);
    };

    const handleDeleteNote = (index: number) => {
        onChangeNotes(rulesNotes.filter((_, idx) => idx !== index));
        toast.info('Catatan dihapus.');
    };

    return (
        <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000000] space-y-5">
            {/* Header Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-black">
                <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                        <img src="/images/icon/notes.png" alt="Rules" className="size-5 object-contain" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-wider text-black">
                            Kelola & Edit Rules Storan Gmail
                        </h3>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleAddRule}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm border-2 border-black bg-[#00C2CB] hover:bg-[#00a8b0] text-black text-xs font-black uppercase shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer self-start sm:self-auto"
                >
                    <Plus className="size-3.5 stroke-[3]" />
                    <span>Tambah Rule</span>
                </button>
            </div>

            {/* List of Editable Rules */}
            <div className="space-y-3.5">
                {rules.map((rule, idx) => (
                    <div
                        key={rule.id || `rule-${idx}`}
                        className="rounded-sm border-2 border-black bg-white p-4 shadow-[2px_2px_0px_0px_#000000] space-y-3"
                    >
                        {/* Rule Card Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b-2 border-black">
                            <div className="flex items-center gap-2.5">
                                <span
                                    style={{ backgroundColor: rule.badgeColor || '#00C2CB' }}
                                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black text-black font-black font-mono text-xs shadow-[1px_1px_0px_0px_#000000]"
                                >
                                    {rule.number}
                                </span>
                                <span className="text-xs font-black uppercase text-black">
                                    Aturan Nomor {rule.number}
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                {/* Color Selector Pills */}
                                <div className="flex items-center gap-1 mr-2 bg-[#F5F5DC] p-1 border border-black rounded-xs">
                                    {colorPresets.map((color) => (
                                        <button
                                            key={color.value}
                                            type="button"
                                            title={color.label}
                                            onClick={() => handleUpdateRule(idx, { badgeColor: color.value })}
                                            className={`size-4 rounded-none border border-black cursor-pointer transition ${color.bgClass} ${rule.badgeColor === color.value
                                                ? 'ring-2 ring-black scale-110 shadow-xs'
                                                : 'opacity-70 hover:opacity-100'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Move Up */}
                                <button
                                    type="button"
                                    disabled={idx === 0}
                                    onClick={() => handleMoveRule(idx, 'up')}
                                    title="Pindahkan ke atas"
                                    className="size-7 inline-flex items-center justify-center rounded-xs border border-black bg-white hover:bg-[#F5F5DC] disabled:opacity-30 disabled:cursor-not-allowed shadow-[1px_1px_0px_0px_#000000] cursor-pointer"
                                >
                                    <ArrowUp className="size-3.5 text-black stroke-[3]" />
                                </button>

                                {/* Move Down */}
                                <button
                                    type="button"
                                    disabled={idx === rules.length - 1}
                                    onClick={() => handleMoveRule(idx, 'down')}
                                    title="Pindahkan ke bawah"
                                    className="size-7 inline-flex items-center justify-center rounded-xs border border-black bg-white hover:bg-[#F5F5DC] disabled:opacity-30 disabled:cursor-not-allowed shadow-[1px_1px_0px_0px_#000000] cursor-pointer"
                                >
                                    <ArrowDown className="size-3.5 text-black stroke-[3]" />
                                </button>

                                {/* Delete */}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteRule(idx)}
                                    title="Hapus rule ini"
                                    className="size-7 inline-flex items-center justify-center rounded-xs border border-black bg-rose-100 hover:bg-rose-200 text-rose-700 shadow-[1px_1px_0px_0px_#000000] cursor-pointer ml-1"
                                >
                                    <img src="/images/icon/trash.png" alt="Hapus" className="size-4 object-contain" />
                                </button>
                            </div>
                        </div>

                        {/* Rule Form Fields */}
                        <div className="space-y-2.5">
                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-wider text-black mb-1">
                                    Judul / Poin Aturan
                                </label>
                                <input
                                    type="text"
                                    value={rule.title}
                                    onChange={(e) => handleUpdateRule(idx, { title: e.target.value })}
                                    className="w-full px-3 py-2 border-2 border-black rounded-sm font-bold text-xs sm:text-sm text-black bg-white focus:bg-[#F5F5DC] focus:outline-none shadow-[2px_2px_0px_0px_#000000]"
                                    placeholder="Contoh: Gmail harus Fresh (baru dibuat)."
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-wider text-black mb-1">
                                    Deskripsi Tambahan
                                </label>
                                <textarea
                                    rows={2}
                                    value={rule.description || ''}
                                    onChange={(e) => handleUpdateRule(idx, { description: e.target.value })}
                                    className="w-full px-3 py-2 border-2 border-black rounded-sm font-medium text-xs text-black bg-white focus:bg-[#F5F5DC] focus:outline-none shadow-[2px_2px_0px_0px_#000000]"
                                    placeholder="Contoh: Tidak boleh mengubah, menambah, atau mengurangi karakter apa pun."
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Catatan Penting Section */}
            <div className="rounded-sm border-2 border-black bg-[#FFD700] p-4 sm:p-5 shadow-[3px_3px_0px_0px_#000000] space-y-3.5 pt-4">
                <div className="flex items-center gap-2 pb-2 border-b-2 border-black">
                    <img src="/images/icon/checklist.png" alt="Catatan" className="size-5 object-contain" />
                    <h4 className="text-sm font-black uppercase tracking-wider text-black">
                        Poin-Poin Catatan Penting
                    </h4>
                </div>

                <div className="space-y-2.5">
                    {rulesNotes.map((note, noteIdx) => (
                        <div key={noteIdx} className="flex items-center gap-2 bg-white p-2 border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_#000000]">
                            <span className="font-mono font-black text-xs px-1.5 py-0.5 bg-[#FFD700] border border-black rounded-xs">
                                #{noteIdx + 1}
                            </span>
                            <input
                                type="text"
                                value={note}
                                onChange={(e) => handleUpdateNote(noteIdx, e.target.value)}
                                className="flex-1 font-bold text-xs text-black bg-transparent focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteNote(noteIdx)}
                                className="size-6 inline-flex items-center justify-center rounded-xs hover:bg-rose-100 text-rose-700 cursor-pointer"
                                title="Hapus catatan ini"
                            >
                                <img src="/images/icon/trash.png" alt="Hapus" className="size-3.5 object-contain" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Add new note input */}
                <div className="flex items-center gap-2 pt-2">
                    <input
                        type="text"
                        value={newNoteInput}
                        onChange={(e) => setNewNoteInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                        placeholder="Ketik catatan penting baru lalu klik Tambah..."
                        className="flex-1 px-3 py-2 border-2 border-black rounded-sm bg-white font-bold text-xs text-black focus:outline-none shadow-[2px_2px_0px_0px_#000000]"
                    />
                    <button
                        type="button"
                        onClick={handleAddNote}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-sm border-2 border-black bg-white hover:bg-neutral-100 text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000000] cursor-pointer shrink-0"
                    >
                        <Plus className="size-3.5 stroke-[3]" />
                        <span>Tambah Catatan</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
