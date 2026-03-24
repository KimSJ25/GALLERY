CREATE TABLE `exhibition_photos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`r2_key` text NOT NULL,
	`file_size` integer NOT NULL,
	`exif_info` text,
	`order` integer DEFAULT 0,
	`created_at` integer
);
