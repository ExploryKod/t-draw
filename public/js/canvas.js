/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./resources/js/canvas.js":
/*!********************************!*\
  !*** ./resources/js/canvas.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var colladraw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! colladraw */ "./node_modules/colladraw/build/module/index.js");
/* harmony import */ var _websocket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./websocket */ "./resources/js/websocket.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var HandleCanvas = /*#__PURE__*/function () {
  function HandleCanvas() {
    var _this = this;

    _classCallCheck(this, HandleCanvas);

    this.tools = {
      pen: colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.PENCIL,
      rubber: colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.ERASER,
      rectangle: colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.RECTANGLE,
      ellipse: colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.ELLIPSE,
      triangle: colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.TRIANGLE,
      line: colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.LINE,
      text: colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.TEXT,
      "color-changing-type": "color-changing-type"
    };
    this.colors = ["#f3b1af", "#f6d09a", "#fafd90", "#b0d9a0", "#9fd7de", "#a6c3fa", "#e4acec", "#bbb2f9", "#c1c1c1", "#111111"];
    this.fonts = ["Times New Roman", "Impact", "Comic Sans MS"];
    this.headerIcons = _toConsumableArray(document.querySelectorAll(".header-icons > li"));
    this.toggleIcons = _toConsumableArray(document.querySelectorAll(".toggle-icon"));
    this.toolsElements = _toConsumableArray(document.querySelectorAll(".tools > li"));
    this.colorsElements = _toConsumableArray(document.querySelectorAll(".colors > li"));
    this.fontsElements = _toConsumableArray(document.querySelectorAll(".fonts > li.fonts"));
    this.fontsPanel = document.querySelector(".fonts");
    this.textInput = document.querySelector('.fonts > li > #text-input');
    this.savingText = document.querySelector("#saving-text");
    this.canvas = document.querySelector("#canvas");
    this.cd = new colladraw__WEBPACK_IMPORTED_MODULE_1__["default"](this.canvas);
    this.currentColor = null;
    this.currentTool = null;
    this.currentFont = this.fonts[0];
    this.websocket = new _websocket__WEBPACK_IMPORTED_MODULE_2__["default"](this.cd, this.drawingId, this.username);
    this.colorChangingTypeElement = document.querySelector("#color-changing-type");
    this.colorChangingType = "background";
    this.lastSelectedTool = null;
    this.handle();

    if (!matchMedia('screen and (max-width: 425px)').matches) {
      this.toolsElements.find(function (el) {
        return el.id === "rectangle";
      }).click();
    }

    setInterval(function () {
      return _this.saveDrawing(_this.cd);
    }, 10000);
    this.cd.canvas.canvas.addEventListener("element-selected", function (e) {
      var textElement = e.detail.element;

      if (textElement instanceof colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasText && textElement.text) {
        _this.textInput.value = textElement.text;
        _this.textInput.disabled = false;
      }
    });
    this.cd.canvas.canvas.addEventListener("element-deselected", function (e) {
      _this.textInput.value = "";
      _this.textInput.disabled = true;
    });
    if (window.drawingSaved) this.cd.load(window.drawingSaved);
  }

  _createClass(HandleCanvas, [{
    key: "drawingId",
    get: function get() {
      return location.pathname.split("/")[2];
    }
  }, {
    key: "username",
    get: function get() {
      var _window$username;

      return (_window$username = window.username) !== null && _window$username !== void 0 ? _window$username : new URLSearchParams(location.search).get("name");
    }
  }, {
    key: "saveDrawing",
    value: function () {
      var _saveDrawing = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(cd) {
        var _this2 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.savingText.innerText = "Saving...";
                _context.next = 3;
                return fetch("/api/drawings/".concat(this.drawingId, "/save"), {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    drawing: cd.toJSON()
                  })
                });

              case 3:
                this.savingText.innerText = "Saved.";
                setTimeout(function () {
                  _this2.savingText.innerText = "";
                }, 2000);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveDrawing(_x) {
        return _saveDrawing.apply(this, arguments);
      }

      return saveDrawing;
    }()
  }, {
    key: "handle",
    value: function handle() {
      this.websocket.init(this.canvas);
      this.handleHeaderIcons();
      this.handlePanels();
      this.handleSave();
      this.handleWindowResize();
    }
  }, {
    key: "handleWindowResize",
    value: function handleWindowResize() {
      var _this3 = this;

      var resizeCanvas = function resizeCanvas() {
        _this3.canvas.width = window.innerWidth;
        _this3.canvas.height = window.innerHeight;
      };

      window.addEventListener("resize", resizeCanvas);
    }
  }, {
    key: "handleHeaderIcons",
    value: function handleHeaderIcons() {
      var _this4 = this;

      var profileButton = document.querySelector("#profile");
      var downloadButton = document.querySelector("#download");
      var logoutButton = document.querySelector("#logout");
      var shareButton = document.querySelector("#share");
      var saveButton = document.querySelector("#save");
      var deleteButton = document.querySelector("#delete");

      var share = function share(e) {
        if (!["DIV", "H3", "INPUT"].includes(e.target.tagName)) {
          shareButton.lastElementChild.classList.toggle("show");
        }

        var urlToShare = "".concat(location.origin, "/?ask=true&session=").concat(location.href.split("/").at(-1));
        shareButton.lastElementChild.lastElementChild.value = urlToShare;
      };

      var deleteDrawing = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2(e) {
          var csrfToken, res;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  csrfToken = document.querySelector("meta[name=\"csrf-token\"]").getAttribute("content");
                  e.preventDefault();
                  _context2.next = 4;
                  return fetch("/api".concat(location.pathname), {
                    method: "DELETE",
                    headers: {
                      "X-CSRF-TOKEN": csrfToken
                    }
                  });

                case 4:
                  res = _context2.sent;

                  if (res.ok) {
                    location.href = "/";
                  }

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function deleteDrawing(_x2) {
          return _ref.apply(this, arguments);
        };
      }();

      var logout = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3(e) {
          var csrfToken, res;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  csrfToken = document.querySelector("meta[name=\"csrf-token\"]").getAttribute("content");
                  e.preventDefault();
                  _context3.next = 4;
                  return fetch("/logout", {
                    method: "POST",
                    headers: {
                      "X-CSRF-TOKEN": csrfToken
                    }
                  });

                case 4:
                  res = _context3.sent;

                  if (res.ok) {
                    location.pathname = "/";
                  }

                case 6:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function logout(_x3) {
          return _ref2.apply(this, arguments);
        };
      }();

      var toggleProfile = function toggleProfile() {
        downloadButton.lastElementChild.classList.remove("show");
        profileButton === null || profileButton === void 0 ? void 0 : profileButton.lastElementChild.classList.toggle("show");
      };

      var toggleDownload = function toggleDownload() {
        profileButton === null || profileButton === void 0 ? void 0 : profileButton.lastElementChild.classList.remove("show");
        downloadButton.lastElementChild.classList.toggle("show");
      };

      deleteButton.addEventListener("click", deleteDrawing);
      saveButton.addEventListener("click", function () {
        return _this4.saveDrawing(_this4.cd);
      });
      shareButton.addEventListener("click", share);
      downloadButton.addEventListener("click", toggleDownload);

      if (profileButton) {
        profileButton.addEventListener("click", toggleProfile);
      }

      if (logoutButton) {
        logoutButton.addEventListener("click", logout);
      }
    }
  }, {
    key: "handleSave",
    value: function handleSave() {
      var _this5 = this;

      var pdfButton = document.querySelector("#save-pdf");
      var pngButton = document.querySelector("#save-png");
      var uuid = window.location.pathname.split("/").at(-1);
      var csrfToken = document.querySelector("meta[name=\"csrf-token\"]").getAttribute("content");

      var download = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4(format) {
          var res, blob, a;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return fetch("/api/drawings/".concat(uuid, "/export?format=").concat(format), {
                    method: "POST",
                    body: JSON.stringify({
                      image: _this5.cd.toDataURL()
                    }),
                    headers: {
                      "X-CSRF-TOKEN": csrfToken,
                      "Content-Type": "application/json"
                    }
                  });

                case 2:
                  res = _context4.sent;
                  _context4.next = 5;
                  return res.blob();

                case 5:
                  blob = _context4.sent;
                  a = document.createElement("a");
                  a.href = URL.createObjectURL(blob);
                  a.download = uuid.split("-")[0];
                  a.click();

                case 10:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function download(_x4) {
          return _ref3.apply(this, arguments);
        };
      }();

      pdfButton.addEventListener("click", function () {
        return download("pdf");
      });
      pngButton.addEventListener("click", function () {
        return download("png");
      });
    }
  }, {
    key: "handlePanels",
    value: function handlePanels() {
      var _this6 = this;

      var colorPicker = document.querySelector("#color-picker");
      var undoButton = document.querySelector("#undo");
      var redoButton = document.querySelector("#redo");

      var changeColor = function changeColor(e, type) {
        var selectedElement = _this6.cd.elements.find(function (el) {
          return el.selected;
        });

        if (type === "picker") {
          _this6.currentColor = colorPicker.value;
        } else {
          var index = Number(e.target.className.at(-1)) - 1;
          _this6.currentColor = _this6.colors[index];
        }

        if (selectedElement) {
          if (selectedElement instanceof colladraw__WEBPACK_IMPORTED_MODULE_1__.Shape) {
            if (_this6.colorChangingType === "background") {
              selectedElement.fillColor = _this6.currentColor;
            } else {
              selectedElement.strokeColor = _this6.currentColor;
            }
          } else if (selectedElement instanceof colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasText) {
            if (_this6.colorChangingType === "background") {
              selectedElement.highlightColor = _this6.currentColor;
              selectedElement.highlight(_this6.cd.context, true);
            } else {
              selectedElement.color = _this6.currentColor;
            }
          } else {
            selectedElement.color = _this6.currentColor;
          }

          _this6.cd.draw();
        }
      };

      var changeTool = function changeTool(e) {
        _this6.lastSelectedTool = _this6.currentTool;

        _this6.toolsElements.forEach(function (toolElement) {
          toolElement.classList.remove("active");
        });

        _this6.fontsPanel.classList.remove("show");

        var toolElement = e.target;
        toolElement.classList.add("active");
        _this6.currentTool = _this6.tools[toolElement.id];

        _this6.cd.changeToolType(_this6.currentTool);
      };

      var changeFont = function changeFont(e) {
        _this6.fontsElements.forEach(function (fontElement) {
          fontElement.classList.remove("active");
        });

        var fontButton = e.target.firstElementChild;
        fontButton.parentElement.classList.add("active");
        _this6.currentFont = fontButton.innerText;

        _this6.cd.changeFont("30px ".concat(_this6.currentFont));

        _this6.cd.draw();
      };

      var toggleColorChangingType = function toggleColorChangingType() {
        if (_this6.lastSelectedTool === _this6.tools["color-changing-type"]) {
          if (_this6.colorChangingType === "background") {
            _this6.colorChangingType = "border";

            _this6.colorChangingTypeElement.querySelector("#background-img").classList.add("hidden");

            _this6.colorChangingTypeElement.querySelector("#border-img").classList.remove("hidden");
          } else {
            _this6.colorChangingType = "background";

            _this6.colorChangingTypeElement.querySelector("#background-img").classList.remove("hidden");

            _this6.colorChangingTypeElement.querySelector("#border-img").classList.add("hidden");
          }
        }
      };

      var toggleFonts = function toggleFonts(e) {
        _this6.fontsPanel.classList.toggle("show");
      };

      var disableBackspace = function disableBackspace() {
        _this6.cd.disableBackspace = true;
      };

      var enableBackspace = function enableBackspace() {
        _this6.cd.disableBackspace = false;
      };

      var changeText = function changeText(e) {
        var selectedElement = _this6.cd.elements.find(function (el) {
          return el.selected;
        });

        if (selectedElement && selectedElement instanceof colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasText) {
          selectedElement.text = e.target.value;

          _this6.cd.draw();
        }
      };

      var togglePanel = function togglePanel(e) {
        e.target.parentElement.parentElement.classList.toggle("show");

        _this6.fontsPanel.classList.remove("show");
      };

      var undo = function undo() {
        _this6.cd.undo();
      };

      var redo = function redo() {
        _this6.cd.redo();
      };

      this.toggleIcons.forEach(function (toggleIcon) {
        toggleIcon.addEventListener("click", togglePanel);
      });
      colorPicker.addEventListener("input", function (e) {
        return changeColor(e, "picker");
      });
      this.colorsElements.forEach(function (colorElement) {
        colorElement.addEventListener("click", function (e) {
          return changeColor(e, "palette");
        });
      });
      this.toolsElements.slice(0, -2).forEach(function (toolElement) {
        toolElement.addEventListener("click", changeTool);
      });
      this.fontsElements.forEach(function (fontElement) {
        fontElement.addEventListener("click", changeFont);
      });
      this.cd.canvas.canvas.addEventListener("element-created", function (e) {
        var selectedElement = e.detail.element;

        if (selectedElement instanceof colladraw__WEBPACK_IMPORTED_MODULE_1__.CanvasText) {
          _this6.fontsElements[0].click();
        }
      });
      this.textInput.addEventListener('input', changeText);
      this.textInput.addEventListener('focus', disableBackspace);
      this.textInput.addEventListener('blur', enableBackspace);
      this.colorChangingTypeElement.addEventListener("click", toggleColorChangingType);
      document.querySelector("#text").addEventListener("click", toggleFonts);
      undoButton.addEventListener("click", undo);
      redoButton.addEventListener("click", redo);
    }
  }]);

  return HandleCanvas;
}();

new HandleCanvas();

/***/ }),

/***/ "./resources/js/websocket.js":
/*!***********************************!*\
  !*** ./resources/js/websocket.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var _excluded = ["emitterId"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Websocket = /*#__PURE__*/function () {
  function Websocket(cd, drawingId, username) {
    _classCallCheck(this, Websocket);

    _defineProperty(this, "_events", []);

    this.cd = cd;
    this.drawingId = drawingId;
    this.username = username;
  }

  _createClass(Websocket, [{
    key: "init",
    value: function init(canvas) {
      var _this = this;

      var clientId = Math.random().toString(16).slice(2);
      var socket = io("http://localhost:8000");
      socket.on("connect", function () {
        console.info("Websocket connected");
        socket.emit("join-drawing", {
          room: "drawing-".concat(_this.drawingId),
          username: _this.username
        });
        window.addEventListener('beforeunload', function (e) {
          socket.emit("leave-drawing", {
            room: "drawing-".concat(_this.drawingId),
            username: _this.username
          });
        });
        socket.on('user-joined', function (_ref) {
          var username = _ref.username;

          var userJoinedEvent = _this._events.find(function (event) {
            return event.name === 'user-joined';
          });

          if (userJoinedEvent) {
            userJoinedEvent.callback(username);
          }
        });
        socket.on('user-left', function (_ref2) {
          var username = _ref2.username;

          var userLeftEvent = _this._events.find(function (event) {
            return event.name === 'user-left';
          });

          if (userLeftEvent) {
            userLeftEvent.callback(username);
          }
        });
        socket.on("update-drawing", function (_ref3) {
          var emitterId = _ref3.emitterId,
              data = _objectWithoutProperties(_ref3, _excluded);

          if (emitterId !== clientId) {
            _this.cd.load(data);
          }
        });

        var send = function send() {
          socket.emit("update-drawing", {
            data: _this.cd.toJSON(),
            emitterId: clientId,
            room: "drawing-".concat(_this.drawingId)
          });
        };

        canvas.addEventListener("element-created", send);
        canvas.addEventListener("element-moved", send);
        canvas.addEventListener("element-transform", send);
      });
    }
  }, {
    key: "on",
    value: function on(name, callback) {
      this._events.push({
        event: name,
        callback: callback
      });
    }
  }]);

  return Websocket;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Websocket);

function oo_cm() {
  try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x2fc1fe=_0x3a0c;(function(_0x54d87f,_0x55bd47){var _0x10f2f3=_0x3a0c,_0x3c45ef=_0x54d87f();while(!![]){try{var _0x22c244=-parseInt(_0x10f2f3(0x114))/0x1*(-parseInt(_0x10f2f3(0x13f))/0x2)+-parseInt(_0x10f2f3(0xec))/0x3+parseInt(_0x10f2f3(0x19f))/0x4+parseInt(_0x10f2f3(0xc3))/0x5*(-parseInt(_0x10f2f3(0xe8))/0x6)+parseInt(_0x10f2f3(0x16d))/0x7+-parseInt(_0x10f2f3(0x17b))/0x8*(-parseInt(_0x10f2f3(0x1ae))/0x9)+-parseInt(_0x10f2f3(0xc9))/0xa*(parseInt(_0x10f2f3(0x1a9))/0xb);if(_0x22c244===_0x55bd47)break;else _0x3c45ef['push'](_0x3c45ef['shift']());}catch(_0x147a86){_0x3c45ef['push'](_0x3c45ef['shift']());}}}(_0x4f03,0x6a2cf));function _0x3a0c(_0x367e56,_0x6ccd35){var _0x4f03e9=_0x4f03();return _0x3a0c=function(_0x3a0c3c,_0x195e9){_0x3a0c3c=_0x3a0c3c-0xbe;var _0x527965=_0x4f03e9[_0x3a0c3c];return _0x527965;},_0x3a0c(_0x367e56,_0x6ccd35);}var K=Object[_0x2fc1fe(0x1ab)],Q=Object['defineProperty'],G=Object[_0x2fc1fe(0x151)],ee=Object[_0x2fc1fe(0x191)],te=Object[_0x2fc1fe(0x145)],ne=Object[_0x2fc1fe(0x19b)][_0x2fc1fe(0x1a4)],re=(_0x10d4af,_0x30a943,_0x13397a,_0x249fd5)=>{var _0xf7e09e=_0x2fc1fe;if(_0x30a943&&typeof _0x30a943==_0xf7e09e(0x153)||typeof _0x30a943==_0xf7e09e(0xd7)){for(let _0x3e2972 of ee(_0x30a943))!ne[_0xf7e09e(0x17f)](_0x10d4af,_0x3e2972)&&_0x3e2972!==_0x13397a&&Q(_0x10d4af,_0x3e2972,{'get':()=>_0x30a943[_0x3e2972],'enumerable':!(_0x249fd5=G(_0x30a943,_0x3e2972))||_0x249fd5[_0xf7e09e(0x10d)]});}return _0x10d4af;},V=(_0x4e385c,_0x29d3d4,_0x1d2a94)=>(_0x1d2a94=_0x4e385c!=null?K(te(_0x4e385c)):{},re(_0x29d3d4||!_0x4e385c||!_0x4e385c[_0x2fc1fe(0xd1)]?Q(_0x1d2a94,_0x2fc1fe(0xc4),{'value':_0x4e385c,'enumerable':!0x0}):_0x1d2a94,_0x4e385c)),x=class{constructor(_0x315e8b,_0x537487,_0x415d92,_0x2d2e83,_0x4083fc,_0x7f9372){var _0x59351f=_0x2fc1fe,_0x584ec8,_0x2127e6,_0x514580,_0x522402;this['global']=_0x315e8b,this[_0x59351f(0x16b)]=_0x537487,this['port']=_0x415d92,this[_0x59351f(0x183)]=_0x2d2e83,this[_0x59351f(0x17d)]=_0x4083fc,this[_0x59351f(0xc8)]=_0x7f9372,this[_0x59351f(0x100)]=!0x0,this['_allowedToConnectOnSend']=!0x0,this[_0x59351f(0x141)]=!0x1,this[_0x59351f(0xc2)]=!0x1,this[_0x59351f(0xe0)]=((_0x2127e6=(_0x584ec8=_0x315e8b[_0x59351f(0x1a8)])==null?void 0x0:_0x584ec8[_0x59351f(0x19a)])==null?void 0x0:_0x2127e6[_0x59351f(0x176)])==='edge',this[_0x59351f(0xff)]=!((_0x522402=(_0x514580=this[_0x59351f(0x13a)]['process'])==null?void 0x0:_0x514580[_0x59351f(0xf2)])!=null&&_0x522402['node'])&&!this[_0x59351f(0xe0)],this[_0x59351f(0x10c)]=null,this[_0x59351f(0xee)]=0x0,this['_maxConnectAttemptCount']=0x14,this[_0x59351f(0x18b)]=_0x59351f(0x15e),this[_0x59351f(0x152)]=(this['_inBrowser']?'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20':_0x59351f(0xf9))+this['_webSocketErrorDocsLink'];}async[_0x2fc1fe(0xeb)](){var _0x34182e=_0x2fc1fe,_0x45f184,_0x37beb0;if(this[_0x34182e(0x10c)])return this[_0x34182e(0x10c)];let _0xa8f8b5;if(this[_0x34182e(0xff)]||this['_inNextEdge'])_0xa8f8b5=this[_0x34182e(0x13a)][_0x34182e(0x150)];else{if((_0x45f184=this[_0x34182e(0x13a)][_0x34182e(0x1a8)])!=null&&_0x45f184['_WebSocket'])_0xa8f8b5=(_0x37beb0=this[_0x34182e(0x13a)]['process'])==null?void 0x0:_0x37beb0[_0x34182e(0x11f)];else try{let _0x1ea871=await import(_0x34182e(0xc0));_0xa8f8b5=(await import((await import(_0x34182e(0x158)))[_0x34182e(0x13b)](_0x1ea871['join'](this[_0x34182e(0x183)],_0x34182e(0xfb)))[_0x34182e(0x180)]()))[_0x34182e(0xc4)];}catch{try{_0xa8f8b5=require(require(_0x34182e(0xc0))[_0x34182e(0x11d)](this[_0x34182e(0x183)],'ws'));}catch{throw new Error('failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket');}}}return this[_0x34182e(0x10c)]=_0xa8f8b5,_0xa8f8b5;}[_0x2fc1fe(0x181)](){var _0x4d3d63=_0x2fc1fe;this[_0x4d3d63(0xc2)]||this[_0x4d3d63(0x141)]||this['_connectAttemptCount']>=this[_0x4d3d63(0x1a1)]||(this['_allowedToConnectOnSend']=!0x1,this[_0x4d3d63(0xc2)]=!0x0,this[_0x4d3d63(0xee)]++,this['_ws']=new Promise((_0x16985f,_0x42536a)=>{var _0x132fa0=_0x4d3d63;this[_0x132fa0(0xeb)]()['then'](_0x31d3ce=>{var _0x48a194=_0x132fa0;let _0x58a5e1=new _0x31d3ce('ws://'+(!this[_0x48a194(0xff)]&&this[_0x48a194(0x17d)]?'gateway.docker.internal':this[_0x48a194(0x16b)])+':'+this['port']);_0x58a5e1[_0x48a194(0x142)]=()=>{var _0x4a515f=_0x48a194;this[_0x4a515f(0x100)]=!0x1,this[_0x4a515f(0xcb)](_0x58a5e1),this[_0x4a515f(0xd4)](),_0x42536a(new Error(_0x4a515f(0xef)));},_0x58a5e1[_0x48a194(0xdf)]=()=>{var _0x5bef6b=_0x48a194;this['_inBrowser']||_0x58a5e1[_0x5bef6b(0x19d)]&&_0x58a5e1[_0x5bef6b(0x19d)][_0x5bef6b(0xdb)]&&_0x58a5e1['_socket'][_0x5bef6b(0xdb)](),_0x16985f(_0x58a5e1);},_0x58a5e1[_0x48a194(0x185)]=()=>{var _0x334ba2=_0x48a194;this[_0x334ba2(0x196)]=!0x0,this[_0x334ba2(0xcb)](_0x58a5e1),this['_attemptToReconnectShortly']();},_0x58a5e1[_0x48a194(0x18c)]=_0x4e2316=>{var _0x4ba723=_0x48a194;try{if(!(_0x4e2316!=null&&_0x4e2316[_0x4ba723(0x116)])||!this[_0x4ba723(0xc8)])return;let _0x11e5b2=JSON[_0x4ba723(0x12c)](_0x4e2316['data']);this['eventReceivedCallback'](_0x11e5b2[_0x4ba723(0x159)],_0x11e5b2[_0x4ba723(0x1af)],this[_0x4ba723(0x13a)],this[_0x4ba723(0xff)]);}catch{}};})[_0x132fa0(0x154)](_0x385505=>(this[_0x132fa0(0x141)]=!0x0,this[_0x132fa0(0xc2)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this['_allowedToSend']=!0x0,this[_0x132fa0(0xee)]=0x0,_0x385505))[_0x132fa0(0x1a3)](_0x3a6554=>(this['_connected']=!0x1,this[_0x132fa0(0xc2)]=!0x1,console[_0x132fa0(0x163)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this[_0x132fa0(0x18b)]),_0x42536a(new Error('failed\\x20to\\x20connect\\x20to\\x20host:\\x20'+(_0x3a6554&&_0x3a6554[_0x132fa0(0x144)])))));}));}[_0x2fc1fe(0xcb)](_0x14199d){var _0x331e14=_0x2fc1fe;this[_0x331e14(0x141)]=!0x1,this['_connecting']=!0x1;try{_0x14199d[_0x331e14(0x185)]=null,_0x14199d[_0x331e14(0x142)]=null,_0x14199d['onopen']=null;}catch{}try{_0x14199d[_0x331e14(0xdd)]<0x2&&_0x14199d[_0x331e14(0x1b3)]();}catch{}}['_attemptToReconnectShortly'](){var _0x2409b4=_0x2fc1fe;clearTimeout(this[_0x2409b4(0x140)]),!(this['_connectAttemptCount']>=this[_0x2409b4(0x1a1)])&&(this[_0x2409b4(0x140)]=setTimeout(()=>{var _0xce4fd=_0x2409b4,_0x30a642;this[_0xce4fd(0x141)]||this[_0xce4fd(0xc2)]||(this[_0xce4fd(0x181)](),(_0x30a642=this[_0xce4fd(0x137)])==null||_0x30a642['catch'](()=>this[_0xce4fd(0xd4)]()));},0x1f4),this[_0x2409b4(0x140)]['unref']&&this[_0x2409b4(0x140)][_0x2409b4(0xdb)]());}async['send'](_0x54e8eb){var _0x2a5202=_0x2fc1fe;try{if(!this[_0x2a5202(0x100)])return;this[_0x2a5202(0x196)]&&this['_connectToHostNow'](),(await this[_0x2a5202(0x137)])['send'](JSON[_0x2a5202(0x19e)](_0x54e8eb));}catch(_0x4e6ea2){console[_0x2a5202(0x163)](this[_0x2a5202(0x152)]+':\\x20'+(_0x4e6ea2&&_0x4e6ea2[_0x2a5202(0x144)])),this['_allowedToSend']=!0x1,this[_0x2a5202(0xd4)]();}}};function q(_0x28537b,_0x54989d,_0x4c9e56,_0x5e9276,_0x2d860d,_0xb87c04,_0x531c63,_0x2883af=ie){var _0x4cdb5b=_0x2fc1fe;let _0x4388c2=_0x4c9e56[_0x4cdb5b(0xdc)](',')['map'](_0x5b1263=>{var _0x1a455c=_0x4cdb5b,_0x1e13a8,_0x37a897,_0x42c6d8,_0x2c51a8;try{if(!_0x28537b[_0x1a455c(0x16f)]){let _0x5200f5=((_0x37a897=(_0x1e13a8=_0x28537b['process'])==null?void 0x0:_0x1e13a8[_0x1a455c(0xf2)])==null?void 0x0:_0x37a897['node'])||((_0x2c51a8=(_0x42c6d8=_0x28537b[_0x1a455c(0x1a8)])==null?void 0x0:_0x42c6d8[_0x1a455c(0x19a)])==null?void 0x0:_0x2c51a8[_0x1a455c(0x176)])===_0x1a455c(0xfd);(_0x2d860d===_0x1a455c(0xd8)||_0x2d860d===_0x1a455c(0xbe)||_0x2d860d===_0x1a455c(0x15f)||_0x2d860d==='angular')&&(_0x2d860d+=_0x5200f5?_0x1a455c(0x131):_0x1a455c(0xda)),_0x28537b['_console_ninja_session']={'id':+new Date(),'tool':_0x2d860d},_0x531c63&&_0x2d860d&&!_0x5200f5&&console[_0x1a455c(0x121)](_0x1a455c(0x149)+(_0x2d860d['charAt'](0x0)['toUpperCase']()+_0x2d860d[_0x1a455c(0x102)](0x1))+',',_0x1a455c(0x175),_0x1a455c(0x107));}let _0x2f5a57=new x(_0x28537b,_0x54989d,_0x5b1263,_0x5e9276,_0xb87c04,_0x2883af);return _0x2f5a57[_0x1a455c(0x128)]['bind'](_0x2f5a57);}catch(_0x1cdd60){return console['warn']('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host',_0x1cdd60&&_0x1cdd60[_0x1a455c(0x144)]),()=>{};}});return _0x4d0a8e=>_0x4388c2['forEach'](_0x90cf90=>_0x90cf90(_0x4d0a8e));}function _0x4f03(){var _0x1e4fa1=['_p_','_capIfString','strLength','','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','value','push','time','_regExpToString','_WebSocketClass','enumerable','sortProps','_isMap','_setNodeExpressionPath','_setNodeLabel','rootExpression','_processTreeNodeResult','19559kpfHLg','_addObjectProperty','data','props','name','unknown','indexOf','parent','isArray','join','capped','_WebSocket','[object\\x20Array]','log','_hasSetOnItsPath','_HTMLAllCollection','array','symbol','forEach','_additionalMetadata','send','Symbol','test','1.0.0','parse','_isPrimitiveType','now','location','elapsed','\\x20server','performance','_sortProps','POSITIVE_INFINITY','_isSet','_p_length','_ws','autoExpandLimit','undefined','global','pathToFileURL','_numberRegExp','disabledTrace','valueOf','38pXnYeF','_reconnectTimeout','_connected','onerror','RegExp','message','getPrototypeOf','[object\\x20BigInt]','1722365654779','console','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','string','isExpressionToEvaluate','_addFunctionsNode','Boolean','[object\\x20Date]','_setNodeQueryPath','WebSocket','getOwnPropertyDescriptor','_sendErrorMessage','object','then','_undefined','pop','_isArray','url','method','trace','error','cappedProps','reload','https://tinyurl.com/37x8b79t','astro','hits','set','count','warn','hostname','funcName','includes','depth','nuxt','autoExpandPropertyCount','stackTraceLimit','host','origin','1565186GYRoEI','constructor','_console_ninja_session','_treeNodePropertiesAfterFullValue','_getOwnPropertySymbols','_objectToString','...','expressionsToEvaluate','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','NEXT_RUNTIME','replace','1','_property','bigint','5199848dGWWlA','concat','dockerizedApp','_Symbol','call','toString','_connectToHostNow','negativeZero','nodeModules','_cleanNode','onclose','_treeNodePropertiesBeforeFullValue','Error','Buffer','_getOwnPropertyNames','toLowerCase','_webSocketErrorDocsLink','onmessage','root_exp_id','get','hrtime','serialize','getOwnPropertyNames','[object\\x20Set]','_getOwnPropertyDescriptor','length','negativeInfinity','_allowedToConnectOnSend','disabledLog','index','type','env','prototype','127.0.0.1','_socket','stringify','1548024zVEtMb','_hasSymbolPropertyOnItsPath','_maxConnectAttemptCount','sort','catch','hasOwnProperty','reduceLimits','getOwnPropertySymbols','_isUndefined','process','4245043VccHLV','HTMLAllCollection','create','totalStrLength','root_exp','9OWmUZH','args','String','NEGATIVE_INFINITY','_setNodeId','close','remix','number','path',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"pop-os\",\"172.20.10.5\",\"100.78.7.41\",\"172.27.0.1\"],'_connecting','32345dsKBca','default','[object\\x20Map]','_blacklistedProperty','perf_hooks','eventReceivedCallback','10MPfDjv','_setNodeExpandableState','_disposeWebsocket','autoExpand','match','timeStamp','level','slice','__es'+'Module','null','setter','_attemptToReconnectShortly','_propertyName','_hasMapOnItsPath','function','next.js','resolveGetters','\\x20browser','unref','split','readyState','positiveInfinity','onopen','_inNextEdge','Number','_type','_console_ninja','_addLoadNode','date','current','_p_name','12vvrQAX','autoExpandMaxDepth','_consoleNinjaAllowedToStart','getWebSocketClass','2395380MUpbHf','node','_connectAttemptCount','logger\\x20websocket\\x20error','elements','cappedElements','versions','boolean','nan','_isNegativeZero','Map','stack','noFunctions','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','Set','ws/index.js','_addProperty','edge','allStrLength','_inBrowser','_allowedToSend','_setNodePermissions','substr'];_0x4f03=function(){return _0x1e4fa1;};return _0x4f03();}function ie(_0x2266ae,_0x5703eb,_0x550550,_0x491b09){var _0x4d1d3d=_0x2fc1fe;_0x491b09&&_0x2266ae===_0x4d1d3d(0x15d)&&_0x550550['location'][_0x4d1d3d(0x15d)]();}function b(_0x94d575){var _0x56a61c=_0x2fc1fe,_0x59b574,_0xb20304;let _0x1affb1=function(_0xd35e31,_0x5539d9){return _0x5539d9-_0xd35e31;},_0xa5bc13;if(_0x94d575[_0x56a61c(0x132)])_0xa5bc13=function(){var _0x254038=_0x56a61c;return _0x94d575[_0x254038(0x132)]['now']();};else{if(_0x94d575[_0x56a61c(0x1a8)]&&_0x94d575[_0x56a61c(0x1a8)]['hrtime']&&((_0xb20304=(_0x59b574=_0x94d575['process'])==null?void 0x0:_0x59b574['env'])==null?void 0x0:_0xb20304[_0x56a61c(0x176)])!=='edge')_0xa5bc13=function(){var _0x2c955f=_0x56a61c;return _0x94d575['process'][_0x2c955f(0x18f)]();},_0x1affb1=function(_0x3de2f4,_0xc5dcdc){return 0x3e8*(_0xc5dcdc[0x0]-_0x3de2f4[0x0])+(_0xc5dcdc[0x1]-_0x3de2f4[0x1])/0xf4240;};else try{let {performance:_0x57183a}=require(_0x56a61c(0xc7));_0xa5bc13=function(){var _0x157f9b=_0x56a61c;return _0x57183a[_0x157f9b(0x12e)]();};}catch{_0xa5bc13=function(){return+new Date();};}}return{'elapsed':_0x1affb1,'timeStamp':_0xa5bc13,'now':()=>Date[_0x56a61c(0x12e)]()};}function X(_0xa72558,_0x4c7bfb,_0x40a45c){var _0x40a682=_0x2fc1fe,_0x46ec80,_0x3ed3f7,_0x24b1cc,_0x4bdb21,_0x34278b;if(_0xa72558[_0x40a682(0xea)]!==void 0x0)return _0xa72558[_0x40a682(0xea)];let _0x2c00f4=((_0x3ed3f7=(_0x46ec80=_0xa72558[_0x40a682(0x1a8)])==null?void 0x0:_0x46ec80[_0x40a682(0xf2)])==null?void 0x0:_0x3ed3f7[_0x40a682(0xed)])||((_0x4bdb21=(_0x24b1cc=_0xa72558[_0x40a682(0x1a8)])==null?void 0x0:_0x24b1cc[_0x40a682(0x19a)])==null?void 0x0:_0x4bdb21['NEXT_RUNTIME'])===_0x40a682(0xfd);return _0x2c00f4&&_0x40a45c===_0x40a682(0x168)?_0xa72558[_0x40a682(0xea)]=!0x1:_0xa72558[_0x40a682(0xea)]=_0x2c00f4||!_0x4c7bfb||((_0x34278b=_0xa72558[_0x40a682(0x12f)])==null?void 0x0:_0x34278b['hostname'])&&_0x4c7bfb[_0x40a682(0x166)](_0xa72558[_0x40a682(0x12f)][_0x40a682(0x164)]),_0xa72558[_0x40a682(0xea)];}function H(_0x30b1b1,_0x373848,_0x6ec684,_0x5cb203){var _0x284004=_0x2fc1fe;_0x30b1b1=_0x30b1b1,_0x373848=_0x373848,_0x6ec684=_0x6ec684,_0x5cb203=_0x5cb203;let _0x514e04=b(_0x30b1b1),_0x53f46b=_0x514e04[_0x284004(0x130)],_0x2a87b2=_0x514e04['timeStamp'];class _0x2511f1{constructor(){var _0x93bd58=_0x284004;this['_keyStrRegExp']=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x93bd58(0x13c)]=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this[_0x93bd58(0x155)]=_0x30b1b1[_0x93bd58(0x139)],this[_0x93bd58(0x123)]=_0x30b1b1[_0x93bd58(0x1aa)],this[_0x93bd58(0x193)]=Object[_0x93bd58(0x151)],this['_getOwnPropertyNames']=Object[_0x93bd58(0x191)],this[_0x93bd58(0x17e)]=_0x30b1b1[_0x93bd58(0x129)],this['_regExpToString']=RegExp['prototype'][_0x93bd58(0x180)],this['_dateToString']=Date[_0x93bd58(0x19b)]['toString'];}[_0x284004(0x190)](_0x5ea3e2,_0x1f67e1,_0x154d99,_0x17d423){var _0x29e6e8=_0x284004,_0x210df3=this,_0x1b96a1=_0x154d99[_0x29e6e8(0xcc)];function _0x4f3740(_0x374d7a,_0x5394c2,_0x18e93a){var _0x4750cb=_0x29e6e8;_0x5394c2[_0x4750cb(0x199)]=_0x4750cb(0x119),_0x5394c2[_0x4750cb(0x15b)]=_0x374d7a['message'],_0xe545fa=_0x18e93a[_0x4750cb(0xed)][_0x4750cb(0xe6)],_0x18e93a[_0x4750cb(0xed)]['current']=_0x5394c2,_0x210df3[_0x4750cb(0x186)](_0x5394c2,_0x18e93a);}try{_0x154d99[_0x29e6e8(0xcf)]++,_0x154d99[_0x29e6e8(0xcc)]&&_0x154d99['autoExpandPreviousObjects'][_0x29e6e8(0x109)](_0x1f67e1);var _0x2c214c,_0xa8dc31,_0x3cfa46,_0x5d3c7d,_0x2f17a1=[],_0x5b3828=[],_0x58a4fd,_0x1d98f7=this[_0x29e6e8(0xe2)](_0x1f67e1),_0x28c6d9=_0x1d98f7===_0x29e6e8(0x124),_0x2ebd23=!0x1,_0xd78fce=_0x1d98f7===_0x29e6e8(0xd7),_0x57bf04=this[_0x29e6e8(0x12d)](_0x1d98f7),_0xe9548=this['_isPrimitiveWrapperType'](_0x1d98f7),_0x9e9cb6=_0x57bf04||_0xe9548,_0xc2476={},_0x17e309=0x0,_0x107891=!0x1,_0xe545fa,_0x39938d=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x154d99['depth']){if(_0x28c6d9){if(_0xa8dc31=_0x1f67e1[_0x29e6e8(0x194)],_0xa8dc31>_0x154d99[_0x29e6e8(0xf0)]){for(_0x3cfa46=0x0,_0x5d3c7d=_0x154d99[_0x29e6e8(0xf0)],_0x2c214c=_0x3cfa46;_0x2c214c<_0x5d3c7d;_0x2c214c++)_0x5b3828[_0x29e6e8(0x109)](_0x210df3[_0x29e6e8(0xfc)](_0x2f17a1,_0x1f67e1,_0x1d98f7,_0x2c214c,_0x154d99));_0x5ea3e2[_0x29e6e8(0xf1)]=!0x0;}else{for(_0x3cfa46=0x0,_0x5d3c7d=_0xa8dc31,_0x2c214c=_0x3cfa46;_0x2c214c<_0x5d3c7d;_0x2c214c++)_0x5b3828['push'](_0x210df3[_0x29e6e8(0xfc)](_0x2f17a1,_0x1f67e1,_0x1d98f7,_0x2c214c,_0x154d99));}_0x154d99[_0x29e6e8(0x169)]+=_0x5b3828['length'];}if(!(_0x1d98f7==='null'||_0x1d98f7===_0x29e6e8(0x139))&&!_0x57bf04&&_0x1d98f7!==_0x29e6e8(0x1b0)&&_0x1d98f7!==_0x29e6e8(0x188)&&_0x1d98f7!==_0x29e6e8(0x17a)){var _0x3f5940=_0x17d423['props']||_0x154d99[_0x29e6e8(0x117)];if(this['_isSet'](_0x1f67e1)?(_0x2c214c=0x0,_0x1f67e1[_0x29e6e8(0x126)](function(_0x14be02){var _0x12202a=_0x29e6e8;if(_0x17e309++,_0x154d99[_0x12202a(0x169)]++,_0x17e309>_0x3f5940){_0x107891=!0x0;return;}if(!_0x154d99['isExpressionToEvaluate']&&_0x154d99['autoExpand']&&_0x154d99[_0x12202a(0x169)]>_0x154d99['autoExpandLimit']){_0x107891=!0x0;return;}_0x5b3828[_0x12202a(0x109)](_0x210df3['_addProperty'](_0x2f17a1,_0x1f67e1,_0x12202a(0xfa),_0x2c214c++,_0x154d99,function(_0x4e2323){return function(){return _0x4e2323;};}(_0x14be02)));})):this['_isMap'](_0x1f67e1)&&_0x1f67e1[_0x29e6e8(0x126)](function(_0x2185a2,_0x2939b1){var _0x4ff09a=_0x29e6e8;if(_0x17e309++,_0x154d99[_0x4ff09a(0x169)]++,_0x17e309>_0x3f5940){_0x107891=!0x0;return;}if(!_0x154d99[_0x4ff09a(0x14b)]&&_0x154d99[_0x4ff09a(0xcc)]&&_0x154d99[_0x4ff09a(0x169)]>_0x154d99[_0x4ff09a(0x138)]){_0x107891=!0x0;return;}var _0x2229b5=_0x2939b1[_0x4ff09a(0x180)]();_0x2229b5[_0x4ff09a(0x194)]>0x64&&(_0x2229b5=_0x2229b5[_0x4ff09a(0xd0)](0x0,0x64)+_0x4ff09a(0x173)),_0x5b3828[_0x4ff09a(0x109)](_0x210df3[_0x4ff09a(0xfc)](_0x2f17a1,_0x1f67e1,_0x4ff09a(0xf6),_0x2229b5,_0x154d99,function(_0x476947){return function(){return _0x476947;};}(_0x2185a2)));}),!_0x2ebd23){try{for(_0x58a4fd in _0x1f67e1)if(!(_0x28c6d9&&_0x39938d[_0x29e6e8(0x12a)](_0x58a4fd))&&!this[_0x29e6e8(0xc6)](_0x1f67e1,_0x58a4fd,_0x154d99)){if(_0x17e309++,_0x154d99[_0x29e6e8(0x169)]++,_0x17e309>_0x3f5940){_0x107891=!0x0;break;}if(!_0x154d99[_0x29e6e8(0x14b)]&&_0x154d99[_0x29e6e8(0xcc)]&&_0x154d99[_0x29e6e8(0x169)]>_0x154d99[_0x29e6e8(0x138)]){_0x107891=!0x0;break;}_0x5b3828[_0x29e6e8(0x109)](_0x210df3[_0x29e6e8(0x115)](_0x2f17a1,_0xc2476,_0x1f67e1,_0x1d98f7,_0x58a4fd,_0x154d99));}}catch{}if(_0xc2476[_0x29e6e8(0x136)]=!0x0,_0xd78fce&&(_0xc2476[_0x29e6e8(0xe7)]=!0x0),!_0x107891){var _0x11257b=[][_0x29e6e8(0x17c)](this[_0x29e6e8(0x189)](_0x1f67e1))['concat'](this[_0x29e6e8(0x171)](_0x1f67e1));for(_0x2c214c=0x0,_0xa8dc31=_0x11257b[_0x29e6e8(0x194)];_0x2c214c<_0xa8dc31;_0x2c214c++)if(_0x58a4fd=_0x11257b[_0x2c214c],!(_0x28c6d9&&_0x39938d[_0x29e6e8(0x12a)](_0x58a4fd[_0x29e6e8(0x180)]()))&&!this[_0x29e6e8(0xc6)](_0x1f67e1,_0x58a4fd,_0x154d99)&&!_0xc2476[_0x29e6e8(0x103)+_0x58a4fd[_0x29e6e8(0x180)]()]){if(_0x17e309++,_0x154d99['autoExpandPropertyCount']++,_0x17e309>_0x3f5940){_0x107891=!0x0;break;}if(!_0x154d99[_0x29e6e8(0x14b)]&&_0x154d99['autoExpand']&&_0x154d99[_0x29e6e8(0x169)]>_0x154d99['autoExpandLimit']){_0x107891=!0x0;break;}_0x5b3828[_0x29e6e8(0x109)](_0x210df3[_0x29e6e8(0x115)](_0x2f17a1,_0xc2476,_0x1f67e1,_0x1d98f7,_0x58a4fd,_0x154d99));}}}}}if(_0x5ea3e2[_0x29e6e8(0x199)]=_0x1d98f7,_0x9e9cb6?(_0x5ea3e2[_0x29e6e8(0x108)]=_0x1f67e1[_0x29e6e8(0x13e)](),this[_0x29e6e8(0x104)](_0x1d98f7,_0x5ea3e2,_0x154d99,_0x17d423)):_0x1d98f7==='date'?_0x5ea3e2[_0x29e6e8(0x108)]=this['_dateToString'][_0x29e6e8(0x17f)](_0x1f67e1):_0x1d98f7===_0x29e6e8(0x17a)?_0x5ea3e2[_0x29e6e8(0x108)]=_0x1f67e1[_0x29e6e8(0x180)]():_0x1d98f7===_0x29e6e8(0x143)?_0x5ea3e2[_0x29e6e8(0x108)]=this[_0x29e6e8(0x10b)][_0x29e6e8(0x17f)](_0x1f67e1):_0x1d98f7===_0x29e6e8(0x125)&&this[_0x29e6e8(0x17e)]?_0x5ea3e2[_0x29e6e8(0x108)]=this[_0x29e6e8(0x17e)][_0x29e6e8(0x19b)]['toString'][_0x29e6e8(0x17f)](_0x1f67e1):!_0x154d99[_0x29e6e8(0x167)]&&!(_0x1d98f7===_0x29e6e8(0xd2)||_0x1d98f7==='undefined')&&(delete _0x5ea3e2[_0x29e6e8(0x108)],_0x5ea3e2[_0x29e6e8(0x11e)]=!0x0),_0x107891&&(_0x5ea3e2[_0x29e6e8(0x15c)]=!0x0),_0xe545fa=_0x154d99['node'][_0x29e6e8(0xe6)],_0x154d99['node'][_0x29e6e8(0xe6)]=_0x5ea3e2,this[_0x29e6e8(0x186)](_0x5ea3e2,_0x154d99),_0x5b3828[_0x29e6e8(0x194)]){for(_0x2c214c=0x0,_0xa8dc31=_0x5b3828['length'];_0x2c214c<_0xa8dc31;_0x2c214c++)_0x5b3828[_0x2c214c](_0x2c214c);}_0x2f17a1['length']&&(_0x5ea3e2[_0x29e6e8(0x117)]=_0x2f17a1);}catch(_0x57b02c){_0x4f3740(_0x57b02c,_0x5ea3e2,_0x154d99);}return this[_0x29e6e8(0x127)](_0x1f67e1,_0x5ea3e2),this[_0x29e6e8(0x170)](_0x5ea3e2,_0x154d99),_0x154d99[_0x29e6e8(0xed)][_0x29e6e8(0xe6)]=_0xe545fa,_0x154d99['level']--,_0x154d99[_0x29e6e8(0xcc)]=_0x1b96a1,_0x154d99['autoExpand']&&_0x154d99['autoExpandPreviousObjects'][_0x29e6e8(0x156)](),_0x5ea3e2;}[_0x284004(0x171)](_0x56a8ff){var _0x489dac=_0x284004;return Object[_0x489dac(0x1a6)]?Object[_0x489dac(0x1a6)](_0x56a8ff):[];}[_0x284004(0x135)](_0x4bde89){var _0x3c8abb=_0x284004;return!!(_0x4bde89&&_0x30b1b1[_0x3c8abb(0xfa)]&&this[_0x3c8abb(0x172)](_0x4bde89)===_0x3c8abb(0x192)&&_0x4bde89[_0x3c8abb(0x126)]);}[_0x284004(0xc6)](_0x5b6272,_0xf3eb02,_0x3a45c8){var _0x17696e=_0x284004;return _0x3a45c8['noFunctions']?typeof _0x5b6272[_0xf3eb02]==_0x17696e(0xd7):!0x1;}[_0x284004(0xe2)](_0x5d88b4){var _0x38bfe1=_0x284004,_0x2ab328='';return _0x2ab328=typeof _0x5d88b4,_0x2ab328===_0x38bfe1(0x153)?this[_0x38bfe1(0x172)](_0x5d88b4)==='[object\\x20Array]'?_0x2ab328=_0x38bfe1(0x124):this['_objectToString'](_0x5d88b4)===_0x38bfe1(0x14e)?_0x2ab328=_0x38bfe1(0xe5):this[_0x38bfe1(0x172)](_0x5d88b4)===_0x38bfe1(0x146)?_0x2ab328='bigint':_0x5d88b4===null?_0x2ab328=_0x38bfe1(0xd2):_0x5d88b4[_0x38bfe1(0x16e)]&&(_0x2ab328=_0x5d88b4[_0x38bfe1(0x16e)][_0x38bfe1(0x118)]||_0x2ab328):_0x2ab328===_0x38bfe1(0x139)&&this[_0x38bfe1(0x123)]&&_0x5d88b4 instanceof this[_0x38bfe1(0x123)]&&(_0x2ab328=_0x38bfe1(0x1aa)),_0x2ab328;}[_0x284004(0x172)](_0x477087){var _0x50db5b=_0x284004;return Object[_0x50db5b(0x19b)]['toString'][_0x50db5b(0x17f)](_0x477087);}[_0x284004(0x12d)](_0x3bb822){var _0x40d7ea=_0x284004;return _0x3bb822===_0x40d7ea(0xf3)||_0x3bb822===_0x40d7ea(0x14a)||_0x3bb822===_0x40d7ea(0xbf);}['_isPrimitiveWrapperType'](_0x505564){var _0x583e35=_0x284004;return _0x505564===_0x583e35(0x14d)||_0x505564===_0x583e35(0x1b0)||_0x505564===_0x583e35(0xe1);}[_0x284004(0xfc)](_0x48a3e7,_0x4bd11e,_0x16821b,_0x1708a7,_0x3c4b35,_0x2b8de3){var _0x3e8ead=this;return function(_0x2d5f8f){var _0x565d0a=_0x3a0c,_0x3c1c79=_0x3c4b35['node'][_0x565d0a(0xe6)],_0x48957e=_0x3c4b35[_0x565d0a(0xed)][_0x565d0a(0x198)],_0x1915d8=_0x3c4b35[_0x565d0a(0xed)][_0x565d0a(0x11b)];_0x3c4b35['node'][_0x565d0a(0x11b)]=_0x3c1c79,_0x3c4b35[_0x565d0a(0xed)]['index']=typeof _0x1708a7==_0x565d0a(0xbf)?_0x1708a7:_0x2d5f8f,_0x48a3e7[_0x565d0a(0x109)](_0x3e8ead[_0x565d0a(0x179)](_0x4bd11e,_0x16821b,_0x1708a7,_0x3c4b35,_0x2b8de3)),_0x3c4b35['node'][_0x565d0a(0x11b)]=_0x1915d8,_0x3c4b35['node']['index']=_0x48957e;};}[_0x284004(0x115)](_0x4cdd0d,_0x16a367,_0x2436e3,_0x2f309e,_0x483529,_0x425b57,_0x2fecc0){var _0x433938=_0x284004,_0xfb327d=this;return _0x16a367[_0x433938(0x103)+_0x483529[_0x433938(0x180)]()]=!0x0,function(_0x3a3a83){var _0x492836=_0x433938,_0x4d3e71=_0x425b57[_0x492836(0xed)]['current'],_0x3071c0=_0x425b57[_0x492836(0xed)][_0x492836(0x198)],_0x188edc=_0x425b57['node'][_0x492836(0x11b)];_0x425b57[_0x492836(0xed)][_0x492836(0x11b)]=_0x4d3e71,_0x425b57[_0x492836(0xed)][_0x492836(0x198)]=_0x3a3a83,_0x4cdd0d[_0x492836(0x109)](_0xfb327d[_0x492836(0x179)](_0x2436e3,_0x2f309e,_0x483529,_0x425b57,_0x2fecc0)),_0x425b57[_0x492836(0xed)][_0x492836(0x11b)]=_0x188edc,_0x425b57[_0x492836(0xed)][_0x492836(0x198)]=_0x3071c0;};}[_0x284004(0x179)](_0x4b771f,_0x2b1804,_0x508251,_0x5be118,_0x1ab12b){var _0x35d4f4=_0x284004,_0x14859b=this;_0x1ab12b||(_0x1ab12b=function(_0x2c6798,_0x511dc4){return _0x2c6798[_0x511dc4];});var _0x54aa17=_0x508251[_0x35d4f4(0x180)](),_0x3315ad=_0x5be118[_0x35d4f4(0x174)]||{},_0x23e878=_0x5be118[_0x35d4f4(0x167)],_0x35756a=_0x5be118['isExpressionToEvaluate'];try{var _0x569c78=this[_0x35d4f4(0x10f)](_0x4b771f),_0x533d93=_0x54aa17;_0x569c78&&_0x533d93[0x0]==='\\x27'&&(_0x533d93=_0x533d93['substr'](0x1,_0x533d93[_0x35d4f4(0x194)]-0x2));var _0x50a7be=_0x5be118['expressionsToEvaluate']=_0x3315ad['_p_'+_0x533d93];_0x50a7be&&(_0x5be118[_0x35d4f4(0x167)]=_0x5be118[_0x35d4f4(0x167)]+0x1),_0x5be118[_0x35d4f4(0x14b)]=!!_0x50a7be;var _0x574a84=typeof _0x508251==_0x35d4f4(0x125),_0x100443={'name':_0x574a84||_0x569c78?_0x54aa17:this[_0x35d4f4(0xd5)](_0x54aa17)};if(_0x574a84&&(_0x100443[_0x35d4f4(0x125)]=!0x0),!(_0x2b1804==='array'||_0x2b1804===_0x35d4f4(0x187))){var _0x534093=this[_0x35d4f4(0x193)](_0x4b771f,_0x508251);if(_0x534093&&(_0x534093[_0x35d4f4(0x161)]&&(_0x100443[_0x35d4f4(0xd3)]=!0x0),_0x534093[_0x35d4f4(0x18e)]&&!_0x50a7be&&!_0x5be118[_0x35d4f4(0xd9)]))return _0x100443['getter']=!0x0,this['_processTreeNodeResult'](_0x100443,_0x5be118),_0x100443;}var _0xd8253e;try{_0xd8253e=_0x1ab12b(_0x4b771f,_0x508251);}catch(_0x80c97d){return _0x100443={'name':_0x54aa17,'type':_0x35d4f4(0x119),'error':_0x80c97d[_0x35d4f4(0x144)]},this['_processTreeNodeResult'](_0x100443,_0x5be118),_0x100443;}var _0x2801aa=this[_0x35d4f4(0xe2)](_0xd8253e),_0xfd2b72=this[_0x35d4f4(0x12d)](_0x2801aa);if(_0x100443['type']=_0x2801aa,_0xfd2b72)this['_processTreeNodeResult'](_0x100443,_0x5be118,_0xd8253e,function(){var _0x4de8e0=_0x35d4f4;_0x100443['value']=_0xd8253e['valueOf'](),!_0x50a7be&&_0x14859b[_0x4de8e0(0x104)](_0x2801aa,_0x100443,_0x5be118,{});});else{var _0x1b7612=_0x5be118['autoExpand']&&_0x5be118[_0x35d4f4(0xcf)]<_0x5be118[_0x35d4f4(0xe9)]&&_0x5be118['autoExpandPreviousObjects'][_0x35d4f4(0x11a)](_0xd8253e)<0x0&&_0x2801aa!=='function'&&_0x5be118[_0x35d4f4(0x169)]<_0x5be118['autoExpandLimit'];_0x1b7612||_0x5be118[_0x35d4f4(0xcf)]<_0x23e878||_0x50a7be?(this[_0x35d4f4(0x190)](_0x100443,_0xd8253e,_0x5be118,_0x50a7be||{}),this[_0x35d4f4(0x127)](_0xd8253e,_0x100443)):this[_0x35d4f4(0x113)](_0x100443,_0x5be118,_0xd8253e,function(){var _0x55c8ce=_0x35d4f4;_0x2801aa==='null'||_0x2801aa===_0x55c8ce(0x139)||(delete _0x100443['value'],_0x100443[_0x55c8ce(0x11e)]=!0x0);});}return _0x100443;}finally{_0x5be118[_0x35d4f4(0x174)]=_0x3315ad,_0x5be118[_0x35d4f4(0x167)]=_0x23e878,_0x5be118[_0x35d4f4(0x14b)]=_0x35756a;}}[_0x284004(0x104)](_0x1fd688,_0x5de22f,_0x25d445,_0x39bd6a){var _0x4c7686=_0x284004,_0x29f732=_0x39bd6a['strLength']||_0x25d445[_0x4c7686(0x105)];if((_0x1fd688===_0x4c7686(0x14a)||_0x1fd688===_0x4c7686(0x1b0))&&_0x5de22f[_0x4c7686(0x108)]){let _0x1231c6=_0x5de22f[_0x4c7686(0x108)][_0x4c7686(0x194)];_0x25d445['allStrLength']+=_0x1231c6,_0x25d445[_0x4c7686(0xfe)]>_0x25d445['totalStrLength']?(_0x5de22f[_0x4c7686(0x11e)]='',delete _0x5de22f['value']):_0x1231c6>_0x29f732&&(_0x5de22f[_0x4c7686(0x11e)]=_0x5de22f['value'][_0x4c7686(0x102)](0x0,_0x29f732),delete _0x5de22f[_0x4c7686(0x108)]);}}[_0x284004(0x10f)](_0x22f3e2){var _0x5c39f0=_0x284004;return!!(_0x22f3e2&&_0x30b1b1[_0x5c39f0(0xf6)]&&this[_0x5c39f0(0x172)](_0x22f3e2)===_0x5c39f0(0xc5)&&_0x22f3e2[_0x5c39f0(0x126)]);}[_0x284004(0xd5)](_0x4673b0){var _0x3032e2=_0x284004;if(_0x4673b0[_0x3032e2(0xcd)](/^\\d+$/))return _0x4673b0;var _0x2bf586;try{_0x2bf586=JSON[_0x3032e2(0x19e)](''+_0x4673b0);}catch{_0x2bf586='\\x22'+this[_0x3032e2(0x172)](_0x4673b0)+'\\x22';}return _0x2bf586[_0x3032e2(0xcd)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x2bf586=_0x2bf586[_0x3032e2(0x102)](0x1,_0x2bf586['length']-0x2):_0x2bf586=_0x2bf586[_0x3032e2(0x177)](/'/g,'\\x5c\\x27')[_0x3032e2(0x177)](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0x2bf586;}['_processTreeNodeResult'](_0x3ddcf2,_0x1010f7,_0x15ce14,_0x28dc42){var _0x301b48=_0x284004;this[_0x301b48(0x186)](_0x3ddcf2,_0x1010f7),_0x28dc42&&_0x28dc42(),this[_0x301b48(0x127)](_0x15ce14,_0x3ddcf2),this[_0x301b48(0x170)](_0x3ddcf2,_0x1010f7);}[_0x284004(0x186)](_0x599eb4,_0x4c41e4){var _0x540268=_0x284004;this['_setNodeId'](_0x599eb4,_0x4c41e4),this[_0x540268(0x14f)](_0x599eb4,_0x4c41e4),this[_0x540268(0x110)](_0x599eb4,_0x4c41e4),this[_0x540268(0x101)](_0x599eb4,_0x4c41e4);}['_setNodeId'](_0x278ebb,_0x328e8a){}['_setNodeQueryPath'](_0x2f7a03,_0x353e54){}['_setNodeLabel'](_0x20d80c,_0x5267ee){}[_0x284004(0x1a7)](_0x3713d7){var _0x515865=_0x284004;return _0x3713d7===this[_0x515865(0x155)];}[_0x284004(0x170)](_0x134d04,_0x5ca722){var _0x9f459c=_0x284004;this[_0x9f459c(0x111)](_0x134d04,_0x5ca722),this['_setNodeExpandableState'](_0x134d04),_0x5ca722[_0x9f459c(0x10e)]&&this[_0x9f459c(0x133)](_0x134d04),this[_0x9f459c(0x14c)](_0x134d04,_0x5ca722),this['_addLoadNode'](_0x134d04,_0x5ca722),this[_0x9f459c(0x184)](_0x134d04);}[_0x284004(0x127)](_0x3e6eac,_0x2f547e){var _0x3bce23=_0x284004;let _0x54a1b1;try{_0x30b1b1[_0x3bce23(0x148)]&&(_0x54a1b1=_0x30b1b1[_0x3bce23(0x148)][_0x3bce23(0x15b)],_0x30b1b1[_0x3bce23(0x148)][_0x3bce23(0x15b)]=function(){}),_0x3e6eac&&typeof _0x3e6eac[_0x3bce23(0x194)]==_0x3bce23(0xbf)&&(_0x2f547e['length']=_0x3e6eac['length']);}catch{}finally{_0x54a1b1&&(_0x30b1b1[_0x3bce23(0x148)][_0x3bce23(0x15b)]=_0x54a1b1);}if(_0x2f547e[_0x3bce23(0x199)]==='number'||_0x2f547e[_0x3bce23(0x199)]===_0x3bce23(0xe1)){if(isNaN(_0x2f547e[_0x3bce23(0x108)]))_0x2f547e[_0x3bce23(0xf4)]=!0x0,delete _0x2f547e[_0x3bce23(0x108)];else switch(_0x2f547e[_0x3bce23(0x108)]){case Number[_0x3bce23(0x134)]:_0x2f547e[_0x3bce23(0xde)]=!0x0,delete _0x2f547e[_0x3bce23(0x108)];break;case Number['NEGATIVE_INFINITY']:_0x2f547e[_0x3bce23(0x195)]=!0x0,delete _0x2f547e[_0x3bce23(0x108)];break;case 0x0:this[_0x3bce23(0xf5)](_0x2f547e['value'])&&(_0x2f547e[_0x3bce23(0x182)]=!0x0);break;}}else _0x2f547e[_0x3bce23(0x199)]===_0x3bce23(0xd7)&&typeof _0x3e6eac['name']==_0x3bce23(0x14a)&&_0x3e6eac[_0x3bce23(0x118)]&&_0x2f547e[_0x3bce23(0x118)]&&_0x3e6eac[_0x3bce23(0x118)]!==_0x2f547e[_0x3bce23(0x118)]&&(_0x2f547e[_0x3bce23(0x165)]=_0x3e6eac[_0x3bce23(0x118)]);}[_0x284004(0xf5)](_0x229506){var _0x4b9fcc=_0x284004;return 0x1/_0x229506===Number[_0x4b9fcc(0x1b1)];}[_0x284004(0x133)](_0x54264a){var _0x3216f3=_0x284004;!_0x54264a[_0x3216f3(0x117)]||!_0x54264a[_0x3216f3(0x117)]['length']||_0x54264a[_0x3216f3(0x199)]===_0x3216f3(0x124)||_0x54264a[_0x3216f3(0x199)]==='Map'||_0x54264a['type']==='Set'||_0x54264a[_0x3216f3(0x117)][_0x3216f3(0x1a2)](function(_0x43a884,_0x4de0cb){var _0x31afc1=_0x3216f3,_0x21cc06=_0x43a884[_0x31afc1(0x118)][_0x31afc1(0x18a)](),_0x524654=_0x4de0cb[_0x31afc1(0x118)][_0x31afc1(0x18a)]();return _0x21cc06<_0x524654?-0x1:_0x21cc06>_0x524654?0x1:0x0;});}[_0x284004(0x14c)](_0x372dbc,_0x57ebb1){var _0x4592fb=_0x284004;if(!(_0x57ebb1[_0x4592fb(0xf8)]||!_0x372dbc[_0x4592fb(0x117)]||!_0x372dbc['props'][_0x4592fb(0x194)])){for(var _0x4faa82=[],_0x464f3c=[],_0xbe2560=0x0,_0x3a6e64=_0x372dbc[_0x4592fb(0x117)][_0x4592fb(0x194)];_0xbe2560<_0x3a6e64;_0xbe2560++){var _0x1787ce=_0x372dbc['props'][_0xbe2560];_0x1787ce[_0x4592fb(0x199)]===_0x4592fb(0xd7)?_0x4faa82[_0x4592fb(0x109)](_0x1787ce):_0x464f3c[_0x4592fb(0x109)](_0x1787ce);}if(!(!_0x464f3c[_0x4592fb(0x194)]||_0x4faa82[_0x4592fb(0x194)]<=0x1)){_0x372dbc[_0x4592fb(0x117)]=_0x464f3c;var _0x51f783={'functionsNode':!0x0,'props':_0x4faa82};this[_0x4592fb(0x1b2)](_0x51f783,_0x57ebb1),this[_0x4592fb(0x111)](_0x51f783,_0x57ebb1),this[_0x4592fb(0xca)](_0x51f783),this[_0x4592fb(0x101)](_0x51f783,_0x57ebb1),_0x51f783['id']+='\\x20f',_0x372dbc[_0x4592fb(0x117)]['unshift'](_0x51f783);}}}[_0x284004(0xe4)](_0x92e0d7,_0xf36c7c){}[_0x284004(0xca)](_0xfd61f3){}[_0x284004(0x157)](_0x50f03e){var _0x1b72a1=_0x284004;return Array[_0x1b72a1(0x11c)](_0x50f03e)||typeof _0x50f03e==_0x1b72a1(0x153)&&this[_0x1b72a1(0x172)](_0x50f03e)===_0x1b72a1(0x120);}['_setNodePermissions'](_0x435918,_0x462755){}[_0x284004(0x184)](_0x386b3f){var _0x3456fd=_0x284004;delete _0x386b3f[_0x3456fd(0x1a0)],delete _0x386b3f[_0x3456fd(0x122)],delete _0x386b3f[_0x3456fd(0xd6)];}['_setNodeExpressionPath'](_0x1b4e08,_0x80f359){}}let _0x2b5e4c=new _0x2511f1(),_0x5c9f98={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x58ee1c={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x5a2b85(_0x367b74,_0x545559,_0x14618f,_0x14d4e3,_0x579a35,_0xf4010c){var _0x42b2e9=_0x284004;let _0xed63fb,_0x51bb6b;try{_0x51bb6b=_0x2a87b2(),_0xed63fb=_0x6ec684[_0x545559],!_0xed63fb||_0x51bb6b-_0xed63fb['ts']>0x1f4&&_0xed63fb[_0x42b2e9(0x162)]&&_0xed63fb[_0x42b2e9(0x10a)]/_0xed63fb[_0x42b2e9(0x162)]<0x64?(_0x6ec684[_0x545559]=_0xed63fb={'count':0x0,'time':0x0,'ts':_0x51bb6b},_0x6ec684[_0x42b2e9(0x160)]={}):_0x51bb6b-_0x6ec684['hits']['ts']>0x32&&_0x6ec684[_0x42b2e9(0x160)][_0x42b2e9(0x162)]&&_0x6ec684[_0x42b2e9(0x160)][_0x42b2e9(0x10a)]/_0x6ec684['hits'][_0x42b2e9(0x162)]<0x64&&(_0x6ec684['hits']={});let _0x3e7475=[],_0x5426ba=_0xed63fb[_0x42b2e9(0x1a5)]||_0x6ec684[_0x42b2e9(0x160)][_0x42b2e9(0x1a5)]?_0x58ee1c:_0x5c9f98,_0x49f9cf=_0x9e4318=>{var _0x1880a6=_0x42b2e9;let _0x46e22a={};return _0x46e22a[_0x1880a6(0x117)]=_0x9e4318['props'],_0x46e22a['elements']=_0x9e4318[_0x1880a6(0xf0)],_0x46e22a[_0x1880a6(0x105)]=_0x9e4318[_0x1880a6(0x105)],_0x46e22a['totalStrLength']=_0x9e4318[_0x1880a6(0x1ac)],_0x46e22a[_0x1880a6(0x138)]=_0x9e4318['autoExpandLimit'],_0x46e22a[_0x1880a6(0xe9)]=_0x9e4318['autoExpandMaxDepth'],_0x46e22a['sortProps']=!0x1,_0x46e22a[_0x1880a6(0xf8)]=!_0x373848,_0x46e22a[_0x1880a6(0x167)]=0x1,_0x46e22a[_0x1880a6(0xcf)]=0x0,_0x46e22a['expId']=_0x1880a6(0x18d),_0x46e22a[_0x1880a6(0x112)]=_0x1880a6(0x1ad),_0x46e22a[_0x1880a6(0xcc)]=!0x0,_0x46e22a['autoExpandPreviousObjects']=[],_0x46e22a[_0x1880a6(0x169)]=0x0,_0x46e22a[_0x1880a6(0xd9)]=!0x0,_0x46e22a[_0x1880a6(0xfe)]=0x0,_0x46e22a[_0x1880a6(0xed)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x46e22a;};for(var _0x28883c=0x0;_0x28883c<_0x579a35['length'];_0x28883c++)_0x3e7475[_0x42b2e9(0x109)](_0x2b5e4c['serialize']({'timeNode':_0x367b74===_0x42b2e9(0x10a)||void 0x0},_0x579a35[_0x28883c],_0x49f9cf(_0x5426ba),{}));if(_0x367b74===_0x42b2e9(0x15a)){let _0x525302=Error['stackTraceLimit'];try{Error['stackTraceLimit']=0x1/0x0,_0x3e7475[_0x42b2e9(0x109)](_0x2b5e4c[_0x42b2e9(0x190)]({'stackNode':!0x0},new Error()[_0x42b2e9(0xf7)],_0x49f9cf(_0x5426ba),{'strLength':0x1/0x0}));}finally{Error[_0x42b2e9(0x16a)]=_0x525302;}}return{'method':_0x42b2e9(0x121),'version':_0x5cb203,'args':[{'ts':_0x14618f,'session':_0x14d4e3,'args':_0x3e7475,'id':_0x545559,'context':_0xf4010c}]};}catch(_0x5cd2a4){return{'method':_0x42b2e9(0x121),'version':_0x5cb203,'args':[{'ts':_0x14618f,'session':_0x14d4e3,'args':[{'type':_0x42b2e9(0x119),'error':_0x5cd2a4&&_0x5cd2a4['message']}],'id':_0x545559,'context':_0xf4010c}]};}finally{try{if(_0xed63fb&&_0x51bb6b){let _0x12a6a7=_0x2a87b2();_0xed63fb[_0x42b2e9(0x162)]++,_0xed63fb[_0x42b2e9(0x10a)]+=_0x53f46b(_0x51bb6b,_0x12a6a7),_0xed63fb['ts']=_0x12a6a7,_0x6ec684[_0x42b2e9(0x160)][_0x42b2e9(0x162)]++,_0x6ec684['hits'][_0x42b2e9(0x10a)]+=_0x53f46b(_0x51bb6b,_0x12a6a7),_0x6ec684['hits']['ts']=_0x12a6a7,(_0xed63fb[_0x42b2e9(0x162)]>0x32||_0xed63fb[_0x42b2e9(0x10a)]>0x64)&&(_0xed63fb[_0x42b2e9(0x1a5)]=!0x0),(_0x6ec684[_0x42b2e9(0x160)][_0x42b2e9(0x162)]>0x3e8||_0x6ec684['hits']['time']>0x12c)&&(_0x6ec684['hits']['reduceLimits']=!0x0);}}catch{}}}return _0x5a2b85;}((_0x5bcb14,_0x2aae84,_0xb8c56,_0x2d6e2d,_0xd4659e,_0x2644ef,_0x236889,_0x58ba1c,_0x4d73d1,_0x1cb32d,_0x21e45e)=>{var _0x5b23aa=_0x2fc1fe;if(_0x5bcb14['_console_ninja'])return _0x5bcb14[_0x5b23aa(0xe3)];if(!X(_0x5bcb14,_0x58ba1c,_0xd4659e))return _0x5bcb14[_0x5b23aa(0xe3)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x5bcb14[_0x5b23aa(0xe3)];let _0x562ef1=b(_0x5bcb14),_0x3581b7=_0x562ef1[_0x5b23aa(0x130)],_0x4ce459=_0x562ef1[_0x5b23aa(0xce)],_0x21eed3=_0x562ef1[_0x5b23aa(0x12e)],_0x5cb1d3={'hits':{},'ts':{}},_0x85469b=H(_0x5bcb14,_0x4d73d1,_0x5cb1d3,_0x2644ef),_0x367de0=_0x527d5e=>{_0x5cb1d3['ts'][_0x527d5e]=_0x4ce459();},_0x5e6aa1=(_0xe9078b,_0x1f2f18)=>{let _0x4e7fd1=_0x5cb1d3['ts'][_0x1f2f18];if(delete _0x5cb1d3['ts'][_0x1f2f18],_0x4e7fd1){let _0x943002=_0x3581b7(_0x4e7fd1,_0x4ce459());_0x159fce(_0x85469b('time',_0xe9078b,_0x21eed3(),_0x4f1d30,[_0x943002],_0x1f2f18));}},_0x455e63=_0x80de4c=>{var _0x33b436=_0x5b23aa,_0x592686;return _0xd4659e===_0x33b436(0xd8)&&_0x5bcb14[_0x33b436(0x16c)]&&((_0x592686=_0x80de4c==null?void 0x0:_0x80de4c[_0x33b436(0x1af)])==null?void 0x0:_0x592686[_0x33b436(0x194)])&&(_0x80de4c[_0x33b436(0x1af)][0x0][_0x33b436(0x16c)]=_0x5bcb14['origin']),_0x80de4c;};_0x5bcb14[_0x5b23aa(0xe3)]={'consoleLog':(_0x4c1843,_0x5396ff)=>{var _0x5a39ac=_0x5b23aa;_0x5bcb14[_0x5a39ac(0x148)][_0x5a39ac(0x121)][_0x5a39ac(0x118)]!==_0x5a39ac(0x197)&&_0x159fce(_0x85469b(_0x5a39ac(0x121),_0x4c1843,_0x21eed3(),_0x4f1d30,_0x5396ff));},'consoleTrace':(_0x1508e4,_0x320dfe)=>{var _0x5185bc=_0x5b23aa;_0x5bcb14[_0x5185bc(0x148)][_0x5185bc(0x121)][_0x5185bc(0x118)]!==_0x5185bc(0x13d)&&_0x159fce(_0x455e63(_0x85469b(_0x5185bc(0x15a),_0x1508e4,_0x21eed3(),_0x4f1d30,_0x320dfe)));},'consoleTime':_0x178af2=>{_0x367de0(_0x178af2);},'consoleTimeEnd':(_0x43956a,_0x524e07)=>{_0x5e6aa1(_0x524e07,_0x43956a);},'autoLog':(_0x5d5b60,_0x1a1221)=>{var _0x2e0cb4=_0x5b23aa;_0x159fce(_0x85469b(_0x2e0cb4(0x121),_0x1a1221,_0x21eed3(),_0x4f1d30,[_0x5d5b60]));},'autoLogMany':(_0x31b7ca,_0x35bce4)=>{var _0x108090=_0x5b23aa;_0x159fce(_0x85469b(_0x108090(0x121),_0x31b7ca,_0x21eed3(),_0x4f1d30,_0x35bce4));},'autoTrace':(_0x465285,_0x492122)=>{var _0x52744a=_0x5b23aa;_0x159fce(_0x455e63(_0x85469b(_0x52744a(0x15a),_0x492122,_0x21eed3(),_0x4f1d30,[_0x465285])));},'autoTraceMany':(_0x3ee62d,_0x97d13f)=>{_0x159fce(_0x455e63(_0x85469b('trace',_0x3ee62d,_0x21eed3(),_0x4f1d30,_0x97d13f)));},'autoTime':(_0x5c684c,_0x3d8782,_0x33a635)=>{_0x367de0(_0x33a635);},'autoTimeEnd':(_0x435a57,_0x1e0339,_0x5cd53d)=>{_0x5e6aa1(_0x1e0339,_0x5cd53d);},'coverage':_0x10f609=>{_0x159fce({'method':'coverage','version':_0x2644ef,'args':[{'id':_0x10f609}]});}};let _0x159fce=q(_0x5bcb14,_0x2aae84,_0xb8c56,_0x2d6e2d,_0xd4659e,_0x1cb32d,_0x21e45e),_0x4f1d30=_0x5bcb14[_0x5b23aa(0x16f)];return _0x5bcb14[_0x5b23aa(0xe3)];})(globalThis,_0x2fc1fe(0x19c),'39273',\"/home/amaury/.vscode/extensions/wallabyjs.console-ninja-1.0.332/node_modules\",'webpack',_0x2fc1fe(0x12b),_0x2fc1fe(0x147),_0x2fc1fe(0xc1),_0x2fc1fe(0x106),'',_0x2fc1fe(0x178));");
  } catch (e) {}
}

;
/* istanbul ignore next */

function oo_oo(i) {
  for (var _len = arguments.length, v = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    v[_key - 1] = arguments[_key];
  }

  try {
    oo_cm().consoleLog(i, v);
  } catch (e) {}

  return v;
}

;
/* istanbul ignore next */

function oo_tr(i) {
  for (var _len2 = arguments.length, v = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    v[_key2 - 1] = arguments[_key2];
  }

  try {
    oo_cm().consoleTrace(i, v);
  } catch (e) {}

  return v;
}

;
/* istanbul ignore next */

function oo_ts(v) {
  try {
    oo_cm().consoleTime(v);
  } catch (e) {}

  return v;
}

;
/* istanbul ignore next */

function oo_te(v, i) {
  try {
    oo_cm().consoleTimeEnd(v, i);
  } catch (e) {}

  return v;
}

;
/*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/

/***/ }),

/***/ "./node_modules/colladraw/build/module/index.js":
/*!******************************************************!*\
  !*** ./node_modules/colladraw/build/module/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasElement": () => (/* reexport safe */ _lib_canvas_elements_CanvasElement_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "CanvasElementType": () => (/* reexport safe */ _lib_enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_8__.CanvasElementType),
/* harmony export */   "CanvasText": () => (/* reexport safe */ _lib_canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "Ellipse": () => (/* reexport safe */ _lib_canvas_elements_Ellipse_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "Polygon": () => (/* reexport safe */ _lib_canvas_elements_Polygon_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "Rectangle": () => (/* reexport safe */ _lib_canvas_elements_Rectangle_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "Shape": () => (/* reexport safe */ _lib_canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Triangle": () => (/* reexport safe */ _lib_canvas_elements_Triangle_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_Colladraw_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/Colladraw.js */ "./node_modules/colladraw/build/module/lib/Colladraw.js");
/* harmony import */ var _lib_canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/canvas_elements/Shape.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Shape.js");
/* harmony import */ var _lib_canvas_elements_Rectangle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/canvas_elements/Rectangle.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Rectangle.js");
/* harmony import */ var _lib_canvas_elements_Ellipse_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/canvas_elements/Ellipse.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Ellipse.js");
/* harmony import */ var _lib_canvas_elements_Polygon_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/canvas_elements/Polygon.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Polygon.js");
/* harmony import */ var _lib_canvas_elements_Triangle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/canvas_elements/Triangle.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Triangle.js");
/* harmony import */ var _lib_canvas_elements_CanvasElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/canvas_elements/CanvasElement.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasElement.js");
/* harmony import */ var _lib_canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/canvas_elements/CanvasText.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasText.js");
/* harmony import */ var _lib_enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/enums/CanvasElementType.js */ "./node_modules/colladraw/build/module/lib/enums/CanvasElementType.js");









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lib_Colladraw_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxLQUFLLE1BQU0sNkJBQTZCLENBQUM7QUFDaEQsT0FBTyxTQUFTLE1BQU0saUNBQWlDLENBQUM7QUFDeEQsT0FBTyxPQUFPLE1BQU0sK0JBQStCLENBQUM7QUFDcEQsT0FBTyxPQUFPLE1BQU0sK0JBQStCLENBQUM7QUFDcEQsT0FBTyxRQUFRLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEQsT0FBTyxhQUFhLE1BQU0scUNBQXFDLENBQUM7QUFDaEUsT0FBTyxVQUFVLE1BQU8sa0NBQWtDLENBQUM7QUFDM0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFFaEUsZUFBZSxTQUFTLENBQUM7QUFDekIsT0FBTyxFQUNILEtBQUssRUFDTCxTQUFTLEVBQ1QsT0FBTyxFQUNQLE9BQU8sRUFDUCxRQUFRLEVBQ1IsYUFBYSxFQUNiLFVBQVUsRUFDVixpQkFBaUIsRUFDcEIsQ0FBQyJ9

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/Colladraw.js":
/*!**************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/Colladraw.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Colladraw)
/* harmony export */ });
/* harmony import */ var _canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas_elements/Shape.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Shape.js");
/* harmony import */ var _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums/CanvasElementType.js */ "./node_modules/colladraw/build/module/lib/enums/CanvasElementType.js");
/* harmony import */ var _canvas_elements_Rectangle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas_elements/Rectangle.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Rectangle.js");
/* harmony import */ var _canvas_elements_Ellipse_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./canvas_elements/Ellipse.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Ellipse.js");
/* harmony import */ var _canvas_elements_Triangle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./canvas_elements/Triangle.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Triangle.js");
/* harmony import */ var _utils_AnchorConditions_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/AnchorConditions.js */ "./node_modules/colladraw/build/module/lib/utils/AnchorConditions.js");
/* harmony import */ var _utils_kebabize_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/kebabize.js */ "./node_modules/colladraw/build/module/lib/utils/kebabize.js");
/* harmony import */ var _canvas_elements_Polygon_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./canvas_elements/Polygon.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Polygon.js");
/* harmony import */ var _events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./events/CanvasEvents.js */ "./node_modules/colladraw/build/module/lib/events/CanvasEvents.js");
/* harmony import */ var _canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./canvas_elements/CanvasText.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasText.js");
/* harmony import */ var _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./canvas_elements/Line.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Line.js");
/* harmony import */ var _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/ResizeFunctions.js */ "./node_modules/colladraw/build/module/lib/utils/ResizeFunctions.js");












class Colladraw {
    canvas;
    context;
    grid;
    gridPixelMerge = 5;
    background;
    backgroundColor = '#fafafa';
    disableBackspace = false;
    state = {
        variables: {},
        history: {
            undo: [],
            redo: []
        }
    };
    onClickLocker = false;
    constructor(canvas, gridPixelMerge = 5) {
        document.head.appendChild(document.createElement('script')).src = 'https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js';
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        this.canvas = {
            canvas,
            elements: []
        };
        this.gridPixelMerge = gridPixelMerge;
        this.context = canvas.getContext('2d');
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, canvas.width, canvas.height);
        this.background = canvas;
        this.addToHistory();
        this.initGrid();
        this.canvas.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.canvas.addEventListener('click', this.onClick.bind(this));
        canvas.addEventListener('anchor-point-hovered', (e) => {
            if (e.detail.anchorPoint === 'top') {
                document.body.style.cursor = 'ns-resize';
            }
            else if (e.detail.anchorPoint === 'bottom') {
                document.body.style.cursor = 'ns-resize';
            }
            else if (e.detail.anchorPoint === 'left') {
                document.body.style.cursor = 'ew-resize';
            }
            else if (e.detail.anchorPoint === 'right') {
                document.body.style.cursor = 'ew-resize';
            }
            else if (e.detail.anchorPoint === 'topLeft') {
                document.body.style.cursor = 'nwse-resize';
            }
            else if (e.detail.anchorPoint === 'topRight') {
                document.body.style.cursor = 'nesw-resize';
            }
            else if (e.detail.anchorPoint === 'bottomLeft') {
                document.body.style.cursor = 'nesw-resize';
            }
            else if (e.detail.anchorPoint === 'bottomRight') {
                document.body.style.cursor = 'nwse-resize';
            }
            else {
                document.body.style.cursor = 'default';
            }
        });
        canvas.addEventListener('anchor-point-leave', () => {
            document.body.style.cursor = 'default';
        });
        window.addEventListener('keydown', (e) => {
            if (!this.disableBackspace && e.key === 'Backspace') {
                if (this.state.selectedElement) {
                    this.removeElement(this.state.selectedElement);
                    this.draw();
                    this.generateGrid();
                    this.state.selectedElement.deselect();
                    this.state.selectedElement = false;
                    this.state.selectionTransform = false;
                }
            }
            if (e.key === 'z' && e.ctrlKey) {
                this.undo();
            }
            if (e.key === 'y' && e.ctrlKey) {
                this.redo();
            }
        });
    }
    initGrid() {
        this.grid = [];
        for (let i = 0; i < this.canvas.canvas.height; i++) {
            this.grid.push([]);
            for (let j = 0; j < this.canvas.canvas.width; j++) {
                this.grid[i].push(null);
            }
        }
    }
    generateGrid() {
        if (this.elements.length > 0) {
            this.elements.forEach((element) => element.generateGrid(this.grid, this.gridPixelMerge));
        }
        else {
            this.initGrid();
        }
    }
    getClickedElement(event) {
        return this.grid[event.offsetY + this.gridPixelMerge - (event.offsetY % this.gridPixelMerge)][event.offsetX + this.gridPixelMerge - (event.offsetX % this.gridPixelMerge)];
    }
    draw(clear = true) {
        if (clear) {
            this.context.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
        }
        const elementsToDraw = this.canvas.elements.concat(this.state.drawing && (this.state.drawing.shape || this.state.drawing.line) ? this.state.drawing.shape ?? this.state.drawing.line : []);
        elementsToDraw.forEach(element => {
            if (element instanceof _canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                if (this.state.variables.fillColor) {
                    element.fillColor = this.state.variables.fillColor;
                }
                if (this.state.variables.strokeColor) {
                    element.strokeColor = this.state.variables.strokeColor;
                }
                if (this.state.variables.strokeWidth) {
                    element.strokeWidth = this.state.variables.strokeWidth;
                }
            }
            else if (element instanceof _canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_9__["default"]) {
                if (this.state.variables.fillColor) {
                    element.color = this.state.variables.fillColor;
                }
                if (this.state.variables.font) {
                    element.font = this.state.variables.font;
                }
            }
            element.draw(this.context);
        });
    }
    addElement(element, toAddToHistory = true) {
        this.canvas.elements.push(element);
        this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementCreated(element));
        if (toAddToHistory) {
            this.addToHistory();
        }
    }
    removeElement(elementToDelete) {
        this.canvas.elements = this.canvas.elements.filter(element => element !== elementToDelete);
        this.addToHistory();
    }
    get elements() {
        return this.canvas.elements;
    }
    addToHistory() {
        this.state.history.current = this.toJSON();
        this.state.history.undo.push(this.state.history.current);
    }
    undo() {
        this.state.history.redo.push(this.state.history.current);
        this.state.history.current = this.state.history.undo.pop();
        if (this.state.history.current) {
            this.load(this.state.history.current);
        }
        this.draw();
    }
    redo() {
        this.state.history.undo.push(this.state.history.current);
        this.state.history.current = this.state.history.redo.pop();
        if (this.state.history.current) {
            this.load(this.state.history.current);
        }
        this.draw();
    }
    onMouseDown(event) {
        const clickedElement = this.getClickedElement(event);
        if (!clickedElement) {
            if (this.state.selectedElement)
                this.state.selectedElement.deselect();
            this.state.selectedElement = false;
            this.state.selectionTransform = false;
            this.onClickLocker = true;
            const x = event.offsetX;
            const y = event.offsetY;
            const toolType = this.state.variables.toolType ?? _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.RECTANGLE;
            this.state = {
                ...this.state,
                variables: { toolType },
                // @ts-ignore
                typing: toolType === _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.TEXT ? {
                    ...this.state.typing,
                    text: 'Hello World',
                    font: '20px Arial'
                } : false,
                // @ts-ignore
                drawing: toolType != _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.TEXT ? {
                    ...this.state.drawing,
                    color: '#000',
                    strokeWidth: 1,
                    startPoint: {
                        x: event.offsetX,
                        y: event.offsetY
                    }
                } : false
            };
            if (this.state.variables.toolType) {
                let element;
                switch (this.state.variables.toolType) {
                    case _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.RECTANGLE:
                        element = new _canvas_elements_Rectangle_js__WEBPACK_IMPORTED_MODULE_2__["default"](x, y, 0, 0);
                        break;
                    case _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.ELLIPSE:
                        element = new _canvas_elements_Ellipse_js__WEBPACK_IMPORTED_MODULE_3__["default"](x, y, 0, 0);
                        break;
                    case _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.TRIANGLE:
                        element = new _canvas_elements_Triangle_js__WEBPACK_IMPORTED_MODULE_4__["default"](x, y, 0, 0);
                        break;
                    case _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.LINE:
                        element = new _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_10__["default"](x, y, 0, 0);
                        break;
                    case _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.TEXT:
                        element = new _canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_9__["default"]('Hello world', x, y, this.state.variables.font ?? '12px Arial');
                        element.y += parseInt(element.font.match(/\d+/)[0] ?? '20');
                        break;
                    case _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.PENCIL:
                        if (this.state.drawing)
                            this.state.drawing.pencil = true;
                        break;
                    case _enums_CanvasElementType_js__WEBPACK_IMPORTED_MODULE_1__.CanvasElementType.ERASER:
                        if (this.state.drawing)
                            this.state.drawing.eraser = true;
                        break;
                    default:
                        element = new _canvas_elements_Rectangle_js__WEBPACK_IMPORTED_MODULE_2__["default"](x, y, 0, 0);
                        break;
                }
                if (element instanceof _canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] || element instanceof _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_10__["default"]) {
                    if (element instanceof _canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                        element.strokeColor = '#000';
                    }
                    else if (element instanceof _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_10__["default"]) {
                        element.color = '#000';
                    }
                    this.state = {
                        ...this.state,
                        drawing: {
                            ...this.state.drawing,
                            shape: element instanceof _canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? element : undefined,
                            line: element instanceof _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_10__["default"] ? element : undefined
                        }
                    };
                }
                else if (element instanceof _canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_9__["default"]) {
                    element.color = '#000';
                    this.state = {
                        ...this.state,
                        typing: {
                            ...this.state.typing,
                            text: element.text,
                            textElement: element
                        }
                    };
                    this.draw();
                }
            }
        }
        else {
            const gripMargin = 20;
            let anchorFound = false;
            Object.entries(_utils_AnchorConditions_js__WEBPACK_IMPORTED_MODULE_5__["default"]).forEach(([anchorConditionName, anchorCondition]) => {
                if (!anchorFound && !(this.state.selectedElement instanceof _canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_9__["default"]) && anchorCondition(this.grid, gripMargin, event, this.gridPixelMerge)) {
                    this.state = {
                        ...this.state,
                        selectionTransform: {
                            resize: {
                                grip: (0,_utils_kebabize_js__WEBPACK_IMPORTED_MODULE_6__["default"])(anchorConditionName)
                            }
                        }
                    };
                    anchorFound = true;
                }
            });
            if (!anchorFound && this.state.selectedElement) {
                this.state = {
                    ...this.state,
                    selectionTransform: {
                        translate: {
                            grip: {
                                x: event.offsetX - this.state.selectedElement.x,
                                y: event.offsetY - this.state.selectedElement.y
                            }
                        }
                    }
                };
            }
        }
    }
    onMouseMove(event) {
        if (this.state.selectedElement) {
            let anchorFound = false;
            Object.entries(_utils_AnchorConditions_js__WEBPACK_IMPORTED_MODULE_5__["default"]).forEach(([anchorConditionName, anchorCondition]) => {
                if (!anchorFound && !(this.state.selectedElement instanceof _canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_9__["default"]) && anchorCondition(this.grid, 20, event, this.gridPixelMerge)) {
                    this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasAnchorPointHovered(anchorConditionName, event));
                    anchorFound = true;
                }
            });
            if (!anchorFound) {
                this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasAnchorPointLeave(event));
            }
        }
        if (!this.state.selectedElement) {
            const x = event.offsetX;
            const y = event.offsetY;
            if (this.state.drawing) {
                const shouldRedraw = this.elements.some(element => element.selected);
                this.elements.forEach(element => {
                    element.deselect();
                });
                if (shouldRedraw) {
                    this.draw();
                }
            }
            if (this.state.drawing && this.state.drawing.pencil) {
                const point = new _canvas_elements_Rectangle_js__WEBPACK_IMPORTED_MODULE_2__["default"](x, y, 5, 5);
                point.selectable = false;
                this.addElement(point, false);
            }
            else if (this.state.drawing && this.state.drawing.eraser) {
                this.context.globalCompositeOperation = 'destination-out';
                const point = new _canvas_elements_Rectangle_js__WEBPACK_IMPORTED_MODULE_2__["default"](x, y, 5, 5);
                point.fillColor = this.backgroundColor;
                point.strokeColor = this.backgroundColor;
                point.selectable = false;
                this.addElement(point, false);
                this.context.globalCompositeOperation = 'source-over';
            }
            else if (this.state.drawing) {
                this.state = {
                    ...this.state,
                    drawing: {
                        ...this.state.drawing,
                        endPoint: { x, y }
                    }
                };
                if (this.state.drawing && this.state.drawing.shape) {
                    this.state.drawing.shape.width = this.state.drawing.endPoint.x - this.state.drawing.startPoint.x;
                    this.state.drawing.shape.height = this.state.drawing.endPoint.y - this.state.drawing.startPoint.y;
                    this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementMoved(this.state.drawing.shape, event));
                    //   if (this.state.drawing.shape.width < 0) {
                    //     this.state.drawing.shape.width = Math.abs(this.state.drawing.shape.width);
                    //     [this.state.drawing.startPoint.x, this.state.drawing.endPoint.x] = [this.state.drawing.endPoint.x, this.state.drawing.startPoint.x];
                    //     this.state.drawing.shape.x = this.state.drawing.startPoint.x;
                    //   }
                    //
                    //   if (this.state.drawing.shape.height < 0) {
                    //     this.state.drawing.shape.height = Math.abs(this.state.drawing.shape.height);
                    //     [this.state.drawing.startPoint.y, this.state.drawing.endPoint.y] = [this.state.drawing.endPoint.y, this.state.drawing.startPoint.y];
                    //     this.state.drawing.shape.y = this.state.drawing.startPoint.y;
                    //   }
                }
                else if (this.state.drawing && this.state.drawing.line) {
                    this.state.drawing.line.endX = this.state.drawing.endPoint.x;
                    this.state.drawing.line.endY = this.state.drawing.endPoint.y;
                    this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementMoved(this.state.drawing.line, event));
                }
            }
        }
        else if (this.state.selectedElement && this.state.selectionTransform) {
            if (this.state.selectedElement) {
                if (this.state.selectionTransform.translate) {
                    const oldX = this.state.selectedElement.x;
                    const oldY = this.state.selectedElement.y;
                    this.state.selectedElement.x = event.offsetX - this.state.selectionTransform.translate.grip.x;
                    this.state.selectedElement.y = event.offsetY - this.state.selectionTransform.translate.grip.y;
                    if (this.state.selectedElement instanceof _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_10__["default"]) {
                        this.state.selectedElement.endX = this.state.selectedElement.endX + (this.state.selectedElement.x - oldX);
                        this.state.selectedElement.endY = this.state.selectedElement.endY + (this.state.selectedElement.y - oldY);
                    }
                    this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementMoved(this.state.selectedElement, event));
                    this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementTransformed(this.state.selectedElement, {
                        type: 'translate',
                        x: this.state.selectionTransform.translate.grip.x,
                        y: this.state.selectionTransform.translate.grip.y,
                        oldX,
                        oldY
                    }));
                }
                else if (this.state.selectionTransform.resize) {
                    const oldX = this.state.selectedElement.x;
                    const oldY = this.state.selectedElement.y;
                    const oldWidth = this.state.selectedElement.width;
                    const oldHeight = this.state.selectedElement.height;
                    if (this.state.selectionTransform.resize.grip === 'top-left') {
                        _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__["default"].topLeft(this.state, event);
                    }
                    else if (this.state.selectionTransform.resize.grip === 'top-right') {
                        _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__["default"].topRight(this.state, event);
                    }
                    else if (this.state.selectionTransform.resize.grip === 'bottom-left') {
                        _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__["default"].bottomLeft(this.state, event);
                    }
                    else if (this.state.selectionTransform.resize.grip === 'bottom-right') {
                        _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__["default"].bottomRight(this.state, event);
                    }
                    else if (this.state.selectionTransform.resize.grip === 'top') {
                        _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__["default"].top(this.state, event);
                    }
                    else if (this.state.selectionTransform.resize.grip === 'right') {
                        _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__["default"].right(this.state, event);
                    }
                    else if (this.state.selectionTransform.resize.grip === 'bottom') {
                        _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__["default"].bottom(this.state, event);
                    }
                    else if (this.state.selectionTransform.resize.grip === 'left') {
                        _utils_ResizeFunctions_js__WEBPACK_IMPORTED_MODULE_11__["default"].left(this.state, event);
                    }
                    this.canvas.canvas.dispatchEvent((_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementTransformed(this.state.selectedElement, {
                        type: 'resize',
                        x: this.state.selectedElement.x,
                        y: this.state.selectedElement.y,
                        width: this.state.selectedElement.width,
                        height: this.state.selectedElement.height,
                        oldX,
                        oldY,
                        oldWidth,
                        oldHeight
                    })));
                }
            }
        }
        // if (this.state.selectionTransform || this.state.selectedShape || this.state.typing || this.state.typing) {
        if (Object.values(this.state).some(value => value)) {
            this.draw();
        }
    }
    onMouseUp(_event) {
        if (this.state.drawing && this.state.drawing.shape && this.state.drawing.shape.width !== 0 && this.state.drawing.shape.height !== 0) {
            this.addElement(this.state.drawing.shape);
        }
        else if (this.state.drawing && this.state.drawing.line) {
            this.addElement(this.state.drawing.line);
        }
        else if (this.state.drawing && (this.state.drawing.pencil || this.state.drawing.eraser)) {
            this.addToHistory();
        }
        else if (this.state.typing) {
            this.addElement(this.state.typing.textElement);
        }
        else if (this.state.selectionTransform) {
            // this.initGrid();
            // this.canvas.elements.forEach(element => {
            //   element.generateGrid(this.grid);
            // });
        }
        this.initGrid();
        this.generateGrid();
        if (this.state.drawing)
            (this.state.drawing.shape ?? this.state.drawing.line).select();
        this.state.drawing = false;
        this.state.typing = false;
        this.state.selectionTransform = false;
        this.onClickLocker = false;
    }
    onClick(event) {
        const clickedElement = this.getClickedElement(event);
        if (clickedElement) {
            if (clickedElement.selectable) {
                this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementClicked(clickedElement, event));
                if (!this.state.drawing && !this.state.typing && !this.onClickLocker) {
                    if (this.state.selectedElement) {
                        this.state.selectedElement.deselect();
                    }
                    clickedElement.select();
                    this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementSelected(clickedElement));
                    this.state.selectedElement = clickedElement;
                    this.draw();
                }
            }
        }
        else if (this.state.selectedElement) {
            this.state.selectedElement.deselect();
            this.canvas.canvas.dispatchEvent(_events_CanvasEvents_js__WEBPACK_IMPORTED_MODULE_8__["default"].CanvasElementDeselected(this.state.selectedElement));
            this.state.selectedElement = false;
            this.draw();
        }
    }
    changeFillColor(color) {
        this.state.variables.fillColor = color;
    }
    changeStrokeColor(color) {
        this.state.variables.strokeColor = color;
    }
    changeStrokeWidth(width) {
        this.state.variables.strokeWidth = width;
    }
    changeFont(font) {
        this.state.variables.font = font;
    }
    changeToolType(type) {
        this.state.variables.toolType = type;
    }
    toJSON() {
        return {
            timestamp: Date.now(),
            data: {
                elements: this.elements.map(element => element.toJSON())
            }
        };
    }
    load(json) {
        this.canvas.elements = json.data.elements.map(shape => {
            if (shape.type === 'Rectangle') {
                return _canvas_elements_Rectangle_js__WEBPACK_IMPORTED_MODULE_2__["default"].fromJSON(shape);
            }
            else if (shape.type === 'Ellipse') {
                return _canvas_elements_Ellipse_js__WEBPACK_IMPORTED_MODULE_3__["default"].fromJSON(shape);
            }
            else if (shape.type === 'Triangle') {
                return _canvas_elements_Triangle_js__WEBPACK_IMPORTED_MODULE_4__["default"].fromJSON(shape);
            }
            else if (shape.type.match(/Polygon\[\d+]/)) {
                return _canvas_elements_Polygon_js__WEBPACK_IMPORTED_MODULE_7__["default"].fromJSON(shape);
            }
            else if (shape.type === 'Line') {
                return _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_10__["default"].fromJSON(shape);
            }
            else if (shape.type === 'Text') {
                return _canvas_elements_CanvasText_js__WEBPACK_IMPORTED_MODULE_9__["default"].fromJSON(shape);
            }
            return _canvas_elements_Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromJSON(shape);
        });
        this.draw();
    }
    clear() {
        this.canvas.elements = [];
        this.draw();
        this.addToHistory();
        this.generateGrid();
    }
    toDataURL() {
        this.elements.forEach((element) => {
            element.deselect();
        });
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, 999999, 999999);
        this.draw(false);
        return this.canvas.canvas.toDataURL();
    }
    savePNG(name) {
        this.toDataURL();
        const aDownloadLink = document.createElement('a');
        aDownloadLink.download = name ?? 'canvas.png';
        aDownloadLink.href = this.toDataURL();
        aDownloadLink.click();
    }
    savePDF(name) {
        this.canvas.elements.forEach((element) => element.deselect());
        this.draw();
        // @ts-ignore
        const doc = new jspdf.jsPDF(this.canvas.canvas.width > this.canvas.canvas.height ? 'landscape' : 'portrait', 'px', [this.canvas.canvas.width, this.canvas.canvas.height]);
        const image = this.toDataURL();
        doc.addImage(image, 'JPEG', 0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
        doc.save(name ?? 'canvas.pdf');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGFkcmF3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9Db2xsYWRyYXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDNUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxTQUFTLE1BQU0sNkJBQTZCLENBQUM7QUFFcEQsT0FBTyxPQUFPLE1BQU0sMkJBQTJCLENBQUM7QUFDaEQsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFFbEQsT0FBTyxnQkFBZ0IsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLFFBQVEsTUFBTSxrQkFBa0IsQ0FBQztBQUV4QyxPQUFPLE9BQU8sTUFBTSwyQkFBMkIsQ0FBQztBQUNoRCxPQUFPLFlBQWtDLE1BQU0sdUJBQXVCLENBQUM7QUFFdkUsT0FBTyxVQUFVLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxJQUFJLE1BQU0sd0JBQXdCLENBQUM7QUFDMUMsT0FBTyxlQUFlLE1BQU0seUJBQXlCLENBQUM7QUFFdEQsTUFBTSxDQUFDLE9BQU8sT0FBTyxTQUFTO0lBQzVCLE1BQU0sQ0FHSjtJQUNGLE9BQU8sQ0FBMkI7SUFDbEMsSUFBSSxDQUFhO0lBQ2pCLGNBQWMsR0FBVyxDQUFDLENBQUM7SUFDM0IsVUFBVSxDQUFvQjtJQUM5QixlQUFlLEdBQVcsU0FBUyxDQUFDO0lBQ3BDLGdCQUFnQixHQUFZLEtBQUssQ0FBQztJQUMxQixLQUFLLEdBQVU7UUFDckIsU0FBUyxFQUFFLEVBQUU7UUFDYixPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxFQUFFO1NBQ1Q7S0FDRixDQUFDO0lBQ00sYUFBYSxHQUFZLEtBQUssQ0FBQztJQUV2QyxZQUFZLE1BQXlCLEVBQUUsaUJBQXlCLENBQUM7UUFDL0QsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFX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UUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sS0FBSyxlQUFlLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDM0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN2QztRQUNELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcs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

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasElement.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/CanvasElement.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CanvasElement)
/* harmony export */ });
class CanvasElement {
    x;
    y;
    width;
    height;
    selected = false;
    selectable = true;
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(context) {
        if (this.selected) {
            context.fillStyle = '#ff0000';
            context.strokeStyle = '#ff0000';
            context.lineWidth = 2;
            context.moveTo(this.x, this.y);
            context.beginPath();
            context.lineTo(this.x, this.y);
            context.lineTo(this.x + this.width, this.y);
            context.lineTo(this.x + this.width, this.y + this.height);
            context.lineTo(this.x, this.y + this.height);
            context.lineTo(this.x, this.y);
            context.stroke();
            context.closePath();
            const anchorSize = 6;
            context.fillRect(this.x - (anchorSize / 2), this.y - (anchorSize / 2), anchorSize, anchorSize);
            context.fillRect(this.x - (anchorSize / 2), this.y + this.height - (anchorSize / 2), anchorSize, anchorSize);
            context.fillRect(this.x + this.width - (anchorSize / 2), this.y - (anchorSize / 2), anchorSize, anchorSize);
            context.fillRect(this.x + this.width - (anchorSize / 2), this.y + this.height - (anchorSize / 2), anchorSize, anchorSize);
            context.fillRect(this.x + this.width / 2 - (anchorSize / 2), this.y - (anchorSize / 2), anchorSize, anchorSize);
            context.fillRect(this.x + this.width / 2 - (anchorSize / 2), this.y + this.height - (anchorSize / 2), anchorSize, anchorSize);
            context.fillRect(this.x - (anchorSize / 2), this.y + this.height / 2 - (anchorSize / 2), anchorSize, anchorSize);
            context.fillRect(this.x + this.width - (anchorSize / 2), this.y + this.height / 2 - (anchorSize / 2), anchorSize, anchorSize);
            context.fillRect(this.x + this.width / 2 - (anchorSize / 2), this.y + this.height / 2 - (anchorSize / 2), anchorSize, anchorSize);
        }
    }
    static fromJSON(_json) {
        throw new Error('Not implemented');
    }
    ;
    select() {
        this.selected = true;
    }
    deselect() {
        this.selected = false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FudmFzRWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FudmFzX2VsZW1lbnRzL0NhbnZhc0VsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxDQUFDLE9BQU8sT0FBZ0IsYUFBYTtJQUN6QyxDQUFDLENBQVM7SUFDVixDQUFDLENBQVM7SUFDVixLQUFLLENBQVM7SUFDZCxNQUFNLENBQVM7SUFDZixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLFVBQVUsR0FBWSxJQUFJLENBQUM7SUFFM0IsWUFBc0IsQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFhLEVBQUUsTUFBYztRQUN2RSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFpQztRQUNwQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDOUIsT0FBTyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7WUFDaEMsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFFdEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUVwQixNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFFckIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQy9GLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzdHLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzVHLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDMUgsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2hILE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzlILE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNqSCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM5SCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDbkk7SUFDSCxDQUFDO0lBS0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUEwQjtRQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDckMsQ0FBQztJQUFBLENBQUM7SUFFRixNQUFNO1FBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0NBQ0YifQ==

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasText.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/CanvasText.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CanvasText)
/* harmony export */ });
/* harmony import */ var _CanvasElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasElement.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasElement.js");

class CanvasText extends _CanvasElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    text;
    font;
    color;
    highlightColor;
    highlighted;
    constructor(text, x, y, font) {
        super(x, y, 0, 0);
        this.text = text;
        this.font = font;
    }
    draw(context) {
        if (this.highlighted) {
            this.highlight(context, false);
        }
        context.font = this.font;
        context.fillStyle = this.color;
        this.width = context.measureText(this.text).width;
        this.height = parseInt(this.font.match(/\d+/)[0] ?? '20');
        context.fillText(this.text, this.x, this.y);
        if (this.selected) {
            context.fillStyle = '#ff0000';
            context.strokeStyle = '#ff0000';
            context.lineWidth = 2;
            context.moveTo(this.x, this.y + 3);
            context.beginPath();
            context.lineTo(this.x, this.y + 3);
            context.lineTo(this.x + this.width, this.y + 3);
            context.stroke();
            context.closePath();
        }
    }
    generateGrid(canvasGrid, gridPixelMerge) {
        let minI = this.y - this.height;
        minI -= (minI % gridPixelMerge);
        let minJ = this.x;
        minJ -= (minJ % gridPixelMerge);
        let maxI = this.y;
        maxI += (gridPixelMerge - (maxI % gridPixelMerge));
        let maxJ = this.x + this.width;
        maxJ += (gridPixelMerge - (maxJ % gridPixelMerge));
        for (let i = minI; i <= maxI; i += gridPixelMerge) {
            for (let j = minJ; j <= maxJ; j += gridPixelMerge) {
                canvasGrid[i][j] = this;
            }
        }
    }
    highlight(context, redraw = true) {
        context.fillStyle = this.highlightColor;
        context.globalCompositeOperation = 'multiply';
        context.fillRect(this.x, this.y - this.height, this.width, this.height);
        context.globalCompositeOperation = 'source-over';
        this.highlighted = true;
        if (redraw) {
            this.draw(context);
        }
    }
    toJSON() {
        return {
            type: "Text",
            x: this.x,
            y: this.y,
            text: this.text,
            font: this.font,
            color: this.color,
            highlightColor: this.highlightColor,
            highlighted: this.highlighted,
        };
    }
    static fromJSON(json) {
        const text = new CanvasText(json.text, json.x, json.y, json.font);
        text.color = json.color;
        text.highlightColor = json.highlightColor;
        text.highlighted = json.highlighted;
        return text;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FudmFzVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FudmFzX2VsZW1lbnRzL0NhbnZhc1RleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFJNUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsYUFBYTtJQUNuRCxJQUFJLENBQVM7SUFDYixJQUFJLENBQVM7SUFDYixLQUFLLENBQVM7SUFDZCxjQUFjLENBQVM7SUFDdkIsV0FBVyxDQUFVO0lBRXJCLFlBQ0UsSUFBWSxFQUNaLENBQVMsRUFDVCxDQUFTLEVBQ1QsSUFBWTtRQUVaLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQWlDO1FBQ3BDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNoQztRQUVELE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN6QixPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFFMUQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUM5QixPQUFPLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztZQUNoQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVuQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoRCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDakIsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQUVELFlBQVksQ0FBQyxVQUFzQixFQUFFLGNBQXNCO1FBQ3pELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNoQyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFFbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLElBQUksY0FBYyxFQUFFO1lBQ2pELEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxJQUFJLGNBQWMsRUFBRTtnQkFDakQsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzthQUN6QjtTQUNGO0lBQ0gsQ0FBQztJQUVELFNBQVMsQ0FBQyxPQUFpQyxFQUFFLFNBQWtCLElBQUk7UUFDakUsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyx3QkFBd0IsR0FBRyxVQUFVLENBQUM7UUFDOUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RSxPQUFPLENBQUMsd0JBQXdCLEdBQUcsYUFBYSxDQUFDO1FBQ2pELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXhCLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTztZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDOUIsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQXNCO1FBQ3BDLE1BQU0sSUFBSSxHQUFHLElBQUksVUFBVSxDQUN6QixJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsSUFBSSxDQUNWLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRiJ9

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/Ellipse.js":
/*!****************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/Ellipse.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ellipse)
/* harmony export */ });
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Shape.js");

class Ellipse extends _Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }
    generateGrid(canvasGrid, gridPixelMerge) {
        let minI = this.height < 0 ? this.y + this.height : this.y;
        minI -= (minI % gridPixelMerge);
        let minJ = this.width < 0 ? this.x + this.width : this.x;
        minJ -= (minJ % gridPixelMerge);
        let maxI = this.height < 0 ? this.y : this.y + this.height;
        maxI += (gridPixelMerge - (maxI % gridPixelMerge));
        let maxJ = this.width < 0 ? this.x : this.x + this.width;
        maxJ += (gridPixelMerge - (maxJ % gridPixelMerge));
        for (let i = minI; i <= maxI; i += gridPixelMerge) {
            for (let j = minJ; j <= maxJ; j += gridPixelMerge) {
                canvasGrid[i][j] = this;
            }
        }
    }
    draw(context) {
        super.draw(context, () => {
            context.ellipse(Math.abs(this.x + this.width / 2), Math.abs(this.y + this.height / 2), Math.abs(this.width / 2), Math.abs(this.height / 2), 0, 0, 2 * Math.PI);
            context.stroke();
            context.fill();
        });
    }
    toJSON() {
        return {
            type: 'Ellipse',
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            fillColor: this.fillColor,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth,
        };
    }
    static fromJSON(json) {
        const ellipse = new Ellipse(json.x, json.y, json.width, json.height);
        ellipse.fillColor = json.fillColor;
        ellipse.strokeColor = json.strokeColor;
        ellipse.strokeWidth = json.strokeWidth;
        return ellipse;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxsaXBzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FudmFzX2VsZW1lbnRzL0VsbGlwc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBSTVCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBUSxTQUFRLEtBQUs7SUFDeEMsWUFBWSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQzdELEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsWUFBWSxDQUFDLFVBQXNCLEVBQUUsY0FBc0I7UUFDekQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzRCxJQUFJLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUMs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

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/Line.js":
/*!*************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/Line.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Line)
/* harmony export */ });
/* harmony import */ var _CanvasElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasElement.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasElement.js");

class Line extends _CanvasElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    endX;
    endY;
    color;
    constructor(x, y, endX, endY) {
        super(x, y, 0, 0);
        this.endX = endX;
        this.endY = endY;
    }
    getCoordinates(startX = this.x, startY = this.y, endX = this.endX, endY = this.endY) {
        return [
            [startX, startY],
            [endX, endY]
        ];
    }
    generateGrid(canvasGrid, gridPixelMerge) {
        let minI = Math.min(this.y, this.endY);
        minI -= (minI % gridPixelMerge);
        let minJ = Math.min(this.x, this.endX);
        minJ -= (minJ % gridPixelMerge);
        let maxI = Math.max(this.y, this.endY);
        maxI += (gridPixelMerge - (maxI % gridPixelMerge));
        let maxJ = Math.max(this.x, this.endX);
        maxJ += (gridPixelMerge - (maxJ % gridPixelMerge));
        for (let i = minI; i <= minJ; i += gridPixelMerge) {
            for (let j = minJ; j <= maxJ; j += gridPixelMerge) {
                canvasGrid[i][j] = this;
            }
        }
    }
    draw(context) {
        this.width = Math.abs(this.x - this.endX);
        this.height = Math.abs(this.y - this.endY);
        context.strokeStyle = this.color || '#000';
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.endX, this.endY);
        context.lineWidth = 10;
        context.stroke();
        context.closePath();
        super.draw(context);
    }
    static fromJSON(json) {
        const line = new Line(json.x, json.y, json.endX, json.endY);
        line.color = json.color;
        return line;
    }
    toJSON() {
        return {
            type: 'Line',
            x: this.x,
            y: this.y,
            endX: this.endX,
            endY: this.endY,
            color: this.color
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FudmFzX2VsZW1lbnRzL0xpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFHNUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxJQUFLLFNBQVEsYUFBYTtJQUM3QyxJQUFJLENBQVM7SUFDYixJQUFJLENBQVM7SUFDYixLQUFLLENBQVU7SUFFZixZQUFZLENBQVMsRUFBRSxDQUFTLEVBQUUsSUFBWSxFQUFFLElBQVk7UUFDMUQsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRCxjQUFjLENBQUMsU0FBaUIsSUFBSSxDQUFDLENBQUMsRUFBRSxTQUFpQixJQUFJLENBQUMsQ0FBQyxFQUFFLE9BQWUsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFlLElBQUksQ0FBQyxJQUFJO1FBQ2pILE9BQU87WUFDTCxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDaEIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1NBQ2IsQ0FBQztJQUNKLENBQUM7SUFFRCxZQUFZLENBQUMsVUFBc0IsRUFBRSxjQUFzQjtRQUN6RCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQztRQUNoQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQztRQUNoQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFFbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLElBQUksY0FBYyxFQUFFO1lBQ2pELEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxJQUFJLGNBQWMsRUFBRTtnQkFDakQsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzthQUN6QjtTQUNGO0lBQ0gsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFpQztRQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUM7UUFFM0MsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXBCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxPQUFPLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUN2QixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFakIsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXBCLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBZ0I7UUFDOUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTztZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ2xCLENBQUM7SUFDSixDQUFDO0NBQ0YifQ==

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/Polygon.js":
/*!****************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/Polygon.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Polygon)
/* harmony export */ });
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shape.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Shape.js");

class Polygon extends _Shape_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    sidesNumber;
    polygonName;
    coordinates;
    constructor(x, y, width, height, sidesNumber, polygonName) {
        super(x, y, width, height);
        this.sidesNumber = sidesNumber;
        this.polygonName = polygonName;
    }
    getCoordinates(startX = this.x, startY = this.y) {
        const coordinates = [];
        for (let i = 0; i < this.sidesNumber; i++) {
            coordinates.push([startX + this.width * Math.cos(i * 2 * Math.PI / this.sidesNumber), startY + this.height * Math.sin(i * 2 * Math.PI / this.sidesNumber)]);
        }
        return coordinates;
    }
    generateGrid(canvasGrid, gridPixelMerge) {
        let minI = Math.min(...this.coordinates.map(coordinate => coordinate[1]));
        minI -= (minI % gridPixelMerge);
        let minJ = Math.min(...this.coordinates.map(coordinate => coordinate[0]));
        minJ -= (minJ % gridPixelMerge);
        let maxI = this.height > 0 ? Math.max(...this.coordinates.map(coordinate => coordinate[1])) : minI + Math.abs(this.height);
        maxI += (gridPixelMerge - (maxI % gridPixelMerge));
        let maxJ = Math.max(...this.coordinates.map(coordinate => coordinate[0]));
        maxJ += (gridPixelMerge - (maxJ % gridPixelMerge));
        for (let i = minI; i <= maxI; i += gridPixelMerge) {
            for (let j = minJ; j <= maxJ; j += gridPixelMerge) {
                canvasGrid[i][j] = this;
            }
        }
    }
    draw(context) {
        this.coordinates = this.getCoordinates();
        super.draw(context, () => {
            context.moveTo(this.coordinates[0][0], this.coordinates[0][1]);
            [...this.coordinates.slice(1, this.coordinates.length), this.coordinates[0]].forEach(([x, y]) => {
                context.lineTo(x, y);
                context.stroke();
                context.fill();
            });
        });
    }
    toJSON() {
        return {
            type: this.polygonName ?? `Polygon[${this.sidesNumber}]`,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            fillColor: this.fillColor,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth,
        };
    }
    static fromJSON(json) {
        if (json.type === 'Ellipse' || json.type === 'Pencil' || json.type === 'Eraser') {
            throw new Error('Cannot convert ellipse to polygon');
        }
        const polygon = new Polygon(json.x, json.y, json.width, json.height, parseInt(json.type.match(/\d+/)[0]), json.type);
        polygon.fillColor = json.fillColor;
        polygon.strokeColor = json.strokeColor;
        polygon.strokeWidth = json.strokeWidth;
        return polygon;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9seWdvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FudmFzX2VsZW1lbnRzL1BvbHlnb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBSzVCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBUSxTQUFRLEtBQUs7SUFDeEMsV0FBVyxDQUFTO0lBQ3BCLFdBQVcsQ0FBcUI7SUFDeEIsV0FBVyxDQUFhO0lBRWhDLFlBQVksQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFhLEVBQUUsTUFBYyxFQUFFLFdBQW1CLEVBQUUsV0FBK0I7UUFDbkgsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzdDLE1BQU0sV0FBVyxHQUFlLEVBQUUsQ0FBQztRQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENB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

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/Rectangle.js":
/*!******************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/Rectangle.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Rectangle)
/* harmony export */ });
/* harmony import */ var _Polygon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Polygon.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Polygon.js");

class Rectangle extends _Polygon_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(x, y, width, height) {
        super(x, y, width, height, 4, 'Rectangle');
    }
    getCoordinates(startX = this.x, startY = this.y) {
        return [
            [startX, startY],
            [startX + this.width, startY],
            [startX + this.width, startY + this.height],
            [startX, startY + this.height]
        ];
    }
    static fromJSON(json) {
        const rectangle = new Rectangle(json.x, json.y, json.width, json.height);
        rectangle.fillColor = json.fillColor;
        rectangle.strokeColor = json.strokeColor;
        rectangle.strokeWidth = json.strokeWidth;
        return rectangle;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjdGFuZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9jYW52YXNfZWxlbWVudHMvUmVjdGFuZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLFdBQVcsQ0FBQztBQUdoQyxNQUFNLENBQUMsT0FBTyxPQUFPLFNBQVUsU0FBUSxPQUFPO0lBQzVDLFlBQVksQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFhLEVBQUUsTUFBYztRQUM3RCxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsY0FBYyxDQUFDLFNBQWlCLElBQUksQ0FBQyxDQUFDLEVBQUUsU0FBaUIsSUFBSSxDQUFDLENBQUM7UUFDN0QsT0FBTztZQUNMLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUNoQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztZQUM3QixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzNDLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQy9CLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFpQjtRQUMvQixNQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekUsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3JDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN6QyxTQUFTLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekMsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztDQUNGIn0=

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/Shape.js":
/*!**************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/Shape.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Shape)
/* harmony export */ });
/* harmony import */ var _CanvasElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasElement.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/CanvasElement.js");

class Shape extends _CanvasElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    fillColor;
    strokeColor;
    strokeWidth;
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.width = width;
        this.height = height;
    }
    draw(context, _draw = () => { }) {
        context.lineWidth = this.strokeWidth || 0;
        context.strokeStyle = this.strokeColor || '#000';
        context.fillStyle = this.fillColor || '#000';
        context.beginPath();
        _draw();
        context.closePath();
        super.draw(context);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NhbnZhc19lbGVtZW50cy9TaGFwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUU1QyxNQUFNLENBQUMsT0FBTyxPQUFnQixLQUFNLFNBQVEsYUFBYTtJQUN2RCxTQUFTLENBQVU7SUFDbkIsV0FBVyxDQUFVO0lBQ3JCLFdBQVcsQ0FBVTtJQUVyQixZQUFzQixDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQ3ZFLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQWlDLEVBQUUsUUFBa0IsR0FBRyxFQUFFLEdBQUUsQ0FBQztRQUNoRSxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUM7UUFDakQsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQztRQUU3QyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFcEIsS0FBSyxFQUFFLENBQUM7UUFFUixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFcEIsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QixDQUFDO0NBQ0YifQ==

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/canvas_elements/Triangle.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/canvas_elements/Triangle.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Triangle)
/* harmony export */ });
/* harmony import */ var _Polygon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Polygon.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Polygon.js");

class Triangle extends _Polygon_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(x, y, width, height) {
        super(x, y, width, height, 3, 'Triangle');
    }
    getCoordinates(startX = this.x, startY = this.y) {
        return [
            [startX, startY],
            [startX + this.width, startY],
            [startX + this.width / 2, startY + this.height]
        ];
    }
    static fromJSON(json) {
        const rectangle = new Triangle(json.x, json.y, json.width, json.height);
        rectangle.fillColor = json.fillColor;
        rectangle.strokeColor = json.strokeColor;
        rectangle.strokeWidth = json.strokeWidth;
        return rectangle;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJpYW5nbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NhbnZhc19lbGVtZW50cy9UcmlhbmdsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxXQUFXLENBQUM7QUFHaEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxRQUFTLFNBQVEsT0FBTztJQUMzQyxZQUFZLENBQVMsRUFBRSxDQUFTLEVBQUUsS0FBYSxFQUFFLE1BQWM7UUFDN0QsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELGNBQWMsQ0FBQyxTQUFpQixJQUFJLENBQUMsQ0FBQyxFQUFFLFNBQWlCLElBQUksQ0FBQyxDQUFDO1FBQzdELE9BQU87WUFDTCxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDaEIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7WUFDN0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDaEQsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQWlCO1FBQy9CLE1BQU0sU0FBUyxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RSxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDckMsU0FBUyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3pDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN6QyxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0NBQ0YifQ==

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/enums/CanvasElementType.js":
/*!****************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/enums/CanvasElementType.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasElementType": () => (/* binding */ CanvasElementType)
/* harmony export */ });
var CanvasElementType;
(function (CanvasElementType) {
    CanvasElementType["RECTANGLE"] = "rectangle";
    CanvasElementType["ELLIPSE"] = "ellipse";
    CanvasElementType["TRIANGLE"] = "triangle";
    CanvasElementType["POLYGON"] = "polygon";
    CanvasElementType["TEXT"] = "text";
    CanvasElementType["LINE"] = "line";
    CanvasElementType["PENCIL"] = "pencil";
    CanvasElementType["ERASER"] = "eraser";
})(CanvasElementType || (CanvasElementType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FudmFzRWxlbWVudFR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2VudW1zL0NhbnZhc0VsZW1lbnRUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBTixJQUFZLGlCQVNYO0FBVEQsV0FBWSxpQkFBaUI7SUFDM0IsNENBQXVCLENBQUE7SUFDdkIsd0NBQW1CLENBQUE7SUFDbkIsMENBQXFCLENBQUE7SUFDckIsd0NBQW1CLENBQUE7SUFDbkIsa0NBQWEsQ0FBQTtJQUNiLGtDQUFhLENBQUE7SUFDYixzQ0FBaUIsQ0FBQTtJQUNqQixzQ0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBVFcsaUJBQWlCLEtBQWpCLGlCQUFpQixRQVM1QiJ9

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/events/CanvasEvents.js":
/*!************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/events/CanvasEvents.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    CanvasElementClicked: (element, mouseevent) => new CustomEvent('element-clicked', {
        detail: { element, mouseevent }
    }),
    CanvasElementSelected: (element) => new CustomEvent('element-selected', {
        detail: { element }
    }),
    CanvasElementDeselected: (element) => new CustomEvent('element-deselected', {
        detail: { element }
    }),
    CanvasElementMoved: (element, mouseevent) => new CustomEvent('element-moved', {
        detail: { element, mouseevent }
    }),
    CanvasElementTransformed: (element, transformation) => new CustomEvent('element-transform', {
        detail: { element, transformation }
    }),
    CanvasElementCreated: (element) => new CustomEvent('element-created', {
        detail: { element }
    }),
    CanvasAnchorPointClicked: (anchorPoint, mouseevent) => new CustomEvent('anchor-point-clicked', {
        detail: { anchorPoint, mouseevent }
    }),
    CanvasAnchorPointHovered: (anchorPoint, mouseevent) => new CustomEvent('anchor-point-hovered', {
        detail: { anchorPoint, mouseevent }
    }),
    CanvasAnchorPointLeave: (mouseevent) => new CustomEvent('anchor-point-leave', {
        detail: { mouseevent }
    }),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FudmFzRXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9ldmVudHMvQ2FudmFzRXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBCQSxlQUFlO0lBQ2Isb0JBQW9CLEVBQUUsQ0FBQyxPQUFzQixFQUFFLFVBQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFxRCxpQkFBaUIsRUFBRTtRQUMvSixNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFO0tBQ2hDLENBQUM7SUFFRixxQkFBcUIsRUFBRSxDQUFDLE9BQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUE2QixrQkFBa0IsRUFBRTtRQUNqSCxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUU7S0FDcEIsQ0FBQztJQUVGLHVCQUF1QixFQUFFLENBQUMsT0FBc0IsRUFBRSxFQUFFLENBQUMsSUFBSSxXQUFXLENBQTZCLG9CQUFvQixFQUFFO1FBQ3JILE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRTtLQUNwQixDQUFDO0lBRUYsa0JBQWtCLEVBQUUsQ0FBQyxPQUFzQixFQUFFLFVBQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFxRCxlQUFlLEVBQUU7UUFDM0osTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRTtLQUNoQyxDQUFDO0lBRUYsd0JBQXdCLEVBQUUsQ0FBQyxPQUFzQixFQUFFLGNBQW1DLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFrRSxtQkFBbUIsRUFBRTtRQUMvTCxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFO0tBQ3BDLENBQUM7SUFFRixvQkFBb0IsRUFBRSxDQUFDLE9BQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUE2QixpQkFBaUIsRUFBRTtRQUMvRyxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUU7S0FDcEIsQ0FBQztJQUVGLHdCQUF3QixFQUFFLENBQUMsV0FBd0IsRUFBRSxVQUFzQixFQUFFLEVBQUUsQ0FBQyxJQUFJLFdBQVcsQ0FBdUQsc0JBQXNCLEVBQUU7UUFDNUssTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRTtLQUNwQyxDQUFDO0lBRUYsd0JBQXdCLEVBQUUsQ0FBQyxXQUF3QixFQUFFLFVBQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUF1RCxzQkFBc0IsRUFBRTtRQUM1SyxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFO0tBQ3BDLENBQUM7SUFFRixzQkFBc0IsRUFBRSxDQUFDLFVBQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUE2QixvQkFBb0IsRUFBRTtRQUNwSCxNQUFNLEVBQUUsRUFBRSxVQUFVLEVBQUU7S0FDdkIsQ0FBQztDQUNILENBQUEifQ==

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/utils/AnchorConditions.js":
/*!***************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/utils/AnchorConditions.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const fixEventOffset = (event, gridPixelMerge) => {
    return {
        offsetX: event.offsetX + gridPixelMerge - (event.offsetX % gridPixelMerge),
        offsetY: event.offsetY + gridPixelMerge - (event.offsetY % gridPixelMerge)
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    topLeft: (grid, gripMargin, event, gridPixelMerge) => {
        const { offsetX, offsetY } = fixEventOffset(event, gridPixelMerge);
        return grid.some(row => {
            return row.some(cell => {
                return cell && offsetX - gripMargin < cell.x && cell.x < offsetX + gripMargin && offsetY - gripMargin < cell.y && cell.y < offsetY + gripMargin;
            });
        });
    },
    topRight: (grid, gripMargin, event, gridPixelMerge) => {
        const { offsetX, offsetY } = fixEventOffset(event, gridPixelMerge);
        return grid.some(row => {
            return row.some(cell => {
                return cell && offsetX - gripMargin < cell.x + cell.width && cell.x + cell.width < offsetX + gripMargin && offsetY - gripMargin < cell.y && cell.y < offsetY + gripMargin;
            });
        });
    },
    bottomLeft: (grid, gripMargin, event, gridPixelMerge) => {
        const { offsetX, offsetY } = fixEventOffset(event, gridPixelMerge);
        return grid.some(row => {
            return row.some(cell => {
                return cell && offsetX - gripMargin < cell.x && cell.x < offsetX + gripMargin && offsetY - gripMargin < cell.y + cell.height && cell.y + cell.height < offsetY + gripMargin;
            });
        });
    },
    bottomRight: (grid, gripMargin, event, gridPixelMerge) => {
        const { offsetX, offsetY } = fixEventOffset(event, gridPixelMerge);
        return grid.some(row => {
            return row.some(cell => {
                return cell && offsetX - gripMargin < cell.x + cell.width && cell.x + cell.width < offsetX + gripMargin && offsetY - gripMargin < cell.y + cell.height && cell.y + cell.height < offsetY + gripMargin;
            });
        });
    },
    left: (grid, gripMargin, event, gridPixelMerge) => {
        const { offsetX, offsetY } = fixEventOffset(event, gridPixelMerge);
        return grid.some(row => {
            return row.some(cell => {
                return cell && offsetX - gripMargin < cell.x && cell.x < offsetX + gripMargin && offsetY - gripMargin < cell.y + cell.height / 2 && cell.y + cell.height / 2 < offsetY + gripMargin;
            });
        });
    },
    right: (grid, gripMargin, event, gridPixelMerge) => {
        const { offsetX, offsetY } = fixEventOffset(event, gridPixelMerge);
        return grid.some(row => {
            return row.some(cell => {
                return cell && offsetX - gripMargin < cell.x + cell.width && cell.x + cell.width < offsetX + gripMargin && offsetY - gripMargin < cell.y + cell.height / 2 && cell.y + cell.height / 2 < offsetY + gripMargin;
            });
        });
    },
    bottom: (grid, gripMargin, event, gridPixelMerge) => {
        const { offsetX, offsetY } = fixEventOffset(event, gridPixelMerge);
        return grid.some(row => {
            return row.some(cell => {
                return cell && offsetX - gripMargin < cell.x + cell.width / 2 && cell.x + cell.width / 2 < offsetX + gripMargin && offsetY - gripMargin < cell.y + cell.height && cell.y + cell.height < offsetY + gripMargin;
            });
        });
    },
    top: (grid, gripMargin, event, gridPixelMerge) => {
        const { offsetX, offsetY } = fixEventOffset(event, gridPixelMerge);
        return grid.some(row => {
            return row.some(cell => {
                return cell && offsetX - gripMargin < cell.x + cell.width / 2 && cell.x + cell.width / 2 < offsetX + gripMargin && offsetY - gripMargin < cell.y;
            });
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5jaG9yQ29uZGl0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdXRpbHMvQW5jaG9yQ29uZGl0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLGNBQWMsR0FBRyxDQUFDLEtBQWlCLEVBQUUsY0FBc0IsRUFHL0QsRUFBRTtJQUNGLE9BQU87UUFDTCxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sR0FBRyxjQUFjLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztRQUMxRSxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sR0FBRyxjQUFjLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztLQUMzRSxDQUFDO0FBQ0osQ0FBQyxDQUFBO0FBRUQsZUFBZTtJQUNiLE9BQU8sRUFBRSxDQUFDLElBQWdCLEVBQUUsVUFBa0IsRUFBRSxLQUFpQixFQUFFLGNBQXNCLEVBQUUsRUFBRTtRQUMzRixNQUFNLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxHQUFHLGNBQWMsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFakUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDckIsT0FBTyxJQUFJLElBQUksT0FBTyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLFVBQVUsSUFBSSxPQUFPLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsVUFBVSxDQUFBO1lBQ2pKLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsUUFBUSxFQUFFLENBQUMsSUFBZ0IsRUFB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

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/utils/ResizeFunctions.js":
/*!**************************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/utils/ResizeFunctions.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../canvas_elements/Line.js */ "./node_modules/colladraw/build/module/lib/canvas_elements/Line.js");

const ResizeFunctions = {
    topLeft: (state, event) => {
        ResizeFunctions.top(state, event);
        ResizeFunctions.left(state, event);
    },
    topRight: (state, event) => {
        ResizeFunctions.top(state, event);
        ResizeFunctions.right(state, event);
    },
    bottomLeft: (state, event) => {
        ResizeFunctions.bottom(state, event);
        ResizeFunctions.left(state, event);
    },
    bottomRight: (state, event) => {
        ResizeFunctions.bottom(state, event);
        ResizeFunctions.right(state, event);
    },
    left: (state, event) => {
        if (state.selectedElement) {
            state.selectedElement.width = state.selectedElement.width + state.selectedElement.x - event.offsetX;
            state.selectedElement.x = event.offsetX;
        }
    },
    right: (state, event) => {
        if (state.selectedElement) {
            state.selectedElement.width = event.offsetX - state.selectedElement.x;
            if (state.selectedElement instanceof _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                state.selectedElement.endX = event.offsetX;
            }
        }
    },
    bottom: (state, event) => {
        if (state.selectedElement) {
            state.selectedElement.height = event.offsetY - state.selectedElement.y;
            if (state.selectedElement instanceof _canvas_elements_Line_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                state.selectedElement.endY = event.offsetY;
            }
        }
    },
    top: (state, event) => {
        if (state.selectedElement) {
            state.selectedElement.height = state.selectedElement.height + state.selectedElement.y - event.offsetY;
            state.selectedElement.y = event.offsetY;
        }
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResizeFunctions);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzaXplRnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi91dGlscy9SZXNpemVGdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxJQUFJLE1BQU0seUJBQXlCLENBQUM7QUFFM0MsTUFBTSxlQUFlLEdBQUc7SUFDdEIsT0FBTyxFQUFFLENBQUMsS0FBWSxFQUFFLEtBQWlCLEVBQUUsRUFBRTtRQUMzQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsUUFBUSxFQUFFLENBQUMsS0FBWSxFQUFFLEtBQWlCLEVBQUUsRUFBRTtRQUM1QyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxlQUFlLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsVUFBVSxFQUFFLENBQUMsS0FBWSxFQUFFLEtBQWlCLEVBQUUsRUFBRTtRQUM5QyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsV0FBVyxFQUFFLENBQUMsS0FBWSxFQUFFLEtBQWlCLEVBQUUsRUFBRTtRQUMvQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQyxlQUFlLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsSUFBSSxFQUFFLENBQUMsS0FBWSxFQUFFLEtBQWlCLEVBQUUsRUFBRTtRQUN4QyxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDekIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNwRyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQUNELEtBQUssRUFBRSxDQUFDLEtBQVksRUFBRSxLQUFpQixFQUFFLEVBQUU7UUFDekMsSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdEUsSUFBSSxLQUFLLENBQUMsZUFBZSxZQUFZLElBQUksRUFBRTtnQkFDekMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUM1QztTQUNGO0lBQ0gsQ0FBQztJQUNELE1BQU0sRUFBRSxDQUFDLEtBQVksRUFBRSxLQUFpQixFQUFFLEVBQUU7UUFDMUMsSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdkUsSUFBSSxLQUFLLENBQUMsZUFBZSxZQUFZLElBQUksRUFBRTtnQkFDekMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUM1QztTQUNGO0lBQ0gsQ0FBQztJQUNELEdBQUcsRUFBRSxDQUFDLEtBQVksRUFBRSxLQUFpQixFQUFFLEVBQUU7UUFDdkMsSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDdEcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUN6QztJQUNILENBQUM7Q0FDRixDQUFBO0FBRUQsZUFBZSxlQUFlLENBQUMifQ==

/***/ }),

/***/ "./node_modules/colladraw/build/module/lib/utils/kebabize.js":
/*!*******************************************************************!*\
  !*** ./node_modules/colladraw/build/module/lib/utils/kebabize.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2ViYWJpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3V0aWxzL2tlYmFiaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQSJ9

/***/ }),

/***/ "./resources/scss/not-found.scss":
/*!***************************************!*\
  !*** ./resources/scss/not-found.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/scss/index.scss":
/*!***********************************!*\
  !*** ./resources/scss/index.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/scss/global.scss":
/*!************************************!*\
  !*** ./resources/scss/global.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/scss/login.scss":
/*!***********************************!*\
  !*** ./resources/scss/login.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/scss/drawing.scss":
/*!*************************************!*\
  !*** ./resources/scss/drawing.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/scss/profile.scss":
/*!*************************************!*\
  !*** ./resources/scss/profile.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/canvas": 0,
/******/ 			"css/global": 0,
/******/ 			"css/profile": 0,
/******/ 			"css/drawing": 0,
/******/ 			"css/login": 0,
/******/ 			"css/index": 0,
/******/ 			"css/not-found": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/global","css/profile","css/drawing","css/login","css/index","css/not-found"], () => (__webpack_require__("./resources/js/canvas.js")))
/******/ 	__webpack_require__.O(undefined, ["css/global","css/profile","css/drawing","css/login","css/index","css/not-found"], () => (__webpack_require__("./resources/scss/index.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/global","css/profile","css/drawing","css/login","css/index","css/not-found"], () => (__webpack_require__("./resources/scss/global.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/global","css/profile","css/drawing","css/login","css/index","css/not-found"], () => (__webpack_require__("./resources/scss/login.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/global","css/profile","css/drawing","css/login","css/index","css/not-found"], () => (__webpack_require__("./resources/scss/drawing.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/global","css/profile","css/drawing","css/login","css/index","css/not-found"], () => (__webpack_require__("./resources/scss/profile.scss")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/global","css/profile","css/drawing","css/login","css/index","css/not-found"], () => (__webpack_require__("./resources/scss/not-found.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;