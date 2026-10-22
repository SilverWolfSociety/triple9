import { usePage } from '@inertiajs/react';

import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo({ showText = true }: { showText?: boolean }) {
    const { name } = usePage().props;

    return (
        <div className="flex items-center gap-2.5">
            <div className="flex aspect-square size-8 items-center justify-center rounded-sm border-2 border-black bg-[#00C2CB] shadow-[2px_2px_0px_0px_#000000] text-black shrink-0">
                <AppLogoIcon className="size-5 fill-black text-black" />
            </div>
            {showText && (
                <div className="grid flex-1 text-left transition-[opacity,width] duration-200 ease-linear overflow-hidden whitespace-nowrap group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">
                    <span className="truncate leading-none font-black text-lg tracking-tight text-black uppercase">
                        {name && name !== 'Laravel' ? name : 'Triple9'}
                    </span>
                </div>
            )}
        </div>
    );
}
