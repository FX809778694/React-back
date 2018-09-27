import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/dispatchCenter/actions/index'
import DispatchCenter from './subComponents/DispatchCenter'

const mapStateToProps = state => {
  return {
    dispatchData: state.dispatchData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DispatchCenter)
