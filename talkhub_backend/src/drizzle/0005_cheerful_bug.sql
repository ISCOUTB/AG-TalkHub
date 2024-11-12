CREATE TABLE `notifications` (
	`id_notification` integer PRIMARY KEY NOT NULL,
	`id_thread` integer,
	`id` integer,
	`message` text,
	`date` text,
	FOREIGN KEY (`id_thread`) REFERENCES `threads`(`id_thread`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
