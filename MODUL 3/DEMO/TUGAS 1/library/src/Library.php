<?php

namespace Library;

class Library
{
    private $books = [];

    public function addBook(Book $book)
    {
        $this->books[] = $book;
    }

    public function getBooks()
    {
        return $this->books;
    }

    public function setBooks(array $books)
    {
        $this->books = $books; // Set the books array
    }
}
