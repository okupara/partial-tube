import React from 'react'
import { storiesOf } from '@storybook/react'
import Playlist from 'components/molecules/Playlist'
import { pattern1 } from '__mocks__/Playlist'

storiesOf('Playlist', module).add('default', () => (
  <Playlist playList={pattern1()} />
))
