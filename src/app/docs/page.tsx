'use client'

import { ApiReferenceReact } from '@scalar/api-reference-react'

import '@scalar/api-reference-react/style.css'

export default function References() {
  return (
    <div className="group docs">
      <ApiReferenceReact
        configuration={{
          spec: {
            url: '/openapi.json',
          },
          customCss: `.introduction-description .markdown img { display: inline-flex; margin: 3px 0; }`,
          defaultHttpClient: {
            targetKey: 'js',
            clientKey: 'fetch',
          },
        }}
      />
    </div>
  )
}
