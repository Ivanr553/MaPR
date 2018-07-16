
interface CancellablePromise {
    promise: Promise<any>,
    cancel(): void
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
    }
}

interface documentResponse {
    document_meta: Array<document_meta_field>,
    document_size: {
        left: number,
        right: number,
        height: number,
        width: number
    },
    result: string,
    status_code: number
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

export {CancellablePromise, documentResponse, document_meta_field, saveResultInterface, documentDimensions}