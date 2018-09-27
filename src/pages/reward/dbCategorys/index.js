import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/dbCategory/actions/index'
import DbCategories from './subComponents/DbCategories'

const mapStateToProps = state => {
  return {
    dbCategories: state.dbCategories,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DbCategories)
