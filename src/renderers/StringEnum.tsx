import * as React from "react";

import WithDescription from "./utils/WithDescription";
import WithErrors from "./utils/WithErrors";
import WithMargins from "./utils/WithMargins";

import { SimpleNode } from "@blinkforms/core/simpleNodes";

import {
    FormContext,
    NodeStringSchema,
} from "@blinkforms/core/schemaTypes";

export default class StringEnum extends SimpleNode<string, NodeStringSchema> {
    getInitialValue() {
        return "";
    }

    renderSimple(value: string, context: FormContext) {
        const enumLabels = this.getSchema().enumLabels || null;
        const enumOpts = (this.getSchema().enum || []).map(value => {
            let oLabel = value;
            let oVal = value;

            if (enumLabels) {
                const lbSpec = enumLabels.find(opt => opt.name === value);
                if (lbSpec) {
                    oLabel = lbSpec.label;
                    oVal = lbSpec.name || value;
                }
            }

            return ({
                name: oVal,
                label: oLabel,
            });
        });

        const selectedValue = enumOpts.find(opt => opt.name === value) || null;
        return (
            <WithMargins parent={this}>
                <WithErrors parent={this} context={context}>
                    <WithDescription parent={this}>
                        <select
                            onChange={(event) => this.setState({ value: event.target.value })}
                        >
                            {enumOpts.map((item, index) => {
                                return (
                                    <option
                                        key={`opt-${item.name+''}-${index}`}
                                        value={item.name}
                                        selected={selectedValue === item.name && item.name !== null && typeof item.name !== 'undefined'}
                                    >
                                        {item.label}
                                    </option>
                                );
                            })}
                        </select>
                    </WithDescription>
                </WithErrors>
            </WithMargins>
        );
    }
}