(()=>{"use strict";var e,t="a0036ef3-200a-495e-9686-79f48f6c8df6",r="wff-cohort-10",n={headers:{authorization:t},headersWithContentType:{authorization:t,"Content-Type":"application/json"},baseUrl:"https://mesto.nomoreparties.co/v1/".concat(r),editBaseUrl:"https://nomoreparties.co/v1/".concat(r)};function o(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function a(e){console.error(e)}function i(e){var t,r,n,o,a,i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t=e,n=(r={inputSelector:".popup__input",inputErrorClass:"popup__input_type_error",errorClass:"popup__form-error_visible"}).inputSelector,o=r.inputErrorClass,a=r.errorClass,Array.from(t.querySelectorAll(n)).forEach((function(e){u(t,e,{inputErrorClass:o,errorClass:a})})),e.querySelector(".popup__button").disabled=i}function c(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.disabled=!1:t.disabled=!0}function u(e,t,r){var n=r.inputErrorClass,o=r.errorClass;t.classList.remove(n);var a=e.querySelector(".".concat(t.id,"-error"));a.textContent="",a.classList.remove(o)}function s(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",p)}function l(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",p)}function p(e){var t=document.querySelector(".popup_is-opened");"Escape"!==e.key&&"Esc"!==e.key||l(t)}var d=document.querySelector("#card-template").content;function f(t,r,n,o){var a=d.querySelector(".card").cloneNode(!0),i=t.link,c=t.name,u=t.owner,s=t._id,l=t.likes,p=a.querySelector(".card__image");p.src=i,p.alt=c,a.querySelector(".card__title").textContent=c;var f=a.querySelector(".card__delete-button");e!=u._id?f.style.display="none":f.addEventListener("click",(function(){return r(t._id,a)})),a.querySelector(".card__like-text").textContent=l.length;var _=a.querySelector(".card__like-button");return l.some((function(t){return t._id==e}))&&_.classList.add("card__like-button_is-active"),_.addEventListener("click",(function(e){return o(e,s,a)})),p.addEventListener("click",n),a}function _(e,t){var r=document.querySelector(".popup_type_delete-card"),i=document.forms["delete-card"];s(r),i.addEventListener("submit",(function(i){i.preventDefault(),function(e){return fetch("".concat(n.editBaseUrl,"/cards/").concat(e),{method:"DELETE",headers:n.headers}).then(o).then((function(e){return e})).catch(a)}(e).then((function(){t.remove(),l(r)}))}))}function h(e,t,r){var i=e.target,c=i.classList.contains("card__like-button_is-active"),u=function(e){var t=e.likes.length;r.querySelector(".card__like-text").textContent=t,i.classList.toggle("card__like-button_is-active",!c)};c?function(e){return fetch("".concat(n.editBaseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:n.headers}).then(o).then((function(e){return e})).catch(a)}(t).then((function(e){return u(e)})):function(e){return fetch("".concat(n.editBaseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:n.headers}).then(o).then((function(e){return e})).catch(a)}(t).then((function(e){return u(e)}))}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var v,y,C,S,b,g,E=document.querySelector(".page"),q=E.querySelector(".places__list"),L={edit:E.querySelector(".popup_type_edit"),editAvatar:E.querySelector(".popup_type_edit-avatar-profile"),newCard:E.querySelector(".popup_type_new-card"),image:E.querySelector(".popup_type_image")},k={image:L.image.querySelector(".popup__image"),caption:L.image.querySelector(".popup__caption")},x={title:E.querySelector(".profile__title"),description:E.querySelector(".profile__description"),image:E.querySelector(".profile__image")},A=document.forms["edit-profile"],w=A.name,T=A.description,U=document.forms["edit-avatar-profile"],B=U["edit-avatar-input"],j=document.forms["new-place"],O=j["place-name"],D=j.link;function P(e){var t=e.name,r=e.about,n=e.avatar;t&&(x.title.textContent=t),r&&(x.description.textContent=r),n&&(x.image.src=n)}function M(e){var t=e.target.parentElement;k.image.src=e.target.src,k.image.alt=captionText,k.caption.textContent=t.querySelector(".card__title").textContent,s(L.image)}function N(e){e.reset()}function W(e,t){e.textContent=t||"Сохранение..."}E.addEventListener("click",(function(e){var t=E.querySelector(".popup_is-opened");e.target.classList.contains("popup")||e.target.classList.contains("popup__close")?l(t):e.target.classList.contains("profile__edit-button")?(w.value=x.title.textContent,T.value=x.description.textContent,i(A,!1),s(L.edit)):e.target.classList.contains("profile__image-button")||e.target.parentElement.classList.contains("profile__image-button")?(N(U),i(U),s(L.editAvatar)):e.target.classList.contains("profile__add-button")&&(N(j),i(j),s(L.newCard))})),A.addEventListener("submit",(function(e){e.preventDefault();var t,r=L.edit.querySelector(".popup__button"),i=r.textContent;W(r),(t={name:w.value,about:T.value},fetch("".concat(n.editBaseUrl,"/users/me"),{method:"PATCH",headers:n.headersWithContentType,body:JSON.stringify(t)}).then(o).then((function(e){return e})).catch(a)).then((function(e){P(e),W(r,i),l(L.edit)}))})),U.addEventListener("submit",(function(e){e.preventDefault();var t,r=L.editAvatar.querySelector(".popup__button"),i=r.textContent;W(r),(t={avatar:B.value},fetch("".concat(n.editBaseUrl,"/users/me/avatar"),{method:"PATCH",headers:n.headersWithContentType,body:JSON.stringify(t)}).then(o).then((function(e){return e})).catch(a)).then((function(e){P(e),W(r,i),l(L.editAvatar)}))})),j.addEventListener("submit",(function(e){e.preventDefault();var t,r=L.newCard.querySelector(".popup__button"),i=r.textContent;W(r),(t={name:O.value,link:D.value},fetch("".concat(n.editBaseUrl,"/cards"),{method:"POST",headers:n.headersWithContentType,body:JSON.stringify(t)}).then(o).then((function(e){return e})).catch(a)).then((function(e){q.prepend(f(e,_)),W(r,i),l(L.newCard)}))})),y=(v={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_type_error",errorClass:"popup__form-error_visible"}).formSelector,C=v.inputSelector,S=v.submitButtonSelector,b=v.inputErrorClass,g=v.errorClass,Array.from(document.querySelectorAll(y)).forEach((function(e){!function(e,t){var r=t.inputSelector,n=t.submitButtonSelector,o=t.inputErrorClass,a=t.errorClass,i=Array.from(e.querySelectorAll(r)),s=e.querySelector(n);c(i,s),i.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,r){var n=r.inputErrorClass,o=r.errorClass;t.validity.valid?u(e,t,{inputErrorClass:n,errorClass:o}):(t.validity.patternMismatch?t.setCustomValidity(t.dataset.patternErrorMessage):t.setCustomValidity(""),function(e,t,r,n){var o=n.inputErrorClass,a=n.errorClass;t.classList.add(o);var i=e.querySelector(".".concat(t.id,"-error"));i.textContent=r,i.classList.add(a)}(e,t,t.validationMessage,{inputErrorClass:n,errorClass:o}))}(e,t,{inputErrorClass:o,errorClass:a}),c(i,s)}))}))}(e,{inputSelector:C,submitButtonSelector:S,inputErrorClass:b,errorClass:g})})),Promise.all([fetch("".concat(n.baseUrl,"/users/me"),{headers:n.headers}).then(o).then((function(t){return e=t._id,t})).catch(a),fetch("".concat(n.baseUrl,"/cards"),{headers:n.headers}).then(o).then((function(e){return e})).catch(a)]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,i,c=[],u=!0,s=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(c.push(n.value),c.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(s)throw o}}return c}}(t,r)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?m(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],a=n[1];P(o),a.forEach((function(e){q.append(f(e,_,M,h))}))}))})();
//# sourceMappingURL=main.js.map