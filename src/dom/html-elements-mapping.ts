
import SelectionPreview from './selection-preview';
import Node from './node';
import Group from './group'
import Operator from './operator'
import Translate from './translate';
import Spinner from './spinner';

export const SELECTION_PREVIEW = {
    selector: 'selection-preview',
    clazz: SelectionPreview
}
export const NODE = {
    selector: 'sb-n',
    clazz: Node
}
export const OPERATOR = {
    selector: 'sb-o',
    clazz: Operator
}
export const GROUP = {
    selector: 'sb-g',
    clazz: Group
}
export const TRANSLATE = {
    selector: 'sb-t',
    clazz: Translate
}
export const SPINNER = {
    selector: 'sb-s',
    clazz: Spinner
}

export default [SELECTION_PREVIEW, NODE, OPERATOR, GROUP, TRANSLATE, SPINNER]