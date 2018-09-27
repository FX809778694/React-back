import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/feedbackCenter/Message/actions/index'
import Message from './subComponents/Message'

const mapStateToProps = state => {
  return {
    messageData: state.messageData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)
