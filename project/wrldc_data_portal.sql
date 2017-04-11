-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2017 at 06:51 AM
-- Server version: 5.7.9
-- PHP Version: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wrldc_data_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `const_data`
--

DROP TABLE IF EXISTS `const_data`;
CREATE TABLE IF NOT EXISTS `const_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `key_string` varchar(100) NOT NULL,
  `value_string` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `time` (`time`,`key_string`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `const_data`
--

INSERT INTO `const_data` (`id`, `time`, `key_string`, `value_string`, `created_at`, `updated_at`) VALUES
  (15, '2017-04-03 00:00:00', 'kstps_tot_mu', '34', '2017-04-04 14:26:23', '2017-04-04 20:59:29'),
  (16, '2017-04-03 00:00:00', 'sipat_tot_mu', '4554', '2017-04-04 14:26:23', '2017-04-04 20:59:29'),
  (17, '2017-04-03 00:00:00', 'vstps_tot_mu', '41554', '2017-04-04 14:26:23', '2017-04-04 20:59:29'),
  (18, '2017-04-03 00:00:00', 'kawas_tot_mu', '8487', '2017-04-04 14:26:23', '2017-04-04 20:59:29'),
  (19, '2017-04-03 00:00:00', 'gandhar_tot_mu', '4534', '2017-04-04 14:26:23', '2017-04-04 20:59:29'),
  (20, '2017-04-03 00:00:00', 'mouda_tot_mu', '4354', '2017-04-04 14:26:23', '2017-04-04 20:59:29'),
  (81, '2017-04-03 00:00:00', 'ssp_tot_mu', '246', '2017-04-04 15:11:42', '2017-04-04 15:11:42'),
  (88, '2017-04-04 00:00:00', 'kstps_tot_mu', '150', '2017-04-05 00:08:13', '2017-04-05 00:08:13'),
  (89, '2017-04-04 00:00:00', 'sipat_tot_mu', '200', '2017-04-05 00:08:13', '2017-04-05 00:08:13'),
  (90, '2017-04-05 00:00:00', 'dem19hrs_ESIL', '144', '2017-04-06 14:46:59', '2017-04-06 14:46:59'),
  (91, '2017-04-05 00:00:00', 'dem20hrs_ESIL', '144', '2017-04-06 14:46:59', '2017-04-06 14:46:59'),
  (92, '2017-04-05 00:00:00', 'dem3hrs_ESIL', '144', '2017-04-06 14:46:59', '2017-04-06 14:46:59'),
  (93, '2017-04-05 00:00:00', 'drawal_ESIL', '144', '2017-04-06 14:46:59', '2017-04-06 14:46:59'),
  (94, '2017-04-05 00:00:00', 'maxDemTime_ESIL', '144', '2017-04-06 14:46:59', '2017-04-06 14:46:59'),
  (95, '2017-04-05 00:00:00', 'maxDem_ESIL', '144', '2017-04-06 14:46:59', '2017-04-06 14:46:59'),
  (96, '2017-04-09 00:00:00', 'availability_MSEB', '428.63', '2017-04-10 01:16:27', '2017-04-10 01:24:45'),
  (97, '2017-04-09 00:00:00', 'dem19hrs_MSEB', '20109', '2017-04-10 01:24:45', '2017-04-10 01:24:45'),
  (98, '2017-04-09 00:00:00', 'dem20hrs_MSEB', '18589', '2017-04-10 01:24:45', '2017-04-10 01:24:45'),
  (99, '2017-04-09 00:00:00', 'dem3hrs_MSEB', '14158', '2017-04-10 01:24:45', '2017-04-10 01:24:45'),
  (100, '2017-04-09 00:00:00', 'drawal_MSEB', '119.084', '2017-04-10 01:24:45', '2017-04-10 01:24:45'),
  (101, '2017-04-09 00:00:00', 'hydroGen_MSEB', '30.328', '2017-04-10 01:24:45', '2017-04-10 01:24:45'),
  (102, '2017-04-09 00:00:00', 'ls19hrs_MSEB', '0', '2017-04-10 01:24:45', '2017-04-10 01:24:45'),
  (103, '2017-04-09 00:00:00', 'ls20hrs_MSEB', '0', '2017-04-10 01:24:45', '2017-04-10 01:24:45'),
  (104, '2017-04-09 00:00:00', 'ls3hrs_MSEB', '0', '2017-04-10 01:24:45', '2017-04-10 01:24:45'),
  (105, '2017-04-09 00:00:00', 'lsMaxDem_MSEB', '0', '2017-04-10 01:24:45', '2017-04-10 01:24:45'),
  (106, '2017-04-09 00:00:00', 'maxDemTime_MSEB', '11', '2017-04-10 01:24:45', '2017-04-10 01:24:45'),
  (107, '2017-04-09 00:00:00', 'maxDem_MSEB', '20158', '2017-04-10 01:24:45', '2017-04-10 01:24:45'),
  (108, '2017-04-09 00:00:00', 'shortFallMUs_MSEB', '0', '2017-04-10 01:24:45', '2017-04-10 01:24:45'),
  (109, '2017-04-09 00:00:00', 'solarGen_MSEB', '1.279', '2017-04-10 01:24:45', '2017-04-10 01:24:45'),
  (110, '2017-04-09 00:00:00', 'windGen_MSEB', '3', '2017-04-10 01:24:45', '2017-04-10 01:24:45'),
  (112, '2017-04-09 00:00:00', 'dem19hrs_ESIL', '392.05', '2017-04-10 11:32:21', '2017-04-10 11:32:21'),
  (113, '2017-04-09 00:00:00', 'dem20hrs_ESIL', '365.99', '2017-04-10 11:32:21', '2017-04-10 11:32:21'),
  (114, '2017-04-09 00:00:00', 'dem3hrs_ESIL', '407.84', '2017-04-10 11:32:21', '2017-04-10 11:32:21'),
  (115, '2017-04-09 00:00:00', 'drawal_ESIL', '9', '2017-04-10 11:32:21', '2017-04-10 11:32:21'),
  (116, '2017-04-09 00:00:00', 'maxDemTime_ESIL', '1', '2017-04-10 11:32:21', '2017-04-10 11:32:21'),
  (117, '2017-04-09 00:00:00', 'maxDem_ESIL', '444.38', '2017-04-10 11:32:21', '2017-04-10 11:32:21');

-- --------------------------------------------------------

--
-- Table structure for table `key_strings`
--

DROP TABLE IF EXISTS `key_strings`;
CREATE TABLE IF NOT EXISTS `key_strings` (
  `key_str` varchar(100) NOT NULL,
  `users_id` int(11) NOT NULL,
  `type_info` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`key_str`),
  KEY `users_id` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `key_strings`
--

INSERT INTO `key_strings` (`key_str`, `users_id`, `type_info`, `description`, `created_at`, `updated_at`) VALUES
  ('availability_CSEB', 53, 'number', 'Chattisgarh Availability MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('availability_GEB', 56, 'number', 'Gujarat Availability MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('availability_MP', 55, 'number', 'MP Availability MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('availability_MSEB', 54, 'number', 'Maharashtra Availability MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('balco_tot_mu', 50, 'number', 'BALCO Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('cgpl_tot_mu', 36, 'number', 'CGPL Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('dem19hrs_CSEB', 53, 'number', 'Chattisgarh Demand at 19 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem19hrs_DD', 57, 'number', 'DD Demand at 19 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem19hrs_DNH', 58, 'number', 'DNH Demand at 19 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem19hrs_ESIL', 60, 'number', 'ESIL Demand at 19 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem19hrs_GEB', 56, 'number', 'Gujarat Demand at 19 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem19hrs_GOA', 59, 'number', 'GOA Demand at 19 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem19hrs_MP', 55, 'number', 'MP Demand at 19 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem19hrs_MSEB', 54, 'number', 'Maharashtra Demand at 19 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem20hrs_CSEB', 53, 'number', 'Chattisgarh Demand at 20 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem20hrs_DD', 57, 'number', 'DD Demand at 20 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem20hrs_DNH', 58, 'number', 'DNH Demand at 20 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem20hrs_ESIL', 60, 'number', 'ESIL Demand at 20 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem20hrs_GEB', 56, 'number', 'Gujarat Demand at 20 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem20hrs_GOA', 59, 'number', 'GOA Demand at 20 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem20hrs_MP', 55, 'number', 'MP Demand at 20 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem20hrs_MSEB', 54, 'number', 'Maharashtra Demand at 20 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem3hrs_CSEB', 53, 'number', 'Chattisgarh Demand at 3 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem3hrs_DD', 57, 'number', 'DD Demand at 3 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem3hrs_DNH', 58, 'number', 'DNH Demand at 3 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem3hrs_ESIL', 60, 'number', 'ESIL Demand at 3 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem3hrs_GEB', 56, 'number', 'Gujarat Demand at 3 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem3hrs_GOA', 59, 'number', 'GOA Demand at 3 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem3hrs_MP', 55, 'number', 'MP Demand at 3 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dem3hrs_MSEB', 54, 'number', 'Maharashtra Demand at 3 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('dgen_tot_mu', 47, 'number', 'DGEN Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('drawal_CSEB', 53, 'number', 'Chattisgarh Drawal MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('drawal_DD', 57, 'number', 'DD Drawal MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('drawal_DNH', 58, 'number', 'DNH Drawal MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('drawal_ESIL', 60, 'number', 'ESIL Drawal MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('drawal_GEB', 56, 'number', 'Gujarat Drawal MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('drawal_GOA', 59, 'number', 'GOA Drawal MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('drawal_MP', 55, 'number', 'MP Drawal MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('drawal_MSEB', 54, 'number', 'Maharashtra Drawal MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('essarmahan_tot_mu', 51, 'number', 'ESSARMAHAN Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('gandhar_tot_mu', 32, 'number', 'Gandhar Generation MU', '2017-04-05 00:12:43', '2017-04-05 00:12:43'),
  ('hydroGen1_MP', 55, 'number', 'Indira Sagar Hydro Generation MU', '2017-04-11 12:19:31', '2017-04-11 12:19:31'),
  ('hydroGen2_MP', 55, 'number', 'Omkareshwar Hydro Generation MU', '2017-04-11 12:19:31', '2017-04-11 12:19:31'),
  ('hydroGen_CSEB', 53, 'number', 'Chattisgarh Hydro Generation MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('hydroGen_GEB', 56, 'number', 'Gujarat Hydro Generation MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('hydroGen_MP', 55, 'number', 'MP Hydro Generation MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('hydroGen_MSEB', 54, 'number', 'Maharashtra Hydro Generation MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('jhabua_tot_mu', 49, 'number', 'JHABUA Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('jpltamnar_tot_mu', 46, 'number', 'JPLTAMNAR Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('jpl_tot_mu', 40, 'number', 'JPL Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('kaps_tot_mu', 34, 'number', 'KAPS Generation MU', '2017-04-05 00:14:36', '2017-04-05 00:14:36'),
  ('kawas_tot_mu', 32, 'number', 'Kawas Generation MU', '2017-04-05 00:12:43', '2017-04-05 00:12:43'),
  ('ksk_tot_mu', 41, 'number', 'KSK Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('kstps_tot_mu', 32, 'number', 'KSTPS Generation MU', '2017-04-04 23:54:44', '2017-04-04 23:55:43'),
  ('lanco_tot_mu', 39, 'number', 'LANCO Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('ls19hrs_CSEB', 53, 'number', 'Chattisgarh Load Shedding at 19 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('ls19hrs_GOA', 59, 'number', 'GOA Load Shedding at 19 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('ls19hrs_MP', 55, 'number', 'MP Load Shedding at 19 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('ls19hrs_MSEB', 54, 'number', 'Maharashtra Load Shedding at 19 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('ls20hrs_CSEB', 53, 'number', 'Chattisgarh Load Shedding at 20 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('ls20hrs_GOA', 59, 'number', 'GOA Load Shedding at 20 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('ls20hrs_MP', 55, 'number', 'MP Load Shedding at 20 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('ls20hrs_MSEB', 54, 'number', 'Maharashtra Load Shedding at 20 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('ls3hrs_CSEB', 53, 'number', 'Chattisgarh Load Shedding at 3 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('ls3hrs_GOA', 59, 'number', 'GOA Load Shedding at 3 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('ls3hrs_MP', 55, 'number', 'MP Load Shedding at 3 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('ls3hrs_MSEB', 54, 'number', 'Maharashtra Load Shedding at 3 Hrs in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('lsMaxDem_CSEB', 53, 'number', 'Chattisgarh Load Shedding at Max Demand in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('lsMaxDem_GOA', 59, 'number', 'GOA Load Shedding at Max Demand in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('lsMaxDem_MP', 55, 'number', 'MP Load Shedding at Max Demand in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('lsMaxDem_MSEB', 54, 'number', 'Maharashtra Load Shedding at Max Demand in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('maxDemTime_CSEB', 53, 'number', 'Chattisgarh Max Demand Time in Hrs', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('maxDemTime_DD', 57, 'number', 'DD Max Demand Time in Hrs', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('maxDemTime_DNH', 58, 'number', 'DNH Max Demand Time in Hrs', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('maxDemTime_ESIL', 60, 'number', 'ESIL Max Demand Time in Hrs', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('maxDemTime_GEB', 56, 'number', 'Gujarat Max Demand Time in Hrs', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('maxDemTime_GOA', 59, 'number', 'GOA Max Demand Time in Hrs', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('maxDemTime_MP', 55, 'number', 'MP Max Demand Time in Hrs', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('maxDemTime_MSEB', 54, 'number', 'Maharashtra Max Demand Time in Hrs', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('maxDem_CSEB', 53, 'number', 'Chattisgarh Max Demand in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('maxDem_DD', 57, 'number', 'DD Max Demand in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('maxDem_DNH', 58, 'number', 'DNH Max Demand in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('maxDem_ESIL', 60, 'number', 'ESIL Max Demand in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('maxDem_GEB', 56, 'number', 'Gujarat Max Demand in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('maxDem_GOA', 59, 'number', 'GOA Max Demand in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('maxDem_MP', 55, 'number', 'MP Max Demand in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('maxDem_MSEB', 54, 'number', 'Maharashtra Max Demand in MW', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('mbpower_tot_mu', 44, 'number', 'MBPOWER Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('mouda_tot_mu', 32, 'number', 'Mouda Generation MU', '2017-04-05 00:12:43', '2017-04-05 00:12:43'),
  ('nspcl_tot_mu', 38, 'number', 'NSPCL Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('requirement_GEB', 56, 'number', 'Gujarat Requirement MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('rgppl_tot_mu', 48, 'number', 'RGPPL Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('rkm_tot_mu', 42, 'number', 'RKM Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('sasan_tot_mu', 37, 'number', 'SASAN Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('shortFallMUs_CSEB', 53, 'number', 'Chattisgarh Shortfall MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('shortFallMUs_GOA', 59, 'number', 'GOA Shortfall MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('shortFallMUs_MP', 55, 'number', 'MP Shortfall MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('shortFallMUs_MSEB', 54, 'number', 'Maharashtra Shortfall MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('sipat_tot_mu', 32, 'number', 'Sipat Generation MU', '2017-04-04 23:54:44', '2017-04-04 23:54:44'),
  ('sks_tot_mu', 45, 'number', 'SKS Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('solarGen_CSEB', 53, 'number', 'Chattisgarh Solar Generation MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('solarGen_GEB', 56, 'number', 'Gujarat Solar Generation MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('solarGen_MP', 55, 'number', 'MP Solar Generation MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('solarGen_MSEB', 54, 'number', 'Maharashtra Solar Generation MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('ssp_tot_mu', 33, 'number', 'SSP Generation MU', '2017-04-05 00:14:36', '2017-04-05 00:14:36'),
  ('stateGen_GOA', 59, 'number', 'GOA State Generation MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('taps_tot_mu', 35, 'number', 'TAPS Generation MU', '2017-04-05 00:19:26', '2017-04-05 00:19:26'),
  ('trn_tot_mu', 43, 'number', 'TRN Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('vandana_tot_mu', 52, 'number', 'VANDANA Total Generation MU', '2017-04-05 13:38:09', '2017-04-05 13:38:09'),
  ('vstps_tot_mu', 32, 'number', 'VSTPS Generation MU', '2017-04-05 00:12:43', '2017-04-05 00:12:43'),
  ('windGen_GEB', 56, 'number', 'Gujarat Wind Generation MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('windGen_MP', 55, 'number', 'MP Wind Generation MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14'),
  ('windGen_MSEB', 54, 'number', 'Maharashtra Wind Generation MU', '2017-04-06 14:43:14', '2017-04-06 14:43:14');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `created_at`, `updated_at`) VALUES
  (1, 'WRCONS', '2017-04-02 21:08:15', '2017-04-02 21:08:15'),
  (2, 'ADMIN', '2017-04-02 21:08:15', '2017-04-02 21:08:15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(150) NOT NULL,
  `emailid` varchar(200) NOT NULL,
  `password` varchar(300) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_verified` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `emailid` (`emailid`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `emailid`, `password`, `role_id`, `created_at`, `updated_at`, `is_verified`) VALUES
  (7, 'sudhir', 'nagasudhirpulla@gmail', 'pullasudhir', NULL, '2016-11-22 08:07:32', '2017-01-07 02:17:41', 1),
  (31, 'admin', 'nagasudh@j', 'abc123', 2, '2017-04-02 15:39:47', '2017-04-02 15:39:47', 1),
  (32, 'ntpc', 'ntpc@gmail.com', 'ntpc', 1, '2017-04-02 19:08:37', '2017-04-02 19:08:37', 0),
  (33, 'ssp', 'ssp@as', 'ssp', 1, '2017-04-04 09:38:24', '2017-04-04 09:38:24', 0),
  (34, 'kaps', 'kaps@as', 'kaps', 1, '2017-04-04 09:38:24', '2017-04-04 09:38:24', 0),
  (35, 'taps', 'taps@as', 'taps', 1, '2017-04-04 09:38:24', '2017-04-04 09:38:24', 0),
  (36, 'cgpl', 'cgpl@as', 'cgpl', 1, '2017-04-04 09:38:24', '2017-04-04 09:38:24', 0),
  (37, 'sasan', 'sasan@as', 'sasan', 1, '2017-04-04 09:38:24', '2017-04-04 09:38:24', 0),
  (38, 'nspcl', 'nspcl@as', 'nspcl', 1, '2017-04-04 15:36:42', '2017-04-04 15:36:42', 0),
  (39, 'lanco', 'lanco@as', 'lanco', 1, '2017-04-04 15:36:42', '2017-04-04 15:36:42', 0),
  (40, 'jpl', 'jpl@as', 'jpl', 1, '2017-04-04 15:36:42', '2017-04-04 15:36:42', 0),
  (41, 'ksk', 'ksk@as', 'ksk', 1, '2017-04-04 15:36:42', '2017-04-04 15:36:42', 0),
  (42, 'rkm', 'rkm@as', 'rkm', 1, '2017-04-04 15:36:42', '2017-04-04 15:36:42', 0),
  (43, 'trn', 'trn@as', 'trn', 1, '2017-04-04 15:36:42', '2017-04-04 15:36:42', 0),
  (44, 'mbpower', 'mbpower@as', 'mbpower', 1, '2017-04-04 15:36:42', '2017-04-04 15:36:42', 0),
  (45, 'sks', 'sks@as', 'sks', 1, '2017-04-04 15:36:42', '2017-04-04 15:36:42', 0),
  (46, 'jpltamnar', 'jpltamnar@as', 'jpltamnar', 1, '2017-04-04 15:36:42', '2017-04-04 15:36:42', 0),
  (47, 'dgen', 'dgen@as', 'dgen', 1, '2017-04-04 15:36:42', '2017-04-04 15:36:42', 0),
  (48, 'rgppl', 'rgppl@as', 'rgppl', 1, '2017-04-04 15:36:42', '2017-04-04 15:36:42', 0),
  (49, 'jhabua', 'jhabua@as', 'jhabua', 1, '2017-04-04 15:39:33', '2017-04-04 15:39:33', 0),
  (50, 'balco', 'balco@as', 'balco', 1, '2017-04-04 15:39:33', '2017-04-04 15:39:33', 0),
  (51, 'essarmahan', 'essarmahan@as', 'essarmahan', 1, '2017-04-04 15:39:33', '2017-04-04 15:39:33', 0),
  (52, 'vandana', 'vandana@as', 'vandana', 1, '2017-04-04 15:39:33', '2017-04-04 15:39:33', 0),
  (53, 'cseb', 'cseb@gmail.com', 'cseb', 1, '2017-04-05 15:44:02', '2017-04-05 15:44:02', 0),
  (54, 'mseb', 'mseb@gmail.com', 'mseb', 1, '2017-04-05 15:44:02', '2017-04-05 15:44:02', 0),
  (55, 'mpseb', 'mpseb@gmail.com', 'mpseb', 1, '2017-04-05 15:44:02', '2017-04-05 15:44:02', 0),
  (56, 'geb', 'geb@gmail.com', 'geb', 1, '2017-04-05 15:44:02', '2017-04-05 15:44:02', 0),
  (57, 'dd', 'dd@gmail.com', 'dd', 1, '2017-04-05 15:44:02', '2017-04-05 15:44:02', 0),
  (58, 'dnh', 'dnh@gmail.com', 'dnh', 1, '2017-04-05 15:44:02', '2017-04-05 15:44:02', 0),
  (59, 'goa', 'goa@gmail.com', 'goa', 1, '2017-04-05 15:44:02', '2017-04-05 15:44:02', 0),
  (60, 'esil', 'esil@gmail.com', 'esil', 1, '2017-04-05 15:44:02', '2017-04-05 15:44:02', 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `key_strings`
--
ALTER TABLE `key_strings`
ADD CONSTRAINT `key_strings_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
