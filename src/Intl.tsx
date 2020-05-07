import * as React from 'react';
import {IntlProvider as RsIntlProvider} from 'rsuite';
import {IntlProvider, useIntl} from 'react-intl';
import CN from './config/zh_cn';
import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';

interface IIntlProps {
    nors: boolean
}

/**
 *
 * @author lk
 * @date 2020/4/16 15:30
 * @version 1.0
 */
export class Intl extends React.Component<IIntlProps> {

    public render() {
        const {nors} = this.props
        return (
            nors ?
                <IntlProvider locale="zh" messages={CN}>
                    {this.props.children}
                </IntlProvider>
                :
                <IntlProvider locale="zh" messages={CN}>
                    <RsIntlProvider locale={zhCN}>
                        {this.props.children}
                    </RsIntlProvider>
                </IntlProvider>
        )
    }
}

interface IHookFormattedMessageTextProps {
    id?: string
    other?: any
}

export const HookFormattedMessageText = (props: IHookFormattedMessageTextProps) => {
    const {formatMessage: f} = useIntl();
    const {id, other} = props
    return <>{f({id}, other)}</>
}

export default {
    Intl,
    HookFormattedMessageText
}
