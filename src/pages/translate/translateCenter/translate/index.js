import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/translate/actions/translate'
import Translate from './subComponents/Translate'

const mapStateToProps = state => {
  return {
    data: state.translate.translateAudit.data,
    meta: state.translate.translateAudit.meta,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Translate)
