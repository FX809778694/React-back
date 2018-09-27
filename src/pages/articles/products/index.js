import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/articles/actions'
import Products from './subComponents/Products'

const mapStateToProps = state => {
  return {
    data: state.articles.products.data,
    meta: state.articles.products.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
