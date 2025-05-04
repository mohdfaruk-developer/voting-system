<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreVoterRequest;
use App\Http\Requests\UpdateRequestRequest;
use App\Http\Resources\RequestResource;
use App\Http\Resources\VoterResource;
use App\Models\RequestModel;
use App\Models\Voter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RequestController extends Controller
{
    /**
     * Display a listing of the request.
     */
    public function index(Request $formRequest)
    {
        $query = RequestModel::with(['lastUpdateBy']);

        $sortField = $formRequest->query('sort_field', 'created_at');
        $sortDirection = $formRequest->query('sort_direction', 'desc');

        if ($formRequest->has('type')) {
            $query->where('type', $formRequest->type);
        }
        if ($formRequest->has('status')) {
            $query->where('status', $formRequest->status);
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
            'queryParams' => $formRequest->query() ?: null,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Show the form for creating a voter request.
     */
    public function create(Request $formRequest)
    {
        $voter = Voter::find($formRequest->voter_id);

        if ($voter->user_id !== $formRequest->user()->id) {
            // Check if the user is authorized to create the request
            abort(403, 'Unauthorized action.');
        }

        // Return the form for creating a new request
        return Inertia::render('Requests/Create', [
            'voter' => $voter ? VoterResource::make($voter) : null,
        ]);
    }

    /**
     * Store a newly created voter request in storage.
     */
    public function store(StoreVoterRequest $formRequest)
    {
        $voter = Voter::find($formRequest->voter_id);
        if ($voter && $formRequest->request_type === RequestModel::TYPE_EXIST_VOTER && ! $voter->active) {
            return redirect()->route('requests.index')->with('error', "Can't create update-voter-request because voter is inactivated.");
        }
        if ($voter && $voter->user_id !== $formRequest->user()->id) {
            // Check if the user is authorized to create the request
            abort(403, 'Unauthorized action.');
        }
        // Validate and store the request data
        $validatedData = RequestModel::getVoterRequestData($formRequest, $voter);

        if ($formRequest->request_type === RequestModel::TYPE_NEW_VOTER && Voter::where([
            'user_id' => $formRequest->user()->id,
            'active' => true,
        ])->exists()) {
            return redirect()->route('requests.index')->with('error', "Can't create voter request because You have already voter card.");
        }

        // Create a new request
        $request = RequestModel::create($validatedData);

        // Redirect to the requests index page
        return redirect()->route('requests.show', $request)->with('success', 'Request created successfully.');
    }

    /**
     * Display the specified request.
     */
    public function show(RequestModel $request)
    {
        $user = request()->user();
        if (! ($user->is_admin || $user->id == $request->user_id)) {
            // Check if the user is authorized to delete the request
            abort(403, 'Unauthorized action.');
        }

        // Return the details of the specified request
        return Inertia::render('Requests/Show', [
            'request' => RequestResource::make($request->load(['lastUpdateBy', 'user'])),
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Update the specified request in storage.
     */
    public function update(UpdateRequestRequest $formRequest, RequestModel $request)
    {
        // Validate and update the request data
        $validatedData = $formRequest->validated();
        $user = $formRequest->user();
        if (! $user->is_admin) {
            // Check if the user is authorized to update the request
            abort(403, 'Unauthorized action.');
        }
        // Check if the request is already approved or rejected
        if ($request->status !== RequestModel::STATUS_PENDING) {
            return redirect()->route('requests.show', $request)->with('error', 'Already request is approved or rejected.');
        }
        try {
            DB::beginTransaction();
            // Update the request with the validated data
            $validatedData['last_update_by'] = $user->id;
            $request->update($validatedData);
            DB::commit();
        } catch (\Illuminate\Database\QueryException $e) {
            DB::rollBack();

            return redirect()->route('requests.show', $request)->with('error', Str::before($e->getMessage(), '(Connection:'));
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->route('requests.show', $request)->with('error', $e->getMessage());
        }

        // Redirect to the requests index page
        return redirect()->route('requests.show', $request)->with('success', 'Request updated successfully.');
    }

    /**
     * Remove the specified request from storage.
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
            return redirect()->route('requests.show', $request)->with('error', 'Cannot delete an approved or rejected request.');
        }
        // Delete the specified request
        $request->delete();

        // Redirect to the requests index page
        return redirect()->route('requests.index')->with('success', 'Request deleted successfully.');
    }
}
