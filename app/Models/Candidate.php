<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'qualification',
        'property',
        'address',
        'city',
        'state',
        'country',
        'pin_code',
    ];

    /**
     * Get user
     *
     * @return void
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
