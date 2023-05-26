import { MigrationBuilder } from 'node-pg-migrate'

export async function up (pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('threads', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    title: {
      type: 'TEXT',
      notNull: true
    }
  })
}

export async function down (pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('threads')
}
