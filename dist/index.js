'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Ajv = _interopDefault(require('ajv'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

(function (NodeType) {
    NodeType["STRING"] = "string";
    NodeType["NUMBER"] = "number";
    NodeType["BOOLEAN"] = "boolean";
    NodeType["OBJECT"] = "object";
    NodeType["ARRAY"] = "array";
    NodeType["ROOT"] = "root";
})(exports.NodeType || (exports.NodeType = {}));
var Node = /** @class */ (function () {
    function Node(handler, type, schemaNode, parentNode, config, resolver) {
        this.state = null;
        this.tag = null;
        this.schemaNode = schemaNode;
        this.config = config;
        this.resolver = resolver;
        this.children = [];
        this.type = type;
        this.parentNode = parentNode;
        this.uid = config.uidGenerator();
    }
    Node.prototype.getHandler = function () {
        return this.handler;
    };
    Node.prototype.isOutputAvailable = function () {
        return true;
    };
    Node.prototype.validateCustom = function () {
        if (this.children.length === 0) {
            return [];
        }
        else {
            var result_1 = [];
            this.children.forEach(function (child) {
                result_1 = result_1.concat(child.validateCustom());
            });
            return result_1;
        }
    };
    Node.prototype.getDebugRepresentation = function () {
        var output = "";
        var indent = 4;
        var indentStr = " ";
        output += (this.type.toString());
        if (this.tag) {
            output += "[" + this.tag + "]";
        }
        if (this.children.length > 0) {
            output += " {\n";
            this.children.map(function (child) {
                var childText = child.getDebugRepresentation();
                output += "  > ";
                output += childText.split("\n").map(function (line, index) {
                    if (index === 0) {
                        return line;
                    }
                    return indentStr.repeat(indent) + line;
                }).join("\n");
                output += "\n";
            });
            output += "}";
        }
        return output;
    };
    Node.prototype.getUID = function () {
        return this.uid;
    };
    Node.prototype.onResolveFinished = function () {
        // No nothing
    };
    Node.prototype.modifyContext = function (fn) {
        this.config.rootModifyContext(fn, this);
    };
    Node.prototype.setContext = function (context) {
        this.config.rootSetContext(context, this);
    };
    Node.prototype.resolve = function () {
        this.state = this.resolveInitialState() || null;
        this.children = this.resolveChildren() || [];
        this.onResolveFinished();
    };
    Node.prototype.addChild = function (child) {
        this.children.push(child);
    };
    Node.prototype.overrideChildren = function (children) {
        this.children = children.slice();
    };
    Node.prototype.getChildren = function () {
        return this.children;
    };
    Node.prototype.resolveNode = function (node, parentNode, config) {
        return this.resolver(node, parentNode, config);
    };
    Node.prototype.getConfig = function () {
        return this.config;
    };
    Node.prototype.getSchema = function () {
        return this.schemaNode;
    };
    Node.prototype.getState = function () {
        return this.state;
    };
    Node.prototype.getTag = function () {
        return this.tag;
    };
    Node.prototype.setTag = function (tag) {
        this.tag = tag;
    };
    Node.prototype.setParent = function (parentNode) {
        this.parentNode = parentNode;
    };
    Node.prototype.getRawOutput = function (options) {
        return null;
    };
    Node.prototype.onChildStateChanged = function (state, source, originalSource) {
        // Do nothing
    };
    Node.prototype.setStateSilently = function (state, source, originalSource) {
        if (state) {
            Object.assign(this.state, __assign({}, this.state, state));
        }
    };
    Node.prototype.setState = function (state, source, originalSource) {
        this.setStateSilently(state, source, originalSource);
        this.parentNode.onChildStateChanged(this.state, this, originalSource);
    };
    Node.prototype.findChild = function (tag) {
        return this.children.filter(function (child) { return child.tag === tag; })[0];
    };
    Node.prototype.resolveInitialState = function () {
        return null;
    };
    Node.prototype.resolveChildren = function () {
        return [];
    };
    Node.prototype.getOutput = function (options) {
        if ((!options || (options && options.enableFormat !== false)) && this.getSchema().formatOutput) {
            return {
                __data: this.getSchema().formatOutput(this.getRawOutput(options)),
                __source: this,
            };
        }
        return {
            __data: this.getRawOutput(options),
            __source: this,
        };
    };
    Node.prototype.setValue = function (value) {
        // Do nothing
    };
    return Node;
}());
var RootNode = /** @class */ (function (_super) {
    __extends(RootNode, _super);
    function RootNode(schemaNode, config, resolve, dataTransformer, validator) {
        var _this = _super.call(this, null, exports.NodeType.ROOT, schemaNode, null, config, resolve) || this;
        _this.dataTransformer = dataTransformer;
        _this.validator = validator;
        return _this;
    }
    RootNode.prototype.resolveInitialState = function () {
        return {};
    };
    RootNode.prototype.validate = function () {
        this.validator(this);
    };
    RootNode.prototype.getOutput = function (options) {
        if (this.getChildren().length === 0) {
            return {
                __data: null,
                __source: this,
            };
        }
        else if (this.getChildren().length === 1) {
            return {
                __data: this.getChildren()[0].getOutput(options),
                __source: this,
            };
        }
        else {
            return {
                __data: this.getChildren().map(function (child) { return child.getOutput(options); }),
                __source: this,
            };
        }
    };
    RootNode.prototype.getData = function (options) {
        return this.dataTransformer(this.getOutput(options));
    };
    RootNode.prototype.render = function (context) {
        return this.getChildren().map(function (child) { return child.render(context); });
    };
    RootNode.prototype.getTag = function () {
        return "root";
    };
    RootNode.prototype.getJsonSchema = function () {
        var compatID = "id-" + (Math.random() * 1000000000);
        var recParse = function (node, removeLabels) {
            if (!node || typeof node !== "object") {
                return;
            }
            else if (!removeLabels && node._jsonSchemaCompat === compatID) {
                return;
            }
            else if (removeLabels && !node._jsonSchemaCompat) {
                return;
            }
            if (!removeLabels) {
                node._jsonSchemaCompat = compatID;
            }
            else {
                delete node._jsonSchemaCompat;
            }
            if (!removeLabels) {
                if (node.nullable && node.type && typeof node.type !== "object") {
                    node.type = [node.type, "null"];
                }
            }
            Object.keys(node).forEach(function (key) {
                if (key !== "type") {
                    recParse(node[key], removeLabels);
                }
            });
        };
        var schema = this.getSchema();
        recParse(schema, false);
        recParse(schema, true);
        return schema;
    };
    // FIXME: ROOT
    RootNode.prototype.onChildStateChanged = function (state, source, originalSource) {
        this.setState(state);
    };
    RootNode.prototype.setState = function (state, source, originalSource) {
        this.setStateSilently(state, source, originalSource);
        this.getConfig().rootSetState(this.getState(), this, originalSource);
    };
    RootNode.prototype.setValue = function (value) {
        this.getChildren().forEach(function (child) { return child.setValue(value); });
    };
    return RootNode;
}(Node));
function isNodeErrorPure(error) {
    return error.source !== undefined;
}

var defaultParserConfig = {
    handlers: {
        ROOT: {
            default: null,
        },
        STRING: {
            default: null,
        },
        OBJECT: {
            default: null,
        },
        NUMBER: {
            default: null,
        },
        BOOLEAN: {
            default: null,
        },
        ARRAY: {
            default: null,
        },
    },
    rootState: null,
    rootSetState: function () { },
    rootSetContext: function () { },
    rootModifyContext: function () { },
    uidGenerator: null,
    uidGeneratorFactory: function () {
        var uid = 0;
        return function () {
            ++uid;
            return uid;
        };
    },
};

function getHandlerForUI(node, handlers) {
    return node.ui ? handlers[node.ui] : handlers.default;
}
function getHandlerForType(node, config) {
    var t = node.type;
    switch (t) {
        case exports.NodeType.OBJECT:
            return config.handlers.OBJECT;
        case exports.NodeType.STRING:
            return config.handlers.STRING;
        case exports.NodeType.NUMBER:
            return config.handlers.NUMBER;
        case exports.NodeType.BOOLEAN:
            return config.handlers.BOOLEAN;
        case exports.NodeType.ARRAY:
            return config.handlers.ARRAY;
        case exports.NodeType.ROOT:
            return null;
        default:
            throw "Unknown node type " + node.type;
            return null;
    }
}
function createNode(node, parentNode, config, handler) {
    var astNode = new handler(handler, node.type, node, parentNode, config, recTransformSchemaIntoTree);
    astNode.resolve();
    parentNode.addChild(astNode);
    return astNode;
}
function recTransformSchemaIntoTree(node, parentNode, config) {
    return createNode(node, parentNode, config, getHandlerForUI(node, getHandlerForType(node, config)));
}
function isNodeMetaOutputValue(data) {
    return (data && (typeof data.__data) !== "undefined" && data.__source);
}
function recGetMetaOutputSourceNodeByPath(metaOutput, path) {
    if (isNodeMetaOutputValue(metaOutput)) {
        if (path !== null && path.length === 0) {
            return metaOutput.__source;
        }
        else {
            return recGetMetaOutputSourceNodeByPath(metaOutput.__data, path);
        }
    }
    else if (path === null) {
        return metaOutput;
    }
    else if (typeof path === "string") {
        return recGetMetaOutputSourceNodeByPath(metaOutput, path.split("."));
    }
    else if (path.length === 0) {
        return recGetMetaOutputSourceNodeByPath(metaOutput, null);
    }
    else {
        return recGetMetaOutputSourceNodeByPath(metaOutput[path[0]], path.slice(1));
    }
}
function getMetaOutputSourceNodeByPath(metaOutput, path) {
    var objPath = [];
    for (var match = void 0, matcher = /^([^\.\[]+)|\.([^\.\[]+)|\["([^"]+)"\]|\[(\d+)\]/g; match = matcher.exec(path);) {
        objPath.push(Array.from(match).slice(1).filter(function (x) { return x !== undefined; })[0]);
    }
    return recGetMetaOutputSourceNodeByPath(metaOutput, objPath);
}
function transformOutputToRawData(metaOutput) {
    if (isNodeMetaOutputValue(metaOutput)) {
        return transformOutputToRawData(metaOutput.__data);
    }
    else if (Array.isArray(metaOutput)) {
        return metaOutput.map(function (item) { return transformOutputToRawData(item); });
    }
    else if (metaOutput instanceof Object) {
        var result_1 = {};
        Object.keys(metaOutput).forEach(function (key) {
            result_1[key] = transformOutputToRawData(metaOutput[key]);
        });
        return result_1;
    }
    else {
        return metaOutput;
    }
}
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}
function validateRoot(rootNode) {
    return __awaiter(this, void 0, void 0, function () {
        var ajv, validateSchema, output, data, errors, errorsMap, customErrors;
        return __generator(this, function (_a) {
            ajv = new Ajv(__assign({ allErrors: true }, rootNode.getConfig().ajvOptions));
            validateSchema = ajv.compile(rootNode.getJsonSchema());
            output = rootNode.getOutput({ enableFormat: false });
            data = transformOutputToRawData(output);
            validateSchema(data);
            errors = validateSchema.errors || [];
            errorsMap = new WeakMap();
            customErrors = rootNode.validateCustom();
            errors = errors.concat(customErrors);
            errors.forEach(function (error) {
                var source = null;
                if (isNodeErrorPure(error)) {
                    source = error.source;
                }
                else {
                    source = getMetaOutputSourceNodeByPath(output, error.dataPath);
                }
                if (source !== null) {
                    var err = error;
                    if (errorsMap.has(source)) {
                        errorsMap.get(source).push(err);
                    }
                    else {
                        errorsMap.set(source, [err]);
                    }
                }
            });
            rootNode.setContext({
                errors: errors || [],
                getErrorsForNode: function (node) {
                    return errorsMap.get(node) || [];
                },
            });
            return [2 /*return*/];
        });
    });
}
function transformSchemaIntoTree(node, rootNode, config) {
    if (rootNode === void 0) { rootNode = null; }
    if (config === void 0) { config = null; }
    var conf = __assign({}, defaultParserConfig, config);
    if (!conf.uidGenerator) {
        conf.uidGenerator = conf.uidGeneratorFactory();
    }
    if (!rootNode) {
        rootNode = new RootNode(node, conf, recTransformSchemaIntoTree, transformOutputToRawData, debounce(validateRoot, 750));
        rootNode.resolve();
    }
    recTransformSchemaIntoTree(node, rootNode, conf);
    return rootNode;
}

var CompositeNode = /** @class */ (function (_super) {
    __extends(CompositeNode, _super);
    function CompositeNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompositeNode.prototype.renderComposite = function (context, children) {
        return Object.keys(children).map(function (key) { return children[key]; });
    };
    CompositeNode.prototype.resolveInitialState = function () {
        var initialState = {};
        Object.keys(this.getChildrenMapFromSchema()).forEach(function (key) {
            initialState[key] = null;
        });
        return initialState;
    };
    CompositeNode.prototype.getValueMapFromValue = function (value) {
        return __assign({}, value);
    };
    CompositeNode.prototype.setValue = function (value) {
        var _this = this;
        if (this.getSchema().formatInput) {
            value = this.getSchema().formatInput(value);
        }
        value = this.getValueMapFromValue(value);
        Object.keys(this.getChildrenMapFromSchema()).forEach(function (key) {
            if (_this.findChild(key)) {
                _this.findChild(key).setValue(value[key]);
            }
        });
    };
    CompositeNode.prototype.getRawOutput = function (options) {
        var _this = this;
        var output = {};
        Object.keys(this.getChildrenMapFromSchema()).forEach(function (key) {
            if (_this.findChild(key) && _this.findChild(key).isOutputAvailable()) {
                output[key] = _this.findChild(key).getOutput(options);
            }
        });
        return this.getCompositeOutput(output);
    };
    CompositeNode.prototype.onChildStateChanged = function (state, source, originalSource) {
        var _a;
        this.setState((_a = {},
            _a[source.getTag()] = state,
            _a));
    };
    CompositeNode.prototype.resolveChildren = function () {
        var _this = this;
        var childrenMap = this.getChildrenMapFromSchema();
        return Object.keys(childrenMap).map(function (key) {
            var child = _this.resolveNode(childrenMap[key], _this, _this.getConfig());
            child.setTag(key);
            return child;
        });
    };
    CompositeNode.prototype.render = function (context) {
        var _this = this;
        var childrenMap = {};
        Object.keys(this.getChildrenMapFromSchema()).forEach(function (key, index) {
            if (_this.findChild(key)) {
                childrenMap[key] = _this.findChild(key).render(context);
            }
        });
        return this.renderComposite(context, childrenMap);
    };
    return CompositeNode;
}(Node));

var SimpleNode = /** @class */ (function (_super) {
    __extends(SimpleNode, _super);
    function SimpleNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleNode.prototype.resolveInitialState = function () {
        return {
            value: this.getInitialValue(),
        };
    };
    SimpleNode.prototype.getRawOutput = function () {
        return this.getState().value;
    };
    SimpleNode.prototype.render = function (context) {
        return this.renderSimple(this.getState().value, context);
    };
    return SimpleNode;
}(Node));

exports.CompositeNode = CompositeNode;
exports.SimpleNode = SimpleNode;
exports.defaultParserConfig = defaultParserConfig;
exports.recTransformSchemaIntoTree = recTransformSchemaIntoTree;
exports.isNodeMetaOutputValue = isNodeMetaOutputValue;
exports.getMetaOutputSourceNodeByPath = getMetaOutputSourceNodeByPath;
exports.transformOutputToRawData = transformOutputToRawData;
exports.validateRoot = validateRoot;
exports.transformSchemaIntoTree = transformSchemaIntoTree;
exports.Node = Node;
exports.RootNode = RootNode;
exports.isNodeErrorPure = isNodeErrorPure;
