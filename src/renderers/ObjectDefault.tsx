import { CompositeNode, NodeO } from "@blinkforms/core";

import {
    NodeObjectSchema,
} from "@blinkforms/core";

export default class ObjectDefault extends CompositeNode<NodeO, NodeObjectSchema> {

    getChildrenMapFromSchema() {
        return this.getSchema().properties;
    }

    getCompositeOutput(output: NodeO) {
        return output;
    }

}