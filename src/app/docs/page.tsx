'use client'

import { ApiReferenceReact } from '@scalar/api-reference-react'
import styles from './md.module.css'
import clsx from 'clsx'

// import '@scalar/api-reference-react/style.css'

export default function References() {
  return (
    <div className={clsx('group docs', styles.md)}>
      <ApiReferenceReact
        configuration={{
          spec: {
            url: '/openapi.json',
          },
          hideDownloadButton: true,
          hideModels: true,
          hideClientButton: true,
          authentication: {
            apiKey: {
              token: 'YOUR_SECRET_TOKEN',
            },
          },
        }}
      />
    </div>
  )
}
