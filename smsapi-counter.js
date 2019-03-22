var CVSMSCounter = (function() {
    var dataCvSmsTextarea = '[data-cv-sms-textarea]',
        dataCvSmsCounter = '[data-cv-sms-counter]',
        smsTextareasNodeList = document.querySelectorAll(dataCvSmsTextarea);

    var extendedGsmCharacters = /([\^\[\]{}~|\\€])/g;

    function hasUnicodeCharacters(string) {
        return /[^A-Z0-9_@£\$¥èéùìòÇØø\+%&\!"#'\(\)\*,\-\.ÅåÆæß¤:;<=>?¡ÄÖÑÜ§¿äöñüà€ΓΔΘΛΞΠΣΦΨΩαβγδεζηθικλμνξοπρστυφχψωςέάόίώύήϊϋΐΰΆΈΊΉΌΎΏXΥΡΟΝΜΚΗΖΕΙΤΑΧΒ\^\{\}\\\[~\]\|\/ \n\r]/gi.test(
            string
        );
    }

    if (smsTextareasNodeList.length) {
        var smsTextareasArray = [].slice.call(smsTextareasNodeList);

        if (smsTextareasArray.length === 1) {
            var cvSmsCounter = document.querySelectorAll(dataCvSmsCounter)[0];
            activate(smsTextareasArray[0], cvSmsCounter);
        }
    }

    function activate(smsTextarea, smsCounter) {
        if (smsTextarea === undefined || smsCounter === undefined) {
            throw new Error(
                'CVSMSCounter needs two arguments: textarea, and label characters counter'
            );
        }

        if (typeof smsTextarea === 'string' && typeof smsCounter === 'string') {
            smsTextarea = document.getElementById(smsTextarea);
            smsCounter = document.getElementById(smsCounter);

            if (smsTextarea === null || smsCounter === null) {
                throw new Error(
                    'CVSMSCounter: passed ID names have no corresponding HTML nodes in current DOM tree.'
                );
            }
        }

        countCharacters(smsTextarea, smsCounter);
        var eventsArray = ['keyup', 'change', 'paste'];

        eventsArray.forEach(function(event) {
            smsTextarea.addEventListener(
                event,
                function() {
                    countCharacters(this, smsCounter);
                },
                false
            );
        });
    }

    function countCharacters(textarea, counter) {
        var smsSettings = {},
            smsPartsCount,
            charactersLeft;

        const messageHasUnicodeCharacters = hasUnicodeCharacters(
            textarea.value
        );

        if (messageHasUnicodeCharacters) {
            smsSettings = {
                symbolsMaxCount: 402,
                singleSmsLength: 70,
                secondSmsLength: 64,
                manySmsLength: 67,
            };
        } else {
            smsSettings = {
                symbolsMaxCount: 918,
                singleSmsLength: 160,
                secondSmsLength: 147,
                manySmsLength: 153,
            };
        }

        if (textarea.value.length >= smsSettings.symbolsMaxCount) {
            textarea.value = textarea.value.substring(
                0,
                smsSettings.symbolsMaxCount
            );
        }

        var textareaValue = messageHasUnicodeCharacters
            ? textarea.value
            : textarea.value.replace(extendedGsmCharacters, ' $1');
        var textareaLength = textareaValue.length;

        smsPartsCount =
            textareaLength <= smsSettings.singleSmsLength
                ? 1
                : Math.ceil(textareaLength / smsSettings.manySmsLength);

        if (smsPartsCount === 1) {
            charactersLeft = smsSettings.singleSmsLength - textareaLength;
        } else if (smsPartsCount === 2) {
            charactersLeft =
                smsSettings.secondSmsLength -
                (textareaLength - smsSettings.singleSmsLength);
        } else if (smsPartsCount > 2) {
            charactersLeft =
                smsSettings.manySmsLength -
                (textareaLength -
                    smsSettings.manySmsLength * (smsPartsCount - 1));
        }

        counter.innerHTML = charactersLeft + '/' + smsPartsCount;
    }

    return {
        activate: activate,
    };
})();
