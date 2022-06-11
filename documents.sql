-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jun 11, 2022 at 03:44 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `usernote`
--

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `title` varchar(128) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `title`, `content`) VALUES
(1, 'Test', 'This is a test document.'),
(2, 'Meeting ', '<p>Meeting with client.</p>'),
(21, '2022/6/11 meeting', '<p>Today is going to a meeting with our client!!</p>'),
(22, 'Hello', '<p>How are you doing?</p>'),
(23, 'Visit', '<p><span style=\"color: rgb(230, 126, 35);\">Visit to client\'s office</span></p>'),
(24, 'Meeting ', '<p>Lunch meeting.</p>'),
(26, 'Database class', '<p>Database class will be start at 9am.</p>'),
(27, 'Travel', '<p>Travel to England.</p>'),
(28, 'BBQ', '<p>Having BBQ with friends.</p>'),
(29, 'Live', '<p>Live in Tokyo.</p>'),
(30, 'New song', '<p>Create a new song for next world tour.</p>');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
