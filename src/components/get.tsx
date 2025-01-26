'use client'

import { Product } from '@/payload-types'
import { Button } from '@payloadcms/ui'
import { PaginatedDocs } from 'payload'
import { useState } from 'react'
import { getAction } from './action'

export default function Get() {
  const [result, setResult] = useState<PaginatedDocs<Product> | null>(null)

  async function get() {
    const result = await getAction()
    setResult(result)
  }

  return (
    <div>
      <Button onClick={get}>Get</Button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}
