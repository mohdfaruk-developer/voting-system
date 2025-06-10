<?php

declare(strict_types=1);

namespace App\Models;

use App\Observers\RequestObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Class RequestModel
 *
 * Represents a request made by a user for voter or candidate registration.
 *
 * @property int $id
 * @property int $user_id
 * @property string $type
 * @property array $data
 * @property array $old_data
 * @property string $status
 * @property string|null $comment
 * @property int|null $last_updated_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read User $user
 * @property-read User|null $lastUpdatedBy
 *
 * @method static \Illuminate\Database\Eloquent\Builder|RequestModel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RequestModel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RequestModel query()
 * @method static \Illuminate\Database\Eloquent\Builder|RequestModel whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RequestModel whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RequestModel whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RequestModel whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RequestModel whereOldData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RequestModel whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RequestModel whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RequestModel whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RequestModel whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RequestModel whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
#[ObservedBy([RequestObserver::class])]
final class RequestModel extends Model
{
    use HasFactory;

    /**
     * Request status constants
     */
    public const STATUS_PENDING = 'pending';

    public const STATUS_APPROVED = 'approved';

    public const STATUS_REJECTED = 'rejected';

    /**
     * All available status values
     */
    public const STATUSES = [
        self::STATUS_PENDING,
        self::STATUS_APPROVED,
        self::STATUS_REJECTED,
    ];

    /**
     * Request types constants
     */
    public const TYPE_NEW_VOTER = 'new_voter';

    public const TYPE_EXIST_VOTER = 'exist_voter';

    public const TYPE_NEW_CANDIDATE = 'new_candidate';

    public const TYPE_EXIST_CANDIDATE = 'exist_candidate';

    protected $table = 'requests';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'type',
        'data',
        'old_data',
        'status',
        'comment',
        'last_updated_by',
    ];

    /**
     * Prepare the data for voter request.
     */
    public static function getVoterRequestData(Request $request, ?Voter $model = null): array
    {
        if ($model) {
            $keys = ['name', 'date_of_birth', 'aadhar_number', 'address', 'city', 'state', 'country', 'pin_code', 'religion', 'voter_alive'];
            foreach ($keys as $key) {
                if ($key === 'voter_alive' && ! $request[$key]) {
                    $data['data'][$key] = (bool) $request[$key];
                    $data['old_data'][$key] = true;
                }
                if ($key === 'date_of_birth' && date('Y-m-d', strtotime($request[$key])) !== $model->{$key}->format('Y-m-d')) {
                    $data['data'][$key] = $request[$key];
                    $data['old_data'][$key] = $model->{$key}->format('Y-m-d');
                }
                if (in_array($key, ['voter_alive', 'date_of_birth'])) {
                    continue;
                }
                if (isset($request[$key]) && $request[$key] !== $model->{$key}) {
                    $data['data'][$key] = $request[$key];
                    $data['old_data'][$key] = $model->{$key};
                }
            }
            $data['data']['voter_id'] = $model->id;
            $data += [
                'user_id' => $request->user()->id,
                'type' => self::TYPE_EXIST_VOTER,
                'status' => self::STATUS_PENDING,
            ];
        } else {
            $data = [
                'user_id' => $request->user()->id,
                'type' => self::TYPE_NEW_VOTER,
                'data' => [
                    'name' => $request['name'],
                    'date_of_birth' => $request['date_of_birth'],
                    'aadhar_number' => $request['aadhar_number'],
                    'address' => $request['address'],
                    'city' => $request['city'],
                    'state' => $request['state'],
                    'country' => $request['country'],
                    'pin_code' => $request['pin_code'],
                    'religion' => $request['religion'],
                ],
                'status' => self::STATUS_PENDING,
            ];
        }
        if ($request->hasFile('aadhar_image')) {
            // Store the uploaded file and get the path
            $data['data']['aadhar_image_path'] = $request->file('aadhar_image')->store('aadhar_images/'.Str::random(), 'public');
        }

        return $data;
    }

    /**
     * Prepare the data for candidate request.
     */
    public static function getCandidateRequestData(Request $request, ?Candidate $model = null): array
    {
        if ($model) {
            $keys = ['name', 'description', 'qualification', 'property', 'address', 'city', 'state', 'country', 'pin_code'];
            foreach ($keys as $key) {
                if (isset($request[$key]) && $request[$key] !== $model->{$key}) {
                    $data['data'][$key] = $request[$key];
                    $data['old_data'][$key] = $model->{$key};
                }
            }
            $data['data']['election_id'] = $model->election_id;
            $data['data']['candidate_id'] = $model->id;
            $data += [
                'user_id' => $request->user()->id,
                'type' => self::TYPE_EXIST_CANDIDATE,
                'status' => self::STATUS_PENDING,
            ];
        } else {
            $data = [
                'user_id' => $request->user()->id,
                'type' => self::TYPE_NEW_CANDIDATE,
                'data' => [
                    'name' => $request['name'],
                    'election_id' => $request['election_id'],
                    'description' => $request['description'],
                    'qualification' => $request['qualification'],
                    'property' => $request['property'],
                    'address' => $request['address'],
                    'city' => $request['city'],
                    'state' => $request['state'],
                    'country' => $request['country'],
                    'pin_code' => $request['pin_code'],
                ],
                'status' => self::STATUS_PENDING,
            ];
        }
        if ($request->hasFile('candidate_image')) {
            // Store the uploaded file and get the path
            $data['data']['candidate_image'] = $request->file('candidate_image')->store('candidate_images/'.Str::random(), 'public');
        }

        return $data;
    }

    /**
     * Get user
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get last updated by user
     */
    public function lastUpdatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'last_updated_by');
    }

    /**
     * Delete the request.
     */
    public function delete(): bool
    {
        if (isset($this->data['aadhar_image_path']) && Storage::disk('public')->deleteDirectory(dirname($this->data['aadhar_image_path']))) {
            // Delete the request
            return parent::delete();
        }
        if (isset($this->data['candidate_image']) && Storage::disk('public')->deleteDirectory(dirname($this->data['candidate_image']))) {
            // Delete the request
            return parent::delete();
        }

        return false;
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'data' => 'json',
            'old_data' => 'json',
        ];
    }
}
