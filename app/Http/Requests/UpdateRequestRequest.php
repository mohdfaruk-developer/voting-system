<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class UpdateRequestRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => [
                'required',
                'string',
                'in:'.implode(',', \App\Models\RequestModel::STATUSES),
            ],
            'comment' => [
                'required_if:status,'.\App\Models\RequestModel::STATUS_REJECTED,
                'string',
            ],
        ];
    }
}
