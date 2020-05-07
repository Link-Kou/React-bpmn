import * as React from 'react';
import {FormattedMessage} from 'react-intl';

interface IProps {
    intl: any
}

const success: React.FC<IProps> = props => {
    return (
        <span title={''}>
            <FormattedMessage id="hello" tagName="p" />
        </span>
    );
};

export default {
    success
}
