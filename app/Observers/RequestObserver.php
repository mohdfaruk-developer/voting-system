<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\RequestModel;
use App\Models\Voter;
use App\Notifications\RequestApproved;
use App\Notifications\RequestRejected;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class RequestObserver
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
                // Create a new voter if the request is of type new_voter
                $voter = Voter::create(array_merge([
                    'user_id' => $requestModel->user_id,
                    'voter_number' => getVoterNumber(),
                ], $requestModel->data));
            } else {
                // Update the existing voter if the request is of type exist_voter
                $voter = Voter::findOrFail($requestModel->data['id']);
                if ($voter->state === Voter::STATUS_INACTIVE) {
                    throw new BadRequestHttpException('Voter is inactive');
                }
                // Update the voter's details
                $voter->update($requestModel->data);
            }

            // Send notification to the user
            Notification::send($requestModel->user, new RequestApproved($requestModel));
        } elseif (in_array($requestModel->type, [RequestModel::TYPE_NEW_CANDIDATE, RequestModel::TYPE_EXIST_CANDIDATE])) {
            if ($requestModel->type === RequestModel::TYPE_NEW_CANDIDATE) {
                // Create a new Candidate if request is of type new_candidate
            } else {
                // Update the existing Candidate if request is of type exist_candidate
            }
            // Send notification to the user
            // Notification::send($requestModel->user, new RequestApproved($requestModel));
        }
    }
}
