import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/configs/actions/topics'
import ManualTagging from './subComponents/Topics'

const mapStateToProps = state => {
  return {
    data: state.configs.topics.data,
    meta: state.configs.topics.meta,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManualTagging)
