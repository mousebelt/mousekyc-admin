import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Icon, Row, Col, Button, Input, Layout } from 'antd';
import { connectAuth, connectSubmission, submissionActionCreators } from 'core';
import { promisify } from '../../utilities';

import DropdownSelect from '../DropdownSelect/DropdownSelect';

const { Content, Header } = Layout;

class ListItem extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isExpand: false,
      statusOptions: [
        { name: 'NO_SUBMISSION_YET' },
        { name: 'PENDING' },
        { name: 'APPROVED' },
        { name: 'ACTION_REQUESTED' },
        { name: 'BLOCKED' }
      ],
      documents: null,
      reviewMsg: '',
      currentStatus: null
    }
  }

  componentWillMount() {
    const { data } = this.props;
    this.setState(...this.state, {currentStatus: data.approvalStatus});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedIndex !== nextProps.selectedIndex) {
      if (this.props.itemIndex === nextProps.selectedIndex) {
        this.setState(...this.state, {isExpand: !this.state.isExpand}, () => {
          if (this.state.isExpand) {
            const { user, data } = this.props;
            promisify(this.props.getUserDocument, { 
              token: user.token,
              useremail: data.email
            })
              .then((res) => {
                if (res.status === 200) {
                  this.setState(...this.state, {documents: res.data});
                }
              })
              .catch(e => console.log(e));
          }
        });
      } else {
        this.setState({isExpand: false});
      }
    }
  }

  showDetailItem = () => {
    const { itemIndex } = this.props;
    this.props.onSelectList(itemIndex);
    this.setState(...this.state, {isExpand: !this.state.isExpand});
  }

  changeUserStatus = () => {
    const { user, data } = this.props;
      promisify(this.props.updateUserStatus, { 
        token: user.token,
        useremail: data.email,
        approvalStatus: this.state.currentStatus,
        approvalDescription: this.state.reviewMsg ? this.state.reviewMsg : ''
      })
        .then((res) => {
          if (res.status === 200) {
            this.setState({isExpand: false});
          }
        })
        .catch(e => console.log(e));
  }

  onSelectItem = (filterOption) => {
    this.setState(...this.state, {currentStatus: filterOption});
  }

  onChangeReview = (evt) => {
    this.setState(...this.state, {reviewMsg: evt.target.value})
  }

  getTimeDiff(diff) {
      let divideBy = { 
                       y: 31104000000,
                       m: 2592000000,
                       w:604800000,
                       d:86400000, 
                       h:3600000, 
                       n:60000, 
                       s:1000 
                     };	
      let y = Math.floor( diff/divideBy['y']);
      let m = Math.floor( diff/divideBy['m']);
      let w = Math.floor( diff/divideBy['w']);
      let d = Math.floor( diff/divideBy['d']);
      let h = Math.floor( diff/divideBy['h']);
      let n = Math.floor( diff/divideBy['n']);
      let s = Math.floor( diff/divideBy['s']);
      
      if (y) {
        return y + ' years';
      } else if(m) {
        return m + ' months';
      } else if(w) {
        return m + ' weeks';
      } else if(d) {
        return d + ' days';
      } else if (h) {
        return h + ' hours';
      } else if(n) {
        return n + ' minutes';
      } else if(s) {
        return s + ' seconds';
      }
  }

  render() {
    const { data } = this.props;
    
    if (!data) return null;
    let diff_time = this.getTimeDiff(data.time_diff);
    
    return (
      <div>
        <Layout className="item">
          <Header className="item_header">
            <Row>
              <Col span={2}>
                <div className="item_status_icon">
                  <Icon style={{ fontSize: 20 }} type="hourglass" /> 
                </div>
              </Col>
              <Col span={4}>
                <span className="item_name">{data.firstname + ' ' + data.lastname}</span>
              </Col>
              <Col span={4}>
                <span className="item_email">{data.email}</span>
              </Col>
              <Col span={4}>
                <span className="item_update">Changed: {diff_time} ago</span>
              </Col>
              <Col span={6}>
                <DropdownSelect placeholder="Status" onSelectItem={this.onSelectItem} defaultValue={this.state.currentStatus} className="item_status" options={this.state.statusOptions}/>
              </Col>
              <Col span={4}>
                <Button className="continue_btn item_check" onClick={this.showDetailItem}>Check</Button>
              </Col>
            </Row>
          </Header>
          { this.state.isExpand ?
          <Layout>
            <Content className="main">
              <Row className="item_photo_area">
                <Col span={12}> 
                  { this.state.documents ? 
                    <img className="item_id_photo" src={this.state.documents[0] ? this.state.documents[0].identityDocument : null}/> :
                    <div className="item_id_photo_area">
                      <span>ID photo here </span>
                    </div>
                  }
                </Col>
                <Col span={12}>
                  { this.state.documents ? 
                    <img className="item_selfie_photo" src={this.state.documents[1] ? this.state.documents[1].selfie : null}/> :
                    <div className="item_selfie_photo_area">
                      <span>Selfie photo here </span>
                    </div>
                  }
                </Col>
              </Row>
              <Row className="item_detail_area">
                <Col span={5}>
                  <span>{data.firstname}</span>
                </Col>
                <Col span={4}>
                  <span>{data.lastname}</span>
                </Col>
                <Col span={6}>
                  <span>{data.nationalityCountry + ' ' + data.documentType}</span>
                </Col>
                <Col span={4}>
                  <span>ID:{data.documentId}</span>
                </Col>
                <Col span={5}>
                  <span>Expires {data.documentExpireDate}</span>
                </Col>
              </Row>
              <Row className="item_detail_area">
                <Col span={5}>
                  <span>{data.email}</span>
                </Col>
                <Col span={4}>
                  <span>Born {data.dob}</span>
                </Col>
                <Col span={6}>
                  <p>2633 Fake street, Sanfranciso, CA</p>
                </Col>
                <Col span={4}>
                  <span>{data.residenceCountry}</span>
                </Col>
              </Row>
              <Row className="item_detail_area">
                <Col span={5}>
                  <span className="admin_info">{data.adminContact ? 'Admin: ' + data.adminContact : ''}</span>
                </Col>
              </Row>
              <Row className="item_detail_area submit_area">
                <Col span={6} offset={13} className="item_review_msg_btn">
                  <Input className="review_msg" value={this.state.reviewMsg} disabled={this.state.currentStatus !== 'ACTION_REQUESTED' ? true: false} placeholder="ADD REVIEW MESSAGE HERE" onChange={this.onChangeReview} />
                </Col>
                <Col span={5} className="item_review_submit_btn">
                  <Button className="continue_btn" onClick={this.changeUserStatus}>SUBMIT</Button>
                </Col>
              </Row>
            </Content>
          </Layout>:
          null
          }
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = ({auth, submission}) => ({
  user: auth.user
});

const mapDisptachToProps = (dispatch) => {
  const {
    getUserDocument,
    updateUserStatus
  } = submissionActionCreators

  return bindActionCreators({
    getUserDocument,
    updateUserStatus
  }, dispatch);
}

export default compose(
  connectSubmission(mapStateToProps, mapDisptachToProps),
  connectAuth(mapStateToProps, undefined),
)(ListItem);