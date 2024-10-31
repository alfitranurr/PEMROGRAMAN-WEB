<?php

namespace UserSystem;

require_once 'Logger.php';

abstract class User
{
    protected $name;
    protected $email;

    use Logger;

    public function __construct($name, $email)
    {
        $this->name = $name;
        $this->email = $email;
        $this->log("User {$this->name} created.");
    }

    abstract protected function getRole();

    public function __toString()
    {
        return "Name: {$this->name}, Email: {$this->email}, Role: " . $this->getRole();
    }

    public function __get($property)
    {
        if (property_exists($this, $property)) {
            return $this->$property;
        }
        return null;
    }

    public function __set($property, $value)
    {
        if (property_exists($this, $property)) {
            $this->$property = $value;
        }
    }
}
