import React from 'react';
import { withRouter } from 'react-router-dom';
import URLSearchParams from 'url-search-params';
import {
  FormControl, Form, InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class SearchNavItem extends React.Component {
  constructor() {
    super();
    this.state = { search: '' };
    this.doSearch = this.doSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  async handleSubmit(event) {
    event.preventDefault();
    this.doSearch();
  }

  render() {
    const { search } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} inline>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            name="search"
            value={search}
            onChange={this.handleChange}
          />
        </InputGroup>
      </Form>
    );
  }
}

export default withRouter(SearchNavItem);
