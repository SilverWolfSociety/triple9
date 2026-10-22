import { Form, Head, Link } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminRegister() {
    return (
        <>
            <Head title="Daftar Admin" />

            <Form
                action="/admin/register"
                method="post"
                resetOnSuccess={['password', 'password_confirmation']}
                className="flex flex-col gap-4"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-3.5">
                            <div className="grid gap-1.5">
                                <Label htmlFor="name" className="text-xs font-black uppercase tracking-wider text-black">
                                    Nama Lengkap
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    placeholder="Nama Administrator"
                                    className="rounded-none border-2 border-black bg-white text-black placeholder:text-black/40 focus:border-black focus:ring-0 shadow-[2px_2px_0px_0px_#000000] focus:shadow-[4px_4px_0px_0px_#000000] text-xs py-2.5 font-medium"
                                />
                                <InputError message={errors.name} className="mt-1" />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="email" className="text-xs font-black uppercase tracking-wider text-black">
                                    Alamat Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    placeholder="admin@example.com"
                                    className="rounded-none border-2 border-black bg-white text-black placeholder:text-black/40 focus:border-black focus:ring-0 shadow-[2px_2px_0px_0px_#000000] focus:shadow-[4px_4px_0px_0px_#000000] text-xs py-2.5 font-medium"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="password" className="text-xs font-black uppercase tracking-wider text-black">
                                    Password
                                </Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="rounded-none border-2 border-black bg-white text-black placeholder:text-black/40 focus:border-black focus:ring-0 shadow-[2px_2px_0px_0px_#000000] focus:shadow-[4px_4px_0px_0px_#000000] text-xs py-2.5 font-medium"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="password_confirmation" className="text-xs font-black uppercase tracking-wider text-black">
                                    Konfirmasi Password
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="rounded-none border-2 border-black bg-white text-black placeholder:text-black/40 focus:border-black focus:ring-0 shadow-[2px_2px_0px_0px_#000000] focus:shadow-[4px_4px_0px_0px_#000000] text-xs py-2.5 font-medium"
                                />
                                <InputError message={errors.password_confirmation} className="mt-1" />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full rounded-none bg-[#00C2CB] hover:bg-[#00a8b0] text-black font-black uppercase py-2.5 text-xs border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
                                tabIndex={5}
                                disabled={processing}
                            >
                                {processing ? <Spinner /> : <UserPlus className="h-4 w-4 mr-1.5" />}
                                Daftar Akun Admin
                            </Button>
                        </div>

                        <div className="flex flex-col gap-3 text-center text-xs font-bold text-black pt-2">
                            <div>
                                Sudah memiliki akun admin?{' '}
                                <Link
                                    href="/admin"
                                    tabIndex={6}
                                    className="font-black text-black underline hover:text-[#00C2CB]"
                                >
                                    Masuk di sini
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

AdminRegister.layout = {
    title: 'Daftar Admin',
};
