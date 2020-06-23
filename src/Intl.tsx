import * as React from 'react';
import {IntlProvider as RsIntlProvider} from 'rsuite';
import {IntlProvider} from 'react-intl';
import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';

/**
 *
 * @author lk
 * @date 2020/4/16 15:30
 * @version 1.0
 */
export default class Intl extends React.Component {

    public render() {
        return (
            <IntlProvider locale="zh">
                <RsIntlProvider locale={zhCN}>
                    {this.props.children}
                </RsIntlProvider>
            </IntlProvider>
        )
    }
}
