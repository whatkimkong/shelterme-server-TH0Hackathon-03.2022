// authorization middlewares to be used elsewhere
// (isLoggedIn, isAdmin, isOwner)

module.exports = {
    isLoggedIn: (req, res, next) => {
      // if this is a user with an active session, continue:
      if (req.session.user) {
        next()
      } else {
        res.status(403).json({message: "you shall not pass!"}) // if not, error!
      }
    },
  
    isAdmin: (req, res, next) => {
      // if this is a user with an active session, continue:
      if (req.session.user.isAdmin) {
        next() 
      } else {
        res.status(403).json({message: "you shall not pass!"}) // if not, error!
      }
    },
    //put here isOwner // during creation process -> when its added to the DB THENNNN we pass isOwner: true (set state)
  }
  
//   isOwner: (req, res, next) => {
    // must go to the DB check the created recipe - if the user is also the owner of the element to be deleted or edit
    // if yes => next()
    // if no => error
    //}