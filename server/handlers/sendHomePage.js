function sendHomePage(req, res) {
    res.render('index', { title: 'Express' });
}

module.exports = sendHomePage;