import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { isEmpty } from 'lodash';

import { userAlertClose, userFindOne } from '../../redux/user';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';

class UserProfilePage extends Component {
  componentDidMount() {
    const { match, user, userFindOne } = this.props;
    const { _id } = user.doc;
    const { id } = match.params;

    if (id !== _id) {
      userFindOne(id);
    }
  }

  render() {
    const { props } = this;
    const { user, userAlertClose } = props;
    const { alert, doc, loading } = user;
    const { display } = alert;

    const {
      city,
      date_of_birth,
      email,
      first_name,
      image,
      last_name,
      on_air_name,
      phone,
      state,
      street,
      zip_code,
    } = doc;

    return (
      <>
        {display && (
          <Alert className="mb-3" alertClose={userAlertClose} {...alert} />
        )}
        <div className="user-profile">
          {loading || isEmpty(doc) ? null : (
            <>
              {/* Left Block */}
              <div className="user-profile__left">
                {/* Personal */}
                <Card>
                  <CardBody>
                    <div className="user-profile__personal">
                      <h3>Personal Info</h3>
                      <h5>Name</h5>
                      <p>
                        {first_name} {last_name}
                      </p>
                      <h5>Date of Birth</h5>
                      {date_of_birth && (
                        <p>{moment(date_of_birth).format('MMMM D, YYYY')}</p>
                      )}
                    </div>
                  </CardBody>
                </Card>

                {/* Contact */}
                <Card>
                  <CardBody>
                    <div className="user-profile__contact">
                      <h3>Contact</h3>
                      <h5>Phone</h5>
                      {phone && <p>{phone}</p>}
                      <h5>Email</h5>
                      {email && <p>{email}</p>}
                    </div>
                  </CardBody>
                </Card>

                {/* Location */}
                <Card>
                  <CardBody>
                    <div className="user-profile__location">
                      <h3>Location</h3>
                      {street && (
                        <p>
                          {street} {city}, {state} {zip_code}}
                        </p>
                      )}
                    </div>
                  </CardBody>
                </Card>

                {/* Station */}
                <Card>
                  <CardBody>
                    <div className="user-profile__station">
                      <h3>Station</h3>
                      <h5>On Air Name</h5>
                      {on_air_name && <p>{on_air_name}</p>}
                    </div>
                  </CardBody>
                </Card>
              </div>

              {/* Right Block */}
              <div className="user-profile__right">
                <Card>
                  <CardBody>
                    {/* Image */}
                    <div className="user-profile__image mb-3">
                      <div className="user-profile__image-circle">
                        {image ? (
                          <img
                            className="user-profile__image-pic"
                            src={image}
                            alt="profile pic"
                          />
                        ) : (
                          <i className="fas fa-user user-profile__image-stock" />
                        )}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="user-profile__buttons">
                      <Button color="info">Edit</Button>
                      <Button color="danger">Delete</Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(
  mapStateToProps,
  { userAlertClose, userFindOne },
)(UserProfilePage);
