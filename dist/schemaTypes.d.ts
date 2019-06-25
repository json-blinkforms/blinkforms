import * as React from "react";
declare type ValueOf<T> = T[keyof T];
export declare enum NodeType {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
    OBJECT = "object",
    ARRAY = "array",
    ROOT = "root"
}
export interface NodeTypeSchemas {
    STRING: NodeStringSchema;
    NUMBER: NodeNumberSchema;
    BOOLEAN: NodeBooleanSchema;
    OBJECT: NodeObjectSchema;
    ARRAY: NodeArraySchema;
    ROOT: any;
}
export declare type NodeBaseSchema = {
    title?: string;
    description?: string;
    ui?: string;
    [key: string]: any;
    formatOutput?: (output: any) => any;
    formatInput?: (output: any) => any;
};
export interface NodeProperties {
    [key: string]: NodeSchema;
}
export interface NodeObjectSchema extends NodeBaseSchema {
    type: NodeType.OBJECT;
    required?: Array<string>;
    properties: NodeProperties;
}
export interface NodeStringSchema extends NodeBaseSchema {
    type: NodeType.STRING;
}
export interface NodeNumberSchema extends NodeBaseSchema {
    type: NodeType.NUMBER;
}
export interface NodeBooleanSchema extends NodeBaseSchema {
    type: NodeType.BOOLEAN;
}
export interface NodeArraySchema extends NodeBaseSchema {
    type: NodeType.ARRAY;
    items: Array<NodeBaseSchema> | NodeBaseSchema;
}
export declare type NodeSchema = ValueOf<NodeTypeSchemas>;
export declare type Schema = NodeObjectSchema;
export declare abstract class Node<S, O, M extends NodeSchema, CS = any, CO = any, CM extends NodeSchema = any, PS = any, PO = any, PM extends NodeSchema = any> {
    private uid;
    private schemaNode;
    private parentNode;
    private config;
    private type;
    private resolver;
    private state;
    private tag;
    private children;
    private handler;
    constructor(handler: NodeHandler<S, O, M, CS, CO, CM, PS, PO, PM>, type: NodeType, schemaNode: M, parentNode: Node<PS, PO, PM>, config: SchemaParserConfig, resolver: SchemaTreeResolver);
    getHandler(): NodeHandler<S, O, M, CS, CO, CM, PS, PO, PM>;
    isOutputAvailable(): boolean;
    validateCustom(): Array<NodeError>;
    getDebugRepresentation(): string;
    getUID(): number;
    onResolveFinished(): void;
    modifyContext(fn: (context: FormContext) => FormContext): void;
    setContext(context: FormContext): void;
    resolve(): void;
    addChild(child: Node<CS, CO, CM>): void;
    overrideChildren(children: Array<Node<CS, CO, CM>>): void;
    getChildren(): Node<CS, CO, CM, any, any, any, any, any, any>[];
    resolveNode(node: any, parentNode: NodeAny, config: SchemaParserConfig): NodeAny;
    getConfig(): SchemaParserConfig;
    getSchema(): M;
    getState(): NodeState<S>;
    getTag(): string;
    setTag(tag: string): void;
    setParent(parentNode: Node<PS, PO, PM>): void;
    abstract render(context: FormContext): React.ReactNode;
    getRawOutput(options: any): NodeOutputValue<O>;
    onChildStateChanged(state: NodeState<CS>, source: NodeAny, originalSource?: NodeAny): void;
    setStateSilently(state: NodeState<S>, source?: NodeAny, originalSource?: NodeAny): void;
    setState(state: NodeState<S>, source?: NodeAny, originalSource?: NodeAny): void;
    findChild(tag: string): Node<CS, CO, CM>;
    resolveInitialState(): NodeState<S>;
    resolveChildren(): Array<Node<CS, CO, CM>>;
    getOutput(options: any): NodeMetaOutputValue<O>;
    setValue(value: NodeOutputValue<O>): void;
}
export declare class RootNode extends Node<any, any, NodeSchema> {
    private dataTransformer;
    private validator;
    constructor(schemaNode: NodeSchema, config: SchemaParserConfig, resolve: SchemaTreeResolver, dataTransformer: (output: any) => any, validator: (root: RootNode) => any);
    resolveInitialState(): {};
    validate(): void;
    getOutput(options: any): {
        __data: NodeMetaOutputValue<any>;
        __source: RootNode;
    } | {
        __data: NodeMetaOutputValue<any>[];
        __source: RootNode;
    };
    getData(options?: any): any;
    render(context: FormContext): React.ReactNode[];
    getTag(): string;
    getJsonSchema(): NodeSchema;
    onChildStateChanged(state: NodeState<any>, source: NodeAny, originalSource?: NodeAny): void;
    setState(state: NodeState<any>, source?: NodeAny, originalSource?: NodeAny): void;
    setValue(value: NodeOutputValue<any>): void;
}
export declare type NodeHandler<S, O, M extends NodeSchema, CS = any, CO = any, CM extends NodeSchema = any, PS = any, PO = any, PM extends NodeSchema = any> = {
    new (handler: NodeHandler<S, O, M, CS, CO, CM, PS, PO, PM>, type: NodeType, schemaNode: M, parentNode: Node<PS, PO, PM>, config: SchemaParserConfig, resolver: SchemaTreeResolver): Node<S, O, M, CS, CO, CM, PS, PO, PM>;
};
export interface SchemaNodeHandlersMappingForType<M extends NodeSchema> {
    [key: string]: NodeHandler<any, any, M>;
}
export declare type NodeTypeNames = keyof typeof NodeType;
export declare type SchemaNodeHandlersMapping = {
    [key in NodeTypeNames]: SchemaNodeHandlersMappingForType<NodeTypeSchemas[key]>;
};
export interface FormContext {
    errors?: Array<NodeError>;
    getErrorsForNode?: (node: NodeAny) => Array<NodeError>;
}
export interface SchemaParserConfig {
    handlers: SchemaNodeHandlersMapping;
    rootState: NodeState<any>;
    rootSetState: (state: NodeState<any>, root: RootNode, originalSource?: NodeAny) => void;
    rootSetContext: (context: FormContext, source: NodeAny) => void;
    rootModifyContext: (fn: (context: FormContext) => FormContext, source: NodeAny) => void;
    uidGenerator: () => number;
    uidGeneratorFactory: () => () => number;
    ajvOptions?: any;
}
export interface SchemaParserConfigOpt {
    handlers?: SchemaNodeHandlersMapping;
    rootState?: NodeState<any>;
    rootSetState?: (state: NodeState<any>, root: NodeAny, originalSource?: NodeAny) => void;
    rootSetContext?: (context: FormContext, source: NodeAny) => void;
    rootModifyContext?: (fn: (context: FormContext) => FormContext, source: NodeAny) => void;
    uidGenerator?: () => number;
    uidGeneratorFactory?: () => () => number;
    ajvOptions?: any;
}
export declare type NodeState<S> = S;
export declare type NodeOutputValue<O> = O;
export declare type NodeMetaOutputValue<O> = {
    __data: NodeOutputValue<O>;
    __source: NodeAny;
};
export declare type NodeAny = Node<any, any, any>;
export declare type SchemaTreeResolver<M extends NodeSchema = any, PS = any, PO = any, PM extends NodeSchema = any> = (node: M, parentNode: Node<PS, PO, PM>, config: SchemaParserConfig) => Node<any, any, M>;
export declare function isNodeErrorPure(error: NodeError): error is NodeErrorPure;
interface NodeErrorAjv {
    keyword: string;
    message?: string;
    params: any;
    schemaPath: string;
    dataPath: string;
}
interface NodeErrorPure {
    message: string;
    source: NodeAny;
}
export declare type NodeError = NodeErrorAjv | NodeErrorPure;
export {};
