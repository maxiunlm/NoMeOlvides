var aliasIndex = 0;
var nameIndex = 1;
var surnameIndex = 2;
var emailIndex = 3;
var phoneIndex = 4;
var cellphoneIndex = 5;
var addressIndex = 6;
var passwordIndex = 7;
var replacerAllWhiteSpacesPattern = / /g;
var argentineSpanishLanguage = 'es-AR';
var inputTagTextType = 'text';
var inputTagNumberType = 'number';
var aliasTranslateKey = 'alias';
var fillCommandName = 'fillCommand';
var wrongCommandName = 'wrongCommand';
var fillCommand = 'fill';
var cargarCommand = 'cargar';
var wrongCommand = wrongCommandName + whiteSpace + aliasTranslateKey + whiteSpace + 'something';
var commandText = 'something';
var commandNumberText = ' 01 234 567 89 ';
var correctCommand = fillCommand + whiteSpace + aliasTranslateKey + whiteSpace + commandText;
var numberCommand = fillCommand + whiteSpace + aliasTranslateKey + whiteSpace + commandNumberText;
var fields = [
        { "Description": "Alias", "TranslateKey": aliasTranslateKey },
        { "Description": "Name", "TranslateKey": "name" },
        { "Description": "Surname", "TranslateKey": "surname" },
        { "Description": "Email", "TranslateKey": "email" },
        { "Description": "Phone", "TranslateKey": "phone" },
        { "Description": "Cellphone", "TranslateKey": "cellphone" },
        { "Description": "Address", "TranslateKey": "address" },
        { "Description": "Password", "TranslateKey": "password" }
];
var translateFake = {
    fields: fields,
    instant: function (elementTranslateKey) {
        if(elementTranslateKey === 'fillCommand') {
            return fillCommand;
        }

        return _.findWhere(this.fields, { TranslateKey: elementTranslateKey }).Description;
    },
    preferredLanguage: function () {
        return argentineSpanishLanguage;
    }
};
