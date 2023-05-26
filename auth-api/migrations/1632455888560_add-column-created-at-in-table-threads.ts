import { MigrationBuilder } from 'node-pg-migrate'

export async function up (pgm: MigrationBuilder): Promise<void> {
  pgm.addColumn('threads', {
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
}

export async function down (pgm: MigrationBuilder): Promise<void> {
  pgm.dropColumn('threads', 'created_at')
}
