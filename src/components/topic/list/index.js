import React from 'react';
import PropTypes from 'prop-types';

import { topicShape } from '../../../helpers/entityShapes';
import AddForm from '../addEditTopicForm';
import SortFilterList from '../../_common/list/sortFilterList';
import ToggleableAddForm from '../../_common/toggleableAddForm';
import TopicCard from '../_topicCard';

class TopicList extends React.Component {
  static propTypes = {
    topics: PropTypes.arrayOf(PropTypes.shape(topicShape)).isRequired,
    onTopicCreate: PropTypes.func.isRequired,
    onTopicDelete: PropTypes.func.isRequired,
    onTopicSelect: PropTypes.func.isRequired,
  };

  topicItemMapper = topic => (
    <TopicCard
      key={topic.id}
      topic={topic}
      onSelect={this.props.onTopicSelect}
      onDelete={this.props.onTopicDelete}
    />
  );

  addElement = (
    <ToggleableAddForm
      onSubmit={this.props.onTopicCreate}
      AddEditForm={AddForm}
    />
  );

  render() {
    return (
      <SortFilterList
        listItemMapper={this.topicItemMapper}
        sortedBy={'id'}
        filteredBy={'id'}
        items={this.props.topics}
        extra={this.addElement}
      />
    );
  }
}

export default TopicList;
