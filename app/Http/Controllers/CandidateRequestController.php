<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreCandidateRequest;
use App\Models\RequestModel;
use Illuminate\Http\Request;

class CandidateRequestController extends Controller
{
    /**
     * Show the form for creating a candidate request.
     */
    public function create(Request $formRequest)
    {
        //
    }

    /**
     * Store a newly created candidate request in storage.
     */
    public function store(StoreCandidateRequest $formRequest)
    {
        // Validate and store the candidate request data
        $validatedData = $formRequest->validated();

        // Create a new candidate request
        RequestModel::create($validatedData);

        // Redirect to the requests index page
        return redirect()->route('requests.index')->with('success', 'Candidate request created successfully.');
    }
}
