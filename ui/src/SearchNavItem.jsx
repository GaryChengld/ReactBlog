import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button, FormControl, Form,
} from 'react-bootstrap';

export default class SearchNavItem extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      doSearch: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { search } = this.state;
    if (search && search.trim()) {
      this.setState({ doSearch: true });
    } else {
      this.setState({ doSearch: false });
    }
    event.preventDefault();
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState({ [name]: value });
  }

  render() {
    const { search, doSearch } = this.state;
    if (doSearch) {
      const redirectPath = `/searchPosts/${search}`;
      this.setState({ doSearch: false });
      return <Redirect to={redirectPath} />;
    }
    return (
      <Form onSubmit={this.handleSubmit} inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2"
          name="search" value={search} onChange={this.handleChange} />
        <Button type="submit" variant="outline-light">Search</Button>
      </Form>
    );
  }
}