CREATE TABLE `bans` (
	`id_ban` integer PRIMARY KEY NOT NULL,
	`id` integer,
	`date` text,
	`reason` text,
	FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `modaplications` (
	`id_modaplication` integer PRIMARY KEY NOT NULL,
	`id` integer,
	`date` text,
	`reason` text,
	FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id_report` integer PRIMARY KEY NOT NULL,
	`id_comment` integer,
	`id` integer,
	`id_reporting_user` integer,
	`reason` text,
	`date` text,
	FOREIGN KEY (`id_comment`) REFERENCES `comments`(`id_comment`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
	FOREIGN KEY (`id_reporting_user`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
