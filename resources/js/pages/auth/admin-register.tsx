import { Form, Head, Link } from '@inertiajs/react';
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
                                <Label htmlFor="name" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
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
                                    className="rounded-xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121215] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-blue-600 focus:ring-blue-600/20 text-xs py-2.5"
                                />
                                <InputError message={errors.name} className="mt-1" />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="email" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    tabIndex={2}
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
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="rounded-xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121215] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-blue-600 focus:ring-blue-600/20 text-xs py-2.5"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="password_confirmation" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                    Confirm password
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="rounded-xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121215] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-blue-600 focus:ring-blue-600/20 text-xs py-2.5"
                                />
                                <InputError message={errors.password_confirmation} className="mt-1" />
                            </div>

                            <Button
                                type="submit"
                                className="mt-1 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 text-xs shadow-md shadow-blue-600/25 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                                tabIndex={5}
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                Daftar Akun Admin
                            </Button>
                        </div>

                        <div className="flex flex-col gap-2 text-center text-xs text-neutral-500 dark:text-neutral-400 pt-1">
                            <div>
                                Sudah memiliki akun admin?{' '}
                                <Link
                                    href="/admin"
                                    tabIndex={6}
                                    className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
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
