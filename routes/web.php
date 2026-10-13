<?php

use App\Http\Controllers\Auth\AdminAuthController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::inertia('/', 'welcome')->name('home');
});

// Admin Auth
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('login', [AdminAuthController::class, 'create'])->name('login');
    Route::post('login', [AdminAuthController::class, 'store'])->name('login.store');
    Route::get('register', [AdminAuthController::class, 'createRegister'])->name('register');
    Route::post('register', [AdminAuthController::class, 'storeRegister'])->name('register.store');
});

Route::get('admin', function () {
    return redirect()->route('dashboard');
});

Route::middleware(['admin'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
