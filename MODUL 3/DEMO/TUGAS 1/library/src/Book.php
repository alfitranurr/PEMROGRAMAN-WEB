<?php

namespace Library;

abstract class Book
{
    protected $title;
    protected $author;
    protected $timestamp; // Add timestamp property

    public function __construct($title, $author)
    {
        $this->title = $title;
        $this->author = $author;
        $this->timestamp = time(); // Set timestamp to current time
    }

    abstract public function getDescription();

    public function getTitle()
    {
        return $this->title;
    }

    public function getAuthor()
    {
        return $this->author;
    }

    public function getTimestamp()
    {
        return date("Y-m-d H:i:s", $this->timestamp); // Format timestamp for display
    }
}
