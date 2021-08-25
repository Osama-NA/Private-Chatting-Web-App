-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 25, 2021 at 02:23 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `seguro`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `username`, `password`) VALUES
(1, 'admin@gmail.com', 'Ahmad', '$2b$10$u1j.Ii16Aw6y6ZORvYfsn.wSYvZNWub8J40hftrPLmgr1ypT/7cr2');

-- --------------------------------------------------------

--
-- Table structure for table `bug_reports`
--

DROP TABLE IF EXISTS `bug_reports`;
CREATE TABLE IF NOT EXISTS `bug_reports` (
  `bugID` int(11) NOT NULL AUTO_INCREMENT,
  `bug_name` varchar(50) NOT NULL,
  `bug_description` varchar(250) NOT NULL,
  `solved` varchar(10) NOT NULL,
  PRIMARY KEY (`bugID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `chat_rooms`
--

DROP TABLE IF EXISTS `chat_rooms`;
CREATE TABLE IF NOT EXISTS `chat_rooms` (
  `room_id` varchar(50) NOT NULL,
  `access_one` int(1) NOT NULL,
  `access_two` int(1) NOT NULL,
  `no_of_access` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat_rooms`
--

INSERT INTO `chat_rooms` (`room_id`, `access_one`, `access_two`, `no_of_access`) VALUES
('d97d0e8358454fc2b2096c9ee7de4d10', 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `contact_forms`
--

DROP TABLE IF EXISTS `contact_forms`;
CREATE TABLE IF NOT EXISTS `contact_forms` (
  `formID` int(11) NOT NULL AUTO_INCREMENT,
  `submitted_by` varchar(100) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`formID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `room_id` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `time` varchar(25) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `room_users`
--

DROP TABLE IF EXISTS `room_users`;
CREATE TABLE IF NOT EXISTS `room_users` (
  `id` varchar(32) NOT NULL,
  `username` varchar(100) NOT NULL,
  `room` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room_users`
--

INSERT INTO `room_users` (`id`, `username`, `room`) VALUES
('JQuOXG5PPo5UjlYCAAAB', 'Guest', 'd97d0e8358454fc2b2096c9ee7de4d10');

-- --------------------------------------------------------

--
-- Table structure for table `saved_messages`
--

DROP TABLE IF EXISTS `saved_messages`;
CREATE TABLE IF NOT EXISTS `saved_messages` (
  `user_email` varchar(150) NOT NULL,
  `room_id` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `time` varchar(25) NOT NULL,
  `message` text NOT NULL,
  `date` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `saved_messages`
--

INSERT INTO `saved_messages` (`user_email`, `room_id`, `username`, `time`, `message`, `date`) VALUES
('ossama.nae12@gmail.com', 'bf30fed92015139a5fa026d24d33c1c4', 'Guest', '7:24:51 pm', 'qwerqw', '2021-08-13'),
('ossama.nae12@gmail.com', 'bf30fed92015139a5fa026d24d33c1c4', 'Guest', '7:25:20 pm', 'qwerqw', '2021-08-13'),
('ossama.nae12@gmail.com', 'bf30fed92015139a5fa026d24d33c1c4', 'Guest', '7:25:38 pm', 'werq', '2021-08-13'),
('ossama.nae12@gmail.com', 'bf30fed92015139a5fa026d24d33c1c4', 'Guest', '7:25:53 pm', 'qwerqw', '2021-08-13');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`) VALUES
(36, 'ossama.nae12@gmail.com', 'Osama', '$2b$10$0qk1i/opL9txYLl4ZLOLA.mPbywPqE3OVcSwW7HZMcH6qxsI2nswi');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
