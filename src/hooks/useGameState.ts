import { useCallback } from "react";
import { useFirebase } from "./useFirebase";
import type { Timestamp } from "firebase/firestore";

export type STATUS_4C = 'NEW' | 'OPENED_4C' | 'REVEALED_HINT' | 'COMPLETED'
export type STATUS_5H = 'NEW' | 'OPENED_5H' | 'OPEN_HINT' | 'COMPLETED'
export type STATUS_9D = 'NEW' | 'OPENED_9D' | 'OPEN_HINT' | 'COMPLETED'
export type STATUS_5C = 'NEW' | 'COMPLETED'
export type STATUS_6S = 'NEW' | 'OPENED_6S' | 'OPEN_HINT' | 'COMPLETED'

export interface GameState {
    id?: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;

    _4cStatus: STATUS_4C
    _4cHintSuit?: 'D' | 'H' | 'S'

    _5hStatus: STATUS_5H
    _9dStatus: STATUS_9D

    _5cStatus: STATUS_5C
    _5cUsedTime: number
    _5cHintIndices?: { D: number; H: number; S: number }
    _5cCurrentHint?: { suit: 'D' | 'H' | 'S'; index: number }
    
    _6sStatus: STATUS_6S
}

const DEFAULT_STATE: GameState = {
    _4cStatus: 'NEW',

    _5hStatus: 'NEW',

    _9dStatus: 'NEW',

    _5cStatus: 'NEW',
    _5cHintIndices: { D: 0, H: 0, S: 0 },
    _5cUsedTime: 0,

    _6sStatus: 'NEW'
}

export const useGameState = () => {
    const {
        firstData: state,
        create,
        update: fbUpdate,
        isLoading
    } = useFirebase<GameState>({
        collectionName: 'GameState'
    });

    const init = useCallback(async () => {
        if (!state?.id) {
            return await create({
                ...DEFAULT_STATE
            })
        }
        return state?.id
    }, [state, create])

    const update = useCallback((newState: Partial<GameState>) => {
        return state?.id ? fbUpdate(state?.id, newState) : undefined
    }, [fbUpdate, state?.id])

    return { state: state!, init, update, isLoading: isLoading }
}