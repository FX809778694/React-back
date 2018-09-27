import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/userCenter/user/actions/index'
import Users from './subComponents/Users'

const mapStateToProps = state => {
  return {
    users: state.users,
    sites: state.sites,
    roles: state.roles,
    roleForUser: state.roleForUser,
    groups: state.groups,
    groupForUser: state.groupForUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)

