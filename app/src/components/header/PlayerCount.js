import gql from 'graphql-tag';
import * as React from 'react';
import {graphql} from 'react-apollo';
import styled from 'styled-components';

const PLAYERS_SUBSCRIPTION = gql`
    subscription {
        Player {
            id
            lastSeen
        }
    }
`;

const TextSpan = styled.span`
  color: white;
`;

const countActivePlayers = playerList => {
  return playerList.filter(player => player.lastSeen > new Date(new Date()-(1000 * 60 * 5)).toISOString()).length;
};

const UserName = props => {
  if (!props.data || !props.data.Player || props.data.Player.length < 2) {
    return null;
  }
  return (
    <TextSpan><b>{countActivePlayers(props.data.Player)}</b> live players</TextSpan>
  )
};

const withPlayers = graphql(PLAYERS_SUBSCRIPTION);

export default withPlayers(UserName);
