const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  input: String, // req.body
  createdBy: {
    type: Schema.Types.ObjectId, // req.session.user._id
    ref: "User" //whatever you defined the model as "blabla" in the model in the User.model
  },
  commentingOn: {
    type: Schema.Types.ObjectId, // id of the recipe 
    ref: "Recipe"
  },
},
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const CommentModel = model("Comment", commentSchema);

module.exports = CommentModel;

// BE ONLY KNOWS who is using the app right now   / req.session.user._id
// everything else needs to be passed from the FE to the BE 