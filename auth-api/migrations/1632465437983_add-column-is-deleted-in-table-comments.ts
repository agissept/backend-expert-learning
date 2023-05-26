import { MigrationBuilder } from 'node-pg-migrate'

export async function up (pgm: MigrationBuilder): Promise<void> {
  pgm.addColumn('comments', {
    is_deleted: {
      type: 'boolean',
      notNull: true,
      default: false
    }
  })
}

export async function down (pgm: MigrationBuilder): Promise<void> {
  pgm.dropColumn('comments', 'is_deleted')
}
