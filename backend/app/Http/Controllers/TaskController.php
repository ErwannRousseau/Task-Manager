<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class TaskController extends Controller
{
    // Création de la méthode list
    public function list()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $tasks = Task::all()->load(['category']);

        // Retour automatique au format JSON 👌
        return $tasks;
    }

    public function show($taskId)
    {
        $task = Task::find($taskId)->load(['category']);

        return $task;
    }

    public function create(Request $request)
    {
        // Dans la variable $validator, je mets le résultat d'une vérification de l'input title
        // Avec la Façade (outil de Laravel) Validator, je vérifie que :
        // - title existe bien : required
        // - title n'est pas vide : filled
        $validator = Validator::make($request->input(), [
            'title' => ['required', 'filled'],
            'category_id' => ['nullable', 'integer']
        ]);

        // On vérifie si la validation a raté
        if ($validator->fails()) {
            // si oui, on renvoie un code HTTP 422, avec un message d'erreur
            return response()->json($validator->errors(), 422);
        }

        $title = $request->input('title');
        $categoryId = $request->input('category_id');

        $task = new Task();
        $task->title = $title;
        $task->category_id = $categoryId;

        if ($task->save()) {
            return response()->json($task, 201);
        } else {
            return response(null, 500);
        }
    }

    public function update(Request $request, $taskId)
    {
        $task = Task::find($taskId);

        if (!$task) {
            return response(null, 404);
        }

        // On vérifie si la donnée title est bien dans le corps de la requête
        $validator = Validator::make($request->input(), [
            'title' => ['required', 'filled'],
            'category_id' => ['nullable', 'integer']
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $title = $request->input('title');
        $categoryId = $request->input('category_id');

        $task->title = $title;
        $task->category_id = $categoryId;

        if ($task->save()) {
            return response()->json($task, 201);
        } else {
            return response(null, 500);
        }
    }

    public function delete($taskId)
    {
        $task = Task::find($taskId);

        if (!$task) {
            return response(null, 404);
        }

        if ($task->delete()) {
            return response(null, 200);
        } else {
            return response(null, 500);
        }
    }
}
