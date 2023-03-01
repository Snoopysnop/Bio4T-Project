-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: elixir
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `account_emailaddress`
--

DROP TABLE IF EXISTS `account_emailaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_emailaddress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `primary` tinyint(1) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `account_emailaddress_user_id_2c513194_fk_auth_user_id` (`user_id`),
  CONSTRAINT `account_emailaddress_user_id_2c513194_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `account_emailconfirmation`
--

DROP TABLE IF EXISTS `account_emailconfirmation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_emailconfirmation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `sent` datetime(6) DEFAULT NULL,
  `key` varchar(64) NOT NULL,
  `email_address_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  KEY `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` (`email_address_id`),
  CONSTRAINT `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` FOREIGN KEY (`email_address_id`) REFERENCES `account_emailaddress` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=269 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `background_task`
--

DROP TABLE IF EXISTS `background_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `background_task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_name` varchar(190) NOT NULL,
  `task_params` longtext NOT NULL,
  `task_hash` varchar(40) NOT NULL,
  `verbose_name` varchar(255) DEFAULT NULL,
  `priority` int NOT NULL,
  `run_at` datetime(6) NOT NULL,
  `repeat` bigint NOT NULL,
  `repeat_until` datetime(6) DEFAULT NULL,
  `queue` varchar(190) DEFAULT NULL,
  `attempts` int NOT NULL,
  `failed_at` datetime(6) DEFAULT NULL,
  `last_error` longtext NOT NULL,
  `locked_by` varchar(64) DEFAULT NULL,
  `locked_at` datetime(6) DEFAULT NULL,
  `creator_object_id` int unsigned DEFAULT NULL,
  `creator_content_type_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `background_task_creator_content_type_61cc9af3_fk_django_co` (`creator_content_type_id`),
  KEY `background_task_task_name_4562d56a` (`task_name`),
  KEY `background_task_task_hash_d8f233bd` (`task_hash`),
  KEY `background_task_priority_88bdbce9` (`priority`),
  KEY `background_task_run_at_7baca3aa` (`run_at`),
  KEY `background_task_queue_1d5f3a40` (`queue`),
  KEY `background_task_attempts_a9ade23d` (`attempts`),
  KEY `background_task_failed_at_b81bba14` (`failed_at`),
  KEY `background_task_locked_by_db7779e3` (`locked_by`),
  KEY `background_task_locked_at_0fb0f225` (`locked_at`),
  CONSTRAINT `background_task_creator_content_type_61cc9af3_fk_django_co` FOREIGN KEY (`creator_content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `background_task_chk_1` CHECK ((`creator_object_id` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `background_task_completedtask`
--

DROP TABLE IF EXISTS `background_task_completedtask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `background_task_completedtask` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_name` varchar(190) NOT NULL,
  `task_params` longtext NOT NULL,
  `task_hash` varchar(40) NOT NULL,
  `verbose_name` varchar(255) DEFAULT NULL,
  `priority` int NOT NULL,
  `run_at` datetime(6) NOT NULL,
  `repeat` bigint NOT NULL,
  `repeat_until` datetime(6) DEFAULT NULL,
  `queue` varchar(190) DEFAULT NULL,
  `attempts` int NOT NULL,
  `failed_at` datetime(6) DEFAULT NULL,
  `last_error` longtext NOT NULL,
  `locked_by` varchar(64) DEFAULT NULL,
  `locked_at` datetime(6) DEFAULT NULL,
  `creator_object_id` int unsigned DEFAULT NULL,
  `creator_content_type_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `background_task_comp_creator_content_type_21d6a741_fk_django_co` (`creator_content_type_id`),
  KEY `background_task_completedtask_task_name_388dabc2` (`task_name`),
  KEY `background_task_completedtask_task_hash_91187576` (`task_hash`),
  KEY `background_task_completedtask_priority_9080692e` (`priority`),
  KEY `background_task_completedtask_run_at_77c80f34` (`run_at`),
  KEY `background_task_completedtask_queue_61fb0415` (`queue`),
  KEY `background_task_completedtask_attempts_772a6783` (`attempts`),
  KEY `background_task_completedtask_failed_at_3de56618` (`failed_at`),
  KEY `background_task_completedtask_locked_by_edc8a213` (`locked_by`),
  KEY `background_task_completedtask_locked_at_29c62708` (`locked_at`),
  CONSTRAINT `background_task_comp_creator_content_type_21d6a741_fk_django_co` FOREIGN KEY (`creator_content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `background_task_completedtask_chk_1` CHECK ((`creator_object_id` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `django_site`
--

DROP TABLE IF EXISTS `django_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_site` (
  `id` int NOT NULL AUTO_INCREMENT,
  `domain` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_site_domain_a2e37b91_uniq` (`domain`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_accessibility`
--

DROP TABLE IF EXISTS `elixir_accessibility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_accessibility` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_accessibility_resource_id_96717625_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_accessibility_resource_id_96717625_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_biolib`
--

DROP TABLE IF EXISTS `elixir_biolib`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_biolib` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_name` longtext COLLATE utf8mb4_unicode_ci,
  `author_name` longtext COLLATE utf8mb4_unicode_ci,
  `author_username` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_collectionid`
--

DROP TABLE IF EXISTS `elixir_collectionid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_collectionid` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_collectionid_resource_id_17b636f7_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_collectionid_resource_id_17b636f7_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_community`
--

DROP TABLE IF EXISTS `elixir_community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_community` (
  `id` int NOT NULL AUTO_INCREMENT,
  `biolib_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_community_biolib_id_598b10fc_fk_elixir_biolib_id` (`biolib_id`),
  CONSTRAINT `elixir_community_biolib_id_598b10fc_fk_elixir_biolib_id` FOREIGN KEY (`biolib_id`) REFERENCES `elixir_biolib` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_contact`
--

DROP TABLE IF EXISTS `elixir_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` longtext COLLATE utf8mb4_unicode_ci,
  `name` longtext COLLATE utf8mb4_unicode_ci,
  `tel` longtext COLLATE utf8mb4_unicode_ci,
  `url` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_contact_resource_id_036932a3_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_contact_resource_id_036932a3_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_credit`
--

DROP TABLE IF EXISTS `elixir_credit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_credit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext COLLATE utf8mb4_unicode_ci,
  `email` longtext COLLATE utf8mb4_unicode_ci,
  `url` longtext COLLATE utf8mb4_unicode_ci,
  `orcidid` longtext COLLATE utf8mb4_unicode_ci,
  `gridid` longtext COLLATE utf8mb4_unicode_ci,
  `rorid` longtext COLLATE utf8mb4_unicode_ci,
  `fundrefid` longtext COLLATE utf8mb4_unicode_ci,
  `typeEntity` longtext COLLATE utf8mb4_unicode_ci,
  `note` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_credit_resource_id_24536907_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_credit_resource_id_24536907_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_credittyperole`
--

DROP TABLE IF EXISTS `elixir_credittyperole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_credittyperole` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeRole` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `credit_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_credittyperole_credit_id_86e78570_fk_elixir_credit_id` (`credit_id`),
  CONSTRAINT `elixir_credittyperole_credit_id_86e78570_fk_elixir_credit_id` FOREIGN KEY (`credit_id`) REFERENCES `elixir_credit` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_data`
--

DROP TABLE IF EXISTS `elixir_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uri` longtext COLLATE utf8mb4_unicode_ci,
  `term` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_documentation`
--

DROP TABLE IF EXISTS `elixir_documentation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_documentation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_old` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_documentation_resource_id_c708fb14_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_documentation_resource_id_c708fb14_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_documentationtype`
--

DROP TABLE IF EXISTS `elixir_documentationtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_documentationtype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `documentation_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_documentation_documentation_id_ae327a47_fk_elixir_do` (`documentation_id`),
  CONSTRAINT `elixir_documentation_documentation_id_ae327a47_fk_elixir_do` FOREIGN KEY (`documentation_id`) REFERENCES `elixir_documentation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_domain`
--

DROP TABLE IF EXISTS `elixir_domain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_domain` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` longtext COLLATE utf8mb4_unicode_ci,
  `sub_title` longtext COLLATE utf8mb4_unicode_ci,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `owner_id` int NOT NULL,
  `is_private` tinyint(1) NOT NULL,
  `visibility` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_domain_owner_id_1fcb948d_fk_auth_user_id` (`owner_id`),
  CONSTRAINT `elixir_domain_owner_id_1fcb948d_fk_auth_user_id` FOREIGN KEY (`owner_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_domaincollection`
--

DROP TABLE IF EXISTS `elixir_domaincollection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_domaincollection` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `additionDate` datetime(6) DEFAULT NULL,
  `domain_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_domaincollection_domain_id_0bd44233_fk_elixir_domain_id` (`domain_id`),
  CONSTRAINT `elixir_domaincollection_domain_id_0bd44233_fk_elixir_domain_id` FOREIGN KEY (`domain_id`) REFERENCES `elixir_domain` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_domainresource`
--

DROP TABLE IF EXISTS `elixir_domainresource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_domainresource` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `version` longtext COLLATE utf8mb4_unicode_ci,
  `biotoolsID` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `versionId` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `additionDate` datetime(6) NOT NULL,
  `domain_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_domainresource_domain_id_f44ed364_fk_elixir_domain_id` (`domain_id`),
  CONSTRAINT `elixir_domainresource_domain_id_f44ed364_fk_elixir_domain_id` FOREIGN KEY (`domain_id`) REFERENCES `elixir_domain` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_domaintag`
--

DROP TABLE IF EXISTS `elixir_domaintag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_domaintag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `domain_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_domaintag_domain_id_8ec42124_fk_elixir_domain_id` (`domain_id`),
  CONSTRAINT `elixir_domaintag_domain_id_8ec42124_fk_elixir_domain_id` FOREIGN KEY (`domain_id`) REFERENCES `elixir_domain` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_download`
--

DROP TABLE IF EXISTS `elixir_download`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_download` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` longtext COLLATE utf8mb4_unicode_ci,
  `version` longtext COLLATE utf8mb4_unicode_ci,
  `cmd` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_download_resource_id_b77c35f3_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_download_resource_id_b77c35f3_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_editpermission`
--

DROP TABLE IF EXISTS `elixir_editpermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_editpermission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_editpermissionauthor`
--

DROP TABLE IF EXISTS `elixir_editpermissionauthor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_editpermissionauthor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `elixir_editpermissionauthor_user_id_bce519a5_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_editpermissionauthor_editPermissions`
--

DROP TABLE IF EXISTS `elixir_editpermissionauthor_editPermissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_editpermissionauthor_editPermissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `editpermissionauthor_id` int NOT NULL,
  `editpermission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `elixir_editpermissionaut_editpermissionauthor_id__316753ae_uniq` (`editpermissionauthor_id`,`editpermission_id`),
  KEY `elixir_editpermissio_editpermission_id_8984b8cf_fk_elixir_ed` (`editpermission_id`),
  CONSTRAINT `elixir_editpermissio_editpermission_id_8984b8cf_fk_elixir_ed` FOREIGN KEY (`editpermission_id`) REFERENCES `elixir_editpermission` (`id`),
  CONSTRAINT `elixir_editpermissio_editpermissionauthor_3d7f5536_fk_elixir_ed` FOREIGN KEY (`editpermissionauthor_id`) REFERENCES `elixir_editpermissionauthor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_elixircommunity`
--

DROP TABLE IF EXISTS `elixir_elixircommunity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_elixircommunity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `elixirCommunity` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_elixircommuni_resource_id_6cddff85_fk_elixir_re` (`resource_id`),
  CONSTRAINT `elixir_elixircommuni_resource_id_6cddff85_fk_elixir_re` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_elixirinfo`
--

DROP TABLE IF EXISTS `elixir_elixirinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_elixirinfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` longtext COLLATE utf8mb4_unicode_ci,
  `node` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_elixirnode`
--

DROP TABLE IF EXISTS `elixir_elixirnode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_elixirnode` (
  `id` int NOT NULL AUTO_INCREMENT,
  `elixirNode` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_elixirnode_resource_id_353ad38f_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_elixirnode_resource_id_353ad38f_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_elixirplatform`
--

DROP TABLE IF EXISTS `elixir_elixirplatform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_elixirplatform` (
  `id` int NOT NULL AUTO_INCREMENT,
  `elixirPlatform` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_elixirplatform_resource_id_aa1035c0_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_elixirplatform_resource_id_aa1035c0_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_format`
--

DROP TABLE IF EXISTS `elixir_format`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_format` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uri` longtext COLLATE utf8mb4_unicode_ci,
  `term` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `input_id` int DEFAULT NULL,
  `output_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_format_input_id_05d1d16e_fk_elixir_input_id` (`input_id`),
  KEY `elixir_format_output_id_1551dba8_fk_elixir_output_id` (`output_id`),
  CONSTRAINT `elixir_format_input_id_05d1d16e_fk_elixir_input_id` FOREIGN KEY (`input_id`) REFERENCES `elixir_input` (`id`),
  CONSTRAINT `elixir_format_output_id_1551dba8_fk_elixir_output_id` FOREIGN KEY (`output_id`) REFERENCES `elixir_output` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_function`
--

DROP TABLE IF EXISTS `elixir_function`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_function` (
  `id` int NOT NULL AUTO_INCREMENT,
  `note` longtext COLLATE utf8mb4_unicode_ci,
  `cmd` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_function_resource_id_974962d8_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_function_resource_id_974962d8_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_input`
--

DROP TABLE IF EXISTS `elixir_input`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_input` (
  `id` int NOT NULL AUTO_INCREMENT,
  `additionDate` datetime(6) NOT NULL,
  `data_id` int DEFAULT NULL,
  `function_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_input_data_id_dd8d11c4_fk_elixir_data_id` (`data_id`),
  KEY `elixir_input_function_id_1ae94479_fk_elixir_function_id` (`function_id`),
  CONSTRAINT `elixir_input_data_id_dd8d11c4_fk_elixir_data_id` FOREIGN KEY (`data_id`) REFERENCES `elixir_data` (`id`),
  CONSTRAINT `elixir_input_function_id_1ae94479_fk_elixir_function_id` FOREIGN KEY (`function_id`) REFERENCES `elixir_function` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_issue`
--

DROP TABLE IF EXISTS `elixir_issue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_issue` (
  `id` int NOT NULL AUTO_INCREMENT,
  `field_name` longtext COLLATE utf8mb4_unicode_ci,
  `field_value` longtext COLLATE utf8mb4_unicode_ci,
  `resource_biotoolsID` longtext COLLATE utf8mb4_unicode_ci,
  `resource_versionId` longtext COLLATE utf8mb4_unicode_ci,
  `resolution_date` datetime(6) DEFAULT NULL,
  `resolution_actor` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creation_actor` longtext COLLATE utf8mb4_unicode_ci,
  `comment` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `issue_state_id` int NOT NULL,
  `issue_type_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_issue_issue_state_id_c999b588_fk_elixir_issuestate_id` (`issue_state_id`),
  KEY `elixir_issue_issue_type_id_bc02f25e_fk_elixir_issuetype_id` (`issue_type_id`),
  CONSTRAINT `elixir_issue_issue_state_id_c999b588_fk_elixir_issuestate_id` FOREIGN KEY (`issue_state_id`) REFERENCES `elixir_issuestate` (`id`),
  CONSTRAINT `elixir_issue_issue_type_id_bc02f25e_fk_elixir_issuetype_id` FOREIGN KEY (`issue_type_id`) REFERENCES `elixir_issuetype` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_issuestate`
--

DROP TABLE IF EXISTS `elixir_issuestate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_issuestate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext COLLATE utf8mb4_unicode_ci,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_issuetype`
--

DROP TABLE IF EXISTS `elixir_issuetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_issuetype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` longtext COLLATE utf8mb4_unicode_ci,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `weight` double DEFAULT NULL,
  `attribute` longtext COLLATE utf8mb4_unicode_ci,
  `field_name` longtext COLLATE utf8mb4_unicode_ci,
  `field_value` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_language`
--

DROP TABLE IF EXISTS `elixir_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_language` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_language_resource_id_157bfe7c_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_language_resource_id_157bfe7c_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_link`
--

DROP TABLE IF EXISTS `elixir_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_link` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_old` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_link_resource_id_4b904930_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_link_resource_id_4b904930_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_linktype`
--

DROP TABLE IF EXISTS `elixir_linktype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_linktype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `link_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_linktype_link_id_8c56c94d_fk_elixir_link_id` (`link_id`),
  CONSTRAINT `elixir_linktype_link_id_8c56c94d_fk_elixir_link_id` FOREIGN KEY (`link_id`) REFERENCES `elixir_link` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_ontology`
--

DROP TABLE IF EXISTS `elixir_ontology`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_ontology` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext COLLATE utf8mb4_unicode_ci,
  `data` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_operatingsystem`
--

DROP TABLE IF EXISTS `elixir_operatingsystem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_operatingsystem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_operatingsyst_resource_id_4980b33b_fk_elixir_re` (`resource_id`),
  CONSTRAINT `elixir_operatingsyst_resource_id_4980b33b_fk_elixir_re` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_operation`
--

DROP TABLE IF EXISTS `elixir_operation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_operation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uri` longtext COLLATE utf8mb4_unicode_ci,
  `term` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `function_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_operation_function_id_10679a31_fk_elixir_function_id` (`function_id`),
  CONSTRAINT `elixir_operation_function_id_10679a31_fk_elixir_function_id` FOREIGN KEY (`function_id`) REFERENCES `elixir_function` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_otherid`
--

DROP TABLE IF EXISTS `elixir_otherid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_otherid` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` longtext COLLATE utf8mb4_unicode_ci,
  `version` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) DEFAULT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_otherid_resource_id_3f05531b_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_otherid_resource_id_3f05531b_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_output`
--

DROP TABLE IF EXISTS `elixir_output`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_output` (
  `id` int NOT NULL AUTO_INCREMENT,
  `additionDate` datetime(6) NOT NULL,
  `data_id` int DEFAULT NULL,
  `function_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_output_data_id_91fbd5dc_fk_elixir_data_id` (`data_id`),
  KEY `elixir_output_function_id_cb5b6321_fk_elixir_function_id` (`function_id`),
  CONSTRAINT `elixir_output_data_id_91fbd5dc_fk_elixir_data_id` FOREIGN KEY (`data_id`) REFERENCES `elixir_data` (`id`),
  CONSTRAINT `elixir_output_function_id_cb5b6321_fk_elixir_function_id` FOREIGN KEY (`function_id`) REFERENCES `elixir_function` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_publication`
--

DROP TABLE IF EXISTS `elixir_publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_publication` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pmcid` longtext COLLATE utf8mb4_unicode_ci,
  `pmid` longtext COLLATE utf8mb4_unicode_ci,
  `doi` longtext COLLATE utf8mb4_unicode_ci,
  `type_old` longtext COLLATE utf8mb4_unicode_ci,
  `version` longtext COLLATE utf8mb4_unicode_ci,
  `note` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `metadata_id` int DEFAULT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `metadata_id` (`metadata_id`),
  KEY `elixir_publication_resource_id_15a2fa9b_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_publication_metadata_id_68570a06_fk_elixir_pu` FOREIGN KEY (`metadata_id`) REFERENCES `elixir_publicationmetadata` (`id`),
  CONSTRAINT `elixir_publication_resource_id_15a2fa9b_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_publicationauthor`
--

DROP TABLE IF EXISTS `elixir_publicationauthor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_publicationauthor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext COLLATE utf8mb4_unicode_ci,
  `metadata_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_publicationau_metadata_id_b3ce05e1_fk_elixir_pu` (`metadata_id`),
  CONSTRAINT `elixir_publicationau_metadata_id_b3ce05e1_fk_elixir_pu` FOREIGN KEY (`metadata_id`) REFERENCES `elixir_publicationmetadata` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_publicationmetadata`
--

DROP TABLE IF EXISTS `elixir_publicationmetadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_publicationmetadata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `updated` datetime(6) DEFAULT NULL,
  `title` longtext COLLATE utf8mb4_unicode_ci,
  `journal` longtext COLLATE utf8mb4_unicode_ci,
  `abstract` longtext COLLATE utf8mb4_unicode_ci,
  `date` datetime(6) DEFAULT NULL,
  `citationCount` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_publicationtype`
--

DROP TABLE IF EXISTS `elixir_publicationtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_publicationtype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `publication_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_publicationty_publication_id_93309ecc_fk_elixir_pu` (`publication_id`),
  CONSTRAINT `elixir_publicationty_publication_id_93309ecc_fk_elixir_pu` FOREIGN KEY (`publication_id`) REFERENCES `elixir_publication` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_relation`
--

DROP TABLE IF EXISTS `elixir_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_relation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `biotoolsID` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_relation_resource_id_2eef8dc4_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_relation_resource_id_2eef8dc4_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_resource`
--

DROP TABLE IF EXISTS `elixir_resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_resource` (
  `id` int NOT NULL AUTO_INCREMENT,
  `biotoolsID` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `biotoolsCURIE` varchar(109) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `versionId` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `homepage` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `short_description` longtext COLLATE utf8mb4_unicode_ci,
  `canonicalID` longtext COLLATE utf8mb4_unicode_ci,
  `issue_score` double DEFAULT NULL,
  `version_hash` longtext COLLATE utf8mb4_unicode_ci,
  `visibility` int NOT NULL,
  `latest` int NOT NULL,
  `was_id_validated` int NOT NULL,
  `homepage_status` int NOT NULL,
  `elixir_badge` int NOT NULL,
  `confidence_flag` longtext COLLATE utf8mb4_unicode_ci,
  `cost` longtext COLLATE utf8mb4_unicode_ci,
  `accessibility` longtext COLLATE utf8mb4_unicode_ci,
  `maturity` longtext COLLATE utf8mb4_unicode_ci,
  `license` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) DEFAULT NULL,
  `lastUpdate` datetime(6) NOT NULL,
  `availability` longtext COLLATE utf8mb4_unicode_ci,
  `downtime` longtext COLLATE utf8mb4_unicode_ci,
  `community_id` int DEFAULT NULL,
  `editPermission_id` int NOT NULL,
  `elixirInfo_id` int DEFAULT NULL,
  `owner_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_resource_community_id_64e925ed_fk_elixir_community_id` (`community_id`),
  KEY `elixir_resource_editPermission_id_5fac31d7_fk_elixir_ed` (`editPermission_id`),
  KEY `elixir_resource_elixirInfo_id_2b6c9095_fk_elixir_elixirinfo_id` (`elixirInfo_id`),
  KEY `elixir_resource_owner_id_47e470c2_fk_auth_user_id` (`owner_id`),
  CONSTRAINT `elixir_resource_community_id_64e925ed_fk_elixir_community_id` FOREIGN KEY (`community_id`) REFERENCES `elixir_community` (`id`),
  CONSTRAINT `elixir_resource_editPermission_id_5fac31d7_fk_elixir_ed` FOREIGN KEY (`editPermission_id`) REFERENCES `elixir_editpermission` (`id`),
  CONSTRAINT `elixir_resource_elixirInfo_id_2b6c9095_fk_elixir_elixirinfo_id` FOREIGN KEY (`elixirInfo_id`) REFERENCES `elixir_elixirinfo` (`id`),
  CONSTRAINT `elixir_resource_owner_id_47e470c2_fk_auth_user_id` FOREIGN KEY (`owner_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_resourcerequest`
--

DROP TABLE IF EXISTS `elixir_resourcerequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_resourcerequest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `requestId` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` longtext COLLATE utf8mb4_unicode_ci,
  `completed` tinyint(1) NOT NULL,
  `accepted` tinyint(1) NOT NULL,
  `completedBy_id` int DEFAULT NULL,
  `resource_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_resourcerequest_completedBy_id_60692f7a_fk_auth_user_id` (`completedBy_id`),
  KEY `elixir_resourcereque_resource_id_2e45ad16_fk_elixir_re` (`resource_id`),
  KEY `elixir_resourcerequest_user_id_c10d85f2_fk_auth_user_id` (`user_id`),
  CONSTRAINT `elixir_resourcereque_resource_id_2e45ad16_fk_elixir_re` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`),
  CONSTRAINT `elixir_resourcerequest_completedBy_id_60692f7a_fk_auth_user_id` FOREIGN KEY (`completedBy_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `elixir_resourcerequest_user_id_c10d85f2_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_searchquerylog`
--

DROP TABLE IF EXISTS `elixir_searchquerylog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_searchquerylog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_searchquerylog_terms`
--

DROP TABLE IF EXISTS `elixir_searchquerylog_terms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_searchquerylog_terms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `searchquerylog_id` int NOT NULL,
  `searchtermlog_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `elixir_searchquerylog_te_searchquerylog_id_search_988fcf21_uniq` (`searchquerylog_id`,`searchtermlog_id`),
  KEY `elixir_searchquerylo_searchtermlog_id_541752b6_fk_elixir_se` (`searchtermlog_id`),
  CONSTRAINT `elixir_searchquerylo_searchquerylog_id_1a4855e8_fk_elixir_se` FOREIGN KEY (`searchquerylog_id`) REFERENCES `elixir_searchquerylog` (`id`),
  CONSTRAINT `elixir_searchquerylo_searchtermlog_id_541752b6_fk_elixir_se` FOREIGN KEY (`searchtermlog_id`) REFERENCES `elixir_searchtermlog` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_searchtermlog`
--

DROP TABLE IF EXISTS `elixir_searchtermlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_searchtermlog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `term` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `elixir_searchtermlog_name_term_21220ca7_uniq` (`name`,`term`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_statsdata`
--

DROP TABLE IF EXISTS `elixir_statsdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_statsdata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime(6) NOT NULL,
  `data` longtext COLLATE utf8mb4_unicode_ci,
  `totalEntries` int NOT NULL,
  `creditAffiliationCount` int NOT NULL,
  `edamAnnotationsCount` int NOT NULL,
  `formatAnnotationsCount` int NOT NULL,
  `functionAnnotationsCount` int NOT NULL,
  `topicAnnotationsCount` int NOT NULL,
  `dataTypeAnnotationsCount` int NOT NULL,
  `nameAnnotationCount` int NOT NULL,
  `uniqueIDAnnotationCount` int NOT NULL,
  `topicAnnotationCount` int NOT NULL,
  `operatingSystemAnnotationCount` int NOT NULL,
  `codeAvailabilityAnnotationCount` int NOT NULL,
  `operationAnnotationCount` int NOT NULL,
  `descriptionAnnotationCount` int NOT NULL,
  `downloadsAnnotationCount` int NOT NULL,
  `dataFormatsAnnotationCount` int NOT NULL,
  `accessibilityAnnotationCount` int NOT NULL,
  `toolTypeAnnotationCount` int NOT NULL,
  `documentationAnnotationCount` int NOT NULL,
  `inputOutputAnnotationCount` int NOT NULL,
  `communityAnnotationCount` int NOT NULL,
  `contactAnnotationCount` int NOT NULL,
  `homepageAnnotationCount` int NOT NULL,
  `publicationAnnotationCount` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_tooltype`
--

DROP TABLE IF EXISTS `elixir_tooltype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_tooltype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_tooltype_resource_id_49d57bcb_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_tooltype_resource_id_49d57bcb_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_topic`
--

DROP TABLE IF EXISTS `elixir_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_topic` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uri` longtext COLLATE utf8mb4_unicode_ci,
  `term` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_topic_resource_id_38fa7a65_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_topic_resource_id_38fa7a65_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_uses`
--

DROP TABLE IF EXISTS `elixir_uses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_uses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext COLLATE utf8mb4_unicode_ci,
  `homepage` longtext COLLATE utf8mb4_unicode_ci,
  `version` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_uses_resource_id_205a45a2_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_uses_resource_id_205a45a2_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_version`
--

DROP TABLE IF EXISTS `elixir_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_version` (
  `id` int NOT NULL AUTO_INCREMENT,
  `version` longtext COLLATE utf8mb4_unicode_ci,
  `additionDate` datetime(6) NOT NULL,
  `resource_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_version_resource_id_3b3138c6_fk_elixir_resource_id` (`resource_id`),
  CONSTRAINT `elixir_version_resource_id_3b3138c6_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_workflow`
--

DROP TABLE IF EXISTS `elixir_workflow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_workflow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `biotoolsID` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `sourceURL` longtext COLLATE utf8mb4_unicode_ci,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_width` int NOT NULL,
  `image_height` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `elixir_workflowannotation`
--

DROP TABLE IF EXISTS `elixir_workflowannotation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elixir_workflowannotation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `startX` double NOT NULL,
  `startY` double NOT NULL,
  `endX` double NOT NULL,
  `endY` double NOT NULL,
  `title` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `edam_term` longtext COLLATE utf8mb4_unicode_ci,
  `edam_uri` longtext COLLATE utf8mb4_unicode_ci,
  `url` longtext COLLATE utf8mb4_unicode_ci,
  `workflow_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `elixir_workflowannot_workflow_id_6c26152a_fk_elixir_wo` (`workflow_id`),
  CONSTRAINT `elixir_workflowannot_workflow_id_6c26152a_fk_elixir_wo` FOREIGN KEY (`workflow_id`) REFERENCES `elixir_workflow` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `socialaccount_socialaccount`
--

DROP TABLE IF EXISTS `socialaccount_socialaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialaccount` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime(6) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `extra_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialaccount_provider_uid_fc810c6e_uniq` (`provider`,`uid`),
  KEY `socialaccount_socialaccount_user_id_8146e70c_fk_auth_user_id` (`user_id`),
  CONSTRAINT `socialaccount_socialaccount_user_id_8146e70c_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `socialaccount_socialapp`
--

DROP TABLE IF EXISTS `socialaccount_socialapp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialapp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `socialaccount_socialapp_sites`
--

DROP TABLE IF EXISTS `socialaccount_socialapp_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialapp_sites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `socialapp_id` int NOT NULL,
  `site_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialapp_sites_socialapp_id_site_id_71a9a768_uniq` (`socialapp_id`,`site_id`),
  KEY `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` (`site_id`),
  CONSTRAINT `socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc` FOREIGN KEY (`socialapp_id`) REFERENCES `socialaccount_socialapp` (`id`),
  CONSTRAINT `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` FOREIGN KEY (`site_id`) REFERENCES `django_site` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `socialaccount_socialtoken`
--

DROP TABLE IF EXISTS `socialaccount_socialtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialtoken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `token_secret` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `account_id` int NOT NULL,
  `app_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq` (`app_id`,`account_id`),
  KEY `socialaccount_social_account_id_951f210e_fk_socialacc` (`account_id`),
  CONSTRAINT `socialaccount_social_account_id_951f210e_fk_socialacc` FOREIGN KEY (`account_id`) REFERENCES `socialaccount_socialaccount` (`id`),
  CONSTRAINT `socialaccount_social_app_id_636a42d7_fk_socialacc` FOREIGN KEY (`app_id`) REFERENCES `socialaccount_socialapp` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-01 14:06:04
