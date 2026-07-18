import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageTitle1720760000003 implements MigrationInterface {
  name = "AddImageTitle1720760000003";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD \`title\` varchar(150) NULL AFTER \`id\``,
    );
    await queryRunner.query(
      `UPDATE \`image\` SET \`title\` = LEFT(\`description\`, 150) WHERE \`title\` IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` MODIFY \`title\` varchar(150) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`image\` DROP COLUMN \`title\``);
  }
}
