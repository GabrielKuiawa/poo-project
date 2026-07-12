import { MigrationInterface, QueryRunner } from 'typeorm';

export class CascadeCategoryImages1720760000002 implements MigrationInterface {
    name = 'CascadeCategoryImages1720760000002';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image_categories_category\` DROP FOREIGN KEY \`FK_f67ec53757f47fb0c38f396c37f\``);
        await queryRunner.query(`ALTER TABLE \`image_categories_category\` ADD CONSTRAINT \`FK_f67ec53757f47fb0c38f396c37f\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image_categories_category\` DROP FOREIGN KEY \`FK_f67ec53757f47fb0c38f396c37f\``);
        await queryRunner.query(`ALTER TABLE \`image_categories_category\` ADD CONSTRAINT \`FK_f67ec53757f47fb0c38f396c37f\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
