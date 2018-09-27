import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/configs/actions/channels'
import Channels from './subComponents/Channels'

const mapStateToProps = state => {
  return {
    data: state.configs.channels.data,
    meta: state.configs.channels.meta,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channels)

