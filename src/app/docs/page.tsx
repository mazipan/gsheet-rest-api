'use client'

import { ApiReferenceReact } from '@scalar/api-reference-react'

import '@scalar/api-reference-react/style.css'

export default function References() {
  return (
    <ApiReferenceReact
      configuration={{
        spec: {
          url: '/openapi.json',
        },
      }}
    />
  )
}
