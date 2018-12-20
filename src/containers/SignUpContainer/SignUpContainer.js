import React, { PureComponent } from 'react'; 
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Icon, Row, Col, Button, Input, Layout } from 'antd';
import { connectAuth, authActionCreators } from 'core';
import { promisify } from '../../utilities';
import { validateEmail } from '../../services/common';
import logo from 'assets/img/logo.png';

const { Content, Header } = Layout;

class SignUpContainer extends PureComponent {
  static propTypes = {
    login: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isFocus: false,
      msg: ''
    }
  }

  componentDidMount() {
  }

  handleEmail = () => {
    this.setState(...this.state, {isFocus: true});
  }

  updateEmailValue = (evt) => {
    this.setState(...this.state,{
      email: evt.target.value
    }, () => {
      if(validateEmail(this.state.email)) {
        this.setState(...this.state, {isEmailValidate: true});  
      } else {
        this.setState(...this.state, {isEmailValidate: false});  
      }
    });
  }

  updatePasswordValue = (evt) => {
    this.setState(...this.state, {password: evt.target.value})
  }

  showAdminDashboard = () => {
    if (this.state.email.length !== 0 && validateEmail(this.state.email)) {
      this.setState(...this.state, {isEmailValidate: true});
      promisify(this.props.signUp, { 
        email: this.state.email,
        password: this.state.password
      })
        .then((res) => {
          if (res.status === 200) this.props.history.push('signin');
          else {
            this.setState(...this.state, { msg: res.msg || 'Error occurred!' });
          }
        })
        .catch(e => {
          this.setState(...this.state, { msg: e.msg || 'Error occurred!' });
        });
    } else {
      this.setState(...this.state, {isEmailValidate: false});
    }
  }

  back = () => {
    this.props.history.push('signin');
  }

  render () {
    return (
      <div className="block">
        <Layout>
          <Header className="header">
            <div onClick={this.back}>
              <Icon style={{ fontSize: 16 }} type="arrow-left" /> <span>BACK</span>
            </div>
          </Header>
          <Layout>
            <Content className="main">
              <Row className="sign_logo_area">
                <Col span={14} offset={5}>
                  <img alt="true" src={logo} className="logo"/>
                </Col>
              </Row>
              {/* <Row className="sign_logo_area">
                <Col span={12} className="title_area">
                  <Row className="row_title"><Col><span  className="logo_title">NO REST</span></Col></Row>
                  <Row className="row_title"><Col><span className="logo_title">LABS</span></Col></Row>
                </Col>
              </Row> */}
              <Row className="email_area">
                <Col offset={4} span={16}>
                  { this.state.isFocus ?
                  <span className="label_name">{ this.state.isEmailValidate ? 'Email Address' : 'Invalid Email'}</span>
                  : null
                  }
                  <Input type="email" value={this.state.email} placeholder="Email Address" onClick={this.handleEmail} onChange={this.updateEmailValue} />
                </Col>
              </Row>
              <Row className="password_area">
                <Col offset={4} span={16}>
                  <Input type="password" value={this.state.password} placeholder="Password" onChange={this.updatePasswordValue} />
                </Col>
              </Row>
              <Row className="msg_area">
                <Col offset={5} span={16}>
                { this.state.msg || '' }
                </Col>
              </Row>
              <Row>
                <Col offset={4} span={16}>
                  <Button className="continue_btn signup_btn" onClick={this.showAdminDashboard}>Sign Up</Button>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }  
}

const mapDisptachToProps = (dispatch) => {
  const {
    signUp
  } = authActionCreators;

  return bindActionCreators({
    signUp
  }, dispatch);
}

export default connectAuth(undefined, mapDisptachToProps)(SignUpContainer);