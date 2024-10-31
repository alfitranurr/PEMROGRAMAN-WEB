<?php

namespace UserSystem;

trait Logger
{
    public function log($message)
    {
        echo "[Log] " . $message . "\n";
    }
}
