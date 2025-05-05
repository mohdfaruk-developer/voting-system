<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreElectionRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:elections,name',
            ],
            'description' => [
                'required',
                'string',
                'max:1000',
            ],
            'level' => [
                'required',
                'string',
                'in:' . implode(',', \App\Models\Election::LEVELS),
            ],
            'level_name' => [
                'required',
                'string',
                'max:255',
            ],
            'start_on' => [
                'required',
                'date_format:Y-m-d H:i:s',
                'after:today',
            ],
            'end_on' => [
                'required',
                'date_format:Y-m-d H:i:s',
                'after:start_on',
            ],
        ];
    }
}
