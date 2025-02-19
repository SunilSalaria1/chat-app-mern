const User = require("../models/user.model");
const mongoose = require("mongoose");

const getContacts = async (req, res) => {
  /* 	#swagger.tags = ['Contacts']
     #swagger.description = 'Endpoint to sign in a specific user' */
  try {
    // let contacts = await User.findById({ _id: req.params.id },{contacts:1,}).populate(
    //   "contacts.user",{fullName:1}
    // );
    // res.json(contacts);


    const agg = await User.aggregate([
      // Match the user by _id
      {
        $match: {
          _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),  // Match the user with the given ID
        },
      },
    
      // Unwind the contacts array
      {
        $unwind: "$contacts",  // Unwind the contacts array to handle each contact individually
      },
    
      // Lookup user details for each contact in the contacts array
      {
        $lookup: {
          from: "users",  // The collection to lookup from
          localField: "contacts.user",  // The field in contacts that holds the user ID
          foreignField: "_id",  // The field in the User collection to match on
          as: "userDetails",  // The field where the matched user data will be stored
        },
      },
    
      // Unwind the userDetails array (since $lookup returns an array)
      {
        $unwind: "$userDetails",  // We expect only one result per contact, so unwind it
      },
    
      // Add the fullName field by concatenating firstName and lastName
      {
        $addFields: {
          "userDetails.fullName": {
            $concat: [
              { $ifNull: ["$userDetails.firstName", ""] },  // Handle missing firstName
              " ",
              { $ifNull: ["$userDetails.lastName", ""] },   // Handle missing lastName
            ],
          },
        },
      },
    
      // Project the fields we want to keep in the final result
      {
        $project: {
          contacts: {
            _id: 1,  // Keep the contact's _id
            isFavoriteContact: 1,  // Keep the isFavoriteContact flag
            user: {  // Include the user data
              _id: "$userDetails._id",  // Include the user _id
              fullName: "$userDetails.fullName",  // Include the fullName computed above
            },
          },
        },
      },
    
      // Group the results back into an array of contacts (this will retain the original _id of the user)
      {
        $group: {
          _id: "$_id",  // Group by the user's _id (this will give you the original document's _id)
          contacts: { $push: "$contacts" },  // Collect contacts back into an array
        },
      },
    ]);
    res.json(agg[0]);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const createContact = async (req, res) => {
  /* 	#swagger.tags = ['Contacts']
     #swagger.description = 'Endpoint to sign in a specific user' */
  /*  #swagger.parameters['body'] = {
      in: 'body',
      description: 'Create Contact info.',
      schema: { $ref: '#/definitions/Contacts' }
} */
  try {
    const contacts = await User.findByIdAndUpdate({_id:req.body?.user},{$push:{contacts:req.body.contacts}});
    if(contacts){
      res.send(contacts);
    }
    res.status(404).send("User not found");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

module.exports = { getContacts, createContact };
