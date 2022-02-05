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

const Datos = () => {
  const [privatePosts, setPrivatePosts] = useState([]);
  const [privateeditPosts, setPrivateeditPosts] = useState({});
  const [privateintPosts, setPrivateintPosts] = useState({
    nombre_producto: "",
    referencia: "",
    precio: "",
    peso: "",
    categoria: "",
    stock: "",
  });
  const [modalActualizar, setmodalActualizar] = useState(false);
  const [insertarmodal, insertarsermodal] = useState(false);

  useEffect(() => {
    PostService.getAllproducts().then(
      (response) => {
        setPrivatePosts(response.data.items);
      },
      (error) => {
        console.log("Private page", error.response);
      }
    );
  }, []);
  const mostrarModalActualizar = (dato) => {
    console.log("dsfsdf", dato);
    setPrivateeditPosts(dato);
    setmodalActualizar(true);
  };
  const cerrarModalActualizar = () => {
    setmodalActualizar(false);
  };

  const insertarModalActualizar = (dato) => {
    insertarsermodal(true);
  };
  const cancelarModalActualizar = () => {
    swal
      .fire({
        title: "quieres salir sin guardar cambios?",
        icon: "info",
        showDenyButton: true,
        confirmButtonText: "salir",
        denyButtonText: `cancelar`,
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setmodalActualizar(false);
        }
      });
  };

  const cancelarModalinsertar = () => {
    swal
      .fire({
        title: "quieres salir sin guardar cambios?",
        icon: "info",
        showDenyButton: true,
        confirmButtonText: "salir",
        denyButtonText: `cancelar`,
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          borrarinsert();
          insertarsermodal(false);
        }
      });
  };
  const deleteprod = (DElet) => {
    swal
      .fire({
        title: "Desea eliminar este producto?",
        icon: "info",
        showDenyButton: true,
        confirmButtonText: "eliminar",
        denyButtonText: `cancelar`,
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          let data = { data: { id_producto: DElet } };
          PostService.DEleteproduct(data).then(
            (response) => {
              swal.fire({
                title: "El producto fue eliminado..!",
                text: response.data.mensaje,
                icon: "success",
                timer: "2000",
              });
              PostService.getAllproducts().then(
                (response) => {
                  console.log(response.data);
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
            }
          );
        }
      });
  };

  const insertarr = (data) => {
    if (
      privateintPosts.nombre_producto === "" ||
      privateintPosts.referencia === "" ||
      privateintPosts.precio === "" ||
      privateintPosts.peso === "" ||
      privateintPosts.categoria === "" ||
      privateintPosts.stock === ""
    ) {
      swal.fire({
        title: "oops..!",
        text: "por favor rellene todos los campos!",
        icon: "warning",
        timer: "2000",
      });
    } else {
      const user = {
        nombre_producto: privateintPosts.nombre_producto,
        referencia: privateintPosts.referencia,
        precio: privateintPosts.precio,
        peso: privateintPosts.peso,
        categoria: privateintPosts.categoria,
        stock: privateintPosts.stock,
      };
      PostService.insertPrivatePosts(user).then(
        (response) => {
          swal.fire({
            title: "Bien..!",
            text: "se creo el producto exitosamente",
            icon: "success",
            timer: "9000",
          });
          PostService.getAllproducts().then(
            (response) => {
              setPrivatePosts(response.data.items);
            },
            (error) => {
              console.log("Private page", error.response);
            }
          );
          borrarinsert();
          insertarsermodal(false);
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
    }
  };

  const editar = (dato) => {
    if (
      privateeditPosts.id_producto === "" ||
      privateeditPosts.nombre_producto === "" ||
      privateeditPosts.referencia === "" ||
      privateeditPosts.precio === "" ||
      privateeditPosts.peso === "" ||
      privateeditPosts.categoria === "" ||
      privateeditPosts.stock === ""
    ) {
      swal.fire({
        title: "oops..!",
        text: "por favor rellene todos los campos!",
        icon: "warning",
        timer: "2000",
      });
    } else {
      PostService.Editproducts(privateeditPosts).then(
        (response) => {
          console.log("asdsad", response.data);
          swal.fire({
            title: "Bien..!",
            text: response.data.mensaje,
            icon: "success",
            timer: "2000",
          });
          cerrarModalActualizar();
          PostService.getAllproducts().then(
            (response) => {
              console.log(response.data);
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
        }
      );
    }
    console.log("editarrr", dato);
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

  const handleChange = (e) => {
    setPrivateeditPosts({
      ...privateeditPosts,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeint = (e) => {
    let dd = { [e.target.name]: e.target.value };
    setPrivateintPosts({
      ...privateintPosts,
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
        <Button color="success" onClick={() => insertarModalActualizar()}>
          Crear
        </Button>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>producto</th>
              <th>referencia</th>
              <th>precio</th>
              <th>peso</th>
              <th>categoria</th>
              <th>stock</th>
              <th>ultima actualizacion</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {privatePosts?
            privatePosts.map((dato) => (
              <tr key={dato.id_producto}>
                <td>{dato.nombre_producto}</td>
                <td>{dato.referencia}</td>
                <td>{dato.precio}</td>
                <td>{dato.peso}</td>
                <td>{dato.categoria}</td>
                <td>{dato.stock}</td>
                <td>{dato.updated_at}</td>
                <td>
                  <Button
                    className="bg-transparent bbton"
                    onClick={() => mostrarModalActualizar(dato)}
                  >
                    <i className="fa fa-eye"></i>
                  </Button>{" "}
                  <Button
                    className="bg-transparent bbton"
                    onClick={() => mostrarModalActualizar(dato)}
                  >
                    <i type="Button" className="fa fa-edit"></i>
                  </Button>{" "}
                  <Button
                    className="bg-transparent bbton"
                    onClick={() => deleteprod(dato.id_producto)}
                  >
                    {" "}
                    <i className="fa fa-trash-alt"></i>
                  </Button>{" "}
                </td>
              </tr>
            )):null}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={modalActualizar}>
        <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>

            <input
              className="form-control"
              readOnly
              type="text"
              value={privateeditPosts.id_producto}
            />
            <label>Producto:</label>
            <input
              className="form-control"
              name="nombre_producto"
              placeholder="nombre del producto"
              type="text"
              onChange={handleChange}
              value={privateeditPosts.nombre_producto}
            />
            <label>referencia:</label>
            <input
              className="form-control"
              name="referencia"
              placeholder="referencia del producto"
              type="text"
              onChange={handleChange}
              value={privateeditPosts.referencia}
            />

            <label>precio:</label>
            <input
              className="form-control"
              name="precio"
              placeholder="precio de productos sin puntos ni comas"
              type="number"
              onChange={handleChange}
              value={privateeditPosts.precio}
            />

            <label>peso:</label>
            <input
              className="form-control"
              name="peso"
              placeholder="peso de productos sin puntos ni comas"
              type="number"
              onChange={handleChange}
              value={privateeditPosts.peso}
            />
            <label>categoria:</label>
            <input
              className="form-control"
              name="categoria"
              placeholder="nombre del categoria"
              type="text"
              onChange={handleChange}
              value={privateeditPosts.categoria}
            />

            <label>stock:</label>
            <input
              className="form-control"
              name="stock"
              placeholder="stock de productos sin puntos ni comas"
              type="number"
              onChange={handleChange}
              value={privateeditPosts.stock}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => editar(privateeditPosts)}>
            Editar
          </Button>
          <Button color="danger" onClick={() => cancelarModalActualizar()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={insertarmodal}>
        <ModalHeader>
          <div>
            <h3>Insertar Registro</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Producto:</label>
            <input
              className="form-control"
              name="nombre_producto"
              placeholder="nombre del producto"
              type="text"
              onChange={handleChangeint}
              value={privateintPosts.nombre_producto}
            />
            <label>referencia:</label>
            <input
              className="form-control"
              name="referencia"
              placeholder="referencia del producto"
              type="text"
              onChange={handleChangeint}
              value={privateintPosts.referencia}
            />

            <label>precio:</label>
            <input
              className="form-control"
              name="precio"
              placeholder="precio de productos sin puntos ni comas"
              type="number"
              onChange={handleChangeint}
              value={privateintPosts.precio}
            />

            <label>peso:</label>
            <input
              className="form-control"
              name="peso"
              placeholder="peso de productos sin puntos ni comas"
              type="number"
              onChange={handleChangeint}
              value={privateintPosts.peso}
            />
            <label>categoria:</label>
            <input
              className="form-control"
              name="categoria"
              placeholder="nombre del categoria"
              type="text"
              onChange={handleChangeint}
              value={privateintPosts.categoria}
            />

            <label>stock:</label>
            <input
              className="form-control"
              name="stock"
              placeholder="stock de productos sin puntos ni comas"
              type="number"
              onChange={handleChangeint}
              value={privateintPosts.stock}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => insertarr(privateintPosts)}>
            Crear
          </Button>
          <Button color="danger" onClick={() => cancelarModalinsertar()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
    <div className="credits">
		<div className="responsive-container">
		<h3>Cafeteria de prueba</h3>
		</div>
	</div>
    </div>
  );
};
export default Datos;
