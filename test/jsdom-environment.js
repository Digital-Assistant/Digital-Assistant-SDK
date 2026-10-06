const JSDOMEnvironment = require('jest-environment-jsdom').default;

class UDAJSDOMEnvironment extends JSDOMEnvironment {
    constructor(config, context) {
        super(config, context);
        this.global.jsdom = this.dom;
    }

    async teardown() {
        if (this.global) {
            this.global.jsdom = undefined;
        }
        await super.teardown();
    }
}

module.exports = UDAJSDOMEnvironment;
