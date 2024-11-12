CREATE TABLE `categories` (
	`id_category` integer PRIMARY KEY NOT NULL,
	`name` text,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id_comment` integer PRIMARY KEY NOT NULL,
	`id_thread` integer,
	`id` integer,
	`content` text,
	`publication_date` text,
	FOREIGN KEY (`id_thread`) REFERENCES `threads`(`id_thread`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `threads` (
	`id_thread` integer PRIMARY KEY NOT NULL,
	`id_category` integer,
	`id` integer,
	`content` text,
	`title` text,
	`publication_date` text,
	FOREIGN KEY (`id_category`) REFERENCES `categories`(`id_category`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`password` text,
	`role` text
);
--> statement-breakpoint
CREATE TABLE `votes` (
	`id_vote` integer PRIMARY KEY NOT NULL,
	`id_thread` integer,
	`id_comment` integer,
	`id` integer,
	`type` integer,
	FOREIGN KEY (`id_comment`) REFERENCES `comments`(`id_comment`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_thread`) REFERENCES `threads`(`id_thread`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
