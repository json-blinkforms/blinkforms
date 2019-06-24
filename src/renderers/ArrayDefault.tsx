import * as React from "react";

import WithDescription from "./utils/WithDescription";
import WithErrors from "./utils/WithErrors";
import WithMargins from "./utils/WithMargins";

import {
    FormContext,
    Node,
    NodeAny,
    NodeArraySchema,
    NodeOutputValue,
    NodeState,
} from "@blinkforms/core/schemaTypes";

export type NodeSMapping = {
    [key: string]: NodeState<any>;
};

export type NodeO = NodeOutputValue<Array<NodeOutputValue<any>>>;

export type NodeS = {
    items: NodeSMapping;
};

export default class ArrayDefault extends Node<NodeS, NodeO, NodeArraySchema> {

    resolveInitialState() {
        return {
            items: {},
        };
    }

    setValue(value: NodeO) {
        if (this.getSchema().formatInput) {
            value = this.getSchema().formatInput(value);
        }
        value = { ...value };

        if (Object.keys(value).length !== this.getChildren().length) {
            this.overrideChildren(Object.keys(value).map(key => {
                const child = this.resolveNode(this.getSchema().items, this, this.getConfig());
                child.setTag(key);
                return child;
            }));
        }

        this.getChildren().forEach((child, index) => {
            child.setValue(value[index]);
        });
    }

    getRawOutput(options) {
        const results = [];
        this.getChildren().forEach(child => {
            if (child.isOutputAvailable()) {
                results.push(child.getOutput(options));
            }
        });
        return results;
    }

    onChildStateChanged(state: NodeState<any>, source: NodeAny, originalSource?: NodeAny) {
        this.setState({
            items: {
                ...this.getState().items,
                [source.getTag()]: state,
            },
        });
    }

    removeItem(index: number) {
        const newItems = { ...this.getState().items };
        delete newItems[index];

        this.overrideChildren(this.getChildren().filter((child, i) => index !== i).map((child, i) => {
            child.setTag(i.toString());
            return child;
        }));

        this.setState({
            items: newItems,
        });
    }

    addNewItem() {
        const key = this.getChildren().length;

        const child = this.resolveNode(this.getSchema().items, this, this.getConfig());
        this.setState({
            items: {
                ...this.getState().items,
                [key]: child.resolveInitialState(),
            },
        });
    }

    resolveChildren() {
        return [];
    }

    render(context: FormContext): React.ReactNode {
        return (
            <WithMargins parent={this}>
                <WithErrors parent={this} context={context}>
                    <WithDescription
                        parent={this}
                        titleExtra={
                            <div>
                                <button onClick={() => this.addNewItem()}>Add item</button>
                            </div>
                        }
                    >
                        {
                            this.getChildren().map((child, index) => {
                                return (
                                    <div>
                                        <div>
                                            <button onClick={() => this.removeItem(index)}>X</button>
                                        </div>
                                        {child.render(context)}
                                    </div>
                                );
                            })
                        }
                    </WithDescription>
                </WithErrors>
            </WithMargins>
        );
    }

}