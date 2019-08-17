import React from 'react';
import { Alert, Collapse } from 'react-bootstrap';

export default class Toast extends React.Component {
  constructor() {
    super();
    this.state = {
      showing: false,
      variant: 'info',
    };
    this.showInfo = this.showInfo.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidUpdate() {
    const { showing } = this.state;
    if (showing) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = setTimeout(this.onClose, 3000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }

  onClose() {
    this.setState({ showing: false });
  }

  showInfo() {
    this.setState({ variant: 'info', showing: true });
  }

  showSuccess() {
    this.setState({ variant: 'success', showing: true });
  }

  showError() {
    this.setState({ variant: 'danger', showing: true });
  }

  render() {
    const { children } = this.props;
    const { showing, variant } = this.state;
    return (
      <Collapse in={showing}>
        <div style={{ position: 'fixed', top: 60, left: 40 }}>
          <Alert variant={variant} onClose={this.onClose} dismissible>
            {children}
          </Alert>
        </div>
      </Collapse>
    );
  }
}
