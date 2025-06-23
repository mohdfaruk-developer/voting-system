<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Voter
 *
 * Represents a voter with various attributes and relationships.
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $voter_number
 * @property \Illuminate\Support\Carbon|null $date_of_birth
 * @property bool $active
 * @property string|null $aadhar_number
 * @property string|null $address
 * @property string|null $city
 * @property string|null $state
 * @property string|null $country
 * @property string|null $pin_code
 * @property string|null $religion
 * @property string|null $aadhar_image_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Vote> $votes
 * @property-read int|null $votes_count
 * @property-read User|null $user
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Voter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Voter newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Voter query()
 * @method static \Illuminate\Database\Eloquent\Builder|Voter whereAadharImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voter whereAadharNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voter whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voter whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voter whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voter whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voter whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voter whereDateOfBirth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voter whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voter whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voter wherePinCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voter whereReligion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voter whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voter whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voter whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Voter whereVoterNumber($value)
 *
 * @mixin \Eloquent
 */
final class Voter extends Model
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

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
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
}
