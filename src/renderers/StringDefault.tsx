import * as React from "react";
import styled from "styled-components";

import WithDescription from "./utils/WithDescription";
import WithErrors from "./utils/WithErrors";
import WithMargins from "./utils/WithMargins";

import { SimpleNode } from "@blinkforms/core/simpleNodes";

import {
    FormContext,
    NodeStringSchema,
} from "@blinkforms/core/schemaTypes";

const InputWrapper = styled.div`
  width: 10vw;
  margin-right: 3vw;
`;

export default class StringDefault extends SimpleNode<string, NodeStringSchema> {
    getInitialValue() {
        return "";
    }

    renderSimple(value: string, context: FormContext) {
        return (
            <WithMargins parent={this}>
                <WithErrors parent={this} context={context}>
                        <WithDescription parent={this}>
                            <InputWrapper>
                                <input
                                    value={value}
                                    onChange={(event) => {
                                        this.setState({ value: event.target.value })
                                    }}
                                />
                            </InputWrapper>
                        </WithDescription>
                </WithErrors>
            </WithMargins>
        );
    }
}