<?php
require_once 'Admin.php';
require_once 'Member.php';

use UserSystem\Admin;
use UserSystem\Member;

$admin = new Admin("Ramdhani", "alfitranurr@example.com", "Full Access");
echo $admin . "\n"; // panggil toString
echo "Privileges: " . $admin->getPrivileges() . "\n\n";

// Using __get and __set for dynamic access and modification of properties
echo "Admin Email: " . $admin->email . "\n"; //panggil get
$admin->email = "newalfitranurr@example.com"; //panggil set
echo "Updated Admin Email: " . $admin->email . "\n\n"; //panggil get

$member = new Member("Fhanisa", "fhanisa@example.com", "Gold");
echo $member . "\n";
echo "Membership Level: " . $member->getMembershipLevel() . "\n";
