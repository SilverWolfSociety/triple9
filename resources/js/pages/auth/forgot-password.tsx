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
                <div className="mb-4 text-center text-xs font-black text-black bg-[#00C2CB] border-2 border-black shadow-[2px_2px_0px_0px_#000000] p-2.5">
                    {status}
                </div>
            )}

            <div className="space-y-4">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-1.5">
                                <Label htmlFor="email" className="text-xs font-black uppercase tracking-wider text-black">
                                    Alamat Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="nama@email.com"
                                    className="rounded-none border-2 border-black bg-white text-black placeholder:text-black/40 focus:border-black focus:ring-0 shadow-[2px_2px_0px_0px_#000000] focus:shadow-[4px_4px_0px_0px_#000000] text-xs py-2.5 font-medium"
                                />

                                <InputError message={errors.email} />
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    className="w-full rounded-none bg-[#00C2CB] hover:bg-[#00a8b0] text-black font-black uppercase py-2.5 text-xs border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
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

                <div className="flex flex-col gap-2.5 text-center text-xs font-bold text-black pt-1">
                    <div>
                        Atau kembali ke{' '}
                        <Link
                            href={login()}
                            className="font-black text-black underline hover:text-[#00C2CB]"
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
