-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2017 at 08:38 PM
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `const_data`
--

INSERT INTO `const_data` (`id`, `time`, `key_string`, `value_string`, `created_at`, `updated_at`) VALUES
  (1, '2017-04-02 21:11:28', 'kstps_mu', '69', '2017-04-02 21:11:28', '2017-04-02 21:11:28'),
  (2, '2017-04-02 00:00:00', 'kawas_tot_mu', '6.2', '2017-04-02 21:25:16', '2017-04-02 21:25:16');

-- --------------------------------------------------------

--
-- Table structure for table `key_strings`
--

DROP TABLE IF EXISTS `key_strings`;
CREATE TABLE IF NOT EXISTS `key_strings` (
  `key_str` varchar(100) NOT NULL,
  PRIMARY KEY (`key_str`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `key_strings`
--

INSERT INTO `key_strings` (`key_str`) VALUES
  ('kstps_mu');

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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `emailid`, `password`, `role_id`, `created_at`, `updated_at`, `is_verified`) VALUES
  (7, 'sudhir', 'nagasudhirpulla@gmail', 'pullasudhir', NULL, '2016-11-22 08:07:32', '2017-01-07 02:17:41', 1),
  (8, 'pradeep', 'psanodiya@gmail.com', 'abc123', NULL, '2016-11-22 08:08:59', '2016-11-22 08:08:59', 0),
  (24, 'ghggj', 'nagasudhirpulla@gmail.co', 'gghgHGJHGH', NULL, '2016-12-04 01:33:21', '2017-01-07 00:04:25', 0),
  (25, 'hgjh', 'ghgj@hjhjg.com', 'asdf', NULL, '2017-01-07 01:34:40', '2017-01-07 01:34:40', 0),
  (30, 'ghgugj', 'nagasudhirpulla@gmail.com', 'asdf', NULL, '2017-01-07 23:25:23', '2017-01-07 23:25:23', 0),
  (31, 'admin', 'nagasudh@j', 'abc123', 2, '2017-04-02 15:39:47', '2017-04-02 15:39:47', 1),
  (32, 'ntpc', 'ntpc@gmail.com', 'ntpc', 1, '2017-04-02 19:08:37', '2017-04-02 19:08:37', 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
