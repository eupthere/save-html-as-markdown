import { useState, useEffect } from 'react';
import type { PageMetadata } from '@/lib/messages';

type Status = 'loading' | 'ready' | 'saving' | 'saved' | 'error';

function App() {
  const [metadata, setMetadata] = useState<PageMetadata | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const [tab] = await browser.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (!tab?.id) {
          setError('No active tab found');
          setStatus('error');
          return;
        }

        const response = await browser.tabs.sendMessage(tab.id, {
          type: 'GET_METADATA',
        });

        if (response?.type === 'PAGE_METADATA') {
          setMetadata(response as PageMetadata);
          setStatus('ready');
        } else {
          setError('Could not extract page content');
          setStatus('error');
        }
      } catch {
        setError('Content script not loaded. Try refreshing the page.');
        setStatus('error');
      }
    }

    fetchMetadata();
  }, []);

  async function handleSave() {
    setStatus('saving');
    try {
      const [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (!tab?.id) {
        throw new Error('No active tab');
      }

      await browser.tabs.sendMessage(tab.id, { type: 'EXTRACT_PAGE' });
      setStatus('saved');
    } catch {
      setError('Failed to save. Try refreshing the page.');
      setStatus('error');
    }
  }

  return (
    <div className="w-80 p-4 font-sans">
      <h1 className="text-base font-semibold text-gray-900 mb-3">
        Save as Markdown
      </h1>

      {status === 'loading' && (
        <p className="text-sm text-gray-500">Loading page info...</p>
      )}

      {status === 'error' && (
        <div className="text-sm text-red-600 bg-red-50 rounded-md p-3">
          {error}
        </div>
      )}

      {metadata && status !== 'error' && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
              {metadata.title || 'Untitled'}
            </p>
            {metadata.author && (
              <p className="text-xs text-gray-500">{metadata.author}</p>
            )}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{metadata.domain}</span>
              {metadata.wordCount > 0 && (
                <>
                  <span>&middot;</span>
                  <span>{metadata.wordCount.toLocaleString()} words</span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={status === 'saving' || status === 'saved'}
            className={`w-full rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              status === 'saved'
                ? 'bg-green-600 text-white'
                : status === 'saving'
                  ? 'bg-gray-300 text-gray-500 cursor-wait'
                  : 'bg-gray-900 text-white hover:bg-gray-700 cursor-pointer'
            }`}
          >
            {status === 'saving'
              ? 'Saving...'
              : status === 'saved'
                ? 'Saved!'
                : 'Save as Markdown'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
