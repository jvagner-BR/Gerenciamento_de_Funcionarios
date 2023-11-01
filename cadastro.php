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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_POST['action'] == 'cadastrarFuncionario') {
        $nome = addslashes($_POST['nome']);
        $sobrenome = addslashes($_POST['sobrenome']);
        $cargo = addslashes($_POST['cargo']);
        $nascimento = date("Y-m-d", strtotime($_POST['nascimento']));

        $salario = addslashes($_POST['salario']);

        // Verifica se o cargo existe na tabela "cargos"
        $cargoExists = false;
        $checkCargo = $conn->prepare("SELECT id FROM cargos WHERE id = ?");
        $checkCargo->bind_param("i", $cargo);
        $checkCargo->execute();
        $checkCargo->store_result();
        if ($checkCargo->num_rows > 0) {
            $cargoExists = true;
        }
        $checkCargo->close();

        if ($cargoExists) {
            
            $sql = "INSERT INTO funcionarios (nome, sobrenome, cargo_id, nascimento, salario) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssiss", $nome, $sobrenome, $cargo, $nascimento, $salario);

            if ($stmt->execute()) {
                echo "Funcionário cadastrado com sucesso!";
            } else {
                echo "Erro ao cadastrar funcionário: " . $stmt->error;
            }
            $stmt->close();
            exit();
        } else {
            echo "Erro: O cargo selecionado não existe na tabela de cargos.";
            exit();
        }
    }

    if ($_POST['action'] == 'cadastrarCargo') {
        $descricao = $_POST['descricao'];

        $stmt = $conn->prepare("INSERT INTO cargos (descricao) VALUES (?)");
        $stmt->bind_param("s", $descricao);

        if ($stmt->execute()) {
            echo "Cargo adicionado com sucesso!";
        } else {
            echo "Erro ao adicionar cargo: " . $stmt->error;
        }

        $stmt->close();
    }

    if ($_POST['action'] == 'editarFuncionario') {
        $id = $_POST['id'];
        $nome = addslashes($_POST['nome']);
        $sobrenome = addslashes($_POST['sobrenome']);
        $cargo = addslashes($_POST['cargo']);
        $nascimento = date("Y-m-d", strtotime($_POST['nascimento']));
        $salario = addslashes($_POST['salario']);

        $cargoExists = false;
        $checkCargo = $conn->prepare("SELECT id FROM cargos WHERE id = ?");
        $checkCargo->bind_param("i", $cargo);
        $checkCargo->execute();
        $checkCargo->store_result();
        if ($checkCargo->num_rows > 0) {
            $cargoExists = true;
        }
        $checkCargo->close();

        if ($cargoExists) {
            $sql = "UPDATE funcionarios SET nome = ?, sobrenome = ?, cargo_id = ?, nascimento = ?, salario = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssissi", $nome, $sobrenome, $cargo, $nascimento, $salario, $id);

            if ($stmt->execute()) {
                echo "Funcionário atualizado com sucesso!";
            } else {
                echo "Erro ao atualizar funcionário: " . $stmt->error;
            }
            $stmt->close();
            exit();
        }
    }

    if ($_POST['action'] == 'editarCargo') {
        $id = $_POST['id'];
        $descricao = $_POST['descricao'];

        $sql = "UPDATE cargos SET descricao = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $descricao, $id);

        if ($stmt->execute()) {
            echo "Cargo atualizado com sucesso!";
        } else {
            echo "Erro ao atualizar Cargo: " . $stmt->error;
        }
        $stmt->close();
        exit();
    }

    if ($_POST['action'] == 'excluirFuncionario') {
        $id = $_POST['id'];

        $sql = "DELETE FROM funcionarios WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo "Funcionário excluído com sucesso!";
        } else {
            echo "Erro ao excluir funcionário: " . $stmt->error;
        }

        $stmt->close();
        exit();
    }

    if ($_POST['action'] == 'excluirCargo') {
        $id = $_POST['id'];
    
        $sql = "DELETE FROM cargos WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
    
        if ($stmt->execute()) {
            echo "Cargo excluído com sucesso!";
        } else {
            echo "Erro ao excluir Cargo: " . $stmt->error;
        }
    
        $stmt->close();
        exit();
    }
    
}



$conn->close();
