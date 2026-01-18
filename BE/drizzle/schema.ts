import { mysqlTable, varchar, int, datetime, text } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const admins = mysqlTable("admins", {
	code: varchar({ length: 100 }).notNull(),
	name: varchar({ length: 100 }).default('NULL'),
	address: varchar({ length: 100 }).default('NULL'),
	village: varchar({ length: 100 }).default('NULL'),
	whatsapp: varchar({ length: 100 }).default('NULL'),
	username: varchar({ length: 100 }).default('NULL'),
	password: varchar({ length: 100 }).default('NULL'),
});

export const customers = mysqlTable("customers", {
	code: varchar({ length: 100 }).notNull(),
	name: varchar({ length: 100 }).default('NULL'),
	type: varchar({ length: 100 }).default('NULL'),
	address: varchar({ length: 100 }).default('NULL'),
	village: varchar({ length: 100 }).default('NULL'),
	whatsapp: varchar({ length: 100 }).default('NULL'),
	username: varchar({ length: 100 }).default('NULL'),
	password: varchar({ length: 100 }).default('NULL'),
});

export const transactions = mysqlTable("transactions", {
	id: int().autoincrement().notNull(),
	date: datetime({ mode: 'string'}).default('NULL'),
	noFactur: varchar({ length: 100 }).default('NULL'),
	type: varchar({ length: 100 }).default('NULL'),
	year: varchar({ length: 100 }).default('NULL'),
	totalTrash: int().default('NULL'),
	totalFee: int().default('NULL'),
	detail: text().default('NULL'),
	month: varchar({ length: 100 }).default('NULL'),
});

export const trashMaster = mysqlTable("trash_master", {
	id: int().autoincrement().notNull(),
	type: varchar({ length: 100 }).default('NULL'),
	name: varchar({ length: 100 }).default('NULL'),
	code: varchar({ length: 100 }).default('NULL'),
	fee: int().notNull(),
});
