import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1752245778307 implements MigrationInterface {
    name = 'InitSchema1752245778307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reviewer" varchar NOT NULL, "content" varchar NOT NULL, "bookId" integer)`);
        await queryRunner.query(`CREATE TABLE "book" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "author" varchar NOT NULL, "published_date" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_review" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reviewer" varchar NOT NULL, "content" varchar NOT NULL, "bookId" integer, CONSTRAINT "FK_ae1ec2fd91f77b5df325d1c7b4a" FOREIGN KEY ("bookId") REFERENCES "book" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_review"("id", "reviewer", "content", "bookId") SELECT "id", "reviewer", "content", "bookId" FROM "review"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`ALTER TABLE "temporary_review" RENAME TO "review"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" RENAME TO "temporary_review"`);
        await queryRunner.query(`CREATE TABLE "review" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reviewer" varchar NOT NULL, "content" varchar NOT NULL, "bookId" integer)`);
        await queryRunner.query(`INSERT INTO "review"("id", "reviewer", "content", "bookId") SELECT "id", "reviewer", "content", "bookId" FROM "temporary_review"`);
        await queryRunner.query(`DROP TABLE "temporary_review"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
