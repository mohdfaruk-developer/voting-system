<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Country;
use App\Models\State;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

final class LocationCreateOrUpdateCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:location-create-update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create or update country and state in the database';

    /**
     * Base API URL for the countries and states data.
     */
    private string $baseApiUrl = 'https://countriesnow.space/api/v0.1';

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
            } else {
                $this->warn('No states data available to process');
            }

            DB::commit();
        } catch (Exception $exception) {
            DB::rollBack();
            $this->error('Command failed: '.$exception->getMessage());
        }
    }

    /**
     * Get the countries data from the API.
     *
     * @return list<array<string, string>>
     */
    private function getCountries()
    {
        try {
            $response = Http::get($this->baseApiUrl.'/countries/iso');

            if ($response->successful()) {
                return $response->json('data');
            }

            $this->error('Failed to fetch countries data from API and the error is: '.($response->json('msg') ?? 'unknown error'));

            return [];
        } catch (Exception $exception) {
            $this->error('Error fetching countries: '.$exception->getMessage());

            return [];
        }
    }

    /**
     * Create or update the countries in the database.
     */
    private function createOrUpdateCountries(array $countries): void
    {
        $this->info('Creating or updating country data...');

        $countryData = array_map(fn (array $country): array => [
            'name' => Str::lower($country['name']),
            'iso2' => $country['Iso2'],
            'iso3' => $country['Iso3'],
        ], $countries);

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
     *
     * @return list<array<string, string|list<array<string, string>>>>
     */
    private function getStates()
    {
        try {
            $response = Http::get($this->baseApiUrl.'/countries/states');

            if ($response->successful()) {
                return $response->json('data');
            }

            $this->error('Failed to fetch states data from API and the error is: '.($response->json('msg') ?? 'unknown error'));

            return [];
        } catch (Exception $exception) {
            $this->error('Error fetching states: '.$exception->getMessage());

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

            $stateData = array_map(fn (array $state): array => [
                'name' => Str::lower($state['name']),
                'code' => $state['state_code'],
                'country_id' => $countries[$countryIsoCode],
            ], $stateData);

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
}
