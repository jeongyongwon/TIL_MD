module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      /* 첫번째 인자: 테이블 이름 */
      'user', 
  
      /* 두번째 인자: 컬럼 모델 */
      {
      // 시퀄라이즈는 기본적으로 id를 기본키로 연결하므로 id 컬럼은 적을 필요가 없음
      name: {
        type: DataTypes.STRING(20), // VARCHAR -> STRING
        allowNull: false, // NOT NULL -> allowNull
        unique: true, // UNIQUE -> unique
      },
      age: {
        type: DataTypes.INTEGER.UNSIGNED, // INT -> INTEGER
        allowNull: false,
      },
      married: {
        type: DataTypes.BOOLEAN, // TINYINT -> BOOLEAN
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT, // TEXT = TEXT
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE, // DATETIME -> DATE
        allowNull: false,
        defaultValue: sequelize.literal('now()'),
      },
    }, 
  
    /* 세번째 인자: 테이블 옵션 */
    {
      timestamps: false, // true 시 시퀄라이즈는 자동으로 createdAt과 updateAt 컬럼 추가
    });
  };