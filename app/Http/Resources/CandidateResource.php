<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CandidateResource extends JsonResource
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
            'description' => $this->description,
            'qualification' => $this->qualification,
            'candidate_image' => $this->candidate_image && ! (str_starts_with($this->candidate_image, 'http')) ?
                Storage::url($this->candidate_image) : $this->candidate_image,
            'property' => $this->property,
            'address' => $this->address,
            'city' => $this->city,
            'state' => $this->state,
            'country' => $this->country,
            'pin_code' => $this->pin_code,
            'user_id' => $this->user_id,
            'election_id' => $this->election_id,
            'total_vote' => $this->when($this->election->end_on->isPast(), fn () => $this->votes_count ?? null),
            'election' => ElectionResource::make($this->whenLoaded('election')),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
