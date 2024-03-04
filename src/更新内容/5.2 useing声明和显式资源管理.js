var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        function next() {
            while (env.stack.length) {
                var rec = env.stack.pop();
                try {
                    var result = rec.dispose && rec.dispose.call(rec.value);
                    if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                }
                catch (e) {
                    fail(e);
                }
            }
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
import fs from "fs";
function loggy(id) {
    console.log(`Creating ${id}`);
    return {
        [Symbol.dispose]() {
            console.log(`Disposing ${id}`);
        }
    };
}
/**
 * 同步
 * */
{
    function func() {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
            const a = __addDisposableResource(env_1, loggy("a"), false);
            const b = __addDisposableResource(env_1, loggy("b"), false);
            {
                const env_2 = { stack: [], error: void 0, hasError: false };
                try {
                    const c = __addDisposableResource(env_2, loggy("c"), false);
                    const d = __addDisposableResource(env_2, loggy("d"), false);
                }
                catch (e_1) {
                    env_2.error = e_1;
                    env_2.hasError = true;
                }
                finally {
                    __disposeResources(env_2);
                }
            }
            const e = __addDisposableResource(env_1, loggy("e"), false);
            return;
        }
        catch (e_2) {
            env_1.error = e_2;
            env_1.hasError = true;
        }
        finally {
            __disposeResources(env_1);
        }
    }
    func();
    // Creating a
    // Creating b
    // Creating c
    // Creating d
    // Disposing d
    // Disposing c
    // Creating e
    // Disposing e
    // Disposing b
    // Disposing a
}
/**
 * 异步
 * */
{
    async function doWork() {
        // Do fake work for half a second.
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    function loggy(id) {
        console.log(`Constructing ${id}`);
        return {
            async [Symbol.asyncDispose]() {
                console.log(`Disposing (async) ${id}`);
                await doWork();
            },
        };
    }
    async function func() {
        const env_3 = { stack: [], error: void 0, hasError: false };
        try {
            const a = __addDisposableResource(env_3, loggy("a"), true);
            const b = __addDisposableResource(env_3, loggy("b"), true);
            {
                const env_4 = { stack: [], error: void 0, hasError: false };
                try {
                    const c = __addDisposableResource(env_4, loggy("c"), true);
                    const d = __addDisposableResource(env_4, loggy("d"), true);
                }
                catch (e_3) {
                    env_4.error = e_3;
                    env_4.hasError = true;
                }
                finally {
                    const result_1 = __disposeResources(env_4);
                    if (result_1)
                        await result_1;
                }
            }
            const e = __addDisposableResource(env_3, loggy("e"), true);
            return;
        }
        catch (e_4) {
            env_3.error = e_4;
            env_3.hasError = true;
        }
        finally {
            const result_2 = __disposeResources(env_3);
            if (result_2)
                await result_2;
        }
    }
    func();
    // Constructing a
    // Constructing b
    // Constructing c
    // Constructing d
    // Disposing (async) d
    // Disposing (async) c
    // Constructing e
    // Disposing (async) e
    // Disposing (async) b
    // Disposing (async) a
}
/**
 * 使用对象
 * */
{
    class TempFile {
        #path;
        #handle;
        constructor(path) {
            this.#path = path;
            this.#handle = fs.openSync(path, "w+");
        }
        // other methods
        [Symbol.dispose]() {
            // Close the file and delete it.
            fs.closeSync(this.#handle);
            fs.unlinkSync(this.#path);
        }
    }
    function doSomeWork() {
        const env_5 = { stack: [], error: void 0, hasError: false };
        try {
            const file = __addDisposableResource(env_5, new TempFile(".some_temp_file"), false);
            // use file...
            if (Math.random() > 0.5) {
                // do some more work...
                return;
            }
        }
        catch (e_5) {
            env_5.error = e_5;
            env_5.hasError = true;
        }
        finally {
            __disposeResources(env_5);
        }
    }
}
/**
 * DisposableStack 和 AsyncDisposableStack
 * 可以
 * */
//# sourceMappingURL=5.2%20useing%E5%A3%B0%E6%98%8E%E5%92%8C%E6%98%BE%E5%BC%8F%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86.js.map