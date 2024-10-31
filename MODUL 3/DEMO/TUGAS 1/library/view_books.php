<?php

date_default_timezone_set('Asia/Jakarta'); // Atur zona waktu sesuai kebutuhan
require_once 'src/Book.php';
require_once 'src/Library.php';
require_once 'src/Traits.php';
require_once 'src/Author.php';

use Library\Library;
use Library\Author;

session_start();

$library = isset($_SESSION['library']) ? $_SESSION['library'] : new Library();
$books = $library->getBooks();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <title>View All Books</title>
</head>

<body>
    <div class="container">
        <h1>All Books</h1>

        <?php if (!empty($books)): ?>
            <table>
                <tr>
                    <th>No</th> <!-- Tambahkan nomor urut -->
                    <th>Books</th> <!-- Ganti judul kolom -->
                    <th>Timestamp</th>
                    <th>Description</th> <!-- Tambahkan kolom untuk deskripsi -->
                </tr>
                <?php foreach ($books as $index => $book): ?> <!-- Tambahkan indeks -->
                    <tr>
                        <td><?php echo $index + 1; ?></td> <!-- Tampilkan nomor urut -->
                        <td><?php echo $book->getInfo(); ?></td> <!-- Tampilkan info buku -->
                        <td><?php echo $book->getTimestamp(); ?></td>
                        <td><?php echo $book->getDescription(); ?></td> <!-- Tampilkan deskripsi -->
                    </tr>
                <?php endforeach; ?>
            </table>
        <?php else: ?>
            <p>No books available.</p>
        <?php endif; ?>

        <button onclick="window.location.href='index.php'">Back to Library</button>
    </div>
</body>

</html>