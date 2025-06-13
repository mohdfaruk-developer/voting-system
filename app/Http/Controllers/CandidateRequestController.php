<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreCandidateRequest;
use App\Http\Resources\CandidateResource;
use App\Models\Candidate;
use App\Models\Election;
use App\Models\RequestModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

final class CandidateRequestController extends Controller
{
    /**
     * Show the form for creating a candidate request.
     */
    public function create(Election $election, Request $request)
    {
        $candidate = Candidate::where('election_id', $election->id)->find($request->candidate_id);

        $user = $request->user();
        if ($user->is_admin) {
            // Check if the user is an admin
            abort(403, 'Unauthorized action.');
        }

        if ($candidate && $candidate->user_id !== $user->id) {
            // Check if the user is authorized to create the request
            abort(403, 'Unauthorized action.');
        }

        if ($election->end_on->isPast()) {
            // Check if the election has already ended
            return redirect()->route('elections.show', $election)->with('error', "Can't create request because election has already ended.");
        }

        if ($election->start_on->isPast()) {
            // Check if the election is ongoing
            return redirect()->route('elections.show', $election)->with('error', "Can't create request because election is ongoing.");
        }

        // Return the form for creating a new request
        return Inertia::render('Elections/Requests/Create', [
            'candidate' => $candidate ? CandidateResource::make($candidate) : null,
        ]);
    }

    /**
     * Store a newly created candidate request in storage.
     */
    public function store(Election $election, StoreCandidateRequest $request)
    {
        $candidate = Candidate::where('election_id', $election->id)->find($request->candidate_id);
        $request->merge(['election_id' => $election->id]);

        $user = $request->user();
        if ($user->is_admin) {
            // Check if the user is an admin
            abort(403, 'Unauthorized action.');
        }

        if ($candidate && $candidate->user_id !== $user->id) {
            // Check if the user is authorized to create the request
            abort(403, 'Unauthorized action.');
        }

        if ($election->end_on->isPast()) {
            // Check if the election has already ended
            return redirect()->route('elections.show', $election)->with('error', "Can't create request because election has already ended.");
        }

        if ($election->start_on->isPast()) {
            // Check if the election is ongoing
            return redirect()->route('elections.show', $election)->with('error', "Can't create request because election is ongoing.");
        }

        // Validate and store the request data
        $validatedData = RequestModel::getCandidateRequestData($request, $candidate);

        if ($request->request_type === RequestModel::TYPE_NEW_CANDIDATE && Candidate::where([
            'user_id' => $user->id,
            'election_id' => $election->id,
        ])->exists()) {
            return redirect()->route('elections.show', $election)->with('error', "Can't create candidate request because You have already applied this election.");
        }

        // Create a new candidate request
        $requestModel = RequestModel::create($validatedData);

        // Redirect to the requests index page
        return redirect()->route('requests.show', $requestModel)->with('success', 'Candidate request created successfully.');
    }
}
