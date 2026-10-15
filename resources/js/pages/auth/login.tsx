import { Form, Head, Link } from '@inertiajs/react';
import { Shield, LogIn } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { register } from '@/routes';
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
                        <div className="grid gap-3.5">
                            {/* Email */}
                            <div className="grid gap-1.5">
                                <Label htmlFor="email" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
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
                                    className="rounded-xl border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#121215] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-blue-600 focus:bg-white dark:focus:bg-[#121215] focus:ring-blue-600/20 text-xs py-2.5"
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Password */}
                            <div className="grid gap-1.5">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
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
                                    className="rounded-xl border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#121215] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-blue-600 focus:bg-white dark:focus:bg-[#121215] focus:ring-blue-600/20 text-xs py-2.5"
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Remember Me Checkbox */}
                            <div className="flex items-center space-x-2 pt-0.5">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="rounded-md border-neutral-300 dark:border-neutral-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                                <Label htmlFor="remember" className="text-xs font-medium text-neutral-600 dark:text-neutral-400 cursor-pointer">
                                    Ingat saya di perangkat ini
                                </Label>
                            </div>

                            {/* Full Width Submit Button */}
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

                            {/* Divider */}
                            <div className="relative my-1">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-neutral-100 dark:border-neutral-800" />
                                </div>
                                <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                                    <span className="bg-white dark:bg-[#09090b] px-3 text-neutral-400 dark:text-neutral-500 font-medium">
                                        atau lanjutkan dengan
                                    </span>
                                </div>
                            </div>

                            {/* Social Logins: Google & Facebook */}
                            <div className="grid grid-cols-2 gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => toast.info('Fitur login Google sedang dalam proses integrasi.')}
                                    className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121215] hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-xs font-semibold text-neutral-700 dark:text-neutral-200 shadow-2xs transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                                >
                                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                        />
                                    </svg>
                                    <span>Google</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => toast.info('Fitur login Facebook sedang dalam proses integrasi.')}
                                    className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121215] hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-xs font-semibold text-neutral-700 dark:text-neutral-200 shadow-2xs transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                                >
                                    <svg className="h-4 w-4 shrink-0 fill-[#1877F2]" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    <span>Facebook</span>
                                </button>
                            </div>
                        </div>

                        {/* Bottom Links (Matching Register Page Layout) */}
                        <div className="flex flex-col gap-3 text-center text-xs text-neutral-500 dark:text-neutral-400 pt-2">
                            <div>
                                Belum memiliki akun?{' '}
                                <Link
                                    href={register()}
                                    tabIndex={6}
                                    className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
                                >
                                    Daftar Sekarang
                                </Link>
                            </div>

                            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                                <Shield className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500" />
                                <span>Administrator staff?</span>
                                <Link
                                    href="/admin/login"
                                    className="font-bold text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                                >
                                    Portal Khusus Admin
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-4 text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 rounded-xl p-2.5">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Masuk',
    description: 'Akses akun Anda untuk menyetor Gmail, dan dapatkan saldo untuk di tukar.',
};
