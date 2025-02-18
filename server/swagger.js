const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Chat app Documentation",
    description: "Description",
  },
  host: "localhost:3100",
  tags: [
    {
        "name": "User",
        "description": ""
    },
    {
        "name": "Message",
        "description": ""
    },
    {
        "name": "Rooms",
        "description": ""
    
    },
    {
      "name":"Contacts",
       "description" :""
    }
],
  definitions: {
    Login:{
      email:"test@example.com",
      password: "************",
    },
    User: {
      firstName: "Rajeev",
      lastName: "Salaria",
      email: "rajeev@gmail.com",
      gender: "male",
      password: "************",
      confirmPassword: "************",
      dateOfBirth: new Date().toString(),
    },
    Message: {
      message: "Hello",
      sender: "60f3b7f9e6b2e32f6c2b9f6a",
      room: "60f3b7f9e6b2e32f6c2b9f6a",
      isContactEntity:false,
      contactName:null
    },
    Room: {
      name: "Test room",
      description: "Test room description",
      createdBy: "",
      updatedBy: "",
      members: ["60f3b7f9e6b2e32f6c2b9f6a"],
      messages: ["60f3b7f9e6b2e32f6c2b9f6a"],
      isGroup: false,
      groupIcon: "groupIcon",
      admin: ["60f3b7f9e6b2e32f6c2b9f6a"],
    },
    Contacts:{
      "contacts": [
        { "user": "60d5ec49fbd7b3412c1e8f7c", "isFavoriteContact": false },
      ],
      user:""
    }
  },
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

swaggerAutogen(outputFile, routes, doc);
