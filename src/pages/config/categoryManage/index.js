import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/configs/actions/categories'
import CategoriesManage from './subComponents/Categories'

const mapStateToProps = state => {
  return {
    data: state.configs.categories.data,
    meta: state.configs.categories.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesManage)

