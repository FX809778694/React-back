import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/feedbackCenter/Feedback/actions/index'
import Feedback from './subComponents/Feedback'

const mapStateToProps = state => {
  return {
    feedbackData: state.feedbackData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback)
