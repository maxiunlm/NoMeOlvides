/// <reference path='../../../NoMeOlvides/Scripts/underscore.js' />
/// <reference path='Fixture/CommonFixture.js' />
/// <reference path='Fixture/VoiceFormFixture.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Common/VoiceForm.js' />

describe('VoiceForm - ', function () {
    var sut;

    beforeEach(function () { });

    describe('CONSTRUCTOR - ', function () {
        beforeEach(function () {
            sut = new VoiceForm();
        });

        it('Initialize "fields" attribute default Object value', function () {


            expect(sut.fields).toBeDefined();
            expect(sut.fields[aliasIndex].Id).toEqual('Alias');
            expect(sut.fields[aliasIndex].TranslateKey).toEqual('alias');
            expect(sut.fields[aliasIndex].Description).toEqual('');
            expect(sut.fields[nameIndex].Id).toEqual('Name');
            expect(sut.fields[nameIndex].TranslateKey).toEqual('name');
            expect(sut.fields[nameIndex].Description).toEqual('');
            expect(sut.fields[surnameIndex].Id).toEqual('Surname');
            expect(sut.fields[surnameIndex].TranslateKey).toEqual('surname');
            expect(sut.fields[surnameIndex].Description).toEqual('');
            expect(sut.fields[emailIndex].Id).toEqual('Email');
            expect(sut.fields[emailIndex].TranslateKey).toEqual('email');
            expect(sut.fields[emailIndex].Description).toEqual('');
            expect(sut.fields[phoneIndex].Id).toEqual('Phone');
            expect(sut.fields[phoneIndex].TranslateKey).toEqual('phone');
            expect(sut.fields[phoneIndex].Description).toEqual('');
            expect(sut.fields[cellphoneIndex].Id).toEqual('Cellphone');
            expect(sut.fields[cellphoneIndex].TranslateKey).toEqual('cellphone');
            expect(sut.fields[cellphoneIndex].Description).toEqual('');
            expect(sut.fields[addressIndex].Id).toEqual('Address');
            expect(sut.fields[addressIndex].TranslateKey).toEqual('address');
            expect(sut.fields[addressIndex].Description).toEqual('');
            expect(sut.fields[passwordIndex].Id).toEqual('Password');
            expect(sut.fields[passwordIndex].TranslateKey).toEqual('password');
            expect(sut.fields[passwordIndex].Description).toEqual('');
        });

        it('Initialize "fillCommand" attribute default Object value', function () {


            expect(sut.fillCommand).toBeDefined();
            expect(sut.fillCommand).toEqual(stringEmpty);
        });
    });

    describe('loadDataFromTanslate - ', function () {
        beforeEach(function () {
            sut = new VoiceForm();
        });

        it('Without parameters throws exception', function () {

            expect(function () { sut.loadDataFromTanslate(); }).toThrowError(TypeError);

        });

        it('With the correct parameters invokes "_.each" method', function () {
            spyOn(_, 'each').and.callThrough();
            spyOn(sut, 'loadDescriptionItemList').and.callFake(function () { });

            sut.loadDataFromTanslate(translateFake);

            expect(_.each).toHaveBeenCalled();
        });

        it('With the correct parameters assign "translate" attribute', function () {
            spyOn(sut, 'loadDescriptionItemList').and.callFake(function () { });

            sut.loadDataFromTanslate(translateFake);

            expect(sut.translate).toBe(translateFake);
        });

        it('With the correct parameters invokes "loadCommands" method', function () {
            var indexCall = 0;
            spyOn(sut, 'loadCommands').and.callThrough();
            spyOn(sut, 'loadDescriptionItemList').and.callFake(function (field) { });

            sut.loadDataFromTanslate(translateFake);

            expect(sut.loadCommands).toHaveBeenCalledWith(translateFake);
        });

        it('For each "item field" invokes "loadDescriptionItemList" method', function () {
            var indexCall = 0;
            spyOn(sut, 'loadDescriptionItemList').and.callFake(function (field) { });

            sut.loadDataFromTanslate(translateFake);

            _.each(sut.fields, function (field) {
                expect(sut.loadDescriptionItemList).toHaveBeenCalledWith(field, indexCall, sut.fields);
                indexCall++;
            });
        });

        it('For each "item field" set the "Description" value for each "item field"', function () {
            spyOn(sut, 'loadDescriptionItemList').and.callFake(function (field, index, fields) {
                sut.fields[index].Description = translateFake.instant(field.TranslateKey);
            });

            sut.loadDataFromTanslate(translateFake);

            _.each(sut.fields, function (field) {
                expect(field.Description).toEqual(translateFake.instant(field.TranslateKey));
            });
        });
    });

    describe('loadCommands', function () {
        beforeEach(function () {
            sut = new VoiceForm();
        });

        it('Without parameters throws an exception', function () {

            expect(function () { sut.loadCommands(); }).toThrowError(TypeError);

        });

        it('With a null parameter thorws an exception', function () {

            expect(function () { sut.loadCommands(null); }).toThrowError(TypeError);

        });

        it('With an empty parameter thorws an exception', function () {

            expect(function () { sut.loadCommands(stringEmpty); }).toThrowError(TypeError);

        });

        it('With the correct "tranlate" parameter invokes "translate.instant" method', function () {
            spyOn(translateFake, 'instant').and.callThrough();

            sut.loadCommands(translateFake)

            expect(translateFake.instant).toHaveBeenCalledWith(fillCommandName);
        });

        it('With the correct "tranlate" parameter set the "fillCommand" value', function () {

            sut.loadCommands(translateFake);

            expect(sut.fillCommand).toEqual(fillCommand);
        });
    });

    describe('loadDescriptionItemList - ', function () {
        beforeEach(function () {
            sut = new VoiceForm();
        });

        it('Without parameters throws exception', function () {

            expect(function () { sut.loadDescriptionItemList(); }).toThrowError(TypeError);

        });

        it('For an "item field" invokes "translate.instant" method', function () {
            sut.translate = translateFake;
            spyOn(translateFake, 'instant').and.callThrough();

            sut.loadDescriptionItemList(sut.fields[firstItemIndex]);

            expect(translateFake.instant).toHaveBeenCalledWith(sut.fields[firstItemIndex].TranslateKey);
        });

        it('For an "item field" invokes "toLowerCase" method', function () {
            sut.translate = translateFake;
            spyOn(String.prototype, 'toLowerCase').and.callThrough();

            sut.loadDescriptionItemList(sut.fields[firstItemIndex]);

            expect(String.prototype.toLowerCase).toHaveBeenCalled();
        });

        it('For an "item field" set the "Description" value to the "item field"', function () {
            sut.translate = translateFake;
            spyOn(translateFake, 'instant').and.callThrough();

            sut.loadDescriptionItemList(sut.fields[firstItemIndex], firstItemIndex, sut.fields);

            expect(sut.fields[firstItemIndex].Description).not.toEqual(translateFake.instant(sut.fields[firstItemIndex].TranslateKey));
            expect(sut.fields[firstItemIndex].Description).toEqual(translateFake.instant(sut.fields[firstItemIndex].TranslateKey).toLowerCase());
        });
    });

    describe('evalCommand - ', function () {
        beforeEach(function () {
            sut = new VoiceForm();
        });

        it('Without parameters throws an exception', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();

            expect(function () { sut.evalCommand(); }).toThrowError(TypeError);

        });

        it('Without initialize the "sut" object and an empty parameter thorws an exception', function () {

            expect(function () { sut.evalCommand(stringEmpty); }).toThrowError(TypeError);

        });

        it('With a null parameter thorws an exception', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();

            expect(function () { sut.evalCommand(null); }).toThrowError(TypeError);

        });

        it('With an empty parameter invokes "wrongCommandRised" method', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();
            spyOn(sut, 'wrongCommandRised').and.callThrough();

            sut.evalCommand(stringEmpty);

            expect(sut.wrongCommandRised).toHaveBeenCalledWith(stringEmpty, stringEmpty, stringEmpty);
        });

        it('With a wrong "command" invokes "wrongCommandRised" method', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();
            spyOn(sut, 'wrongCommandRised').and.callThrough();

            sut.evalCommand(wrongCommand);

            expect(sut.wrongCommandRised).toHaveBeenCalledWith(wrongCommandName, wrongCommandName.toLowerCase(), wrongCommand);
        });

        it('With a "command" with only its type thorws an exception', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();

            expect(function () { sut.evalCommand(fillCommand); }).toThrowError(TypeError);

        });

        it('With a correct "command" invokes its "trim" method', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();
            spyOn(String.prototype, 'trim').and.callThrough();
            spyOn(document, 'getElementById').and.callFake(function (inputId) {
                var inputTag = document.createElement('input');
                inputTag.id = inputId;

                return inputTag;
            });

            sut.evalCommand(correctCommand);

            expect(String.prototype.trim).toHaveBeenCalled();
        });

        it('With a correct "command" invokes the "split" method', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();
            spyOn(String.prototype, 'split').and.callThrough();
            spyOn(document, 'getElementById').and.callFake(function (inputId) {
                var inputTag = document.createElement('input');
                inputTag.id = inputId;

                return inputTag;
            });

            sut.evalCommand(correctCommand);

            expect(String.prototype.split).toHaveBeenCalledWith(whiteSpace);
            //expect(String.prototype.split.calls.count()).toEqual(calledTwice);
            //expect(String.prototype.split.calls.argsFor(firstItemIndex)).toEqual([whiteSpace]);
            //expect(String.prototype.split.calls.argsFor(secondItemIndex)).toEqual([whiteSpace]);
        });

        it('With a correct "command" invokes the "toLowerCase" from an internal variable', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();
            spyOn(String.prototype, 'toLowerCase').and.callThrough();
            spyOn(document, 'getElementById').and.callFake(function (inputId) {
                var inputTag = document.createElement('input');
                inputTag.id = inputId;

                return inputTag;
            });

            sut.evalCommand(correctCommand);

            expect(String.prototype.toLowerCase).toHaveBeenCalled();
        });

        it('With a correct "command" invokes the "commandRised" method', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();
            spyOn(sut, 'commandRised').and.callThrough();
            spyOn(document, 'getElementById').and.callFake(function (inputId) {
                var inputTag = document.createElement('input');
                inputTag.id = inputId;

                return inputTag;
            });

            sut.evalCommand(correctCommand);

            expect(sut.commandRised).toHaveBeenCalledWith(correctCommand.trim(), fillCommand);
        });
    });

    describe('commandRised - ', function () {
        beforeEach(function () {
            sut = new VoiceForm();
        });

        it('Without parameters throws an exception', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();

            expect(function () { sut.commandRised(); }).toThrowError(TypeError);

        });

        it('With a correct "command" invokes its "trim" method twice', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();
            spyOn(String.prototype, 'trim').and.callThrough();
            spyOn(document, 'getElementById').and.callFake(function (inputId) {
                var inputTag = document.createElement('input');
                inputTag.id = inputId;

                return inputTag;
            });

            sut.commandRised(correctCommand, fillCommand);

            expect(String.prototype.trim.calls.count()).toEqual(calledTwice);
        });

        it('With a correct "command" invokes the "split"', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();
            spyOn(String.prototype, 'split').and.callThrough();
            spyOn(document, 'getElementById').and.callFake(function (inputId) {
                var inputTag = document.createElement('input');
                inputTag.id = inputId;

                return inputTag;
            });

            sut.commandRised(correctCommand.trim(), fillCommand);

            expect(String.prototype.split).toHaveBeenCalledWith(whiteSpace);
        });

        it('With a correct "command" invokes the "toLowerCase" from an internal variable', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();
            spyOn(String.prototype, 'toLowerCase').and.callThrough();
            spyOn(document, 'getElementById').and.callFake(function (inputId) {
                var inputTag = document.createElement('input');
                inputTag.id = inputId;

                return inputTag;
            });

            sut.commandRised(correctCommand.trim(), fillCommand);

            expect(String.prototype.toLowerCase).toHaveBeenCalled();
        });

        it('With a correct "command" invokes the "replace" method to erase the "command name"  from the "command"', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();
            spyOn(String.prototype, 'replace').and.callThrough();
            spyOn(document, 'getElementById').and.callFake(function (inputId) {
                var inputTag = document.createElement('input');
                inputTag.id = inputId;

                return inputTag;
            });

            sut.commandRised(correctCommand.trim(), fillCommand);

            expect(String.prototype.replace).toHaveBeenCalledWith(fillCommand, stringEmpty);
        });

        it('With a correct "command" invokes the "replace" method to erase the "input tag id"  from the "command"', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();
            spyOn(String.prototype, 'replace').and.callThrough();
            spyOn(document, 'getElementById').and.callFake(function (inputId) {
                var inputTag = document.createElement('input');
                inputTag.id = inputId;

                return inputTag;
            });

            sut.commandRised(correctCommand.trim(), fillCommand);

            expect(String.prototype.replace).toHaveBeenCalledWith(aliasTranslateKey, stringEmpty);
        });

        it('With a correct "command" invokes the "_.findWhere" method to obtain the "input tag id" from the "command"', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();
            spyOn(_, 'findWhere').and.callThrough();
            spyOn(document, 'getElementById').and.callFake(function (inputId) {
                var inputTag = document.createElement('input');
                inputTag.type = inputTagTextType;
                inputTag.id = inputId;

                return inputTag;
            });

            sut.commandRised(correctCommand.trim(), fillCommand);

            expect(_.findWhere).toHaveBeenCalledWith(sut.fields, { "Description": aliasTranslateKey.toLowerCase() });
        });

        it('With a correct "command" invokes the "getElementById" method to obtain the "input tag"', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();
            spyOn(document, 'getElementById').and.callFake(function (inputId) {
                var inputTag = document.createElement('input');
                inputTag.type = inputTagTextType;
                inputTag.id = inputId;

                return inputTag;
            });

            sut.commandRised(correctCommand.trim(), fillCommand);

            expect(document.getElementById).toHaveBeenCalledWith(sut.fields[aliasIndex].Id);
        });

        it('With a correct "command" calls the "getElementById" and set the input text value', function () {
            var inputTag;
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();
            spyOn(document, 'getElementById').and.callFake(function (inputId) {
                inputTag = document.createElement('input');
                inputTag.id = inputId;

                return inputTag;
            });

            sut.commandRised(correctCommand.trim(), fillCommand);

            expect(inputTag.value).toEqual(commandText);
        });

        it('With a correct "command" invokes the "prepareInputTypeNumberValue" method', function () {
            var inputTag;
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();
            spyOn(document, 'getElementById').and.callFake(function (inputId) {
                inputTag = document.createElement('input');
                inputTag.id = inputId;
                inputTag.type = inputTagNumberType;

                return inputTag;
            });
            spyOn(sut, 'prepareInputTypeNumberValue').and.callThrough();

            sut.commandRised(numberCommand.trim(), fillCommand);

            expect(sut.prepareInputTypeNumberValue).toHaveBeenCalledWith(inputTag, commandNumberText.trim());
        });
    });

    describe('prepareInputTypeNumberValue - ', function () {
        beforeEach(function () {
            sut = new VoiceForm();
        });

        it('Without parameters throws an exception', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();

            expect(function () { sut.prepareInputTypeNumberValue(); }).toThrowError(TypeError);

        });

        it('With a null parameter thorws an exception', function () {
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();

            expect(function () { sut.prepareInputTypeNumberValue(null); }).toThrowError(TypeError);

        });

        it('For an input tag of number type invokes the "replace" method', function () {
            var inputTag = document.createElement('input');
            inputTag.type = inputTagNumberType;
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();
            spyOn(String.prototype, 'replace').and.callThrough();

            sut.prepareInputTypeNumberValue(inputTag, commandNumberText);

            expect(String.prototype.replace).toHaveBeenCalledWith(replacerAllWhiteSpacesPattern, stringEmpty);
        });

        it('For an input tag of number type calls the "replace" method to remove all the white spaces', function () {
            var inputTag = document.createElement('input');
            inputTag.type = inputTagNumberType;
            sut.fillCommand = fillCommand;
            sut.fields[aliasIndex].Description = aliasTranslateKey.toLowerCase();

            var result = sut.prepareInputTypeNumberValue(inputTag, commandNumberText);

            expect(result).toEqual(commandNumberText.replace(replacerAllWhiteSpacesPattern, stringEmpty));
        });
    });
});
