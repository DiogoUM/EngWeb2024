var router = express.Router();
var Pessoa = require('../controllers/Pessoa')

/* GET home page. */
router.get('/pessoas', function (req, res) {
    Pessoa.list()
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
});

router.get('/pessoas/:id', function (req, res) {
    Pessoa.findById(req.params.id)
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
});

router.post('/pessoas', function (req, res) {
    console.log(req.body)
    Pessoa.insert(req.body)
        .then(data => res.status(201).jsonp(data))
        .catch(erro => res.status(523).jsonp(erro))
});

router.put('/pessoas/:id', function (req, res) {
    Pessoa.updatePessoa(req.params.id, req.body)
})

module.exports = router;
