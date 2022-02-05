import React, { Component, useEffect, useState } from "react";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const Vercompras = () => {
  const [privatePosts, setPrivatePosts] = useState([]);
  const [privateintPosts, setPrivateintPosts] = useState({
    nombre_producto: "",
    referencia: "",
    precio: "",
    peso: "",
    categoria: "",
    stock: "",
  });
  const [privateintPostscomp, setPrivateintPostscomp] = useState({
    id_producto: "",
    comprador: "",
    cantidad_venta: "",
  });

  const [modalcomprar, setmodalcomprar] = useState(false);
  const [insertarmodal, insertarsermodal] = useState(false);

  useEffect(() => {
    PostService.getAllPrivatePosts().then(
      (response) => {
        setPrivatePosts(response.data.items);
      },
      (error) => {
        console.log("Private page", error.response);
      }
    );
  }, []);
  const lcomprar = (dato) => {
    setPrivateintPosts(dato);
    setmodalcomprar(true);
    setPrivateintPostscomp({
        ...privateintPostscomp,
        id_producto: dato.id_producto,
      });
  };
  const cerrarModalActualizar = () => {
    setmodalcomprar(false);
    borrarinsert();
    borrarinsert2(); 
  };
  const comprar = (dato) => {

    if (
        
      privateintPostscomp.id_producto === "" ||
      privateintPostscomp.comprador === "" ||
      privateintPostscomp.cantidad_venta=== ""
    ) {
      swal.fire({
        title: "oops..!",
        text: "por favor rellene todos los campos!",
        icon: "warning",
        timer: "2000",
      });
    } else {
        if(privateintPostscomp.cantidad_venta<=privateintPosts.stock){

            let cantidad=privateintPosts.stock-privateintPostscomp.cantidad_venta;
            const user = {
                id_producto:privateintPostscomp.id_producto,
                stock: cantidad,
              };
         PostService.comprar(privateintPostscomp).then(
        (response) => {
            if(cantidad>=0){
     console.log(response.data.mensaje);
      PostService.Editproductscompra (user).then(
        (response) => {
          swal.fire({
            title: "Bien..!",
            text: response.data.mensaje,
            icon: "success",
            timer: "2000",
          });
          cerrarModalActualizar();
          PostService.getAllproducts().then(
            (response) => {
              setPrivatePosts(response.data.items);
              
            },
            (error) => {
              console.log("Private page", error.response);
            }
          );
        },
        (error) => {
          swal.fire({
            title: "error..!",
            text: error.response,
            icon: "error",
            timer: "2000",
          });
          console.log("Private page", error.response);
        });
    }else{
        swal.fire({
            title: "error..!",
            text: "La cantidad de productos es 0",
            icon: "error",
            timer: "3000",
          });
     }
        },
        (error) => {
          swal.fire({
            title: "error..!",
            text: error.response,
            icon: "error",
            timer: "2000",
          });
          console.log("Private page", error.response);
        }
      );
    }else{
        swal.fire({
            title: "error..!",
            text: "La cantidad de productos no puede superar al stock",
            icon: "error",
            timer: "3000",
          });
          
        }
    }
    
  };

  const borrarinsert = () => {
    setPrivateintPosts({
      ...privateintPosts,
      stock: "",
      referencia: "",
      categoria: "",
      precio: "",
      peso: "",
      nombre_producto: "",
    });
  };
  const borrarinsert2 = () => {
    setPrivateintPostscomp({
      ...privateintPostscomp,
      id_producto: "",
      comprador: "",
      cantidad_venta: "",
    });
  };

  const handleChange = (e) => {
    setPrivateintPostscomp({
      ...privateintPostscomp,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
    <header className="header">
    <div className="header-content">
      <div className="header-logo">
        <h1 className="logo">cafeteria</h1>
      </div>
      <nav className="header-navigation">
        <a href="/datos">productos</a>
        <a href="/productos">comprar</a>
        <a href="/vercompras">compras realizadas</a>
      </nav>
    </div>
  </header> 
  <>
      <Container>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
            <th>comprador</th>
              <th>producto</th>
              <th>cantidad comprados</th>
              <th>precio</th>
              <th>fecha de compra</th>
            </tr>
          </thead>

          <tbody>
            {privatePosts?
            privatePosts.map((dato) => (
              <tr key={dato.id_registro}>
                <td>{dato.comprador}</td>
                <td>{dato.nombre_producto}</td>
                <td>{dato.cantidad_venta}</td>
                <td>{dato.precio}</td>
                <td>{dato.peso}</td>
                <td>{dato.categoria}</td>
                <td>{dato. updated_at}</td>
                
                
              </tr>
            )):null}
          </tbody>
        </Table>
      </Container>

      
    </>
    <div className="credits">
		<div className="responsive-container">
		<h3>Cafeteria de prueba</h3>
		</div>
	</div>
    </div>
  );
};

export default Vercompras;
