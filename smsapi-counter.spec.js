/* eslint-env es6, jest */

let counter;
let textarea;

const someGsmCharacter = 'a';
const someUnicodeCharacter = 'Ж';

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
        it.each([
            [150, 10, 1],
            [160, 0, 1],
            [161, 145, 2],
            [306, 0, 2],
            [307, 152, 3],
            [459, 0, 3]
        ])(
            'message with %s characters should left %s character(s) and take %s part(s)',
            (messageLength, expectedCharactersLeft, expectedParts) => {
                // given
                textarea.value = someGsmCharacter.repeat(messageLength);

                // when
                require('./smsapi-counter.js');

                // then
                expect(counter.innerHTML).toEqual(`${expectedCharactersLeft}/${expectedParts}`);
            },
        );
    });
});