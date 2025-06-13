<?php

declare(strict_types=1);

use App\Models\Voter;

if (! function_exists('getVoterNumber')) {
    /**
     * Generate unique voter number.
     */
    function getVoterNumber()
    {
        $voterNumber = 'VO'.mb_str_pad((string) random_int(0, 99999999), 8, '0', STR_PAD_LEFT);
        $existingVoter = Voter::where('voter_number', $voterNumber)->first();

        if ($existingVoter) {
            return getVoterNumber();
        }

        return $voterNumber;
    }
}

if (! function_exists('getRequestTypeLabel')) {
    /**
     * Get request type label.
     */
    function getRequestTypeLabel(string $type): string
    {
        $labels = [
            'new_voter' => 'new voter',
            'exist_voter' => 'update voter',
            'new_candidate' => 'new candidate',
            'exist_candidate' => 'update candidate',
        ];

        return $labels[$type] ?? 'unknown';
    }
}
