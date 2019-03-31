import * as React from "react";
import styled from "styled-components";

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
            <div className={this.getSchema().renderID}>
                {this.getSchema().title}
                {this.getSchema().description}
                <InputWrapper>
                    <input
                        value={value}
                        onChange={(event) => {
                            this.setState({ value: event.target.value })
                        }}
                    />
                </InputWrapper>
            </div>
        );
    }
}