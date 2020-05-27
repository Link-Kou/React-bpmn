import * as PubSub from 'pubsub-js'

export default class Listener {

    /**
     * NavMenuSidenav 缩小张开
     */
    public static NavMenuSidenav: string = 'NavMenuSidenav'

    /**
     * 发送事件
     * @param moldTyp
     * @constructor
     */
    public static EmitNavMenuSidenav() {
        PubSub.publishSync(Listener.NavMenuSidenav, {})
    }

    /**
     * NavTabClosed Tab关闭
     */
    public static NavTabClosed: string = 'NavTabClosed'


    /**
     * 发送事件
     * @param moldTyp
     * @constructor
     */
    public static EmitNavTabClosed(callback: () => void) {
        PubSub.publish(Listener.NavTabClosed, {
            callback
        })
    }


    public static ws() {
        //TODO WS URL需要进行配置处理
        //ws://localhost:8080
        //`ws://${window.location.host}/socketServer`
        const sock = new WebSocket('ws://localhost:8080/socketServer');
        sock.onopen = function (e) {
            sock.send('1234')
            console.log(e);
        };
        sock.onmessage = function (e) {
            console.log('message', e.data);
        };
        sock.onerror = function (e) {
            console.log(e);
        };
        sock.onclose = function (e) {
            console.log(e);
        }
    }
}
