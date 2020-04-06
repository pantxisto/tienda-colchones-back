const mongoose = require('mongoose');
const User = mongoose.model('User');
const Product = mongoose.model('Product');

const usersJson = require('./users.json');
const productsJson = require('./products.json');

mongoose.connect('mongodb://localhost/tienda-colchones', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => {
    // Si no hay ningun documento relleno users
    User.countDocuments().then(res => {
        if (res === 0) {
            seedUsers();
        } else {
            console.log('Users : ' + res);
        }
    });

    // Si no hay ningun documento relleno products
    Product.countDocuments().then(res => {
        if (res === 0) {
            seedProducts();
        } else {
            console.log('Products : ' + res);
        }
    });
    
    console.log('Database is connected');

})
.catch(err => console.log(err));

module.exports = mongoose;

function seedUsers() {
    usersJson.forEach(user => {
        // a document instance
        const newUser = new User({ username: user.username, email: user.email, password: user.password, role: user.role });
    
        // save model to database
        newUser.save(function (err, product) {
            if (err) {
                console.log(err);
            } else {
                console.log('User created');
            }
        });
    });
}

function seedProducts() {
    productsJson.forEach(product => {
        // a document instance
        const newProduct = new Product({ name: product.name, type: product.type, prize: product.prize, description: product.description, imagePath: product.imagePath, favorite: product.favorite });

        // save model to database
        newProduct.save(function (err, product) {
            if (err) {
                console.log(err);
            } else {
                console.log('Product created');
            }
        });
    });
}