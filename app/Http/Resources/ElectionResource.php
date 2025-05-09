<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ElectionResource extends JsonResource
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
            'state' => $this->start_on->isFuture() ? 'upcoming' : ($this->end_on->isFuture() ? 'ongoing' : 'ended'),
            'level' => $this->level,
            'level_name' => $this->level_name,
            'election_start' => $this->start_on->format('Y-m-d H:i:s'),
            'election_end' => $this->end_on->format('Y-m-d H:i:s'),
            'lastUpdatedBy' => UserResource::make($this->whenLoaded('lastUpdatedBy')),
            'total_vote' => $this->when($this->end_on->isPast(), fn () => $this->votes_count ?? null),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
