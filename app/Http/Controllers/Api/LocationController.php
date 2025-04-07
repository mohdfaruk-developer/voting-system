<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\LocationService;
use Illuminate\Http\JsonResponse;

class LocationController extends Controller
{
    protected LocationService $locationService;

    public function __construct(LocationService $locationService)
    {
        $this->locationService = $locationService;
    }

    /**
     * Get all countries
     */
    public function countries(): JsonResponse
    {
        $countries = $this->locationService->getCountries();

        return response()->json(['data' => $countries, 'message' => 'Countries retrieved successfully']);
    }

    /**
     * Get states by country
     */
    public function statesByCountry(string $isoCode): JsonResponse
    {
        $states = $this->locationService->getStatesByCountry($isoCode);

        return response()->json(['data' => $states, 'message' => 'States retrieved successfully']);
    }

    /**
     * Get cities by country and state
     */
    public function citiesByCountryAndState(string $isoCode, string $stateCode): JsonResponse
    {
        $cities = $this->locationService->getCitiesByCountryAndState($isoCode, $stateCode);

        return response()->json(['data' => $cities, 'message' => 'Cities retrieved successfully']);
    }

    /**
     * Get cities by country and state
     */
    public function citiesByCountry(string $isoCode): JsonResponse
    {
        $cities = $this->locationService->getCitiesByCountryOnly($isoCode);

        return response()->json(['data' => $cities, 'message' => 'Cities retrieved successfully']);
    }
}
