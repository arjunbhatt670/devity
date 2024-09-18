'use client';

import { withErrorBoundary } from '@sentry/nextjs';
import NextError from 'next/error';
import type {
  ChangeEvent,
  FC,
  ReactNode,
  RefObject,
} from 'react';
import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

type VideoPlayerContextType = {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  videoRef: RefObject<HTMLVideoElement>;
};

const VideoPlayerContext = createContext<VideoPlayerContextType | undefined>(undefined);

type VideoPlayerProps = {
  children: ReactNode;
  src: string;
};

const VideoPlayerBase: FC<VideoPlayerProps> = ({ children, src }) => {
  const [isPlaying, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    setPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const pause = () => {
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const seek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const contextValue = useMemo(() => ({ isPlaying, play, pause, seek, videoRef }), [isPlaying]);

  return (
    <VideoPlayerContext.Provider value={contextValue}>
      <div>
        <video ref={videoRef} src={src}>
          <track kind="captions" />
        </video>
        {children}
      </div>
    </VideoPlayerContext.Provider>
  );
};

const PlayButton = () => {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error('PlayButton must be used within a VideoPlayer');
  }

  const { play } = context;
  return (
    <button type="button" onClick={play} className="mb-2 me-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Play</button>
  );
};

const PauseButton = () => {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error('PauseButton must be used within a VideoPlayer');
  }

  const { pause } = context;

  return (
    <button type="button" onClick={pause} className="mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Pause</button>
  );
};

const SeekBar: FC = () => {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error('SeekBar must be used within a VideoPlayer');
  }

  const { seek, videoRef } = context;

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = (Number.parseFloat(e.target.value) / 100) * videoRef.current.duration;
      seek(time);
    }
  };

  return <input type="range" min="0" max="100" onChange={handleSeek} />;
};

const useVideoControls = () => {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error('useVideoControls must be used within a VideoPlayer');
  }

  const { isPlaying, play, pause } = context;

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return { isPlaying, togglePlay };
};

const RenderPlayPauseButton = ({ render }: {
  render: (isPlaying: boolean) => ReactNode;
}) => {
  const { isPlaying } = useVideoControls();
  return <>{render(isPlaying)}</>;
};

const VideoPlayer = withErrorBoundary(VideoPlayerBase, {
  fallback: () => {
    return <NextError title="Oops!! Something went wrong" statusCode={501} />;
  },
});

const Video = ({ src }: { src: string }) => {
  return (
    <VideoPlayer src={src}>
      <RenderPlayPauseButton
        render={isPlaying => (isPlaying ? <PauseButton /> : <PlayButton />)}
      />
      <SeekBar />
    </VideoPlayer>
  );
};

export default Video;
