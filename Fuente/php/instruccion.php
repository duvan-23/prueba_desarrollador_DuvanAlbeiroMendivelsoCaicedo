<?php
include('cn.php');


if(isset($_GET['mostrarUsuarios'])){
    $id =$_GET["mostrarUsuarios"];
    $sentenciaSQL=$conexion->prepare("SELECT * FROM  usuarios WHERE id_usuarios=".$id);
    $sentenciaSQL->execute();
    $listaUsuarios = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($listaUsuarios);
    exit();
}

if(isset($_GET['consultarUsuario'])){
    $id =$_GET["consultarUsuario"];
    $sentenciaSQL=$conexion->prepare("SELECT * FROM  usuarios WHERE id_usuarios=".$id);
    $sentenciaSQL->execute();
    $listaUsuarios = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($listaUsuarios);
    exit();
}

if (isset($_GET['accion']) == "insertarUsuario") {

    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $documento = $_POST['documento'];
    $fecha = $_POST['fecha'];
    $genero = $_POST['genero'];
    if (isset($nombre) && isset($apellido) && isset($documento) && isset($fecha) && isset($genero)) {
        try {
            $sentenciaSQL = $conexion->prepare("INSERT INTO agenda.usuarios(id_usuarios,nombre,apellido,documento,fecha_nacimiento,genero) values(NULL,'$nombre','$apellido','$documento','$fecha','$genero');");
            $sentenciaSQL->execute();
            echo json_encode(["estado" => true, "mensaje" => "Usuario agregado correctamente"]);
        } catch (Exception $e) {
            $response = ["estado" => false, "mensaje" => "El usuario ya existe"];
            echo json_encode($response);
        }
    } else {
        echo json_encode(["estado" => false, "mensaje" => "Datos incompletos"]);
    }
    exit();
}

if(isset($_GET['mostrarContactos'])){
    $id =$_GET["mostrarContactos"];
    $sentenciaSQL=$conexion->prepare("SELECT contactos.id_contactos,contactos.nombre,contactos.apellido,contactos.numero_contacto,contactos.tipo_numero,contactos.parentesco,contactos.id_usuarios FROM contactos JOIN usuarios where contactos.id_usuarios=usuarios.id_usuarios and contactos.id_usuarios=".$id);
    $sentenciaSQL->execute();
    $listaUsuarios = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($listaUsuarios);
    exit();
}

if(isset($_GET['actualizarUsuario'])){
    $id=$_POST['id'];
    $nombre=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $documento=$_POST['documento'];
    $fecha=$_POST['fecha'];
    $genero=$_POST['genero'];  
    $sentenciaSQL=$conexion->prepare("UPDATE agenda.usuarios SET nombre='$nombre',apellido='$apellido',documento='$documento',fecha_nacimiento='$fecha',genero='$genero' WHERE id_usuarios='$id';");
    $sentenciaSQL->execute();
    
    echo json_encode(["success"=>1]);
    exit();
}

if(isset($_GET['borrarUsuario'])){
    $id=$_GET["borrarUsuario"];
    $sentenciaSQL=$conexion->prepare("DELETE FROM  agenda.usuarios WHERE id_usuarios='$id';");
    $sentenciaSQL->execute();
    exit();
}

if(isset($_GET['accion1'])=="insertarContactos"){
    $id=$_POST['id'];
    $nombre=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $contacto=$_POST['contacto'];
    $tipo=$_POST['tipo'];
    $parentesco=$_POST['parentesco']; 
    if (isset($nombre) && isset($apellido) && isset($contacto) && isset($tipo) && isset($parentesco)) {
        try {                                
            $sentenciaSQL=$conexion->prepare("INSERT INTO agenda.contactos(id_contactos,nombre,apellido,numero_contacto,tipo_numero,parentesco,id_usuarios) values(NULL,'$nombre','$apellido','$contacto','$tipo','$parentesco','$id');");
            $sentenciaSQL->execute();
            echo json_encode(["estado" => true, "mensaje" => "Contacto agregado correctamente"]);
        } catch (Exception $e) {
            $response = ["estado" => false, "mensaje" => "El numero de contacto ya existe"];
            echo json_encode($response);
        }
    } else {
        echo json_encode(["estado" => false, "mensaje" => "Datos incompletos"]);
    }
    exit();
}

if(isset($_GET['consultarContactos'])){
    $id =$_GET["consultarContactos"];
    $sentenciaSQL=$conexion->prepare("SELECT * FROM  agenda.contactos WHERE id_contactos=".$id);
    $sentenciaSQL->execute();
    $listaContactos2 = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($listaContactos2);
    exit();
}

if(isset($_GET['actualizarContactos'])){
    $id=$_POST['id'];
    $nombre=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $contacto=$_POST['contacto'];
    $tipo=$_POST['tipo'];
    $parentesco=$_POST['parentesco'];  
    $sentenciaSQL=$conexion->prepare("UPDATE agenda.contactos SET nombre='$nombre',apellido='$apellido',numero_contacto='$contacto',tipo_numero='$tipo',parentesco='$parentesco' WHERE id_contactos='$id';");
    $sentenciaSQL->execute();
    
    echo json_encode(["success"=>1]);
    exit();
}

if(isset($_GET['borrarContactos'])){
    $id=$_GET["borrarContactos"];
    $sentenciaSQL=$conexion->prepare("DELETE FROM  agenda.contactos WHERE id_contactos='$id';");
    $sentenciaSQL->execute();
    exit();
}

$instruccion=$conexion->prepare("SELECT * FROM usuarios");
$instruccion->execute();
$listaUsuarios=$instruccion->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($listaUsuarios);
