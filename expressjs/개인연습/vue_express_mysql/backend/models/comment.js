/*** models/comment.js ***/

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {
      comment: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
  
      // commenter 컬럼에 대한 모델은 없음.
      // 여기에 정의해도 되긴 하지만 시퀄라이즈 자체에서 관계를 따로 정의할 수 있음.
      // 이것에 대해선 나중에...
  
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('now()'),
      },
    }, {
      timestamps: false,
    });
  };