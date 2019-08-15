import React from 'react'
import { storiesOf } from '@storybook/react'
import PlaylistCollection from 'components/organisms/PlaylistCollection'
import { createUsual } from '__mocks__/PlaylistCollection'

storiesOf('PlaylistCollection', module).add('default', () => (
  <PlaylistCollection collection={createUsual()} />
))
