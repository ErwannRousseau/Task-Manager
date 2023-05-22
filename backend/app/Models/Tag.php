<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
// Création de la classe Movie héritant de toutes les capacités de Model
// héritage de méthodes find(), all()...
class Tag extends Model
{
    public function tasks(): BelongsToMany
    {
        return $this->belongsToMany(Task::class);
    }
}
