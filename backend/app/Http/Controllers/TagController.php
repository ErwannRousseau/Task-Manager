<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TagController extends Controller
{
    // Création de la méthode list
    public function list()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $tags = Tag::all();

        // Retour automatique au format JSON 👌
        return $tags;
    }

    public function show($tagId)
    {
        $tags = Tag::find($tagId);

        return $tags;
    }

    public function create(Request $request)
    {
        // On vérifie si la donnée title est bien dans le corps de la requête
        $validator = Validator::make($request->input(), [
            'label' => ['required', 'filled']
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $label = $request->input('label');

        $tag = new Tag();
        $tag->label = $label;

        if ($tag->save()) {
            return response()->json($tag, 201);
        } else {
            return response(null, 500);
        }
    }

    public function update(Request $request, $tagId)
    {
        $tag = Tag::find($tagId);

        if (!$tag) {
            return response(null, 404);
        }

        // On vérifie si la donnée title est bien dans le corps de la requête
        $validator = Validator::make($request->input(), [
            'label' => ['required', 'filled']
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $label = $request->input('label');

        $tag->label = $label;

        if ($tag->save()) {
            return response()->json($tag, 201);
        } else {
            return response(null, 500);
        }
    }

    public function delete($tagId)
    {
        $tag = Tag::find($tagId);

        if (!$tag) {
            return response(null, 404);
        }

        if ($tag->delete()) {
            return response(null, 200);
        } else {
            return response(null, 500);
        }
    }
}
