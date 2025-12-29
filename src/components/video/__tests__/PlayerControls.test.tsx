import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { renderWithProviders } from '@/utils/test-utils';
import * as mockReact from 'react';
import { View as mockView } from 'react-native';

import { PlayerControls } from '../PlayerControls';

jest.mock('@/store/profile.store', () => ({
  useProfileStore: jest.fn((selector: any) => selector({ activeProfileId: 'p1' })),
}));

jest.mock('@/store/profile-settings.store', () => ({
  useProfileSettingsStore: jest.fn((selector: any) =>
    selector({
      byProfile: {
        p1: {
          preferredAudioLanguages: undefined,
          preferredSubtitleLanguages: undefined,
        },
      },
    })
  ),
}));

jest.mock('@react-native-community/slider', () => {
  return (props: any) => mockReact.createElement(mockView, props);
});

describe('PlayerControls', () => {
  it('renders title and toggles visibility on press', () => {
    // Arrange
    const { getByText, queryByText, getByTestId } = renderWithProviders(
      <PlayerControls
        paused={true}
        currentTime={0}
        duration={100}
        showLoadingIndicator={false}
        title="My Title"
        audioTracks={[]}
        textTracks={[]}
        onPlayPause={() => {}}
        onSeek={() => {}}
        onSkipBackward={() => {}}
        onSkipForward={() => {}}
        onSelectAudioTrack={() => {}}
        onSelectTextTrack={() => {}}
      />
    );

    // Assert (initial)
    expect(getByText('My Title')).toBeTruthy();

    // Act
    fireEvent.press(getByTestId('player-controls-overlay'));

    // Assert
    expect(queryByText('My Title')).toBeNull();
  });

  it('renders with onBack callback', () => {
    // Arrange
    const onBack = jest.fn();
    const { getByText } = renderWithProviders(
      <PlayerControls
        paused={true}
        currentTime={0}
        duration={100}
        showLoadingIndicator={false}
        title="My Title"
        audioTracks={[]}
        textTracks={[]}
        onPlayPause={() => {}}
        onSeek={() => {}}
        onSkipBackward={() => {}}
        onSkipForward={() => {}}
        onBack={onBack}
        onSelectAudioTrack={() => {}}
        onSelectTextTrack={() => {}}
      />
    );

    // Assert - Controls should render with back button
    expect(getByText('My Title')).toBeTruthy();
  });
});
