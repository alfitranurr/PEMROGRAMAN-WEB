<?php

use App\Http\Controllers\api\ProductController;
use App\Http\Controllers\api\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Existing route for user
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Define API routes for Product and Category Controllers
Route::apiResource('/categories', CategoryController::class); // Category resource routes
Route::apiResource('/products', ProductController::class); // Product resource routes
