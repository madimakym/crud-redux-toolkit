import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ContactList from './pages/contact-page/contact-list';
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import ContactCreate from "./pages/contact-page/contact-create";


function App() {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Switch>
          <Route path='/contact-create' component={ContactCreate} />
          <Route path='/' component={ContactList} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
