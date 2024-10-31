<?php

namespace UserSystem;

require_once 'User.php';

class Admin extends User
{
    private $privileges;

    public function __construct($name, $email, $privileges)
    {
        parent::__construct($name, $email);
        $this->privileges = $privileges;
        $this->log("Admin privileges set for {$this->name}");
    }

    protected function getRole()
    {
        return "Admin";
    }

    public function getPrivileges()
    {
        return $this->privileges;
    }
}
