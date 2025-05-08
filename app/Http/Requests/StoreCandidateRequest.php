<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\RequestModel;
use Illuminate\Foundation\Http\FormRequest;

class StoreCandidateRequest extends FormRequest
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
                'in:' . implode(',', [RequestModel::TYPE_NEW_CANDIDATE, RequestModel::TYPE_EXIST_CANDIDATE]),
            ],
            'name' => [
                'required',
                'string',
                'max:100',
            ],
            'description' => [
                'required',
                'string',
                'max:100',
            ],
            'qualification' => [
                'nullable',
                'string',
                'max:255',
            ],
            'property' => [
                'required',
                'numeric',
                'min:0',
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
            'candidate_image' => [
                'required',
                'image',
                'mimes:jpeg,png,jpg,gif,svg',
                'max:2048', // 2MB
            ],
        ];
    }
}
