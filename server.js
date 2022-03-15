const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
    secret: "Super secret",
    cookie: {},
    resave: false,
    saveUninitliazed: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// const sess {
//     secret: "Super secret",
//     cookie: {},
//     resave: false,
//     saveUnintialized: true,
//     store: new SequelizeStore({
//         db: sequelize
//     })
// };

app.use(session(sess));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});