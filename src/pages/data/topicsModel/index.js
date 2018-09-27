import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/data/actions/topicModal'
import topicsModel from './subComponents/TopicsModel'

const mapStateToProps = state => {
  return {
    data: state.dataCenter.topicsModel.data,
    meta: state.dataCenter.topicsModel.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(topicsModel)
