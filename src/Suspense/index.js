import React, { Suspense } from 'react';

class Sus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }
  componentDidCatch(error, info) {
    console.log('catchError', error, error instanceof Promise, info);
    this.setState({ isLoading: true })
    // if (typeof error.then === 'function') {
    //   this.setState({ isLoading: true })
    //   error.then((d) => {
    //     this.setState({ isLoading: false })
    //   })
    // }
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染可以显示降级 UI
    // return { hasError: true };
    console.log('get static', error)
    // if (typeof error.then === 'function') {
    //   this.setState({ isLoading: true })
    //   error.then((d) => {
    //     this.setState({ isLoading: false })
    //   })
    // }
    return { isLoading: true }
  }

  componentDidMount() {
    console.log('did mount');
    // this._Mounted = true;
  }
  render() {
    const { fallback = <div>loading.</div>, children } = this.props;
    const { isLoading } = this.state;
    console.log('render', isLoading, fallback);
    return isLoading ? <div>hello</div> : children;
  }
}

export default Sus;