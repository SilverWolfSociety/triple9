import { Form, Head, usePage } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/profile';
import type { Auth } from '@/types';

type PageProps = {
    auth: Auth;
};

export default function Profile() {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Pengaturan Akun" />

            <h1 className="sr-only">Pengaturan Akun</h1>

            <div className="space-y-6">
                {/* Member Summary Header */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/60 dark:bg-zinc-900/60 border border-blue-100 dark:border-zinc-800">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white font-black text-lg shadow-sm">
                        {auth.user.name ? auth.user.name.slice(0, 2).toUpperCase() : 'TR'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                                {auth.user.name}
                            </h3>
                            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                • Aktif
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {auth.user.email}
                        </p>
                    </div>
                    <div className="text-right shrink-0">
                        <div className="text-[10px] text-slate-400 dark:text-slate-500">ID Member</div>
                        <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                            #TRP-{auth.user.id ? String(auth.user.id).padStart(4, '0') : '9999'}
                        </div>
                    </div>
                </div>

                <Heading
                    variant="small"
                    title="Informasi Profil"
                    description="Perbarui nama lengkap dan alamat email akun Anda"
                />

                <Form
                    {...ProfileController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama Lengkap</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.name}
                                    name="name"
                                    required
                                    autoComplete="name"
                                    placeholder="Nama lengkap"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Alamat Email</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.email}
                                    name="email"
                                    required
                                    autoComplete="username"
                                    placeholder="Alamat email aktif"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    data-test="update-profile-button"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>

            <DeleteUser />
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Pengaturan Akun',
            href: edit(),
        },
    ],
};
