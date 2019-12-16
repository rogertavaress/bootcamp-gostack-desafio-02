module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'admin',
    database: 'gympointdb',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
