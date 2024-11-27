const express = require('express');
const methodOverride = require('method-override');
const multer = require('multer');
const path = require('path');
const { sequelize } = require('./models');
const app = express();
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = 3060;

// Asi funciona carrito
app.use(session({
    secret: 'chave-secreta-para-sessao',
    resave: false,
    saveUninitialized: true
}));

const sessionStore = new SequelizeStore({
    db: sequelize
});

// Configura o middleware de sessão
app.use(
    session({
        secret: 'sua_chave_secreta', 
        store: sessionStore,
        resave: false,              
        saveUninitialized: false,  
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 
        }
    })
);

// Sincroniza o modelo de sessões no banco de dados
sessionStore.sync();


// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuração de Middlewares
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usando methodOverride para simular PUT e DELETE
app.use(methodOverride('_method'));

// Roteamento
const productoRouter = require('./routes/productoRouter');
const contactoRouter = require('./routes/contactoRouter');
const nosotrosRouter = require('./routes/nosotrosRouter');
const catalogoRouter = require('./routes/catalogoRouter');
const carritoRouter = require('./routes/carritoRouter');

 app.use('/', productoRouter);
 app.use('/carrito', carritoRouter);
 app.use('/contacto', contactoRouter);
 app.use('/nosotros', nosotrosRouter);
 app.use('/catalogo', catalogoRouter);

// Iniciar servidor
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {a
        await sequelize.authenticate();
        console.log('Database connected');
    }
    catch (error) {
        console.log('Database connection failed', error);
    }
}); 
