<?php
$host="localhost";
$bd="agenda";
$usuario="root";
$contraseña="root";

try{
    $conexion=new PDO("mysql:host=$host;dbname=$bd",$usuario,$contraseña);
}catch (Exception $err){
    echo $err->getMessage();
}

?>