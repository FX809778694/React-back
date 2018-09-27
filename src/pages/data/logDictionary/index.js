import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/data/actions/logDictionary'
import LogDictionary from './subComponents/LogDictionary'

const mapStateToProps = state => {
  return {
    data: state.dataCenter.logDictionary.data,
    meta: state.dataCenter.logDictionary.meta,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogDictionary)
