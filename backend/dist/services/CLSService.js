"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreFromRequest = exports.saveToRequest = exports.set = exports.context = exports.get = exports.middleware = void 0;
const cls = require('cls-hooked');
const nsid = 'a6a29a6f-6747-4b5f-b99f-07ee96e32f88';
/** Express.js middleware that is responsible for initializing the context for each request. */
function middleware(req, res, next) {
    const ns = namespace();
    ns.bindEmitter(req);
    ns.bindEmitter(res);
    ns.run(() => next());
}
exports.middleware = middleware;
/**
 * Gets a value from the context by key.  Will return undefined if the context has not yet been initialized for this request or if a value is not found for the specified key.
 * @param {string} key
 */
function get(key) {
    const ns = namespace();
    if (ns && ns.active) {
        return ns.get(key);
    }
}
exports.get = get;
function namespace() {
    return (cls.getNamespace(nsid) || cls.createNamespace(nsid));
}
/**
 * Return a copy of the context or replace the context
 * @param ctx
 * @returns {*|void}
 */
function context(ctx) {
    if (!ctx) {
        var obj = Object.assign(process['namespaces'][nsid].active, {});
        delete obj['_ns_name'];
        delete obj['id'];
        return obj;
    }
    else {
        Object.keys(ctx).forEach((key) => {
            set(key, ctx[key]);
        });
    }
}
exports.context = context;
/**
 * Adds a value to the context by key.  If the key already exists, its value will be overwritten.  No value will persist if the context has not yet been initialized.
 * @param {string} key
 * @param {*} value
 */
function set(key, value) {
    const ns = namespace();
    if (ns) {
        return ns.set(key, value);
    }
}
exports.set = set;
function saveToRequest(req, res, next) {
    req.ServerContext = context();
    next();
}
exports.saveToRequest = saveToRequest;
function restoreFromRequest(req, res, next) {
    const ns = cls.getNamespace(nsid);
    ns.run(() => {
        if (req.ServerContext) {
            context(req.ServerContext);
        }
        else {
            console.warn("You called restore without save");
        }
        next();
    });
}
exports.restoreFromRequest = restoreFromRequest;
//# sourceMappingURL=CLSService.js.map