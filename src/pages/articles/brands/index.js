import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/articles/actions'
import Brands from './subComponents/Brands'

const mapStateToProps = state => {
  return {
    data: state.articles.brands.data,
    meta: state.articles.brands.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Brands)
