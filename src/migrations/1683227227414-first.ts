module.exports = class First1683227227414 {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async up(queryRunner) {
    await queryRunner.query(
      `CREATE INDEX "IDX_shift_start_end_asc" ON "public"."Shift" ("start" ASC, "end" ASC, "id" ASC, "worker_id" ASC)`,
    );
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async down(queryRunner) {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_shift_start_end_asc"`);
  }
};
