import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, Sparkles, Shield, LogIn } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register, home } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Masuk" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-4"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-4">
                            <div className="grid gap-1.5">
                                <Label htmlFor="email" className="text-xs font-bold text-neutral-700">
                                    Alamat Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="nama@email.com"
                                    className="rounded-xl border-neutral-200 focus:border-blue-600 focus:ring-blue-600/20 text-xs py-2.5"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-1.5">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-xs font-bold text-neutral-700">
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                                            tabIndex={5}
                                        >
                                            Lupa password?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="rounded-xl border-neutral-200 focus:border-blue-600 focus:ring-blue-600/20 text-xs py-2.5"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-2 pt-0.5">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="rounded-md border-neutral-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                                <Label htmlFor="remember" className="text-xs font-medium text-neutral-600 cursor-pointer">
                                    Ingat saya di perangkat ini
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-1 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 text-xs shadow-md shadow-blue-600/25 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing ? <Spinner /> : <LogIn className="h-4 w-4 mr-1.5" />}
                                Masuk
                            </Button>
                        </div>

                        <div className="flex flex-col gap-3 text-center text-xs text-neutral-500 pt-2">
                            <div>
                                Belum memiliki akun?{' '}
                                <Link
                                    href={register()}
                                    tabIndex={5}
                                    className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    Daftar Sekarang
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

            {status && (
                <div className="mt-4 text-center text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/60 rounded-xl p-2.5">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Masuk',
};
