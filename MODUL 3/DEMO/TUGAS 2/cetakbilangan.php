<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Program Bilangan</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f4;
        }

        .container {
            text-align: center;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .output {
            font-size: 18px;
            margin: 5px 0;
        }
    </style>
</head>

<body>
    <div class="container">
        <?php
        function cetakBilangan($n)
        {
            for ($i = 1; $i <= $n; $i++) {
                if ($i % 4 == 0 && $i % 6 == 0) {
                    echo "<div class='output'>Pemrograman Website 2024</div>";
                } elseif ($i % 5 == 0) {
                    echo "<div class='output'>2024</div>";
                } elseif ($i % 4 == 0) {
                    echo "<div class='output'>Pemrograman</div>";
                } elseif ($i % 6 == 0) {
                    echo "<div class='output'>Website</div>";
                } else {
                    echo "<div class='output'>$i</div>";
                }
            }
        }
        $n = 30; // Ganti dengan nilai yang kamu inginkan
        cetakBilangan(n: $n);
        ?>
    </div>
</body>

</html>