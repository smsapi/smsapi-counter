/* eslint-env es6, jest */

let counter;
let textarea;

const singleSmsLength = 160;

describe('smsapi-counter', () => {
    beforeEach(() => {
        jest.resetModules();

        document.body.innerHTML =
            '<div>' +
            '  <textarea rows="10" cols="50" data-cv-sms-textarea></textarea>' +
            '  <h2 data-cv-sms-counter></h2>' +
            '</div>';

        counter = document.querySelector('[data-cv-sms-counter]');
        textarea = document.querySelector('[data-cv-sms-textarea]');
    });

    it('should activate when data-cv-sms attributes are specified', () => {
        // when
        require('./smsapi-counter.js');

        // then
        expect(counter.innerHTML).toEqual('160/1');
    });

    describe('when only gsm characters are used', () => {
        it('should calculate single sms left characters', () => {
            // given
            const someGsmOnlyCharacters = '1234567890abcAbc';

            // when
            textarea.value = someGsmOnlyCharacters;
            require('./smsapi-counter.js');

            // then
            expect(counter.innerHTML).toEqual(
                `${singleSmsLength - someGsmOnlyCharacters.length}/1`
            );
        });
    });
});
