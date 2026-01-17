-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: greenprobo
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `greenprobo`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `greenprobo` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;

USE `greenprobo`;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `code` varchar(100) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `village` varchar(100) DEFAULT NULL,
  `whatsapp` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES ('001','Admin 1','Salatiga','Tanjungrejo','08213123','admin1','password'),('002','Admin 2','Klaten','Sukorejo','08213123','admin2','password');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `code` varchar(100) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `village` varchar(100) DEFAULT NULL,
  `whatsapp` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('028','Artena Nagara','individu','Probolinggo','Sumbersekar','082260840196','artenanagara','artenanagara'),('029','Budi Prakoso','Sekolah','Probolinggo','Tanjungrejo','082358291812','budi','budi'),('030','Tugiman','Instansi','Probolinggo','Sukorejo','082358291812','tugiman','tugiman'),('031','Sasuke Uchiha','individu','Konoha','Kebonsari','0938098',NULL,NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `noFactur` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `year` varchar(100) DEFAULT NULL,
  `totalTrash` int(11) DEFAULT NULL,
  `totalFee` int(11) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `month` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,'2026-01-16 22:00:30','A/01/202','A','2026',3,300,'{\"trash\":[{\"trashType\":\"plastic\",\"trashCode\":\"p1\",\"name\":\"kresek\",\"totalAmount\":1,\"totalFee\":100},{\"trashType\":\"kertas\",\"trashCode\":\"k1\",\"name\":\"buku tulis\",\"totalAmount\":2,\"totalFee\":200}],\"customer\":{\"code\":\"028\",\"name\":\"Artena Nagara\",\"type\":\"individu\"},\"admin\":{\"code\":\"001\",\"name\":\"Admin 1\"}}\n','01'),(2,'2026-01-17 00:11:15','001/B/01/2026','B','2026',115,6750,'{\"trash\":[{\"trashType\":\"plastic\",\"trashCode\":\"p1\",\"name\":\"kresek\",\"totalAmount\":10,\"totalFee\":1000},{\"trashType\":\"logam\",\"trashCode\":\"s1\",\"name\":\"seng omplong\",\"totalAmount\":5,\"totalFee\":750},{\"trashType\":\"kertas\",\"trashCode\":\"k1\",\"name\":\"buku tulis\",\"totalAmount\":100,\"totalFee\":5000}],\"customer\":{\"code\":\"030\",\"name\":\"Tugiman\",\"type\":\"Instansi\"},\"admin\":{\"code\":\"001\",\"name\":\"Admin 1\"}}','01'),(3,'2026-01-17 00:24:52','002/A/01/2026','A','2026',200,10000,'{\"trash\":[{\"trashType\":\"botol\",\"trashCode\":\"b1\",\"name\":\"botol kecil\",\"totalAmount\":200,\"totalFee\":10000}],\"customer\":{\"code\":\"031\",\"name\":\"Sasuke Uchiha\",\"type\":\"individu\"},\"admin\":{\"code\":\"002\",\"name\":\"Admin 2\"}}','01');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trash_master`
--

DROP TABLE IF EXISTS `trash_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trash_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `code` varchar(100) DEFAULT NULL,
  `fee` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trash_master`
--

LOCK TABLES `trash_master` WRITE;
/*!40000 ALTER TABLE `trash_master` DISABLE KEYS */;
INSERT INTO `trash_master` VALUES (1,'plastic','kresek','p1',100),(3,'logam','seng omplong','s1',150),(4,'botol','botol kecil','b1',50),(5,'plastic','plastik gede','p2',200),(6,'kertas','buku tulis','k1',50);
/*!40000 ALTER TABLE `trash_master` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-17  7:31:17
