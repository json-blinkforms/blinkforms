import * as React from "react";
import { FormContext, Node, NodeAny, NodeOutputValue, NodeSchema, NodeState } from "./schemaTypes";
export declare type NodeS = {
    [key: string]: NodeState<any>;
};
export declare type NodeO = {
    [key: string]: NodeOutputValue<any>;
};
export declare type ChildrenMap<T> = {
    [key: string]: T;
};
export declare abstract class CompositeNode<O extends object, M extends NodeSchema> extends Node<NodeS, O, M> {
    abstract getChildrenMapFromSchema(): ChildrenMap<NodeSchema>;
    abstract getCompositeOutput(output: NodeO): NodeOutputValue<O>;
    renderComposite(context: FormContext, children: ChildrenMap<React.ReactNode>): React.ReactNode;
    resolveInitialState(): {};
    getValueMapFromValue(value: NodeOutputValue<O>): NodeOutputValue<O>;
    setValue(value: NodeOutputValue<O>): void;
    getRawOutput(options: any): O;
    onChildStateChanged(state: NodeState<any>, source: NodeAny, originalSource?: NodeAny): void;
    resolveChildren(): Node<any, any, any, any, any, any, any, any, any>[];
    render(context: FormContext): React.ReactNode;
}
