import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

class TableColumnSorter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAscendente: true
    }

    this.onClickSort = this.onClickSort.bind(this);
  }

  onClickSort() {
    this.props.sort(this.props.property, this.state.isAscendente);
    this.setState({isAscendente: !this.state.isAscendente});
  }

  render() {
    return (
      <FontAwesomeIcon className="clickable"
        icon={faSort}
        onClick={this.onClickSort} />
    );
  }
}

export default TableColumnSorter;
