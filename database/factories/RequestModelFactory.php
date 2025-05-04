<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\RequestModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RequestModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'status' => RequestModel::STATUS_PENDING,
            'user_id' => User::get()->random()->id,
            'type' => fake()->randomElement([
                RequestModel::TYPE_NEW_VOTER,
                RequestModel::TYPE_NEW_CANDIDATE,
            ]),
            'data' => [
                'date_of_birth' => fake()->date(),
                'aadhar_number' => fake()->unique()->numerify('###########'),
                'address' => fake()->address(),
                'city' => fake()->city(),
                'state' => fake()->state(),
                'country' => fake()->country(),
                'pin_code' => fake()->postcode(),
                'religion' => fake()->word(),
            ],
            'old_data' => null,
            'last_update_by' => null,
            'comment' => null,
        ];
    }

    public function existTypeRequest(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => fake()->randomElement([
                RequestModel::TYPE_EXIST_VOTER,
                RequestModel::TYPE_EXIST_CANDIDATE,
            ]),
            'old_data' => [
                'date_of_birth' => fake()->date(),
                'aadhar_number' => fake()->unique()->numerify('###########'),
                'address' => fake()->address(),
                'city' => fake()->city(),
                'state' => fake()->state(),
                'country' => fake()->country(),
                'pin_code' => fake()->postcode(),
                'religion' => fake()->word(),
            ],
        ]);
    }

    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => RequestModel::STATUS_APPROVED,
            'last_update_by' => User::where('is_admin', true)->get()->random()->id,
        ]);
    }

    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => RequestModel::STATUS_REJECTED,
            'comment' => fake()->sentence(),
            'last_update_by' => User::where('is_admin', true)->get()->random()->id,
        ]);
    }
}
