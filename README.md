# lexical-density-calculator
calculate lexical density of a text

## Requirements
● Route: /complexity
○ Description:
Return the lexical density of the inputted text. The input text should be
provided via the request.
○ output :

    { “data”:{
        overall_ld: 0.42
        }
    }

● Route: /complexity?mode=verbose
○ Description:
Return the lexical density of the text broken down into sentences. The input
text should be provided via the request.
○ output :

    { “data”:{
            sentence_ld: [ 0.23, 0.1, 1.0, 0.0],
            overall_ld: 0.42
        }
    }

● Error case: Only texts with up to 100 words or up to 1000 characters are valid input.
Please cover these cases with tests using the framework of your choice.
● Storage: The provided non-lexical words should be stored in a Mongo DB. If time
allows, please provide a protected endpoint where new words can be added over
time.

## Built With
- Node.js (v12.14.1)
- Typescript
- Express
- Mongoose
- Jest with Supertest for unit testing and coverage


## Dependency Installation

```bash
$ yarn 
```
## Running the app

```bash
# build app
$ yarn build

# start app
$ yarn start

```
## Testing the app

```bash
# unit tests with coverage
$ yarn test

```

## Docs

```bash
# api doc
$ yarn docs

```


## Api Routes

To calculate the lexical complexity of overall text:

    POST localhost:3000/api/v1/lexical/complexity
    Request Body : 
    {
	    "text": "kim loves going to the cinema"
    }
    
    Response : 
    {
        "status": true,
        "code": 200,
        "message": "Sucess",
        "appVersion": "v1.0.0",
        "data": {
            "overall_ld": "0.67"
        }   
    }


To calculate the lexical complexity with mode=verbose:

    POST localhost:3000/api/v1/lexical/complexity?mode=verbose
    Request Body : 
    {
	    "text": "kim loves going to the cinema. ok"
    }
    
    Response : 
    {
        "status": true,
        "code": 200,
        "message": "Sucess",
        "appVersion": "v1.0.0",
        "data": {
            "sentence_ld": [
                "0.67",
                "1.00"
            ],
            "overall_ld": "0.71"
        }
    }


## unit tests with coverage report

![Unit Test with coverage](https://github.com/yogeshkathayat/lexical-density-calculator/raw/master/test-coverage.png)
