import * as PubSub from 'pubsub-js'

export default class Listener {

    /**
     * 打开全局刷新
     */
    public static NavMenuSidenav: string = 'NavMenuSidenav'

    /**
     * 发送事件
     * @param moldTyp
     * @constructor
     */
    public static EmitNavMenuSidenav() {
        PubSub.publish(Listener.NavMenuSidenav, {})
    }


    /**
     * 打开指定的搜索框
     */
    public static DrawerSearch: string = 'DrawerSearch'

    /**
     * 发送事件
     * @param moldTyp
     * @constructor
     */
    public static EmitDrawerSearch(e: { name: string }) {
        PubSub.publish(Listener.DrawerSearch, e)
    }

}
