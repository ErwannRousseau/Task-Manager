<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;


class CreateTasksTable extends Migration
{
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->tinyInteger('status')->default(1);
            $table->unsignedSmallInteger('category_id')->nullable();
            $table->timestamps();
        });

        DB::table('tasks')->insert([
            'title' => 'Ajouter, modifier, supprimer des tâches',
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
