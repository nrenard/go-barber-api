const TABLE = 'users';
const COLUMN = 'avatar_id';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(TABLE, COLUMN, {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    }),

  down: queryInterface => queryInterface.removeColumn(TABLE, COLUMN),
};
