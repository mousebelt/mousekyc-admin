import React, { PureComponent } from 'react'; 
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Icon, Row, Col, Input, Layout, Pagination } from 'antd';
import { connectAuth, connectSubmission, submissionActionCreators } from 'core';
import { promisify } from '../../utilities';
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
      submissionList: null,
      filterOption: 'ALL',
      searchKeyword: '',
      selectedIndex: -1,
      page: 1,
      pageSize: 16
    }
  }

  componentDidMount() {
    this.loadSubmissionsPerPage(0, 16, this.state.filterOption,null);
  }

  onChangePagination = (page, pageSize) => {
    this.setState(...this.state, {page: page, pageSize: pageSize}, () => {
      this.loadSubmissionsPerPage((page - 1) * pageSize, pageSize, this.state.filterOption, this.state.searchKeyword ? this.state.searchKeyword : null);
    });
  }

  loadSubmissionsPerPage(offset, count, approvalStatus, searchKeyword) {
    let { user } = this.props;
    this.setState(...this.state, {submissionList: null}, () => {
      promisify(this.props.getSubmissionList, { 
        token: user.token,
        offset: offset,
        count: count,
        approvalStatus: approvalStatus !== 'ALL' ? approvalStatus : null,
        useremail: searchKeyword
      })
        .then((res) => {
          if (res.status === 200)
            this.setState(...this.state, {submissionList: res.data});
        })
        .catch(e => console.log(e));
    });
  }

  onSelectItem = (filterOption) => {
    this.setState(...this.state, {filterOption: filterOption,submissionList: null}, () => {
      this.loadSubmissionsPerPage(0, 16, filterOption, null);
    });
  }

  onSelectList = (selectedIndex) => {
    this.setState({selectedIndex: selectedIndex});
  }

  handleSearchChange = (e) => {
    this.setState({ searchKeyword: e.target.value });
  }

  searchEmail = (e) => {
    if(e.keyCode == 13) {
      let searchKeyword = e.target.value;
      this.loadSubmissionsPerPage(0, 16, this.state.filterOption, searchKeyword);
    }
  }

  render () {
    return (
      <div className="block dashboard">
        <Layout>
          <Header className="header">
            <Row>
              <Col span={6} offset={1}>
                <Input className="search_input" placeholder="Search Email" onKeyDown={this.searchEmail} onChange={this.handleSearchChange} suffix={<Icon style={{ fontSize: 16 }} type="search" /> }/> 
              </Col>
              <Col span={5} offset={12}>
                <DropdownSelect defaultValue={this.state.filterOption} onSelectItem={this.onSelectItem} options={this.state.filterOptions}/>
              </Col>
            </Row>
          </Header>
              <Layout>
            <Content className="main">
              <div className="dashboard_list">
                {
                  (this.state.submissionList && this.state.submissionList.result.length) ? (
                   this.state.submissionList.result.map((item, index) => (
                  <Row key={(this.state.page - 1) * this.state.pageSize + index}>
                    <Col span={22} offset={1} className="user_item">
                      <ListItem data={item} itemIndex={(this.state.page - 1) * this.state.pageSize + index} selectedIndex={this.state.selectedIndex} onSelectList={this.onSelectList}/>
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