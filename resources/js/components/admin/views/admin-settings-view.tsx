import type { PlatformSettings } from '../types';

interface AdminSettingsViewProps {
    settings?: PlatformSettings;
    onSaveSettings?: (newSettings: PlatformSettings) => void;
}

export function AdminSettingsView(_props?: AdminSettingsViewProps) {
    return (
        <div className="rounded-md border-[3px] border-black bg-white p-12 shadow-[8px_8px_0px_0px_#000000] flex flex-col items-center justify-center text-center min-h-[360px] space-y-3">
            <div className="size-14 rounded-sm border-2 border-black bg-[#F5F5DC] shadow-[3px_3px_0px_0px_#000000] flex items-center justify-center">
                <img src="/images/icon/gear.png" alt="Pengaturan" className="size-7 object-contain" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-wider text-black">
                Pengaturan Sistem
            </h3>
            <p className="text-xs font-bold text-neutral-500 max-w-sm">
                Konten pengaturan sistem saat ini dikosongkan.
            </p>
        </div>
    );
}
