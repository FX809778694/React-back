import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/configs/actions/proDupRemoval'
import ProDupRemoval from './subComponents/ProDupRemoval'

const mapStateToProps = state => {
  return {
    data: state.configs.proDupRemoval.data,
    meta: state.configs.proDupRemoval.meta,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProDupRemoval)
