import { Form, Head, Link } from '@inertiajs/react';
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
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-4">
                            <div className="grid gap-1.5">
                                <Label htmlFor="email" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                    Email address
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
                                    className="rounded-xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121215] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-blue-600 focus:ring-blue-600/20 text-xs py-2.5"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="password" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                    Password
                                </Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="rounded-xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121215] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-blue-600 focus:ring-blue-600/20 text-xs py-2.5"
                                />
                                <InputError message={errors.password} />
                            </div>

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

                            <Button
                                type="submit"
                                className="mt-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 text-xs shadow-md shadow-blue-600/25 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                Masuk ke Dashboard Admin
                            </Button>
                        </div>

                        <div className="flex flex-col gap-2 text-center text-xs text-neutral-500 dark:text-neutral-400 pt-1">
                            <div>
                                Belum memiliki akun admin?{' '}
                                <Link
                                    href="/admin/register"
                                    className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
                                >
                                    Daftar Admin
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

AdminLogin.layout = {
    title: 'Admin',
};
