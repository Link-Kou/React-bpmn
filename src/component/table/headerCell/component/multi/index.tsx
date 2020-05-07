import * as React from 'react';
import classNames from 'classnames';

/*import {Table} from 'rsuite';

const {HeaderCell} = Table;*/

interface IProps {
    head?: {
        title: string,
        children?: Array<Array<string>>
    }
}

/**
 * 多表头
 * @param props
 * @constructor
 */
export const MultiHeaderCell = (props: IProps) => {
    const {head} = props

    const names = classNames({
        'app-header-cell-multiple-group-title': Array.isArray(head?.children),
        'app-header-cell-group-title': !Array.isArray(head?.children)
    });
    return (
        <>
            <div className={names}>
                <div>{head?.title}</div>
            </div>
            {
                head?.children?.map((k, i, a) => (
                    <div className={'app-header-cell-multiple-group-subtitle'}>
                        {
                            k.map((x1, i1, ai) => (
                                <span>{x1}</span>
                            ))
                        }
                    </div>
                ))
            }
        </>
    )
}
