import React, { PureComponent } from 'react';
import { Icon, Row, Col, Button, Layout } from 'antd';
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
      ]
    }
  }

  showDetailItem = () => {
    this.setState(...this.state, {isExpand: !this.state.isExpand});
  }

  render() {
    const { data } = this.props;
    console.log(data);
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
                <span className="item_update">{data.updated_at}</span>
              </Col>
              <Col span={6}>
                <DropdownSelect placeholder="Status" defaultValue="PENDING" className="item_status" options={this.state.statusOptions}/>
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
                  <div className="item_id_photo">
                    <span>ID photo here </span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="item_selfie_photo">
                    <span>Selfie photo here </span>
                  </div>
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
                  <span>{data.country + ' ' + data.docType}</span>
                </Col>
                <Col span={4}>
                  <span>ID:{data.docId}</span>
                </Col>
                <Col span={5}>
                  <span>Expires {data.expire_at}</span>
                </Col>
              </Row>
              <Row className="item_detail_area">
                <Col span={5}>
                  <span>{data.email}</span>
                </Col>
                <Col span={4}>
                  <span>Born {data.birthday}</span>
                </Col>
                <Col span={6}>
                  <p>{data.address}</p>
                </Col>
                <Col span={4}>
                  <span>{data.country}</span>
                </Col>
              </Row>
              <Row className="item_detail_area">
                <Col span={5}>
                  <span className="admin_info">Admin: {data.admin_email}</span>
                </Col>
              </Row>
              <Row className="item_detail_area submit_area">
                <Col span={6} offset={13} className="item_review_msg_btn">
                  <Button className="continue_btn">ADD REVIEW MESSAGE HERE</Button>
                </Col>
                <Col span={5} className="item_review_submit_btn">
                  <Button className="continue_btn">SUBMIT</Button>
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

export default ListItem;
