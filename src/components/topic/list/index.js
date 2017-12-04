import React from 'react';
import PropTypes from 'prop-types';
import { Card as SemanticCard } from 'semantic-ui-react';

import TopicCard from '../_topicCard';
import AddTopicForm from '../addEditTopicForm';
import ToggleableAddForm from '../../_common/toggleableAddForm';

class TopicList extends React.Component {
  static propTypes = {
    topics: PropTypes.array,
    onTopicCreate: PropTypes.func,
    onTopicDelete: PropTypes.func,
    onTopicSelect: PropTypes.func,
  };

  render() {
    const topics = this.props.topics.map(topic => (
      <TopicCard
        key={topic.topic}
        topic={topic}
        onSelect={this.props.onTopicSelect}
        onDelete={this.props.onTopicDelete}
      />
    ));
    return (
      <SemanticCard.Group>
        {topics}
        <ToggleableAddForm
          onSubmit={this.props.onTopicCreate}
          AddEditForm={AddTopicForm}
        />
      </SemanticCard.Group>
    );
  }
}

export default TopicList;
