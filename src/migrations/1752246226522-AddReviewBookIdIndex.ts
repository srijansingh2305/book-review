import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReviewBookIdIndex1752246226522 implements MigrationInterface {
    name = 'AddReviewBookIdIndex1752246226522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "idx_review_bookId" ON "review" ("bookId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "idx_review_bookId"`);
    }

}
