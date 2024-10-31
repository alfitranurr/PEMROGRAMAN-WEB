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
$_SESSION['library'] = $library; // jaga data yang sudah ada

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['delete_index'])) {
        // Handle deletion of a book
        $index = $_POST['delete_index'];

        $books = $library->getBooks();
        array_splice($books, $index, 1); // Remove the book from the array
        $library->setBooks($books); // Update the library with the modified books
    } elseif (isset($_POST['edit_index'])) {
        // Handle editing of a book
        $index = $_POST['edit_index'];
        $title = $_POST['title'];
        $author = $_POST['author'];

        $books = $library->getBooks();
        $books[$index] = new Author($title, $author); // Create a new Author instance for the edited book
        $library->setBooks($books); // Update the library with the modified books
    } else {
        // Handle adding a new book
        $title = $_POST['title'];
        $author = $_POST['author'];
        $book = new Author($title, $author);
        $library->addBook($book);
    }
    $_SESSION['library'] = $library; // Update the session
}

$books = $library->getBooks();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <title>Library Management</title>
    <script>
        function showEditForm(index) {
            const editForm = document.getElementById('edit-form-' + index);
            const bookDetails = document.getElementById('book-details-' + index);
            editForm.style.display = 'block';
            bookDetails.style.display = 'none';
        }
    </script>
</head>

<body>
    <div class="container">
        <h1>Library Management</h1>

        <form action="" method="POST">
            <label for="title">Book Title:</label>
            <input type="text" id="title" name="title" required>
            <br>
            <label for="author">Author Name:</label>
            <input type="text" id="author" name="author" required>
            <br>
            <input type="submit" value="Add Book">
        </form>

        <button onclick="window.location.href='view_books.php'">View All Books</button> <!-- Button to view all books -->

        <?php if (!empty($books)): ?>
            <h2>Book List</h2>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Timestamp</th>
                    <th>Actions</th>
                </tr>
                <?php foreach ($books as $index => $book): ?>
                    <tr id="book-details-<?php echo $index; ?>">
                        <td><?php echo $book->getTitle(); ?></td>
                        <td><?php echo $book->getAuthor(); ?></td>
                        <td><?php echo $book->getTimestamp(); ?></td>
                        <td>
                            <form action="" method="POST" style="display:inline;">
                                <input type="hidden" name="delete_index" value="<?php echo $index; ?>">
                                <input type="submit" value="Delete" onclick="return confirm('Are you sure you want to delete this book?');">
                            </form>
                            <button onclick="showEditForm(<?php echo $index; ?>)">Edit</button>
                        </td>
                    </tr>
                    <tr id="edit-form-<?php echo $index; ?>" style="display:none;">
                        <td colspan="4" style="padding: 10px;">
                            <form action="" method="POST" style="display: flex; align-items: center;">
                                <input type="hidden" name="edit_index" value="<?php echo $index; ?>">

                                <label for="edit-title-<?php echo $index; ?>" style="margin-right: 10px;">Edit Title:</label>
                                <input type="text" id="edit-title-<?php echo $index; ?>" name="title" value="<?php echo $book->getTitle(); ?>" required style="margin-right: 5px; width: 150px;">

                                <label for="edit-author-<?php echo $index; ?>" style="margin-right: 10px;">Edit Author:</label>
                                <input type="text" id="edit-author-<?php echo $index; ?>" name="author" value="<?php echo $book->getAuthor(); ?>" required style="margin-right: 5px; width: 150px;">

                                <input type="submit" value="Update">
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </table>
        <?php endif; ?>
    </div>
</body>

</html>