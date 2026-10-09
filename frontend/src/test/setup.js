import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { resetMockData } from '../data/mockDatabase.js'

beforeEach(() => {
  localStorage.clear()
  resetMockData()
})

afterEach(() => cleanup())
