<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class RequestResource extends JsonResource
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
            'user' => UserResource::make($this->whenLoaded('user')),
            'type' => $this->type,
            'data' => array_merge(
                $this->data,
                ['aadhar_image_path' => isset($this->data['aadhar_image_path']) && ! (str_starts_with($this->data['aadhar_image_path'], 'http')) ?
                    Storage::url($this->data['aadhar_image_path']) : $this->data['aadhar_image_path'] ?? null,
                ],
                ['candidate_image' => isset($this->data['candidate_image']) && ! (str_starts_with($this->data['candidate_image'], 'http')) ?
                    Storage::url($this->data['candidate_image']) : $this->data['candidate_image'] ?? null,
                ]
            ),
            'old_data' => $this->old_data,
            'status' => $this->status,
            'comment' => $this->comment,
            'user_id' => $this->user_id,
            'lastUpdatedBy' => UserResource::make($this->whenLoaded('lastUpdatedBy')),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
