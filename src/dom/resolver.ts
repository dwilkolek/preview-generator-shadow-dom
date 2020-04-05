import Group from "./group";
import Node from "./node";

class Resolver {
    for(data: any, isRoot: boolean = false) {
        let isGroup = data.nodeType == "Group";
        const element: HTMLElement = isGroup ? new Group(data) : new Node(data);
        if (isRoot) {
            element.setAttribute('isRoot', `${isRoot}`);
        }
        return element;
    }
}

export default new Resolver();