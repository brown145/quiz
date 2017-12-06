import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Input } from 'semantic-ui-react';

const SORTED_ORDER = {
  DEFAULT: 'Default',
  ASC: 'Ascending',
  DEC: 'Decending',
};

class SortFilterList extends React.Component {
  static propTypes = {
    extra: PropTypes.object,
    filteredBy: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    listItemMapper: PropTypes.func.isRequired,
    listProps: PropTypes.object,
    sortedBy: PropTypes.string.isRequired,
  }

  state = {
    sort: SORTED_ORDER.DEFAULT,
    filter: '',
  }

  onSortClick = (e) => {
    switch (this.state.sort) {
      case SORTED_ORDER.DEFAULT:
        this.setState({
          sortedBy: SORTED_ORDER.ASC,
        });
        break;
      case SORTED_ORDER.ASC:
        this.setState({
          sortedBy: SORTED_ORDER.DEC,
        });
        break;
      default:
        this.setState({
          sortedBy: SORTED_ORDER.DEFAULT,
        });
    }
  }

  onFilterChange = (e, {value}) => {
    this.setState({
      filteredBy: value,
    });
  }

  getListItems = () => {
    const {items, filteredBy, sortedBy} = this.props;
    if (!items){
      return [];
    }

    return items
      .filter(item => {
        if (item[filteredBy] && this.state.filter) {
          return item[filteredBy].toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0;
        }
        return true;
      })
      .sort((itemA, itemB) => {
        if (this.state.sort === SORTED_ORDER.ASC){
          return itemA[sortedBy] > itemB[sortedBy];
        } else if (this.state.sort === SORTED_ORDER.DEC){
          return itemA[sortedBy] < itemB[sortedBy];
        }
        return 0;
      })
      .map(this.props.listItemMapper);
  }

  render() {
    const items = this.getListItems();
    return (
      <Container>
        <Container>
          <Button onClick={this.onSortClick}>Sort</Button>
          <Input
            icon={{ name: 'x', circular: false, link: true }}
            placeholder="Filter..."
            onChange={this.onFilterChange}
          />
        </Container>
        <Card.Group
          {...this.props.listProps}
        >
          {items}
          {this.props.extra}
        </Card.Group>
      </Container>
    );
  }
}

export default SortFilterList;
