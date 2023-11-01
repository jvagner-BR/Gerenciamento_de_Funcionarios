<?php
// Conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$database = "teste_desenvolvedor_php";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

// Consulta SQL para obter todos os funcionários com a descrição do cargo
$sql = "SELECT f.id, f.nome, f.sobrenome, c.descricao as cargo, f.nascimento, f.salario 
        FROM funcionarios f
        JOIN cargos c ON f.cargo_id = c.id";

$result = $conn->query($sql);

$funcionarios = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $funcionarios[] = $row;
    }
}

// Feche a conexão com o banco de dados
$conn->close();

echo json_encode($funcionarios);
?>
