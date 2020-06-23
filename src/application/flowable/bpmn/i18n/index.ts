import zh from './zh';

/**
 *
 * @param template
 * @param replacements
 * @constructor
 */
export function translate(template: any, replacements: any) {
    replacements = replacements || {};
    // Translate
    template = zh[template] || template;
    // Replace
    return template.replace(/{([^}]+)}/g, (_: any, key: any) => {
        return replacements[key] || '{' + key + '}';
    });
}

export const modulesTranslate = {
    translate: ['value', translate]
};

export default modulesTranslate
