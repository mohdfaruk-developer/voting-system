<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\UpdateVoterRequest;
use App\Http\Resources\VoterResource;
use App\Models\Voter;

class VoterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Voter $voter)
    {
        $user = request()->user();
        if (! ($user->is_admin || $user->id == $voter->user_id)) {
            // Check if the user is authorized to delete the request
            abort(403, 'Unauthorized action.');
        }

        return inertia('Voter/Show', [
            'voter' => VoterResource::make($voter),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVoterRequest $request, Voter $voter)
    {
        //
    }
}
