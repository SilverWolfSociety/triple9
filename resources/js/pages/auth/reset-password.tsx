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
                    <div className="grid gap-3.5">
                        <div className="grid gap-1.5">
                            <Label htmlFor="email" className="text-xs font-black uppercase tracking-wider text-black">
                                Alamat Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                className="rounded-none border-2 border-black bg-neutral-100 text-xs py-2.5 text-black font-medium"
                                readOnly
                            />
                            <InputError
                                message={errors.email}
                                className="mt-1"
                            />
                        </div>

                        <div className="grid gap-1.5">
                            <Label htmlFor="password" className="text-xs font-black uppercase tracking-wider text-black">
                                Password Baru
                            </Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                className="rounded-none border-2 border-black bg-white text-black placeholder:text-black/40 focus:border-black focus:ring-0 shadow-[2px_2px_0px_0px_#000000] focus:shadow-[4px_4px_0px_0px_#000000] text-xs py-2.5 font-medium"
                                autoFocus
                                placeholder="Minimal 8 karakter"
                                passwordrules={passwordRules}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-1.5">
                            <Label htmlFor="password_confirmation" className="text-xs font-black uppercase tracking-wider text-black">
                                Konfirmasi Password Baru
                            </Label>
                            <PasswordInput
                                id="password_confirmation"
                                name="password_confirmation"
                                autoComplete="new-password"
                                className="rounded-none border-2 border-black bg-white text-black placeholder:text-black/40 focus:border-black focus:ring-0 shadow-[2px_2px_0px_0px_#000000] focus:shadow-[4px_4px_0px_0px_#000000] text-xs py-2.5 font-medium"
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
                            className="mt-2 w-full rounded-none bg-[#00C2CB] hover:bg-[#00a8b0] text-black font-black uppercase py-2.5 text-xs border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
                            disabled={processing}
                            data-test="reset-password-button"
                        >
                            {processing ? <Spinner /> : <KeyRound className="h-4 w-4 mr-1.5" />}
                            Simpan Password Baru
                        </Button>

                        <div className="flex flex-col gap-2.5 text-center text-xs font-bold text-black pt-2">
                            <div>
                                Sudah ingat password?{' '}
                                <Link
                                    href={login()}
                                    className="font-black text-black underline hover:text-[#00C2CB]"
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
