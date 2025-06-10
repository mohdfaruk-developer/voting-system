<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\RequestModel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

final class RequestRejected extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * The request model instance.
     */
    protected RequestModel $requestModel;

    /**
     * Create a new notification instance.
     */
    public function __construct(RequestModel $requestModel)
    {
        $this->requestModel = $requestModel;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $url = url('/requests', $this->requestModel->id);
        $requestTypeLabel = getRequestTypeLabel($this->requestModel->type);

        return (new MailMessage())
            ->subject('Request Rejected')
            ->greeting('Hello!')
            ->line("Your {$requestTypeLabel} request has been rejected.")
            ->action('View Request', $url)
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
