<?php

include dirname(__FILE__).'/../model/consultas.php';


class Apiproductos{

    function getAll(){
        $Producto = new Productos();
        $Productos = array();
        $Productos["items"] = array();

        $res = $Producto->obtenerProductos();

        if($res->rowCount()){
            while ($row = $res->fetch(PDO::FETCH_ASSOC)){
    
                $item=array(
                    "id_producto"=> $row['id_producto'],
                    "nombre_producto" => $row['nombre_producto'],
                    "referencia" => $row['referencia'],
                    "precio" => $row['precio'],
                    "peso"  => $row['peso'],
                    "categoria" => $row['categoria'],
                    "stock" => $row['stock'],
                    "created_at" => $row['created_at'],
                    "updated_at" => $row['updated_at'],
                );
                array_push($Productos["items"], $item);
            }
        
            echo json_encode($Productos);
        }else{
            $this->error('No hay elementos');
        }
    }


    function getAllcompra(){
        $Producto = new Productos();
        $Productos = array();
        $Productos["items"] = array();

        $res = $Producto->obtenerProductoscomprados();

        if($res->rowCount()){
            while ($row = $res->fetch(PDO::FETCH_ASSOC)){
    
                $item=array(
                    "id_registro"=> $row['id_registro'],
                    "comprador" => $row['comprador'],
                    "cantidad_venta"  => $row['cantidad_venta'],
                    "Cid_producto" => $row['id_producto'],
                    "updated_at" => $row['updated_at'],
                    "nombre_producto" => $row['nombre_producto'],
                    "precio" => $row['precio'],
                );
                array_push($Productos["items"], $item);
            }
        
            echo json_encode($Productos);
        }else{
            $this->error('No hay elementos');
        }
    }








    function getOne($item){
        $Producto = new Productos();
        $Productos = array();
        $Productos["items"] = array();

        $res = $Producto->obtenerproducto($item);

        if($res->rowCount()){
            while ($row = $res->fetch(PDO::FETCH_ASSOC)){
    
                $item=array(
                    "id_producto"=> $row['id_producto'],
                    "nombre_producto" => $row['nombre_producto'],
                    "referencia" => $row['referencia'],
                    "precio" => $row['precio'],
                    "peso"  => $row['peso'],
                    "categoria" => $row['categoria'],
                    "stock" => $row['stock'],
                    "created_at" => $row['created_at'],
                    "updated_at" => $row['updated_at'],
                );
                array_push($Productos["items"], $item);
            }
        
            echo json_encode($Productos);
        }else{
            $this->error('No hay elementos');
        }
    }


    function addcompra($item){
        $compra = new Productos();

        $res = $compra->nuevacompra($item);
        $this->exito('Compra realizada con exito');
    }
    function add($item){
        $Producto = new Productos();

        $res = $Producto->nuevoProducto($item);
        $this->exito('Nuevo producto registrado');
    }
    function aupdate($item){
        $Producto = new Productos();

        $res = $Producto->updateProducto($item);
        $this->exito('Producto actualizado');
    }
    function aupdatestok($item){
        $Producto = new Productos();
        $res = $Producto->updateProductosto($item);
        $this->exito('Producto actualizado');
    }
    function delete($item){
        $Producto = new Productos();

        $res = $Producto->deleteProducto($item);
        $this->exito('producto eliminado');
    }



    function error($mensaje){
        echo  json_encode(array('mensaje' => $mensaje)) ; 
    }

    function exito($mensaje){
        echo  json_encode(array('mensaje' => $mensaje)) ; 
    }

    function printJSON($array){
        echo json_encode($array);
    }

    
}
