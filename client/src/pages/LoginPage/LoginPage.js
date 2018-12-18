import React, { Component } from 'react';
import logo from '../../images/kgnu_logo.png';

import Card from '../../components/Card';
import CardBody from '../../components/CardBody';
import CardImg from '../../components/CardImg';
import CardTitle from '../../components/CardTitle';
import LoginForm from '../../components/LoginForm';

class LoginPage extends Component {
  state = {};

  render() {
    return (
      <main className="home">
        <section className="home__body">
          <Card>
            <CardImg className={'card__img--home'} imgSrc={logo} />
            <CardBody>
              <CardTitle
                text="COMRAD - KGNU PLAYLIST LOGIN:"
                className="text-center"
              />
              <LoginForm {...this.props} />
            </CardBody>
          </Card>
        </section>
      </main>
    );
  }
}

export default LoginPage;
