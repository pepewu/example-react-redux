import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articles: null,
    favs: [],
    flags: {
        loading: false,
        addingArticle: false,
        addedArticle: false
    }
};

const case_FetchArticlesSuccess = (state, data) => {
    const articles = Object.keys(data)
        .map(id => {
            return {
                ...data[id],
                id: id
            }
        })
        .sort((prev, next) => prev.day < next.day);

    const favs = articles.filter(article => article.isFav);

    return {
        ...state,
        articles: articles,
        favs: favs,
        loading: false
    };
};

const case_ArticleToggleRead = (state, id, value) => {
    const updatedArticles = [...state.articles];
    const index = updatedArticles.findIndex(article => article.id === id);
    const updatedArticle = {
        ...updatedArticles[index],
        unread: value
    }
    updatedArticles.splice(index, 1, updatedArticle);

    return {
        ...state,
        articles: updatedArticles
    };
};

const case_ArticleToggleFav = (state, id) => {
    const updatedArticles = [...state.articles];
    const index = updatedArticles.findIndex(article => article.id === id);
    const updatedArticle = {
        ...updatedArticles[index],
        isFav: !updatedArticles[index].isFav
    }
    updatedArticles.splice(index, 1, updatedArticle);

    const updatedFavs = [...state.favs];
    const favIndex = updatedFavs.findIndex(article => article.id === id);
    if (favIndex >= 0) {
        updatedFavs.splice(favIndex, 1);
    } else {
        updatedFavs.push(updatedArticle);
    }

    return {
        ...state,
        articles: updatedArticles,
        favs: updatedFavs
    };
};

const case_ArticleDelete = (state, id) => {
    const afterDelete = state.articles.filter(article => article.id !== id);
    
    return {
        ...state,
        articles: afterDelete
    };
}

const case_ArticleAddInit = (state) => {
    return {
        ...state,
        flags: {
            ...state.flags,
            addingArticle: false,
            addedArticle: false
        }
    }
}

const case_ArticleAddStart = (state) => {
    return {
        ...state,
        flags: {
            ...state.flags,
            addingArticle: true,
            addedArticle: false
        }
    }
}

const case_ArticleAddSuccess = (state) => {
    return {
        ...state,
        flags: {
            ...state.flags,
            addingArticle: false,
            addedArticle: true
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ARTICLES_SUCCESS:
            return case_FetchArticlesSuccess(state, action.articles);
        case actionTypes.ARTICLE_TOGGLE_READ:
            return case_ArticleToggleRead(state, action.id, action.value);
        case actionTypes.ARTICLE_TOGGLE_FAV:
            return case_ArticleToggleFav(state, action.id);
        case actionTypes.ARTICLE_DELETE:
            return case_ArticleDelete(state, action.id);
        case actionTypes.ARTICLE_ADD_INIT:
            return case_ArticleAddInit(state);
        case actionTypes.ARTICLE_ADD_START:
            return case_ArticleAddStart(state);
        case actionTypes.ARTICLE_ADD_SUCCESS:
            return case_ArticleAddSuccess(state);
        case actionTypes.ARTICLE_ADD_FAIL:
            return case_ArticleAddInit(state);
        default:
            return state;
    }
}

export default reducer;