import React from 'react';

import { Container } from '@material-ui/core';
import Navbar from '../../Navigation/NavbarDevTeam';
import Member from '../../Form/memberList';
import AddMember from '../../Form/addMemberForm';

export default function AdmEditMember(props) {
  return (
    <>
      <Navbar />
      <Container>
        <Member projectId={props.match.params.projectId} />
        <AddMember projectId={props.match.params.projectId}></AddMember>
      </Container>
    </>
  );
}
