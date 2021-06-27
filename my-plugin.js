// const Compiler = require('./Compiler');
import { Compiler } from './Compiler';
class MyPlugin {
    constructor() {}

    apply(compiler) {
        compiler.hooks.brake.tap('WarningLampPlugin', () => console.log('WarningLampPlugin'));
        compiler.hooks.accelerate.tap('LoggerPlugin', (speed) => console.log(`LoggerPlugin: ${speed}`));
        compiler.hooks.calculateRoutes.tapPromise('calculateRoutes topPromise', (arg1, arg2, arg3, cb) => {
            console.log('arg1', arg1);

            // return promise
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(`tapPromise to ${arg1}${arg2}${arg3}`);
                    resolve();
                }, 1000);
            })
        });
    }
}

const myPlugin = new MyPlugin();

const options = {
    plugins: [myPlugin]
}

const _compiler = new Compiler();

for (const plugin of options.plugins) {
    if (typeof plugin === 'function') {
        plugin.call(_compiler, _compiler);
    } else {
        plugin.apply(_compiler);
    }
}

_compiler.run();