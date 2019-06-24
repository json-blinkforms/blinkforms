import ObjectDefault from "./ObjectDefault";
import StringDefault from "./StringDefault";

import ArrayDefault from "./ArrayDefault";
import ArrayTuple from "./ArrayTuple";

export default {
    ROOT: {
        default: ObjectDefault,
    },
    STRING: {
        default: StringDefault,
    },
    OBJECT: {
        default: ObjectDefault,
    },
    ARRAY: {
        default: ArrayDefault,
        tuple: ArrayTuple,
    },
};