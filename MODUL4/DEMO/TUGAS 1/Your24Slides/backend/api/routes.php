<?php

require_once './config/Database.php';
require_once './controllers/ProductController.php';

$database = new Database();
$db = $database->getConnection();

$productController = new ProductController($db);
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$input = json_decode(file_get_contents('php://input'), true);

// Adjust path if necessary
$path = trim(str_replace(['/MODUL4/DEMO/TUGAS 1/Your24Slides/backend/api/routes.php', '/MODUL4/DEMO/TUGAS%201/Your24Slides/backend/api/routes.php'], '', $path));

switch ($path) {
    case '/products':
        if ($method === 'GET') {
            echo json_encode($productController->readAll());
        } elseif ($method === 'POST') {
            echo json_encode($productController->create($input));
        }
        break;
    case preg_match('/\/products\/(\d+)/', $path, $matches) ? true : false:
        $id = $matches[1];
        if ($method === 'GET') {
            echo json_encode($productController->readById($id));
        } elseif ($method === 'PUT') {
            echo json_encode($productController->update($id, $input));
        } elseif ($method === 'DELETE') {
            echo json_encode($productController->delete($id));
        }
        break;
    default:
        http_response_code(404);
        echo json_encode(["message" => "Not Found"]);
}
