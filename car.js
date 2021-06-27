const {
    SyncHook,
    AsyncSeriesHook
} = require('tapable');

class Car {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(['newSpeed']),
            brake: new SyncHook(),
            calculateRoutes: new AsyncSeriesHook(['arg1', 'arg2', 'arg3'])
        }
    }
}

const myCar = new Car();

myCar.hooks.brake.tap('WarningLampPlugin', () => console.log('WarningLampPlugin'));
myCar.hooks.accelerate.tap('LoggerPlugin', (speed) => console.log(`LoggerPlugin: ${speed}`));
myCar.hooks.calculateRoutes.tapPromise('calculateRoutes topPromise', (arg1, arg2, arg3, cb) => {
    console.log('arg1', arg1);

    // return promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`tapPromise to ${arg1}${arg2}${arg3}`);
            resolve();
        }, 1000);
    })
});

myCar.hooks.brake.call();
myCar.hooks.accelerate.call(10);

console.time('cost');

myCar.hooks.calculateRoutes.promise('Async', 'hook', 'demo').then(() => {
    console.timeEnd('cost');
}, err => {
    console.error(err);
    console.timeEnd('cost');
})