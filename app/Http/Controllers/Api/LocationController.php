<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\LocationService;
use Exception;
use Illuminate\Http\JsonResponse;

final class LocationController extends Controller
{
    public function __construct(private readonly LocationService $locationService) {}

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
    public function statesByCountry(string $countryName): JsonResponse
    {
        try {
            $states = $this->locationService->getStatesByCountry($countryName);
        } catch (Exception) {
            return response()->json(['error' => 'Country not found'], 404);
        }

        return response()->json(['data' => $states, 'message' => 'States retrieved successfully']);
    }
}
