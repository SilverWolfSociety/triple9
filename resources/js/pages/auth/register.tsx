import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, Sparkles, Shield, UserPlus } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login, home } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Daftar Member" />

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-4"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-3.5">
                            <div className="grid gap-1.5">
                                <Label htmlFor="name" className="text-xs font-bold text-neutral-700">
                                    Nama Lengkap
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Contoh: Hawwin Ramadhan"
                                    className="rounded-xl border-neutral-200 focus:border-blue-600 focus:ring-blue-600/20 text-xs py-2.5"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-1"
                                />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="email" className="text-xs font-bold text-neutral-700">
                                    Alamat Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="nama@email.com"
                                    className="rounded-xl border-neutral-200 focus:border-blue-600 focus:ring-blue-600/20 text-xs py-2.5"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="password" className="text-xs font-bold text-neutral-700">
                                    Password
                                </Label>
                                <PasswordInput
                                    id="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Minimal 8 karakter"
                                    passwordrules={passwordRules}
                                    className="rounded-xl border-neutral-200 focus:border-blue-600 focus:ring-blue-600/20 text-xs py-2.5"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="password_confirmation" className="text-xs font-bold text-neutral-700">
                                    Konfirmasi Password
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Ulangi password"
                                    passwordrules={passwordRules}
                                    className="rounded-xl border-neutral-200 focus:border-blue-600 focus:ring-blue-600/20 text-xs py-2.5"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-1 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 text-xs shadow-md shadow-blue-600/25 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                                tabIndex={5}
                                disabled={processing}
                                data-test="register-user-button"
                            >
                                {processing ? <Spinner /> : <UserPlus className="h-4 w-4 mr-1.5" />}
                                Daftar Akun
                            </Button>
                        </div>

                        <div className="flex flex-col gap-3 text-center text-xs text-neutral-500 pt-2">
                            <div>
                                Sudah memiliki akun?{' '}
                                <Link
                                    href={login()}
                                    tabIndex={6}
                                    className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    Masuk di sini
                                </Link>
                            </div>

                            <div className="pt-3 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
                                <Shield className="h-3.5 w-3.5 text-neutral-400" />
                                <span>Administrator staff?</span>
                                <Link
                                    href="/admin/login"
                                    className="font-bold text-neutral-800 hover:text-blue-600 hover:underline"
                                >
                                    Portal Khusus Admin
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Daftar',
};
