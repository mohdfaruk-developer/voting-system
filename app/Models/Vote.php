<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'election_id',
        'candidate_id',
        'voter_id',
    ];

    /**
     * Get election
     */
    public function election()
    {
        return $this->belongsTo(Election::class);
    }

    /**
     * Get candidate
     */
    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    /**
     * Get voter
     */
    public function voter()
    {
        return $this->belongsTo(Voter::class);
    }
}
