import { SchemaParserConfig } from "./schemaTypes";

export const defaultParserConfig: SchemaParserConfig = {
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
        NUMBER: {
            default: null,
        },
        BOOLEAN: {
            default: null,
        },
        ARRAY: {
            default: null,
        },
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