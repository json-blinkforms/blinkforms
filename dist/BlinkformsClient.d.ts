import { NodeSchema, SchemaParserConfigOpt, RootNode, NodeState, FormContext, NodeAny } from "./schemaTypes";
export declare type BlinkformsStateTransformer = (state: NodeState<any>, root: NodeAny) => NodeState<any>;
export declare type BlinkformsContextUpdateHandler = (context: FormContext, source: NodeAny) => void;
export declare type BlinkformsContextTransformer = (fn: (context: FormContext) => FormContext, source: NodeAny) => void;
export default class BlinkformsClient {
    tree: RootNode;
    state: NodeState<any>;
    stateTransformers: Array<BlinkformsStateTransformer>;
    contextUpdateHandlers: Array<BlinkformsContextUpdateHandler>;
    contextTransformers: Array<BlinkformsContextTransformer>;
    rootConfig: SchemaParserConfigOpt;
    constructor();
    configure(conf: SchemaParserConfigOpt): void;
    registerHandlers(handlers: any): void;
    handleFormStateUpdate(state: NodeState<any>, root: NodeAny): void;
    handleFormContextUpdate(context: FormContext, source: NodeAny): void;
    handleFormContextMapping(fn: (context: FormContext) => FormContext, source: NodeAny): void;
    render<S extends NodeSchema>(schema: S, options?: SchemaParserConfigOpt): BlinkformsClient;
    getTree(): RootNode;
    getState(): NodeState<any>;
}
