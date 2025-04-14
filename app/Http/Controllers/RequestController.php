<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreCandidateRequest;
use App\Http\Requests\StoreVoterRequest;
use App\Http\Requests\UpdateRequestRequest;
use App\Http\Resources\RequestResource;
use App\Models\RequestModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $formRequest)
    {
        $query = RequestModel::with(['verifiedBy']);

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('type')) {
            $query->where('type', request('type'));
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $user = $formRequest->user();
        if (! $user->is_admin) {
            $query->where('user_id', $user->id);
        }

        $requests = $query->orderBy($sortField, $sortDirection)
            ->paginate(15)
            ->onEachSide(1);

        return Inertia::render('Requests/Index', [
            'requests' => RequestResource::collection($requests),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Return the form for creating a new request
        return Inertia::render('Requests/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVoterRequest $formRequest)
    {
        // Validate and store the request data
        $validatedData = $formRequest->validated();

        // Create a new request
        $formRequest = RequestModel::create($validatedData);

        // Redirect to the requests index page
        return redirect()->route('requests.index')->with('success', 'Request created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(RequestModel $request)
    {
        // Return the details of the specified request
        return Inertia::render('Requests/Show', [
            'request' => RequestResource::make($request),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequestRequest $formRequest, RequestModel $request)
    {
        // Validate and update the request data
        $validatedData = $formRequest->validated();
        $user = request()->user();
        if (! $user->is_admin) {
            // Check if the user is authorized to update the request
            abort(403, 'Unauthorized action.');
        }
        // Check if the request is already approved or rejected
        if ($request->status !== RequestModel::STATUS_PENDING) {
            return redirect()->route('requests.index')->with('error', 'Already request is approved or rejected.');
        }
        // Update the request with the validated data
        $validatedData['verified_by'] = $user->id;
        $request->update($validatedData);

        // Redirect to the requests index page
        return redirect()->route('requests.index')->with('success', 'Request updated successfully.');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeCandidateRequest(StoreCandidateRequest $formRequest)
    {
        // Validate and store the candidate request data
        $validatedData = $formRequest->validated();

        // Create a new candidate request
        RequestModel::create($validatedData);

        // Redirect to the requests index page
        return redirect()->route('requests.index')->with('success', 'Candidate request created successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RequestModel $request)
    {
        $user = request()->user();
        if (! ($user->is_admin || $user->id == $request->user_id)) {
            // Check if the user is authorized to delete the request
            abort(403, 'Unauthorized action.');
        }
        // Check if the request is already approved or rejected
        if ($request->status !== RequestModel::STATUS_PENDING) {
            return redirect()->route('requests.index')->with('error', 'Cannot delete an approved or rejected request.');
        }
        // Delete the specified request
        $request->delete();

        // Redirect to the requests index page
        return redirect()->route('requests.index')->with('success', 'Request deleted successfully.');
    }
}
