import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/data/actions/outline'
import Outline from './subComponents/Outline'

const mapStateToProps = state => {
  return {
    data: state.dataCenter.outline.data,
    meta: state.dataCenter.outline.meta,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Outline)
