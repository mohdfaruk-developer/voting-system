<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Voter extends Model
{
    use HasFactory;

    /**
     * Status constants
     */
    public const STATUS_ACTIVE = true;

    public const STATUS_INACTIVE = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'voter_number',
        'date_of_birth',
        'active',
        'aadhar_number',
        'address',
        'city',
        'state',
        'country',
        'pin_code',
        'religion',
        'aadhar_image_path',
    ];

    /**
     * Get user
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'date_of_birth' => 'datetime',
            'active' => 'boolean',
        ];
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }
}
