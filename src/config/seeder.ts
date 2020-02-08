import { ILexical } from "../api/models/lexical.model";
import { LexicalModel } from "../api/models/lexical.model";
import logger from "./logger";

const nonLexicalWords = ["to", "got", "is", "have", "and", "although", "or", "that", "when",
    "while", "a", "either", "more", "much", "neither", "my", "that", "the", "as", "no", "nor",
    "not", "at", "between", "in", "of", "without", "I", "you", "he", "she", "it", "we", "they",
    "anybody", "one"];


const seedDB = async () => {
    try {

        let nonLexicalWordsInDb = await LexicalModel.find({}).lean();

        if (nonLexicalWordsInDb.length === 0 || !nonLexicalWordsInDb || nonLexicalWordsInDb.length !== nonLexicalWords.length) {
            let promise = [];
            for (let i = 0; i < nonLexicalWords.length; i++) {

                let lexicalObject = { 'word': nonLexicalWords[i] }
                promise.push(LexicalModel.update({ 'word': nonLexicalWords[i] }, { $set: lexicalObject }, { upsert: true }))

            }
            return Promise.all(promise).then((data) => {

                logger.info(`seeding completed`)


            }).catch((err) => {
                logger.info(`non lexical Seeding failed ${err}`);
            })
        }
        else {
            logger.info("db already seeded")
        }


    }
    catch (error) {
        logger.info(`Seeding failed ${error}`);

    }
}

export default seedDB;