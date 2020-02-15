const mongoose = require('mongoose');
const Profile = mongoose.model('profiles');


                        //MIDDLEWARE
// sont des fonctions qui peuvent accéder à l’objet
 //Request (req), l’objet response (res) 

                        // CONTROLLER + ROUTE
//route = Chemin  auquel la fonction middleware s'applique



module.exports = (app) => {

  app.get('/api/home', function (req, res) {
  
    
       
    //res.sendEnvoie une réponse de divers types.
  });


// a route for our backend API.
  app.get(`/api/profile`, async (req, res) => {
    let profiles = await Profile.find();
    return res.status(200).send(profiles);
  });

  

  app.post(`/api/profile`, async (req, res) => {
    let profile = await Profile.create(req.body);
// First Validate The Request
    return res.status(201).send({
      error: false,
      profile
    })
  });


  app.put(`/api/profile/:id`, async (req, res) => {
    const {id} = req.params;

    let profile = await Profile.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      product
    })

  });

  app.delete(`/api/profile/:id`, async (req, res) => {
    const {id} = req.params;

    let profile = await Profile.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      profile
    })


  })

}
