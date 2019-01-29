module.exports = {

     registerUser: (req, res) => {
          const dbInstance = req.app.get("db");
          const { username, password, profile_pic } = req.body;
          dbInstance.create_user([ username, password, profile_pic ])
               .then(users => {
                    res.status(200).send(users);
               })
               .catch(error => {
                    res.status(500).send({ errorMessage: "Error in registerUser method" });
                    console.log(error);
               })
     },

     loginUser: (req, res) => {
          const dbInstance = req.app.get("db");
          const { username, password } = req.body;
          dbInstance.read_user( [ username, password ])
               .then(users => {
                    res.status(200).send(users);
               })
               .catch(error => {
                    res.status(500).send({ errorMessage: "Error in loginUser method" });
                    console.log(error);
               })  
     }



}