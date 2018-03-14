import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/actions';
import './App.css';

import Sidebar from './components/Sidebar/Sidebar';
import AddArticle from './containers/AddArticle/AddArticle';
import Today from './components/Today/Today';
import ListAll from './containers/ListAll/ListAll';
import ListFavs from './components/ListFavs/ListFavs';
import Messanger from './containers/Messanger/Messanger';

class App extends Component {
    componentWillMount = () => {
        this.props.store_fetchArticles();
    }

    postMsg = (msg) => {
        this.setState({ messangerMessage: msg});
    }

    render() {
        return (
            <main className="app">
                <div className="l-sidebar">
                    <Sidebar />
                </div>

                <div className="l-content" id="itemList">
                    <div className="items">
                        <Switch>
                            <Route path="/add" render={(props) => <AddArticle
                                {...props}
                                triggerFetchArticles={this.getArticles}
                                articles={this.props.store_articles}
                                postMsg={this.postMsg} />}
                            />

                            <Route path="/all" render={() => {
                                return this.props.store_articles
                                    ? <ListAll
                                        articles={this.props.store_articles} />
                                    : <h1>Loading...</h1>
                            }} />

                            <Route path="/favs" render={() => {
                                return <ListFavs
                                    favs={this.props.store_favs} />
                            }} />

                            <Route path="/" exact render={() => {
                                return this.props.store_articles
                                    ? <Today articles={this.props.store_articles} />
                                    : <h1>Loading...</h1>
                            }} />
                            <Route render={() => <h1>404</h1>} />
                        </Switch>
                    </div>
                </div>

                <Messanger />
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        store_articles: state.articles.articles,
        store_favs: state.articles.favs,
        messangerMessage: state.messanger.messangerMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        store_fetchArticles: () => dispatch(actions.fetchArticles())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
