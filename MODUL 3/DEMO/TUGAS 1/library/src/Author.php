<?php

namespace Library;

use Library\BookInfo;

class Author extends Book
{
    use BookInfo;

    public function getDescription()
    {
        return "This book is written by {$this->author}.";
    }
}
