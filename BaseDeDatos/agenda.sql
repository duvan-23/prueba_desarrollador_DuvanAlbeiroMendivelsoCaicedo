-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2022 at 01:18 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agenda`
--
CREATE DATABASE IF NOT EXISTS `agenda` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `agenda`;

-- --------------------------------------------------------

--
-- Table structure for table `contactos`
--

DROP TABLE IF EXISTS `contactos`;
CREATE TABLE IF NOT EXISTS `contactos` (
  `id_contactos` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `numero_contacto` varchar(11) NOT NULL,
  `tipo_numero` varchar(10) NOT NULL,
  `parentesco` varchar(50) NOT NULL,
  `id_usuarios` int(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id_contactos`),
  UNIQUE KEY `numero_contacto` (`numero_contacto`),
  KEY `id_usuarios` (`id_usuarios`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `contactos`:
--   `id_usuarios`
--       `usuarios` -> `id_usuarios`
--

--
-- Dumping data for table `contactos`
--

INSERT INTO `contactos` VALUES
(1, 'Pedro Armando', 'Cardenas', '49293814', 'Fijo', 'Familiar', 1),
(2, 'Lucas', 'Torres', '31348545635', 'Movil', 'Compañero de Trabajo', 2),
(3, 'Ana', 'Sofia', '4929113', 'Fijo', 'Compañero de Trabajo', 3),
(4, 'Milena', 'Mendez', '3211311235', 'Movil', 'Familiar', 3),
(5, 'Camila ', 'Guerrero', '313434222', 'Movil', 'Compañero de Trabajo', 3),
(6, 'Lucas', 'Sarmiento', '43134545', 'Fijo', 'Amigo', 2);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuarios` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `documento` varchar(50) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `genero` varchar(10) NOT NULL,
  PRIMARY KEY (`id_usuarios`),
  UNIQUE KEY `documento` (`documento`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `usuarios`:
--

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` VALUES
(1, 'Juan Esteban', 'Mendez ', '1828818183', '1990-02-10', 'Masculino'),
(2, 'Pablo Hurtado', 'Ruiz', '8834769912', '1992-11-29', 'Masculino'),
(3, 'Manuela ', 'Vargas Triana', '9142732316', '1996-12-25', 'Femenino');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contactos`
--
ALTER TABLE `contactos`
  ADD CONSTRAINT `contactos_ibfk_1` FOREIGN KEY (`id_usuarios`) REFERENCES `usuarios` (`id_usuarios`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
