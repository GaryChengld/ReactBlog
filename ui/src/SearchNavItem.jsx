import React from 'react';
import { withRouter } from 'react-router-dom';
import URLSearchParams from 'url-search-params';
import {
  Button, FormControl, Form,
} from 'react-bootstrap';

class SearchNavItem extends React.Component {
  constructor() {
    super();
    this.state = { search: '' };
    this.doSearch = this.doSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  doSearch() {
    const { search } = this.state;
    const { history } = this.props;

    if (search && search.trim()) {
      const params = new URLSearchParams();
      params.set('text', search);
      const searchParam = `?${params.toString()}`;
      history.push({ pathname: '/searchPosts', search: searchParam });
    }
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState({ [name]: value });
  }

  render() {
    const { search } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2"
          name="search" value={search} onChange={this.handleChange} />
        <Button variant="outline-light" onClick={this.doSearch}>Search</Button>
      </Form>
    );
  }
}

export default withRouter(SearchNavItem);