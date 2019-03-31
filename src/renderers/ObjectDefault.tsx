import { CompositeNode, NodeO } from "@blinkforms/core/compositeNodes";

import {
    NodeObjectSchema,
} from "@blinkforms/core/schemaTypes";

export default class ObjectDefault extends CompositeNode<NodeO, NodeObjectSchema> {

    getChildrenMapFromSchema() {
        return this.getSchema().properties;
    }

    getCompositeOutput(output: NodeO) {
        return output;
    }

}