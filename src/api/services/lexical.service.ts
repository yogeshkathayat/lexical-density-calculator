
import { ILexical } from "../models/lexical.model";
import { LexicalModel } from "../../api/models/lexical.model";

const sentenceSeparator = ['.', '?', '!'];


/**
 * LexicalService class
 * contains service methods related
 * to lexical complexity
 * @class
 */
export class LexicalService {

    /**
     * @description function to find lexical 
     * complexity of text
     * @param {string}  text 
     * @returns {object} {}
     */
    public async findComplexity(text: string) {
        try {

            let complexity = await this.calculateComplexity(text);
            return { overall_ld: complexity };

        } catch (error) {
            throw error;
        }

    }


    /**
    * @description function to find lexical
    * complexity of sentences in the text
    * @param {string}  text 
    * @returns {object} {}
    */
    public async findComplexitySentence(text: string) {
        try {

            let complexity = await this.calculateComplexity(text.trim()); //calculate overall density
            let sentenceArray = this.breakTextIntoSentences(text); //breaking text into sentences

            let complexityArr = await Promise.all(sentenceArray.map(async words => await this.calculateComplexity(words.trim())));//calculate density for each sentence
            return { sentence_ld: complexityArr, overall_ld: complexity };

        } catch (error) {
            throw error;
        }

    }

    /**
    * @description function to break text
    * into sentences
    * @param {string}  text 
    * @returns {Array} array of sentences
    */
    public breakTextIntoSentences(text: string) {
        try {

            let sentencesArr: string[] = [];
            let sentenceCount: number = 0;

            for (let word of text) {
                if (sentenceSeparator.includes(word)) { //check for sentence seperator to break text into sentences
                    if (sentencesArr[sentenceCount]) {
                        sentenceCount++;
                    }
                }
                else {
                    sentencesArr[sentenceCount] = sentencesArr[sentenceCount] ? sentencesArr[sentenceCount] + word : word;
                }
            }

            return sentencesArr;
        } catch (error) {
            throw error;

        }
    }


    /**
     * @description function to calculate 
     * complexity based on words array and 
     * non lexical words
     * @param {string} words string
     * @param {string[]} nonLexicalWords string[]
     * @returns {number} lexical density
     */
    public async calculateComplexity(words: string) {
        try {
            let lexicalCount = 0;
            let wordsArr = words ? words.split(' ') : [];
            if (wordsArr.length == 0) return "0.00";
            let wordsArrCount = 0;

            let nonLexicalWords: ILexical[] = await LexicalModel.find({}, { _id: 0 }).lean(); //get all non lexical words from db
            let nonLexicalWordsArr = nonLexicalWords.map(element => element.word);


            for (let word of wordsArr) {
                if (!sentenceSeparator.includes(word)) {
                    wordsArrCount++;
                    if (!nonLexicalWordsArr.includes(word.trim())) {
                        lexicalCount++;
                    }
                }
            }
            let complexity = wordsArrCount === 0 ? "0.00" : (lexicalCount / wordsArrCount).toFixed(2); //calculating density
            return complexity;
        } catch (error) {
            throw error;

        }

    }




}
