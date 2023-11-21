-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: crowdfunding
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campaigns`
--

DROP TABLE IF EXISTS `campaigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaigns` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `goal_usd` decimal(10,2) NOT NULL,
  `status` enum('active','fraud','successful') DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaigns`
--

LOCK TABLES `campaigns` WRITE;
/*!40000 ALTER TABLE `campaigns` DISABLE KEYS */;
INSERT INTO `campaigns` VALUES (1,'Nova Campanha','Descrição da nova campanha',1000.00,'fraud'),(2,'Save the Whales','A campaign to save the whales from extinction.',10000.00,'active'),(3,'teste 2','teste 2....',500.00,'fraud'),(4,'Save the Trees','One more test campaign',50000.00,'active'),(5,'Help children','A test campaign',50000.00,'active'),(6,'Test 3','Test 3',40000.00,'active'),(7,'Test 4','Test 4',20000.00,'active'),(8,'Test 5','Test 5',5000.00,'active'),(9,'Test 6','Test 6',40000.00,'active'),(10,'Test 7','Test 7',60000.00,'active'),(11,'Test Campaign 8','Test Campaign 8',10000.00,'active'),(12,'Test Campaign 9','Test Campaign 9',15000.00,'active'),(13,'Test Campaign 10','Test Campaign 10',500.00,'active'),(14,'Test Campaign 11','Test Campaign 11',5000.00,'active'),(15,'Test Campaign 12','Test Campaign 12',60000.00,'active'),(16,'Test Campaign 13','Test Campaign 13',40000.00,'active'),(17,'Test Campaign 14','Test Campaign 14',7500.00,'active'),(18,'One Test','One test',1400.00,'active'),(19,'Last test','Last test',22143.00,'active'),(20,'f34wetg34','43t34t',3545.00,'active'),(21,'f23f2f','f32f2f',12444.00,'active'),(22,'two test','two test',2222.00,'active'),(23,'Save the test','Save the test',60000.00,'active'),(24,'Test Name C','Test description',65000.00,'active');
/*!40000 ALTER TABLE `campaigns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `campaign_id` int DEFAULT NULL,
  `donator_nickname` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('valid','fraud') DEFAULT 'valid',
  PRIMARY KEY (`id`),
  KEY `fk_campaign_id` (`campaign_id`),
  CONSTRAINT `fk_campaign_id` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
INSERT INTO `donations` VALUES (1,1,'JohnDoe',450.00,'fraud'),(2,2,'Celso',300.00,'valid'),(3,2,'Celso',1500.00,'valid'),(4,2,'Anonimo2',100.00,'valid'),(5,3,'OneAnonymous',168.00,'valid'),(6,3,'TesteDonator33',20.00,'fraud'),(7,3,'TesteDonator20',2.00,'valid'),(8,2,'Jhon L',300.00,'valid'),(9,12,'TesteDonator123',16000.00,'valid'),(10,2,'Celso',5000.00,'valid'),(11,6,'Anon',1500.00,'valid'),(12,6,'Anon',1500.00,'valid'),(13,3,'Carol',150.00,'valid'),(14,4,'Jhon L',25000.00,'valid');
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'admin','$2b$10$1DNrA5.OYSPP/JDwXFmMvOPsi689ngLX.CM6SVXhmoyEN38AFfMg2',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'crowdfunding'
--
/*!50003 DROP PROCEDURE IF EXISTS `InsertDonation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertDonation`(
    IN p_campaignId INT,
    IN p_donatorNickname VARCHAR(255),
    IN p_amount DECIMAL(10, 2)
)
BEGIN

    INSERT INTO donations (campaign_id, donator_nickname, amount) 
    VALUES (p_campaignId, p_donatorNickname, p_amount);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MarkDonatorAsFraud` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `MarkDonatorAsFraud`(IN p_donatorNickname VARCHAR(255))
BEGIN
    -- Check if the donor has already been marked as fraud.
    DECLARE fraud_donor_count INT DEFAULT 0;
    SELECT COUNT(*) INTO fraud_donor_count FROM donations WHERE donator_nickname = p_donatorNickname AND status = 'fraud';
    
    IF fraud_donor_count > 0 THEN
        -- If the donor is already marked as fraud, signal an informational message.
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The donor has already been marked as fraud.';
    ELSE
        -- If the donor is not marked as fraud, proceed to mark the donations as fraud.
        UPDATE donations SET status = 'fraud' WHERE donator_nickname = p_donatorNickname;
        
        -- Additionally, mark the campaigns affected by the fraudulent donations as fraud.
        UPDATE campaigns c
        INNER JOIN donations d ON c.id = d.campaign_id
        SET c.status = 'fraud'
        WHERE d.donator_nickname = p_donatorNickname;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-21 17:21:45
