-- MySQL dump 10.13  Distrib 9.3.0, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: campus
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `park`
--

DROP TABLE IF EXISTS `park`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `park` (
  `id` int NOT NULL AUTO_INCREMENT,
  `park_name` varchar(100) NOT NULL,
  `province` varchar(50) DEFAULT NULL,
  `assigned_student` varchar(50) DEFAULT NULL,
  `leader` varchar(50) DEFAULT NULL,
  `student_status` varchar(20) DEFAULT NULL,
  `first_review` varchar(20) DEFAULT NULL,
  `final_review` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `park`
--

LOCK TABLES `park` WRITE;
/*!40000 ALTER TABLE `park` DISABLE KEYS */;
INSERT INTO `park` VALUES (1,'南阳现代服务业开发区','河南省','江泽亚','张宇涵','提交','未找到','未找到'),(2,'鹤壁市现代物流开发区','河南省','江泽亚','张宇涵','提交','未找到','未找到'),(3,'鹤壁宝山经济技术开发区','河南省','杨恺','张宇涵','提交','未找到','未找到'),(4,'汤阴高新技术产业开发区','河南省','陆昕屹','张宇涵','提交','未找到','未找到'),(5,'修武经济技术开发区','河南省','陆昕屹','张宇涵','提交','未找到','未找到'),(6,'安阳殷都区先进制造业开发区','河南省','陆昕屹','张宇涵','提交','未找到','未找到'),(7,'新乡市平原现代服务业开发区','河南省','陈卓阳','李涛','提交','未找到','未找到'),(9,'南阳官庄先进制造业开发区','河南省','江泽亚','张宇涵','提交','未找到','未找到'),(10,'遂平县先进制造业开发区','河南省','江泽亚','张宇涵','提交','未找到','未找到'),(11,'漯河郾城区先进制造业开发区','河南省','江泽亚','张宇涵','提交','未找到','未找到'),(12,'伊川县先进制造业开发区','河南省','王倩敏','李涛','提交','未找到','未找到'),(13,'许昌现代服务业开发区','河南省','王倩敏','李涛','提交','未找到','未找到'),(14,'许昌建安区先进制造业开发区','河南省','倪逸帆','李涛','提交','未找到','未找到'),(15,'新蔡县先进制造业开发区','河南省','黄翀','黄翀','提交','未找到','未找到'),(16,'平顶山湛河区现代服务业开发区','河南省','江泽亚','张宇涵','提交','未找到','未找到'),(17,'平顶山卫东区现代服务业开发区','河南省','江泽亚','张宇涵','提交','未找到','未找到'),(18,'漯河现代服务业开发区','河南省','倪逸帆','李涛','提交','未找到','未找到'),(19,'漯河西城区现代服务业开发区','河南省','倪逸帆','李涛','提交','未找到','未找到'),(20,'焦作马村区现代服务业开发区','河南省','江泽亚','张宇涵','提交','未找到','未找到'),(21,'方城县先进制造业开发区','河南省','陆昕屹','张宇涵','提交','未找到','未找到'),(22,'安阳龙安区先进制造业开发区','河南省','陆昕屹','张宇涵','提交','未找到','未找到'),(23,'郸城高新技术产业开发区','河南省','陆昕屹','张宇涵','提交','未找到','未找到'),(24,'信阳经济技术开发区','河南省','陆昕屹','张宇涵','提交','未找到','未找到'),(25,'三门峡陕州区先进制造业开发区','河南省','黄翀','黄翀','提交','未找到','未找到'),(26,'汝阳县先进制造业开发区','河南省','黄翀','黄翀','提交','未找到','未找到');
/*!40000 ALTER TABLE `park` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_no` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `leader` varchar(50) DEFAULT NULL,
  `assigned` int DEFAULT '0',
  `passed` int DEFAULT '0',
  `not_found` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'M325124530','黄翀','黄翀',51,37,11),(2,'011723222','王佳凝','黄翀',16,0,0),(3,'211122225','岳子琦','黄翀',20,9,1),(4,'051124332','应龄仪','黄翀',25,4,0),(5,'028123059','叶帆','黄翀',43,17,3),(6,'028123057','苏炜川','黄翀',24,5,11),(7,'028123388','谭明珠','黄翀',28,9,8),(8,'021424124','杨欣奕','黄翀',10,1,8),(10,'028123039','陈卓阳','李涛',72,60,6),(11,'051124327','王倩敏','李涛',43,20,2),(12,'051124330','倪逸帆','李涛',36,14,8),(13,'028123235','浦希','李涛',27,12,8),(14,'031924203','叶玥濛','李涛',25,11,2),(15,'211224202','陈一鸣','李涛',22,5,7),(17,'028123046','陆昕屹','张宇涵',80,31,35),(18,'028123055','江泽亚','张宇涵',55,17,17),(19,'028123337','杨恺','张宇涵',25,4,5),(20,'211122219','王安宁','张宇涵',63,27,23),(21,'211222128','罗文珊','张宇涵',35,5,12),(22,'091124110','郑可','张宇涵',18,2,5),(24,'101322113','林晶晶','殷发明',44,29,6),(25,'051123204','徐剑政','殷发明',10,1,2),(26,'028123396','金耀辉','殷发明',37,17,9),(27,'038123003','李应楷','殷发明',10,5,1),(28,'051124303','洪炜晋','殷发明',27,9,9),(29,'051124308','李天书','殷发明',25,0,0),(30,'211222127','贾仪琴','殷发明',15,5,0),(31,'021424122','陈思莹','殷发明',10,0,0);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-14 19:00:50
