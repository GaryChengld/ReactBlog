import React from 'react';
import { Alert, Collapse } from 'react-bootstrap';

export default class Toast extends React.Component {
  constructor() {
    super();
  }

  componentDidUpdate() {
    const { showing, onDismiss } = this.props;
    if (showing) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = setTimeout(onDismiss, 5000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }

  render() {
    const {
      showing, variant, onDismiss, children,
    } = this.props;
    return (
      <Collapse in={showing}>
        <div style={{ position: 'fixed', top: 60, left: 40 }}>
          <Alert variant={variant} onClose={onDismiss} dismissible>
            {children}
          </Alert>
        </div>
      </Collapse>
    );
  }
}
