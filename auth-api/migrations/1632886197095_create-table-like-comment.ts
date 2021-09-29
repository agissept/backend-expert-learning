import { MigrationBuilder } from 'node-pg-migrate'

export async function up (pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('like_comments', {
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    comment_id: {
      type: 'VARCHAR(50)',
      notNull: true
    }
  })

  pgm.addConstraint('like_comments', 'unique__user_id__and__comment_id', 'UNIQUE(user_id, comment_id)')

  pgm.addConstraint('like_comments', 'fk__like_comments.user_id__users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE')
  pgm.addConstraint('like_comments', 'fk__like_comments.comment_id__comments.id', 'FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE')
}

export async function down (pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('like_comments')
}
