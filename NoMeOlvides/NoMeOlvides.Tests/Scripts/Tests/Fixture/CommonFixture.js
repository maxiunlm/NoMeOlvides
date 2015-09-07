var neverCalled = 0;
var calledOnce = 1;
var calledTwice = 2;
var calledThreeTimes = 3;
var stringEmpty = '';
var whiteSpace = ' ';
var exception = new Error('exception');
var exceptionTypeError = new TypeError('TypeError exception');
var applicationNamePath = "/";
var notFoundIndex = -1;
var firstItemIndex = 0;
var secondItemIndex = 1;
var thirdItemIndex = 2;
var fourthItemIndex = 3;
var fifthItemIndex = 4;
var emptyItemsCount = 0;
var oneItemCount = 1;
var twoItemsCount = 2;
var callBackErrorData = null;
var callBackSuccessData = null;
var startIndexOf = 0;
var confirmationOk = true;
var confirmationCancel = false;
var stringResult = 'result';
var errorMessage1 = 'Error message 1';
var errorMessage2 = 'Error message 2';
var callBackSuccessDataWithoutError = {
    "Errors": {
        "HasError": false,
        "Messages": []
    }
};
var callBackSuccessDataWithError = {
    "Errors": {
        "HasError": true,
        "Messages": [errorMessage1]
    }
};
var callBackSuccessDataWithTwoErrors = {
    "Errors": {
        "HasError": true,
        "Messages": [errorMessage1, errorMessage2]
    }
};

var httpMock = {};
httpMock.delete = function (uri, form) {
    return this;
};
httpMock.get = function (uri, form) {
    return this;
};
httpMock.post = function (uri, form) {
    return this;
};
httpMock.put = function (uri, form) {
    return this;
};
httpMock.success = function (callBack) {
    if (callBack && callBackSuccessData != null) {
        callBack(callBackSuccessData);
    }
    return this;
};
httpMock.error = function (callBack) {
    if (callBack && callBackErrorData != null) {
        callBack(callBackErrorData);
    }
    return this;
};
