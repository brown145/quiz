import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Grid, Header } from 'semantic-ui-react';

import CardRibon from './cardRibon';
import { cardShape } from 'helpers/entityShapes';

const ShortCard = props => {
  const onSelect = (e) => {
    props.onSelect(props.card.id);
    e.stopPropagation();
  };

  const onRemove = (e) => {
    props.onRemove(props.card.id);
    e.stopPropagation();
  };

  return (
    <Card onClick={onSelect}>
      <Card.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column floated="left" width={6}>
              <Header>{props.card.question}</Header>
            </Grid.Column>
            <Grid.Column width={4}>
              <CardRibon topics={props.card.topics} onSelect={props.onTopicSelect} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column floated="right" width={6}>
              <Button
                basic compact
                floated="right"
                size="tiny"
                onClick={onRemove}
              >
                Remove
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
};
ShortCard.propTypes = {
  card: PropTypes.shape(cardShape).isRequired,
  onSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onTopicSelect: PropTypes.func.isRequired,
};

export default ShortCard;
