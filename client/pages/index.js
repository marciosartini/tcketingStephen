

const LandingPage =  ({currentUser}) => {
      return currentUser? <h1>You are logged</h1> : <h1>Don't logged</h1>
  };

  LandingPage.getInitialProps = async context => {
  
    return {};
  };
  
  export default LandingPage;
  
  