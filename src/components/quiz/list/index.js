import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import moment from 'moment';

import { quizResultShape } from 'helpers/entityShapes';

class CardList extends React.Component {
  static propTypes = {
    quizResults: PropTypes.arrayOf(PropTypes.shape(quizResultShape)).isRequired,
    onQuizSelect: PropTypes.func.isRequired,
  };

  state = {
    column: null,
    data: this.props.quizResults,
    direction: null,
  }

  componentWillReceiveProps = (nextProps, nextState) =>{
    if (nextProps.quizResults) {
      this.setState({
        data: nextProps.quizResults,
      });
    }
    this.handleSort();
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: [...data].sort((d1, d2) => d1[clickedColumn] < d2[clickedColumn]),
        direction: 'ascending',
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  }

  render() {
    const { column, data, direction } = this.state;
    const dateFormat = 'YYYY-MM-DD kk:mm:ss';

    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={column === 'id' ? direction : null} onClick={this.handleSort('id')}>
              Id
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'started' ? direction : null} onClick={this.handleSort('started')}>
              Started
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'ended' ? direction : null} onClick={this.handleSort('ended')}>
              Ended
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'deckId' ? direction : null} onClick={this.handleSort('deckId')}>
              DeckId
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'isComplete' ? direction : null} onClick={this.handleSort('isComplete')}>
              Completed
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'results.correctCardIds' ? direction : null} onClick={this.handleSort('results.correctCardIds')}>
              Correct
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'results.incorrectCardIds' ? direction : null} onClick={this.handleSort('results.incorrectCardIds')}>
              Incorrect
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(({id, started, ended, deckId, isComplete, results}) => {
            const formatedStarted = (started) ? moment(started).format(dateFormat) : '-';
            const formatedEnded = (ended) ? moment(ended).format(dateFormat) : '-';
            return (<Table.Row key={id}>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{formatedStarted}</Table.Cell>
              <Table.Cell>{formatedEnded}</Table.Cell>
              <Table.Cell>{deckId}</Table.Cell>
              <Table.Cell>{(isComplete) ? 'complete' : 'incomplete'}</Table.Cell>
              <Table.Cell>{results.correctCardIds.length}</Table.Cell>
              <Table.Cell>{results.incorrectCardIds.length}</Table.Cell>
            </Table.Row>);
          })}
        </Table.Body>
      </Table>
    );
  }
}

export default CardList;
