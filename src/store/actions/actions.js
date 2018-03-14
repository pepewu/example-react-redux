import React from 'react';
import * as actionTypes from './actionTypes';
import axios from 'axios';

const fetchArticlesSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_ARTICLES_SUCCESS,
        articles: payload
    }
};

export const fetchArticles = () => {
    return dispatch => {
        axios.get('https://front-end-daily.firebaseio.com/articles.json')
            .then(response => {
                dispatch(fetchArticlesSuccess(response.data));
            });
    }
};

export const articleToggleRead = (id, value, title) => {
    // thunk
    return dispatch => {
        // update store immediately (optimistic)
        dispatch(articleToggleReadStart(id, value));

        // update state on server
        axios.patch(`https://front-end-daily.firebaseio.com/articles/${id}.json`, {
            unread: value
        })
            .then(() => {
                dispatch(postMessage(<span>New read state for <strong>{title}</strong> saved.</span>));
            })
            .catch(error => {
                // revert to oroginal value
                dispatch(articleToggleReadStart(id, !value));
                dispatch(postMessage(<span>Error saving state for <strong>{title}</strong><br />({error.message})</span>));
            });
    }
};

const articleToggleReadStart = (id, value) => {
    return {
        type: actionTypes.ARTICLE_TOGGLE_READ,
        id: id,
        value: value
    }
}

export const articleToggleFav = (id, value, title) => {
    // thunk
    return dispatch => {
        // update store immediately (optimistic)
        dispatch(articleToggleFavStart(id, value));

        // update state on server
        axios.patch(`https://front-end-daily.firebaseio.com/articles/${id}.json`, {
            isFav: value
        })
            .then(() => {
                let msg = null;
                if (value) {
                    msg = <span>Added <strong>{title}</strong> to favourites.</span>;
                } else {
                    msg = <span>Removed <strong>{title}</strong> from favourites.</span>;
                }
                dispatch(postMessage(msg));
            })
            .catch(error => {
                // revert to oroginal value
                dispatch(articleToggleFavStart(id, !value));
                dispatch(postMessage(<span>Error saving state for <strong>{title}</strong><br />({error.message})</span>));
            });
    }
};

const articleToggleFavStart = (id, value) => {
    return {
        type: actionTypes.ARTICLE_TOGGLE_FAV,
        id: id,
        value: value
    }
};

export const articleDelete = (id, title) => {
    // thunk
    return dispatch => {
        // update store immediately (optimistic)
        dispatch(articleDeleteStart(id));

        // update state on server
        axios.delete(`https://front-end-daily.firebaseio.com/articles/${id}.json`)
            .then(() => {
                dispatch(postMessage(<span>Deleted <strong>{title}</strong></span>));
            })
            .catch(error => {
                // revert to oroginal value
                dispatch(fetchArticles());
                dispatch(postMessage(<span>Error deleting <strong>{title}</strong><br />({error.message})</span>));
            });
    }
}

const articleDeleteStart = (id) => {
    return {
        type: actionTypes.ARTICLE_DELETE,
        id: id
    }
};

export const showMessage = (msg, id) => {
    return {
        type: actionTypes.MESSANGER_SHOW_MESSAGE,
        msg: msg,
        id: id
    }
};

export const hideMsg = (id) => {
    return {
        type: actionTypes.MESSANGER_HIDE_MESSAGE,
        id: id
    }
}; 

let msgCounter = 1;
export const postMessage = (msg) => {
    const id = msgCounter++;

    return dispatch => {
        dispatch(showMessage(msg, id));

        setTimeout(() => {
            dispatch(hideMsg(id))
        }, 5000);
    }
};

export const articleAdd = (data) => {
    return dispatch => {
        dispatch(articleAddStart());
        axios.post('https://front-end-daily.firebaseio.com/articles.json', data)
            .then(() => {
                dispatch(articleAddSuccess());
                dispatch(postMessage(<span>Added new article <strong>{data.title}</strong></span>));
                dispatch(fetchArticles());
            })
            .catch(error => {
                dispatch(articleAddFail());
                dispatch(postMessage(<span>Failed adding article ({error.message})</span>));
            });
    }
};

export const articleAddInit = () => {
    return {
        type: actionTypes.ARTICLE_ADD_INIT,
    }
};

const articleAddStart = () => {
    return {
        type: actionTypes.ARTICLE_ADD_START,
    }
};

const articleAddSuccess = () => {
    return {
        type: actionTypes.ARTICLE_ADD_SUCCESS,
    }
};

const articleAddFail = () => {
    return {
        type: actionTypes.ARTICLE_ADD_FAIL,
    }
}; 