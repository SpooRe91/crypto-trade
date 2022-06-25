const handlebars = require('express-handlebars');

module.exports = (app) => {
    app.engine('hbs', handlebars.engine({
        extname: "hbs",
        helpers: require("../utils/hbsHelper")
    }));

    app.set('view engine', 'hbs');
    app.set('views', './src/views');
}