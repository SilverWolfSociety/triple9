<?php

use App\Http\Controllers\Auth\AdminAuthController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::inertia('/', 'welcome')->name('home');
});

// Admin Auth & Portal (Akses langsung via /admin)
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminAuthController::class, 'create'])->name('login');
    Route::post('/', [AdminAuthController::class, 'store'])->name('login.store');

    Route::get('login', fn () => redirect()->route('admin.login'));
    Route::post('login', [AdminAuthController::class, 'store']);

    Route::get('register', [AdminAuthController::class, 'createRegister'])->name('register');
    Route::post('register', [AdminAuthController::class, 'storeRegister'])->name('register.store');
});

Route::middleware(['admin'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
