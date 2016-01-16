import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import * as Firebase from 'firebase';
import { Link } from 'react-router';

import { logout } from '../../actions/auth_actions';

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogout: () => {
      dispatch(logout());
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class AppLogout extends React.Component<any, any> {
  componentDidMount() {
    let { onLogout } = this.props;

    onLogout();
  }

  render() {
    return null;
  }
}