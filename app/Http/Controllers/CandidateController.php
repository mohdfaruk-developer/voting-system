<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\CandidateResource;
use App\Models\Candidate;
use App\Models\Election;
use Inertia\Inertia;

class CandidateController extends Controller
{
    /**
     * Display the specified candidate.
     */
    public function show(Election $election, Candidate $candidate)
    {
        $candidate->load('election')->loadCount('votes');

        return Inertia::render('Candidates/Show', [
            'candidate' => CandidateResource::make($candidate),
            'error' => session('error'),
            'success' => session('success'),
        ]);
    }

    /**
     * Remove the specified candidate from storage.
     */
    public function destroy(Election $election, Candidate $candidate)
    {
        $user = request()->user();
        if ($user->is_admin || $candidate->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        // Check if the election has already ended
        if ($election->end_on->isPast()) {
            return redirect()->route('candidates.show', [$election, $candidate])->with('error', "Can't delete candidate because election has already ended.");
        }

        // Check if the election is ongoing
        if ($election->start_on->isPast()) {
            return redirect()->route('candidates.show', [$election, $candidate])->with('error', "Can't delete candidate because election is ongoing.");
        }

        $candidate->delete();

        return redirect()->route('elections.show', $election)->with('success', 'Candidate deleted successfully.');
    }
}
