import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/connections/actions/index'
import Connections from './subComponents/Connections'

const mapStateToProps = state => {
  return {
    connections: state.connections,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Connections)
