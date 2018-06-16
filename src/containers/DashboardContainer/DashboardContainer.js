import React, { PureComponent } from 'react'; 
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Icon, Row, Col, Button, Input, Layout, DatePicker, Pagination } from 'antd';
import locale from 'antd/lib/date-picker/locale/en_US';
import { connectAuth, connectSubmission, submissionActionCreators } from 'core';
import { promisify } from '../../utilities';
import logo from 'assets/img/logo.png';
import DropdownSelect from '../../components/DropdownSelect/DropdownSelect';
import ListItem from '../../components/ListItem/ListItem';

const { Content, Header, Footer } = Layout;

class DashboardContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filterOptions: [
        { name: 'ALL' },
        { name: 'NO_SUBMISSION_YET' },
        { name: 'PENDING' },
        { name: 'APPROVED' },
        { name: 'ACTION_REQUESTED' },
        { name: 'BLOCKED' }
      ],
      submissionList: null
    }
  }

  componentDidMount() {
    this.loadSubmissionsPerPage(0, 16);
  }

  onChangePagination = (page, pageSize) => {
    this.loadSubmissionsPerPage((page - 1) * pageSize, pageSize);
  }

  loadSubmissionsPerPage(offset, count) {
    let { user } = this.props;
    promisify(this.props.getSubmissionList, { 
      token: user.token,
      offset: offset,
      count: count,
    })
      .then((res) => {
        if (res.status === 200)
          this.setState(...this.state, {submissionList: res.data});
      })
      .catch(e => console.log(e));
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
                <DropdownSelect defaultValue="ALL" options={this.state.filterOptions}/>
              </Col>
            </Row>
          </Header>
          <Layout>
            <Content className="main">
              <div className="dashboard_list">
                {
                  (this.state.submissionList && this.state.submissionList.result.length) ? (
                   this.state.submissionList.result.map((item, index) => (
                  <Row key={index}>
                    <Col span={22} offset={1} className="user_item">
                      <ListItem data={item} />
                    </Col>
                  </Row>))) : "No items to show..."
                }
              </div>
            </Content>
          </Layout>
          <Footer className="footer">
            <Pagination defaultCurrent={1} defaultPageSize={16} total={this.state.submissionList ? this.state.submissionList.total : 0} onChange={this.onChangePagination}/>
          </Footer>
        </Layout>
      </div>
    );
  }  
}

const mapStateToProps = ({auth, submission}) => ({
  user: auth.user,
  list: submission.list
});

const mapDisptachToProps = (dispatch) => {
  const {
    getSubmissionList
  } = submissionActionCreators

  return bindActionCreators({
    getSubmissionList
  }, dispatch);
}

export default compose(
  connectSubmission(mapStateToProps, mapDisptachToProps),
  connectAuth(mapStateToProps, undefined),
)(DashboardContainer);