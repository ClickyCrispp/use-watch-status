# <em><b>useWatchStatus</b></em>

> 

[![NPM](https://img.shields.io/npm/v/use-watch-status.svg)](https://www.npmjs.com/package/use-watch-status) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features
- 📜 Supports (Tested on 4.1+) [TypeScript](https://www.typescriptlang.org) type definition.
- 🦔 Tiny size. No external dependencies, aside for the `react`;

## Requirement

To use `use-watch-status`, you must use `react@16.8.0` or greater which includes hooks.

## Install

```bash
npm install --save use-watch-status
```

## Usage

```tsx
import React from 'react'
import { useWatchStatus } from 'use-watch-status'

// NOTE: Without 'as const' on this array all the typescript typings will break
const ALL_POTENTIAL_STATUS_STATES = ['ready', 'loading', 'complete'] as const;

const Example = () => {
  const [checks, triggers] = useWatchStatus(ALL_POTENTIAL_STATUS_STATES)
  
  useEffect(() => {
    // simulate ready
    triggers.onReady();

    // simulate loading
    setTimeout(() => {
      triggers.onLoading();

      // simulate loading for 5 seconds, before being marked as complete
      setTimeout(() => triggers.onComplete(), 5 * 1000);
    }, 2 * 1000);
  }, []);

  return (
    <div>
      {checks.isReady && 'Action is ready'}
      {checks.isLoading && 'Action is loading...'}
      {checks.isComplete && 'Action Complete!'}
    </div>
  )
}
```

## Useful Recipe

Create a wrapper around the hook for re-use

```tsx

const NETWORK_FETCH_STATUS_STATES = ['ready', 'loading', 'error', 'finished', 'timeout'];

const useWatchFetchStatus = () => useWatchStatus(NETWORK_FETCH_STATUS_STATES);

// - Usage - 

const App = () => {
  const [fetchStatusChecks, fetchStatusTriggers] = useWatchFetchStatus();

  useEffect(() => {
    if (isNetworkAccessable) {     // <--- pretend check before triggering 'ready' status
      fetchStatusTriggers.onReady();
    }
  }, []);

  if (fetchStatusChecks.isReady) {
    // Do something
  }
}

```

## Community

Please don't be shy, if you think there are improvements to be made, then submit an issue.

## License

MIT © [ClickyCrispp](https://github.com/ClickyCrispp)

---