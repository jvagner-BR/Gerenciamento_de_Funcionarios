<?php
// Conexão com o banco de dados (substitua pelos seus próprios detalhes de conexão)
$servername = "localhost";
$username = "root";
$password = "";
$database = "teste_desenvolvedor_php";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] == 'getCargos') {
    $sql = "SELECT id, descricao FROM cargos";
    $result = $conn->query($sql);

    $cargos = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $cargos[] = $row;
        }
    }
    echo json_encode($cargos);
}


$conn->close();
