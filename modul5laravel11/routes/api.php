<?php

use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route untuk user dengan middleware 'auth:sanctum'
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware(Authenticate::using('sanctum'));

// Route untuk resource posts dengan controller PostController
Route::apiResource('/posts', App\Http\Controllers\Api\PostController::class);
