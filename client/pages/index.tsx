import { withApollo } from "../lib/apollo/withApollo";
const Home = () => {
  return <div></div>;
};

export default withApollo({ ssr: true })(Home);
