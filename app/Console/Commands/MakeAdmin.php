<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class MakeAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:make-admin {--email=} {--password=} {--name=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create new user with admin role';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->option('email');
        $password = $this->option('password');
        $name = $this->option('name');

        if (empty($email) || empty($password) || empty($name)) {
            $this->error('Please provide email, password, and name.');

            return;
        }

        // Create the user with admin role
        $user = \App\Models\User::updateOrCreate([
            'email' => $email,
        ], [
            'name' => $name,
            'password' => Hash::make($password),
        ]);

        $user->is_admin = true;
        $user->save();

        $this->info('Admin user created successfully.');
    }
}
