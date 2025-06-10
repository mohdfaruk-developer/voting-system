<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

/**
 * @mixin \App\Models\Voter
 */
class VoterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'voter_number' => $this->voter_number,
            'date_of_birth' => $this->date_of_birth->format('Y-m-d'),
            'status' => $this->active ? 'Active' : 'Inactive',
            'aadhar_number' => $this->aadhar_number,
            'address' => $this->address,
            'city' => $this->city,
            'state' => $this->state,
            'country' => $this->country,
            'pin_code' => $this->pin_code,
            'religion' => $this->religion,
            'aadhar_image_path' => $this->aadhar_image_path && ! (str_starts_with($this->aadhar_image_path, 'http')) ?
                Storage::url($this->aadhar_image_path) : $this->aadhar_image_path,
            'user_id' => $this->user_id,
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
