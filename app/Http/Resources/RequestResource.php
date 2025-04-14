<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\RequestModel;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'data' => $this->data,
            'old_data' => $this->mergeWhen(
                in_array($this->type, [RequestModel::TYPE_EXIST_CANDIDATE, RequestModel::TYPE_EXIST_VOTER]),
                $this->old_data),
            'status' => $this->status,
            'comment' => $this->comment,
            'verifiedBy' => UserResource::make($this->whenLoaded('verifiedBy')),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
