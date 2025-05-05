<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreElectionRequest;
use App\Http\Requests\UpdateElectionRequest;
use App\Http\Resources\ElectionResource;
use App\Models\Election;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ElectionController extends Controller
{
    /**
     * Display a listing of the election.
     */
    public function index(Request $request)
    {
        $query = Election::with('lastUpdatedBy');

        if ($request->search) {
            $query->whereAny(
                ['name', 'description'],
                'like',
                '%' . $request->search . '%'
            );
        }
        $elections = $query->latest()->paginate(15)->onEachSide(1);

        return Inertia::render('Elections/Index', [
            'elections' => ElectionResource::collection($elections),
            'queryParams' => $request->query() ?: null,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Show the form for creating a new election.
     */
    public function create()
    {
        $user = request()->user();
        if (! $user->is_admin) {
            // Check if the user is authorized to creating the election
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Elections/Create');
    }

    /**
     * Store a newly created election in storage.
     */
    public function store(StoreElectionRequest $request)
    {
        $user = $request->user();
        if (! $user->is_admin) {
            // Check if the user is authorized to creating the election
            abort(403, 'Unauthorized action.');
        }

        $election = Election::create(array_merge(
            $request->validated(),
            [
                'last_updated_by' => $user->id,
            ]
        ));

        return redirect()->route('elections.show', $election)->with('success', 'Election created successfully.');
    }

    /**
     * Display the specified election.
     */
    public function show(Election $election)
    {
        $election->load(['lastUpdatedBy', 'candidates' => function ($query) use ($election) {
            if ($election->end_on->isPast()) {
                $query->withCount('votes');
            }
            if (request('search')) {
                $query->whereAny(
                    ['name', 'description', 'qualification', 'property', 'address', 'city', 'state', 'country', 'pin_code'],
                    'like',
                    '%' . request('search') . '%'
                );
            }
            $query->oldest();
        }]);

        if ($election->end_on->isPast()) {
            $election->loadCount('votes');
        }

        return Inertia::render('Elections/Show', [
            'election' => ElectionResource::make($election),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Show the form for editing the specified election.
     */
    public function edit(Election $election)
    {
        $user = request()->user();
        if (! $user->is_admin) {
            // Check if the user is authorized to updating the election
            abort(403, 'Unauthorized action.');
        }

        if ($election->end_on->isPast()) {
            // Check if the election is already ended
            return redirect()->route('elections.show', $election)->with('error', 'Election is already ended.');
        }

        return Inertia::render('Elections/Edit', [
            'election' => ElectionResource::make($election),
        ]);
    }

    /**
     * Update the specified election in storage.
     */
    public function update(UpdateElectionRequest $request, Election $election)
    {
        $user = request()->user();
        if (! $user->is_admin) {
            // Check if the user is authorized to updating the election
            abort(403, 'Unauthorized action.');
        }

        if ($election->end_on->isPast()) {
            // Check if the election is already ended
            return redirect()->route('elections.show', $election)->with('error', 'Election is already ended.');
        }

        $election->update(array_merge(
            $request->validated(),
            [
                'last_updated_by' => $user->id,
            ]
        ));

        return redirect()->route('elections.show', $election)->with('success', 'Election updated successfully.');
    }

    /**
     * Remove the specified election from storage.
     */
    public function destroy(Election $election)
    {
        $user = request()->user();
        if (! $user->is_admin) {
            // Check if the user is authorized to deleting the election
            abort(403, 'Unauthorized action.');
        }

        if ($election->end_on->isPast()) {
            // Check if the election is already ended
            return redirect()->route('elections.show', $election)->with('error', 'Election is already ended.');
        }

        $election->delete();

        return redirect()->route('elections.index')->with('success', 'Election deleted successfully.');
    }
}
