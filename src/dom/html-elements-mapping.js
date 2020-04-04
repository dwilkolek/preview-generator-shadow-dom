
import SelectionPreview from './selection-preview.js';
import Node from './node.js';
import Group from './group.js'
import Operator from './operator.js'
import Translate from './translate.js';
import Spinner from './spinner.js';

var mapping = {
    SELECTION_PREVIEW: {
        selector: 'selection-preview',
        clazz: SelectionPreview
    },
    NODE: {
        selector: 'sb-n',
        clazz: Node
    },
    OPERATOR: {
        selector: 'sb-o',
        clazz: Operator
    },
    GROUP: {
        selector: 'sb-g',
        clazz: Group
    },
    TRANSLATE: {
        selector: 'sb-t',
        clazz: Translate
    },
    SPINNER: {
        selector: 'sb-s',
        clazz: Spinner
    }
}
export default mapping;