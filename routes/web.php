<?php

declare(strict_types=1);

use App\Http\Controllers\CandidateController;
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

    // Requests routes
    Route::resource('requests', RequestController::class)->except('edit');

    // Voters routes
    Route::resource('voters', VoterController::class)->only(['index', 'show']);

    // Elections routes
    Route::resource('elections', ElectionController::class);

    // Candidates routes
    Route::resource('elections/{election}/requests', CandidateRequestController::class)
        ->only(['create', 'store'])->names('candidate-request');
    Route::resource('elections/{election}/candidates', CandidateController::class)->only(['show', 'destroy']);

    // Vote routes
    Route::get('elections/{election}/vote', [\App\Http\Controllers\VoteController::class, 'create'])
        ->name('vote.create');
    Route::post('elections/{election}/vote', [\App\Http\Controllers\VoteController::class, 'store'])
        ->middleware('password.confirm')->name('vote.store');
});

require __DIR__ . '/auth.php';
