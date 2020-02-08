import mongoose from "mongoose";
import {
    mongodbConnectionURL
} from "./vars";
import seedDB from "./seeder"
import logger from "./logger";

mongoose.Promise = Promise;

mongoose.connect(mongodbConnectionURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        logger.info(`mongodb connected`)
        seedDB();
    },
).catch(err => {
    logger.info(`MongoDB connection error. Please make sure MongoDB is running ${err}`);
    // process.exit();
});
