<?php
class ProductController
{
    private $conn;
    private $table = "products";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function readAll()
    {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    public function readById($id)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data)
    {
        $query = "INSERT INTO " . $this->table . " (name, description, price, image) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$data['name'], $data['description'], $data['price'], $data['image']]);
    }

    public function update($id, $data)
    {
        $query = "UPDATE " . $this->table . " SET name = ?, description = ?, price = ?, image = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$data['name'], $data['description'], $data['price'], $data['image'], $id]);
    }

    public function delete($id)
    {
        $query = "DELETE FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$id]);
    }
}
