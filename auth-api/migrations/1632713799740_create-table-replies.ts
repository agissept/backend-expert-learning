import { MigrationBuilder } from 'node-pg-migrate'

export async function up (pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('replies', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    comment_id: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    content: {
      type: 'TEXT',
      notNull: true
    },
    is_deleted: {
      type: 'boolean',
      notNull: true,
      default: false
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }

  })
  pgm.addConstraint('replies', 'fk__replies.user_id__users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE')
  pgm.addConstraint('replies', 'fk__replies.comment_Id__comments.id', 'FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE')
}

export async function down (pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('replies')
}
