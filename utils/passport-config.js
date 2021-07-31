const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById){
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email); //getUserByEmail() passed in arguments
        if(user == null){
            return done(null, false, {message: 'No user found with the given email'});
        }

        try{
            if(await bcrypt.compare(password, user.password)){ //Comparing user input password and hashed password of the found user using asynchronous bcrypt.compare()
                return done(null, user);
            }else{
                return done(null, false, {message: 'Incorrect password'});
            }
        }catch(e){
            return done(e); 
        }
    }
    //Setting usernameField to email and creating new local strategy with authenticated user
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser)); 
    passport.serializeUser((user,done) => done(null, user.id));
    passport.deserializeUser((id,done) => {
        let user = getUserById(id); //getUserById() passed in arguments
        done(null, user);
    });
}

module.exports = initialize;