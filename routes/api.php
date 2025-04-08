<?php

declare(strict_types=1);

use App\Http\Controllers\Api\LocationController;
use Illuminate\Support\Facades\Route;

Route::middleware('cache.headers:public;max_age=86400;etag')->group(function () {
    Route::get('/countries', [LocationController::class, 'countries']);
    Route::get('/countries/{isoCode}/states', [LocationController::class, 'statesByCountry']);
    Route::get('/countries/{isoCode}/states/{stateCode}/cities', [LocationController::class, 'citiesByCountryAndState']);
    Route::get('/countries/{isoCode}/cities', [LocationController::class, 'citiesByCountry']);
});
