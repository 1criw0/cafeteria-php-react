<?php
include_once 'controllerproductos.php';

$api = new Apiproductos();


$url = $_SERVER['REQUEST_URI'];

if ($url == '/products') {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            if (isset($_GET['id'])) {
                $sql = $dbConn->prepare("SELECT * FROM posts where id=:id");
                $sql->bindValue(':id', $_GET['id']);
                $sql->execute();
                header("HTTP/1.1 200 OK");
                echo json_encode($sql->fetch(PDO::FETCH_ASSOC));
                exit();
            } else {

                $api->getAll();
            }

            break;

        case 'POST':
            $_POST = json_decode(file_get_contents('php://input'), true);
            if (isset($_POST['nombre_producto']) && isset($_POST['referencia']) && isset($_POST['precio']) && isset($_POST['peso']) && isset($_POST['categoria']) && isset($_POST['stock'])) {

                $item = array(
                    'nombre_producto' =>  $_POST['nombre_producto'],
                    'referencia' =>  $_POST['referencia'],
                    'precio' =>  $_POST['precio'],
                    'peso'  =>  $_POST['peso'],
                    'categoria' =>  $_POST['categoria'],
                    'stock' =>  $_POST['stock'],
                );
                $api->add($item);
            } else if (isset($_POST['id_producto']) && isset($_POST['comprador']) && isset($_POST['cantidad_venta'])) {

                $item = array(
                    'id_producto' =>  $_POST['id_producto'],
                    'comprador' =>  $_POST['comprador'],
                    'cantidad_venta' =>  $_POST['cantidad_venta'],
                );
                $api->addcompra($item);
            } else if (isset($_POST['id_producto'])) {
                $item = array(
                    'id_producto' =>  $_POST['id_producto'],
                );
                $api->getOne($item);
            } else {
                $api->error('Error al llamar a la API');
            }
            break;
        case 'PUT':
            $_POST = json_decode(file_get_contents('php://input'), true);
            if (isset($_POST['id_producto']) && isset($_POST['nombre_producto']) && isset($_POST['referencia']) && isset($_POST['precio']) && isset($_POST['peso']) && isset($_POST['categoria']) && isset($_POST['stock'])) {

                $item = array(
                    'id_producto' =>  $_POST['id_producto'],
                    'nombre_producto' =>  $_POST['nombre_producto'],
                    'referencia' =>  $_POST['referencia'],
                    'precio' =>  $_POST['precio'],
                    'peso'  =>  $_POST['peso'],
                    'categoria' =>  $_POST['categoria'],
                    'stock' =>  $_POST['stock'],
                );
                $api->aupdate($item);
            } else if (isset($_POST['id_producto']) && isset($_POST['stock'])) {

                $item = array(
                    'id_producto' =>  $_POST['id_producto'],
                    'stock' =>  $_POST['stock'],
                );
                $api->aupdatestok($item);
            } else {
                $api->error('Error al llamar a la API');
            }
            break;

        case 'DELETE':
            $_POST = json_decode(file_get_contents('php://input'), true);
            if (isset($_POST['id_producto'])) {

                $item = array(
                    'id_producto' =>  $_POST['id_producto'],

                );
                $api->delete($item);
            } else {
                $api->error('Error al llamar a la API');
            }
            break;
    }
} else if ($url == '/compras') {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            $api->getAllcompra();
            break;
    }
}
