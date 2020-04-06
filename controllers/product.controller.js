const mongoose = require('mongoose');
const formidable = require('formidable');
const Product = mongoose.model('Product');

const productCtrl = {};

productCtrl.getColchones = async (req, res, next) => {
    
    
    const products = await Product.find({ type: 'Colchon' }, (err, resp) => {
        if (err) {
            console.log(err);
        }
    }).skip(req.params.pageIndex * 4).limit(4);

    if (!products) {
        return res.status(404).send('No Colchones found');
    }

    const totalCount = await Product.countDocuments({ type: 'Colchon' });

    res.json(
    {
        total_count: totalCount,
        items: products
    });
    // res.render('index', { title: 'Colchones' });
}

productCtrl.getSomieres = async (req, res, next) => {
    const products = await Product.find({ type: 'Somier' }, (err, resp) => {
        if (err) {
            console.log(err);
        }
    }).skip(req.params.pageIndex * 4).limit(4);

    if (!products) {
        return res.status(404).send('No Somieres found');
    }

    const totalCount = await Product.countDocuments({ type: 'Somier' });

    res.json(
    {
        total_count: totalCount,
        items: products
    });
    // res.render('index', { title: 'Somieres' });
}

productCtrl.createProduct = async (req, res) => {
    new formidable.IncomingForm().parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Error', err)
          throw err
        }
        const id = fields._id;
        const product = new Product({
            name: fields.name,
            type: fields.type,
            prize: fields.prize,
            description: fields.description,
            imagePath: fields.imagePath,
            favorite: false,
        });

        await product.save({}, (err, resp) => {
            if (err) {
                console.log(err);
            }
        });

    }).on('fileBegin', (name, file) => {
        file.path = __dirname + '/../public/images/' + file.name
        res.json({
            "status" : " saved"
        });
    });
};

productCtrl.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id, (err, resp) => {
        if (err) {
            console.log(err);
        }
    });

    if (!product) {
        return res.status(404).send('No Product found');
    }

    res.json(product);
};

productCtrl.editProduct =  (req, res) => {
    new formidable.IncomingForm().parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Error', err)
          throw err
        }
        const id = fields._id;
        const product = {
            name: fields.name,
            type: fields.type,
            prize: fields.prize,
            description: fields.description,
            imagePath: fields.imagePath,
            favorite: fields.favorite,
        };
        // EL new hace que si no existe lo cree
        await Product.updateOne({ _id: id }, {$set: product}, { new: true }, (err, resp) => {
            if (err) {
                console.log(err);
            }
        });

        res.json({status: product.type + ' updated'});

    }).on('fileBegin', (name, file) => {
        file.path = __dirname + '/../public/images/' + file.name
    });
};

productCtrl.deleteProduct = async (req, res) => {
    await Product.deleteOne({ _id: req.params.id }, (err, resp) => {
        if (err) {
            console.log(err);
        }
    });

    res.json({status: 'Removed'});
};

/* GET products listing. */
productCtrl.getFavoriteProducts = async (req, res, next) => {
    const products = await Product.find({favorite: true}).skip(req.params.pageIndex * 4).limit(4);
    const totalCount = await Product.countDocuments({favorite: true});
    res.json(
        {
            total_count: totalCount,
            items: products
        });
};

/* GET products listing. */
productCtrl.getProducts = async (req, res, next) => {
    const products = await Product.find();
    res.json(products);
};

module.exports = productCtrl;