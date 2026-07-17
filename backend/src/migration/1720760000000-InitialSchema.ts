import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1720760000000 implements MigrationInterface {
  name = "InitialSchema1720760000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable("user")) {
      await this.upgradeSynchronizedSchema(queryRunner);
      return;
    }

    await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(100) NOT NULL,
                \`pathImageUser\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`admin\` enum ('user', 'admin') NOT NULL DEFAULT 'user',
                UNIQUE INDEX \`IDX_user_email\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

    await queryRunner.query(`
            CREATE TABLE \`category\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(100) NOT NULL,
                \`userId\` varchar(36) NOT NULL,
                UNIQUE INDEX \`IDX_category_name_user\` (\`name\`, \`userId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

    await queryRunner.query(`
            CREATE TABLE \`image\` (
                \`id\` varchar(36) NOT NULL,
                \`pathImage\` varchar(255) NOT NULL,
                \`description\` varchar(500) NOT NULL,
                \`userId\` varchar(36) NOT NULL,
                INDEX \`IDX_image_user\` (\`userId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

    await queryRunner.query(`
            CREATE TABLE \`image_categories_category\` (
                \`imageId\` varchar(36) NOT NULL,
                \`categoryId\` varchar(36) NOT NULL,
                INDEX \`IDX_image_category_image\` (\`imageId\`),
                INDEX \`IDX_image_category_category\` (\`categoryId\`),
                PRIMARY KEY (\`imageId\`, \`categoryId\`)
            ) ENGINE=InnoDB
        `);

    await queryRunner.query(
      `ALTER TABLE \`category\` ADD CONSTRAINT \`FK_category_user\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_image_user\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image_categories_category\` ADD CONSTRAINT \`FK_image_category_image\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image_categories_category\` ADD CONSTRAINT \`FK_image_category_category\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  private async upgradeSynchronizedSchema(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_32b856438dffdc269fa84434d9f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP INDEX \`IDX_23c05c292c439d77b0de816b50\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP INDEX \`FK_32b856438dffdc269fa84434d9f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD UNIQUE INDEX \`IDX_category_name_user\` (\`name\`, \`userId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD CONSTRAINT \`FK_category_user\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_dc40417dfa0c7fbd70b8eb880cc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` DROP INDEX \`FK_dc40417dfa0c7fbd70b8eb880cc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` MODIFY \`description\` varchar(500) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` MODIFY \`userId\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD INDEX \`IDX_image_user\` (\`userId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_image_user\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`image_categories_category\` DROP FOREIGN KEY \`FK_96306bf482c0acf805cd0fd6888\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`image_categories_category\` DROP FOREIGN KEY \`FK_f67ec53757f47fb0c38f396c37f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`image_categories_category\` DROP INDEX \`IDX_96306bf482c0acf805cd0fd688\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`image_categories_category\` DROP INDEX \`IDX_f67ec53757f47fb0c38f396c37\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`image_categories_category\` ADD INDEX \`IDX_image_category_image\` (\`imageId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image_categories_category\` ADD INDEX \`IDX_image_category_category\` (\`categoryId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image_categories_category\` ADD CONSTRAINT \`FK_image_category_image\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image_categories_category\` ADD CONSTRAINT \`FK_image_category_category\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`image_categories_category\` DROP FOREIGN KEY \`FK_image_category_category\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`image_categories_category\` DROP FOREIGN KEY \`FK_image_category_image\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_image_user\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_category_user\``,
    );
    await queryRunner.query(`DROP TABLE \`image_categories_category\``);
    await queryRunner.query(`DROP TABLE \`image\``);
    await queryRunner.query(`DROP TABLE \`category\``);
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
