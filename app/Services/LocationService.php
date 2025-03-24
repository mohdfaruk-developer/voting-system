<?php

namespace App\Services;

use App\Models\Country;
use App\Models\State;

class LocationService
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
    public function getStatesByCountry(string $isoCode)
    {
        $country = Country::where('iso2', $isoCode)->firstOrFail();

        return $country->states()->orderBy('name')->get(['name', 'code']);
    }

    /**
     * Get cities for a specific country and state
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getCitiesByCountryAndState(string $isoCode, string $stateCode)
    {
        $country = Country::where('iso2', $isoCode)->firstOrFail();
        $state = $country->states()->where('code', $stateCode)->firstOrFail();

        return $state->cities()->orderBy('name')->pluck('name');
    }

    /**
     * Get cities for a specific country
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getCitiesByCountryOnly(string $isoCode)
    {
        $country = Country::where('iso2', $isoCode)->firstOrFail();

        return $country->cities()->orderBy('name')->pluck('name');
    }
}
