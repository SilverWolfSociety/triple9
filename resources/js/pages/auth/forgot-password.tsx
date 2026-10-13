import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, ArrowLeft } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login, home } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Lupa Password - Triple9" />

            {status && (
                <div className="mb-4 text-center text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/60 rounded-xl p-2.5">
                    {status}
                </div>
            )}

            <div className="space-y-5">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-1.5">
                                <Label htmlFor="email" className="text-xs font-bold text-neutral-700">
                                    Alamat Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="nama@email.com"
                                    className="rounded-xl border-neutral-200 focus:border-blue-600 focus:ring-blue-600/20 text-xs py-2.5"
                                />

                                <InputError message={errors.email} />
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 text-xs shadow-md shadow-blue-600/25 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing ? (
                                        <LoaderCircle className="h-4 w-4 animate-spin mr-1.5" />
                                    ) : null}
                                    Kirim Tautan Reset Password
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="flex flex-col gap-2.5 text-center text-xs text-neutral-600 pt-1">
                    <div>
                        Atau kembali ke{' '}
                        <Link
                            href={login()}
                            className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Masuk ke Akun
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Lupa Password',
    description: 'Masukkan email Anda untuk menerima tautan pemulihan kata sandi',
};
