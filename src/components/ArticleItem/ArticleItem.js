import React from 'react';
import { dateFromTimestamp } from '../../utils';

const item = (props) => {
    const dateString = dateFromTimestamp(props.article.day);
    const readIconType = props.article.unread ? 'icon-ok' : 'icon-doc-text';
    const favIconType = props.article.isFav ? 'icon-star' : 'icon-star-empty';

    return (
        <article className="listItem">
            <h2 className="listItem__title">
                <a href={props.article.url} target="_blank">
                    {props.article.title}
                </a>
            </h2>
            
            <ul className="listItem__tools">
                <li>
                    <i className="icon-clock"></i>
                    <time>{dateString}</time>
                </li>
                {props.onReadToggle
                    ? <li onClick={props.onReadToggle} className="link" role="button">
                        <i className={readIconType}></i>
                        mark as {props.article.unread ? 'read' : 'unread'}
                    </li>
                    : null
                }
                <li onClick={props.onFavToggle} className="link" role="button">
                    <i className={favIconType}></i>
                    {props.article.isFav ? 'remove fav' : 'add to favs'}
                </li>
                {props.onDelete
                    ? <li onClick={props.onDelete} className="link" role="button">
                        <i className="icon-cancel"></i>delete
                    </li>
                    : null
                }
            </ul>
        </article>
    );
}

export default item;