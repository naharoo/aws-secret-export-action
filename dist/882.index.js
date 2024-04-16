"use strict";
exports.id = 882;
exports.ids = [882];
exports.modules = {

/***/ 3739:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ src_config)
});

;// CONCATENATED MODULE: ./src/utils.ts
function isNotBlank(value) {
    return !!value && value.trim().length > 0;
}

// EXTERNAL MODULE: ./node_modules/.pnpm/@actions+core@1.10.1/node_modules/@actions/core/lib/core.js
var core = __webpack_require__(9093);
// EXTERNAL MODULE: ./node_modules/.pnpm/zod@3.22.4/node_modules/zod/lib/index.mjs
var lib = __webpack_require__(8047);
// EXTERNAL MODULE: ./node_modules/.pnpm/zod-validation-error@3.0.2_zod@3.22.4/node_modules/zod-validation-error/dist/cjs/index.js
var cjs = __webpack_require__(8249);
;// CONCATENATED MODULE: ./src/config.ts




const configSchema = lib.z.object({
    secretName: lib.z.string(),
    exportEnv: lib.z.ostring().transform(value => value === "true"),
    region: lib.z.ostring().transform(value => (isNotBlank(value) ? value : undefined)),
    accessKeyId: lib.z.string(),
    secretAccessKey: lib.z.string(),
    sessionToken: lib.z.ostring().transform(value => (isNotBlank(value) ? value : undefined)),
});
function getActionInputValue(name) {
    const inputValue = (0,core.getInput)(name);
    return inputValue.length ? inputValue : undefined;
}
function parseConfig() {
    return configSchema.parse({
        secretName: getActionInputValue("secretName"),
        exportEnv: getActionInputValue("exportEnv"),
        region: getActionInputValue("region"),
        accessKeyId: getActionInputValue("accessKeyId"),
        secretAccessKey: getActionInputValue("secretAccessKey"),
        sessionToken: getActionInputValue("sessionToken"),
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


/***/ }),

/***/ 882:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3739);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9093);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_actions_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _aws_sdk_client_secrets_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8043);
/* harmony import */ var _aws_sdk_client_secrets_manager__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_aws_sdk_client_secrets_manager__WEBPACK_IMPORTED_MODULE_2__);



const secretsManagerClient = new _aws_sdk_client_secrets_manager__WEBPACK_IMPORTED_MODULE_2__.SecretsManagerClient({
    region: _config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].region */ .Z.region,
    credentials: {
        accessKeyId: _config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].accessKeyId */ .Z.accessKeyId,
        secretAccessKey: _config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].secretAccessKey */ .Z.secretAccessKey,
        sessionToken: _config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].sessionToken */ .Z.sessionToken,
    },
});
const { SecretString } = await secretsManagerClient.send(new _aws_sdk_client_secrets_manager__WEBPACK_IMPORTED_MODULE_2__.GetSecretValueCommand({ SecretId: _config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].secretName */ .Z.secretName }));
if (!SecretString) {
    throw new Error(`Secret ${_config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].secretName */ .Z.secretName} does not have a value`);
}
const secret = JSON.parse(SecretString);
for (const [key, value] of Object.entries(secret)) {
    if (typeof value !== "string") {
        continue;
    }
    (0,_actions_core__WEBPACK_IMPORTED_MODULE_1__.setSecret)(value);
    (0,_actions_core__WEBPACK_IMPORTED_MODULE_1__.setOutput)(key, value);
    if (_config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].exportEnv */ .Z.exportEnv)
        (0,_actions_core__WEBPACK_IMPORTED_MODULE_1__.exportVariable)(key, value);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ })

};
;