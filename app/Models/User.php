<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string $role
 * @property string|null $avatar
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property Carbon|null $two_factor_confirmed_at
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['name', 'email', 'password', 'role', 'avatar'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * List of available predefined animal avatars.
     *
     * @var array<int, string>
     */
    public const AVATARS = [
        '/images/avatar/anjing.png',
        '/images/avatar/kelinci.png',
        '/images/avatar/kucing.png',
        '/images/avatar/panda.png',
        '/images/avatar/penguin.png',
        '/images/avatar/rubah.png',
    ];

    /**
     * Get a random avatar path from available avatars.
     */
    public static function getRandomAvatar(): string
    {
        return self::AVATARS[array_rand(self::AVATARS)];
    }

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::creating(function (User $user) {
            if (empty($user->avatar)) {
                $user->avatar = static::getRandomAvatar();
            }
        });
    }

    /**
     * Get the user avatar, with deterministic fallback if empty.
     */
    protected function avatar(): Attribute
    {
        return Attribute::make(
            get: function (?string $value) {
                if (! empty($value)) {
                    return $value;
                }

                $index = $this->id ? ($this->id % count(self::AVATARS)) : 0;

                return self::AVATARS[$index];
            },
        );
    }

    /**
     * Check if user has admin role.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user has standard user role.
     */
    public function isUser(): bool
    {
        return $this->role === 'user';
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
