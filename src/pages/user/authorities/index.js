import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/userCenter/authorities/actions/index'
import Authorities from './subComponents/Authorities'

const mapStateToProps = state => {
  return {
    authorities: state.authorities,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorities)

