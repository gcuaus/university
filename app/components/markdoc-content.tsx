import { createElement, type ReactNode } from 'react';
import { DocumentRenderer, type DocumentRendererProps } from '@keystatic/core/renderer';

const renderers = {
  block: {
    heading: ({ level, children }: { level: 1 | 2 | 3 | 4 | 5 | 6; children: ReactNode }) =>
      createElement(`h${Math.min(level + 1, 6)}`, null, children),
  },
};

export default function MarkdocContent({
  document,
}: {
  document: DocumentRendererProps['document'];
}) {
  return (
    <div className="prose-content">
      <DocumentRenderer document={document} renderers={renderers} />
    </div>
  );
}