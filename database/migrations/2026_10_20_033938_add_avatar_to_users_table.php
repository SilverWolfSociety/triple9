<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('avatar')->nullable()->after('role');
        });

        $avatars = [
            '/images/avatar/anjing.png',
            '/images/avatar/kelinci.png',
            '/images/avatar/kucing.png',
            '/images/avatar/panda.png',
            '/images/avatar/penguin.png',
            '/images/avatar/rubah.png',
        ];

        $users = DB::table('users')->get();
        foreach ($users as $index => $user) {
            DB::table('users')
                ->where('id', $user->id)
                ->update(['avatar' => $avatars[$index % count($avatars)]]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('avatar');
        });
    }
};
