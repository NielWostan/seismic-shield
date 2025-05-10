/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table AFFECTED_COUNTY
# ------------------------------------------------------------
USE `cs4354.project`;

DROP TABLE IF EXISTS `AFFECTED_COUNTY`;

CREATE TABLE `AFFECTED_COUNTY` (
  `area_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `population` int NOT NULL,
  `damaged_infrastructure` text,
  PRIMARY KEY (`area_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `AFFECTED_COUNTY` WRITE;
/*!40000 ALTER TABLE `AFFECTED_COUNTY` DISABLE KEYS */;

INSERT INTO `AFFECTED_COUNTY` (`area_id`, `name`, `population`, `damaged_infrastructure`)
VALUES
	(1,'Travis County',1300000,'Power outages, road cracks, hospital damage'),
	(2,'Harrison County',68000,'Damaged bridges, collapsed school buildings'),
	(3,'Bexar County',2000000,'Flooded highways, power grid failure, damaged homes'),
	(4,'El Paso County',850000,'Cracked roads, disrupted water supply, minor structural damage'),
	(5,'Tarrant County',2100000,'Collapsed overpass, school evacuations, hospital strain'),
	(6,'Cameron County',420000,'Damaged levees, flooded neighborhoods, broken sewage lines'),
	(7,'Jefferson County',250000,'Industrial zone fire, pipeline rupture, displaced residents'),
	(8,'Hidalgo County',870000,'Widespread power outages, school closures, bridge collapse'),
	(9,'Nueces County',360000,'Damaged port infrastructure, communication blackout'),
	(10,'Williamson County',640000,'Highway damage, shopping centers collapsed, emergency shelter overflow');

/*!40000 ALTER TABLE `AFFECTED_COUNTY` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table EARTHQUAKE
# ------------------------------------------------------------

DROP TABLE IF EXISTS `EARTHQUAKE`;

CREATE TABLE `EARTHQUAKE` (
  `earthquake_id` int NOT NULL AUTO_INCREMENT,
  `magnitude` decimal(3,1) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `area_id` int DEFAULT NULL,
  PRIMARY KEY (`earthquake_id`),
  KEY `fk_area` (`area_id`),
  CONSTRAINT `fk_area` FOREIGN KEY (`area_id`) REFERENCES `affected_county` (`area_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `EARTHQUAKE` WRITE;
/*!40000 ALTER TABLE `EARTHQUAKE` DISABLE KEYS */;

INSERT INTO `EARTHQUAKE` (`earthquake_id`, `magnitude`, `date`, `time`, `latitude`, `longitude`, `area_id`)
VALUES
	(1,6.5,'2024-03-18','14:22:00',30.267200,-97.743100,1),
	(2,5.8,'2024-04-02','09:17:00',32.500700,-94.751500,2),
	(3,7.1,'2024-05-01','23:03:00',29.424100,-98.493600,3),
	(4,6.3,'2024-05-05','04:15:00',31.761900,-106.485000,4),
	(5,6.9,'2024-05-07','11:48:00',32.755500,-97.330800,5);

/*!40000 ALTER TABLE `EARTHQUAKE` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table PERSON
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PERSON`;

CREATE TABLE `PERSON` (
  `ssn` char(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text,
  PRIMARY KEY (`ssn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `PERSON` WRITE;
/*!40000 ALTER TABLE `PERSON` DISABLE KEYS */;

INSERT INTO `PERSON` (`ssn`, `name`, `address`)
VALUES
	('P2001','Maya Lopez','21 Hilltop Rd, Travis County'),
	('P2002','Eli Turner','89 Riverwalk Blvd, Harrison County'),
	('P2003','Chloe Kim','330 Forest Ave, Bexar County'),
	('P2004','Daniel Roy','12 Mountain Pass, El Paso County'),
	('P2005','Zara Patel','801 Gulf Rd, Tarrant County'),
	('P2006','Jaxon Lee','405 Island Ln, Cameron County'),
	('P2007','Nina Brooks','120 Coast Dr, Jefferson County'),
	('P2008','Owen Ford','230 Palm St, Hidalgo County'),
	('P2009','Lily Zhang','92 Basin Way, Nueces County'),
	('P2010','Micah Evans','134 Quarry Blvd, Williamson County'),
	('P2011','Talia Smith','320 Ocean Rd, Travis County'),
	('P2012','Jonas Reed','101 Desert Path, Harrison County'),
	('P2013','Isla Rivera','77 Beacon Hill, Bexar County'),
	('P2014','Caleb Wu','9 River Bend, El Paso County'),
	('P2015','Riley Adams','58 Timber Trail, Tarrant County'),
	('P2016','Leah Khan','411 East End Ave, Cameron County'),
	('P2017','Aaron Mehta','175 Western Dr, Jefferson County'),
	('P2018','Sage Monroe','260 Grandview Rd, Hidalgo County'),
	('P2019','Diego Morales','15 Seaside Ct, Nueces County'),
	('P2020','Holly Greene','56 Country Club Ln, Williamson County'),
	('P3001','Liam Rhodes','104 Trail Rd, Travis County'),
	('P3002','Ava Singh','209 Sunset Blvd, Jefferson County'),
	('P3003','Miles Chen','88 Harbor Dr, Cameron County'),
	('P3004','Zoe Fisher','42 Birch Ave, El Paso County'),
	('P3005','Lucas Park','501 Elm Rd, Tarrant County'),
	('P3006','Mila Bennett','765 Forest Way, Nueces County'),
	('P3007','Caleb Diaz','91 Whispering Pines, Bexar County'),
	('P3008','Naomi Brooks','37 Summit Dr, Travis County'),
	('P3009','Eli Kim','15 Highview St, Williamson County'),
	('P3010','Harper Patel','280 River Bend, Harrison County'),
	('P3011','Owen Hayes','81 Prairie Rd, Travis County'),
	('P3012','Nova Reed','920 Bayview Ct, Tarrant County'),
	('P3013','Julian Wu','331 Ridgecrest Blvd, El Paso County'),
	('P3014','Isla Moore','14 Pine Hollow, Bexar County'),
	('P3015','Jude Allen','222 Vista Ln, Hidalgo County'),
	('P3016','Ella Gomez','32 Sunset Loop, Cameron County'),
	('P3017','Noah Cruz','18 Meadow Path, Nueces County'),
	('P3018','Stella Khan','610 Beacon St, Jefferson County'),
	('P3019','Grayson Ford','305 Creekside Way, Travis County'),
	('P3020','Arianna Blake','511 South Hill, Williamson County'),
	('P3021','Xavier Wells','13 Overlook Dr, Bexar County'),
	('P3022','Luna Young','96 Bluebonnet Rd, Hidalgo County'),
	('P3023','Levi Hall','760 Quail Run, El Paso County'),
	('P3024','Aurora King','24 Chestnut Pl, Harrison County'),
	('P3025','Theo Ramos','412 Broadview Ln, Tarrant County'),
	('P3026','Ivy Flores','175 Garden Rd, Jefferson County'),
	('P3027','Aria Jordan','708 Timber Trail, Williamson County'),
	('P3028','Ezekiel Scott','47 Ridgeway Ave, Cameron County'),
	('P3029','Sadie Nguyen','850 Oak Hollow, Nueces County'),
	('P3030','Mateo Brown','990 Northwood Dr, Hidalgo County'),
	('V1001','Lena Kim','1010 Elm St, Springfield'),
	('V1002','Jared Nolan','22 Maple Ave, Rivertown'),
	('V1003','Priya Desai','330 Pine Dr, Lakeside'),
	('V1004','Ethan Blake','14 Oak Blvd, Clearview'),
	('V1005','Amara Jones','509 Birch Ln, Stonehill'),
	('V1006','Carlos Vela','78 Cedar St, Hillview'),
	('V1007','Sofia Chen','321 Poplar Ave, Brookville'),
	('V1008','Malik Ward','15 Spruce Ct, Greenfield'),
	('V1009','Aisha Ali','289 Cypress Rd, Meadowbrook'),
	('V1010','Noah Schmidt','410 Willow Pkwy, Riverbend'),
	('V1011','Emily Stone','742 Redwood Way, Clearview'),
	('V1012','Jay Patel','88 Fir Ave, Lakeside'),
	('V1013','Grace Miller','920 Sequoia Blvd, Hillview'),
	('V1014','Isaiah Reed','135 Hickory St, Brookville'),
	('V1015','Yuna Park','311 Pine Hollow, Greenfield'),
	('V1016','Omar Hussein','675 Beech Dr, Meadowbrook'),
	('V1017','Natalie Cruz','840 Aspen St, Riverbend'),
	('V1018','Leo Tanaka','14 Magnolia Ln, Rivertown'),
	('V1019','Daisy Carter','17 Juniper Pl, Springfield'),
	('V1020','Benjamin Lin','501 Sycamore Ct, Stonehill');

/*!40000 ALTER TABLE `PERSON` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table RELIEF_CENTER
# ------------------------------------------------------------

DROP TABLE IF EXISTS `RELIEF_CENTER`;

CREATE TABLE `RELIEF_CENTER` (
  `center_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  PRIMARY KEY (`center_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `RELIEF_CENTER` WRITE;
/*!40000 ALTER TABLE `RELIEF_CENTER` DISABLE KEYS */;

INSERT INTO `RELIEF_CENTER` (`center_id`, `name`, `address`)
VALUES
	(1,'Hope Relief Center','123 Main St, Springfield'),
	(2,'Unity Support Hub','456 Oak Ave, Rivertown'),
	(3,'Sunrise Aid Station','789 Pine Rd, Lakeside'),
	(4,'Helping Hands Base','101 Maple Blvd, Hillview'),
	(5,'Safe Haven Center','202 Elm St, Greenfield'),
	(6,'New Dawn Relief Point','303 Cedar Lane, Brookville'),
	(7,'Compassion Care Center','404 Birch Street, Clearview'),
	(8,'Resilience Shelter','505 Walnut Drive, Stonehill'),
	(9,'Harbor of Hope','606 Aspen Court, Meadowbrook'),
	(10,'Lifeline Outreach Post','707 Chestnut Ave, Riverbend');

/*!40000 ALTER TABLE `RELIEF_CENTER` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table SUPPLIES
# ------------------------------------------------------------

DROP TABLE IF EXISTS `SUPPLIES`;

CREATE TABLE `SUPPLIES` (
  `supply_id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `quantity` int NOT NULL,
  `center_id` int DEFAULT NULL,
  PRIMARY KEY (`supply_id`),
  KEY `center_id` (`center_id`),
  CONSTRAINT `supplies_ibfk_1` FOREIGN KEY (`center_id`) REFERENCES `RELIEF_CENTER` (`center_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `SUPPLIES` WRITE;
/*!40000 ALTER TABLE `SUPPLIES` DISABLE KEYS */;

INSERT INTO `SUPPLIES` (`supply_id`, `type`, `quantity`, `center_id`)
VALUES
	(1,'Water Bottles',500,1),
	(2,'Canned Food',350,1),
	(3,'Blankets',120,2),
	(4,'Medical Kits',75,2),
	(5,'Diapers',200,3),
	(6,'Tents',30,3),
	(7,'Flashlights',100,4),
	(8,'Batteries',400,4),
	(9,'Toiletries',150,5),
	(10,'Baby Formula',90,5),
	(11,'Sanitary Pads',300,6),
	(12,'Masks',1000,6),
	(13,'Gloves',750,7),
	(14,'Sleeping Bags',60,7),
	(15,'Pet Food',180,8);

/*!40000 ALTER TABLE `SUPPLIES` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table VICTIM
# ------------------------------------------------------------

DROP TABLE IF EXISTS `VICTIM`;

CREATE TABLE `VICTIM` (
  `ssn` char(11) NOT NULL,
  `area_id` int DEFAULT NULL,
  `condition_text` text,
  `treatment` text,
  PRIMARY KEY (`ssn`),
  KEY `area_id` (`area_id`),
  CONSTRAINT `victim_ibfk_1` FOREIGN KEY (`ssn`) REFERENCES `PERSON` (`ssn`),
  CONSTRAINT `victim_ibfk_2` FOREIGN KEY (`area_id`) REFERENCES `AFFECTED_COUNTY` (`area_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `VICTIM` WRITE;
/*!40000 ALTER TABLE `VICTIM` DISABLE KEYS */;

INSERT INTO `VICTIM` (`ssn`, `area_id`, `condition_text`, `treatment`)
VALUES
	('P2001',1,'Fractured leg','Surgery and cast'),
	('P2002',2,'Smoke inhalation','Oxygen therapy'),
	('P2003',3,'Head trauma','ICU monitoring'),
	('P2004',4,'Dehydration','IV fluids'),
	('P2005',5,'Broken ribs','Pain management and rest'),
	('P2006',6,'Minor burns','Topical ointment'),
	('P2007',7,'Crushed hand','Emergency surgery'),
	('P2008',8,'Lacerations','Stitches and bandaging'),
	('P2009',9,'Severe bruising','Observation and pain relief'),
	('P2010',10,'Concussion','Neurological assessment'),
	('P2011',1,'Sprained ankle','Crutches and rehab'),
	('P2012',2,'Shock','Fluids and warmth'),
	('P2013',3,'Severe anxiety','Counseling and meds'),
	('P2014',4,'Asthma attack','Inhaler and steroids'),
	('P2015',5,'Dislocated shoulder','Reduction and sling'),
	('P2016',6,'Back injury','X-ray and rest'),
	('P2017',7,'Eye trauma','Ophthalmology referral'),
	('P2018',8,'Cuts and abrasions','Cleaning and dressing'),
	('P2019',9,'Seizure','Anti-seizure meds'),
	('P2020',10,'High blood pressure','Monitoring and meds'),
	('P3001',1,'Broken arm','Casting and physical therapy'),
	('P3002',7,'Severe burns','Surgery and grafts'),
	('P3003',6,'Sprained knee','Basic pain management'),
	('P3004',4,'Chest pain','Monitoring and cardiology consult'),
	('P3005',5,'Fractured hip','Surgery and long-term rehab'),
	('P3006',9,'Heat exhaustion','IV fluids and rest'),
	('P3007',3,'Head injury','ICU monitoring and meds'),
	('P3008',1,'Laceration','Stitches and antibiotics'),
	('P3009',10,'Anxiety','Counseling and mild meds'),
	('P3010',2,'Pneumonia','Oxygen and antibiotics'),
	('P3011',1,'Minor cuts','Cleaning and dressing'),
	('P3012',5,'Seizure','Neuro eval and meds'),
	('P3013',4,'Broken ribs','Pain relief and breathing therapy'),
	('P3014',3,'Collapsed lung','Chest tube and surgery'),
	('P3015',8,'Dislocated shoulder','Reduction and sling'),
	('P3016',6,'Smoke inhalation','Steroids and oxygen therapy'),
	('P3017',9,'Concussion','Neurological observation'),
	('P3018',7,'Burned hand','Topical treatment'),
	('P3019',1,'Back pain','Chiropractic and rehab'),
	('P3020',10,'Eye trauma','Ophthalmology referral'),
	('P3021',3,'Crushed leg','Surgery and metal rod implant'),
	('P3022',8,'Broken wrist','Casting and meds'),
	('P3023',4,'Fever and infection','Antibiotics'),
	('P3024',2,'Asthma attack','Inhaler and steroids'),
	('P3025',5,'Severe bleeding','Surgery and transfusion'),
	('P3026',7,'Knee fracture','Surgical repair'),
	('P3027',10,'Migraine','IV hydration and meds'),
	('P3028',6,'Dehydration','IV fluids'),
	('P3029',9,'Broken foot','Casting and crutches'),
	('P3030',8,'Gunshot wound','Emergency surgery');

/*!40000 ALTER TABLE `VICTIM` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table VOLUNTEER
# ------------------------------------------------------------

DROP TABLE IF EXISTS `VOLUNTEER`;

CREATE TABLE `VOLUNTEER` (
  `ssn` char(11) NOT NULL,
  `center_id` int NOT NULL,
  PRIMARY KEY (`ssn`),
  KEY `center_id` (`center_id`),
  CONSTRAINT `volunteer_ibfk_1` FOREIGN KEY (`ssn`) REFERENCES `PERSON` (`ssn`),
  CONSTRAINT `volunteer_ibfk_2` FOREIGN KEY (`center_id`) REFERENCES `RELIEF_CENTER` (`center_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `VOLUNTEER` WRITE;
/*!40000 ALTER TABLE `VOLUNTEER` DISABLE KEYS */;

INSERT INTO `VOLUNTEER` (`ssn`, `center_id`)
VALUES
	('V1001',1),
	('V1002',1),
	('V1003',2),
	('V1004',2),
	('V1005',3),
	('V1006',3),
	('V1007',4),
	('V1008',4),
	('V1009',5),
	('V1010',5),
	('V1011',6),
	('V1012',6),
	('V1013',7),
	('V1014',7),
	('V1015',8),
	('V1016',8),
	('V1017',9),
	('V1018',9),
	('V1019',10),
	('V1020',10);

/*!40000 ALTER TABLE `VOLUNTEER` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
