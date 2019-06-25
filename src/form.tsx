import * as React from "react";
import styled  from "styled-components";

import { BlinkformsClient } from "@blinkforms/core";
import { transformSchemaIntoTree } from "@blinkforms/core";
import { FormContext, NodeAny, NodeState, NodeType, RootNode, Schema } from "@blinkforms/core";

import defaultReactHandlerProvider from "./renderers/defaultReactHandlerProvider";

const Wrapper = styled.div`
  width: 100%;
`;

export interface FormProps {
    fontSize?: string;
    theme?: any;
    validateOnChange?: boolean;
    validateOnInit?: boolean;
    children: Schema;
    onSubmit: (data: any) => void;
    use?: Array<any>;
}

interface FormState {
    tree: RootNode;
    formContext: FormContext;
}

export class Form extends React.Component<FormProps, FormState> {

    state: FormState;
    client: BlinkformsClient;

    constructor(props) {
        super(props);

        this.client = new BlinkformsClient();
        this.client.configure({
            rootSetState:       (state: NodeState<any>, root: RootNode) => this.handleFormStateUpdate(state, root),
            rootSetContext:     (context: FormContext, source: NodeAny) => this.handleFormContextUpdate(context, source),
            rootModifyContext:  (fn: (context: FormContext) => FormContext, source: NodeAny) => this.handleFormContextMapping(fn, source),
            rootState:          {},
        });
        
        if (this.props.use) {
            this.props.use.forEach((handlerProvider) => {
                this.client.registerHandlers(handlerProvider);
            });
        }
        this.client.registerHandlers(defaultReactHandlerProvider);
        
        this.state = {
            tree: null,
            formContext: {
                errors: [],
                getErrorsForNode: () => [],
            },
        };
    }

    handleFormStateUpdate(state: NodeState<any>, root: RootNode) {
        this.setState({
            tree: root,
        }, () => {
            if (this.props.validateOnChange !== false) {
                this.state.tree.validate();
            }
        });
    }

    handleFormContextUpdate(context: FormContext, source: NodeAny) {
        this.setState({
            formContext: {
                ...this.state.formContext,
                ...context,
            },
        });
    }

    handleFormContextMapping(fn: (context: FormContext) => FormContext, source: NodeAny) {
        this.handleFormContextUpdate(fn(this.state.formContext), source);
    }

    createTree() {
        const schema = this.props.children;

        if (!this.state.tree) {
            setTimeout(() => {
                this.client.render(schema);
                const tree = this.client.getTree();
                this.setState({
                    tree,
                }, () => {
                    if (this.props.validateOnInit !== false) {
                        this.state.tree.validate();
                    }
                });
            });
        }
    }

    componentDidMount() {
        this.createTree();
    }

    render() {
        this.createTree();

        return (
            <Wrapper>
                {(this.state.tree) ? (this.state.tree.render(this.state.formContext)) : (null)}
                {
                    (this.state.tree && this.props.onSubmit)?(
                        <div
                            style={{
                                marginLeft: '-2vw',
                            }}
                        >
                            <button
                                onClick={() => {
                                    if (this.state.tree && this.props.onSubmit) {
                                        this.props.onSubmit(this.state.tree.getData());
                                    }
                                }}
                            >
                                Save
                            </button>
                        </div>
                    ):(null)
                }
            </Wrapper>
        );
    }
}


/*export default class Form extends React.Component<FormProps, FormState> {

    state: FormState;

    constructor(props) {
        super(props);

        this.state = {
            tree: null,
            formContext: {
                errors: [],
                getErrorsForNode: () => [],
            },
        };
    }

    handleFormStateUpdate(state: NodeState<any>, root: RootNode) {
        this.setState({
            tree: root,
        }, () => {
            if (this.props.validateOnChange !== false) {
                this.state.tree.validate();
            }
        });
    }

    handleFormContextUpdate(context: FormContext, source: NodeAny) {
        this.setState({
            formContext: {
                ...this.state.formContext,
                ...context,
            },
        });
    }

    handleFormContextMapping(fn: (context: FormContext) => FormContext, source: NodeAny) {
        this.handleFormContextUpdate(fn(this.state.formContext), source);
    }

    createTree() {
        const schema = this.props.children;

        if (!this.state.tree) {
            setTimeout(() => {
                const tree = transformSchemaIntoTree(schema, null, {
                    rootSetState: (state: NodeState<any>, root: RootNode) => this.handleFormStateUpdate(state, root),
                    rootSetContext: (context: FormContext, source: NodeAny) => this.handleFormContextUpdate(context, source),
                    rootModifyContext: (fn: (context: FormContext) => FormContext, source: NodeAny) => this.handleFormContextMapping(fn, source),
                    rootState: {},
                });

                this.setState({
                    tree,
                }, () => {
                    if (this.props.validateOnInit !== false) {
                        this.state.tree.validate();
                    }
                });
            });
        }
    }

    componentDidMount() {
        this.createTree();
    }

    render() {
        this.createTree();

        return (
            <Wrapper>
                {(this.state.tree) ? (this.state.tree.render(this.state.formContext)) : (null)}
                {
                    (this.state.tree && this.props.onSubmit)?(
                        <div
                            style={{
                                marginLeft: '-2vw',
                            }}
                        >
                            <button
                                onClick={() => {
                                    if (this.state.tree && this.props.onSubmit) {
                                        this.props.onSubmit(this.state.tree.getData());
                                    }
                                }}
                            >
                                Save
                            </button>
                        </div>
                    ):(null)
                }
            </Wrapper>
        );
    }
}*/
