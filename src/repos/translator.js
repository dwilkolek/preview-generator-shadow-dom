export const DEFAULT_ENTITY_TYPE = 'none';

class Translator {

    constructor() {

        this.nsKeyPromiseListMap = {};

        this.namespaces = {}

        this.translationNamespaces = window.translationNamespaces || {
            cep, sb, rest
        };

        Object.keys(this.translationNamespaces).map(ns => {
            this.namespaces[ns] = {
                url: this.translationNamespaces[ns],
                isStatic: ['cep', 'sb'].indexOf(ns) > -1,
                isReady: false,
                timeout: null,
                cache: {}
            };
            this.nsKeyPromiseListMap[ns] = {};

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
                            this.staticResolution(ns, this.namespaces[ns].cache)
                        })
                    });
            } else {

            }
        });
    }

    checkAllReady() {
        return Object.keys(this.namespaces).map(ns => this.namespaces[ns].isReady).reduce((a, b) => a && b)
    }

    allReadyPromise() {
        return new Promise((resolve, reject) => {
            this.isReadyInterval = setInterval(() => {
                if (this.checkAllReady()) {
                    resolve();
                }
            }, 1000);
        })
    }

    translate(ns, key, entity) {
        return new Promise((resolve, reject) => {
            if (this.translationNamespaces[ns]) {
                if (this.namespaces[ns].isStatic) {
                    if (this.namespaces[ns].isReady) {
                        this.namespaces[ns].cache[key] ? resolve(this.namespaces[ns].cache[key]) : reject(`no key=${key} in ns=${ns}`);
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

    // lookup(key) {
    //     return this.cache[key];
    // }

    addToLookup(ns, entity, key, resolve, reject) {
        if (!this.nsKeyPromiseListMap[ns][entity]) {
            this.nsKeyPromiseListMap[ns][entity] = {}
        }
        if (!this.nsKeyPromiseListMap[ns][entity][key]) {
            this.nsKeyPromiseListMap[ns][entity][key] = [];
        }
        this.nsKeyPromiseListMap[ns][entity][key].push({
            resolve, reject
        });
        if (!this.namespaces[ns].isStatic) {
            clearTimeout(this.namespaces[ns].timeout);
            this.namespaces[ns].timeout = setTimeout(() => {
                this.checkDynamicTranslations(ns)
            }, 1000);
        }
    }

    checkDynamicTranslations(ns) {
        if (Object.keys(this.nsKeyPromiseListMap[ns]).length == 0) {
            this.namespaces[ns].isReady = true;
            return;
        }
        const copy = JSON.parse(JSON.stringify(this.nsKeyPromiseListMap[ns]));
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

    buildFetchUrlForDynamic(ns) {
        let url = this.namespaces[ns].url +
            `?` + Object.keys(this.nsKeyPromiseListMap[ns]).map(entity => {
                return `${entity}=${Object.keys(this.nsKeyPromiseListMap[ns][entity]).join(',')}`
            }).join("&");
        return url;
    }

    staticResolution(ns, cleanUpCopy) {
        Object.keys(this.nsKeyPromiseListMap[ns]).forEach(entity => {
            Object.keys(this.nsKeyPromiseListMap[ns][entity]).forEach(key => {
                const translation = this.namespaces[ns].cache[entity] && this.namespaces[ns].cache[entity][key];
                if (translation) {
                    this.nsKeyPromiseListMap[ns][entity][key].forEach(lookupCallbacks => {
                        setTimeout(() => lookupCallbacks.resolve(translation));
                    })
                } else {
                    this.nsKeyPromiseListMap[ns][entity][key].forEach(lookupCallbacks => {
                        setTimeout(() => lookupCallbacks.reject(translation));
                    })
                }
            })

        });

        if (cleanUpCopy) {
            Object.keys(cleanUpCopy).forEach(entity => {
                Object.keys(cleanUpCopy[entity]).forEach(key => {
                    if (this.nsKeyPromiseListMap[ns][entity]) {
                        delete this.nsKeyPromiseListMap[ns][entity][key];
                    }                    
                })
                if (Object.keys(this.nsKeyPromiseListMap[ns][entity]).length === 0) {
                    delete this.nsKeyPromiseListMap[ns][entity];
                }
            })
        }
    }
}

const translator = new Translator();

export default translator;