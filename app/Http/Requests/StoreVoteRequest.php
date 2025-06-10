<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\Election;
use App\Models\Vote;
use App\Models\Voter;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

final class StoreVoteRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'candidate_id' => [
                'required',
                'integer',
                Rule::exists('candidates', 'id')->where('election_id', $this->election->id),
            ],
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator(Validator $validator): void
    {
        if ($validator->errors()->count()) {
            return; // Skip if there are already errors
        }

        $validator->after(function ($validator): void {
            // Only check for duplicate products when creating, not updating
            $voter = Voter::where('user_id', $this->user()->id)
                ->where('active', Voter::STATUS_ACTIVE)
                ->first();

            if (! $voter) {
                $validator->errors()->add('vote', 'You are not a registered voter.');

                return;
            }

            if (Vote::where('election_id', $this->election->id)
                ->where('voter_id', $voter->id)
                ->exists()) {
                $validator->errors()->add('vote', 'You have already voted in this election.');

                return;
            }

            $election = $this->election;
            if ($election->start_on->greaterThan(now())) {
                $validator->errors()->add('vote', 'Voting has not started yet.');

                return;
            }

            if ($election->end_on->lessThan(now())) {
                $validator->errors()->add('vote', 'Voting has ended.');

                return;
            }

            if ($election->level === Election::LEVEL_OTHER) {
                return;
            }

            if (mb_strtolower((string) $voter[$election->level]) !== mb_strtolower((string) $election->level_name)) {
                $validator->errors()->add('vote', 'You are not eligible to vote in this election.'.
                    ' Your '.$election->level.' is '.$voter[$election->level].' but the election is for '.$election->level_name.'.');

                return;
            }
        });
    }
}
