<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\VoterResource;
use App\Models\Voter;
use Illuminate\Http\Request;

final class VoterController extends Controller
{
    /**
     * Display a listing of the voter.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        if (! $user->is_admin) {
            // Check if the user is authorized to listing the voters
            abort(403, 'Unauthorized action.');
        }

        $query = Voter::query();
        if ($request->search) {
            $query->whereAny(
                ['voter_number', 'name', 'aadhar_number', 'address', 'city', 'state', 'country', 'religion', 'pin_code'],
                'like',
                '%'.$request->search.'%'
            );
        }

        if ($request->has('active')) {
            $query->where('active', $request['active']);
        }

        $voters = $query->latest()->paginate(15)->onEachSide(1);

        return inertia('Voters/Index', [
            'voters' => VoterResource::collection($voters),
            'queryParams' => $request->query() ?: null,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Display the specified voter.
     */
    public function show(Voter $voter)
    {
        $user = request()->user();
        if (! $user->is_admin && $user->id !== $voter->user_id) {
            // Check if the user is authorized to delete the request
            abort(403, 'Unauthorized action.');
        }

        return inertia('Voters/Show', [
            'voter' => VoterResource::make($voter),
        ]);
    }
}
