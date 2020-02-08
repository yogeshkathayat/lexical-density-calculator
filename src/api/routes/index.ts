import express from "express";
import lexicalRoute from "./lexical.route";

const router = express.Router();

/**
 * GET v1/health
 */
router.get("/health", (req, res) => res.status(200).send("OK"));
/**
 * GET v1/docs
 */
router.use("/docs", express.static("docs"));

router.use("/lexical", lexicalRoute);



export default router;
