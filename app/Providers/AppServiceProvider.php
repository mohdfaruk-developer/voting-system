<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\LocationService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

final class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(LocationService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        DB::prohibitDestructiveCommands($this->app->isProduction());

        Model::shouldBeStrict(! $this->app->isProduction());
    }
}
