import { MigrationBuilder } from 'node-pg-migrate'

export async function up (pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('comments', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    thread_id: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    content: {
      type: 'TEXT',
      notNull: true
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }

  })
  pgm.addConstraint('comments', 'fk__comments.user_id__users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE')
  pgm.addConstraint('comments', 'fk__comments.thread_Id__threads.id', 'FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE')
}

export async function down (pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('comments')
}
