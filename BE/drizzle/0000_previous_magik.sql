-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `admins` (
	`code` varchar(100) NOT NULL,
	`name` varchar(100) DEFAULT 'NULL',
	`address` varchar(100) DEFAULT 'NULL',
	`village` varchar(100) DEFAULT 'NULL',
	`whatsapp` varchar(100) DEFAULT 'NULL',
	`username` varchar(100) DEFAULT 'NULL',
	`password` varchar(100) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`code` varchar(100) NOT NULL,
	`name` varchar(100) DEFAULT 'NULL',
	`type` varchar(100) DEFAULT 'NULL',
	`address` varchar(100) DEFAULT 'NULL',
	`village` varchar(100) DEFAULT 'NULL',
	`whatsapp` varchar(100) DEFAULT 'NULL',
	`username` varchar(100) DEFAULT 'NULL',
	`password` varchar(100) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`date` datetime DEFAULT 'NULL',
	`noFactur` varchar(100) DEFAULT 'NULL',
	`type` varchar(100) DEFAULT 'NULL',
	`year` varchar(100) DEFAULT 'NULL',
	`totalTrash` int(11) DEFAULT 'NULL',
	`totalFee` int(11) DEFAULT 'NULL',
	`detail` text DEFAULT 'NULL',
	`month` varchar(100) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `trash_master` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`type` varchar(100) DEFAULT 'NULL',
	`name` varchar(100) DEFAULT 'NULL',
	`code` varchar(100) DEFAULT 'NULL',
	`fee` int(11) NOT NULL
);

*/