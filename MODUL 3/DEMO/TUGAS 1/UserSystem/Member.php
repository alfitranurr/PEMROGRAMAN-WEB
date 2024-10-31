<?php

namespace UserSystem;

require_once 'User.php';

class Member extends User
{
    private $membershipLevel;

    public function __construct($name, $email, $membershipLevel)
    {
        parent::__construct($name, $email);
        $this->membershipLevel = $membershipLevel;
        $this->log("Member level set for {$this->name}");
    }

    protected function getRole()
    {
        return "Member";
    }

    public function getMembershipLevel()
    {
        return $this->membershipLevel;
    }
}
