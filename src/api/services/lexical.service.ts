
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

            let nonLexicalWords: ILexical[] = await LexicalModel.find({}, { _id: 0 }).lean();
            let nonLexicalWordsArr = nonLexicalWords.map(element => element.word);

            let complexity = this.calculateComplexity(text, nonLexicalWordsArr);
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

            let nonLexicalWords: ILexical[] = await LexicalModel.find({}, { _id: 0 }).lean();
            let nonLexicalWordsArr = nonLexicalWords.map(element => element.word);

            let complexity = this.calculateComplexity(text.trim(), nonLexicalWordsArr); //calculate overall density
            let sentenceArray = this.breakTextIntoSentences(text); //breaking text into sentences

            let complexityArr = sentenceArray.map(words => this.calculateComplexity(words.trim(), nonLexicalWordsArr)) //calculate density for each sentence

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
    private breakTextIntoSentences(text: string) {
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
    private calculateComplexity(words: string, nonLexicalWords: string[]) {
        try {
            let lexicalCount = 0;
            let wordsArr = words.split(' ');
            let wordsArrCount = 0;
            for (let word of wordsArr) {
                if (!sentenceSeparator.includes(word)) {
                    wordsArrCount++;
                    if (!nonLexicalWords.includes(word.trim())) {
                        lexicalCount++;
                    }
                }
            }
            let complexity = wordsArrCount === 0 ? 0.0 : (lexicalCount / wordsArrCount).toFixed(2); //calculating density
            return complexity;
        } catch (error) {
            throw error;

        }

    }




}
