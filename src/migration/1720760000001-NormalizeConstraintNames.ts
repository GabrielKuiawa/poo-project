import { MigrationInterface, QueryRunner } from 'typeorm';

export class NormalizeConstraintNames1720760000001 implements MigrationInterface {
    name = 'NormalizeConstraintNames1720760000001';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_image_user\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_category_user\``);
        await queryRunner.query(`ALTER TABLE \`image_categories_category\` DROP FOREIGN KEY \`FK_image_category_category\``);
        await queryRunner.query(`ALTER TABLE \`image_categories_category\` DROP FOREIGN KEY \`FK_image_category_image\``);
        await queryRunner.query(`DROP INDEX \`IDX_image_user\` ON \`image\``);
        await queryRunner.query(`DROP INDEX \`IDX_category_name_user\` ON \`category\``);
        await queryRunner.query(`DROP INDEX \`IDX_image_category_category\` ON \`image_categories_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_image_category_image\` ON \`image_categories_category\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_4760fde1380c4d39297a2e1f98\` ON \`category\` (\`name\`, \`userId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_96306bf482c0acf805cd0fd688\` ON \`image_categories_category\` (\`imageId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_f67ec53757f47fb0c38f396c37\` ON \`image_categories_category\` (\`categoryId\`)`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_dc40417dfa0c7fbd70b8eb880cc\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_32b856438dffdc269fa84434d9f\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`image_categories_category\` ADD CONSTRAINT \`FK_96306bf482c0acf805cd0fd6888\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`image_categories_category\` ADD CONSTRAINT \`FK_f67ec53757f47fb0c38f396c37f\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image_categories_category\` DROP FOREIGN KEY \`FK_f67ec53757f47fb0c38f396c37f\``);
        await queryRunner.query(`ALTER TABLE \`image_categories_category\` DROP FOREIGN KEY \`FK_96306bf482c0acf805cd0fd6888\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_32b856438dffdc269fa84434d9f\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_dc40417dfa0c7fbd70b8eb880cc\``);
        await queryRunner.query(`DROP INDEX \`IDX_f67ec53757f47fb0c38f396c37\` ON \`image_categories_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_96306bf482c0acf805cd0fd688\` ON \`image_categories_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_4760fde1380c4d39297a2e1f98\` ON \`category\``);
        await queryRunner.query(`CREATE INDEX \`IDX_image_user\` ON \`image\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_category_name_user\` ON \`category\` (\`name\`, \`userId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_image_category_image\` ON \`image_categories_category\` (\`imageId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_image_category_category\` ON \`image_categories_category\` (\`categoryId\`)`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_image_user\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_category_user\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`image_categories_category\` ADD CONSTRAINT \`FK_image_category_image\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`image_categories_category\` ADD CONSTRAINT \`FK_image_category_category\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
