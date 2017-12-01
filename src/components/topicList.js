import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';

class TopicList extends React.Component {
  static propTypes = {
    topics: PropTypes.array,
    onTopicSelect: PropTypes.func,
  };

  onTopicSelect = (e, { value }) => {
    this.props.onTopicSelect(value);
    e.preventDefault();
  };

  render() {
    const topics = this.props.topics.map(topic => (
      <Card key={topic.topic} value={topic.topic} onClick={this.onTopicSelect}>
        <Card.Content>
          <Card.Header>{topic.topic}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Icon name="cubes" />
          {topic.cards.length} Cards
        </Card.Content>
      </Card>
    ));
    return <Card.Group>{topics}</Card.Group>;
  }
}

export default TopicList;
