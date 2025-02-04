<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voter extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'voter_number',
        'date_of_birth',
        'active',
        'aadhar_number',
        'address',
        'city',
        'district',
        'state',
        'country',
        'pin_code',
        'religion',
        'aadhar_image_path',
    ];

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
}
