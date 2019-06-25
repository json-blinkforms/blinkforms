import { Node, NodeAny, NodeMetaOutputValue, NodeSchema, RootNode, SchemaParserConfig, SchemaParserConfigOpt } from "./schemaTypes";
export interface AjvError {
    dataPath: string;
    keyword: string;
    message?: string;
    params: any;
    schemaPath: string;
    node?: NodeAny;
}
export declare function recTransformSchemaIntoTree<M extends NodeSchema>(node: M, parentNode: NodeAny, config: SchemaParserConfig): Node<any, any, M>;
export declare function isNodeMetaOutputValue(data: any): data is NodeMetaOutputValue<any>;
export declare function getMetaOutputSourceNodeByPath(metaOutput: any, path: string): any;
export declare function transformOutputToRawData(metaOutput: any): any;
export declare function validateRoot(rootNode: RootNode): Promise<void>;
export declare function transformSchemaIntoTree<M extends NodeSchema>(node: M, rootNode?: RootNode, config?: SchemaParserConfigOpt): RootNode;
