import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/configs/actions/boost'
import Boost from './subComponents/BoostFunction'

const mapStateToProps = state => {
  return {
    data: state.configs.boost.data,
    meta: state.configs.boost.meta,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Boost)
