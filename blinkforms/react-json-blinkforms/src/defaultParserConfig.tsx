import { SchemaParserConfig } from "@blinkforms/core";

export const defaultConfig: SchemaParserConfig = {
    handlers: {
        ROOT: {
            default: null,
        },
        STRING: {
            default: null,
        },
        OBJECT: {
            default: null,
        },
        ARRAY: {
            default: null,
        },
        NUMBER: {},
        BOOLEAN: {},
    },
    rootState: null,
    rootSetState: () => {},
    rootSetContext: () => {},
    rootModifyContext: () => {},
    uidGenerator: null,
    uidGeneratorFactory: () => {
        let uid = 0;
        return () => {
            ++uid;
            return uid;
        };
    },
};