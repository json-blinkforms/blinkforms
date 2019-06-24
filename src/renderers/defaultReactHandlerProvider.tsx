import ObjectDefaultRenderer from "./ObjectDefault";
import StringDefaultRenderer from "./StringDefault";
import ArrayDefaultRenderer from "./ArrayDefault";

export default {
    ROOT: {
        default: ObjectDefaultRenderer,
    },
    STRING: {
        default: StringDefaultRenderer,
    },
    OBJECT: {
        default: ObjectDefaultRenderer,
    },
    ARRAY: {
        default: ArrayDefaultRenderer,
    },
};