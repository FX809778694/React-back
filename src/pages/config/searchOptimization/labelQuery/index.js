import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/configs/actions/labelQuery'
import LabelQuery from './subComponents/LabelQuery'

const mapStateToProps = state => {
  return {
    data: state.configs.labelQuery.data,
    meta: state.configs.labelQuery.meta,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelQuery)
