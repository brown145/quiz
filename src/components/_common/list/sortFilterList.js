import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Grid, Input, Transition } from 'semantic-ui-react';

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
          sort: SORTED_ORDER.ASC,
        });
        break;
      case SORTED_ORDER.ASC:
        this.setState({
          sort: SORTED_ORDER.DEC,
        });
        break;
      default:
        this.setState({
          sort: SORTED_ORDER.DEFAULT,
        });
    }
  }

  onFilterChange = (e, {value}) => {
    this.setState({
      filter: value,
    });
  }

  clearFilter = (e) => {
    this.setState({
      filter: '',
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
      <Grid>
        <Grid.Row className="searchFilterRow">
          <Grid.Column textAlign="right">
            <Button size="mini" onClick={this.onSortClick}>Sort</Button>
            <Input
              size="mini"
              icon={{ name: 'x', circular: false, link: true, onClick: this.clearFilter }}
              placeholder="Filter..."
              value={this.state.filter}
              onChange={this.onFilterChange}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Transition.Group
              as={Card.Group}
              duration={700}
              {...this.props.listProps}
            >
              {items}
              {this.props.extra}
            </Transition.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default SortFilterList;
