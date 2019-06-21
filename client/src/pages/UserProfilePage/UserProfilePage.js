import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { userActions } from '../../redux';

import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';
import { bindActionCreators } from 'redux';

class UserProfilePage extends Component {
  componentDidMount() {
    const { match, userActions, userState } = this.props;
    const { _id } = userState.doc;
    const { id } = match.params;

    if (id !== _id) {
      userActions.findOne(id);
    }
  }

  render() {
    const { userState } = this.props;

    const {
      city,
      email,
      first_name,
      image,
      last_name,
      on_air_name,
      state,
      street,
      zip_code,
    } = userState.doc;

    return (
      <div className="user-profile">
        {userState.loading || isEmpty(userState.doc) ? null : (
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
                  </div>
                </CardBody>
              </Card>

              {/* Contact */}
              <Card>
                <CardBody>
                  <div className="user-profile__contact">
                    <h3>Contact</h3>
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
    );
  }
}

function mapStateToProps({ user }) {
  return {
    userState: user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators({ ...userActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfilePage);
