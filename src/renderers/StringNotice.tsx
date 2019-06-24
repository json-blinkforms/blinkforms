import * as React from "react";

import { SimpleNode } from "@blinkforms/core/simpleNodes";

import {
    FormContext,
    NodeError,
    NodeStringSchema,
} from "@blinkforms/core/schemaTypes";

export default class StringNotice extends SimpleNode<string, NodeStringSchema> {
    getInitialValue() {
        return "null";
    }

    isOutputAvailable(): boolean {
        return false;
    }

    validateCustom(): Array<NodeError> {
        return [];
    }

    renderSimple(value: string, context: FormContext) {
        return (
            <div>
                {this.getSchema().value}
            </div>
        );
    }
}