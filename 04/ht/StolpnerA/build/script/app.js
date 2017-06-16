'use strict';

var _router = require('./utils/router');

var _router2 = _interopRequireDefault(_router);

var _index = require('./routes/index');

var _about = require('./routes/about');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//var router = new Router({routes:[index,about]});

var routes = [_index.index, _about.about];
new _router2.default({ routes: routes });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7QUFFQTs7QUFDQTs7OztBQUVBOztBQUVBLElBQU1BLFNBQVMsNEJBQWY7QUFDQSxxQkFBVyxFQUFDQSxjQUFELEVBQVgiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQgUm91dGVyIGZyb20gJy4vdXRpbHMvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IGluZGV4IH0gZnJvbSAnLi9yb3V0ZXMvaW5kZXgnO1xyXG5pbXBvcnQgeyBhYm91dCB9IGZyb20gJy4vcm91dGVzL2Fib3V0JztcclxuXHJcbi8vdmFyIHJvdXRlciA9IG5ldyBSb3V0ZXIoe3JvdXRlczpbaW5kZXgsYWJvdXRdfSk7XHJcblxyXG5jb25zdCByb3V0ZXMgPSBbaW5kZXgsIGFib3V0XTtcclxubmV3IFJvdXRlcih7cm91dGVzfSk7Il19
