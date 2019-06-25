import {
    NodeSchema,
    SchemaParserConfigOpt,
    RootNode,
    NodeState,
    FormContext,
    NodeAny,
} from "./schemaTypes";

import { transformSchemaIntoTree } from "./schemaParser";

export type BlinkformsStateTransformer = (state: NodeState<any>, root: NodeAny) => NodeState<any>;
export type BlinkformsContextUpdateHandler = (context: FormContext, source: NodeAny) => void;
export type BlinkformsContextTransformer = (fn: (context: FormContext) => FormContext, source: NodeAny) => void;

export default class BlinkformsClient {
    
    tree:   RootNode;
    state:  NodeState<any>;
    
    stateTransformers:       Array<BlinkformsStateTransformer>;
    contextUpdateHandlers:   Array<BlinkformsContextUpdateHandler>;
    contextTransformers:     Array<BlinkformsContextTransformer>;
    rootConfig:              SchemaParserConfigOpt;
    
    constructor() {
        this.tree = null;
        this.state = null;
        
        this.stateTransformers = [];
        this.contextUpdateHandlers = [];
        this.contextTransformers = [];
        this.rootConfig = {};
    }
    
    configure(conf: SchemaParserConfigOpt) {
        this.rootConfig = ({ ...this.rootConfig, ...conf });
    }
    
    registerHandlers(handlers) {
        const newHandlers = { ...this.rootConfig.handlers };
        Object.keys(handlers).forEach((key) => {
            newHandlers[key] = { ...newHandlers[key], ...handlers[key] };
        });
        
        this.rootConfig = ({
            ...this.rootConfig,
            handlers: {
                ...this.rootConfig.handlers,
                ...newHandlers,
            },
        })
    }
    
    handleFormStateUpdate(state: NodeState<any>, root: NodeAny) {
        this.state = state;
        this.stateTransformers.forEach(t => {
            this.state = t(this.state, root);
        });
    }
    
    handleFormContextUpdate(context: FormContext, source: NodeAny) {
        this.contextUpdateHandlers.forEach(t => {
            t(context, source);
        });
    }
    
    handleFormContextMapping(fn: (context: FormContext) => FormContext, source: NodeAny) {
        this.contextTransformers.forEach(t => {
            t(fn, source);
        });
    }
    
    render<S extends NodeSchema>(schema: S, options: SchemaParserConfigOpt = null): BlinkformsClient {
        this.tree = transformSchemaIntoTree(schema, null, {
            rootSetState:       (state, root) => this.handleFormStateUpdate(state, root),
            rootSetContext:     (context, source) => this.handleFormContextUpdate(context, source),
            rootModifyContext:  (fn, source) => this.handleFormContextMapping(fn, source),
            rootState:          {},
            ...this.rootConfig,
            ...options,
        });
        
        return this;
    }
    
    getTree(): RootNode {
        return this.tree;
    }
    
    getState(): NodeState<any> {
        return this.state;
    }
    
};