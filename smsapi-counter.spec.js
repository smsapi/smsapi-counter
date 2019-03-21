/* eslint-env es6, jest */

describe('smsapi-counter', () => {
    beforeEach(() => {
        document.body.innerHTML =
            '<div>' +
            '  <textarea rows="10" cols="50" data-cv-sms-textarea></textarea>' +
            '  <h2 data-cv-sms-counter></h2>' +
            '</div>';
    });

    it('should activate when data-cv-sms attributes are specified', () => {
        require('./smsapi-counter.js');

        const counterElement = document.querySelector('[data-cv-sms-counter]');

        expect(counterElement.innerHTML).toEqual('160/1');
    });
});
