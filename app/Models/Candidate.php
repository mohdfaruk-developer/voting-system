<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Candidate
 *
 * Represents a candidate in an election with various attributes and relationships.
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property int $election_id
 * @property string|null $candidate_image
 * @property string|null $description
 * @property string|null $qualification
 * @property string|null $property
 * @property string|null $address
 * @property string|null $city
 * @property string|null $state
 * @property string|null $country
 * @property string|null $pin_code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Election|null $election
 * @property-read User|null $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Vote> $votes
 * @property-read int|null $votes_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate query()
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate whereCandidateImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate whereElectionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate wherePinCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate whereProperty($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate whereQualification($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Candidate whereUserId($value)
 *
 * @mixin \Eloquent
 */
final class Candidate extends Model
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
        'election_id',
        'candidate_image',
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
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get election
     */
    public function election(): BelongsTo
    {
        return $this->belongsTo(Election::class);
    }

    /**
     * Get all votes
     */
    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }
}
