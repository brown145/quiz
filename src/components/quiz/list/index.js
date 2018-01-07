import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'semantic-ui-react';

// TODO: 
// import { cardShape } from 'helpers/entityShapes';

class CardList extends React.Component {
  static propTypes = {
    quizResults: PropTypes.arrayOf(PropTypes.object).isRequired,
    onQuizSelect: PropTypes.func.isRequired,
  };

  render() {
    // TODO: see sortable example on https://react.semantic-ui.com/collections/table#table-example-sortable
    return (
      <Table
        sortable={true}
        headerRow={['id','deck id','isComplete','correct','incorrect']}
        renderBodyRow={(data) => (
          <Table.Row key={data.id}>
            <Table.Cell>{data.id}</Table.Cell>
            <Table.Cell>{data.deckId}</Table.Cell>
            <Table.Cell>{(data.isComplete) ? 'complete' : 'incomplete'}</Table.Cell>
            <Table.Cell>{data.results.correctCardIds.length}</Table.Cell>
            <Table.Cell>{data.results.incorrectCardIds.length}</Table.Cell>
          </Table.Row>
        )}
        tableData={this.props.quizResults}
      />
    );
  }
}

export default CardList;
