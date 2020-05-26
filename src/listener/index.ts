import * as PubSub from 'pubsub-js'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

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
        const select = false;
        if (select) {
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
        } else {
            //判断当前浏览器是否支持WebSocket
            const socket = new SockJS('http://localhost:8080/sockjs/socketServer');
            socket.onmessage = function (e) {
                console.log('message', e.data);
            }
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
                console.log('Connected: ' + frame);
                stompClient.subscribe('/user/topic/greetings', function (greeting) {
                    //showGreeting(JSON.parse(greeting.body).content);
                });
            });
        }

    }
}
