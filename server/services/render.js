const axios = require('axios');

exports.homeRoutes = (req,res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
     .then(response => {
        console.log(response);
        res.render('index', {users : response.data});
     })
     .catch(err => {
         res.send(err)
     })
}

exports.addUserRouter = (req, res) => {
    res.render('add_user');
}

exports.updateUserRouter = (req, res) => {
    axios.get('http://localhost:3000/api/users', {
        params: {
            id: req.query.id
        }
    })
     .then((response) => {
        console.log(response.data)
        res.render('update_user', {user: response.data})
     })
     .catch(err => {
         res.send(err)
     })
}