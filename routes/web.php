<?php

declare(strict_types=1);

use App\Http\Controllers\CandidateRequestController;
use App\Http\Controllers\ElectionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\VoterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', \App\Http\Controllers\DashboardController::class)->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Request routes
    Route::resource('requests', RequestController::class)->except('edit');

    // Voter rotes
    Route::resource('voters', VoterController::class)->only(['index', 'show', 'update']);

    // Elections rotes
    Route::resource('elections', ElectionController::class);

    Route::resource('elections/{election}/requests', CandidateRequestController::class)->only(['create', 'store']);
});

require __DIR__ . '/auth.php';
