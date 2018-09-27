import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/notices/actions/index'
import Notices from './subComponents/Notices'

const mapStateToProps = state => {
  return {
    notices: state.notices,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notices)
