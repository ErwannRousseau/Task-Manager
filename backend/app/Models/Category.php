<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
// Création de la classe Movie héritant de toutes les capacités de Model
// héritage de méthodes find(), all()...
class Category extends Model
{
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
