import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/configs/actions/dictionaries'
import Dictionary from './subComponents/Dictionary'

const mapStateToProps = state => {
  return {
    data: state.configs.dictionaries.data,
    meta: state.configs.dictionaries.meta,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dictionary)

