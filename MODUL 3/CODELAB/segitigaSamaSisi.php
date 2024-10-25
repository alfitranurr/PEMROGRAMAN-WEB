<?php
function segitigaSamaSisi($tinggi) {
    for ($i = 1; $i <= $tinggi; $i++) {
        // Mencetak spasi (gunakan &nbsp; untuk spasi dalam HTML)
        for ($j = $i; $j < $tinggi; $j++) {
            echo "&nbsp;&nbsp;";
        }
        // Mencetak bintang
        for ($k = 1; $k <= (2 * $i - 1); $k++) {
            echo "*";
        }
        // Pindah ke baris berikutnya dengan <br>
        echo "<br>";
    }
}

// Panggil fungsi dengan tinggi segitiga 5
segitigaSamaSisi(5);
?>