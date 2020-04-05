export const DEFAULT_ENTITY_TYPE = 'none';

declare global {
    interface Window { translationNamespaces: any; }
}

interface Entry<T> {
    [key: string]: T
}

interface EntityEntry<T> {
    [key: string]: Entry<T>
}

interface ResolveReject {
    resolve: (result: string) => void,
    reject: (result: string) => void
}

interface Namespace {
    url: string,
    isStatic: boolean,
    isReady: boolean,
    cache: EntityEntry<string>,
    timeout: any,
    nsKeyPromiseListMap: EntityEntry<ResolveReject[]>
}

class Translator {
    namespaces: { [key: string]: Namespace } = {};
    translationNamespaces = window.translationNamespaces;
    isReadyInterval: number;

    constructor() {
        Object.keys(this.translationNamespaces).map(ns => {
            this.namespaces[ns] = {
                url: this.translationNamespaces[ns],
                isStatic: ['cep', 'sb'].indexOf(ns) > -1,
                isReady: false,
                timeout: null,
                cache: {},
                nsKeyPromiseListMap: {}
            };

            if (this.namespaces[ns].url && this.namespaces[ns].isStatic) {
                fetch(this.translationNamespaces[ns])
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        this.namespaces[ns].cache[DEFAULT_ENTITY_TYPE] = data;
                        this.namespaces[ns].isReady = true;
                    })
                    .then(() => {
                        setTimeout(() => {
                            this.staticResolution(ns, null)
                        })
                    });
            } else {

            }
        });
    }

    checkAllReady() {
        return Object.keys(this.namespaces).map(ns => this.namespaces[ns].isReady).reduce((a, b) => a && b)
    }

    allReadyPromise(): Promise<void> {
        return new Promise((resolve: () => void) => {
            this.isReadyInterval = setInterval(() => {
                if (this.checkAllReady()) {
                    resolve();
                }
            }, 1000);
        })
    }

    translate(ns: string, key: string, entity: string):Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.translationNamespaces[ns]) {
                if (this.namespaces[ns].isStatic) {
                    if (this.namespaces[ns].isReady) {
                        this.namespaces[ns].cache[key] ? resolve(this.namespaces[ns].cache[entity][key]) : reject(`no key=${key} in ns=${ns}`);
                    } else {
                        this.addToLookup(ns, entity, key, resolve, reject);
                    }
                } else {
                    this.addToLookup(ns, entity, key, resolve, reject);
                }
                return;
            } else {
                reject('no namespace ' + ns);
            }
        })
    }

    addToLookup(ns: string, entity: string, key: string, resolve: (result: any) => void, reject: (result: any) => void) {
        if (!this.namespaces[ns].nsKeyPromiseListMap[entity]) {
            this.namespaces[ns].nsKeyPromiseListMap[entity] = {}
        }
        if (!this.namespaces[ns].nsKeyPromiseListMap[entity][key]) {
            this.namespaces[ns].nsKeyPromiseListMap[entity][key] = [];
        }
        this.namespaces[ns].nsKeyPromiseListMap[entity][key].push({
            resolve, reject
        });
        if (!this.namespaces[ns].isStatic) {
            clearTimeout(this.namespaces[ns].timeout);
            this.namespaces[ns].timeout = setTimeout(() => {
                this.checkDynamicTranslations(ns)
            }, 1000);
        }
    }

    checkDynamicTranslations(ns: string) {
        if (Object.keys(this.namespaces[ns].nsKeyPromiseListMap).length == 0) {
            this.namespaces[ns].isReady = true;
            return;
        }
        const copy = JSON.parse(JSON.stringify(this.namespaces[ns].nsKeyPromiseListMap));
        fetch(this.buildFetchUrlForDynamic(ns))
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                Object.assign(this.namespaces[ns].cache, data);
                this.staticResolution(ns, copy);
                this.namespaces[ns].timeout = setTimeout(() => {
                    this.checkDynamicTranslations(ns)
                }, 1000);
            });


    }

    buildFetchUrlForDynamic(ns: string) {
        let url = this.namespaces[ns].url +
            `?` + Object.keys(this.namespaces[ns].nsKeyPromiseListMap).map(entity => {
                return `${entity}=${Object.keys(this.namespaces[ns].nsKeyPromiseListMap[entity]).join(',')}`
            }).join("&");
        return url;
    }

    staticResolution(ns: string, cleanUpCopy: EntityEntry<ResolveReject[]>) {
        Object.keys(this.namespaces[ns].nsKeyPromiseListMap).forEach(entity => {
            Object.keys(this.namespaces[ns].nsKeyPromiseListMap[entity]).forEach(key => {
                const translation = this.namespaces[ns].cache[entity] && this.namespaces[ns].cache[entity][key];
                if (translation) {
                    this.namespaces[ns].nsKeyPromiseListMap[entity][key].forEach(lookupCallbacks => {
                        setTimeout(() => lookupCallbacks.resolve(translation));
                    })
                } else {
                    this.namespaces[ns].nsKeyPromiseListMap[entity][key].forEach(lookupCallbacks => {
                        setTimeout(() => lookupCallbacks.reject(translation));
                    })
                }
            })

        });

        if (cleanUpCopy) {
            Object.keys(cleanUpCopy).forEach(entity => {
                Object.keys(cleanUpCopy[entity]).forEach(key => {
                    if (this.namespaces[ns].nsKeyPromiseListMap[entity]) {
                        delete this.namespaces[ns].nsKeyPromiseListMap[entity][key];
                    }
                })
                if (Object.keys(this.namespaces[ns].nsKeyPromiseListMap[entity]).length === 0) {
                    delete this.namespaces[ns].nsKeyPromiseListMap[entity];
                }
            })
        }
    }
}

const translator = new Translator();

export default translator;