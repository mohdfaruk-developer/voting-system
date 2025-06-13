<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Country;

final class LocationService
{
    /**
     * Get all countries
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getCountries()
    {
        return Country::orderBy('name')->get(['name', 'iso2', 'iso3']);
    }

    /**
     * Get states for a specific country
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getStatesByCountry(string $countryName)
    {
        $country = Country::where('name', $countryName)->firstOrFail();

        return $country->states()->orderBy('name')->get(['name', 'code']);
    }
}
