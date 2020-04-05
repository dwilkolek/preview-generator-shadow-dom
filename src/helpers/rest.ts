import t from './t';
export default (entity: string, key: string, placeholder: string) => {
    return t('rest', entity, key, placeholder)
}