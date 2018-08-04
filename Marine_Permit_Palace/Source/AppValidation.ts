

interface CancellablePromise {
    promise: Promise<any>,
    cancel(): void
}

interface document {
    document_id: string,
    idDocument?: string
    name: string,
    is_complete: boolean
}

interface document_meta_field {
    field_name: string,
    field_type: string,
    value: any,    
    field_position: {
        position: {
            top: number,
            left: number,
            height: number,
            width: number
        }
    },
    assigned_to: any,
    is_disabled: boolean,
    disabled_message: string
}

interface documentResponse {
    pages: Array<documentPage>,
    result: string,
    status_code: number
}

interface documentPage {
    document_meta: Array<document_meta_field>,
    page: {
        left: number,
        right: number,
        height: number,
        width: number
    }
}

interface databaseUser {
    dod_id: string,
    first_name: string,
    last_name: string,
    rank: string | null
}

interface documentDimensions {
    left: number,
    top: number,
    height: number,
    width: number
}

interface saveResultInterface {
    result: string,
    reason: string,
    status_code: number
}

export {CancellablePromise, document, documentResponse, documentPage, document_meta_field, saveResultInterface, databaseUser, documentDimensions}