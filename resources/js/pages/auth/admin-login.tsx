import { Form, Head, Link } from '@inertiajs/react';
import { LogIn } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    status?: string;
};

export default function AdminLogin({ status }: Props) {
    return (
        <>
            <Head title="Admin" />

            <Form
                action="/admin"
                method="post"
                resetOnSuccess={['password']}
                className="flex flex-col gap-4"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-3.5">
                            <div className="grid gap-1.5">
                                <Label htmlFor="email" className="text-xs font-black uppercase tracking-wider text-black">
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
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="rounded-none border-2 border-black bg-white text-black placeholder:text-black/40 focus:border-black focus:ring-0 shadow-[2px_2px_0px_0px_#000000] focus:shadow-[4px_4px_0px_0px_#000000] text-xs py-2.5 font-medium"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-2 pt-0.5">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="rounded-none border-2 border-black data-[state=checked]:bg-[#00C2CB] data-[state=checked]:text-black"
                                />
                                <Label htmlFor="remember" className="text-xs font-bold text-black cursor-pointer">
                                    Ingat saya di perangkat ini
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full rounded-none bg-[#00C2CB] hover:bg-[#00a8b0] text-black font-black uppercase py-2.5 text-xs border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing ? <Spinner /> : <LogIn className="h-4 w-4 mr-1.5" />}
                                Masuk ke Dashboard Admin
                            </Button>
                        </div>

                        <div className="flex flex-col gap-3 text-center text-xs font-bold text-black pt-2">
                            <div>
                                Belum memiliki akun admin?{' '}
                                <Link
                                    href="/admin/register"
                                    tabIndex={5}
                                    className="font-black text-black underline hover:text-[#00C2CB]"
                                >
                                    Daftar Admin
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-4 text-center text-xs font-black text-black bg-[#00C2CB] border-2 border-black shadow-[2px_2px_0px_0px_#000000] p-2.5">
                    {status}
                </div>
            )}
        </>
    );
}

AdminLogin.layout = {
    title: 'Admin',
};
