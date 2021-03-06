import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class InputPost extends React.Component {
  constructor(props) {
    super(props);
    const { post } = props;
    this.state = { post };
    this.goBack = this.goBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState(prevState => ({
      post: { ...prevState.post, [name]: value },
    }));
  }

  isFormValid(post) {
    if (post.title && post.title.trim() && post.body && post.body.trim()) {
      return true;
    }
    return false;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { post } = this.state;
    if (this.isFormValid(post)) {
      const { savePost } = this.props;
      await savePost(post);
    } else {
      const { showError } = this.props;
      showError('All fields requried, please try again');
    }
  }

  render() {
    const { title } = this.props;
    const { post } = this.state;
    return (
      <Card>
        <Card.Header as="h5">{title}</Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control as="input" name="title" value={post.title} onChange={this.handleChange} autoFocus />
            </Form.Group>
            <Form.Group controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control as="textarea" rows="5" name="body" value={post.body} onChange={this.handleChange} />
            </Form.Group>
            <div className="btn-toolbar">
              <Button variant="primary" type="submit">Save</Button>
              <Button variant="link" onClick={this.goBack}>Cancel</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(InputPost);
