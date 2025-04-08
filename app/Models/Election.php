<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Election extends Model
{
    use HasFactory;

    /**
     * Election level constants
     */
    public const LEVEL_COUNTRY = 'country';

    public const LEVEL_STATE = 'state';

    public const LEVEL_CITY = 'city';

    public const LEVEL_LOCAL = 'local';

    /**
     * All available election levels
     */
    public const LEVELS = [
        self::LEVEL_COUNTRY,
        self::LEVEL_STATE,
        self::LEVEL_CITY,
        self::LEVEL_LOCAL,
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
    ];

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
