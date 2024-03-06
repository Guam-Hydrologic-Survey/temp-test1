/* 
Toast.js 
Exports: completeSelection(element, selection), additionalSelection(element), selectionProgessNotif(element)
Parameters: (general) 
    "element" - HTML element with ID to contain toast message contents 
    "selection" - an array list containing selected points from the map 
*/

// components 
import { lassoControl } from "./LMap.js";

// globals 
let toastHeaderContent = "";
let toastBodyContent = "";

let toastHeader = /*html*/  
    `
    <div class="toast-header">
        ${toastHeaderContent}
        <small>just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    `;

let toastBody = /*html*/ 
    `
    <div class="toast-body">
        ${toastBodyContent}
    </div>
    `;

let toastContainer = /*html*/
    `
    <div class="toast-container position-fixed bottom-0 start-50 p-3 translate-middle-x">
        <div id="selection-notif" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            ${toastHeader}
            ${toastBody}
        </div>
    </div>
    `;

export function completeSelection(element, selection) {
    let message;
    let pluralPlt = "plots";

    if (selection.length < 2) {
        pluralPlt = "plot";
        message = `You only selected <b>${selection.length} point</b>, which is Well ${selection[0].feature.properties.name}.`;
    } else if (selection.length < 3) {
        message = `You selected <b>${selection.length} points</b>, which include ${selection[0].feature.properties.name} and ${selection[1].feature.properties.name}.`;
    } else {
        message = `You selected <b>${selection.length} points</b>, which include `;
        for (let i = 0; i < selection.length; i++) {
            if (i == selection.length - 1) {
                message += `and ${selection[i].feature.properties.name}.`;
                break;
            } else {
                message += `${selection[i].feature.properties.name}, `;
            }
        }
    }

    element.innerHTML = /*html*/
    `
    <div class="toast-container position-fixed bottom-0 start-50 p-3 translate-middle-x">
        <div id="selection-notif" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                <strong class="me-auto toast-msg-title">Selection complete.</strong>
                <small>just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
            ${message}
                <div class="mt-2 pt-2 border-top d-flex justify-content-evenly">
                    <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#multi-plot-view" title="View plots from selection" id="view-plots-toast-btn">View ${pluralPlt} from selection</button>
                    <button type="button" class="btn btn-outline-danger btn-sm" id="cancel-point-selection" data-bs-dismiss="toast">Clear selection</button>
                </div>
            </div>
        </div>
    </div>
    `;

    const selectionNotif = document.getElementById('selection-notif');
    const selectionNotifToast = bootstrap.Toast.getOrCreateInstance(selectionNotif);
    selectionNotifToast.show();

    const dismissNotif = document.getElementById("view-plots-toast-btn");
    dismissNotif.addEventListener("click", () => {
        selectionNotifToast.hide();
    });

    const reset = document.getElementById("multi-plot-view-contents");
    const clearSelection = document.getElementById("cancel-point-selection");
    clearSelection.addEventListener("click", () => {
        reset.replaceChildren();
    });
}

export function additionalSelection(element) {
    element.innerHTML = /*html*/
    `
    <div class="toast-container position-fixed bottom-0 start-50 p-3 translate-middle-x">
        <div id="selection-notif" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-index-thumb-fill" viewBox="0 0 16 16">
                    <path d="M8.5 1.75v2.716l.047-.002c.312-.012.742-.016 1.051.046.28.056.543.18.738.288.273.152.456.385.56.642l.132-.012c.312-.024.794-.038 1.158.108.37.148.689.487.88.716q.113.137.195.248h.582a2 2 0 0 1 1.99 2.199l-.272 2.715a3.5 3.5 0 0 1-.444 1.389l-1.395 2.441A1.5 1.5 0 0 1 12.42 16H6.118a1.5 1.5 0 0 1-1.342-.83l-1.215-2.43L1.07 8.589a1.517 1.517 0 0 1 2.373-1.852L5 8.293V1.75a1.75 1.75 0 0 1 3.5 0"/>
                </svg>
                <strong class="me-auto toast-msg-title">Selection in progess...</strong>
                <small>just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
            Please select more points to plot. 
                <div class="mt-2 pt-2 border-top d-flex justify-content-evenly">
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#multi-plot-view" title="View plots from current selection" id="view-plots-toast-btn">View current selection</button>
                    <button type="button" class="btn btn-outline-danger btn-sm" id="cancel-point-selection" data-bs-dismiss="toast">Cancel selection</button>
                </div>
            </div>
        </div>
    </div>
    `;

    const selectionNotif = document.getElementById('selection-notif');
    const selectionNotifToast = bootstrap.Toast.getOrCreateInstance(selectionNotif);
    selectionNotifToast.show();

    const dismissNotif = document.getElementById("view-plots-toast-btn");
    dismissNotif.addEventListener("click", () => {
        selectionNotifToast.hide();
    });

    const reset = document.getElementById("multi-plot-view-contents");
    const clearSelection = document.getElementById("cancel-point-selection");
    clearSelection.addEventListener("click", () => {
        reset.replaceChildren();
        lassoControl.disable();
    });
}

export function selectionProgessNotif(element) {    
    element.innerHTML = /* html */
    `
    <div class="toast-container position-fixed bottom-0 start-50 p-3 translate-middle-x">
        <div class="toast align-items-center" id="selection-in-progress-notif" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    Selection in progress...
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
    `;

    const selectionProgressNotif = document.getElementById("selection-in-progress-notif");
    const selectionProgressNotifToast = bootstrap.Toast.getOrCreateInstance(selectionProgressNotif);
    selectionProgressNotifToast.show();
}