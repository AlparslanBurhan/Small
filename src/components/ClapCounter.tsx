'use client'
import { useEffect } from 'react'
import { useClapStore } from '@/store/clapStore'
import { ClapCounterProps } from '@/types/interfaces'
import { setClapById } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function ClapCounter({ initialClaps, blogId }: ClapCounterProps) {
    const { claps, clicked, toggleClap, setClaps } = useClapStore()
    const queryClient = useQueryClient()

    useEffect(() => {
        setClaps(initialClaps)
    }, [initialClaps, setClaps])

    const clapMutation = useMutation({
        mutationFn: (newClaps: number) => setClapById(blogId, newClaps),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blog', blogId] })
        },
    })

    const handleClapToggle = () => {
        toggleClap()
        const currentClaps = useClapStore.getState().claps
        clapMutation.mutate(currentClaps)
    }

    return (
        <div className="flex items-center gap-2">
            <span>{claps}</span>
            <button
                onClick={handleClapToggle}
                className={`px-1.5 py-0.5 rounded-md text-sm ${
                    clicked
                        ? 'bg-yellow-800 text-white'
                        : 'bg-yellow-300 text-black hover:bg-yellow-400'
                }`}
                aria-pressed={clicked}
                aria-label="Clap button"
                disabled={clapMutation.isPending}
            >
                👏
            </button>
        </div>
    )
}