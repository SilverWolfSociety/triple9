import { useEffect, useState } from 'react';
import type { SystemRuleItem } from '@/components/admin';

interface RulesViewProps {
    onNavigateToStor: () => void;
}

const defaultRules: SystemRuleItem[] = [
    {
        id: 'rule-1',
        number: '01',
        title: 'Gmail harus Fresh (baru dibuat).',
        description: 'Akun Gmail yang disetorkan harus akun baru tanpa riwayat aktivitas.',
        badgeColor: '#00C2CB',
        isActive: true,
    },
    {
        id: 'rule-2',
        number: '02',
        title: 'Nama Gmail yang didaftarkan wajib sama persis dengan nama Gmail hasil Generate di website.',
        description: 'Tidak boleh mengubah, menambah, atau mengurangi karakter apa pun.',
        badgeColor: '#FFD700',
        isActive: true,
    },
    {
        id: 'rule-3',
        number: '03',
        title: 'Tanggal lahir akun Gmail wajib 18 tahun ke atas.',
        description: 'Pastikan tahun kelahiran akun diatur agar umur minimal 18 tahun saat pendaftaran.',
        badgeColor: '#FF00FF',
        isActive: true,
    },
    {
        id: 'rule-4',
        number: '04',
        title: 'Password Gmail wajib menggunakan: triple9 ATAU 9triple',
        description: '(Pilih salah satu password room yang aktif saat submit setoran)',
        badgeColor: '#FFFFFF',
        isActive: true,
    },
    {
        id: 'rule-5',
        number: '05',
        title: 'Akun tidak boleh ditautkan dengan nomor pemulihan maupun Gmail pemulihan.',
        description: 'Kecuali ditentukan lain oleh admin, pastikan akun bebas verifikasi nomor hp pribadi.',
        badgeColor: '#00C2CB',
        isActive: true,
    },
    {
        id: 'rule-6',
        number: '06',
        title: 'Sebelum melakukan storan, cek status Gmail di https://en.gmailcheck.com/',
        description: 'Gunakan checker untuk memastikan akun masih aktif sebelum dikirim.',
        badgeColor: '#FFD700',
        isActive: true,
    },
    {
        id: 'rule-7',
        number: '07',
        title: 'Hanya kirim Gmail dengan status Live/Aktif.',
        description: 'Akun mati atau salah password otomatis ditolak oleh sistem dan admin.',
        badgeColor: '#FF00FF',
        isActive: true,
    },
];

const defaultNotes: string[] = [
    'Status di checkgmail.online hanya digunakan untuk memastikan Gmail masih aktif, bukan penentu diterima atau ditolaknya Gmail saat pengecekan admin.',
    'Gmail yang tidak sesuai rules atau berbeda dengan hasil Generate di website akan ditolak dan akun dapat diblokir oleh admin.',
    'Reward setoran akan langsung masuk ke saldo akun setelah diverifikasi valid oleh admin (1-24 jam kerja).',
];

export function RulesView({ onNavigateToStor }: RulesViewProps) {
    const [rulesList, setRulesList] = useState<SystemRuleItem[]>(() => {
        try {
            const saved = localStorage.getItem('triple9_rules');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed.rules) && parsed.rules.length > 0) {
                    return parsed.rules;
                }
            }
        } catch { }
        return defaultRules;
    });

    const [notesList, setNotesList] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('triple9_rules');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed.importantNotes) && parsed.importantNotes.length > 0) {
                    return parsed.importantNotes;
                }
            }
        } catch { }
        return defaultNotes;
    });

    // Listen to real-time updates from admin
    useEffect(() => {
        const handleRulesUpdated = (e: any) => {
            if (e.detail?.rules) {
                setRulesList(e.detail.rules);
            }
            if (e.detail?.importantNotes) {
                setNotesList(e.detail.importantNotes);
            }
        };

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'triple9_rules' && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue);
                    if (parsed.rules) setRulesList(parsed.rules);
                    if (parsed.importantNotes) setNotesList(parsed.importantNotes);
                } catch { }
            }
        };

        window.addEventListener('triple9_rules_updated', handleRulesUpdated);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('triple9_rules_updated', handleRulesUpdated);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className="w-full space-y-4 sm:space-y-5">
            {/* Header Card */}
            <div className="rounded-md bg-white border-[3px] border-black px-6 min-h-[70px] shadow-[8px_8px_0px_0px_#000000] flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="size-9 rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center shrink-0">
                        <img src="/images/icon/notes.png" alt="Rules" className="h-5 w-5 object-contain" />
                    </div>
                    <div>
                        <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-black">
                            Rules & Ketentuan Storan Gmail
                        </h2>
                    </div>
                </div>
            </div>

            {/* Main Rules Card */}
            <div className="rounded-md bg-white border-[3px] border-black p-5 sm:p-7 lg:p-8 shadow-[8px_8px_0px_0px_#000000] space-y-6">
                {/* Dynamic Rules Cards */}
                <div className="space-y-3 text-xs sm:text-sm text-black">
                    {rulesList.map((rule, idx) => {
                        const num = rule.number || String(idx + 1).padStart(2, '0');
                        const badgeBg = rule.badgeColor || '#00C2CB';

                        return (
                            <div
                                key={rule.id || `rule-${idx}`}
                                className="flex items-start gap-3.5 p-3.5 rounded-sm bg-[#F5F5DC] border-2 border-black shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[1px] transition"
                            >
                                <span
                                    style={{ backgroundColor: badgeBg }}
                                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-black text-black font-black font-mono text-xs shadow-[1px_1px_0px_0px_#000000]"
                                >
                                    {num}
                                </span>
                                <div className="pt-0.5 flex-1 min-w-0">
                                    <strong className="text-black font-black block leading-snug">
                                        {rule.title}
                                    </strong>
                                    {rule.description && (
                                        <p className="text-xs font-bold text-neutral-700 mt-1 leading-relaxed">
                                            {rule.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Catatan Box - Neo-brutalist yellow card style */}
                {notesList.length > 0 && (
                    <div className="rounded-md border-2 border-black bg-[#FFD700] p-4 sm:p-5 shadow-[4px_4px_0px_0px_#000000] space-y-2 text-xs sm:text-sm text-black">
                        <h4 className="font-black text-black uppercase tracking-wider flex items-center gap-2">
                            <img src="/images/icon/checklist.png" alt="Penting" className="h-4 w-4 object-contain shrink-0" />
                            <span>Catatan Penting:</span>
                        </h4>
                        <ul className="space-y-1.5 list-disc list-inside font-bold text-black pl-1 leading-relaxed">
                            {notesList.map((note, noteIdx) => (
                                <li key={noteIdx}>{note}</li>
                            ))}
                        </ul>
                    </div>
                )}

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
