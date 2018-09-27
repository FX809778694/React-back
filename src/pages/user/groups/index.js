import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/userCenter/groups/actions/index'
import Groups from './subComponents/Groups'

const mapStateToProps = state => {
  return {
    groups: state.groups,
    sites: state.sites,
    roles: state.roles,
    roleForGroup: state.roleForGroup,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups)

