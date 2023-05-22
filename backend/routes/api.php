<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes tasks ===============================================================
Route::get('/tasks', [TaskController::class, 'list']);

Route::get('/tasks/{id}', [TaskController::class, 'show'])->where('id', '[0-9]+');

Route::post('/tasks', [TaskController::class, 'create']);

Route::put('/tasks/{id}', [TaskController::class, 'update'])->where('id', '[0-9]+');

Route::delete('/tasks/{id}', [TaskController::class, 'delete'])->where('id', '[0-9]+');


// Routes categories ===============================================================
Route::get('/categories', [CategoryController::class, 'list']);

Route::get('/categories/{id}', [CategoryController::class, 'show'])->where('id', '[0-9]+');

Route::post('/categories', [CategoryController::class, 'create']);

Route::put('/categories/{id}', [CategoryController::class, 'update'])->where('id', '[0-9]+');

Route::delete('/categories/{id}', [CategoryController::class, 'delete'])->where('id', '[0-9]+');

// Routes tags ===============================================================
Route::get('/tags', [TagController::class, 'list']);

Route::get('/tags/{id}', [TagController::class, 'show'])->where('id', '[0-9]+');

Route::post('/tags', [TagController::class, 'create']);

Route::put('/tags/{id}', [TagController::class, 'update'])->where('id', '[0-9]+');

Route::delete('/tags/{id}', [TagController::class, 'delete'])->where('id', '[0-9]+');
