<?php

namespace Library;

trait BookInfo
{
    public function getInfo()
    {
        return "{$this->getTitle()} by {$this->getAuthor()}";
    }
}
