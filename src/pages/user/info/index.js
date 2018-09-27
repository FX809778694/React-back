import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/extendInfomation/actions/index'
import ExtendInfomation from './subComponents/ExtendInfomation'

const mapStateToProps = state => {
  return {
    extendInfomationData: state.extendInfomationData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtendInfomation)
