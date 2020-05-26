import * as React from 'react';
import {Button, Notification} from 'rsuite';

/**
 *
 * @author lk
 * @date 2020/5/25 15:24
 * @version 1.0
 */
export default class Notifications {

    public static Message(body: string) {
        Notification.open({
            title: '消息',
            duration: 10000,
            description: (
                <div>
                    <p>{body}</p>
                    <Button
                        onClick={() => {
                            Notification.close();
                        }}
                    >
                        知道了
                    </Button>
                </div>
            )
        });
    }
}
