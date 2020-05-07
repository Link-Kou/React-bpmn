export default class Url {

    public static getSearch(search?: string, split: string = '='): Map<string, string> | null {
        const keyval = new Map<string, string>()
        if (search && search.startsWith('?')) {
            const val = search.substr(1, search.length);
            const strings = val.split(split);
            if (strings.length % 2 === 0) {
                for (let i = 0; i < strings.length; i = i + 2) {
                    keyval.set(strings[i], strings[i + 1])
                }
            }
            return keyval
        }
        return null
    }
}
