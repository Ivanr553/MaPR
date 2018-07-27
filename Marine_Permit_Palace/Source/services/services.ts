
import {CancellablePromise} from '../AppValidation'

//Make Cancellable Promises
let makeCancelable = async (promise: Promise<any>) : Promise<CancellablePromise> => {
    let hasCanceled_ = false;
    
    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then((val) =>
        hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
        );
        promise.catch((error) =>
        hasCanceled_ ? reject({isCanceled: true}) : reject(error)
        );
    });
    
    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        }
    }
}

let getDocumentPromise = async (document_id: string) => {
      
    let promise = fetch(`/DocumentSave/GetSubmittedDocumentMeta?submitted_document_id=${document_id}`, {credentials: 'same-origin'})
    
    let getDocumentResponse = await makeCancelable(promise)

    return getDocumentResponse

}

let getTemplateDocumentPromise = async (document_id: string) => {

    let promise = fetch(`/DocumentSave/GetDocumentMeta?document_id=${document_id}`, {credentials: 'same-origin'})
    
    let getDocumentResponse = await makeCancelable(promise)

    return getDocumentResponse

}

let getSaveFilePromise = async (saveFile): Promise<CancellablePromise> => {

    let savePromise = fetch(`/DocumentSave/SaveFile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        credentials: 'same-origin',
        body: JSON.stringify(saveFile)
    })

    let documentSavePromise = await makeCancelable(savePromise)

    return documentSavePromise

}

//User Management
let authenticateUser = async () => {

    let request = await fetch('/Account/WhoAmI', {credentials: 'same-origin'})
    let response = await request.json()

    if(!response) {
      window.open('/A/App', '_self')
    }

}

let logOff = async () => {

    let request = await fetch('/Account/Logout', {credentials: 'same-origin'})
    let response = await request.json()

    if(!response) {
        alert('There was an error with your request')
    } else {
        window.open('/A/App', '_self')
    }

}


export {getDocumentPromise, getTemplateDocumentPromise, getSaveFilePromise, authenticateUser, logOff}