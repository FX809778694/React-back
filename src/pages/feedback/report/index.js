import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/feedbackCenter/Report/actions/index'
import Report from './subComponents/Report'

const mapStateToProps = state => {
  return {
    reportData: state.reportData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
