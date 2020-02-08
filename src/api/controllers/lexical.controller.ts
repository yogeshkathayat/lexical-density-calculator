import { Request, Response } from "express";
import ResponseHandler from "../../util/responseHandler";
import * as HttpStatus from "http-status";
import {
    errorMessage,
    version
} from "../../config/constants";
import logger from "../../config/logger";
import { LexicalService } from "../services/lexical.service";
import lexicalValidation from "../validations/lexical.validation";

const lexicalService = new LexicalService();

const fileName = "[lexical.controller.js]";


/**
 * LexicalController class
 * contains methods related to
 * Lexical complexity 
 * @class
 */
export class LexicalController {


    /**
     * @description function to find the lexical complexity of a text
     * @param {Request} req req object containing text field
     * @param {Response} res response object
     */
    public async findComplexity(req: Request, res: Response) {
        const methodName = "[findComplexity]";
        try {
            if (!lexicalValidation('findComplexity', req)) { //validating req parameters
                return ResponseHandler.setResponse(res, false, HttpStatus.BAD_REQUEST, errorMessage.FAILED, version.v1, { error: 'Invalid Request Parameters' });
            }
            if (req.body &&
                req.body.text &&
                (req.body.text.length >= 1000 ||
                    req.body.text.split(' ').length >= 100) //validating length of text
            ) {
                return ResponseHandler.setResponse(res, false, HttpStatus.BAD_REQUEST, errorMessage.FAILED, version.v1, { error: 'Only texts with up to 100 words or up to 1000 characters are valid input.' });

            }
            let lexicalDensity = {};
            if (req.query.mode && req.query.mode === 'verbose') { //if mode is verbose find lexical density of sentences
                lexicalDensity = await lexicalService.findComplexitySentence(req.body.text.toLowerCase());
            }
            else { //find overall lexical density
                lexicalDensity = await lexicalService.findComplexity(req.body.text.toLowerCase());

            }
            return ResponseHandler.setResponse(res, true, HttpStatus.OK, errorMessage.SUCCESS, version.v1, lexicalDensity);
        }
        catch (error) {
            logger.error(fileName + methodName + ":error in main try block:" + `${error}`);
            return ResponseHandler.setResponse(res, false, HttpStatus.INTERNAL_SERVER_ERROR, `${error}`, version.v1, {});
        }
    }



}