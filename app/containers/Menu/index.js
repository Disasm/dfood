/*
 *
 * Menu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import MenuTable from 'components/MenuTable';
import Calculator from 'components/Calculator';

import { makeSelectMenuItems, makeSelectMenuPick, makeSelectMenuSum } from './selectors';
import * as actions from './actions';
import messages from './messages';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  text-align: center;
  width: 100%;
  margin: auto;
  padding: 0.5em;
  font-size: 150%;
`;

const Main = styled.div`
  flex: 1;
  padding-bottom: 3em;
`;

const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3em;
  line-height: 3em;
  white-space: nowrap;
  padding-left: 1em;
  background: white;
  border: 1px solid black;
`;

export class Menu extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      items,
      selected,
      itemClick,
      sum,
    } = this.props;

    return (
      <Container>
        <Helmet
          title="Menu"
          meta={[
            { name: 'description', content: 'Description of Menu' },
          ]}
        />
        <Header>
          <FormattedMessage {...messages.header} />
        </Header>
        <Main>
          <MenuTable items={items} selected={selected} itemClick={itemClick} />
        </Main>
        <Footer>
          <Calculator sum={sum} />
        </Footer>
      </Container>
    );
  }
}

Menu.propTypes = {
  itemClick: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  sum: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectMenuItems(),
  selected: makeSelectMenuPick(),
  sum: makeSelectMenuSum(),
});

export default connect(mapStateToProps, actions)(Menu);
