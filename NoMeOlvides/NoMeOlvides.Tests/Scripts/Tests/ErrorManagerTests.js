/// <reference path='../../../NoMeOlvides/Scripts/jquery-2.1.4.js' />
/// <reference path='../../../NoMeOlvides/Scripts/Common/ErrorManager.js" />
/// <reference path="Fixture/CommonFixture.js" />

describe('ErrorManagerSingleton', function () {
    it('onGenealErrorEvent -  with a string message  - Invokes the alert method of window object showing it with "ERROR: " before the message', function () {
        spyOn(window, 'alert');

        ErrorManager.getInstance().onGenealErrorEvent(errorMessage1);

        expect(window.alert).toHaveBeenCalledWith('ERROR: ' + errorMessage1);
    });

    it('onGenealErrorEvent - with a controled error by developer with one message - Invokes the alert method of window object showing it with "ERROR: " before the message', function () {
        spyOn(window, 'alert');

        ErrorManager.getInstance().onGenealErrorEvent(callBackSuccessDataWithError);

        expect(window.alert).toHaveBeenCalledWith('ERROR: ' + callBackSuccessDataWithError.Errors.Messages[firstItemIndex]);
    });

    it('onGenealErrorEvent - with a controled error by developer with two messages - Invokes the alert method of window object showing it with "ERROR: " before the message', function () {
        spyOn(window, 'alert');

        ErrorManager.getInstance().onGenealErrorEvent(callBackSuccessDataWithTwoErrors);

        expect(window.alert).toHaveBeenCalledWith('ERROR: ' + callBackSuccessDataWithTwoErrors.Errors.Messages.join('\n\t* '));
    });
});
