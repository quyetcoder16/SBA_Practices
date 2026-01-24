import React from 'react'

const withLoading = (WrappedComponent) => {
  return ({isLoading, ...props})=> { // spread / rest operator
    if(isLoading) return <p>Loading...</p>

    return WrappedComponent(props);
  }
}

export default withLoading;