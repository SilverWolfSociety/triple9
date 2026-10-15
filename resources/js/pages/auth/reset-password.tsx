import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, KeyRound } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/password';
import { login, home } from '@/routes';

type Props = {
    token: string;
    email: string;
    passwordRules: string;
};

export default function ResetPassword({ token, email, passwordRules }: Props) {
    return (
        <>
            <Head title="Reset Password - Triple9" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <div className="grid gap-4">
                        <div className="grid gap-1.5">
                            <Label htmlFor="email" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                Alamat Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                className="rounded-xl border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#121215] text-xs py-2.5 text-neutral-500 dark:text-neutral-400"
                                readOnly
                            />
                            <InputError
                                message={errors.email}
                                className="mt-1"
                            />
                        </div>

                        <div className="grid gap-1.5">
                            <Label htmlFor="password" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                Password Baru
                            </Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                className="rounded-xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121215] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-blue-600 focus:ring-blue-600/20 text-xs py-2.5"
                                autoFocus
                                placeholder="Minimal 8 karakter"
                                passwordrules={passwordRules}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-1.5">
                            <Label htmlFor="password_confirmation" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                Konfirmasi Password Baru
                            </Label>
                            <PasswordInput
                                id="password_confirmation"
                                name="password_confirmation"
                                autoComplete="new-password"
                                className="rounded-xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121215] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-blue-600 focus:ring-blue-600/20 text-xs py-2.5"
                                placeholder="Ulangi password baru"
                                passwordrules={passwordRules}
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-1"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="mt-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 text-xs shadow-md shadow-blue-600/25 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                            disabled={processing}
                            data-test="reset-password-button"
                        >
                            {processing ? <Spinner /> : <KeyRound className="h-4 w-4 mr-1.5" />}
                            Simpan Password Baru
                        </Button>

                        <div className="flex flex-col gap-2.5 text-center text-xs text-neutral-600 dark:text-neutral-400 pt-2">
                            <div>
                                Sudah ingat password?{' '}
                                <Link
                                    href={login()}
                                    className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
                                >
                                    Masuk di sini
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </Form>
        </>
    );
}

ResetPassword.layout = {
    title: 'Reset Password',
    description: 'Masukkan password baru Anda untuk mengamankan akun',
};
