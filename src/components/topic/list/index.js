import React from 'react';
import PropTypes from 'prop-types';
import { Card as SemanticCard } from 'semantic-ui-react';

import TopicCard from '../_topicCard';
import AddTopicForm from '../addEditTopicForm';
import ToggleableAddForm from '../../_common/toggleableAddForm';
import { topicShape } from '../../../helpers/entityShapes';

class TopicList extends React.Component {
  static propTypes = {
    topics: PropTypes.arrayOf(PropTypes.shape(topicShape)).isRequired,
    onTopicCreate: PropTypes.func.isRequired,
    onTopicDelete: PropTypes.func.isRequired,
    onTopicSelect: PropTypes.func.isRequired,
  };

  render() {
    const topics = this.props.topics.map(topic => (
      <TopicCard
        key={topic.id}
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
