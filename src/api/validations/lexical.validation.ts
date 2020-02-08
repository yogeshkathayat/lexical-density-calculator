
import { Request, Response } from "express";

const lexicalValidation = (method: string, req: Request) => {
    switch (method) {
        case "findComplexity": {
            if (req) {
                if (!req.body.text) return false;
                return true;
            }
        }
    }
};
export default lexicalValidation;