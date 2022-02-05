<?php

include dirname(__FILE__).'/conexion/db.php';

class Productos extends DB{
    
    function obtenerProductos(){
        $query = $this->connect()->query('SELECT * FROM producto ORDER BY updated_at desc');
        return $query;
    }


        
    function obtenerProductoscomprados(){
        $query = $this->connect()->query('SELECT id_registro,comprador,cantidad_venta, C.id_producto, C.updated_at, nombre_producto ,precio
        FROM registro_ventas C, producto O
        WHERE O.id_producto = C.id_producto ORDER BY updated_at desc');
        return $query;
    }


    function obtenerproducto($id){
        $query = $this->connect()->prepare('SELECT * FROM producto WHERE id_producto= :id_producto ORDER BY updated_at desc');
        $query->execute(['id_producto' => $id['id_producto']]);
        return $query;
    }

    function nuevoProducto($productos){
        $query = $this->connect()->prepare('INSERT INTO producto (id_producto, nombre_producto, referencia, precio,peso,categoria,stock,created_at,updated_at) VALUES(uuid_v4(), :nombre_producto, :referencia, :precio,:peso,:categoria,:stock,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP())');
        $query->execute(['nombre_producto' => $productos['nombre_producto'], 'referencia' => $productos['referencia'],'precio' => $productos['precio'],'peso' => $productos['peso'],'categoria' => $productos['categoria'],'stock' => $productos['stock']]);
        return $query;
    }

    function nuevacompra($compra){
        $query = $this->connect()->prepare('INSERT INTO registro_ventas( id_registro,  comprador, cantidad_venta, id_producto,updated_at) VALUES(uuid_v4(), :comprador, :cantidad_venta, :id_producto,CURRENT_TIMESTAMP())');
        $query->execute(['comprador' => $compra['comprador'], 'cantidad_venta' =>  $compra['cantidad_venta'],'id_producto' => $compra['id_producto']]);
        return $query;
    }
    function updateProducto($productos){
        $query = $this->connect()->prepare('UPDATE producto SET nombre_producto=:nombre_producto,referencia=:referencia, precio=:precio, peso=:peso, categoria=:categoria, stock=:stock, updated_at=CURRENT_TIMESTAMP() WHERE id_producto=:id_producto');
        $query->execute(['nombre_producto' => $productos['nombre_producto'], 'referencia' => $productos['referencia'],'precio' => $productos['precio'],'peso' => $productos['peso'],'categoria' => $productos['categoria'],'stock' => $productos['stock'],'id_producto' => $productos['id_producto']]);
        return $query;
    }

    function updateProductosto($productos){
        $query = $this->connect()->prepare('UPDATE producto SET stock=:stock, updated_at=CURRENT_TIMESTAMP() WHERE id_producto=:id_producto');
        $query->execute(['stock' => $productos['stock'],'id_producto' => $productos['id_producto']]);
        return $query;
    }

    function deleteProducto($productos){
        $query = $this->connect()->prepare('DELETE FROM producto WHERE id_producto=:id_producto');
        $query->execute(['id_producto' => $productos['id_producto']]);
        return $query;
    }

}

?>