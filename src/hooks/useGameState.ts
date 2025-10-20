import { useCallback } from "react";
import { useFirebase } from "./useFirebase";

export interface GameState {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;

    closed4C: boolean;
}

const DEFAULT_STATE: GameState = {
    closed4C: false
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
            return await create(DEFAULT_STATE)
        }
        return state?.id
    }, [state, create])

    const update = useCallback((newState: GameState) => {
        return state?.id ? fbUpdate(state?.id, newState) : undefined
    }, [fbUpdate, state?.id])

    return { state: state!, init, update, isLoading: isLoading }
}