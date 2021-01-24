import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { List } from 'react-content-loader';

const ArticleList = ({ articles }) => (
  <ul>
    {articles.map(({ objectID, url, title }) => (
      <li key={objectID}>
        <a href={url} target="_blank" rel="noreferrer noopener">
          {title}
        </a>
      </li>
    ))}
  </ul>
);

class App extends Component {
  state = {
    articles: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    axios
      .get('https://hn.algolia.com/api/v1/search?query=rhdhgjshdg')
      .then(response => this.setState({ articles: response.data.hits }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { articles, isLoading, error } = this.state;

    return (
      <>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading ? <List /> : <ArticleList articles={articles} />}
        {articles.length > 0 ? (
          <ArticleList articles={articles} />
        ) : (
          <p>Not found</p>
        )}
      </>
    );
  }
}

export default App;
