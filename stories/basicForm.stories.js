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
                },
                "lastName": {
                    type: "string",
                    title: "Your last name",
                },
            },
        }}
    </Form>
))
