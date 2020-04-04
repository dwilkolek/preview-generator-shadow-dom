import t from './t';

export default (key) => {
    return t('sb', null, 'selector-operator-' + key, key)
}