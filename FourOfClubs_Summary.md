# Four of Clubs - Game Flow & Implementation Summary

## Overview

Four of Clubs is a complex role component that implements a multi-state game flow with interactive features. Unlike simpler role components (5H, 5C, 9D, 6S) that only display static information, 4C includes:
- State machine with 4 distinct phases
- Interactive suit selection for hint system
- Cross-game support ability (provides hints about other games)
- Real-time Firebase synchronization
- Confirmation dialog for irreversible actions

## Game Flow

The Four of Clubs role follows a four-stage state machine:

### 1. NEW - Initial Secret Reveal Stage
- **Display**: Shows role description with "Witch Hunt" theme (red color scheme)
- **Content**: Role abilities and objectives (placeholder game content)
- **Action**: Player must click "Close" to acknowledge
- **Transition**: Updates `_4cStatus` to `OPENED_4C` via `handleCloseSecret()`
- **Purpose**: Ensures player has read their role before proceeding

### 2. OPENED_4C - Active Gameplay **Stage**
- **Display**: Shows "Laga Noasta" theme (purple color scheme) with support ability section
- **Content**: Role description + interactive suit selection interface
- **Features**:
  - Radio buttons for selecting game suit (Diamond, Heart, or Spade)
  - "Reveal Hint" button triggers confirmation dialog
  - Selected suit updates local state (`selectedSuit`)
- **Action**: Player selects a suit and confirms hint reveal
- **Transition**: Updates `_4cStatus` to `REVEALED_HINT` and stores `_4cHintSuit` via `handleRevealHint()`
- **Purpose**: Allows player to choose which game they want strategic information about

### 3. REVEALED_HINT - Post-Reveal Stage
- **Display**: Shows selected suit symbol and corresponding hint text
- **Content**: Read-only view of the revealed game hint
- **Features**:
  - Large suit symbol display with appropriate color
  - Hint text retrieved from `HINTS` constant based on selected suit
  - Encouragement message to use information wisely
- **Action**: No user actions available (informational only)
- **Transition**: Externally controlled to `COMPLETED` when game ends
- **Purpose**: Provides strategic information to help with other games

### 4. COMPLETED - Final Stage
- **Display**: Shows PlayerResult component with assigned color
- **Content**: Congratulations message with player-specific result text
- **Features**:
  - Looks up player assignment by color
  - Displays personalized success message based on player
- **Purpose**: End-game celebration screen

## Architecture Context

### Role System Design
The application implements 5 different role components:
- **Simple Roles** (5H, 5C, 9D, 6S): Static information display only
- **Complex Role** (4C): Multi-state gameplay with interactive features

Each role corresponds to a playing card and is assigned to a player with a color identifier.

### Game State Structure
```typescript
interface GameState {
  _4cStatus: 'NEW' | 'OPENED_4C' | 'REVEALED_HINT' | 'COMPLETED'
  _4cHintSuit?: 'D' | 'H' | 'S'
  // Similar status fields for other games (_5hStatus, _9dStatus, etc.)
}
```

### Player Assignment Structure
```typescript
interface PlayerAssignment {
  color: Color      // RED, GREEN, BLUE, PINK, ORANGE
  player: Player    // TH (Thao), GI (Giang), TY (Thuy), NA (Nanh), L (Linh)
  role: GameRole    // _4C, _5H, _5C, _9D, _6S
}
```

## Implementation Details

### State Management

#### Global State - useGameState Hook
- **Purpose**: Manages shared game state across all role components
- **Storage**: Single Firestore document in 'GameState' collection
- **Fields**: Status and data for all 5 role games
- **Key Functions**:
  - `state`: Current GameState object
  - `update(partial)`: Updates specific fields and persists to Firebase
  - `isLoading`: Loading indicator for async operations
- **Pattern**: Singleton state shared across entire application
- **Updates**: Calls `fbUpdate(state.id, newState)` to persist changes

#### Firebase Data - useFirebase Hook
- **Purpose**: Fetches and manages player assignment data
- **Storage**: Multiple documents in 'playerAssignments' collection
- **Real-time**: Uses `onSnapshot()` for live updates across clients
- **Features**:
  - Optimistic updates (UI updates immediately, rollback on error)
  - React Query integration for caching
  - CRUD operations (create, read, update, delete)
- **Usage in 4C**: Finds which color is assigned to '4C' role
  ```typescript
  playerAssignments?.find(a => a.role === GAME_ROLES._4C)?.color
  ```

#### Local Component State
- **selectedSuit**: Tracks radio button selection (D/H/S)
  - Default: 'D' (Diamond)
  - Updates on radio button change
  - Used when revealing hint
- **showConfirmation**: Controls confirmation dialog visibility
  - Boolean flag for two-step confirmation
  - Prevents accidental irreversible actions

### Status Progression Logic

#### handleCloseSecret (NEW → OPENED_4C)
```typescript
const handleCloseSecret = async () => {
  await update({ _4cStatus: 'OPENED_4C' });
};
```
- Triggered by "Close" button in NEW state
- Simple status update, no additional data
- Opens up the support ability interface

#### handleRevealHint (OPENED_4C → REVEALED_HINT)
```typescript
const handleRevealHint = async () => {
  await update({
    _4cStatus: 'REVEALED_HINT',
    _4cHintSuit: selectedSuit,  // Persists user's selection
  });
  setShowConfirmation(false);
};
```
- Triggered by "Yes, Reveal" button in confirmation dialog
- Stores both status change and selected suit
- Closes confirmation dialog
- Irreversible action (no way to go back)

### Key Features

#### 1. Suit Selection System
- **UI**: Three radio buttons with suit symbols
- **Suits**: Diamond (D), Heart (H), Spade (S)
- **Visual**:
  - Custom 'Suits' font for symbols (♦ ♥ ♠)
  - Color-coded: Red for H/D, Black for S
  - Size: 2xl text (text-2xl)
- **Interaction**:
  - Radio group with controlled state
  - onChange updates `selectedSuit` local state
  - Selected value used when revealing hint

#### 2. Confirmation Pattern
- **Purpose**: Prevents accidental hint reveals
- **Flow**:
  1. User clicks "Reveal Hint" → shows confirmation
  2. Confirmation shows warning: "Are you sure? This action cannot be undone!"
  3. User can confirm (Yes, Reveal) or cancel
- **Implementation**:
  - `showConfirmation` state controls visibility
  - Yellow-bordered warning box
  - Two buttons: Confirm (purple) and Cancel (gray)
- **Why**: Hint reveal is irreversible and strategic (one-time use)

#### 3. Hint System
- **Storage**: Hardcoded in `HINTS` constant
  ```typescript
  const HINTS = {
    D: "Diamond game hint...",
    H: "Heart game hint...",
    S: "Spade game hint..."
  };
  ```
- **Display**: Shows hint based on `state._4cHintSuit`
- **Cross-Game**: Provides strategic info about other games
- **Purpose**: Support role that helps team with other challenges

#### 4. Data Persistence
- **GameState Updates**:
  - `_4cStatus` changes persist immediately
  - `_4cHintSuit` stored when hint revealed
  - Updates sync across all connected clients
- **Player Assignment Lookup**:
  - Fetched from 'playerAssignments' collection
  - Finds color assigned to '4C' role
  - Used in COMPLETED state for PlayerResult

### UI Components Used

#### GameHeader Component
- **Props**:
  - `gameName`: "Witch Hunt" (NEW) or "Laga Noasta" (others)
  - `gameColor`: "red" (NEW) or "purple" (others)
  - `difficultyCard`: Card object from `getRoleCard(GAME_ROLES._4C)`
- **Renders**: Game label, colored title, difficulty card at 0.6x scale
- **Consistency**: All role components use this header

#### PlayerResult Component
- **Props**: `color` (assigned color for 4C role)
- **Flow**:
  1. Receives color prop
  2. Looks up playerAssignment matching that color
  3. Finds player name (TH, GI, TY, NA, L)
  4. Shows personalized success message
- **Messages**: Each player has unique congratulations text
  - TH (Thao): Celebrates strategic thinking
  - GI (Giang): Celebrates analytical skills
  - TY (Thuy): Celebrates intuition
  - NA (Nanh): Celebrates teamwork
  - L (Linh): Celebrates perseverance

#### Card Component
- **Usage**: Displayed by GameHeader to show difficulty
- **Props**:
  - `card`: { rank: 4, suit: 'C' }
  - `scale`: 0.6
- **Renders**: Visual playing card representation

### Styling Approach

#### Color Theming
- **NEW State**: Red theme
  - Border: `border-red-100`
  - Headings: `text-red-600`
  - Button: `bg-red-600 hover:bg-red-700`
- **Other States**: Purple theme
  - Border: `border-purple-100`
  - Headings: `text-purple-600`
  - Buttons: `bg-purple-600 hover:bg-purple-700`
  - Backgrounds: `bg-purple-50`
- **Warning**: Yellow theme
  - Background: `bg-yellow-50`
  - Border: `border-yellow-300`

#### Layout Structure
- **Container**: White rounded card (`rounded-2xl`)
- **Max Width**: `max-w-2xl` for readability
- **Padding**: `px-6 py-8` for comfortable spacing
- **Responsive**: `w-full` with flex centering
- **Shadow**: `shadow-lg` for depth

#### Suit Symbols
- **Font**: Custom 'Suits' font family
- **Unicode**:
  - Heart: '\uF040'
  - Diamond: '\uF14A'
  - Club: '\uF0C7'
  - Spade: '\uF04B'
- **Colors**:
  - Red suits (H, D): `#db3131`
  - Black suits (C, S): `#2c2c2c`

### Error Handling & Edge Cases

#### Loading States
```typescript
if (!state || isLoading) {
  return <Loader2 className="animate-spin" />;
}
```
- Shows spinner while data loads
- Prevents rendering with undefined state
- Centered on screen with white color

#### Missing Data Handling
- **assignedColor**: Uses `!` assertion in COMPLETED state
  - Assumes color will exist by that point
  - PlayerResult handles missing data gracefully
- **_4cHintSuit**: Optional field, only set after reveal
  - Used with conditional: `state._4cHintSuit && HINTS[state._4cHintSuit]`

#### State Transitions
- **External Transitions**: COMPLETED state is set externally (by game master)
- **One-Way Flow**: No way to go backwards in state progression
- **Irreversible**: Hint reveal cannot be undone

## Comparison with Other Role Components

### Simpler Roles (5H, 5C, 9D, 6S)
- Single static display
- No state management beyond loading
- No user interactions
- Same GameHeader + content layout
- Different color themes per game

### Four of Clubs Unique Features
- Multi-state state machine
- Interactive elements (radio buttons, buttons)
- Confirmation dialogs
- Cross-game support ability
- Stores user choices in global state
- Uses both GameHeader and PlayerResult

## Data Flow Diagram

```
┌─────────────────┐
│  FourOfClubs    │
│   Component     │
└────────┬────────┘
         │
         ├─────────────► useGameState()
         │               ├── state._4cStatus
         │               ├── state._4cHintSuit
         │               └── update(partial)
         │
         ├─────────────► useFirebase<PlayerAssignment>()
         │               └── data (all assignments)
         │                   └── find(role === '4C')?.color
         │
         └─────────────► Local State
                         ├── selectedSuit ('D' | 'H' | 'S')
                         └── showConfirmation (boolean)

User Actions:
  NEW: "Close" → update({ _4cStatus: 'OPENED_4C' })
  OPENED_4C: "Reveal Hint" → confirmation → update({ _4cStatus: 'REVEALED_HINT', _4cHintSuit })
  REVEALED_HINT: Read-only display
  COMPLETED: Lookup color → show PlayerResult
```

## Key Takeaways

1. **State Machine Pattern**: Clean separation of concerns with distinct UI per state
2. **Firebase Integration**: Real-time sync with optimistic updates for smooth UX
3. **Reusable Components**: GameHeader and PlayerResult used across role system
4. **User Safety**: Confirmation dialog for irreversible actions
5. **Cross-Game Support**: Unique role that provides strategic help for other games
6. **Color-Based Routing**: PlayerAssignment.color connects roles to players
7. **Consistent Patterns**: Follows same structure as simpler roles but adds complexity

## File References

- Component: `src/components/roles/FourOfClubs.tsx`
- Hooks: `src/hooks/useGameState.ts`, `src/hooks/useFirebase.ts`
- Types: `src/types/playerAssignment.ts`, `src/types/card.ts`
- Components: `src/components/GameHeader.tsx`, `src/components/PlayerResult.tsx`
- Utils: `src/utils/roleCardMapping.ts`
