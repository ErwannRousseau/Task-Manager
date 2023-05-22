<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    // Création de la méthode list
    public function list()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $categories = Category::all()->load(['tasks']);

        // Retour automatique au format JSON 👌
        return $categories;
    }

    public function show($categoryId)
    {
        $category = Category::find($categoryId)->load(['tasks']);

        return $category;
    }

    public function create(Request $request)
    {
        // On vérifie si la donnée title est bien dans le corps de la requête
        $validator = Validator::make($request->input(), [
            'name' => ['required', 'filled']
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $name = $request->input('name');

        $category = new Category();
        $category->name = $name;

        if ($category->save()) {
            return response()->json($category, 201);
        } else {
            return response(null, 500);
        }
    }

    public function update(Request $request, $categoryId)
    {
        $category = Category::find($categoryId);

        if (!$category) {
            return response(null, 404);
        }

        // On vérifie si la donnée title est bien dans le corps de la requête
        $validator = Validator::make($request->input(), [
            'name' => ['required', 'filled']
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $name = $request->input('name');
        $category->name = $name;

        if ($category->save()) {
            return response()->json($category, 201);
        } else {
            return response(null, 500);
        }
    }

    public function delete($categoryId)
    {
        $category = Category::find($categoryId);

        if (!$category) {
            return response(null, 404);
        }

        if ($category->delete()) {
            return response(null, 200);
        } else {
            return response(null, 500);
        }
    }
}
