import { useState } from 'react';
import {
    PlusCircle,
    Search,
    Shield,
    ShieldOff,
    UserCheck,
    UserX,
    Users,
} from 'lucide-react';
import { toast } from 'sonner';
import type { AdminUserItem } from '../types';

interface AdminUsersViewProps {
    usersList: AdminUserItem[];
    onOpenBalanceModal: (user: AdminUserItem) => void;
    onToggleUserRole: (userId: number) => void;
    onToggleUserStatus: (userId: number) => void;
}

export function AdminUsersView({
    usersList,
    onOpenBalanceModal,
    onToggleUserRole,
    onToggleUserStatus,
}: AdminUsersViewProps) {
    const [selectedRole, setSelectedRole] = useState<'all' | 'user' | 'admin'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const formatRupiah = (val: number) =>
        'Rp ' + new Intl.NumberFormat('id-ID').format(val);

    const filteredUsers = usersList.filter((u) => {
        const matchesRole =
            selectedRole === 'all' ? true : u.role === selectedRole;
        const matchesSearch =
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(u.id).includes(searchQuery);
        return matchesRole && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header Control Card */}
            <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b-2 border-black pb-4">
                    <div>
                        <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-black">
                            Kelola Data Pengguna
                        </h2>
                    </div>

                    {/* Search */}
                    <div className="relative min-w-[220px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-black" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama / email..."
                            className="w-full pl-9 pr-3 py-1.5 rounded-none border-2 border-black bg-white text-xs font-bold text-black placeholder:text-black/40 shadow-[2px_2px_0px_0px_#000000] focus:outline-none"
                        />
                    </div>
                </div>

                {/* Filter Role */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <button
                        type="button"
                        onClick={() => setSelectedRole('all')}
                        className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedRole === 'all'
                            ? 'bg-black text-white shadow-[2px_2px_0px_0px_#000000]'
                            : 'bg-white text-black hover:bg-[#F5F5DC]'
                            }`}
                    >
                        Semua Pengguna ({usersList.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedRole('user')}
                        className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedRole === 'user'
                            ? 'bg-[#00C2CB] text-black shadow-[2px_2px_0px_0px_#000000]'
                            : 'bg-white text-black hover:bg-[#F5F5DC]'
                            }`}
                    >
                        Member / User ({usersList.filter((u) => u.role === 'user').length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedRole('admin')}
                        className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border-2 border-black transition cursor-pointer ${selectedRole === 'admin'
                            ? 'bg-[#FF00FF] text-black shadow-[2px_2px_0px_0px_#000000]'
                            : 'bg-white text-black hover:bg-[#F5F5DC]'
                            }`}
                    >
                        Administrator ({usersList.filter((u) => u.role === 'admin').length})
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="rounded-md border-[3px] border-black bg-white p-5 sm:p-6 shadow-[8px_8px_0px_0px_#000000] space-y-4">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left text-xs border-2 border-black">
                        <thead>
                            <tr className="bg-[#FFD700] border-b-2 border-black text-black uppercase font-black tracking-wider text-[11px]">
                                <th className="p-3 border-r-2 border-black">ID</th>
                                <th className="p-3 border-r-2 border-black">Pengguna</th>
                                <th className="p-3 border-r-2 border-black">Email</th>
                                <th className="p-3 border-r-2 border-black">Role</th>
                                <th className="p-3 border-r-2 border-black">Total Setoran</th>
                                <th className="p-3 border-r-2 border-black">Saldo Saat Ini</th>
                                <th className="p-3 border-r-2 border-black">Bergabung</th>
                                <th className="p-3 border-r-2 border-black">Status</th>
                                <th className="p-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-black bg-white font-medium">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="p-8 text-center text-xs font-black uppercase tracking-wider text-neutral-500">
                                        Tidak ada pengguna yang ditemukan.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((item) => (
                                    <tr key={item.id} className="hover:bg-[#F5F5DC] transition">
                                        <td className="p-3 border-r-2 border-black font-mono font-bold text-black">
                                            #{item.id}
                                        </td>
                                        <td className="p-3 border-r-2 border-black">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={item.avatar}
                                                    alt={item.name}
                                                    className="size-7 rounded-full border border-black bg-[#FFD700] object-contain shrink-0"
                                                />
                                                <span className="font-bold text-black truncate max-w-[140px]">
                                                    {item.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-3 border-r-2 border-black font-mono text-black select-all">
                                            {item.email}
                                        </td>
                                        <td className="p-3 border-r-2 border-black">
                                            {item.role === 'admin' ? (
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border border-black bg-[#FF00FF] shadow-[1px_1px_0px_0px_#000000]" title="Admin">
                                                    <img src="/images/icon/tatatertib.png" alt="Admin" className="size-5 object-contain shrink-0" />
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border border-black bg-[#F5F5DC] shadow-[1px_1px_0px_0px_#000000]" title="User">
                                                    <img src="/images/icon/person_yellow.png" alt="User" className="size-5 object-contain shrink-0" />
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3 border-r-2 border-black font-mono font-black text-black">
                                            {item.totalSetoran} Akun
                                        </td>
                                        <td className="p-3 border-r-2 border-black font-mono font-black text-black">
                                            {formatRupiah(item.currentBalance)}
                                        </td>
                                        <td className="p-3 border-r-2 border-black text-neutral-600 font-mono">
                                            {item.joinedDate}
                                        </td>
                                        <td className="p-3 border-r-2 border-black">
                                            {item.status === 'active' ? (
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border border-black bg-[#00C2CB] shadow-[1px_1px_0px_0px_#000000]" title="Aktif">
                                                    <img src="/images/icon/checklist.png" alt="Aktif" className="size-5 object-contain shrink-0" />
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-xs border border-black bg-[#FF00FF] shadow-[1px_1px_0px_0px_#000000]" title="Suspend">
                                                    <img src="/images/icon/reject.png" alt="Suspend" className="size-5 object-contain shrink-0" />
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3 text-right">
                                            <div className="inline-flex items-center gap-1.5">
                                                <button
                                                    type="button"
                                                    onClick={() => onOpenBalanceModal(item)}
                                                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-xs border border-black bg-[#00C2CB] hover:bg-[#00a8b0] text-black text-[11px] font-black uppercase shadow-[1px_1px_0px_0px_#000000] cursor-pointer"
                                                    title="Sesuaikan Saldo Manual"
                                                >
                                                    <img src="/images/icon/edit_payment.png" alt="Saldo" className="size-3.5 object-contain" />
                                                    <span>Saldo</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        onToggleUserRole(item.id);
                                                        toast.success(`Role untuk ${item.name} berhasil diubah.`);
                                                    }}
                                                    className="size-6 inline-flex items-center justify-center rounded-xs border border-black bg-white hover:bg-[#FFD700] text-black shadow-[1px_1px_0px_0px_#000000] cursor-pointer"
                                                    title={item.role === 'admin' ? 'Ubah jadi User' : 'Jadikan Admin'}
                                                >
                                                    <Shield className="size-3.5 stroke-[2.5]" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        onToggleUserStatus(item.id);
                                                        toast.info(`Status akun ${item.name} diperbarui.`);
                                                    }}
                                                    className="size-6 inline-flex items-center justify-center rounded-xs border border-black bg-white hover:bg-[#FF00FF] text-black shadow-[1px_1px_0px_0px_#000000] cursor-pointer"
                                                    title={item.status === 'active' ? 'Tangguhkan Akun' : 'Aktifkan Akun'}
                                                >
                                                    {item.status === 'active' ? (
                                                        <UserX className="size-3.5 stroke-[2.5]" />
                                                    ) : (
                                                        <UserCheck className="size-3.5 stroke-[2.5]" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
