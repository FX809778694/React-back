import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/configs/actions/seeds'
import Seeds from './subComponents/Seeds'

const mapStateToProps = state => {
  return {
    data: state.configs.seeds.data,
    meta: state.configs.seeds.meta,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Seeds)
