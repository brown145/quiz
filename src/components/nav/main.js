import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import siteLogo from 'images/logo_35.png';
import { linkShape } from 'helpers/entityShapes';

class TopicList extends React.Component {
  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape(linkShape)).isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {}

  render() {
    const { activeItem } = this.state;
    const items = this.props.links.map(link => ({
      key: link.to,
      name: link.text,
      // TODO: this method of tracking active does not work for inital load
      active: activeItem === link.text,
      onClick: () => {
        this.setState({ activeItem: link.text });
        this.props.history.push(link.to);
      },
    }));
    const logo = (
      <Menu.Item key="logo" active={false}>
        <img src={siteLogo} alt="site logo" />
      </Menu.Item>
    );

    return (
      <Menu items={[logo, ...items]}/>
    );
  }
}

export default withRouter(TopicList);
