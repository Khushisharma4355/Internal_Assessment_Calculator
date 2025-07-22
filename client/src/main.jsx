import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import{ ApolloClient,InMemoryCache,ApolloProvider} from "@apollo/client";
import './index.css'
import App from './App.jsx'
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Use your GraphQL server URL
  cache: new InMemoryCache(),
});
createRoot(document.getElementById('root')).render(
     <ApolloProvider client={client}>

    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ApolloProvider>
  
)
