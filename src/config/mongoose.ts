import mongoose from "mongoose";
import {
    mongodbConnectionURL
} from "./vars";
import seedDB from "./seeder"

mongoose.Promise = Promise;



mongoose.connect(mongodbConnectionURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    seedDB();
},
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});
