"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIsActiveToUser1717481000000 = void 0;
class AddIsActiveToUser1717481000000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`isActive\``);
    }
}
exports.AddIsActiveToUser1717481000000 = AddIsActiveToUser1717481000000;
//# sourceMappingURL=1717481000000-AddIsActiveToUser.js.map