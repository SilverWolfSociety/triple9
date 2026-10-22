import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import type { User } from '@/types';

export function UserInfo({
    user,
    showEmail = false,
}: {
    user: User;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();

    return (
        <div className="flex items-center gap-2.5 min-w-0">
            <Avatar className="aspect-square size-8 shrink-0 overflow-hidden rounded-sm border-2 border-black bg-[#FFD700] shadow-[2px_2px_0px_0px_#000000]">
                <AvatarImage src={user.avatar || '/images/avatar/kucing.png'} alt={user.name} className="aspect-square object-contain p-0.5 size-full" />
                <AvatarFallback className="rounded-sm bg-[#FFD700] text-black font-black">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight min-w-0 transition-[opacity,width] duration-200 ease-linear overflow-hidden whitespace-nowrap group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">
                <span className="truncate font-black text-black">{user.name}</span>
                {showEmail && (
                    <span className="truncate text-xs font-mono font-semibold text-neutral-600">
                        {user.email}
                    </span>
                )}
            </div>
        </div>
    );
}
