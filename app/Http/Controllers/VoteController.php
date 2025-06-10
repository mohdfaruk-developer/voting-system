<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreVoteRequest;
use App\Http\Resources\CandidateResource;
use App\Http\Resources\ElectionResource;
use App\Models\Election;
use App\Models\Vote;
use Inertia\Inertia;

class VoteController extends Controller
{
    /**
     * Show the form for creating a new vote.
     */
    public function create(Election $election)
    {
        $election->load('candidates.election');
        if ($election->start_on->greaterThan(now())) {
            return redirect()->route('elections.show', $election)->with('error', 'Voting has not started yet.');
        }

        if ($election->end_on->lessThan(now())) {
            return redirect()->route('elections.show', $election)->with('error', 'Voting has ended.');
        }

        return Inertia::render('Votes/Create', [
            'election' => ElectionResource::make($election),
            'candidates' => CandidateResource::collection($election->candidates),
        ]);
    }

    /**
     * Store a newly created vote in storage.
     */
    public function store(Election $election, StoreVoteRequest $request)
    {
        $validated = $request->validated();

        $vote = Vote::create([
            'voter_id' => $request->user()->voter->id,
            'election_id' => $election->id,
            'candidate_id' => $validated['candidate_id'],
        ]);

        return redirect()->route('elections.show', $vote->election)->with('success', 'Vote cast successfully.');
    }
}
