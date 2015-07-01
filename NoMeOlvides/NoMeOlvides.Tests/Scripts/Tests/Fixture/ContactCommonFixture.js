var contacts = [];
var Contact = {};
var applicationNamePath = "/";
var firstItemIndex = 0;
var secondItemIndex = 1;
var emptyItemsCount = 0;
var oneItemCount = 1;
var twoItemsCount = 2;
var callBackErrorData = null;
var callBackSuccessData = null;
var contactId = "5582a9d8dbe53f1b8059d787";
var errorMessage1 = "Error message 1";
var errorMessage2 = "Error message 2";
var callBackSuccessDataWithoutError = { "Errors": { "HasError": false } };
var callBackSuccessDataWithError = { "Errors": { "HasError": true, "Messages": ["Has an Error"] } };
var firstContact = {
    "Id": "5580024fdbe5410c9ca00b4d",
    "Alias": "El Mazzi (6)",
    "Name": "Maximiliano",
    "Surname": "Gauna",
    "Email": "maxiunlm@gmail.com",
    "Phone": 666,
    "CellPhone": 666,
    "Address": "Trulala 666",
    "Password": "Secret... SHHHH!!!!"
};
var secondContact = {
    "Id": "5580083cdbe5412c347db261",
    "Alias": "KB",
    "Name": "Kill",
    "Surname": "Bill",
    "Email": "a@a.com",
    "Phone": 6662,
    "CellPhone": 6662,
    "Address": "Trulala 6662",
    "Password": "Secret2... SHHHH!!!!"
};
var httpDataResultOk = {
    "Contact": {
        "Id": contactId
    },
    "Errors": {
        "HasError": false,
        "Messages": []
    }
};
var httpDataResultErrorX1 = {
    "Contact": {
        "Id": null
    },
    "Errors": {
        "HasError": true,
        "Messages": [
            errorMessage1
        ]
    }
};
var httpDataResultErrorX2 = {
    "Contact": {
        "Id": null
    },
    "Errors": {
        "HasError": true,
        "Messages": [
            errorMessage1,
            errorMessage2
        ]
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
