import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/translate/actions/translate'
import Articles from './subComponents/Articles'

const mapStateToProps = state => {
  return {
    data: state.translate.translateHope.data,
    meta: state.translate.translateHope.meta,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
