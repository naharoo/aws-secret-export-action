"use strict";
exports.id = 580;
exports.ids = [580];
exports.modules = {

/***/ 6580:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/core.js
var core = __webpack_require__(9093);
// EXTERNAL MODULE: ./node_modules/.pnpm/zod@3.22.4/node_modules/zod/lib/index.mjs
var lib = __webpack_require__(8047);
// EXTERNAL MODULE: ./node_modules/.pnpm/zod-validation-error@3.0.2_zod@3.22.4/node_modules/zod-validation-error/dist/cjs/index.js
var cjs = __webpack_require__(8249);
;// CONCATENATED MODULE: ./src/config.ts



const configSchema = lib.z.object({
    name: lib.z.string(),
});
function getActionInputValue(name) {
    const inputValue = (0,core.getInput)(name);
    return inputValue.length ? inputValue : undefined;
}
function parseConfig() {
    return configSchema.parse({
        name: getActionInputValue("name"),
    });
}
let config;
try {
    config = parseConfig();
}
catch (err) {
    if (err instanceof lib.z.ZodError) {
        throw (0,cjs/* fromZodError */.CC)(err);
    }
    throw err;
}
/* harmony default export */ const src_config = (config);

;// CONCATENATED MODULE: ./src/run.ts


const greeting = `Hello, ${src_config.name}!`;
(0,core.setOutput)("greeting", greeting);
(0,core.info)(greeting);


/***/ })

};
;