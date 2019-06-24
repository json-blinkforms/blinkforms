import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import { action } from '@storybook/addon-actions';

import Form from '../src/index.tsx';


storiesOf('Basic form', module)
.add('with text', () => (
    <Form>
        {{
            title: "A registration form",
            description: "The description",
            type: "object",
            properties: {
                "firstName": {
                    type: "string",
                    renderID: "firstNameClass",
                    title: "Your first name",
                    minLength: 3,
                },
                "lastName": {
                    type: "string",
                    title: "Your last name",
                    minLength: 3,
                },
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
))
