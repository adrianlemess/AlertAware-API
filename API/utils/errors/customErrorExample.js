const Promise = require('bluebird');

class myCustomError extends Error {
    constructor(options) {
        super();
        this.errors = options.error;
        this.name = "MyCustomError";
    }
}


function myCustomErrorUseExample(apiRest, options) {
    function emulateError() {
        return new Promise(function myPromise(resolve, reject) {
            throw new myCustomError({
                errors: [{
                    card_number: "número inválido"
                }]
            })
        })
    }
    emulateError();
}

myCustomErrorUseExample()
    .then(console.log)
    .catch(TypeError, respondValidatorError)
    .catch(myCustomError, handleError)
    .catch(Error, respondInternalServerError)

function handleError(err) {
    //catch chain don't need if
    // if (err instanceof TypeError) {
    //     console.log(err);
    //     return
    // }
    console.log(err.name);
    console.log(err.errors);
    console.log(err.stack);
}

function respondValidatorError (err){
    console.log(err);
}

function respondInternalServerError(err){
    console.log(err);
}

/*
EvalError
Creates an instance representing an error that occurs regarding the global function eval().
InternalError 
Creates an instance representing an error that occurs when an internal error in the JavaScript engine is thrown. E.g. "too much recursion".
RangeError
Creates an instance representing an error that occurs when a numeric variable or parameter is outside of its valid range.
ReferenceError
Creates an instance representing an error that occurs when de-referencing an invalid reference.
SyntaxError
Creates an instance representing a syntax error that occurs while parsing code in eval().
TypeError
Creates an instance representing an error that occurs when a variable or parameter is not of a valid type.
URIError
Creates an instance representing an error that occurs when encodeURI() or decodeURI() are passed invalid parameters. */