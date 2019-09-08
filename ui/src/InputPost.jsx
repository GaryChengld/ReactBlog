import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

export default class InputPost extends React.Component {
  constructor(props) {
    super(props);
    const { post } = props;
    this.state = {
      post
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState(prevState => ({
      post: { ...prevState.post, [name]: value },
    }));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { post } = this.state;
    if (this.isFormValid(post)) {
      const { savePost } = this.props;
      const data = await savePost(post);
      if (data) {
        
      }
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
              <Button variant="primary">Save</Button>
              <Button variant="link" >Cancel</Button>
            </div>
          </Form>

        </Card.Body>
      </Card>
    );
  }
}
