import mongoose from "mongoose";
import("../../config/mongoose");
const Schema = mongoose.Schema;

export interface ILexical {
    _id: string,
    word: string;
    timestamp: Date;
  }

const lexicalWordSchema = new Schema({
    word: {
        type: String,
        required: true,
        trim: true,
    },
    timestamp: {type: Date, default: Date.now},
});

export const LexicalModel = mongoose.model("lexical", lexicalWordSchema);