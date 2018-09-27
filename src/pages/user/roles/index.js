import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/userCenter/roles/actions/index'
import Roles from './subComponents/Roles'

const mapStateToProps = state => {
  return {
    roles: state.roles,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles)

