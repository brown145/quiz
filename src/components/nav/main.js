import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { linkShape } from '../../helpers/entityShapes';

class TopicList extends React.Component {
  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape(linkShape)).isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    const items = this.props.links.map(link => ({
      key: link.to,
      name: link.text,
      active: Boolean(link.isActive),
      onClick: () => {
        this.props.history.push(link.to);
      },
    }));
    return (
      <Menu items={items}/>
    );
  }
}

export default withRouter(TopicList);
