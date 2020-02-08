import { LexicalService } from "../src/api/services/lexical.service";

const lexicalService = new LexicalService();


describe('calculateComplexity function', () => {
    it('should return complexity 0.67', async () => {
        let words = 'kim loves going to the cinema';
        const result = await lexicalService.calculateComplexity(words)
        expect(result).toEqual("0.67");
    });

    it('should return complexity of 1', async () => {
        let words = 'yes';
        const result = await lexicalService.calculateComplexity(words)
        expect(result).toEqual("1.00");
    });

    it('should return complexity of 0.50', async () => {
        let words = 'dog is not running';
        const result = await lexicalService.calculateComplexity(words)
        expect(result).toEqual("0.50");
    });

    it('should return complexity of 0.00', async () => {
        let words = '';
        const result = await lexicalService.calculateComplexity(words)
        expect(result).toEqual("0.00");
    });

    it('should return complexity of 0.00', async () => {
        let words = '?';
        const result = await lexicalService.calculateComplexity(words)
        expect(result).toEqual("0.00");
    });
});




describe('breakTextIntoSentences method ', () => {

    it('should return 0 sentence', () => {
        let text = '';
        const result = lexicalService.breakTextIntoSentences(text)
        expect(result.length).toEqual(0);
    });
    it('should return 1 sentence', () => {
        let text = 'this is just a random text';
        const result = lexicalService.breakTextIntoSentences(text)
        expect(result.length).toEqual(1);
    });

    it('should return 2 sentence', () => {
        let text = 'this is just a random text. ok';
        const result = lexicalService.breakTextIntoSentences(text)
        expect(result.length).toEqual(2);
    });


    it('should return 2 sentence', () => {
        let text = 'this is just a random text.... ok';
        const result = lexicalService.breakTextIntoSentences(text)
        expect(result.length).toEqual(2);
    });

    it('should return 0 sentence', () => {
        let text = '.?';
        const result = lexicalService.breakTextIntoSentences(text)
        expect(result.length).toEqual(0);
    });


    it('should return 3 sentence', () => {
        let text = 'Hi ! I just used lexical service. ok';
        const result = lexicalService.breakTextIntoSentences(text)
        expect(result.length).toEqual(3);
    });
});