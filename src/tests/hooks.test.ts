import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useFetch } from '../hooks'

describe("Tests for hook", () => {
    it("should return proper values", async () => {
        const mockFetch = vi.fn(() => Promise.resolve({ data: "test" }))
        const { result  } = renderHook(() => useFetch(mockFetch))

        expect(mockFetch).toHaveBeenCalledTimes(1)

        expect(result.current.data).toBe(undefined)
        expect(result.current.loading).toBe(true)
        expect(result.current.error).toBe(undefined)

        await waitFor(() => {
            expect(result.current.data?.data).toBe("test")
            expect(result.current.loading).toBe(false)
            expect(result.current.error).toBe(undefined)
        })
    })

    it("should throw error when fetch function passed fails", async () => {
        const mockFetch = vi.fn(() => Promise.reject({data: "error"}))

        const { result  } = renderHook(() => useFetch(mockFetch))

        expect(mockFetch).toHaveBeenCalledTimes(1)

        expect(result.current.data).toBe(undefined)
        expect(result.current.loading).toBe(true)
        expect(result.current.error).toBe(undefined)

        await waitFor(() => {
            expect(result.current.data).toBe(undefined)
            expect(result.current.loading).toBe(false)
            expect(result.current.error).toBeTruthy();
        })
    })
})