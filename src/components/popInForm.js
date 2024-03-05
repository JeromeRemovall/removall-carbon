import React from "react";
import "../scss/components/popinForm.scss";
import ButtonDownload from "../components/buttonDownload";
import { X } from "react-feather";

function PopInForm({
  onClick,
  firstname,
  name,
  email,
  organization,
  label,
  title,
  text,
  labelMobile,
  file,
  action,
  onSubmit,
  message,
  error,
  phraseRgpd,
  messageSurname,
  messageEmail,
  messageOrganization,
  messageFirstname,
  messageCheckbox,
  onClickOverlay,
}) {
  return (
    <div
      className="pop-in__container"
      onClick={onClickOverlay}
      onKeyDown={onClickOverlay}
      role="button"
      tabIndex={0}
    >
      <div className="pop-in-form">
        <div className="pop-in-form__cross">
          <X
            onClick={onClick}
            onKeyDown={onClick}
            role="button"
            tabIndex={0}
          />
        </div>
        <div
          className="pop-in-form__separator"
          onClick={onClick}
          onKeyDown={onClick}
          role="button"
          tabIndex={0}
        >
          <hr className="separator" />
        </div>
        <h2>{title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        ></div>
        <form
          className="pop-in-form__fields"
          action={action}
          method="post"
          onSubmit={onSubmit}
        >
          <div className="group-input">
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder={name}
            />
            <p className="form-message__error">
              {messageSurname}
            </p>
          </div>
          <div className="group-input hide">
            <input
              type="text"
              id="_wpcf7_unit_tag"
              name="_wpcf7_unit_tag"
              value="6124bb2"
            />
          </div>
          <div className="group-input">
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder={firstname}
            />
            <p className="form-message__error">
              {messageFirstname}
            </p>
          </div>
          <div className="group-input">
            <input
              type="text"
              id="organization"
              name="organization"
              placeholder={organization}
            />
            <p className="form-message__error">
              {messageOrganization}
            </p>
          </div>
          <div className="group-input">
            <input
              type="email"
              id="email"
              name="email"
              placeholder={email}
            />
            <p className="form-message__error">
              {messageEmail}
            </p>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              name="checkbox"
            />
            <label for="checkbox">
              {phraseRgpd}
            </label>
          </div>
          <p className="form-message__error">
            {messageCheckbox}
          </p>
          <ButtonDownload
            label={label}
            labelMobile={labelMobile}
          />
          {/* <a className="mmm" href={file} download>download cat.png</a> */}
        </form>
        <p className="form-message__validate">
          {message}
        </p>
        <p className="form-message__error">
          {error}
        </p>
      </div>
    </div>
  );
}

export default PopInForm;
