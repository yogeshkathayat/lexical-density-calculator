import express from "express";
import { LexicalController } from "../controllers/lexical.controller";
const router = express.Router();
const lexicalController = new LexicalController();


/**
 * @api {post} /api/v1/lexical/complexity find lexical complexity
 * @apiDescription find complexity
 * @apiVersion 1.0.0
 * @apiName complexity
 * @apiGroup lexical
 * @apiPermission public
 *
 * @apiParam  {String}      mode(optional)          'verbose'
 *
 *
 * @apiSuccess  {String}      sentence_ld(optional)       lexical density of sentences
 * @apiSuccess  {String}      overall_ld                  lexical density of overall text
 *
 *
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 *
 *  @apiErrorExample {json} List error
 *    {
 *    "status": false,
 *    "code": 400,
 *    "appVersion": "v1.0.0",
 *    "message": "value must have at least 4 children",
 *    "data": []
 *    }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "status": true,
 *  "code": 200,
 *  "message": "Sucess",
 *  "appVersion": "v1.0.0",
 *  "data":
 *    {
 *        "sentence_ld": [
 *            "0.67",
 *            "0.50",
 *            "1.00"
 *        ],
 *        "overall_ld": "0.63"
    }
 * }
 *
 */
router.route("/complexity")
    .post( lexicalController.findComplexity);



export default router;