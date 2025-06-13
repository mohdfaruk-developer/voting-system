<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Election
 *
 * Represents an election with various attributes and relationships.
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $level
 * @property string $level_name
 * @property \Illuminate\Support\Carbon $start_on
 * @property \Illuminate\Support\Carbon $end_on
 * @property int|null $last_updated_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read User|null $lastUpdatedBy
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Candidate> $candidates
 * @property-read int|null $candidates_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Vote> $votes
 * @property-read int|null $votes_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Election newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Election newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Election query()
 * @method static \Illuminate\Database\Eloquent\Builder|Election whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Election whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Election whereEndOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Election whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Election whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Election whereLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Election whereLevelName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Election whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Election whereStartOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Election whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
final class Election extends Model
{
    use HasFactory;

    /**
     * Election level constants
     */
    public const LEVEL_COUNTRY = 'country';

    public const LEVEL_STATE = 'state';

    public const LEVEL_CITY = 'city';

    public const LEVEL_OTHER = 'other';

    /**
     * All available election levels
     */
    public const LEVELS = [
        self::LEVEL_COUNTRY,
        self::LEVEL_STATE,
        self::LEVEL_CITY,
        self::LEVEL_OTHER,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'level',
        'level_name',
        'start_on',
        'end_on',
        'last_updated_by',
    ];

    /**
     * Get last updated by user
     */
    public function lastUpdatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'last_updated_by');
    }

    /**
     * Get all candidates
     */
    public function candidates(): HasMany
    {
        return $this->hasMany(Candidate::class);
    }

    /**
     * Get all votes
     */
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
            'start_on' => 'datetime',
            'end_on' => 'datetime',
        ];
    }
}
