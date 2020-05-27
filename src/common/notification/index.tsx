import * as React from 'react';
import {Button, ButtonToolbar, Icon, Notification as rsuiteNotification} from 'rsuite';
import TextSpan from '@component/textSpan';

/**
 *
 * @author lk
 * @date 2020/5/25 15:24
 * @version 1.0
 */
export default class Notifications {

    public static MessageElement(body: string) {
        rsuiteNotification.open({
            title: <b><Icon icon={'info'} style={{fontSize: 12}}/>消息</b>,
            duration: 5000,
            placement: 'bottomEnd',
            description: (
                <div style={{width: 240}}>
                    <div title={body}>
                        <TextSpan>{body}</TextSpan>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', paddingTop: 5}}>
                        <ButtonToolbar>
                            <Button appearance={'link'}>收到</Button>
                            <Button appearance={'link'}>关闭</Button>
                        </ButtonToolbar>
                    </div>
                </div>
            )
        });
    }


    public static MessageHtml5(body: string) {
        setTimeout(() => {
            //如果支持window.Notification 并且 许可不是拒绝状态
            if (window.Notification && Notification.permission !== 'denied') {
                //Notification.requestPermission这是一个静态方法，作用就是让浏览器出现是否允许通知的提示
                Notification.requestPermission((status) => {
                    //如果状态是同意
                    if (status === 'granted') {
                        const m = new Notification('收到信息', {
                            //消息体内容
                            body: '这里是通知内容！你想看什么客官？',
                            //消息图片
                            icon: 'https://tpc.googlesyndication.com/simgad/1867291076621302057/downsize_200k_v1?w=300&h=300'
                        });
                        m.onclick = function () {//点击当前消息提示框后，跳转到当前页面
                            window.focus();
                        }
                    } else {
                        Notifications.MessageElement('您未授权获取到浏览器通知权限')

                    }
                });
            }
        }, 100)
    }


}
