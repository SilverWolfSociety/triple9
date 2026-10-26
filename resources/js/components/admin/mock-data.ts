import type {
    AdminSetoranItem,
    AdminPayoutItem,
    AdminUserItem,
    AdminTicketItem,
    PlatformSettings,
    SystemRuleItem,
} from './types';

export const defaultSystemRules: SystemRuleItem[] = [
    {
        id: 'rule-1',
        number: '01',
        title: 'Gmail harus Fresh (baru dibuat).',
        description: 'Akun Gmail yang disetorkan harus akun baru tanpa riwayat aktivitas.',
        badgeColor: '#00C2CB',
        isActive: true,
    },
    {
        id: 'rule-2',
        number: '02',
        title: 'Nama Gmail yang didaftarkan wajib sama persis dengan nama Gmail hasil Generate di website.',
        description: 'Tidak boleh mengubah, menambah, atau mengurangi karakter apa pun.',
        badgeColor: '#FFD700',
        isActive: true,
    },
    {
        id: 'rule-3',
        number: '03',
        title: 'Tanggal lahir akun Gmail wajib 18 tahun ke atas.',
        description: 'Pastikan tahun kelahiran akun diatur agar umur minimal 18 tahun saat pendaftaran.',
        badgeColor: '#FF00FF',
        isActive: true,
    },
    {
        id: 'rule-4',
        number: '04',
        title: 'Password Gmail wajib menggunakan: triple9 ATAU 9triple',
        description: '(Pilih salah satu password room yang aktif)',
        badgeColor: '#FFFFFF',
        isActive: true,
    },
    {
        id: 'rule-5',
        number: '05',
        title: 'Akun tidak boleh ditautkan dengan nomor pemulihan maupun Gmail pemulihan.',
        description: 'Kecuali ditentukan lain oleh admin, pastikan akun bebas verifikasi nomor hp pribadi.',
        badgeColor: '#00C2CB',
        isActive: true,
    },
    {
        id: 'rule-6',
        number: '06',
        title: 'Sebelum melakukan storan, cek status Gmail di https://en.gmailcheck.com/',
        description: 'Gunakan checker untuk memastikan akun masih aktif sebelum dikirim.',
        badgeColor: '#FFD700',
        isActive: true,
    },
    {
        id: 'rule-7',
        number: '07',
        title: 'Hanya kirim Gmail dengan status Live/Aktif.',
        description: 'Akun mati atau salah password otomatis ditolak.',
        badgeColor: '#FF00FF',
        isActive: true,
    },
];

export const defaultSystemNotes: string[] = [
    'Status di checkgmail.online hanya digunakan untuk memastikan Gmail masih aktif, bukan penentu diterima atau ditolaknya Gmail saat pengecekan admin.',
    'Gmail yang tidak sesuai rules atau berbeda dengan hasil Generate di website akan ditolak dan akun dapat diblokir oleh admin.',
    'Reward setoran akan langsung masuk ke saldo akun setelah diverifikasi valid oleh admin (1-24 jam kerja).',
];

export const initialPlatformSettings: PlatformSettings = {
    gmailRate: 5000,
    minWithdraw: 10000,
    referralBonus: 500,
    announcementCategory: 'Pengumuman Setoran',
    announcementTitle: 'Setoran OPEN Setiap Hari Senin s/d Jumat',
    announcementText: 'Jam operasional verifikasi setor akun: 08:00 - 16:00 WIB.',
    announcementActive: true,
    depositsOpen: true,
    autoCheckActive: true,
    announcementType: 'setoran',
    maxBatchDeposit: 50,
    maintenanceMode: false,
    waChannelUrl: 'https://whatsapp.com/channel/triple9-resmi',
    tgGroupUrl: 'https://t.me/triple9_official',
    supportContact: '0812-9999-9999',
    operatingHours: '08:00 - 23:00 WIB',
    rules: defaultSystemRules,
    rulesNotes: defaultSystemNotes,
};

// Clean non-dummy initial data
export const initialSetoranData: AdminSetoranItem[] = [];

export const initialPayoutData: AdminPayoutItem[] = [];

export const initialUsersData: AdminUserItem[] = [
    {
        id: 1,
        name: 'Admin Utama',
        email: 'admin@triple9.com',
        avatar: '/images/avatar/rubah.png',
        role: 'admin',
        totalSetoran: 0,
        currentBalance: 0,
        joinedDate: '2026-10-01',
        status: 'active',
    },
    {
        id: 10,
        name: 'Hawwin Ramadhan',
        email: 'firstxyz0@gmail.com',
        avatar: '/images/avatar/kucing.png',
        role: 'user',
        totalSetoran: 0,
        currentBalance: 0,
        joinedDate: '2026-10-22',
        status: 'active',
    },
];

export const initialTicketsData: AdminTicketItem[] = [];
