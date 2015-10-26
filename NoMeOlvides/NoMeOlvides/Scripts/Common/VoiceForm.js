// TODO: TDD !!!
var VoiceForm = function (translate, fields) {
    //"use strict"; // see strict mode
    //this.thisVoiceForm = this;
    this.translate = translate;
    this.fields = fields;
    this.fillCommand = '';
}

VoiceForm.prototype.loadDescriptionItemList = function (field, index, list) {
    field.Description = this.translate.instant(field.TranslateKey).toLowerCase();
};

VoiceForm.prototype.loadCommands = function (translate) { // TODO: TDD !!!
    this.fillCommand = translate.instant('fillCommand') || 'cargar';
}

VoiceForm.prototype.loadDataFromTanslate = function (translate) {
    this.translate = translate;

    this.loadCommands(translate);
    _.each(this.fields, this.loadDescriptionItemList);
};

VoiceForm.prototype.wrongCommandRised = function (commandName, finalCommand, command) {
    // You must override this method if you want to do something
};

VoiceForm.prototype.prepareInputTypeNumberValue = function (inputTag, inputValue) {
    if (inputTag.type === 'number') {
        inputValue = inputValue.replace(/ /g, '');
    }

    return inputValue
};

VoiceForm.prototype.commandRised = function (inputCommand, commandName) {
    inputCommand = inputCommand.replace(commandName, '').trim();

    var inputDescription = inputCommand.split(' ')[0];
    var inputValue = inputCommand.replace(inputDescription, '').trim();
    var inputId = _.findWhere(this.fields, { "Description": inputDescription.toLowerCase() }).Id;
    var inputTag = document.getElementById(inputId);

    inputValue = this.prepareInputTypeNumberValue(inputTag, inputValue);

    inputTag.value = inputValue;
};

VoiceForm.prototype.evalCommand = function (command) {
    var inputCommand = command.trim();
    var commandName = inputCommand.split(' ')[0];
    var finalCommand = commandName.toLowerCase()

    if (this.fillCommand === finalCommand) {
        this.commandRised(inputCommand, commandName);
    }
    else {
        this.wrongCommandRised(commandName, finalCommand, command);
    }
};