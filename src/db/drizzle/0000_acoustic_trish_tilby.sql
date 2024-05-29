CREATE TABLE `visits` (
	`domain` text,
	`path` text,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
