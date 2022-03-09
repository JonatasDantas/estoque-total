"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/home";
exports.ids = ["pages/home"];
exports.modules = {

/***/ "./src/pages/home.tsx":
/*!****************************!*\
  !*** ./src/pages/home.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getServerSideProps\": () => (/* binding */ getServerSideProps),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var src_services_authService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/services/authService */ \"./src/services/authService.ts\");\n\n\nconst Home = ()=>{\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"Logged in\"\n    }, void 0, false, {\n        fileName: \"/home/jonatasd/dev/personal-projects/estoque-total/src/pages/home.tsx\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, undefined));\n};\nconst getServerSideProps = async (ctx)=>{\n    const validationResult = await (0,src_services_authService__WEBPACK_IMPORTED_MODULE_1__.validateToken)(ctx);\n    if (!validationResult) {\n        return {\n            redirect: {\n                destination: '/',\n                permanent: false\n            }\n        };\n    }\n    return {\n        props: {}\n    };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvaG9tZS50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRXdEO0FBRXhELEtBQUssQ0FBQ0MsSUFBSSxPQUE0QixDQUFDO0lBQ3JDLE1BQU0sNkVBQ0hDLENBQUc7a0JBQUMsQ0FFTDs7Ozs7O0FBRUosQ0FBQztBQUVNLEtBQUssQ0FBQ0Msa0JBQWtCLFVBQThCQyxHQUFHLEdBQUssQ0FBQztJQUNwRSxLQUFLLENBQUNDLGdCQUFnQixHQUFHLEtBQUssQ0FBQ0wsdUVBQWEsQ0FBQ0ksR0FBRztJQUVoRCxFQUFFLEdBQUdDLGdCQUFnQixFQUFFLENBQUM7UUFDdEIsTUFBTSxDQUFDLENBQUM7WUFDTkMsUUFBUSxFQUFFLENBQUM7Z0JBQ1RDLFdBQVcsRUFBRSxDQUFHO2dCQUNoQkMsU0FBUyxFQUFFLEtBQUs7WUFDbEIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLENBQUM7UUFDTkMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNYLENBQUM7QUFDSCxDQUFDO0FBRUQsaUVBQWVSLElBQUksRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2VzdG9xdWUtdG90YWwvLi9zcmMvcGFnZXMvaG9tZS50c3g/OTJlOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHZXRTZXJ2ZXJTaWRlUHJvcHMgfSBmcm9tICduZXh0JztcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdmFsaWRhdGVUb2tlbiB9IGZyb20gJ3NyYy9zZXJ2aWNlcy9hdXRoU2VydmljZSc7XG5cbmNvbnN0IEhvbWU6IEZ1bmN0aW9uQ29tcG9uZW50ID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICAgICAgICBMb2dnZWQgaW5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTZXJ2ZXJTaWRlUHJvcHM6IEdldFNlcnZlclNpZGVQcm9wcyA9IGFzeW5jIChjdHgpID0+IHtcbiAgY29uc3QgdmFsaWRhdGlvblJlc3VsdCA9IGF3YWl0IHZhbGlkYXRlVG9rZW4oY3R4KTtcblxuICBpZiAoIXZhbGlkYXRpb25SZXN1bHQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkaXJlY3Q6IHtcbiAgICAgICAgZGVzdGluYXRpb246ICcvJyxcbiAgICAgICAgcGVybWFuZW50OiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcHJvcHM6IHt9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSG9tZTsiXSwibmFtZXMiOlsidmFsaWRhdGVUb2tlbiIsIkhvbWUiLCJkaXYiLCJnZXRTZXJ2ZXJTaWRlUHJvcHMiLCJjdHgiLCJ2YWxpZGF0aW9uUmVzdWx0IiwicmVkaXJlY3QiLCJkZXN0aW5hdGlvbiIsInBlcm1hbmVudCIsInByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/home.tsx\n");

/***/ }),

/***/ "./src/services/api.ts":
/*!*****************************!*\
  !*** ./src/services/api.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getApiClient\": () => (/* binding */ getApiClient),\n/* harmony export */   \"setAuthorization\": () => (/* binding */ setAuthorization)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nookies */ \"nookies\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst api = axios__WEBPACK_IMPORTED_MODULE_0___default().create({\n    baseURL: \"https://estoque-total-api.herokuapp.com\"\n});\nfunction getApiClient(ctx) {\n    const { 'estoque-total.authToken': token  } = (0,nookies__WEBPACK_IMPORTED_MODULE_1__.parseCookies)(ctx);\n    api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';\n    return api;\n}\nfunction setAuthorization(token) {\n    api.defaults.headers.common.Authorization = `Bearer ${token}`;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZXMvYXBpLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUF5QjtBQUNhO0FBRXRDLEtBQUssQ0FBQ0UsR0FBRyxHQUFHRixtREFBWSxDQUFDLENBQUM7SUFDeEJJLE9BQU8sRUFBRUMseUNBQStCO0FBQzFDLENBQUM7QUFFTSxTQUFTRyxZQUFZLENBQUNDLEdBQVMsRUFBRSxDQUFDO0lBQ3ZDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBeUIsMEJBQUVDLEtBQUssRUFBQyxDQUFDLEdBQUdULHFEQUFZLENBQUNRLEdBQUc7SUFFN0RQLEdBQUcsQ0FBQ1MsUUFBUSxDQUFDQyxPQUFPLENBQUNDLE1BQU0sQ0FBQ0MsYUFBYSxHQUFHSixLQUFLLElBQUksT0FBTyxFQUFFQSxLQUFLLEtBQUssQ0FBRTtJQUUxRSxNQUFNLENBQUNSLEdBQUc7QUFDWixDQUFDO0FBRU0sU0FBU2EsZ0JBQWdCLENBQUNMLEtBQWEsRUFBRSxDQUFDO0lBQy9DUixHQUFHLENBQUNTLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDQyxNQUFNLENBQUNDLGFBQWEsSUFBSSxPQUFPLEVBQUVKLEtBQUs7QUFDN0QsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2VzdG9xdWUtdG90YWwvLi9zcmMvc2VydmljZXMvYXBpLnRzPzk1NmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IHBhcnNlQ29va2llcyB9IGZyb20gJ25vb2tpZXMnO1xuXG5jb25zdCBhcGkgPSBheGlvcy5jcmVhdGUoe1xuICBiYXNlVVJMOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfVVJMLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcGlDbGllbnQoY3R4PzogYW55KSB7XG4gIGNvbnN0IHsgJ2VzdG9xdWUtdG90YWwuYXV0aFRva2VuJzogdG9rZW4gfSA9IHBhcnNlQ29va2llcyhjdHgpO1xuXG4gIGFwaS5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbi5BdXRob3JpemF0aW9uID0gdG9rZW4gPyBgQmVhcmVyICR7dG9rZW59YCA6ICcnO1xuICBcbiAgcmV0dXJuIGFwaTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEF1dGhvcml6YXRpb24odG9rZW46IHN0cmluZykge1xuICBhcGkuZGVmYXVsdHMuaGVhZGVycy5jb21tb24uQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xufVxuXG4iXSwibmFtZXMiOlsiYXhpb3MiLCJwYXJzZUNvb2tpZXMiLCJhcGkiLCJjcmVhdGUiLCJiYXNlVVJMIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FQSV9VUkwiLCJnZXRBcGlDbGllbnQiLCJjdHgiLCJ0b2tlbiIsImRlZmF1bHRzIiwiaGVhZGVycyIsImNvbW1vbiIsIkF1dGhvcml6YXRpb24iLCJzZXRBdXRob3JpemF0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/services/api.ts\n");

/***/ }),

/***/ "./src/services/authService.ts":
/*!*************************************!*\
  !*** ./src/services/authService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loginRequest\": () => (/* binding */ loginRequest),\n/* harmony export */   \"validateToken\": () => (/* binding */ validateToken)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/services/api.ts\");\n\nconst LOGIN_URL = 'auth/login';\nconst VALIDATE_TOKEN_URL = 'user/validate-token';\nasync function loginRequest(credentials) {\n    const { data  } = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.getApiClient)().post(LOGIN_URL, {\n        ...credentials\n    });\n    return data;\n}\nasync function validateToken(ctx) {\n    try {\n        const { data  } = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.getApiClient)(ctx).get(VALIDATE_TOKEN_URL);\n        return data;\n    } catch (err) {\n        return false;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZXMvYXV0aFNlcnZpY2UudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRW9DO0FBRXBDLEtBQUssQ0FBQ0MsU0FBUyxHQUFHLENBQVk7QUFDOUIsS0FBSyxDQUFDQyxrQkFBa0IsR0FBRyxDQUFxQjtBQUV6QyxlQUFlQyxZQUFZLENBQUNDLFdBQTZCLEVBQTJCLENBQUM7SUFDMUYsS0FBSyxDQUFDLENBQUMsQ0FBQ0MsSUFBSSxFQUFDLENBQUMsR0FBRyxLQUFLLENBQUNMLGtEQUFZLEdBQUdNLElBQUksQ0FBZ0JMLFNBQVMsRUFBRSxDQUFDO1dBQUlHLFdBQVc7SUFBQyxDQUFDO0lBRXZGLE1BQU0sQ0FBQ0MsSUFBSTtBQUNiLENBQUM7QUFFTSxlQUFlRSxhQUFhLENBQUNDLEdBQVMsRUFBcUIsQ0FBQztJQUNqRSxHQUFHLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxDQUFDLENBQUNILElBQUksRUFBQyxDQUFDLEdBQUcsS0FBSyxDQUFDTCxrREFBWSxDQUFDUSxHQUFHLEVBQUVDLEdBQUcsQ0FBVVAsa0JBQWtCO1FBRXhFLE1BQU0sQ0FBQ0csSUFBSTtJQUNiLENBQUMsQ0FBQyxLQUFLLEVBQUVLLEdBQUcsRUFBTyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxLQUFLO0lBQ2QsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lc3RvcXVlLXRvdGFsLy4vc3JjL3NlcnZpY2VzL2F1dGhTZXJ2aWNlLnRzPzRkYzAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9naW5DcmVkZW50aWFscyB9IGZyb20gJ3NyYy9jb21wb25lbnRzL0xvZ2luL2NvbXBvbmVudHMvTG9naW5Gb3JtJztcbmltcG9ydCB7IExvZ2luUmVzcG9uc2UgfSBmcm9tICdzcmMvdHlwZXMvYXV0aCc7XG5pbXBvcnQgeyBnZXRBcGlDbGllbnQgfSBmcm9tICcuL2FwaSc7XG5cbmNvbnN0IExPR0lOX1VSTCA9ICdhdXRoL2xvZ2luJztcbmNvbnN0IFZBTElEQVRFX1RPS0VOX1VSTCA9ICd1c2VyL3ZhbGlkYXRlLXRva2VuJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZ2luUmVxdWVzdChjcmVkZW50aWFsczogTG9naW5DcmVkZW50aWFscykgOiBQcm9taXNlPExvZ2luUmVzcG9uc2U+IHtcbiAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXRBcGlDbGllbnQoKS5wb3N0PExvZ2luUmVzcG9uc2U+KExPR0lOX1VSTCwgeyAuLi5jcmVkZW50aWFscyB9KTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlVG9rZW4oY3R4PzogYW55KSA6IFByb21pc2U8Ym9vbGVhbj4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgZ2V0QXBpQ2xpZW50KGN0eCkuZ2V0PGJvb2xlYW4+KFZBTElEQVRFX1RPS0VOX1VSTCk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0iXSwibmFtZXMiOlsiZ2V0QXBpQ2xpZW50IiwiTE9HSU5fVVJMIiwiVkFMSURBVEVfVE9LRU5fVVJMIiwibG9naW5SZXF1ZXN0IiwiY3JlZGVudGlhbHMiLCJkYXRhIiwicG9zdCIsInZhbGlkYXRlVG9rZW4iLCJjdHgiLCJnZXQiLCJlcnIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/services/authService.ts\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "nookies":
/*!**************************!*\
  !*** external "nookies" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("nookies");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/home.tsx"));
module.exports = __webpack_exports__;

})();