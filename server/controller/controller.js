var Userdb = require('../model/model');

// Create and save new user
exports.create = (req,res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({message : "Content can not be empty !"});
        return;
    }
    
    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    // save user into database
    user
     .save(user)
     .then(data => {
        //  res.send(data)
        res.redirect('/add-user');
     })

     .catch(err => {
         res.status(500).send({ message: err.message || "Some error occurred while creating a create operation" })
     })

}

// Retieve and return all user/ retieve and return a single user
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;
        Userdb
         .findById(id)
         .then(data => {
             if (!data)
                res.status(404).send({message: "Not found user with id " + id})
             else
                res.send(data)
         })
         .catch(err => {
             res.send(500).send({message: "Error retrieving user with id " + id})
         })
    }else {
        Userdb
        .find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({message : err.message || "Some error occurred while retriving user information"});
        })
    }
}

// Update a new identified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({message: "Data to update can not be empty"});
    }

    const id = req.params.id;
    Userdb
     .findByIdAndUpdate(id, req.body, {useFindAndModify: false})
     .then(data => {
        if (!data)
            res.status(404).send({message: `Can not update user with ${id}. Maybe user not found`})
        else 
            res.send(data)
     })
     .catch(err => {
         res.status(500).send({message: "Error Update user information"})
     })
}

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb
     .findByIdAndDelete(id)
     .then(data => {
         res.send({message: "Deleted succesfully"})
     })
     .catch(err => {
         res.status(500).send(err.message);
     })
     

}