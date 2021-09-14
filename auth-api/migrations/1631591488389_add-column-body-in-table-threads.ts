import { MigrationBuilder } from 'node-pg-migrate'

export async function up (pgm: MigrationBuilder): Promise<void> {
  pgm.addColumn('threads', {
    body: {
      type: 'TEXT',
      notNull: true
    }
  })
}

export async function down (pgm: MigrationBuilder): Promise<void> {
  pgm.dropColumn('threads', 'body')
}
