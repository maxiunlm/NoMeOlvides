/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/jquery-2.1.4.js' />
/// <chutzpah_reference path='../../../NoMeOlvides/Scripts/Common/ErrorManager.js" />


var errorMessage = "Error message";

describe('ErrorManagerSingleton', function () {
    it('onGenealErrorEvent - Call the alert method of window object with a message that starts with "ERROR: "', function () {
        spyOn(window, 'alert');

        ErrorManager.getInstance().onGenealErrorEvent(errorMessage);

        expect(window.alert).toHaveBeenCalledWith('ERROR: ' + errorMessage);
    });
});
