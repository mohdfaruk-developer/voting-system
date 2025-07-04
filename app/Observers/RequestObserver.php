<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Candidate;
use App\Models\Election;
use App\Models\RequestModel;
use App\Models\Voter;
use App\Notifications\RequestApproved;
use App\Notifications\RequestRejected;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

final class RequestObserver
{
    /**
     * Handle the RequestModel "updated" event.
     */
    public function updated(RequestModel $requestModel): void
    {
        // Return void if the request state is not pending
        if ($requestModel->status === RequestModel::STATUS_PENDING) {
            return;
        }

        if ($requestModel->status === RequestModel::STATUS_REJECTED) {
            Notification::send($requestModel->user, new RequestRejected($requestModel));

            return;
        }

        if (in_array($requestModel->type, [RequestModel::TYPE_NEW_VOTER, RequestModel::TYPE_EXIST_VOTER])) {
            if ($requestModel->type === RequestModel::TYPE_NEW_VOTER) {
                if (Voter::where(['user_id' => $requestModel->user_id, 'active' => true])->exists()) {
                    throw new BadRequestHttpException('User already has a voter');
                }

                // Create a new voter if the request is of type new_voter
                $voter = Voter::create(array_merge([
                    'user_id' => $requestModel->user_id,
                    'voter_number' => getVoterNumber(),
                ], $requestModel->data));
            } else {
                // Update the existing voter if the request is of type exist_voter
                $voter = Voter::findOrFail($requestModel->data['voter_id']);
                if (! $voter->active) {
                    throw new BadRequestHttpException('Voter is inactive');
                }

                // Update the voter's details
                $data = $requestModel->data;
                if (isset($data['voter_alive']) && ! $data['voter_alive']) {
                    $data = ['active' => false];
                }

                unset($data['voter_id'], $data['voter_alive']);
                $voter->update($data);
            }

            // Send notification to the user
            Notification::send($requestModel->user, new RequestApproved($requestModel));
        } elseif (in_array($requestModel->type, [RequestModel::TYPE_NEW_CANDIDATE, RequestModel::TYPE_EXIST_CANDIDATE])) {
            $election = Election::find($requestModel->data['election_id']);
            if (! $election) {
                throw new BadRequestHttpException('Election not found');
            }

            if ($election->end_on->isPast()) {
                throw new BadRequestHttpException('Election has already ended');
            }

            if ($election->start_on->isPast()) {
                throw new BadRequestHttpException('Election is ongoing');
            }

            if ($election->candidates()->where('user_id', $requestModel->user_id)->exists()) {
                throw new BadRequestHttpException('User already has a candidate');
            }

            if ($requestModel->type === RequestModel::TYPE_NEW_CANDIDATE) {
                // Create a new Candidate if request is of type new_candidate
                $candidate = Candidate::create(array_merge([
                    'user_id' => $requestModel->user_id,
                ], $requestModel->data));

            } else {
                // Update the existing Candidate if request is of type exist_candidate
                $candidate = Candidate::with('election')->findOrFail($requestModel->data['candidate_id']);
                // Update the candidate's details
                $data = $requestModel->data;
                unset($data['candidate_id']);
                $candidate->update($data);
            }

            // Send notification to the user
            Notification::send($requestModel->user, new RequestApproved($requestModel));
        }
    }
}
