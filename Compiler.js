const {
    SyncHook,
    AsyncSeriesHook
} = require('tapable');

class Compiler {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(['newSpeed']),
            brake: new SyncHook(),
            calculateRoutes: new AsyncSeriesHook(['arg1', 'arg2', 'arg3'])
        }
    }

    run() {
        this.accelerate(10);
        this.brake.call();

    }

    brake() {
        this.hooks.brake.call();
    }

    accelerate(speed) {
        this.hooks.accelerate.call(10);
    }

    calculateRoutes() {
        this.hooks.calculateRoutes.promise('Async', 'hook', 'demo').then(() => {
            console.timeEnd('cost');
        }, err => {
            console.error(err);
            console.timeEnd('cost');
        })
    }
}

export {
    Compiler
}