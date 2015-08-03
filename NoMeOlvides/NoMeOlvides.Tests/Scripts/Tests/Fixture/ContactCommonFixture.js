/// <reference path="CommonFixture.js" />

var contacts = [];
var Contact = {};

var contactId = "5582a9d8dbe53f1b8059d787";
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
var contactListX0 = [];
var contactListX1 = [firstContact];
var contactListX2 = [firstContact, secondContact];
var httpDataResultOk = {
    "Contact": {
        "Id": contactId
    },
    "Errors": callBackSuccessDataWithoutError.Errors
};
var httpDataResultErrorX1 = {
    "Contact": {
        "Id": null
    },
    "Errors": callBackSuccessDataWithError.Errors
};
var httpDataResultErrorX2 = {
    "Contact": {
        "Id": null
    },
    "Errors": callBackSuccessDataWithTwoErrors.Errors
};
