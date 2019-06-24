import ObjectDefault from "./ObjectDefault";

import StringDefault from "./StringDefault";
import StringNotice from "./StringNotice";

import ArrayDefault from "./ArrayDefault";
import ArrayTuple from "./ArrayTuple";

export default {
    ROOT: {
        default: ObjectDefault,
    },
    STRING: {
        default: StringDefault,
        notice: StringNotice,
    },
    OBJECT: {
        default: ObjectDefault,
    },
    ARRAY: {
        default: ArrayDefault,
        tuple: ArrayTuple,
    },
};