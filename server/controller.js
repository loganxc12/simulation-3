module.exports = {

    registerUser: (req, res) => {
        const dbInstance = req.app.get("db");
        const { username, password } = req.body;
        dbInstance.create_user([ username, password ])
            .then(users => {
                req.session.user = {
                    id: users[0].id,
                    username: users[0].username
                }
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
                req.session.user = {
                    id: users[0].id,
                    username: users[0].username
                }
                res.status(200).send({ user: req.session.user });
            })
            .catch(error => {
                res.status(500).send({ errorMessage: "Error in loginUser method" });
                console.log(error);
            })  
    },

    getUser: (req, res) => {
        res.send({ 
            user: req.session.user
        });
    },

    getTweets: (req, res) => {
        const dbInstance = req.app.get("db");
        const { id } = req.session.user;
        dbInstance.get_user_tweets([ id ])
            .then(tweets => res.status(200).send(tweets))
            .catch(error => {
                res.status(500).send({ errorMessage: "Error in getTweets method" });
                console.log(error);
            })
    },

    createTweet: (req, res) => {
        console.log("-----SESSION", req.session);
        console.log("----REQ.BODY", req.body);
        const dbInstance = req.app.get("db");
        const { tweet } = req.body;
        const { id } = req.session.user;
        dbInstance.create_tweet([ tweet, id ])
            .then(tweets => {
                res.status(200).send(tweets);
            })
            .catch(error => {
                res.status(500).send({ errorMessage: "Error in createTweet method" });
                console.log(error);
            }) 
    },

    updateTweet: (req, res) => {
        const { id } = req.params;
        const { tweet } = req.body;
        const user_id = req.session.user.id;
        const dbInstance = req.app.get("db");
        dbInstance.update_tweet([ tweet, id, user_id ])
            .then(tweets => {
                res.status(200).send(tweets);
            }) 
            .catch(error => {
                res.status(500).send({ errorMessage: "Error in createTweet method" });
                console.log(error);
            })    
    }, 

    search: (req, res) => {
        console.log("----req.query", req.query);
        const { query } = req.query;
        res.status(200).send(query);
    }


}