const fs = require('fs');

class State {

    constructor() {
        this.EXIT_COMMAND = 'exit';
        this.STATES_FILE_PATH = './state.json';
    }

    getState() {
        if (!this.state) {
            this.state = JSON.parse(fs.readFileSync(this.STATES_FILE_PATH).toString());
        }
        return this.state;
    }

    printState() {
        process.stdout.write(this.getState().currentState + '->');
    }

    updateState(newState) {
        fs.writeFileSync(this.STATES_FILE_PATH, JSON.stringify(newState, null, '  '));
    }

    listen() {
        let input = process.stdin;
        input.setEncoding('utf-8');

        input.on('data', data => {
            data = data.slice(0, -2);
            if (this.getState().available.includes(data)) {
                this.getState().currentState = data;
                this.updateState(this.getState());
            } else if (data == this.EXIT_COMMAND) {
                this.getState().currentState = this.getState().available[0];
                this.updateState(this.getState());
                process.exit(0);
            }
            this.printState();
        });
    }
}

module.exports = State;