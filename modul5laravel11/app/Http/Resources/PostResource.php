<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    // Mendefinisikan properti
    public $status;
    public $message;
    public $resource;

    /**
     * Konstruktor untuk menerima status, pesan, dan resource
     *
     * @param  mixed $status
     * @param  mixed $message
     * @param  mixed $resource
     * @return void
     */
    public function __construct($status, $message, $resource)
    {
        parent::__construct($resource);
        $this->status  = $status;
        $this->message = $message;
    }

    /**
     * Transformasikan resource menjadi array.
     *
     * @param  mixed $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'success' => $this->status,  // Menambahkan status
            'message' => $this->message, // Menambahkan pesan
            'data'    => $this->resource, // Menambahkan resource
        ];
    }
}
