import React, { Component } from 'react';

import { Layout } from 'antd';
import { appLevelErrorMessage } from '../../constants';
import { clearSession } from '../../utils/auth';

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null }
  }

  componentDidCatch(error, info) {
    this.setState({ error });
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;
    if (error) {
      setTimeout(() => {
        clearSession();
        this.setState({ error: null },
          window.location.reload()
        );
      }, 3000);
      return <h3>{appLevelErrorMessage}</h3>;
    }
    return children;
  }
}

export default AppErrorBoundary;
