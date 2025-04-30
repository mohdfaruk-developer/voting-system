<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\RequestModel;
use Illuminate\Foundation\Http\FormRequest;

class StoreVoterRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'request_type' => [
                'required',
                'string',
                'in:' . implode(',', [RequestModel::TYPE_NEW_VOTER, RequestModel::TYPE_EXIST_VOTER]),
            ],
            'name' => [
                'required',
                'string',
                'max:100',
            ],
            'date_of_birth' => [
                'required',
                'date_format:Y-m-d',
                'before:' . now()->subYears(18)->format('Y-m-d'),
            ],
            'aadhar_number' => [
                'required',
                'string',
                'size:12',
                'regex:/^[0-9]+$/',
            ],
            'address' => [
                'required',
                'string',
                'max:255',
            ],
            'city' => [
                'required',
                'string',
                'max:100',
            ],
            'state' => [
                'required',
                'string',
                'max:100',
            ],
            'country' => [
                'required',
                'string',
                'max:100',
            ],
            'pin_code' => [
                'required',
                'string',
                'size:6',
                'regex:/^[0-9]+$/',
            ],
            'religion' => [
                'required',
                'string',
                'max:100',
            ],
            'aadhar_image' => [
                'required',
                'image',
                'mimes:jpeg,png,jpg,gif,svg',
                'max:2048', // 2MB
            ],
            'voter_alive' => [
                'boolean',
            ],
        ];
    }
}
