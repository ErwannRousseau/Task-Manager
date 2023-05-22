<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateCategoriesTable extends Migration
{
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 64)->comment('Le nom de la catégorie');
            $table->tinyInteger('status')->default(1);
            $table->timestamp('created_at')->default(now())->comment('La date de création de la catégorie');
            $table->timestamp('updated_at')->nullable()->comment('La date de la dernière mise à jour de la catégorie');
        });

        DB::table('categories')->insert([
            'name' => 'Informatique',
        ]);

        DB::table('categories')->insert([
            'name' => 'Bien etre et beauté',
        ]);

        DB::table('categories')->insert([
            'name' => 'Sport',
        ]);

        DB::table('categories')->insert([
            'name' => 'Détente',
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('categories');
    }
}
