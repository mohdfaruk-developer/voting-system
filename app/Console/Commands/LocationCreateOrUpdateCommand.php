<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\City;
use App\Models\Country;
use App\Models\State;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class LocationCreateOrUpdateCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'moodiy:location-create-update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create or update country and state in the database';

    /**
     * Base API URL for the countries and states data.
     *
     * @var string
     */
    protected $baseApiUrl = 'https://countriesnow.space/api/v0.1';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        try {
            DB::beginTransaction();

            $countries = $this->getCountries();
            if (! empty($countries)) {
                $this->createOrUpdateCountries($countries);
            } else {
                $this->warn('No countries data available to process');
            }

            $states = $this->getStates();
            if (! empty($states)) {
                $this->createOrUpdateStates($states);
                $this->createOrUpdateCities();
            } else {
                $this->warn('No states data available to process');
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $this->error('Command failed: ' . $e->getMessage());
        }
    }

    /**
     * Get the countries data from the API.
     */
    private function getCountries(): array
    {
        try {
            $response = Http::get("{$this->baseApiUrl}/countries/iso");

            if ($response->successful()) {
                return $response->json('data');
            }

            $this->error('Failed to fetch countries data from API and the error is: ' . ($response->json('msg') ?? 'unknown error'));

            return [];
        } catch (\Exception $e) {
            $this->error('Error fetching countries: ' . $e->getMessage());

            return [];
        }
    }

    /**
     * Create or update the countries in the database.
     */
    private function createOrUpdateCountries(array $countries): void
    {
        $this->info('Creating or updating country data...');

        $countryData = array_map('array_change_key_case', $countries);

        Country::upsert(
            $countryData,
            ['name', 'iso2'],
            ['iso3']
        );

        // Remove countries from database that no longer exist in the API response
        Country::whereNotIn('iso2', array_column($countryData, 'iso2'))->delete();

        $this->info('Successfully created or updated countries');
    }

    /**
     * Get the states data from the API.
     */
    private function getStates(): array
    {
        try {
            $response = Http::get("{$this->baseApiUrl}/countries/states");

            if ($response->successful()) {
                return $response->json('data');
            }

            $this->error('Failed to fetch states data from API and the error is: ' . ($response->json('msg') ?? 'unknown error'));

            return [];
        } catch (\Exception $e) {
            $this->error('Error fetching states: ' . $e->getMessage());

            return [];
        }
    }

    /**
     * Create or update the states in the database.
     */
    private function createOrUpdateStates(array $states): void
    {
        $this->info('Creating or updating state data...');

        $countries = Country::pluck('id', 'iso2')->toArray();

        foreach ($states as $state) {
            $countryIsoCode = $state['iso2'];
            $stateData = $state['states'];

            // Skip if country doesn't exist in our database
            if (! isset($countries[$countryIsoCode])) {
                continue;
            }

            $stateData = array_map(function ($state) use ($countries, $countryIsoCode) {
                return [
                    'name' => $state['name'],
                    'code' => $state['state_code'],
                    'country_id' => $countries[$countryIsoCode],
                ];
            }, $stateData);

            State::upsert(
                $stateData,
                ['code', 'country_id'],
                ['name']
            );

            // Remove states from database that no longer exist in the API response
            State::where('country_id', $countries[$countryIsoCode])
                ->whereNotIn('code', array_column($stateData, 'code'))
                ->delete();
        }

        $this->info('Successfully created or updated states');
    }

    /**
     * Get the cities data from the API.
     */
    private function getCities(string $country, ?string $state = null): array
    {
        try {
            if ($state) {
                $response = Http::get("{$this->baseApiUrl}/countries/state/cities/q?country={$country}&state={$state}");
            } else {
                $response = Http::get("{$this->baseApiUrl}/countries/cities/q?country={$country}");
            }

            if ($response->successful()) {
                return $response->json('data');
            }

            $this->error('Failed to fetch cities data from API and the error is: ' . ($response->json('msg') ?? 'unknown error'));

            return [];
        } catch (\Exception $e) {
            $this->error('Error fetching cities: ' . $e->getMessage());

            return [];
        }
    }

    /**
     * Create or update the cities in the database.
     */
    private function createOrUpdateCities(): void
    {
        Country::query()->chunk(100, function ($countries) {
            foreach ($countries as $country) {
                $country->load('states');
                $countryName = $country->name;
                $countryId = $country->id;
                $this->info("Creating or updating city data for {$countryName} country...");
                if ($country->states->isNotEmpty()) {
                    $country->states->each(function ($state) use ($countryName, $countryId) {
                        $cities = $this->getCities($countryName, $state->name);
                        $cityData = [];
                        foreach ($cities as $city) {
                            $cityData[] = [
                                'name' => $city,
                                'state_id' => $state->id,
                                'country_id' => $countryId,
                            ];
                        }
                        City::insertOrIgnore($cityData);

                        // Remove cities from database that no longer exist in the API response
                        City::where('state_id', $state->id)
                            ->whereNotIn('name', $cities)
                            ->delete();
                    });
                } else {
                    $cities = $this->getCities($countryName);
                    $cityData = [];
                    foreach ($cities as $city) {
                        $cityData[] = [
                            'name' => $city,
                            'state_id' => null,
                            'country_id' => $countryId,
                        ];
                    }
                    City::insertOrIgnore($cityData);

                    // Remove cities from database that no longer exist in the API response
                    City::where('country_id', $countryId)
                        ->whereNotIn('name', $cities)
                        ->delete();
                }
                $this->info('Successfully created or updated cities');
            }
        });
    }
}
