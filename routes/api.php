<?php

declare(strict_types=1);

use App\Http\Controllers\Api\LocationController;
use Illuminate\Support\Facades\Route;

Route::middleware('cache.headers:public;max_age=86400;etag')->group(function (): void {
    Route::get('/countries', [LocationController::class, 'countries'])->name('countries');
    Route::get('/countries/{country}/states', [LocationController::class, 'statesByCountry'])->name('states');
});
