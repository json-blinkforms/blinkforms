import * as React from "react";

import { Example, IExampleProps } from "@blueprintjs/docs-theme";
import Form from '../src/index';

export class ArrayDefaultExample extends React.Component<IExampleProps, undefined> {
    public render() {
        return (
            <Example options={false} {...this.props}>
                <Form>
                    {{
                        title: "A registration form",
                        description: "The description",
                        type: "object",
                        properties: {
                            "array": {
                                type: "array",
                                ui: "tuple",
                                items: [
                                    {
                                        type: "string",
                                        title: "Elem1 - string",
                                        minLength: 3,
                                    },
                                    {
                                        type: "string",
                                        title: "Elem2 - string",
                                    }
                                ],
                            },
                        },
                    }}
                </Form>
            </Example>
        );
    }
}

