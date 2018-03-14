import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';

import ArticleItem from '../ArticleItem/ArticleItem';

const listFavs = (props) => {
    return (
        <div>
            <header className="pageHeader">
                <h1>Fovourite articles</h1>
            </header>

            {props.store_favs.map(article => (
                <ArticleItem
                    key={article.id}
                    article={article}
                    onFavToggle={() => props.onArticleToggleFav(article.id, !article.isFav, article.title)}
                />
            ))}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        store_favs: state.articles.favs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onArticleToggleFav: (id, value, title) => dispatch(actions.articleToggleFav(id, value, title))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(listFavs);