import t from './t';

export default (key: string) => {
    return t('sb', null, 'selector-operator-' + key, key)
}