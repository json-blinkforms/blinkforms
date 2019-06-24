import { SchemaParserConfig } from "@blinkforms/core/schemaTypes";

import ObjectDefault from "./renderers/ObjectDefault";
import StringDefault from "./renderers/StringDefault";
import ArrayDefault from "./renderers/ArrayDefault";

export const defaultConfig: SchemaParserConfig = {
    handlers: {
        ROOT: {
            default: null,
        },
        STRING: {
            default: StringDefault,
        },
        OBJECT: {
            default: ObjectDefault,
        },
        ARRAY: {
            default: ArrayDefault,
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