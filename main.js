(()=>{"use strict";var e="a0036ef3-200a-495e-9686-79f48f6c8df6",t="wff-cohort-10",r={headers:{authorization:e},headersWithContentType:{authorization:e,"Content-Type":"application/json"},baseUrl:"https://mesto.nomoreparties.co/v1/".concat(t),editBaseUrl:"https://nomoreparties.co/v1/".concat(t)};function n(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function o(e){console.error(e)}function a(e,t){var r=t.inputSelector,n=t.inputErrorClass,o=t.errorClass,a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];!function(e,t){var r=t.inputSelector,n=t.inputErrorClass,o=t.errorClass;Array.from(e.querySelectorAll(r)).forEach((function(t){c(e,t,{inputErrorClass:n,errorClass:o})}))}(e,{inputSelector:r,inputErrorClass:n,errorClass:o}),e.querySelector(".popup__button").disabled=a}function i(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.disabled=!1:t.disabled=!0}function c(e,t,r){var n=r.inputErrorClass,o=r.errorClass;t.classList.remove(n);var a=e.querySelector(".".concat(t.id,"-error"));a.textContent="",a.classList.remove(o)}function s(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)}function l(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)}function u(e){"Escape"!==e.key&&"Esc"!==e.key||l(document.querySelector(".popup_is-opened"))}var d,p,f=document.querySelector("#card-template").content;function m(e,t,r,n,o){var a=t.link,i=t.name,c=t.owner,s=t._id,l=t.likes,u=f.querySelector(".card").cloneNode(!0),d=u.querySelector(".card__image");d.src=a,d.alt=i,u.querySelector(".card__title").textContent=i;var p=u.querySelector(".card__delete-button");e!==c._id?p.style.display="none":p.addEventListener("click",(function(){return r(s,u)})),u.querySelector(".card__like-text").textContent=l.length;var m=u.querySelector(".card__like-button");return l.some((function(t){return t._id==e}))&&m.classList.add("card__like-button_is-active"),m.addEventListener("click",(function(e){return o(e,s,u)})),d.addEventListener("click",n),u}function _(e,t,a){var i=e.target,c=i.classList.contains("card__like-button_is-active"),s=function(e){var t=e.likes.length;a.querySelector(".card__like-text").textContent=t,i.classList.toggle("card__like-button_is-active",!c)};c?function(e){return fetch("".concat(r.editBaseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:r.headers}).then(n).catch(o)}(t).then((function(e){return s(e)})):function(e){return fetch("".concat(r.editBaseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:r.headers}).then(n).catch(o)}(t).then((function(e){return s(e)}))}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var y,h,C,S,b,g,E=document.querySelector(".page"),q=E.querySelector(".places__list"),L={edit:E.querySelector(".popup_type_edit"),editAvatar:E.querySelector(".popup_type_edit-avatar-profile"),newCard:E.querySelector(".popup_type_new-card"),image:E.querySelector(".popup_type_image"),deleteCard:E.querySelector(".popup_type_delete-card")},k={image:L.image.querySelector(".popup__image"),caption:L.image.querySelector(".popup__caption")},x={title:E.querySelector(".profile__title"),description:E.querySelector(".profile__description"),image:E.querySelector(".profile__image")},A=document.forms["edit-profile"],w=A.name,T=A.description,U=document.forms["edit-avatar-profile"],B=U["edit-avatar-input"],j=document.forms["new-place"],O=j["place-name"],D=j.link,P=document.forms["delete-card"],M={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_type_error",errorClass:"popup__form-error_visible"};function N(e){var t=e.name,r=e.about,n=e.avatar;t&&(x.title.textContent=t),r&&(x.description.textContent=r),n&&(x.image.src=n)}function W(e){var t=e.target.parentElement;k.image.src=e.target.src,k.image.alt=t.querySelector(".card__title").textContent,k.caption.textContent=t.querySelector(".card__title").textContent,s(L.image)}function I(e){e.reset()}function J(e,t){p={id:e,element:t},s(L.deleteCard)}function z(e,t){e.textContent=t||"Сохранение..."}E.addEventListener("click",(function(e){var t=E.querySelector(".popup_is-opened");e.target.classList.contains("popup")||e.target.classList.contains("popup__close")?l(t):e.target.classList.contains("profile__edit-button")?(w.value=x.title.textContent,T.value=x.description.textContent,a(A,M,!1),s(L.edit)):e.target.classList.contains("profile__image-button")||e.target.parentElement.classList.contains("profile__image-button")?(I(U),a(U,M),s(L.editAvatar)):e.target.classList.contains("profile__add-button")&&(I(j),a(j,M),s(L.newCard))})),A.addEventListener("submit",(function(e){e.preventDefault();var t,a=L.edit.querySelector(".popup__button"),i=a.textContent;z(a),(t={name:w.value,about:T.value},fetch("".concat(r.editBaseUrl,"/users/me"),{method:"PATCH",headers:r.headersWithContentType,body:JSON.stringify(t)}).then(n).catch(o)).then((function(e){N(e),z(a,i),l(L.edit)}))})),U.addEventListener("submit",(function(e){e.preventDefault();var t,a=L.editAvatar.querySelector(".popup__button"),i=a.textContent;z(a),(t={avatar:B.value},fetch("".concat(r.editBaseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headersWithContentType,body:JSON.stringify(t)}).then(n).catch(o)).then((function(e){N(e),z(a,i),l(L.editAvatar)}))})),j.addEventListener("submit",(function(e){e.preventDefault();var t,a=L.newCard.querySelector(".popup__button"),i=a.textContent;z(a),(t={name:O.value,link:D.value},fetch("".concat(r.editBaseUrl,"/cards"),{method:"POST",headers:r.headersWithContentType,body:JSON.stringify(t)}).then(n).catch(o)).then((function(e){q.prepend(m(d,e,J)),z(a,i),l(L.newCard)}))})),P.addEventListener("submit",(function(e){var t;e.preventDefault(),(t=p.id,fetch("".concat(r.editBaseUrl,"/cards/").concat(t),{method:"DELETE",headers:r.headers}).then(n).catch(o)).then((function(){p.element.remove(),p={},l(L.deleteCard)}))})),h=(y=M).formSelector,C=y.inputSelector,S=y.submitButtonSelector,b=y.inputErrorClass,g=y.errorClass,Array.from(document.querySelectorAll(h)).forEach((function(e){!function(e,t){var r=t.inputSelector,n=t.submitButtonSelector,o=t.inputErrorClass,a=t.errorClass,s=Array.from(e.querySelectorAll(r)),l=e.querySelector(n);i(s,l),s.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,r){var n=r.inputErrorClass,o=r.errorClass;t.validity.valid?c(e,t,{inputErrorClass:n,errorClass:o}):(t.validity.patternMismatch?t.setCustomValidity(t.dataset.patternErrorMessage):t.setCustomValidity(""),function(e,t,r,n){var o=n.inputErrorClass,a=n.errorClass;t.classList.add(o);var i=e.querySelector(".".concat(t.id,"-error"));i.textContent=r,i.classList.add(a)}(e,t,t.validationMessage,{inputErrorClass:n,errorClass:o}))}(e,t,{inputErrorClass:o,errorClass:a}),i(s,l)}))}))}(e,{inputSelector:C,submitButtonSelector:S,inputErrorClass:b,errorClass:g})})),Promise.all([fetch("".concat(r.baseUrl,"/users/me"),{headers:r.headers}).then(n).catch(o),fetch("".concat(r.baseUrl,"/cards"),{headers:r.headers}).then(n).catch(o)]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,i,c=[],s=!0,l=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;s=!1}else for(;!(s=(n=a.call(r)).done)&&(c.push(n.value),c.length!==t);s=!0);}catch(e){l=!0,o=e}finally{try{if(!s&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(l)throw o}}return c}}(t,r)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?v(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],a=n[1];d=o._id,N(o),a.forEach((function(e){q.append(m(d,e,J,W,_))}))}))})();
//# sourceMappingURL=main.js.map