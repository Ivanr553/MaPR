import { document_meta_field } from "../../AppValidation";



interface user {
    dod_id: number,
    name: string,
    assigned_to: Array<number>,
    is_allowed_approve: boolean,
    is_allowed_assign: boolean,
    is_allowed_edit: boolean,
    is_allowed_submit: boolean
}

interface currentSelectedField {
    assigned_to: user,
    field_name: string
}

interface makeCancelablePromise {
    promise: Promise<any>,
    cancel(): () => void
}

interface createDocumentState {
    document_id: string,
    document_meta: Array<document_meta_field>,
    documentName: string,
    userList: Array<user>,
    selectDocumentShow: boolean,
    documentPreviewShow: boolean,
    selectPermissionsBoolean: boolean
}

export {user, currentSelectedField, makeCancelablePromise, createDocumentState}
