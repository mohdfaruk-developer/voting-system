<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreCandidateRequest;
use App\Http\Requests\StoreVoterRequest;
use App\Http\Requests\UpdateRequestRequest;
use App\Models\RequestModel;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVoterRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(RequestModel $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequestRequest $request, RequestModel $requestModel)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeCandidateRequest(StoreCandidateRequest $request)
    {
        //
    }
}
