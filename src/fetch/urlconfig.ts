/**
 * 统一请求结构类型
 */
export const BaseConfig = {
    version: '123',
    devTokenId: '123456',
    business: 2,
    platform: 3,
    system: 4
}

/**
 * 统一数据结构返回类型
 */
export interface IUrlError {
    /**
     * 错误代码
     */
    code: number
    /**
     * 提示信息
     */
    msg: string
    /**
     * 数据类型
     */
    data: any
    /**
     * 是否成功
     */
    success: boolean
}

/**
 * 统一数据结构请求分页
 */
export interface IPageResData {
    /**
     * 当前页
     */
    page: number,
    /**
     * 每页条数
     */
    itemsPerPage: number,
    /**
     * 数据
     */
    data?: any
}

/**
 * 统一数据结构返回分页
 */
export interface IPageReqData extends IUrlError {
    data: {
        /**
         * 总页数
         */
        total: number
        /**
         * 数据
         */
        list: any
    }
}

/**
 * 项目地址列表
 */
enum UrlType {
    /**
     * 产品
     */
    product = '/product',
    /**
     * 原纸
     */
    paper = '/paper',
    /**
     * 楞型
     */
    corrugated = '/corrugated',
    /**
     * 纸板
     */
    cardboard = '/cardboard',
    /**
     * 纸箱
     */
    Carton = '/carton',
    /**
     * 文件
     */
    file = '/file',
    /**
     * 辅料
     */
    material = '/material',
    /**
     * 权限
     */
    permissions = '/permissions',
}

/**
 * 根据环境切换Url
 */
export class Url {

    public static getUrl(): string {
        const reactappenv: any = String(process.env.REACT_APP_Env);
        const URL = {
            'Dev': '/dev',
            'Test': '/',
            'Pro': '/'
        }
        return URL[reactappenv]
    }

    /**
     * 产品
     */
    public static getProduct(url: String): string {
        return this.getUrl() + UrlType.product + url
    }

    /**
     * 原纸
     */
    public static getPaper(url: String): string {
        return this.getUrl() + UrlType.paper + url
    }

    /**
     * 楞型
     */
    public static getCorrugated(url: String): string {
        return this.getUrl() + UrlType.corrugated + url
    }

    /**
     * 纸板
     */
    public static getCardboard(url: String): string {
        return this.getUrl() + UrlType.cardboard + url
    }

    /**
     * 纸箱
     */
    public static getCarton(url: String): string {
        return this.getUrl() + UrlType.Carton + url
    }

    /**
     * 文件
     */
    public static getFile(url: String): string {
        return this.getUrl() + UrlType.file + url
    }

    /**
     * 辅料
     */
    public static getMaterial(url: String): string {
        return this.getUrl() + UrlType.material + url
    }


    /**
     * 权限
     */
    public static getPermissions(url: String): string {
        return this.getUrl() + UrlType.permissions + url
    }
}

