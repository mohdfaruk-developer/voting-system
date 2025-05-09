<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\ElectionResource;
use App\Http\Resources\VoterResource;
use App\Models\Election;
use App\Models\Voter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $voter = Voter::where([
            'user_id' => $request->user()->id,
            'active' => true,
        ])->first();

        $elections = Election::where('end_on', '>', now())->get();

        return Inertia::render('Dashboard', [
            'voter' => $voter ? VoterResource::make($voter) : null,
            'elections' => ElectionResource::collection($elections),
        ]);
    }
}
