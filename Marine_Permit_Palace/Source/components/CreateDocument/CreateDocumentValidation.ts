

interface user {
    id: number,
    name: string,
    assigned_to: null | [number]
}

interface currentSelectedField {
    assigned_to: {
        name: string,
        id: number,
        assigned_to: null | [number]
    },
    field_name: string
}

interface makeCancelablePromise {
    promise: Promise<any>,
    cancel(): () => void
}

export {user, currentSelectedField, makeCancelablePromise}
