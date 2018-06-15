import React, { PureComponent } from 'react'; 
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Icon, Row, Col, Button, Input, Layout, DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/en_US';
import { connectAuth, authActionCreators } from 'core';
import { promisify } from '../../utilities';
import logo from 'assets/img/logo.png';

const { Content, Header } = Layout;

class DashboardContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      birthday:'',
      document_expire:'',
      nationality: '',
      document_id:'',
      isFilled: false
    }
  }

  onChangeData = (type, evt) => {
    switch(type) {
      case 'firstname':
        this.setState(...this.state, {first_name: evt.target.value});
        break;
      case 'lastname':
        this.setState(...this.state, {last_name: evt.target.value});
        break;
      case 'nationality':
        this.setState(...this.state, {nationality: evt.target.value});
        break;
      case 'documentid':
        this.setState(...this.state, {document_id: evt.target.value});
        break;
    }
  }

  setBirthday = (date, dateString) => {
    this.setState(...this.state, {birthday: dateString});
  }
  
  setDocExpireDate = (date, dateString) => {
    this.setState(...this.state, {document_expire: dateString});
  }

  showUploadPage = () => {
    this.props.history.push('/upload');
  }

  checkInputStatus = () => {
    if(this.state.first_name !== '' && this.state.last_name !== '' && this.state.nationality !== '' && this.state.document_id !== ''
      && this.state.birthday !== '' && this.state.document_expire !== '') {
      this.setState(...this.state, {isFilled: true});
    } else {
      this.setState(...this.state, {isFilled: false});
    }
  }

  showSelfiePage = () => {
    promisify(this.props.updateUser, {
      token: this.props.user.token,
      firstname: this.state.first_name,
      lastname: this.state.last_name,
      dob: this.state.birthday,
      documentExpireDate: this.state.document_expire,
      nationalityCountry: this.state.nationality,
      documentId: this.state.document_id
    })
      .then((user) => {
        console.log(user);
        this.props.history.push('/upload/selfie');
      })
      .catch(e => console.log(e));
  }

  render () {
    return (
      <div className="block display_match">
        <Layout>
          <Header className="header"></Header>
          <Layout>
            <Content className="main">
              <Row className="sign_logo_area">
                <Col className="mark" span={5} offset={5}>
                  <img alt="true" src={logo} className="logo"/>
                </Col>
                <Col span={12} className="title_area">
                  <Row className="row_title"><Col><span  className="logo_title">NO REST</span></Col></Row>
                  <Row className="row_title"><Col><span className="logo_title">LABS</span></Col></Row>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }  
}

const mapStateToProps = ({auth}) => ({
  user: auth.user
});

const mapDisptachToProps = (dispatch) => {
  const {
    updateUser
  } = authActionCreators

  return bindActionCreators({
    updateUser
  }, dispatch);
}

export default compose(
  connectAuth(mapStateToProps, mapDisptachToProps),
)(DashboardContainer);