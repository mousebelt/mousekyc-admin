import React, { PureComponent } from 'react'; 
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Icon, Row, Col, Button, Input, Layout, DatePicker, Pagination } from 'antd';
import locale from 'antd/lib/date-picker/locale/en_US';
import { connectAuth, authActionCreators } from 'core';
import { promisify } from '../../utilities';
import logo from 'assets/img/logo.png';
import DropdownSelect from '../../components/DropdownSelect/DropdownSelect';
import ListItem from '../../components/ListItem/ListItem';

const { Content, Header, Footer } = Layout;

class DashboardContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        firstname: 'Galen',
        lastname: 'Danziger', 
        email: 'galen@norestlab.com',
        birthday: '09-21-1991',
        address: '2633 Fake Street, Sanfranciso, CA',
        updated_at: 'Changed 8h ago',
        country: 'USA',
        docType: 'passport',
        docId: '12345678',
        expire_at: '2014-02-14',
        admin_email: 'admin@gmail.com'
      },
      filterOptions: [
        { name: 'ALL' },
        { name: 'NO_SUBMISSION_YET' },
        { name: 'PENDING' },
        { name: 'APPROVED' },
        { name: 'ACTION_REQUESTED' },
        { name: 'BLOCKED' }
      ]
    }
  }

  render () {
    return (
      <div className="block dashboard">
        <Layout>
          <Header className="header">
            <Row>
              <Col span={6} offset={1}>
                <Input className="search_input" placeholder="Search Email" suffix={<Icon style={{ fontSize: 16 }} type="search" /> }/> 
              </Col>
              <Col span={5} offset={12}>
                <DropdownSelect placeholder="All" defaultValue="ALL" options={this.state.filterOptions}/>
              </Col>
            </Row>
          </Header>
          <Layout>
            <Content className="main">
              <div className="dashboard_list">
                <Row>
                  <Col span={22} offset={1} className="user_item">
                    <ListItem data={this.state.item} />
                  </Col>
                  <Col span={22} offset={1} className="user_item">
                    <ListItem data={this.state.item} />
                  </Col>
                </Row>
              </div>
            </Content>
          </Layout>
          <Footer className="footer">
            <Pagination defaultCurrent={1} total={100} />
          </Footer>
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