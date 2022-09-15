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
-- Dumping data for table `account_emailaddress`
--

LOCK TABLES `account_emailaddress` WRITE;
/*!40000 ALTER TABLE `account_emailaddress` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `account_emailconfirmation`
--

LOCK TABLES `account_emailconfirmation` WRITE;
/*!40000 ALTER TABLE `account_emailconfirmation` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailconfirmation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add site',7,'add_site'),(26,'Can change site',7,'change_site'),(27,'Can delete site',7,'delete_site'),(28,'Can view site',7,'view_site'),(29,'Can add bio lib',8,'add_biolib'),(30,'Can change bio lib',8,'change_biolib'),(31,'Can delete bio lib',8,'delete_biolib'),(32,'Can view bio lib',8,'view_biolib'),(33,'Can add community',9,'add_community'),(34,'Can change community',9,'change_community'),(35,'Can delete community',9,'delete_community'),(36,'Can view community',9,'view_community'),(37,'Can add credit',10,'add_credit'),(38,'Can change credit',10,'change_credit'),(39,'Can delete credit',10,'delete_credit'),(40,'Can view credit',10,'view_credit'),(41,'Can add data',11,'add_data'),(42,'Can change data',11,'change_data'),(43,'Can delete data',11,'delete_data'),(44,'Can view data',11,'view_data'),(45,'Can add documentation',12,'add_documentation'),(46,'Can change documentation',12,'change_documentation'),(47,'Can delete documentation',12,'delete_documentation'),(48,'Can view documentation',12,'view_documentation'),(49,'Can add domain',13,'add_domain'),(50,'Can change domain',13,'change_domain'),(51,'Can delete domain',13,'delete_domain'),(52,'Can view domain',13,'view_domain'),(53,'Can add edit permission',14,'add_editpermission'),(54,'Can change edit permission',14,'change_editpermission'),(55,'Can delete edit permission',14,'delete_editpermission'),(56,'Can view edit permission',14,'view_editpermission'),(57,'Can add elixir info',15,'add_elixirinfo'),(58,'Can change elixir info',15,'change_elixirinfo'),(59,'Can delete elixir info',15,'delete_elixirinfo'),(60,'Can view elixir info',15,'view_elixirinfo'),(61,'Can add function',16,'add_function'),(62,'Can change function',16,'change_function'),(63,'Can delete function',16,'delete_function'),(64,'Can view function',16,'view_function'),(65,'Can add issue state',17,'add_issuestate'),(66,'Can change issue state',17,'change_issuestate'),(67,'Can delete issue state',17,'delete_issuestate'),(68,'Can view issue state',17,'view_issuestate'),(69,'Can add issue type',18,'add_issuetype'),(70,'Can change issue type',18,'change_issuetype'),(71,'Can delete issue type',18,'delete_issuetype'),(72,'Can view issue type',18,'view_issuetype'),(73,'Can add link',19,'add_link'),(74,'Can change link',19,'change_link'),(75,'Can delete link',19,'delete_link'),(76,'Can view link',19,'view_link'),(77,'Can add ontology',20,'add_ontology'),(78,'Can change ontology',20,'change_ontology'),(79,'Can delete ontology',20,'delete_ontology'),(80,'Can view ontology',20,'view_ontology'),(81,'Can add publication',21,'add_publication'),(82,'Can change publication',21,'change_publication'),(83,'Can delete publication',21,'delete_publication'),(84,'Can view publication',21,'view_publication'),(85,'Can add publication metadata',22,'add_publicationmetadata'),(86,'Can change publication metadata',22,'change_publicationmetadata'),(87,'Can delete publication metadata',22,'delete_publicationmetadata'),(88,'Can view publication metadata',22,'view_publicationmetadata'),(89,'Can add resource',23,'add_resource'),(90,'Can change resource',23,'change_resource'),(91,'Can delete resource',23,'delete_resource'),(92,'Can view resource',23,'view_resource'),(93,'Can add stats data',24,'add_statsdata'),(94,'Can change stats data',24,'change_statsdata'),(95,'Can delete stats data',24,'delete_statsdata'),(96,'Can view stats data',24,'view_statsdata'),(97,'Can add workflow',25,'add_workflow'),(98,'Can change workflow',25,'change_workflow'),(99,'Can delete workflow',25,'delete_workflow'),(100,'Can view workflow',25,'view_workflow'),(101,'Can add workflow annotation',26,'add_workflowannotation'),(102,'Can change workflow annotation',26,'change_workflowannotation'),(103,'Can delete workflow annotation',26,'delete_workflowannotation'),(104,'Can view workflow annotation',26,'view_workflowannotation'),(105,'Can add version',27,'add_version'),(106,'Can change version',27,'change_version'),(107,'Can delete version',27,'delete_version'),(108,'Can view version',27,'view_version'),(109,'Can add uses',28,'add_uses'),(110,'Can change uses',28,'change_uses'),(111,'Can delete uses',28,'delete_uses'),(112,'Can view uses',28,'view_uses'),(113,'Can add topic',29,'add_topic'),(114,'Can change topic',29,'change_topic'),(115,'Can delete topic',29,'delete_topic'),(116,'Can view topic',29,'view_topic'),(117,'Can add tool type',30,'add_tooltype'),(118,'Can change tool type',30,'change_tooltype'),(119,'Can delete tool type',30,'delete_tooltype'),(120,'Can view tool type',30,'view_tooltype'),(121,'Can add search term log',31,'add_searchtermlog'),(122,'Can change search term log',31,'change_searchtermlog'),(123,'Can delete search term log',31,'delete_searchtermlog'),(124,'Can view search term log',31,'view_searchtermlog'),(125,'Can add search query log',32,'add_searchquerylog'),(126,'Can change search query log',32,'change_searchquerylog'),(127,'Can delete search query log',32,'delete_searchquerylog'),(128,'Can view search query log',32,'view_searchquerylog'),(129,'Can add resource request',33,'add_resourcerequest'),(130,'Can change resource request',33,'change_resourcerequest'),(131,'Can delete resource request',33,'delete_resourcerequest'),(132,'Can view resource request',33,'view_resourcerequest'),(133,'Can add relation',34,'add_relation'),(134,'Can change relation',34,'change_relation'),(135,'Can delete relation',34,'delete_relation'),(136,'Can view relation',34,'view_relation'),(137,'Can add publication type',35,'add_publicationtype'),(138,'Can change publication type',35,'change_publicationtype'),(139,'Can delete publication type',35,'delete_publicationtype'),(140,'Can view publication type',35,'view_publicationtype'),(141,'Can add publication author',36,'add_publicationauthor'),(142,'Can change publication author',36,'change_publicationauthor'),(143,'Can delete publication author',36,'delete_publicationauthor'),(144,'Can view publication author',36,'view_publicationauthor'),(145,'Can add output',37,'add_output'),(146,'Can change output',37,'change_output'),(147,'Can delete output',37,'delete_output'),(148,'Can view output',37,'view_output'),(149,'Can add other id',38,'add_otherid'),(150,'Can change other id',38,'change_otherid'),(151,'Can delete other id',38,'delete_otherid'),(152,'Can view other id',38,'view_otherid'),(153,'Can add operation',39,'add_operation'),(154,'Can change operation',39,'change_operation'),(155,'Can delete operation',39,'delete_operation'),(156,'Can view operation',39,'view_operation'),(157,'Can add operating system',40,'add_operatingsystem'),(158,'Can change operating system',40,'change_operatingsystem'),(159,'Can delete operating system',40,'delete_operatingsystem'),(160,'Can view operating system',40,'view_operatingsystem'),(161,'Can add link type',41,'add_linktype'),(162,'Can change link type',41,'change_linktype'),(163,'Can delete link type',41,'delete_linktype'),(164,'Can view link type',41,'view_linktype'),(165,'Can add language',42,'add_language'),(166,'Can change language',42,'change_language'),(167,'Can delete language',42,'delete_language'),(168,'Can view language',42,'view_language'),(169,'Can add issue',43,'add_issue'),(170,'Can change issue',43,'change_issue'),(171,'Can delete issue',43,'delete_issue'),(172,'Can view issue',43,'view_issue'),(173,'Can add input',44,'add_input'),(174,'Can change input',44,'change_input'),(175,'Can delete input',44,'delete_input'),(176,'Can view input',44,'view_input'),(177,'Can add format',45,'add_format'),(178,'Can change format',45,'change_format'),(179,'Can delete format',45,'delete_format'),(180,'Can view format',45,'view_format'),(181,'Can add elixir platform',46,'add_elixirplatform'),(182,'Can change elixir platform',46,'change_elixirplatform'),(183,'Can delete elixir platform',46,'delete_elixirplatform'),(184,'Can view elixir platform',46,'view_elixirplatform'),(185,'Can add elixir node',47,'add_elixirnode'),(186,'Can change elixir node',47,'change_elixirnode'),(187,'Can delete elixir node',47,'delete_elixirnode'),(188,'Can view elixir node',47,'view_elixirnode'),(189,'Can add elixir community',48,'add_elixircommunity'),(190,'Can change elixir community',48,'change_elixircommunity'),(191,'Can delete elixir community',48,'delete_elixircommunity'),(192,'Can view elixir community',48,'view_elixircommunity'),(193,'Can add edit permission author',49,'add_editpermissionauthor'),(194,'Can change edit permission author',49,'change_editpermissionauthor'),(195,'Can delete edit permission author',49,'delete_editpermissionauthor'),(196,'Can view edit permission author',49,'view_editpermissionauthor'),(197,'Can add download',50,'add_download'),(198,'Can change download',50,'change_download'),(199,'Can delete download',50,'delete_download'),(200,'Can view download',50,'view_download'),(201,'Can add domain resource',51,'add_domainresource'),(202,'Can change domain resource',51,'change_domainresource'),(203,'Can delete domain resource',51,'delete_domainresource'),(204,'Can view domain resource',51,'view_domainresource'),(205,'Can add documentation type',52,'add_documentationtype'),(206,'Can change documentation type',52,'change_documentationtype'),(207,'Can delete documentation type',52,'delete_documentationtype'),(208,'Can view documentation type',52,'view_documentationtype'),(209,'Can add credit type role',53,'add_credittyperole'),(210,'Can change credit type role',53,'change_credittyperole'),(211,'Can delete credit type role',53,'delete_credittyperole'),(212,'Can view credit type role',53,'view_credittyperole'),(213,'Can add contact',54,'add_contact'),(214,'Can change contact',54,'change_contact'),(215,'Can delete contact',54,'delete_contact'),(216,'Can view contact',54,'view_contact'),(217,'Can add collection id',55,'add_collectionid'),(218,'Can change collection id',55,'change_collectionid'),(219,'Can delete collection id',55,'delete_collectionid'),(220,'Can view collection id',55,'view_collectionid'),(221,'Can add accessibility',56,'add_accessibility'),(222,'Can change accessibility',56,'change_accessibility'),(223,'Can delete accessibility',56,'delete_accessibility'),(224,'Can view accessibility',56,'view_accessibility'),(225,'Can add domain tag',57,'add_domaintag'),(226,'Can change domain tag',57,'change_domaintag'),(227,'Can delete domain tag',57,'delete_domaintag'),(228,'Can view domain tag',57,'view_domaintag'),(229,'Can add domain collection',58,'add_domaincollection'),(230,'Can change domain collection',58,'change_domaincollection'),(231,'Can delete domain collection',58,'delete_domaincollection'),(232,'Can view domain collection',58,'view_domaincollection'),(233,'Can add Token',59,'add_token'),(234,'Can change Token',59,'change_token'),(235,'Can delete Token',59,'delete_token'),(236,'Can view Token',59,'view_token'),(237,'Can add token',60,'add_tokenproxy'),(238,'Can change token',60,'change_tokenproxy'),(239,'Can delete token',60,'delete_tokenproxy'),(240,'Can view token',60,'view_tokenproxy'),(241,'Can add email address',61,'add_emailaddress'),(242,'Can change email address',61,'change_emailaddress'),(243,'Can delete email address',61,'delete_emailaddress'),(244,'Can view email address',61,'view_emailaddress'),(245,'Can add email confirmation',62,'add_emailconfirmation'),(246,'Can change email confirmation',62,'change_emailconfirmation'),(247,'Can delete email confirmation',62,'delete_emailconfirmation'),(248,'Can view email confirmation',62,'view_emailconfirmation'),(249,'Can add social account',63,'add_socialaccount'),(250,'Can change social account',63,'change_socialaccount'),(251,'Can delete social account',63,'delete_socialaccount'),(252,'Can view social account',63,'view_socialaccount'),(253,'Can add social application',64,'add_socialapp'),(254,'Can change social application',64,'change_socialapp'),(255,'Can delete social application',64,'delete_socialapp'),(256,'Can view social application',64,'view_socialapp'),(257,'Can add social application token',65,'add_socialtoken'),(258,'Can change social application token',65,'change_socialtoken'),(259,'Can delete social application token',65,'delete_socialtoken'),(260,'Can view social application token',65,'view_socialtoken'),(261,'Can add completed task',66,'add_completedtask'),(262,'Can change completed task',66,'change_completedtask'),(263,'Can delete completed task',66,'delete_completedtask'),(264,'Can view completed task',66,'view_completedtask'),(265,'Can add task',67,'add_task'),(266,'Can change task',67,'change_task'),(267,'Can delete task',67,'delete_task'),(268,'Can view task',67,'view_task');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `background_task`
--

LOCK TABLES `background_task` WRITE;
/*!40000 ALTER TABLE `background_task` DISABLE KEYS */;
/*!40000 ALTER TABLE `background_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `background_task_completedtask`
--

LOCK TABLES `background_task_completedtask` WRITE;
/*!40000 ALTER TABLE `background_task_completedtask` DISABLE KEYS */;
/*!40000 ALTER TABLE `background_task_completedtask` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (61,'account','emailaddress'),(62,'account','emailconfirmation'),(1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(59,'authtoken','token'),(60,'authtoken','tokenproxy'),(66,'background_task','completedtask'),(67,'background_task','task'),(5,'contenttypes','contenttype'),(56,'elixir','accessibility'),(8,'elixir','biolib'),(55,'elixir','collectionid'),(9,'elixir','community'),(54,'elixir','contact'),(10,'elixir','credit'),(53,'elixir','credittyperole'),(11,'elixir','data'),(12,'elixir','documentation'),(52,'elixir','documentationtype'),(13,'elixir','domain'),(58,'elixir','domaincollection'),(51,'elixir','domainresource'),(57,'elixir','domaintag'),(50,'elixir','download'),(14,'elixir','editpermission'),(49,'elixir','editpermissionauthor'),(48,'elixir','elixircommunity'),(15,'elixir','elixirinfo'),(47,'elixir','elixirnode'),(46,'elixir','elixirplatform'),(45,'elixir','format'),(16,'elixir','function'),(44,'elixir','input'),(43,'elixir','issue'),(17,'elixir','issuestate'),(18,'elixir','issuetype'),(42,'elixir','language'),(19,'elixir','link'),(41,'elixir','linktype'),(20,'elixir','ontology'),(40,'elixir','operatingsystem'),(39,'elixir','operation'),(38,'elixir','otherid'),(37,'elixir','output'),(21,'elixir','publication'),(36,'elixir','publicationauthor'),(22,'elixir','publicationmetadata'),(35,'elixir','publicationtype'),(34,'elixir','relation'),(23,'elixir','resource'),(33,'elixir','resourcerequest'),(32,'elixir','searchquerylog'),(31,'elixir','searchtermlog'),(24,'elixir','statsdata'),(30,'elixir','tooltype'),(29,'elixir','topic'),(28,'elixir','uses'),(27,'elixir','version'),(25,'elixir','workflow'),(26,'elixir','workflowannotation'),(6,'sessions','session'),(7,'sites','site'),(63,'socialaccount','socialaccount'),(64,'socialaccount','socialapp'),(65,'socialaccount','socialtoken');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2021-12-01 11:10:59.007677'),(2,'auth','0001_initial','2021-12-01 11:10:59.242642'),(3,'account','0001_initial','2021-12-01 11:10:59.807102'),(4,'account','0002_email_max_length','2021-12-01 11:10:59.956595'),(5,'admin','0001_initial','2021-12-01 11:11:00.002550'),(6,'admin','0002_logentry_remove_auto_add','2021-12-01 11:11:00.147723'),(7,'admin','0003_logentry_add_action_flag_choices','2021-12-01 11:11:00.159188'),(8,'contenttypes','0002_remove_content_type_name','2021-12-01 11:11:00.269952'),(9,'auth','0002_alter_permission_name_max_length','2021-12-01 11:11:00.383228'),(10,'auth','0003_alter_user_email_max_length','2021-12-01 11:11:00.415074'),(11,'auth','0004_alter_user_username_opts','2021-12-01 11:11:00.429397'),(12,'auth','0005_alter_user_last_login_null','2021-12-01 11:11:00.493063'),(13,'auth','0006_require_contenttypes_0002','2021-12-01 11:11:00.499107'),(14,'auth','0007_alter_validators_add_error_messages','2021-12-01 11:11:00.511552'),(15,'auth','0008_alter_user_username_max_length','2021-12-01 11:11:00.585554'),(16,'auth','0009_alter_user_last_name_max_length','2021-12-01 11:11:00.662187'),(17,'auth','0010_alter_group_name_max_length','2021-12-01 11:11:00.689017'),(18,'auth','0011_update_proxy_permissions','2021-12-01 11:11:00.707098'),(19,'auth','0012_alter_user_first_name_max_length','2021-12-01 11:11:00.781263'),(20,'authtoken','0001_initial','2021-12-01 11:11:00.828031'),(21,'authtoken','0002_auto_20160226_1747','2021-12-01 11:11:00.996814'),(22,'authtoken','0003_tokenproxy','2021-12-01 11:11:01.003633'),(23,'background_task','0001_initial','2021-12-01 11:11:01.114447'),(24,'background_task','0002_auto_20170927_1109','2021-12-01 11:11:01.727509'),(25,'elixir','0001_initial','2021-12-01 11:11:04.419438'),(26,'elixir','0002_auto_20210510_1435','2021-12-01 11:11:08.107685'),(27,'sessions','0001_initial','2021-12-01 11:11:08.279994'),(28,'sites','0001_initial','2021-12-01 11:11:08.343257'),(29,'sites','0002_alter_domain_unique','2021-12-01 11:11:08.377915'),(30,'socialaccount','0001_initial','2021-12-01 11:11:08.653437'),(31,'socialaccount','0002_token_max_lengths','2021-12-01 11:11:09.159194'),(32,'socialaccount','0003_extra_data_default_dict','2021-12-01 11:11:09.180398');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `django_site`
--

LOCK TABLES `django_site` WRITE;
/*!40000 ALTER TABLE `django_site` DISABLE KEYS */;
INSERT INTO `django_site` VALUES (1,'example.com','example.com');
/*!40000 ALTER TABLE `django_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_accessibility`
--

LOCK TABLES `elixir_accessibility` WRITE;
/*!40000 ALTER TABLE `elixir_accessibility` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_accessibility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_biolib`
--

LOCK TABLES `elixir_biolib` WRITE;
/*!40000 ALTER TABLE `elixir_biolib` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_biolib` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_collectionid`
--

LOCK TABLES `elixir_collectionid` WRITE;
/*!40000 ALTER TABLE `elixir_collectionid` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_collectionid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_community`
--

LOCK TABLES `elixir_community` WRITE;
/*!40000 ALTER TABLE `elixir_community` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_community` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_contact`
--

LOCK TABLES `elixir_contact` WRITE;
/*!40000 ALTER TABLE `elixir_contact` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_credit`
--

LOCK TABLES `elixir_credit` WRITE;
/*!40000 ALTER TABLE `elixir_credit` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_credit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_credittyperole`
--

LOCK TABLES `elixir_credittyperole` WRITE;
/*!40000 ALTER TABLE `elixir_credittyperole` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_credittyperole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_data`
--

LOCK TABLES `elixir_data` WRITE;
/*!40000 ALTER TABLE `elixir_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_documentation`
--

LOCK TABLES `elixir_documentation` WRITE;
/*!40000 ALTER TABLE `elixir_documentation` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_documentation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_documentationtype`
--

LOCK TABLES `elixir_documentationtype` WRITE;
/*!40000 ALTER TABLE `elixir_documentationtype` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_documentationtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_domain`
--

LOCK TABLES `elixir_domain` WRITE;
/*!40000 ALTER TABLE `elixir_domain` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_domain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_domaincollection`
--

LOCK TABLES `elixir_domaincollection` WRITE;
/*!40000 ALTER TABLE `elixir_domaincollection` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_domaincollection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_domainresource`
--

LOCK TABLES `elixir_domainresource` WRITE;
/*!40000 ALTER TABLE `elixir_domainresource` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_domainresource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_domaintag`
--

LOCK TABLES `elixir_domaintag` WRITE;
/*!40000 ALTER TABLE `elixir_domaintag` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_domaintag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_download`
--

LOCK TABLES `elixir_download` WRITE;
/*!40000 ALTER TABLE `elixir_download` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_download` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_editpermission`
--

LOCK TABLES `elixir_editpermission` WRITE;
/*!40000 ALTER TABLE `elixir_editpermission` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_editpermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_editpermissionauthor`
--

LOCK TABLES `elixir_editpermissionauthor` WRITE;
/*!40000 ALTER TABLE `elixir_editpermissionauthor` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_editpermissionauthor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_editpermissionauthor_editPermissions`
--

LOCK TABLES `elixir_editpermissionauthor_editPermissions` WRITE;
/*!40000 ALTER TABLE `elixir_editpermissionauthor_editPermissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_editpermissionauthor_editPermissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_elixircommunity`
--

LOCK TABLES `elixir_elixircommunity` WRITE;
/*!40000 ALTER TABLE `elixir_elixircommunity` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_elixircommunity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_elixirinfo`
--

LOCK TABLES `elixir_elixirinfo` WRITE;
/*!40000 ALTER TABLE `elixir_elixirinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_elixirinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_elixirnode`
--

LOCK TABLES `elixir_elixirnode` WRITE;
/*!40000 ALTER TABLE `elixir_elixirnode` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_elixirnode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_elixirplatform`
--

LOCK TABLES `elixir_elixirplatform` WRITE;
/*!40000 ALTER TABLE `elixir_elixirplatform` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_elixirplatform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_format`
--

LOCK TABLES `elixir_format` WRITE;
/*!40000 ALTER TABLE `elixir_format` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_format` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_function`
--

LOCK TABLES `elixir_function` WRITE;
/*!40000 ALTER TABLE `elixir_function` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_function` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_input`
--

LOCK TABLES `elixir_input` WRITE;
/*!40000 ALTER TABLE `elixir_input` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_input` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_issue`
--

LOCK TABLES `elixir_issue` WRITE;
/*!40000 ALTER TABLE `elixir_issue` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_issue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_issuestate`
--

LOCK TABLES `elixir_issuestate` WRITE;
/*!40000 ALTER TABLE `elixir_issuestate` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_issuestate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_issuetype`
--

LOCK TABLES `elixir_issuetype` WRITE;
/*!40000 ALTER TABLE `elixir_issuetype` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_issuetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_language`
--

LOCK TABLES `elixir_language` WRITE;
/*!40000 ALTER TABLE `elixir_language` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_link`
--

LOCK TABLES `elixir_link` WRITE;
/*!40000 ALTER TABLE `elixir_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_linktype`
--

LOCK TABLES `elixir_linktype` WRITE;
/*!40000 ALTER TABLE `elixir_linktype` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_linktype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_ontology`
--

LOCK TABLES `elixir_ontology` WRITE;
/*!40000 ALTER TABLE `elixir_ontology` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_ontology` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_operatingsystem`
--

LOCK TABLES `elixir_operatingsystem` WRITE;
/*!40000 ALTER TABLE `elixir_operatingsystem` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_operatingsystem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_operation`
--

LOCK TABLES `elixir_operation` WRITE;
/*!40000 ALTER TABLE `elixir_operation` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_operation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_otherid`
--

LOCK TABLES `elixir_otherid` WRITE;
/*!40000 ALTER TABLE `elixir_otherid` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_otherid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_output`
--

LOCK TABLES `elixir_output` WRITE;
/*!40000 ALTER TABLE `elixir_output` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_output` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_publication`
--

LOCK TABLES `elixir_publication` WRITE;
/*!40000 ALTER TABLE `elixir_publication` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_publication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_publicationauthor`
--

LOCK TABLES `elixir_publicationauthor` WRITE;
/*!40000 ALTER TABLE `elixir_publicationauthor` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_publicationauthor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_publicationmetadata`
--

LOCK TABLES `elixir_publicationmetadata` WRITE;
/*!40000 ALTER TABLE `elixir_publicationmetadata` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_publicationmetadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_publicationtype`
--

LOCK TABLES `elixir_publicationtype` WRITE;
/*!40000 ALTER TABLE `elixir_publicationtype` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_publicationtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_relation`
--

LOCK TABLES `elixir_relation` WRITE;
/*!40000 ALTER TABLE `elixir_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_resource`
--

LOCK TABLES `elixir_resource` WRITE;
/*!40000 ALTER TABLE `elixir_resource` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_resource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_resourcerequest`
--

LOCK TABLES `elixir_resourcerequest` WRITE;
/*!40000 ALTER TABLE `elixir_resourcerequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_resourcerequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_searchquerylog`
--

LOCK TABLES `elixir_searchquerylog` WRITE;
/*!40000 ALTER TABLE `elixir_searchquerylog` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_searchquerylog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_searchquerylog_terms`
--

LOCK TABLES `elixir_searchquerylog_terms` WRITE;
/*!40000 ALTER TABLE `elixir_searchquerylog_terms` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_searchquerylog_terms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_searchtermlog`
--

LOCK TABLES `elixir_searchtermlog` WRITE;
/*!40000 ALTER TABLE `elixir_searchtermlog` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_searchtermlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_statsdata`
--

LOCK TABLES `elixir_statsdata` WRITE;
/*!40000 ALTER TABLE `elixir_statsdata` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_statsdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_tooltype`
--

LOCK TABLES `elixir_tooltype` WRITE;
/*!40000 ALTER TABLE `elixir_tooltype` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_tooltype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_topic`
--

LOCK TABLES `elixir_topic` WRITE;
/*!40000 ALTER TABLE `elixir_topic` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_uses`
--

LOCK TABLES `elixir_uses` WRITE;
/*!40000 ALTER TABLE `elixir_uses` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_uses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_version`
--

LOCK TABLES `elixir_version` WRITE;
/*!40000 ALTER TABLE `elixir_version` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_workflow`
--

LOCK TABLES `elixir_workflow` WRITE;
/*!40000 ALTER TABLE `elixir_workflow` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_workflow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `elixir_workflowannotation`
--

LOCK TABLES `elixir_workflowannotation` WRITE;
/*!40000 ALTER TABLE `elixir_workflowannotation` DISABLE KEYS */;
/*!40000 ALTER TABLE `elixir_workflowannotation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `socialaccount_socialaccount`
--

LOCK TABLES `socialaccount_socialaccount` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `socialaccount_socialapp`
--

LOCK TABLES `socialaccount_socialapp` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `socialaccount_socialapp_sites`
--

LOCK TABLES `socialaccount_socialapp_sites` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `socialaccount_socialtoken`
--

LOCK TABLES `socialaccount_socialtoken` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialtoken` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-01 14:07:55
