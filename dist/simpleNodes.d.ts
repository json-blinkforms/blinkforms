import * as React from "react";
import { FormContext, Node, NodeSchema } from "./schemaTypes";
export declare abstract class SimpleNode<V, M extends NodeSchema> extends Node<{
    value: V;
}, V, M> {
    abstract getInitialValue(): V;
    abstract renderSimple(value: V, context: FormContext): React.ReactNode;
    resolveInitialState(): {
        value: V;
    };
    getRawOutput(): V;
    render(context: FormContext): React.ReactNode;
}
